import {createHash} from 'node:crypto';
import {validateQueue} from './lib.mjs';
const hash=p=>createHash('sha256').update(p.texto.trim().replace(/\s+/g,' ')).digest('hex');
export async function run({queue,store,meta,env=process.env,now=Date.now()}) {
 validateQueue(queue);
 return store.lock(async()=>{
 const ledger=await store.read('ledger',{});const report=[];
 const control=await store.read('control',{});
 if(control.paused) return [{status:'pausado'}];
 if(env.SOCIAL_AUTOMATION_PAUSED==='true') return [{status:'pausado'}];
 if(env.SOCIAL_PUBLISH_ENABLED!=='true'||!env.SOCIAL_CALENDAR_APPROVED_AT) return [{status:'bloqueado',reason:'Publicação ou calendário não autorizado'}];
 let tokens=await store.read('tokens',{});
 const unavailable=new Set();
 if(tokens.facebook) {
  const t=tokens.facebook;
  try {
   if((t.expires_at&&t.expires_at<=now)||(t.data_access_expires_at&&t.data_access_expires_at<=now)) throw new Error('Facebook expirado');
   if(!t.checked_at||now-t.checked_at>=86400000) {await meta.facebookStatus(t);t.checked_at=now;await store.write('tokens',tokens);}
  } catch {unavailable.add('facebook');report.push({channel:'facebook',status:'autorizacao_necessaria'});}
 }
 if(tokens.instagram&&tokens.instagram.expires_at<now+7*86400000) {
  try {
   if(tokens.instagram.expires_at<=now) throw new Error('Instagram expirado');
   if(now-tokens.instagram.issued_at>=86400000) {tokens.instagram=await meta.refresh(tokens.instagram);await store.write('tokens',tokens);}
  } catch {unavailable.add('instagram');report.push({channel:'instagram',status:'autorizacao_necessaria'});}
 }
 // Recheck published Instagram receipts daily, including missing permalinks.
 let checks=0;
 for(const r of Object.values(ledger)) {
  if(checks<2&&r.channel==='instagram'&&r.status==='published'&&tokens.instagram&&!unavailable.has('instagram')&&r.remote_id&&(!r.last_checked_at||now-r.last_checked_at>=86400000)) {
   checks++;
   try {const receipt=await meta.receipt(tokens.instagram,r.remote_id);r.url=receipt.permalink||r.url;r.last_checked_at=now;r.verification='ok';}
   catch {r.last_checked_at=now;r.verification='check_failed';}
   await store.write('ledger',ledger);
  }
 }
 let attempts=0;
 for(const p of queue.filter(p=>p.status==='aprovado'&&Date.parse(p.scheduled_at)<=now)) {
  if(env.SOCIAL_MAX_LATENESS_HOURS&&now-Date.parse(p.scheduled_at)>Number(env.SOCIAL_MAX_LATENESS_HOURS)*3600000) {if(!p.recurring) report.push({id:p.id,status:'prazo_expirado'});continue;}
  if(!p.media_approved||!/^https:\/\//.test(p.media_url||'')||!/^([a-f0-9]{64})$/i.test(p.media_sha256||'')) {report.push({id:p.id,status:'midia_nao_validada'});continue;}
  if(!p.texto.includes('https://thermicaclimatizacao.com.br')||p.texto.length>2200) {report.push({id:p.id,status:'texto_invalido'});continue;}
  for(const channel of p.channels) {
   const key=p.id+':'+channel; let r=ledger[key];
   if(r?.status==='failed') {report.push({id:p.id,channel,status:'erro_terminal'});continue;}
   if(r?.status==='published') {report.push({id:p.id,channel,status:'ja_publicado'});continue;}
   if(r&&['publishing','uncertain'].includes(r.status)) {
    if(checks>=4) {report.push({id:p.id,channel,status:'reconciliacao_necessaria'});continue;}
    checks++;
    try {
     const found=await meta.reconcile(tokens[channel],channel,r);
     if(found) {r.remote_id=found.id;r.url=found.permalink_url||found.permalink;r.status='published';r.reconciled_at=now;await store.write('ledger',ledger);}
    } catch { /* No evidence is never permission to resend. */ }
    report.push({id:p.id,channel,status:r.status==='published'?'reconciliado':'reconciliacao_necessaria'});continue;
   }
   if(!tokens[channel]||unavailable.has(channel)||!['instagram','facebook'].includes(channel)) {report.push({id:p.id,channel,status:'canal_nao_conectado'});continue;}
   if(!r&&Object.values(ledger).some(x=>x.channel===channel&& (x.content_hash===hash(p)&&now-x.started_at<90*86400000||x.media_hash===p.media_sha256&&now-x.started_at<30*86400000))) {report.push({id:p.id,channel,status:'duplicacao_bloqueada'});continue;}
   if(r&&(r.content_hash!==hash(p)||r.media_hash!==p.media_sha256)) {report.push({id:p.id,channel,status:'conteudo_alterado_bloqueado'});continue;}
   if(attempts>=Number(env.SOCIAL_MAX_POSTS_PER_RUN||2)) {report.push({id:p.id,channel,status:'proximo_ciclo'});continue;}
   attempts++;
   r=ledger[key]||{channel,content_hash:hash(p),media_hash:p.media_sha256,started_at:now,caption:p.texto,status:'preparing'};ledger[key]=r;
   const save=()=>store.write('ledger',ledger);
   try {
    if(channel==='instagram') {
     if(!r.container_id) {r.status='creating';await save(); const c=await meta.create(tokens.instagram,p);r.container_id=c.id;r.status='processing';await save();}
     const state=await meta.status(tokens.instagram,r.container_id);
     if(state.status_code==='PUBLISHED') {r.status='uncertain';await save();report.push({id:p.id,channel,status:r.status});continue;}
     if(state.status_code!=='FINISHED') {if(['ERROR','EXPIRED'].includes(state.status_code)) r.status='failed';await save();report.push({id:p.id,channel,status:r.status});continue;}
    }
    r.status='publishing';await save();
    await store.assertLease?.();
    const result=channel==='instagram'?await meta.publish(tokens.instagram,r.container_id):await meta.facebook(tokens.facebook,p);
    r.remote_id=result.post_id||result.id;if(!r.remote_id) throw new Error('Recibo ausente');r.status='published';r.published_at=now;await save();
    if(channel==='instagram') {const receipt=await meta.receipt(tokens.instagram,r.remote_id);r.url=receipt.permalink;} else r.url=`https://www.facebook.com/${r.remote_id}`;
    await save();report.push({id:p.id,channel,status:r.status,url:r.url});
   } catch {r.status=r.status==='publishing'?'uncertain':r.status;r.last_error_at=now;await save();report.push({id:p.id,channel,status:r.status,error:'Falha de integração; consultar estado privado'});}
  }
 }
 return report;
 });
}
