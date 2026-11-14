import test from 'node:test';
import assert from 'node:assert/strict';
import {instagramOnlyBook} from './instagram-only.mjs';
import {cycle,oauthStart} from './cloud/entry.mjs';
import {preview} from './lib.mjs';

function store() {
  const state=new Map();
  return {
    lock:async fn=>fn(),
    read:async (key,fallback={})=>state.has(key)?structuredClone(state.get(key)):structuredClone(fallback),
    write:async (key,value)=>{state.set(key,structuredClone(value));},
    assertLease:async()=>{}
  };
}
const config=()=>({
  SOCIAL_SOURCE_MODE:'instagram_only',
  SOCIAL_AUTOMATION_PAUSED:'false',
  SOCIAL_PUBLISH_ENABLED:'false',
  PUBLIC_BASE_URL:'https://worker.example',
  SOCIAL_ADMIN_TOKEN:'admin-'+'x'.repeat(40),
  MEDIA_SIGNING_KEY:'sign-'+'y'.repeat(40),
  INSTAGRAM_APP_ID:'ig-test',
  INSTAGRAM_REDIRECT_URI:'https://worker.example/oauth/callback'
});

test('Instagram-only possui três rascunhos com mídia distinta e sem autorização implícita',()=>{
 const book=instagramOnlyBook();
 assert.equal(book.queue.length,3);
 assert.equal(book.media.length,3);
 assert(book.queue.every(p=>p.status==='rascunho'&&p.channels.length===1&&p.channels[0]==='instagram'&&p.recurring===false));
 assert(book.media.every(m=>m.source==='site'&&!m.approved&&!m.public_approved));
 assert.equal(new Set(book.queue.map(p=>p.media_id)).size,3);
 assert(preview(book.queue,new Date('2026-12-01T12:00:00Z')).every(p=>p.status==='aguardando_aprovacao'));
});

test('catálogo do Instagram não contém Google, Facebook ou credenciais',()=>{
 const book=instagramOnlyBook(),raw=JSON.stringify(book);
 assert(!/drive\.google\.com|facebook\.com|access_token|private_key|service_account/i.test(raw));
 assert(book.media.every(m=>m.url.startsWith('https://raw.githubusercontent.com/danieloroocha-svg/thermicaclimatizacao/main/src/assets/')));
});

test('catálogo é retornado por cópia e mudanças externas não aprovam o original',()=>{
 const a=instagramOnlyBook();a.media[0].approved=true;a.queue[0].status='aprovado';
 const b=instagramOnlyBook();
 assert.equal(b.media[0].approved,false);
 assert.equal(b.queue[0].status,'rascunho');
});

test('ciclo local sincroniza sem chamar nenhuma API Google, mesmo sem secrets',async()=>{
 const s=store(),e=config();
 const report=await cycle(e,{
   store:s,meta:{},
   now:Date.parse('2026-11-14T13:00:00Z'),
   fetcher:async()=>{throw new Error('Falha: chamada de rede desnecessária');}
 });
 assert.equal(report[0].status,'bloqueado');
 const book=await s.read('workbook');
 assert.equal(book.queue.length,3);
 assert.equal(book.media.length,3);
 const sync=await s.read('sync');assert.equal(sync.source,'github');
 assert.equal((await s.read('ledger',{}))['vrf_retrofit_001:instagram'],undefined);
});

test('modo Instagram recusa login de Facebook e mantém OAuth Instagram',async()=>{
 const s=store(),e=config();
 assert.equal((await oauthStart(new Request(e.PUBLIC_BASE_URL),e,s,'facebook')).status,400);
 const response=await oauthStart(new Request(e.PUBLIC_BASE_URL),e,s,'instagram');
 assert.equal(response.status,303);
 const url=new URL(response.headers.get('Location'));
 assert.equal(url.hostname,'www.instagram.com');
 assert.equal(url.searchParams.get('scope'),'instagram_business_basic,instagram_business_content_publish');
 assert.match(response.headers.get('Set-Cookie'),/HttpOnly; Secure; SameSite=Lax/);
});
