// Trusted GitHub Actions job only. Credentials are read from environment, never printed.
import {randomBytes} from 'node:crypto';
import {readFileSync,writeFileSync,mkdtempSync,rmSync,appendFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
export class Cloudflare {
 constructor({token,account,fetcher=fetch}) {
  if(!token||!/^[a-f0-9]{32}$/i.test(account||'')) throw new Error('Secrets Cloudflare ausentes ou inválidos');
  this.token=token;this.account=account;this.fetcher=fetcher;
 }
 async api(path,{method='GET',body}={}) {
  const r=await this.fetcher(`https://api.cloudflare.com/client/v4/accounts/${this.account}/${path}`,{method,headers:{Authorization:`Bearer ${this.token}`,'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body),redirect:'error',signal:AbortSignal.timeout(30000)});
  const data=await r.json();
  if(!r.ok||data.success!==true) {const e=new Error(`Cloudflare: HTTP ${r.status}; verificar token restrito, conta e permissões`);e.status=r.status;throw e;}
  return data.result;
 }
 async database() {
  const list=await this.api('d1/database?name=thermica-social-state&per_page=100');
  const found=list.filter(d=>d.name==='thermica-social-state');
  if(found.length>1) throw new Error('Banco ambíguo; implantação bloqueada');
  const db=found[0]||await this.api('d1/database',{method:'POST',body:{name:'thermica-social-state'}});
  if(!/^[a-f0-9-]{36}$/i.test(db.uuid||'')) throw new Error('Identificador D1 inválido');
  const results=await this.api(`d1/database/${db.uuid}/query`,{method:'POST',body:{sql:readFileSync(new URL('./schema.sql',import.meta.url),'utf8')}});
  if(!Array.isArray(results)||results.some(r=>r.success!==true)) throw new Error('Migração D1 bloqueada');
  return db.uuid;
 }
 async subdomain() {
  let current;
  try {current=await this.api('workers/subdomain');} catch(e) {if(e.status!==404) throw e;}
  if(current?.subdomain) return current.subdomain;
  // Free workers.dev only; no DNS, routes, paid plan, or custom domain API.
  const name='thermica-'+randomBytes(6).toString('hex');
  const created=await this.api('workers/subdomain',{method:'PUT',body:{subdomain:name}});
  if(created.subdomain!==name) throw new Error('Subdomínio gratuito não confirmado');
  return name;
 }
 async bootstrapSecrets(database) {
  const names=await this.api('workers/scripts/thermica-social/secrets');
  const existing=new Set(names.map(s=>s.name));let admin;
  if(!existing.has('SOCIAL_ENCRYPTION_KEY')&&database) {
   const state=await this.api(`d1/database/${database}/query`,{method:'POST',body:{sql:'SELECT COUNT(*) AS records FROM social_state'}});
   if(state[0]?.results?.[0]?.records!==0) throw new Error('Estado existente sem chave; não criar chave incompatível');
  }
  for(const name of ['SOCIAL_ENCRYPTION_KEY','SOCIAL_ADMIN_TOKEN','MEDIA_SIGNING_KEY']) {
   if(existing.has(name)) continue;
   // Existing key is never replaced, preserving ability to decrypt earlier receipts.
   const value=randomBytes(32).toString('hex');
   await this.api('workers/scripts/thermica-social/secrets',{method:'PUT',body:{name,text:value,type:'secret_text'}});
   if(name==='SOCIAL_ADMIN_TOKEN') admin=value;
  }
  return admin;
 }
}
export async function deploy(env=process.env) {
 const cf=new Cloudflare({token:env.CLOUDFLARE_API_TOKEN,account:env.CLOUDFLARE_ACCOUNT_ID});
 const dir=mkdtempSync(join(tmpdir(),'thermica-deploy-'));
 let stage='Cloudflare: verificar e provisionar D1';
 try {
  const database=await cf.database();
  stage='Cloudflare: verificar subdomínio workers.dev';
  const subdomain=await cf.subdomain();
  if(!/^[a-z0-9][a-z0-9-]*$/.test(subdomain)) throw new Error('Subdomínio inválido');
  const base=`https://thermica-social.${subdomain}.workers.dev`;
  const config=JSON.parse(readFileSync(new URL('./wrangler.example.jsonc',import.meta.url),'utf8'));
  config.main=resolve('social_media/cloud/entry.mjs');config.account_id=cf.account;
  config.d1_databases[0].database_id=database;
  config.vars={...config.vars,PUBLIC_BASE_URL:base,SOCIAL_PUBLISH_ENABLED:'false',SOCIAL_AUTOMATION_PAUSED:'true'};
  // The calendar cannot be released through this deployment path.
  delete config.vars.SOCIAL_CALENDAR_APPROVED_AT;
  const path=join(dir,'wrangler.jsonc');writeFileSync(path,JSON.stringify(config),{mode:0o600});
  if(!env.WRANGLER_BIN) throw new Error('Wrangler isolado não configurado');
  stage='Wrangler: implantar Worker';
  execFileSync(env.WRANGLER_BIN,['deploy','--config',path],{env:{...env,WRANGLER_SEND_METRICS:'false'},stdio:'pipe',timeout:180000});
  stage='Cloudflare: conferir e criar Secrets internos do Worker';
  const admin=await cf.bootstrapSecrets(database);
  stage='Cloudflare: validar healthcheck HTTP';
  let healthy=false;
  for(let i=0;i<6;i++) {
   try {const r=await fetch(base+'/health',{redirect:'error',signal:AbortSignal.timeout(15000)});if(r.ok&&(await r.json()).status==='ok'){healthy=true;break;}}catch{}
   await new Promise(r=>setTimeout(r,2000));
  }
  if(!healthy) throw new Error('Worker implantado; health ainda não validado');
  if(admin) {
   stage='Cloudflare: validar pausa e relatório privativo';
   const r=await fetch(base+'/run',{method:'POST',headers:{Authorization:`Bearer ${admin}`},redirect:'error',signal:AbortSignal.timeout(15000)});
   if(!r.ok||(await r.json())[0]?.status!=='pausado') throw new Error('Pausa de publicação não confirmada');
   const report=await fetch(base+'/report',{headers:{Authorization:`Bearer ${admin}`},redirect:'error',signal:AbortSignal.timeout(15000)});
   if(!report.ok) throw new Error('Estado privado D1 não validado');
  }
  const summary=`Worker implantado: ${base}\n\nHealth validado. Publicação desligada; automação pausada. Nenhuma publicação enviada. D1 inicializado e chaves internas preservadas/criadas sem exposição. Nenhum plano pago habilitado.\n`;
  if(env.GITHUB_STEP_SUMMARY) appendFileSync(env.GITHUB_STEP_SUMMARY,summary);
  console.log('Implantação concluída. Consulte a URL e verificações no resumo do job. Publicação desligada.');
 } catch (error) {
  // Never log provider response bodies, credentials, authorization headers or raw CLI stderr.
  // Only print the fixed phase name and an HTTP status that cannot reveal a token.
  const status=Number.isInteger(error?.status)?` (HTTP ${error.status})`:'';
  throw new Error(`Falha na etapa ${stage}${status}. Conferir privilégios e conta Cloudflare, sem expor Secrets.`);
 } finally {rmSync(dir,{recursive:true,force:true});}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href) deploy().catch(error=>{console.error(error.message);console.error('Nenhum upgrade pago ou publicação real foi autorizado.');process.exitCode=1;});
