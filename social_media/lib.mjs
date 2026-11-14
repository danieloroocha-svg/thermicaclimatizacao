export const CHANNELS = new Set(["facebook", "linkedin", "instagram", "blog"]);
export function validateQueue(queue) {
  if (!Array.isArray(queue)) throw new Error("Fila precisa ser uma lista");
  const seen = new Set();
  for (const post of queue) {
    if (!post || typeof post !== "object") throw new Error("Post inválido");
    if (typeof post.id !== "string" || !/^[a-z0-9][a-z0-9_-]{2,80}$/.test(post.id)) throw new Error("ID inválido");
    if (seen.has(post.id)) throw new Error("ID duplicado: " + post.id);
    seen.add(post.id);
    if (!["rascunho", "aprovado", "pausado"].includes(post.status)) throw new Error("Status inválido: " + post.id);
    if (typeof post.texto !== "string" || post.texto.trim().length < 30) throw new Error("Legenda muito curta: " + post.id);
    if (typeof post.scheduled_at !== "string" || !/(Z|[+-]\d\d:\d\d)$/.test(post.scheduled_at) || Number.isNaN(Date.parse(post.scheduled_at))) throw new Error("Data ISO com fuso obrigatória: " + post.id);
    if (!Array.isArray(post.channels) || !post.channels.length || post.channels.some(c=>!CHANNELS.has(c))) throw new Error("Canal inválido: " + post.id);
  }
  return queue;
}
export function preview(queue, now = new Date()) {
  const valid = validateQueue(queue);
  return valid.map(p => {
    const due = Date.parse(p.scheduled_at) <= now.getTime();
    const situation = p.status === "pausado" ? "pausado" : p.status === "rascunho" ? "aguardando_aprovacao" : due ? "elegivel" : "programado";
    return { id: p.id, status: situation, canais: p.channels, agendado_em: p.scheduled_at, tema: p.tema || "", imagem: p.media_id || "" };
  });
}
