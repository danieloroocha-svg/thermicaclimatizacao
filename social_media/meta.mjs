export class Meta {
  constructor({fetcher=fetch,version='v25.0'}={}) {this.fetcher=fetcher;this.version=version;}
  async request(url,{method='GET',token,form}={}) {
    const r=await this.fetcher(url,{method,headers:{...(token?{Authorization:`Bearer ${token}`}:{})},body:form?new URLSearchParams(form):undefined,signal:AbortSignal.timeout(30000)});
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
