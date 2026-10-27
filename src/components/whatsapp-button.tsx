import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WhatsAppGlyph } from "@/components/whatsapp-icon";
import { supabase } from "@/integrations/supabase/client";

/** Destino no projeto: src/components/whatsapp-button.tsx */
const NUMBER = "5511955046147";
const OPEN_WHATSAPP_EVENT = "thermica:open-whatsapp";

function currentPage() {
  const title = document.title.split("|")[0]?.trim();
  const h1 = document.querySelector("h1")?.textContent?.trim();
  return { title: title || h1 || "site", url: window.location.href };
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const openDialog = useCallback(() => {
    const context = currentPage();
    setPage(context.title);
    setPageUrl(context.url);
    setError("");
    setOpen(true);
  }, []);

  // CTAs internos abrem o mesmo formulário global e preservam a captação de leads.
  useEffect(() => {
    window.addEventListener(OPEN_WHATSAPP_EVENT, openDialog);
    return () => window.removeEventListener(OPEN_WHATSAPP_EVENT, openDialog);
  }, [openDialog]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const lead = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      company: String(form.get("company") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
    };

    // O popup nasce do gesto do usuário para não ser bloqueado após o insert.
    const win = window.open("", "_blank");
    const sourceUrl = pageUrl || window.location.href;
    const { error: err } = await supabase.from("whatsapp_leads").insert({
      ...lead,
      page_title: page,
      page_url: sourceUrl,
    });

    if (err) {
      win?.close();
      setError("Não foi possível continuar agora. Tente novamente.");
      setLoading(false);
      return;
    }

    const message =
      `Olá! Sou ${lead.name}, da ${lead.company}.\n` +
      `Estou na página: ${sourceUrl}\n` +
      `Assunto: ${page}.\n` +
      "Gostaria de conversar sobre uma demanda de climatização e solicitar uma avaliação técnica.";
    const whatsappUrl = `https://wa.me/${NUMBER}?text=${encodeURIComponent(message)}`;

    if (win) win.location.href = whatsappUrl;
    else window.location.href = whatsappUrl;
    setLoading(false);
    setOpen(false);
  }

  return <>
    <button type="button" onClick={openDialog} aria-label="Falar com nossa equipe pelo WhatsApp" className="group wa-fab">
      <span className="wa-fab-label" aria-hidden="true">
        <span className="block whitespace-nowrap pr-3 text-sm font-semibold">Falar com nossa equipe</span>
      </span>
      <span className="relative flex shrink-0 items-center justify-center">
        <span className="wa-fab-halo" aria-hidden="true" />
        <WhatsAppGlyph className="relative size-8 sm:size-9" />
      </span>
    </button>

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-start gap-3.5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground ring-1 ring-whatsapp-foreground/20">
              <WhatsAppGlyph className="size-6" />
            </span>
            <div>
              <DialogTitle>Falar com nossa equipe</DialogTitle>
              <DialogDescription>Informe seus dados para continuar a conversa no WhatsApp.</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        {page && (
          <div className="rounded-md border border-border bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
            Assunto: <span className="font-semibold text-foreground">{page}</span>
            <p className="mt-1 break-all">Página de origem: {pageUrl}</p>
          </div>
        )}
        <form onSubmit={submit} className="grid gap-4">
          {([[
            "name", "Nome", "text"
          ], ["company", "Empresa", "text"], ["email", "E-mail", "email"], ["phone", "Telefone", "tel"]] as const).map(([name, label, type]) => (
            <div key={name}>
              <Label htmlFor={`wa-${name}`}>{label}</Label>
              <Input id={`wa-${name}`} name={name} type={type} required minLength={name === "phone" ? 8 : 2} maxLength={name === "phone" ? 40 : 255} className="mt-2" />
            </div>
          ))}
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button disabled={loading} size="lg" className="w-full gap-2 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp-strong">
            {loading ? <Loader2 className="animate-spin" /> : <WhatsAppGlyph className="size-5" />}
            Continuar no WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  </>;
}
