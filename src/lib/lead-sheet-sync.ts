/**
 * Backup comercial de novos leads no Google Sheets.
 *
 * Ativar SOMENTE após publicar/testar o Google Apps Script:
 * preencher com a URL de implantação terminada em /exec.
 * A URL é pública; não é uma credencial ou autenticação.
 */
export const GOOGLE_LEADS_WEB_APP_URL = "";

export type LeadForSheet = {
  id: string;
  channel: "Formulário técnico" | "WhatsApp";
  name: string;
  company: string;
  phone: string;
  email: string;
  city?: string;
  demandType?: string;
  projectStatus?: string;
  manufacturer?: string;
  message?: string;
  pageTitle?: string;
  pageUrl?: string;
  attachment?: boolean;
};

/**
 * Não interrompe o envio principal ao Supabase. O Google Apps Script
 * responde em outra origem (resposta opaca), então o navegador não deve
 * afirmar que a linha foi persistida nem que o e-mail chegou.
 */
export function mirrorLeadToGoogleSheet(lead: LeadForSheet): void {
  if (!GOOGLE_LEADS_WEB_APP_URL || typeof navigator === "undefined") return;

  const data = JSON.stringify(lead);
  let queued = false;
  try {
    queued = navigator.sendBeacon(
      GOOGLE_LEADS_WEB_APP_URL,
      new Blob([data], { type: "text/plain" }),
    );
  } catch {
    queued = false;
  }
  if (!queued) {
    void fetch(GOOGLE_LEADS_WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "text/plain" },
      body: data,
    }).catch(() => {
      console.warn("[THÉRMICA] Falha de transporte na cópia para Google Sheets.");
    });
  }
}
