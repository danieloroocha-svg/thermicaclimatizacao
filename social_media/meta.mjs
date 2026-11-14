export class Meta {
  constructor({fetcher=fetch,version='v25.0'}={}) {this.fetcher=fetcher;this.version=version;}
  async request(url,{method='GET',token,form}={}) {
    const r=await this.fetcher(url,{method,redirect:'error',headers:{...(token?{Authorization:`Bearer ${token}`}:{})},body:form?new URLSearchParams(form):undefined,signal:AbortSignal.timeout(30000)});
    let data; try {data=await r.json();} catch {throw new Error('Resposta Meta inválida; verificar recibo antes de repetir');}
    if(!r.ok||data.error) throw new Error(`Meta HTTP ${r.status}; código ${Number(data.error?.code)||0}`);
    return data;
  }
  ig(path,options) {return this.request(`https://graph.instagram.com/${this.version}/${path}`,options);}
  async exchange(code,env) {
    const short=await this.request('https://api.instagram.com/oauth/access_token',{method:'POST',form:{client_id:env.INSTAGRAM_APP_ID,client_secret:env.INSTAGRAM_APP_SECRET,grant_type:'authorization_code',redirect_uri:env.INSTAGRAM_REDIRECT_URI,code}});
    const url=new URL('https://graph.instagram.com/access_token'); url.search=new URLSearchParams({grant_type:'ig_exchange_token',client_secret:env.INSTAGRAM_APP_SECRET,access_token:short.access_token});
    const long=await this.request(url); const me=await this.ig('me?fields=user_id,username',{token:long.access_token});
    return {...long,user_id:me.user_id,username:me.username,issued_at:Date.now(),expires_at:Date.now()+long.expires_in*1000};
  }
  async refresh(t) {const u=new URL('https://graph.instagram.com/refresh_access_token');u.search=new URLSearchParams({grant_type:'ig_refresh_token',access_token:t.access_token});const n=await this.request(u);return {...t,...n,issued_at:Date.now(),expires_at:Date.now()+n.expires_in*1000};}
  create(t,p) {return this.ig(`${t.user_id}/media`,{method:'POST',token:t.access_token,form:{image_url:p.media_url,caption:p.texto}});}
  status(t,id) {return this.ig(`${id}?fields=status_code`,{token:t.access_token});}
  publish(t,id) {return this.ig(`${t.user_id}/media_publish`,{method:'POST',token:t.access_token,form:{creation_id:id}});}
  receipt(t,id) {return this.ig(`${id}?fields=id,permalink,timestamp`,{token:t.access_token});}
  facebook(t,p) {return this.request(`https://graph.facebook.com/${this.version}/${t.page_id}/photos`,{method:'POST',token:t.access_token,form:{url:p.media_url,caption:p.texto,published:'true'}});}
}

Meta.prototype.exchangeFacebook = async function(code,env) {
 const graph=`https://graph.facebook.com/${this.version}`;
 const requestToken=async(params)=>{const u=new URL(graph+'/oauth/access_token');u.search=new URLSearchParams(params);return this.request(u);};
 const short=await requestToken({client_id:env.FACEBOOK_APP_ID,client_secret:env.FACEBOOK_APP_SECRET,redirect_uri:env.FACEBOOK_REDIRECT_URI,code});
 const long=await requestToken({grant_type:'fb_exchange_token',client_id:env.FACEBOOK_APP_ID,client_secret:env.FACEBOOK_APP_SECRET,fb_exchange_token:short.access_token});
 const permissions=await this.request(graph+'/me/permissions',{token:long.access_token});
 for(const scope of ['pages_show_list','pages_read_engagement','pages_manage_posts']) if(!permissions.data?.some(p=>p.permission===scope&&p.status==='granted')) throw new Error('Permissão Pages ausente');
 const pages=await this.request(graph+'/me/accounts?fields=id,name,access_token,tasks&limit=100',{token:long.access_token});
 // Explicit page selection is configuration, never silently choose the first page.
 const page=pages.data?.find(p=>p.id===env.FACEBOOK_PAGE_ID);
 if(!page||!page.access_token||!page.tasks?.some(t=>['CREATE_CONTENT','MANAGE','PROFILE_PLUS_CREATE_CONTENT'].includes(t))) throw new Error('Página autorizada não encontrada ou sem tarefa CREATE_CONTENT');
 const debugURL=new URL(graph+'/debug_token');debugURL.searchParams.set('input_token',page.access_token);
 const debug=await this.request(debugURL,{token:`${env.FACEBOOK_APP_ID}|${env.FACEBOOK_APP_SECRET}`});
 if(!debug.data?.is_valid) throw new Error('Token de Página inválido');
 return {page_id:page.id,access_token:page.access_token,issued_at:Date.now(),expires_at:debug.data.expires_at?debug.data.expires_at*1000:null,data_access_expires_at:debug.data.data_access_expires_at?debug.data.data_access_expires_at*1000:null};
};
Meta.prototype.facebookStatus = function(t) {return this.request(`https://graph.facebook.com/${this.version}/${t.page_id}?fields=id`,{token:t.access_token});};
Meta.prototype.reconcile = async function(t,channel,r) {
 if(!t) return null;
 if(channel==='instagram'&&(!r.container_id||(await this.status(t,r.container_id)).status_code!=='PUBLISHED')) return null;
 const since=Math.floor((r.started_at-120000)/1000),until=Math.floor((r.started_at+900000)/1000);
 const u=channel==='instagram'?`https://graph.instagram.com/${this.version}/${t.user_id}/media?fields=id,caption,permalink,timestamp&limit=100`:`https://graph.facebook.com/${this.version}/${t.page_id}/published_posts?fields=id,message,permalink_url,created_time&since=${since}&until=${until}&limit=100`;
 const data=await this.request(u,{token:t.access_token});
 const matches=(data.data||[]).filter(p=> (p.caption||p.message)===r.caption&&Date.parse(p.timestamp||p.created_time)>=r.started_at-120000&&Date.parse(p.timestamp||p.created_time)<=r.started_at+900000);
 // A single exact caption in the narrow send window is positive evidence only.
 // Pagination or ambiguity leaves the send uncertain and blocks retries.
 return matches.length===1&&!data.paging?.next?matches[0]:null;
};
