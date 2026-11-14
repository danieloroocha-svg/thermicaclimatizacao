import {createServer} from 'node:http';
import {randomBytes,timingSafeEqual} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {Store} from './store.mjs';
import {Meta} from './meta.mjs';
import {run} from './worker.mjs';
const env=process.env;
for(const k of ['SOCIAL_DATA_DIR','SOCIAL_ENCRYPTION_KEY','SOCIAL_ADMIN_TOKEN','INSTAGRAM_APP_ID','INSTAGRAM_APP_SECRET','INSTAGRAM_REDIRECT_URI','SOCIAL_QUEUE_PATH']) if(!env[k]) throw new Error(`Configuração ausente: ${k}`);
if(env.SOCIAL_ADMIN_TOKEN.length<32||!env.INSTAGRAM_REDIRECT_URI.startsWith('https://')) throw new Error('Exige HTTPS e token administrativo de 32 caracteres ou mais');
const store=new Store(env.SOCIAL_DATA_DIR,env.SOCIAL_ENCRYPTION_KEY),meta=new Meta({version:env.META_API_VERSION||'v25.0'});
const equal=(a,b)=>Buffer.byteLength(a)===Buffer.byteLength(b)&&timingSafeEqual(Buffer.from(a),Buffer.from(b));
createServer(async(req,res)=>{
 res.setHeader('Cache-Control','no-store');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('X-Content-Type-Options','nosniff');
 const url=new URL(req.url,'http://localhost');
 const send=(code,body)=>{res.writeHead(code,{'Content-Type':'application/json'});res.end(JSON.stringify(body));};
 try {
 if(url.pathname==='/health') return send(200,{status:'ok'});
 if(url.pathname==='/oauth/callback'&&req.method==='GET') {
   const cookie=req.headers.cookie?.split(';').map(x=>x.trim()).find(x=>x.startsWith('social_state='))?.slice(13)||'';
   const state=url.searchParams.get('state')||'';const pending=store.read('oauth',{});
   if(!pending.state||!equal(state,pending.state)||!equal(cookie,state)||pending.expires<Date.now()) return send(400,{error:'Estado OAuth inválido ou expirado'});
   store.write('oauth',{});res.setHeader('Set-Cookie','social_state=; Max-Age=0; Path=/oauth; HttpOnly; Secure; SameSite=Lax');
   if(!url.searchParams.get('code')) return send(400,{error:'Consentimento não concluído'});
   const token=await meta.exchange(url.searchParams.get('code'),env);const tokens=store.read('tokens',{});tokens.instagram=token;store.write('tokens',tokens);
   return send(200,{status:'Instagram conectado; publicação continua sujeita ao bloqueio do calendário'});
 }
 if(!equal(req.headers.authorization||'',`Bearer ${env.SOCIAL_ADMIN_TOKEN}`)) return send(401,{error:'Não autorizado'});
 if(url.pathname==='/oauth/start'&&req.method==='POST') {
   const state=randomBytes(32).toString('hex');store.write('oauth',{state,expires:Date.now()+600000});
   const auth=new URL('https://www.instagram.com/oauth/authorize');auth.search=new URLSearchParams({client_id:env.INSTAGRAM_APP_ID,redirect_uri:env.INSTAGRAM_REDIRECT_URI,response_type:'code',scope:'instagram_business_basic,instagram_business_content_publish',state,enable_fb_login:'0',force_authentication:'1'});
   res.setHeader('Set-Cookie',`social_state=${state}; Max-Age=600; Path=/oauth; HttpOnly; Secure; SameSite=Lax`);return send(200,{authorization_url:auth.href});
 }
 if(url.pathname==='/report'&&req.method==='GET') {const ledger=store.read('ledger',{});return send(200,Object.entries(ledger).map(([id,r])=>({id,status:r.status,remote_id:r.remote_id,url:r.url,last_error_at:r.last_error_at})));}
 if(url.pathname==='/run'&&req.method==='POST') return send(200,await run({queue:JSON.parse(readFileSync(env.SOCIAL_QUEUE_PATH,'utf8')),store,meta,env}));
 return send(404,{error:'Rota inexistente'});
 } catch {send(503,{error:'Operação bloqueada; verificar configuração ou estado privado'});}
}).listen(Number(env.PORT||8080),'0.0.0.0');
// Single instance on a persistent volume; the same lock also protects /run.
setInterval(async()=>{try {await run({queue:JSON.parse(readFileSync(env.SOCIAL_QUEUE_PATH,'utf8')),store,meta,env});} catch {console.error('Ciclo bloqueado; verificar relatório privado e configuração');}},60000).unref();
