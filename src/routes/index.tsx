import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, ClipboardCheck, Gauge, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactBand } from "@/components/site-shell";
import { ProjectGrid } from "@/components/project-grid";
import { projects, SITE, meta, BASE_URL } from "@/lib/site-data";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  head: () => {
    const base = meta(
      "Engenharia VRV/VRF em São Paulo | THÉRMICA",
      "Engenharia, instalação, retrofit e modernização de sistemas VRV/VRF para empresas e empreendimentos.",
      "/",
    );
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HVACBusiness",
            name: SITE.name,
            url: BASE_URL,
            email: SITE.email,
            telephone: "+5511955913582",
            areaServed: "Brasil",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Estrada das Lágrimas, 489",
              addressLocality: "São Paulo",
              addressRegion: "SP",
              postalCode: "04232-000",
              addressCountry: "BR",
            },
            knowsAbout: [
              "Sistemas VRV/VRF",
              "Instalação de climatização",
              "Retrofit de climatização",
              "Engenharia de climatização",
            ],
          }),
        },
      ],
    };
  },
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <>
    <section className="relative min-h-[78vh] overflow-hidden bg-primary text-primary-foreground"><img src={projects[0].image} alt="Obra corporativa com sistema VRF executado pela THÉRMICA" className="absolute inset-0 h-full w-full object-cover opacity-45" /><div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/15" /><div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center px-5 py-20 lg:px-8"><div className="max-w-3xl"><p className="eyebrow">Engenharia de climatização B2B</p><h1 className="mt-5 text-4xl font-semibold leading-[1.08] md:text-6xl">Soluções VRV/VRF para ambientes que não podem parar.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-primary-foreground/80">Da avaliação técnica à partida do sistema, a THÉRMICA conduz instalações, retrofits e modernizações com método, compatibilização e responsabilidade de execução.</p><div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/contato">Solicitar avaliação técnica <ArrowRight /></Link></Button><Button asChild size="lg" variant="outline" className="border-primary-foreground/30 bg-primary/20 text-primary-foreground hover:bg-primary-foreground/10"><a href={SITE.whatsapp} target="_blank" rel="noreferrer">Falar com nossa equipe</a></Button></div></div></div></section>
    <section className="border-b border-border bg-secondary"><div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 py-8 md:grid-cols-4 lg:px-8">{[["Desde 2015","Atuação empresarial"],["+20 anos","Experiência do corpo técnico"],["VRV / VRF","Especialização estratégica"],["Multimarcas","Integração por aplicação"]].map(([a,b])=><div key={a} className="border-l border-border px-4 py-2"><strong className="block text-xl text-primary">{a}</strong><span className="text-xs text-muted-foreground">{b}</span></div>)}</div></section>
    <section className="section"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="max-w-3xl"><p className="eyebrow text-primary">Capacidade técnica</p><h2 className="section-title">Engenharia aplicada ao ciclo completo da climatização.</h2><p className="section-copy">Uma abordagem estruturada para novas implantações, substituições e modernizações em edifícios corporativos, operações industriais e ambientes de missão crítica.</p></div><div className="mt-12 grid gap-6 md:grid-cols-3"><article className="border-t-2 border-accent bg-secondary p-7"><Gauge className="size-7 text-accent"/><h3 className="mt-6 text-xl font-semibold">Sistemas VRV/VRF</h3><p className="mt-3 leading-7 text-muted-foreground">Análise de aplicação, arquitetura do sistema e integração com a operação.</p><Link to="/sistemas-vrv-vrf" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">Conhecer solução <ArrowRight className="size-4"/></Link></article><article className="border-t-2 border-accent bg-secondary p-7"><Building2 className="size-7 text-accent"/><h3 className="mt-6 text-xl font-semibold">Nova instalação</h3><p className="mt-3 leading-7 text-muted-foreground">Planejamento, infraestrutura, execução, testes e entrega técnica.</p><Link to="/instalacao-vrv-vrf" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">Conhecer solução <ArrowRight className="size-4"/></Link></article><article className="border-t-2 border-accent bg-secondary p-7"><RefreshCcw className="size-7 text-accent"/><h3 className="mt-6 text-xl font-semibold">Retrofit</h3><p className="mt-3 leading-7 text-muted-foreground">Diagnóstico e modernização com atenção à continuidade operacional.</p><Link to="/retrofit-vrv-vrf" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">Conhecer solução <ArrowRight className="size-4"/></Link></article></div></div></section>
    <section className="section bg-primary text-primary-foreground"><div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8"><div><p className="eyebrow">Método de trabalho</p><h2 className="mt-4 text-4xl font-semibold">Decisões técnicas antes da execução.</h2><p className="mt-5 leading-8 text-primary-foreground/70">Levantamos as condições reais da edificação, compatibilizamos disciplinas e definimos uma sequência segura para cada etapa.</p><Button asChild variant="outline" className="mt-8 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"><Link to="/qualificacao-tecnica">Conhecer qualificação técnica</Link></Button></div><div className="grid gap-5">{["Avaliação e levantamento de campo","Planejamento e compatibilização","Instalação e controle de qualidade","Testes, partida e entrega técnica"].map((x,i)=><div key={x} className="flex gap-5 border-b border-primary-foreground/15 pb-5"><span className="font-display text-3xl text-accent">0{i+1}</span><p className="pt-2 text-lg">{x}</p></div>)}</div></div></section>
    <section className="section"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mb-10 flex items-end justify-between gap-6"><div><p className="eyebrow text-primary">Obras selecionadas</p><h2 className="section-title">Experiência em diferentes contextos.</h2></div><Link to="/obras" className="hidden items-center gap-2 font-semibold text-primary md:flex">Ver todas <ArrowRight className="size-4"/></Link></div><ProjectGrid limit={3}/></div></section>
    <section className="section bg-secondary"><div className="mx-auto max-w-7xl px-5 lg:px-8"><p className="eyebrow text-primary">Segmentos atendidos</p><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{["Corporativo e administrativo","Industrial e logístico","Saúde e educação","Institucional e alto padrão"].map((x)=><div key={x} className="flex items-center gap-3 border border-border bg-background p-5"><ClipboardCheck className="size-5 text-accent"/><span className="font-medium">{x}</span></div>)}</div></div></section><ContactBand />
  </>;
}
