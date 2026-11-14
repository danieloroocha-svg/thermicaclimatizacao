import {randomBytes,createCipheriv,createDecipheriv} from 'node:crypto';
export class D1Store {
 constructor(db,key,{clock=Date.now}={}) {
  if(!/^[a-f0-9]{64}$/i.test(key||'')) throw new Error('Chave de cifragem inválida');
  this.db=db;this.key=Buffer.from(key,'hex');this.clock=clock;this.owner=null;
 }
 async assertLease() {
  const lease=await this.db.prepare('SELECT owner,expires_at FROM social_lease WHERE id=1').first();
  if(!this.owner||lease?.owner!==this.owner||lease.expires_at<=this.clock()) throw new Error('Lease perdida; bloqueado');
 }
 async read(name,fallback={}) {
  await this.assertLease();
  return this.readSnapshot(name,fallback);
 }
 async readSnapshot(name,fallback={}) {
  const row=await this.db.prepare('SELECT ciphertext FROM social_state WHERE name=?').bind(name).first();
  if(!row) return structuredClone(fallback);
  const v=JSON.parse(row.ciphertext),d=createDecipheriv('aes-256-gcm',this.key,Buffer.from(v.iv,'hex'));
  d.setAAD(Buffer.from(name));d.setAuthTag(Buffer.from(v.tag,'hex'));
  return JSON.parse(Buffer.concat([d.update(Buffer.from(v.body,'hex')),d.final()]).toString());
 }
 async write(name,value) {
  if(!this.owner) throw new Error('Escrita fora de lease');
  const iv=randomBytes(12),c=createCipheriv('aes-256-gcm',this.key,iv);c.setAAD(Buffer.from(name));
  const body=Buffer.concat([c.update(Buffer.from(JSON.stringify(value))),c.final()]);
  const ciphertext=JSON.stringify({iv:iv.toString('hex'),tag:c.getAuthTag().toString('hex'),body:body.toString('hex')});
  if(Buffer.byteLength(ciphertext)>1500000) throw new Error('Limite preventivo de estado atingido');
  const result=await this.db.prepare('INSERT INTO social_state(name,ciphertext) SELECT ?,? WHERE EXISTS(SELECT 1 FROM social_lease WHERE id=1 AND owner=? AND expires_at>?) ON CONFLICT(name) DO UPDATE SET ciphertext=excluded.ciphertext').bind(name,ciphertext,this.owner,this.clock()).run();
  if(result.meta.changes!==1) throw new Error('Lease perdida; escrita bloqueada');
 }
 async lock(fn) {
  if(this.owner) throw new Error('Lease aninhada proibida');
  const owner=randomBytes(24).toString('hex');
  const r=await this.db.prepare('UPDATE social_lease SET owner=?,expires_at=? WHERE id=1 AND expires_at<=?').bind(owner,this.clock()+300000,this.clock()).run();
  if(r.meta.changes!==1) throw new Error('Outro ciclo está executando');
  this.owner=owner;
  try {return await fn();} finally {
   await this.db.prepare('UPDATE social_lease SET owner=NULL,expires_at=0 WHERE id=1 AND owner=?').bind(owner).run();this.owner=null;
  }
 }
}
