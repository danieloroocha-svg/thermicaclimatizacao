/**
 * Notifica a equipe comercial após INSERT confirmado pelo banco.
 * Acionado somente por Database Webhooks do Supabase (contact_requests / whatsapp_leads).
 * Requer chave secreta do projeto no cabeçalho apikey (auth: 'secret').
 */
import { withSupabase } from "npm:@supabase/server@^1";

type Row = Record<string, unknown>;
type WebhookPayload = {
  type: string;
  schema: string;
  table: string;
  record: Row | null;
};

function value(row: Row, key: string, max = 3000): string {
  const raw = row[key];
  return typeof raw === "string" ? raw.trim().slice(0, max) : "";
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function details(row: Row, table: string): Array<[string, string]> {
  const shared: Array<[string, string]> = [
    ["Nome", value(row, "name", 255)],
    ["Empresa", value(row, "company", 255)],
    ["Telefone", value(row, "phone", 40)],
    ["E-mail", value(row, "email", 255)],
  ];
  if (table === "whatsapp_leads") {
    return [
      ...shared,
      ["Página de origem", value(row, "page_title", 500)],
      ["URL de origem", value(row, "page_url", 1500)],
    ];
  }
  return [
    ...shared,
    ["Cidade / UF", value(row, "city", 120)],
    ["Tipo de demanda", value(row, "demand_type", 100)],
    ["Situação do projeto", value(row, "project_status", 100)],
    ["Fabricante", value(row, "manufacturer", 100)],
    ["Mensagem", value(row, "message")],
    ["Possui anexo", value(row, "attachment_path") ? "Sim (arquivo privado no Supabase Storage)" : "Não"],
  ];
}

export default {
  fetch: withSupabase({ auth: "secret" }, async (req: Request): Promise<Response> => {
    if (req.method !== "POST") {
      return Response.json({ error: "Método não permitido" }, { status: 405 });
    }

    let payload: WebhookPayload;
    try {
      payload = await req.json() as WebhookPayload;
    } catch {
      return Response.json({ error: "JSON inválido" }, { status: 400 });
    }

    const table = payload?.table;
    const row = payload?.record;
    if (payload?.type !== "INSERT" || payload?.schema !== "public" ||
      (table !== "contact_requests" && table !== "whatsapp_leads") ||
      !row || typeof row !== "object" || Array.isArray(row)) {
      return Response.json({ error: "Evento inválido" }, { status: 400 });
    }

    const leadId = value(row, "id", 64);
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(leadId)) {
      return Response.json({ error: "ID do lead inválido" }, { status: 400 });
    }

    const apiKey = Deno.env.get("RESEND_API_KEY");
    const from = Deno.env.get("LEAD_NOTIFICATION_FROM");
    const to = Deno.env.get("LEAD_NOTIFICATION_TO") || "comercial@thermicaclimatizacao.com.br";
    if (!apiKey || !from) {
      console.error("[notify-new-lead] Configuração de e-mail ausente.");
      return Response.json({ error: "Notificação não configurada" }, { status: 503 });
    }

    const kind = table === "contact_requests" ? "Solicitação de avaliação técnica" : "Contato via WhatsApp";
    const rows = details(row, table).filter(([, v]) => Boolean(v));
    const subject = `[THÉRMICA] Novo lead — ${kind}`;
    const htmlRows = rows.map(([label, v]) =>
      `<tr><th align="left" style="padding:8px;border-bottom:1px solid #ddd;vertical-align:top">${escapeHtml(label)}</th><td style="padding:8px;border-bottom:1px solid #ddd;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`
    ).join("");
    const html = `<h2>Novo lead recebido pela THÉRMICA</h2><p><strong>Origem:</strong> ${escapeHtml(kind)}</p><table style="border-collapse:collapse">${htmlRows}</table><p>ID do registro: ${escapeHtml(leadId)}</p><p>Consulte e gerencie no <a href="https://thermicaclimatizacao.com.br/painel">painel comercial</a>.</p>`;
    const text = [`Novo lead: ${kind}`, ...rows.map(([k, v]) => `${k}: ${v}`), `ID: ${leadId}`, "Painel: https://thermicaclimatizacao.com.br/painel"].join("\n\n");

    try {
      const sent = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Idempotency-Key": `thermica-${table}-${leadId}`,
        },
        body: JSON.stringify({ from, to: [to], subject, html, text }),
      });
      if (!sent.ok) {
        console.error(`[notify-new-lead] Falha na API de e-mail (HTTP ${sent.status}).`);
        return Response.json({ error: "Falha ao enviar notificação" }, { status: 502 });
      }
      return Response.json({ ok: true });
    } catch {
      console.error("[notify-new-lead] Falha de rede no serviço de e-mail.");
      return Response.json({ error: "Falha de rede" }, { status: 502 });
    }
  }),
};
