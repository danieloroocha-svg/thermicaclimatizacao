import {createSign} from 'node:crypto';
import {googleJSON} from './integrations.mjs';
import {validateQueue,validTimestamp} from './lib.mjs';
const approved=v=>['sim','aprovado','true'].includes(String(v||'').trim().toLowerCase());
const b64=v=>Buffer.from(v).toString('base64url');
export async function googleToken(serviceAccount,fetcher=fetch) {
 const a=typeof serviceAccount==='string'?JSON.parse(serviceAccount):serviceAccount;
 const time=Math.floor(Date.now()/1000);
 const body=b64(JSON.stringify({alg:'RS256',typ:'JWT'}))+'.'+b64(JSON.stringify({iss:a.client_email,scope:'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/spreadsheets.readonly',aud:'https://oauth2.googleapis.com/token',iat:time,exp:time+3600}));
 const sign=createSign('RSA-SHA256');sign.update(Buffer.from(body));const assertion=body+'.'+sign.sign(a.private_key,'base64url');
 const r=await fetcher('https://oauth2.googleapis.com/token',{method:'POST',body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion}),signal:AbortSignal.timeout(30000)});
 const data=await r.json();if(!r.ok||!data.access_token) throw new Error('Autenticação Google recusada');return data.access_token;
}
export function rows(values=[]) {
 const [header,...body]=values; if(!header) return [];
 return body.filter(r=>r.some(v=>String(v).trim())).map(r=>Object.fromEntries(header.map((key,i)=>[key,String(r[i]??'').trim()])));
}
export function parseWorkbook(tabs) {
 const required=['Resumo','Mídia do site','Mídia no Drive','Fila editorial'];
 for(const name of required) if(!Array.isArray(tabs[name])) throw new Error('Aba obrigatória ausente');
 const media=[];
 for(const r of rows(tabs['Mídia do site'])) media.push({id:r.ID,source:'site',url:r['URL origem'],approved:approved(r['Uso aprovado?']),public_approved:approved(r['Uso aprovado?'])});
 for(const r of rows(tabs['Mídia no Drive'])) {
  const match=r['Link no Drive']?.match(/(?:\/d\/|[?&]id=)([\w-]+)/);
  media.push({id:r['ID da mídia']||match?.[1],source:'drive',file_id:match?.[1]||r['ID da mídia'],approved:approved(r['Uso aprovado?'])&&approved(r['Direito de uso']),public_approved:approved(r['Publicação pública autorizada?'])});
 }
 const queue=rows(tabs['Fila editorial']).map(r=>({id:r.ID,tema:r.Tema,texto:r.Legenda,channels:(r.Redes||'').toLowerCase().split(/[,;]+/).map(c=>c.trim()).filter(Boolean),scheduled_at:r['Data e hora (ISO)'],status:({'aprovado':'aprovado','pausado':'pausado','rascunho':'rascunho'})[r['Situação']?.toLowerCase()]||'rascunho',media_id:r.Imagem,recurring:approved(r['Recorrente?']),interval_days:Number(r['Intervalo dias']||90)}));
 validateQueue(queue);
 return {queue,media,summary:rows(tabs.Resumo)};
}
export async function syncGoogle(env,fetcher=fetch) {
 const token=await googleToken(env.GOOGLE_SERVICE_ACCOUNT_JSON,fetcher);
 const base=`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(env.GOOGLE_SHEET_ID)}`;
 const metadata=await googleJSON(base+'?fields=sheets.properties',token,fetcher);
 const required=['Resumo','Mídia do site','Mídia no Drive','Fila editorial'];
 if(required.some(t=>!metadata.sheets?.some(s=>s.properties.title===t))) throw new Error('Estrutura da planilha divergente');
 const u=new URL(base+'/values:batchGet');
 for(const t of required) u.searchParams.append('ranges',`'${t.replaceAll("'","''")}'!A1:Z2001`);
 u.searchParams.set('valueRenderOption','FORMATTED_VALUE');
 const data=await googleJSON(u,token,fetcher);
 if(data.valueRanges?.some(r=>r.values?.length>=2001)) throw new Error('Limite preventivo de linhas atingido');
 const book=parseWorkbook(Object.fromEntries(required.map((t,i)=>[t,data.valueRanges?.[i]?.values||[]])));
 return {...book,token};
}
export function recurringQueue(queue,now=Date.now()) {
 const out=[];
 for(const p of queue) {
  out.push(p);
  if(!p.recurring||p.status!=='aprovado') continue;
  if(!Number.isInteger(p.interval_days)||p.interval_days<30||p.interval_days>366||!validTimestamp(p.scheduled_at)) throw new Error('Recorrência inválida');
  const step=p.interval_days*86400000,anchor=Date.parse(p.scheduled_at);
  const cycle=Math.floor((now-anchor)/step);
  if(cycle<1) continue;
  // Derive from anchor and cycle, never from last execution: retries keep same ID.
  const scheduled=anchor+cycle*step;
  out.push({...p,id:p.id.slice(0,60)+'_r'+cycle,scheduled_at:new Date(scheduled).toISOString()});
 }
 return out;
}
