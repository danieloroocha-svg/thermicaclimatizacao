import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileCode2 } from "lucide-react";
import { seoSiteGroups, seoSiteEntries } from "@/lib/seo-site-directory";
import { articles, BASE_URL, meta, projects } from "@/lib/site-data";

export const Route = createFileRoute("/mapa-site")({
  staticData: { sitemap: true },
  head: () => meta(
    "Mapa do site | THÉRMICA Soluções em Climatização",
    "Mapa do site THÉRMICA: navegue pelos serviços corporativos VRV/VRF, retrofit, projetos de climatização, portfólio de obras e artigos técnicos.",
    "/mapa-site",
  ),
  component: MapaSitePage,
});

const institutional = [
  { path: "/", label: "Home" },
  { path: "/empresa", label: "Empresa" },
  { path: "/qualificacao-tecnica", label: "Qualificação técnica" },
  { path: "/obras", label: "Obras" },
  { path: "/conteudo", label: "Conteúdo técnico" },
  { path: "/contato", label: "Contato e orçamentos" },
] as const;
const solutions = [
  { path: "/sistemas-vrv-vrf", label: "Sistemas VRV/VRF" },
  { path: "/instalacao-vrv-vrf", label: "Nova instalação VRV/VRF" },
  { path: "/retrofit-vrv-vrf", label: "Retrofit VRV/VRF" },
] as const;
function Links({ items }: { items: ReadonlyArray<{path: string; label: string}> }) {
  return <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
    {items.map(item => <li key={item.path}><a href={item.path} className="inline-flex items-start gap-2 text-sm leading-6 text-foreground/85 hover:text-primary hover:underline"><ArrowRight className="mt-1 size-4 shrink-0 text-accent" aria-hidden="true" /><span>{item.label}</span></a></li>)}
  </ul>;
}
function MapaSitePage() {
  return <>
    <header className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <nav aria-label="Trilha de navegação" className="mb-7 text-sm text-primary-foreground/75"><Link to="/" className="hover:underline">Home</Link> / <span aria-current="page">Mapa do site</span></nav>
        <p className="eyebrow">Navegação completa</p>
        <h1 className="mt-4 text-4xl font-semibold md:text-6xl">Mapa do site</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-primary-foreground/80">Todas as áreas da THÉRMICA em um só lugar. Acesse as soluções, obras e conteúdos especializados em engenharia de climatização para empresas, incluindo {seoSiteEntries.length} páginas técnicas e comerciais.</p>
      </div>
    </header>
    <div className="mx-auto max-w-7xl space-y-14 px-5 py-14 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <section aria-labelledby="mapa-institucional" className="border border-border bg-secondary p-7 md:p-9">
          <h2 id="mapa-institucional" className="text-2xl font-semibold text-primary">Institucional</h2><Links items={institutional} />
        </section>
        <section aria-labelledby="mapa-solucoes" className="border border-border bg-secondary p-7 md:p-9">
          <h2 id="mapa-solucoes" className="text-2xl font-semibold text-primary">Soluções principais</h2><Links items={solutions} />
        </section>
      </div>
      <section aria-labelledby="mapa-servicos">
        <h2 id="mapa-servicos" className="text-3xl font-semibold md:text-4xl">Serviços e informações técnicas</h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">Explore as páginas especializadas para engenheiros, construtoras, gerenciadoras, facilities e compras corporativas. As expressões reproduzem literalmente as palavras-chave do estudo de SEO.</p>
        <nav aria-label="Categorias de serviços do mapa" className="mt-7 flex flex-wrap gap-3">
          {seoSiteGroups.map(g => <a key={g.slug} href={`#${g.slug}`} className="border border-border bg-secondary px-4 py-2 text-sm font-medium text-primary hover:border-accent hover:underline">{g.title} ({g.items.length})</a>)}
        </nav>
        <div className="mt-8 grid gap-7">
          {seoSiteGroups.map(g => <section key={g.slug} id={g.slug} aria-labelledby={`titulo-${g.slug}`} className="scroll-mt-28 border border-border bg-background p-6 md:p-9">
            <h3 id={`titulo-${g.slug}`} className="text-xl font-semibold text-primary md:text-2xl">{g.title} <span className="ml-2 text-sm font-normal text-muted-foreground">({g.items.length})</span></h3>
            <p className="mt-2 border-b border-border pb-5 text-sm leading-7 text-muted-foreground">{g.description}</p>
            <ul className="mt-6 grid gap-x-10 gap-y-3 md:grid-cols-2">
              {g.items.map(entry => <li key={entry.path}><a href={entry.path} className="inline-flex items-start gap-3 text-sm leading-6 text-foreground hover:text-primary hover:underline"><span aria-hidden="true" className="w-7 shrink-0 font-semibold text-accent">{String(entry.number).padStart(2,"0")}</span><span className="first-letter:uppercase">{entry.keyword}</span></a></li>)}
            </ul>
          </section>)}
        </div>
      </section>
      <div className="grid gap-8 lg:grid-cols-2">
        <section aria-labelledby="mapa-obras" className="border-t-2 border-accent pt-7"><h2 id="mapa-obras" className="text-2xl font-semibold">Portfólio de obras</h2><Links items={projects.map(p => ({path:`/obras/${p.slug}`,label:p.title}))} /></section>
        <section aria-labelledby="mapa-artigos" className="border-t-2 border-accent pt-7"><h2 id="mapa-artigos" className="text-2xl font-semibold">Artigos técnicos</h2><Links items={articles.map(a => ({path:`/conteudo/${a.slug}`,label:a.title}))} /></section>
      </div>
      <section aria-labelledby="mapa-xml" className="flex flex-col gap-6 border border-border bg-secondary p-7 md:flex-row md:items-center md:justify-between md:p-9">
        <div><h2 id="mapa-xml" className="text-xl font-semibold">Mapa XML para mecanismos de busca</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">O mesmo sitemap XML atende ao Google Search Console e ao Bing Webmaster Tools. Reúne as URLs públicas e canônicas para facilitar a descoberta do conteúdo.</p><p className="mt-2 text-xs text-muted-foreground">{BASE_URL}/sitemap.xml</p></div>
        <a href="/sitemap.xml" className="inline-flex shrink-0 items-center justify-center gap-2 bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"><FileCode2 className="size-4" /> Abrir sitemap XML</a>
      </section>
    </div>
  </>;
}
