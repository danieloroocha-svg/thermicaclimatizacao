import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  Gauge,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppGlyph } from "@/components/whatsapp-icon";
import { BASE_URL, SITE, meta } from "@/lib/site-data";
import municipiosPorEstado from "@/data/municipios-por-estado.json";

type TextBlock = { title: string; text: string };

export type SeoKeywordPage = {
  path: string;
  keyword: string;
  description: string;
  serviceType: string;
  badge: string;
  breadcrumb: string;
  introduction: string;
  scopeHeading: string;
  scopeText: string;
  scopeDetailHeading: string;
  scopeDetailText: string;
  stagesIntro: string;
  stages: [TextBlock, TextBlock, TextBlock, TextBlock];
  applicationsHeading: string;
  applicationsText: string;
  applicationsDetailHeading: string;
  applicationsDetailText: string;
  qualityText: string;
  quality: [TextBlock, TextBlock, TextBlock, TextBlock];
  buyersText: string;
  estimateText: string;
  estimateDetail: string;
  estimateItems: [string, string, string, string, string];
  responsibilityHeading: string;
  responsibilityText: string;
  responsibilityNote: string;
  faq: [TextBlock, TextBlock, TextBlock, TextBlock, TextBlock];
  audience: string;
  regionLead: string;
  pictures: [string, string, string, string];
  pictureAlt: [string, string, string, string];
  pictureCaption: [string, string, string];
};

export function seoKeywordHead(page: SeoKeywordPage) {
  const pageURL = `${BASE_URL}${page.path}`;
  const title = `${page.keyword.charAt(0).toUpperCase()}${page.keyword.slice(1)} | THÉRMICA`;
  const base = meta(title, page.description, page.path);
  const imageURL = new URL(page.pictures[0], BASE_URL).href;
  const provider = {
    "@type": "Organization",
    name: SITE.name,
    url: BASE_URL,
    telephone: "+5511955046147",
    email: SITE.email,
  };
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageURL}#pagina`,
        url: pageURL,
        name: title,
        description: page.description,
        inLanguage: "pt-BR",
        image: imageURL,
        isPartOf: { "@type": "WebSite", name: "THÉRMICA", url: BASE_URL },
        mainEntity: { "@id": `${pageURL}#servico` },
      },
      {
        "@type": "Service",
        "@id": `${pageURL}#servico`,
        name: page.keyword,
        serviceType: page.serviceType,
        description: page.description,
        provider,
        url: pageURL,
        areaServed: page.audience,
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Construtoras, gestores de facilities, suprimentos, empresas e gerenciadoras de obras",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageURL}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Soluções VRV/VRF", item: `${BASE_URL}/sistemas-vrv-vrf` },
          { "@type": "ListItem", position: 3, name: page.breadcrumb, item: pageURL },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageURL}#perguntas`,
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.title,
          acceptedAnswer: { "@type": "Answer", text: item.text },
        })),
      },
    ],
  };
  return {
    ...base,
    meta: [
      ...base.meta,
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: imageURL },
      { property: "og:image:alt", content: page.pictureAlt[0] },
      { name: "twitter:image", content: imageURL },
      { name: "robots", content: "index,follow,max-image-preview:large" },
      { name: "author", content: SITE.name },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }],
  };
}

const regions = [
  { label: "Norte", states: [["Acre", "AC"], ["Amapá", "AP"], ["Amazonas", "AM"], ["Pará", "PA"], ["Rondônia", "RO"], ["Roraima", "RR"], ["Tocantins", "TO"]] },
  { label: "Nordeste", states: [["Alagoas", "AL"], ["Bahia", "BA"], ["Ceará", "CE"], ["Maranhão", "MA"], ["Paraíba", "PB"], ["Pernambuco", "PE"], ["Piauí", "PI"], ["Rio Grande do Norte", "RN"], ["Sergipe", "SE"]] },
  { label: "Centro-Oeste", states: [["Distrito Federal", "DF"], ["Goiás", "GO"], ["Mato Grosso", "MT"], ["Mato Grosso do Sul", "MS"]] },
  { label: "Sudeste", states: [["Espírito Santo", "ES"], ["Minas Gerais", "MG"], ["Rio de Janeiro", "RJ"], ["São Paulo", "SP"]] },
  { label: "Sul", states: [["Paraná", "PR"], ["Rio Grande do Sul", "RS"], ["Santa Catarina", "SC"]] },
] as const;

const relatedSolutions = [
  { path: "/instalacao-ar-condicionado-vrf-para-empresas", label: "Instalação de ar condicionado VRF para empresas" },
  { path: "/modernizacao-de-sistema-de-climatizacao-sp", label: "Modernização de sistema de climatização" },
  { path: "/projeto-de-ar-condicionado-central-para-empresas", label: "Projeto de ar condicionado central para empresas" },
  { path: "/instalacao-de-vrv-comercial-sao-paulo", label: "Instalação de VRV comercial em São Paulo" },
  { path: "/instalacao-de-ar-condicionado-vrf-campinas", label: "Instalação de ar condicionado VRF em Campinas" },
  { path: "/retrofit-de-ar-condicionado-predial-sao-paulo", label: "Retrofit de ar condicionado predial em São Paulo" },
  { path: "/projeto-executivo-de-climatizacao-comercial", label: "Projeto executivo de climatização comercial" },
  { path: "/projeto-de-ar-condicionado-vrf-para-escritorio", label: "Projeto de ar condicionado VRF para escritório" },
  { path: "/empresa-de-climatizacao-para-construtoras-sp", label: "Climatização para construtoras em SP" },
  { path: "/climatizacao-para-galpoes-logisticos-sao-paulo", label: "Climatização para galpões logísticos em São Paulo" },
  { path: "/instalacao-de-ar-condicionado-hospitalar-sp", label: "Instalação de ar condicionado hospitalar SP" },
  { path: "/empresa-credenciada-daikin-vrv-sao-paulo", label: "Qualificação e instalação Daikin VRV em São Paulo" },
  { path: "/empresa-instaladora-de-vrf-sao-paulo", label: "Empresa instaladora de VRF São Paulo" },
  { path: "/sistema-vrf-para-edificios-corporativos-sp", label: "Sistema VRF para edifícios corporativos SP" },
  { path: "/instalacao-vrf-mitsubishi-electric-sp", label: "Instalação VRF Mitsubishi Electric SP" },
  { path: "/empresa-de-retrofit-de-climatizacao-sp", label: "Empresa de retrofit de climatização SP" },
  { path: "/retrofit-de-tubulacoes-de-sistema-de-agua-gelada-sp", label: "Retrofit de tubulações de água gelada em SP" },
  { path: "/empresa-de-projetos-de-hvac-sao-paulo", label: "Empresa de projetos HVAC São Paulo" },
  { path: "/projeto-de-climatizacao-com-art-crea-sp", label: "Projeto de climatização com ART CREA SP" },
  { path: "/instalacao-de-ar-condicionado-para-construtora", label: "Instalação de ar condicionado para construtora" },
  { path: "/instalacao-de-hvac-corporativo-sao-paulo", label: "Instalação de HVAC corporativo São Paulo" },
  { path: "/climatizacao-de-precisao-para-data-center-sp", label: "Climatização de precisão para data center SP" },
  { path: "/sistema-de-ar-condicionado-para-salas-limpas-sp", label: "Sistema de ar condicionado para salas limpas SP" },
  { path: "/ar-condicionado-para-laboratorios-e-areas-limpas", label: "Ar condicionado para laboratórios e áreas limpas" },
  { path: "/climatizacao-para-supermercados-e-atacarejos-sp", label: "Climatização para supermercados e atacarejos SP" },
  { path: "/orcamento-instalacao-vrf-corporativo-sp", label: "Orçamento de instalação VRF corporativo SP" },
  { path: "/retrofit-de-chiller-para-vrf", label: "Retrofit de chiller para VRF" },
  { path: "/modernizacao-de-ar-condicionado-corporativo-sp", label: "Modernização de ar condicionado corporativo SP" },
  { path: "/retrofit-ar-condicionado-edificio-comercial-sao-paulo", label: "Retrofit de ar condicionado de edifício comercial SP" },
  { path: "/empresa-de-engenharia-termica-e-climatizacao-sp", label: "Engenharia térmica e climatização SP" },
];

function WhatsAppAction({ label }: { label: string }) {
  return (
    <Button
      type="button"
      size="lg"
      onClick={() => window.dispatchEvent(new Event("thermica:open-whatsapp"))}
      className="gap-2 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp-strong"
    >
      <WhatsAppGlyph className="size-5" />{label}
    </Button>
  );
}

export function SeoKeywordLanding({ page }: { page: SeoKeywordPage }) {
  return (
    <>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img src={page.pictures[0]} width={1672} height={941} fetchPriority="high" alt={page.pictureAlt[0]} className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/35" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <nav aria-label="Caminho da página" className="mb-10 text-xs text-primary-foreground/70">
            <Link to="/" className="hover:text-primary-foreground">Home</Link>
            <span aria-hidden="true" className="px-2">/</span>
            <Link to="/sistemas-vrv-vrf" className="hover:text-primary-foreground">Soluções VRV/VRF</Link>
            <span aria-hidden="true" className="px-2">/</span>
            <span aria-current="page">{page.breadcrumb}</span>
          </nav>
          <p className="eyebrow">{page.badge} • Atendimento empresarial</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight first-letter:uppercase md:text-6xl">{page.keyword}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-primary-foreground/85">
            {page.keyword.startsWith("empresa ") ? "Se sua equipe pesquisa por" : "A THÉRMICA analisa e desenvolve soluções de"}{" "}<strong>{page.keyword}</strong>{page.keyword.startsWith("empresa ") ? ", a THÉRMICA pode avaliar o escopo do seu empreendimento." : "."} {page.introduction}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contato">Solicitar orçamento técnico <ArrowRight className="size-4" /></Link>
            </Button>
            <WhatsAppAction label="Orçamento pelo WhatsApp" />
          </div>
          <p className="mt-7 text-sm text-primary-foreground/65">Avaliação técnica mediante definição de escopo, cronograma, localização e disponibilidade de mobilização.</p>
        </div>
      </section>

      <section aria-label="Diferenciais" className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-7 sm:grid-cols-3 lg:px-8">
          {[["Desde 2015", "Atuação em obras empresariais"], ["Engenharia", "Premissas técnicas e escopo definido"], ["VRV/VRF", "Implantação e modernização corporativa"]].map(([label, text]) => (
            <div key={label} className="border-l-2 border-accent pl-5">
              <strong className="block font-display text-xl text-primary">{label}</strong>
              <span className="mt-1 block text-sm text-muted-foreground">{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="escopo-heading">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div>
            <p className="eyebrow text-primary">Engenharia e contratação técnica</p>
            <h2 id="escopo-heading" className="section-title first-letter:uppercase">{page.keyword}: {page.scopeHeading}</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {page.keyword.startsWith("empresa ") ? "A busca por" : page.keyword.startsWith("projeto ") || page.keyword.startsWith("retrofit ") || page.keyword.startsWith("sistema ") || page.keyword.startsWith("ar condicionado ") || page.keyword.startsWith("orçamento ") ? "O" : "A"}{" "}
              <strong className="text-foreground">{page.keyword}</strong> {page.keyword.startsWith("empresa ") ? "exige avaliar a qualificação técnica e o escopo." : "exige planejamento consistente."} {page.scopeText}
            </p>
            <h3 className="mt-8 text-2xl font-semibold">{page.scopeDetailHeading}</h3>
            <p className="mt-4 leading-8 text-muted-foreground">{page.scopeDetailText}</p>
            <Link to="/qualificacao-tecnica" className="mt-7 inline-flex items-center gap-2 font-semibold text-primary">Conheça nossa qualificação técnica <ArrowRight className="size-4" /></Link>
          </div>
          <figure className="overflow-hidden bg-secondary">
            <img src={page.pictures[1]} width={1672} height={941} loading="lazy" decoding="async" alt={page.pictureAlt[1]} className="h-full min-h-72 w-full object-cover" />
            <figcaption className="px-5 py-3 text-xs leading-6 text-muted-foreground">{page.pictureCaption[0]}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section bg-secondary" aria-labelledby="etapas-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow text-primary">Método técnico</p>
          <h2 id="etapas-heading" className="section-title">{page.keyword.startsWith("empresa ") ? "Etapas para contratar" : "Etapas de"} {page.keyword}</h2>
          <p className="section-copy">Neste tipo de contratação, {page.stagesIntro}</p>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {page.stages.map((stage, index) => (
              <article key={stage.title} className="border border-border bg-background p-7">
                <span className="font-display text-3xl font-semibold text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 text-xl font-semibold">{stage.title}</h3>
                <p className="mt-3 leading-7 text-muted-foreground">{stage.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="aplicacoes-heading">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
          <div>
            <p className="eyebrow text-primary">Aplicação em imóveis corporativos</p>
            <h2 id="aplicacoes-heading" className="section-title first-letter:uppercase">{page.keyword}: {page.applicationsHeading}</h2>
            <p className="mt-6 leading-8 text-muted-foreground">Para avaliar <strong className="text-foreground">{page.keyword}</strong>, {page.applicationsText}</p>
            <h3 className="mt-8 text-2xl font-semibold">{page.applicationsDetailHeading}</h3>
            <p className="mt-4 leading-8 text-muted-foreground">{page.applicationsDetailText}</p>
          </div>
          <figure className="overflow-hidden bg-secondary">
            <img src={page.pictures[2]} width={1672} height={941} loading="lazy" decoding="async" alt={page.pictureAlt[2]} className="h-full min-h-72 w-full object-cover" />
            <figcaption className="px-5 py-3 text-xs leading-6 text-muted-foreground">{page.pictureCaption[1]}</figcaption>
          </figure>
        </div>
      </section>

      <section className="section" aria-labelledby="qualidade-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow text-primary">Escopo e controle de qualidade</p>
              <h2 id="qualidade-heading" className="section-title first-letter:uppercase">{page.keyword}: critérios para execução e entrega</h2>
              <p className="section-copy">Na contratação de <strong>{page.keyword}</strong>, {page.qualityText}</p>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">Os requisitos documentais, testes, ART e garantias são especificados em cada contrato. O desempenho e eventuais economias dependem de estudo técnico e condições reais do empreendimento.</p>
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              {page.quality.map((item) => (
                <article key={item.title} className="border-t-2 border-accent pt-5">
                  <CheckCircle2 aria-hidden="true" className="size-6 text-accent" />
                  <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-primary text-primary-foreground" aria-labelledby="clientes-heading">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="eyebrow">Para quem atendemos</p>
            <h2 id="clientes-heading" className="mt-4 text-3xl font-semibold md:text-5xl">Engenharia para compras, obras e facilities</h2>
            <p className="mt-6 leading-8 text-primary-foreground/80">{page.buyersText}</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Building2, title: "Construtoras e incorporadoras", text: "Obras e requalificação de empreendimentos." },
              { icon: ClipboardCheck, title: "Gerenciadoras de obras", text: "Coordenação de interfaces e cronogramas." },
              { icon: Gauge, title: "Gestores de facilities", text: "Continuidade de operação e manutenção." },
              { icon: ShieldCheck, title: "Compras e empresas", text: "Escopo mensurável e documentação." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="border border-primary-foreground/20 p-5">
                  <Icon aria-hidden="true" className="size-6 text-accent" />
                  <h3 className="mt-4 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-primary-foreground/70">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="proposta-heading">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <figure className="overflow-hidden bg-secondary">
            <img src={page.pictures[3]} width={1672} height={941} loading="lazy" decoding="async" alt={page.pictureAlt[3]} className="h-full min-h-80 w-full object-cover" />
            <figcaption className="px-5 py-3 text-xs leading-6 text-muted-foreground">{page.pictureCaption[2]}</figcaption>
          </figure>
          <div>
            <p className="eyebrow text-primary">Proposta e fornecimento</p>
            <h2 id="proposta-heading" className="section-title">Orçamento para {page.keyword}</h2>
            <p className="mt-6 leading-8 text-muted-foreground">{page.estimateText}</p>
            <p className="mt-5 leading-8 text-muted-foreground">Para comparar propostas de <strong className="text-foreground">{page.keyword}</strong>, {page.estimateDetail}</p>
            <ul className="mt-6 space-y-4">
              {page.estimateItems.map((item) => (
                <li key={item} className="flex items-start gap-3 leading-7">
                  <FileCheck2 aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contato">Enviar dados para orçamento <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section bg-background" aria-labelledby="responsabilidade-heading">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <p className="eyebrow text-primary">Transparência contratual</p>
          <h2 id="responsabilidade-heading" className="section-title">{page.responsibilityHeading}</h2>
          <p className="mt-6 leading-8 text-muted-foreground">{page.responsibilityText}</p>
          <div className="mt-8 overflow-x-auto border border-border">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="bg-secondary"><tr><th className="p-4 font-semibold">Etapa</th><th className="p-4 font-semibold">Definições antes da contratação</th></tr></thead>
              <tbody className="divide-y divide-border">
                <tr><th scope="row" className="p-4 font-semibold">Engenharia</th><td className="p-4 text-muted-foreground">Projetos, memoriais, compatibilização e premissas</td></tr>
                <tr><th scope="row" className="p-4 font-semibold">Fornecimento</th><td className="p-4 text-muted-foreground">Equipamentos, materiais, logística e instalações auxiliares</td></tr>
                <tr><th scope="row" className="p-4 font-semibold">Obra</th><td className="p-4 text-muted-foreground">Equipe, mobilização, cronograma e interfaces com terceiros</td></tr>
                <tr><th scope="row" className="p-4 font-semibold">Entrega</th><td className="p-4 text-muted-foreground">Ensaios, partida, relatórios, as-built e responsabilidades técnicas</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 leading-8 text-muted-foreground">{page.responsibilityNote}</p>
        </div>
      </section>

      <section className="section bg-secondary" aria-labelledby="duvidas-heading">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <p className="eyebrow text-primary">Perguntas frequentes — respostas objetivas</p>
          <h2 id="duvidas-heading" className="section-title">Dúvidas técnicas sobre {page.breadcrumb}</h2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {page.faq.map((item) => (
              <details key={item.title} className="group py-5">
                <summary className="cursor-pointer list-none pr-5 text-lg font-semibold marker:hidden">{item.title}<span aria-hidden="true" className="float-right text-accent group-open:rotate-45">+</span></summary>
                <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">{item.text}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm leading-7 text-muted-foreground">
            Conheça nossas soluções de <Link to="/sistemas-vrv-vrf" className="font-semibold text-primary underline">sistemas VRV/VRF</Link>, <Link to="/retrofit-vrv-vrf" className="font-semibold text-primary underline">retrofit</Link> e <Link to="/qualificacao-tecnica" className="font-semibold text-primary underline">qualificação técnica</Link>.
          </p>
          <div className="mt-7 border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-primary">Outras soluções de engenharia da THÉRMICA</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedSolutions.filter((solution) => solution.path !== page.path).map((solution) => (
                <li key={solution.path}>
                  <a href={solution.path} className="inline-flex items-start gap-2 text-sm font-medium text-primary hover:underline">
                    <ArrowRight aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" />{solution.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-xs leading-6 text-muted-foreground">Conteúdo técnico institucional da THÉRMICA, sob orientação de Daniel Rocha, engenheiro mecânico. Normas, responsabilidades e requisitos de cada fabricante devem ser conferidos para o projeto contratado.</p>
        </div>
      </section>

      <section className="bg-primary py-14 text-primary-foreground" aria-labelledby="contato-final-heading">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="eyebrow">Sua próxima obra corporativa</p>
            <h2 id="contato-final-heading" className="mt-3 text-3xl font-semibold md:text-4xl">Precisa de {page.keyword}?</h2>
            <p className="mt-4 max-w-2xl leading-8 text-primary-foreground/75">A THÉRMICA recebe solicitações de empresas com informações de localização, planta, sistema existente ou projetado, prazo e escopo previsto. Após a análise técnica, definimos a viabilidade e os próximos passos comerciais.</p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90"><Link to="/contato">Solicitar orçamento técnico <ArrowRight className="size-4" /></Link></Button>
            <WhatsAppAction label="Conversar no WhatsApp" />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-14" aria-labelledby="cobertura-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow text-primary">Municípios e regiões</p>
          <h2 id="cobertura-heading" className="mt-3 text-3xl font-semibold md:text-4xl">Climatização corporativa nos 26 estados e no Distrito Federal</h2>
          <p className="mt-5 max-w-4xl leading-8 text-muted-foreground">{page.regionLead} As solicitações de obras de outras regiões também podem ser avaliadas conforme porte, cronograma e viabilidade de mobilização.</p>
          <div className="mt-9 space-y-9">
            {regions.map((region) => (
              <div key={region.label}>
                <p className="mb-4 font-display text-xl font-semibold text-primary">Região {region.label} <span className="text-sm font-normal text-muted-foreground">({region.states.length} unidades federativas)</span></p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {region.states.map(([stateName, uf]) => {
                    const municipios = municipiosPorEstado[uf];
                    return (
                      <details key={uf} className="group min-w-0 border border-border bg-background open:sm:col-span-2 open:lg:col-span-3">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-5 marker:hidden">
                          <span className="font-semibold text-primary">{stateName} <span className="font-normal text-muted-foreground">({uf})</span></span>
                          <span className="ml-auto whitespace-nowrap text-xs text-muted-foreground">{uf === "DF" ? "Brasília" : `${municipios.length} municípios`}</span>
                          <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
                        </summary>
                        <div className="border-t border-border px-5 pb-6 pt-4">
                          <ul className="grid max-h-[32rem] grid-cols-1 gap-x-8 gap-y-2 overflow-y-auto border-l-2 border-accent pl-4 text-sm leading-6 text-foreground/85 sm:grid-cols-2 lg:grid-cols-4">
                            {municipios.map((municipio) => <li key={municipio}>{municipio}</li>)}
                          </ul>
                        </div>
                      </details>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
