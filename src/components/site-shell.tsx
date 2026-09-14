import { Link } from "@tanstack/react-router";
import { ChevronDown, Mail, MapPin, Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site-data";

const mainLinks = [
  ["/", "Home"], ["/empresa", "Empresa"], ["/obras", "Obras"], ["/conteudo", "Conteúdo"], ["/contato", "Contato"],
] as const;
const solutionLinks = [
  ["/sistemas-vrv-vrf", "Sistemas VRV/VRF"], ["/instalacao-vrv-vrf", "Nova Instalação"], ["/retrofit-vrv-vrf", "Retrofit"],
] as const;

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  return <div className="min-h-screen bg-background text-foreground">
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" aria-label="THÉRMICA — Home"><img src={SITE.logo} alt="THÉRMICA" className="h-12 w-auto max-w-44 object-contain" /></Link>
        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
          <Link to="/" activeOptions={{ exact: true }} className="nav-link">Home</Link>
          <Link to="/empresa" className="nav-link">Empresa</Link>
          <div className="group relative">
            <button className="nav-link flex items-center gap-1 py-7" aria-haspopup="true">Soluções <ChevronDown className="size-4" /></button>
            <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 border-t-2 border-accent bg-primary p-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              {solutionLinks.map(([to,label]) => <Link key={to} to={to} className="block px-4 py-3 text-sm text-primary-foreground hover:bg-secondary/20">{label}</Link>)}
            </div>
          </div>
          {mainLinks.slice(2).map(([to,label]) => <Link key={to} to={to} className="nav-link">{label}</Link>)}
        </nav>
        <Button asChild className="hidden h-11 bg-accent px-5 text-accent-foreground hover:bg-accent/90 xl:inline-flex"><Link to="/contato">Solicitar avaliação técnica</Link></Button>
        <Button variant="ghost" size="icon" className="lg:hidden" aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </div>
      {open && <nav aria-label="Navegação mobile" className="border-t border-border bg-background px-5 pb-6 lg:hidden">
        <Link to="/" onClick={() => setOpen(false)} className="mobile-link">Home</Link>
        <Link to="/empresa" onClick={() => setOpen(false)} className="mobile-link">Empresa</Link>
        <button className="mobile-link flex w-full items-center justify-between" onClick={() => setSolutionsOpen(!solutionsOpen)}>Soluções <ChevronDown className={`size-4 transition ${solutionsOpen ? "rotate-180" : ""}`} /></button>
        {solutionsOpen && <div className="border-l-2 border-accent pl-4">{solutionLinks.map(([to,label]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="mobile-link text-sm">{label}</Link>)}</div>}
        {mainLinks.slice(2).map(([to,label]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="mobile-link">{label}</Link>)}
        <Button asChild className="mt-4 w-full bg-accent text-accent-foreground"><Link to="/contato" onClick={() => setOpen(false)}>Solicitar avaliação técnica</Link></Button>
      </nav>}
    </header>
    <main className="pt-20">{children}</main>
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div><img src={SITE.logo} alt="THÉRMICA" className="h-16 w-auto brightness-0 invert" /><p className="mt-5 max-w-md text-sm leading-7 text-primary-foreground/70">Engenharia, instalação, retrofit e modernização de sistemas VRV/VRF para operações corporativas e empreendimentos.</p></div>
        <div><h2 className="footer-title">Navegação</h2><div className="grid gap-2 text-sm text-primary-foreground/75"><Link to="/empresa">Empresa</Link><Link to="/obras">Obras</Link><Link to="/qualificacao-tecnica">Qualificação técnica</Link><Link to="/conteudo">Conteúdo</Link><Link to="/contato">Contato</Link></div></div>
        <div><h2 className="footer-title">Contato</h2><div className="space-y-3 text-sm text-primary-foreground/75"><p className="flex gap-2"><MapPin className="mt-1 size-4 shrink-0 text-accent" />{SITE.address}</p><a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="flex gap-2"><MessageCircle className="size-4 text-accent" />{SITE.phone}</a><a href={`mailto:${SITE.email}`} className="flex gap-2 break-all"><Mail className="size-4 shrink-0 text-accent" />{SITE.email}</a><p className="pt-2 text-xs">CNPJ e registros técnicos: a informar.</p></div></div>
      </div>
      <div className="border-t border-primary-foreground/10 px-5 py-5 text-center text-xs text-primary-foreground/50">© 2026 THÉRMICA Soluções em Climatização Ltda.</div>
    </footer>
  </div>;
}

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="hero-band"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><p className="eyebrow">{eyebrow}</p><h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">{title}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/75">{description}</p></div></section>;
}

export function ContactBand() { return <section className="bg-secondary"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-14 md:flex-row md:items-center lg:px-8"><div><p className="eyebrow text-primary">Próximo passo</p><h2 className="mt-3 text-3xl font-semibold">Vamos avaliar sua demanda?</h2><p className="mt-3 text-muted-foreground">Você não precisa ter um projeto pronto para iniciar a conversa.</p></div><div className="flex flex-wrap gap-3"><Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/contato">Solicitar avaliação técnica</Link></Button><Button asChild size="lg" variant="outline"><a href={SITE.whatsapp} target="_blank" rel="noreferrer"><MessageCircle /> Falar com nossa equipe</a></Button></div></div></section>; }