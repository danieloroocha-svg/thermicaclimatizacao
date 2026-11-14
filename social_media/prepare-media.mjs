// GitHub hosted runner only: no logs of source IDs, URLs, images, credentials or private queue.
import {mkdtempSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {execFileSync} from 'node:child_process';
import {googleToken} from './google-sync.mjs';
const env=process.env;
async function api(path,data) {
 const r=await fetch(env.SOCIAL_WORKER_URL+path,{method:'POST',headers:{Authorization:`Bearer ${env.SOCIAL_ADMIN_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify(data),redirect:'error',signal:AbortSignal.timeout(60000)});
 if(!r.ok) throw new Error('Preparação bloqueada');return r.json();
}
async function main() {
 if(!env.SOCIAL_WORKER_URL?.startsWith('https://')||!env.SOCIAL_ADMIN_TOKEN) throw new Error('Configuração ausente');
 const book=await api('/prepare',{}),token=env.GOOGLE_SERVICE_ACCOUNT_JSON?await googleToken(env.GOOGLE_SERVICE_ACCOUNT_JSON):null;
 const dir=mkdtempSync(join(tmpdir(),'thermica-media-'));
 let count=0;
 try {
  const ids=[...new Set(book.queue.filter(p=>p.status==='aprovado').map(p=>p.media_id))].slice(0,12);
  for(const id of ids) {
   const m=book.media.find(m=>m.id===id);if(!m?.approved||!m.public_approved) continue;
   let url;
   if(m.source==='drive') {if(!token) continue;url=`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(m.file_id)}?alt=media`;}
   else {const u=new URL(m.url);if(u.protocol!=='https:'||!['thermicaclimatizacao.com.br','www.thermicaclimatizacao.com.br','raw.githubusercontent.com'].includes(u.hostname)) continue;
    if(u.hostname==='raw.githubusercontent.com'&&!u.pathname.startsWith('/danieloroocha-svg/thermicaclimatizacao/')) continue;url=u.href;}
   const r=await fetch(url,{headers:m.source==='drive'?{Authorization:`Bearer ${token}`}:{},redirect:'error',signal:AbortSignal.timeout(30000)});
   if(!r.ok||Number(r.headers.get('Content-Length'))>15000000) continue;
   // Stream with a hard bound: large private media never enters memory unbounded.
   const chunks=[];let bytes=0;
   for await(const chunk of r.body) {bytes+=chunk.length;if(bytes>15000000) throw new Error('Arquivo excede limite');chunks.push(chunk);}
   const photo=join(dir,'source'),output=join(dir,'final.jpg');writeFileSync(photo,Buffer.concat(chunks),{mode:0o600});
   // A single asset per photo avoids signing an already approved ID with a different caption/title.
   execFileSync('python3',['social_media/compose.py',photo,output,'--title','Engenharia aplicada à climatização'],{stdio:'pipe'});
   const jpeg=readFileSync(output);if(jpeg.length>400000) continue;
   await api('/assets',{id,jpeg:jpeg.toString('base64')});count++;
  }
 } finally {rmSync(dir,{recursive:true,force:true});}
 console.log(`Preparação concluída: ${count} imagens. Nenhuma publicação enviada por este processo.`);
}
main().catch(()=>{console.error('Preparação bloqueada; verificar configuração privada e permissões.');process.exitCode=1;});
