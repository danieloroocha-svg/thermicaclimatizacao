import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WhatsAppGlyph } from "@/components/whatsapp-icon";
import { supabase } from "@/integrations/supabase/client";

const NUMBER = "5511955913582";

function currentPage() {
  const title = document.title.split("|")[0]?.trim();
  const h1 = document.querySelector("h1")?.textContent?.trim();
  return title || h1 || "site";
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function openDialog() {
    setPage(currentPage());
    setError("");
    setOpen(true);
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const f = new FormData(e.currentTarget);
    const lead = {
      name: String(f.get("name")).trim(),
      email: String(f.get("email")).trim(),
      company: String(f.get("company")).trim(),
      phone: String(f.get("phone")).trim(),
    };
    const win = window.open("", "_blank");
    const { error: err } = await supabase.from("whatsapp_leads").insert({ ...lead, page_title: page, page_url: location.href });
    if (err) {
      win?.close();
      setError("Não foi possível continuar agora. Tente novamente.");
      setLoading(false);
      return;
    }
    const text = `Olá! Sou ${lead.name}, da ${lead.company}. Estou na página "${page}" do site da THÉRMICA e gostaria de falar sobre uma demanda de climatização.`;
    const url = `https://wa.me/${NUMBER}?text=${encodeURIComponent(text)}`;
    if (win) win.location.href = url; else location.href = url;
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
          <p className="rounded-md border border-border bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
            Assunto da conversa: <span className="font-semibold text-foreground">{page}</span>
          </p>
        )}
        <form onSubmit={submit} className="grid gap-4">
          {([["name", "Nome", "text"], ["company", "Empresa", "text"], ["email", "E-mail", "email"], ["phone", "Telefone", "tel"]] as const).map(([n, l, t]) =>
            <div key={n}><Label htmlFor={`wa-${n}`}>{l}</Label><Input id={`wa-${n}`} name={n} type={t} required minLength={n === "phone" ? 8 : 2} maxLength={n === "phone" ? 40 : 255} className="mt-2" /></div>)}
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button disabled={loading} size="lg" className="w-full gap-2 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp-strong">
            {loading ? <Loader2 className="animate-spin" /> : <WhatsAppGlyph className="size-5" />}Continuar no WhatsApp
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  </>;
}
