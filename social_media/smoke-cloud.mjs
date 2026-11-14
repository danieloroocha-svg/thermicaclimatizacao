// Synthetic local workerd smoke test. Never uses account credentials or deploys.
import {spawn,spawnSync} from 'node:child_process';
import {mkdtempSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {createCipheriv,randomBytes,generateKeyPairSync} from 'node:crypto';
import assert from 'node:assert/strict';
import {mediaURL} from './cloud/entry.mjs';
const bin=process.env.WRANGLER_BIN;
if(!bin) throw new Error('Configure WRANGLER_BIN para Wrangler 4.162.0');
const dir=mkdtempSync(join(tmpdir(),'social-workerd-'));
const vars={SOCIAL_ENCRYPTION_KEY:'ab'.repeat(32),SOCIAL_ADMIN_TOKEN:'smoke-admin-'+ 'x'.repeat(40),MEDIA_SIGNING_KEY:'smoke-media-'+ 'y'.repeat(40),PUBLIC_BASE_URL:'https://worker.example',INSTAGRAM_APP_ID:'smoke',INSTAGRAM_REDIRECT_URI:'https://worker.example/oauth/callback',SOCIAL_PUBLISH_ENABLED:'false'};
const encrypt=(name,value)=>{const iv=randomBytes(12),c=createCipheriv('aes-256-gcm',Buffer.from(vars.SOCIAL_ENCRYPTION_KEY,'hex'),iv);c.setAAD(Buffer.from(name));const body=Buffer.concat([c.update(Buffer.from(JSON.stringify(value))),c.final()]);return JSON.stringify({iv:iv.toString('hex'),tag:c.getAuthTag().toString('hex'),body:body.toString('hex')});};
const config=join(dir,'wrangler.jsonc');
const {privateKey}=generateKeyPairSync('rsa',{modulusLength:2048});
const account={client_email:'smoke@example.test',private_key:privateKey.export({type:'pkcs8',format:'pem'})};
const wrapper=join(dir,'smoke-entry.mjs');
writeFileSync(wrapper,`import entry from ${JSON.stringify(resolve('social_media/cloud/entry.mjs'))};
import {googleToken} from ${JSON.stringify(resolve('social_media/google-sync.mjs'))};
export default {...entry,async fetch(req,env,ctx){
 if(new URL(req.url).pathname==='/__test_google') {
  try {const token=await googleToken(${JSON.stringify(account)},async()=>({ok:true,json:async()=>({access_token:'synthetic-token'})}));return new Response(token==='synthetic-token'?'ok':'fail');}
  catch {return new Response('crypto unsupported',{status:500});}
 }
 return entry.fetch(req,env,ctx);
}};`);
writeFileSync(config,JSON.stringify({name:'thermica-smoke-only',main:wrapper,compatibility_date:'2026-11-01',compatibility_flags:['nodejs_compat'],d1_databases:[{binding:'SOCIAL_DB',database_name:'smoke',database_id:'00000000-0000-0000-0000-000000000001'}],vars}));
const seed=join(dir,'schema.sql');
writeFileSync(seed,readFileSync('social_media/cloud/schema.sql','utf8')+`\nINSERT INTO social_state VALUES ('workbook','${encrypt('workbook',{media:[{id:'smoke_photo',source:'site',approved:true,public_approved:true}],queue:[]})}');`);
const childEnv={...process.env,XDG_CONFIG_HOME:join(dir,'xdg'),WRANGLER_SEND_METRICS:'false'};
let child;
try {
 const init=spawnSync(bin,['d1','execute','smoke','--local','--config',config,'--file',seed],{env:childEnv,encoding:'utf8',timeout:120000});
 assert.equal(init.status,0,'Migração local falhou');
 child=spawn(bin,['dev','--local','--config',config,'--port','8799'],{env:childEnv,stdio:'pipe'});
 // Consume logs without exposing source payloads or creating public artifacts.
 child.stdout.on('data',()=>{});child.stderr.on('data',()=>{});
 const root='http://127.0.0.1:8799',headers={Authorization:`Bearer ${vars.SOCIAL_ADMIN_TOKEN}`};let ready=false;
 for(let i=0;i<120;i++) {try {if((await fetch(root+'/health')).status===200){ready=true;break;}}catch{} await new Promise(r=>setTimeout(r,250));}
 assert(ready,'workerd não iniciou');
 assert.equal((await fetch(root+'/__test_google')).status,200,'Assinatura JWT RSA no workerd falhou');
 assert.equal((await fetch(root+'/report')).status,401);
 assert.equal((await fetch(root+'/report',{headers})).status,200);
 assert.equal((await fetch(root+'/pause',{method:'POST',headers})).status,200);
 const paused=await fetch(root+'/run',{method:'POST',headers});assert.equal(paused.status,200);assert.equal((await paused.json())[0].status,'pausado');
 const upload=await fetch(root+'/assets',{method:'POST',headers:{...headers,'Content-Type':'application/json'},body:JSON.stringify({id:'smoke_photo',jpeg:readFileSync('social_media/fixtures/smoke.jpg').toString('base64')})});
 assert.equal(upload.status,200);const sha=(await upload.json()).sha256;
 const signed=new URL(mediaURL(vars,sha));const image=await fetch(root+signed.pathname+signed.search);assert.equal(image.status,200);assert.equal(image.headers.get('Content-Type'),'image/jpeg');
 assert.deepEqual(Buffer.from(await image.arrayBuffer()),readFileSync('social_media/fixtures/smoke.jpg'));
 const auth=await fetch(root+'/connect',{method:'POST',headers:{Origin:root},body:new URLSearchParams({token:vars.SOCIAL_ADMIN_TOKEN,channel:'instagram'}),redirect:'manual'});
 assert.equal(auth.status,303);assert.match(auth.headers.get('Set-Cookie'),/Secure/);
 const state=new URL(auth.headers.get('Location')).searchParams.get('state');
 assert.equal((await fetch(root+'/oauth/callback?state='+state,{headers:{Cookie:'social_state='+state}})).status,400);
 console.log('workerd: migração, autenticação, AES/D1, pausa, JPEG assinado e OAuth local aprovados; nenhum deploy ou post.');
} finally {
 if(child) {child.kill('SIGTERM');await Promise.race([new Promise(r=>child.once('close',r)),new Promise(r=>{const t=setTimeout(()=>{child.kill('SIGKILL');r();},10000);t.unref();})]);}
 rmSync(dir,{recursive:true,force:true});
}
