import {randomBytes,timingSafeEqual,createHash,createHmac} from 'node:crypto';
import {D1Store} from './d1-store.mjs';
import {Meta} from '../meta.mjs';
import {run} from '../worker.mjs';
import {syncGoogle,recurringQueue} from '../google-sync.mjs';
const equal=(a,b)=>typeof a==='string'&&typeof b==='string'&&Buffer.byteLength(a)===Buffer.byteLength(b)&&timingSafeEqual(Buffer.from(a),Buffer.from(b));
const json=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff',...headers}});
function authenticated(req,env) {return env.SOCIAL_ADMIN_TOKEN?.length>=32&&equal(req.headers.get('Authorization'),`Bearer ${env.SOCIAL_ADMIN_TOKEN}`);}
function signature(env,sha,expires) {if(!env.MEDIA_SIGNING_KEY||env.MEDIA_SIGNING_KEY.length<32) throw new Error('Chave de mídia ausente');return createHmac('sha256',env.MEDIA_SIGNING_KEY).update(`${sha}:${expires}`).digest('hex');}
export function mediaURL(env,sha,now=Date.now()) {
 const expires=Math.floor(now/1000)+172800;
 return `${env.PUBLIC_BASE_URL}/media/${sha}?expires=${expires}&signature=${signature(env,sha,expires)}`;
}
const startPage=`<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Conectar THÉRMICA</title><h1>Conectar redes da THÉRMICA</h1><p>Esta conexão não libera publicações. Use somente o endereço oficial do worker.</p><form method="post" action="/connect"><label>Token administrativo <input name="token" type="password" required autocomplete="off"></label><label>Rede <select name="channel"><option value="instagram">Instagram profissional</option><option value="facebook">Página Facebook</option></select></label><button>Autorizar conexão oficial</button></form></html>`;
export async function oauthStart(req,env,store,channel) {
 if(!['instagram','facebook'].includes(channel)) return json({error:'Canal inválido'},400);
 const ig=channel==='instagram';const app=ig?env.INSTAGRAM_APP_ID:env.FACEBOOK_APP_ID;
 const redirect=ig?env.INSTAGRAM_REDIRECT_URI:env.FACEBOOK_REDIRECT_URI;
 if(!app||!redirect?.startsWith('https://')||!env.SOCIAL_ADMIN_TOKEN||env.SOCIAL_ADMIN_TOKEN.length<32) throw new Error('Configuração OAuth ausente');
 const state=randomBytes(32).toString('hex');await store.write('oauth',{state,channel,expires:Date.now()+600000});
 const u=new URL(ig?'https://www.instagram.com/oauth/authorize':`https://www.facebook.com/${env.META_API_VERSION||'v25.0'}/dialog/oauth`);
 u.search=new URLSearchParams({client_id:app,redirect_uri:redirect,response_type:'code',state,scope:ig?'instagram_business_basic,instagram_business_content_publish':'pages_show_list,pages_read_engagement,pages_manage_posts'});
 return new Response(null,{status:303,headers:{Location:u.href,'Cache-Control':'no-store','Referrer-Policy':'no-referrer','Set-Cookie':`social_state=${state}; Max-Age=600; Path=/oauth; HttpOnly; Secure; SameSite=Lax`}});
}
export async function oauthCallback(req,env,store,meta) {
 const u=new URL(req.url),s=u.searchParams.get('state');
 const cookie=req.headers.get('Cookie')?.split(';').map(v=>v.trim()).find(v=>v.startsWith('social_state='))?.slice(13);
 const p=await store.read('oauth',{});
 if(!p.state||!equal(p.state,s)||!equal(p.state,cookie)||p.expires<Date.now()) return json({error:'Estado OAuth inválido'},400);
 await store.write('oauth',{});
 if(!u.searchParams.get('code')) return json({error:'Consentimento recusado'},400);
 const t=await store.read('tokens',{});
 t[p.channel]=p.channel==='instagram'?await meta.exchange(u.searchParams.get('code'),env):await meta.exchangeFacebook(u.searchParams.get('code'),env);
 await store.write('tokens',t);
 return json({status:'Conectado. A publicação exige autorização separada do calendário.'},200,{'Set-Cookie':'social_state=; Max-Age=0; Path=/oauth; HttpOnly; Secure; SameSite=Lax'});
}
export async function cycle(env,{store=new D1Store(env.SOCIAL_DB,env.SOCIAL_ENCRYPTION_KEY),meta=new Meta({version:env.META_API_VERSION||'v25.0'}),fetcher=fetch,now=Date.now()}={}) {
 if(env.SOCIAL_AUTOMATION_PAUSED==='true') return [{status:'pausado'}];
 const paused=await store.lock(async()=>{
  if((await store.read('control',{})).paused) return true;
  const day=new Date(now).toISOString().slice(0,10);let usage=await store.read('usage',{});
  if(usage.day!==day) usage={day,runs:0,syncs:0,publications:0};
  if(usage.runs>=60) throw new Error('Orçamento diário de ciclos atingido');usage.runs++;await store.write('usage',usage);
  const previous=await store.read('sync',{});
  // Fail closed on stale/failed sync; do not execute previously approved queue after a Sheet outage.
  if(!previous.at||now-previous.at>=1800000) {
   const book=await syncGoogle(env,fetcher);await store.write('workbook',{queue:book.queue,media:book.media});
   await store.write('sync',{at:now,status:'ok'});usage.syncs++;await store.write('usage',usage);
  }
 });
 if(paused) return [{status:'pausado'}];
 // Worker owns its own lease, preventing concurrent publication or callback updates.
 const report=await store.lock(async()=>{
  const book=await store.read('workbook',{}),assets=await store.read('assets',{}),sync=await store.read('sync',{});
  if(!sync.at||now-sync.at>3600000) throw new Error('Sincronização desatualizada');
  const queue=recurringQueue(book.queue||[],now).map(p=>{
   const m=book.media?.find(m=>m.id===p.media_id),asset=assets[p.media_id];
   const permitted=m?.approved&&m.public_approved&&asset&&asset.source_revision===createHash('sha256').update(JSON.stringify(m)).digest('hex');
   return {...p,media_approved:!!permitted,media_sha256:permitted?asset.sha256:'',media_url:permitted?mediaURL(env,asset.sha256,now):''};
  });
  // lease wrapper is deliberately passed through: run must not reacquire it.
  const session={read:store.read.bind(store),write:store.write.bind(store),assertLease:store.assertLease.bind(store),lock:fn=>fn()};
  const report=await run({queue,store:session,meta,env,now});
  await store.write('report',{at:now,rows:report});
  const usage=await store.read('usage',{});usage.publications=(usage.publications||0)+report.filter(r=>r.status==='published').length;await store.write('usage',usage);
  return report;
 });
 const material=report.some(r=>['reconciliacao_necessaria','canal_nao_conectado','midia_nao_validada','conteudo_alterado_bloqueado','erro_terminal','prazo_expirado','texto_invalido','autorizacao_necessaria'].includes(r.status)||r.error);
 if(material) await notify(env,store,fetcher,now);
 return report;
}
async function notify(env,store,fetcher,now) {
 await store.lock(async()=>{
  const alert=await store.read('alert',{});
  if(now-(alert.at||0)<86400000) return;
  await store.write('alert',{at:now,status:'action_required'});
  if(env.ALERT_WEBHOOK_URL) {
   if(!env.ALERT_WEBHOOK_URL.startsWith('https://')) throw new Error('Webhook deve usar HTTPS');
   const r=await fetcher(env.ALERT_WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:'THÉRMICA: automação requer atenção. Consulte o relatório privado.'}),redirect:'error',signal:AbortSignal.timeout(10000)});
   if(!r.ok) await store.write('alert',{at:now,status:'delivery_failed'});
  }
 });
}
export async function handle(req,env) {
 const u=new URL(req.url),store=new D1Store(env.SOCIAL_DB,env.SOCIAL_ENCRYPTION_KEY),meta=new Meta({version:env.META_API_VERSION||'v25.0'});
 if(u.pathname==='/health') return json({status:'ok'});
 if(u.pathname==='/connect'&&req.method==='GET') return new Response(startPage,{headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store','Content-Security-Policy':"default-src 'none'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'",'Referrer-Policy':'no-referrer'}});
 if(u.pathname==='/connect'&&req.method==='POST') {
  if(req.headers.get('Origin')!==u.origin) return json({error:'Origem inválida'},403);
  const form=await req.formData();if(!env.SOCIAL_ADMIN_TOKEN||!equal(form.get('token'),env.SOCIAL_ADMIN_TOKEN)) return json({error:'Não autorizado'},401);
  return store.lock(()=>oauthStart(req,env,store,String(form.get('channel'))));
 }
 if(u.pathname==='/oauth/callback'&&req.method==='GET') return store.lock(()=>oauthCallback(req,env,store,meta));
 if(u.pathname.startsWith('/media/')&&req.method==='GET') {
  const sha=u.pathname.slice(7),expires=Number(u.searchParams.get('expires')),now=Math.floor(Date.now()/1000);
  if(!/^[a-f0-9]{64}$/.test(sha)||!Number.isInteger(expires)||expires<now||expires>now+172800||!equal(u.searchParams.get('signature'),signature(env,sha,expires))) return json({error:'Mídia indisponível'},404);
  return (async()=>{
   const m=await store.readSnapshot('media_'+sha,null);
   if(!m) return json({error:'Mídia indisponível'},404);
   const book=await store.readSnapshot('workbook',{}),assets=await store.readSnapshot('assets',{});
   if(!book.media?.some(x=>x.approved&&x.public_approved&&assets[x.id]?.sha256===sha)) return json({error:'Mídia revogada'},404);
   return new Response(Buffer.from(m.jpeg,'base64'),{headers:{'Content-Type':'image/jpeg','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
  })();
 }
 if(!authenticated(req,env)) return json({error:'Não autorizado'},401);
 if(u.pathname==='/pause'&&req.method==='POST') return store.lock(async()=>{await store.write('control',{paused:true,at:Date.now()});return json({status:'pausado'});});
 if(u.pathname==='/resume'&&req.method==='POST') return store.lock(async()=>{await store.write('control',{paused:false,at:Date.now()});return json({status:'retomado; autorização de calendário e kill switch ainda se aplicam'});});
 if(u.pathname==='/report'&&req.method==='GET') return store.lock(async()=>json({receipts:Object.entries(await store.read('ledger',{})).map(([id,r])=>({id,status:r.status,remote_id:r.remote_id,url:r.url,verification:r.verification})),control:await store.read('control',{}),report:await store.read('report',{}),usage:await store.read('usage',{}),alert:await store.read('alert',{}),sync:await store.read('sync',{})}));
 if(u.pathname==='/prepare'&&req.method==='POST') return store.lock(async()=>{const book=await syncGoogle(env);await store.write('workbook',{queue:book.queue,media:book.media});await store.write('sync',{at:Date.now(),status:'ok'});return json({queue:book.queue,media:book.media});});
 if(u.pathname==='/assets'&&req.method==='POST') {
  if(Number(req.headers.get('Content-Length'))>600000) return json({error:'Arquivo excede limite'},413);
  const text=await req.text();if(text.length>600000) return json({error:'Arquivo excede limite'},413);const item=JSON.parse(text);
  const jpeg=Buffer.from(item.jpeg||'','base64');
  if(jpeg.length>400000||jpeg.length<100||jpeg[0]!==255||jpeg[1]!==216||jpeg.at(-2)!==255||jpeg.at(-1)!==217) return json({error:'JPEG inválido'},400);
  return store.lock(async()=>{
   const book=await store.read('workbook',{}),m=book.media?.find(m=>m.id===item.id);
   if(!m?.approved||!m.public_approved) return json({error:'Uso público não aprovado'},403);
   const sha=createHash('sha256').update(jpeg).digest('hex'),assets=await store.read('assets',{});
   // Explicit quota: at most 80 image assets, ~32 MB plaintext, no paid storage fallback.
   if(!assets[item.id]&&Object.keys(assets).length>=80) return json({error:'Orçamento de imagens atingido'},409);
   const size=await env.SOCIAL_DB.prepare('SELECT COALESCE(SUM(length(ciphertext)),0) AS bytes FROM social_state').first();
   if(size.bytes>100000000) return json({error:'Orçamento preventivo D1 atingido'},409);
   await store.write('media_'+sha,{jpeg:item.jpeg});
   assets[item.id]={sha256:sha,source_revision:createHash('sha256').update(JSON.stringify(m)).digest('hex')};await store.write('assets',assets);
   return json({status:'prepared',sha256:sha});
  });
 }
 if(u.pathname==='/run'&&req.method==='POST') return json(await cycle(env));
 return json({error:'Rota inexistente'},404);
}
export default {
 async fetch(req,env) {try {return await handle(req,env);}catch {return json({error:'Operação bloqueada; consulte configuração e alertas privados'},503);}},
 async scheduled(event,env,ctx) {ctx.waitUntil(cycle(env).catch(async()=>{const s=new D1Store(env.SOCIAL_DB,env.SOCIAL_ENCRYPTION_KEY);await notify(env,s,fetch,Date.now());throw new Error('Ciclo social bloqueado; consultar estado privado');}));}
};
