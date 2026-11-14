import {mkdirSync,readFileSync,writeFileSync,renameSync,openSync,closeSync,unlinkSync} from 'node:fs';
import {join} from 'node:path';
import {randomBytes,createCipheriv,createDecipheriv} from 'node:crypto';
export class Store {
  constructor(dir, key) {
    if (!/^[a-f0-9]{64}$/i.test(key || '')) throw new Error('SOCIAL_ENCRYPTION_KEY deve conter 32 bytes hex');
    this.key=Buffer.from(key,'hex'); this.dir=dir; mkdirSync(dir,{recursive:true,mode:0o700});
  }
  read(name,fallback={}) {
    try { const data=JSON.parse(readFileSync(join(this.dir,name+'.json'),'utf8')); const d=createDecipheriv('aes-256-gcm',this.key,Buffer.from(data.iv,'hex')); d.setAuthTag(Buffer.from(data.tag,'hex')); return JSON.parse(Buffer.concat([d.update(Buffer.from(data.body,'hex')),d.final()]).toString()); }
    catch(e) { if(e.code==='ENOENT') return fallback; throw new Error('Estado ilegível; execução bloqueada'); }
  }
  write(name,value) {
    const iv=randomBytes(12),c=createCipheriv('aes-256-gcm',this.key,iv); const body=Buffer.concat([c.update(JSON.stringify(value)),c.final()]); const path=join(this.dir,name+'.json');
    writeFileSync(path+'.tmp',JSON.stringify({iv:iv.toString('hex'),tag:c.getAuthTag().toString('hex'),body:body.toString('hex')}),{mode:0o600}); renameSync(path+'.tmp',path);
  }
  async lock(fn) { const path=join(this.dir,'worker.lock'); let fd; try {fd=openSync(path,'wx',0o600);} catch {throw new Error('Worker ocupado ou lock residual: verificar processo antes de remover');} try {return await fn();} finally {closeSync(fd);unlinkSync(path);} }
}
