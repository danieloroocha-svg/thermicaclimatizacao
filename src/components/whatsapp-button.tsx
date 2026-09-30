import { useState, type FormEvent } from "react";
import { Loader2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

const NUMBER = "5511955913582";

function currentPage() {
  const title = document.title.split("|")[0]?.trim();
  const h1 = document.querySelector("h1")?.textContent?.trim();
  return title || h1 || "site";
}

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    const page = currentPage();
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
    <button type="button" onClick={() => setOpen(true)} aria-label="Falar com nossa equipe pelo WhatsApp" className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl transition hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring sm:bottom-6 sm:right-6 sm:size-16">
      <MessageCircle className="size-7" />
    </button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Falar com nossa equipe</DialogTitle>
          <DialogDescription>Informe seus dados para continuar a conversa pelo WhatsApp.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="grid gap-4">
          {([["name","Nome","text"],["company","Empresa","text"],["email","E-mail","email"],["phone","Telefone","tel"]] as const).map(([n,l,t]) =>
            <div key={n}><Label htmlFor={`wa-${n}`}>{l}</Label><Input id={`wa-${n}`} name={n} type={t} required minLength={n==="phone"?8:2} maxLength={n==="phone"?40:255} className="mt-2" /></div>)}
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <Button disabled={loading} size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">{loading ? <Loader2 className="animate-spin" /> : <MessageCircle />}Continuar no WhatsApp</Button>
        </form>
      </DialogContent>
    </Dialog>
  </>;
}
