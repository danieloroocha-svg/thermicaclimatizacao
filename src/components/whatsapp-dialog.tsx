import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WhatsAppGlyph } from "@/components/whatsapp-icon";
import { supabase } from "@/integrations/supabase/client";

/**
 * Loaded only on demand when someone opens the WhatsApp lead form.
 * The existing Supabase insert, fields and click-open behavior are preserved.
 */
const NUMBER = "5511955046147";
type Props = {
  page: string;
  pageUrl: string;
  onOpenChange: (open: boolean) => void;
};

export default function WhatsAppDialog({ page, pageUrl, onOpenChange }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    onOpenChange(false);
  }


  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
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
  );
}
