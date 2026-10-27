import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileCheck2,
  Gauge,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppGlyph } from "@/components/whatsapp-icon";
import {
  BASE_URL,
  SITE,
  meta,
} from "@/lib/site-data";
import heroImage from "@/assets/seo/instalacao-ar-condicionado-vrf-empresas-edificio-corporativo.webp";
import officeImage from "@/assets/seo/instalacao-ar-condicionado-vrf-empresas-escritorio-industrial.webp";
import retrofitImage from "@/assets/seo/instalacao-ar-condicionado-vrf-empresas-retrofit-escritorio.webp";
import healthImage from "@/assets/seo/instalacao-ar-condicionado-vrf-empresas-instituicao-saude.webp";

/**
 * Destino no repositório: src/routes/instalacao-ar-condicionado-vrf-para-empresas.tsx
 * O TanStack Start renderiza HTML no servidor. Não adicionar outro header,
 * footer ou formulário de WhatsApp: SiteShell já fornece os três.
 * Os CTAs internos acionam o mesmo formulário global.
 */
const PATH = "/instalacao-ar-condicionado-vrf-para-empresas";
const URL = `${BASE_URL}${PATH}`;
const TITLE = "Instalação de Ar-Condicionado VRF para Empresas | THÉRMICA";
const DESCRIPTION =
  "Instalação de ar-condicionado VRF para empresas em todo o Brasil. Engenharia, testes, comissionamento e entrega técnica. Solicite orçamento à THÉRMICA.";

const serviceSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${URL}#pagina`,
      url: URL,
      name: TITLE,
      description: DESCRIPTION,
      image: new URL(heroImage, BASE_URL).href,
      inLanguage: "pt-BR",
      isPartOf: { "@type": "WebSite", name: "THÉRMICA", url: BASE_URL },
      mainEntity: { "@id": `${URL}#servico` },
    },
    {
      "@type": "Service",
      "@id": `${URL}#servico`,
      name: "Instalação de ar-condicionado VRF para empresas",
      serviceType: "Engenharia e instalação de sistemas VRV/VRF corporativos",
      description:
        "Avaliação técnica, planejamento, implantação, testes e entrega de sistemas VRV/VRF para empresas, construtoras, gerenciadoras e operações corporativas.",
      url: URL,
      provider: {
        "@type": "Organization",
        name: SITE.name,
        url: BASE_URL,
        email: SITE.email,
        telephone: "+5511955046147",
      },
      areaServed: { "@type": "Country", name: "Brasil" },
      image: new URL(heroImage, BASE_URL).href,
      audience: {
        "@type": "BusinessAudience",
        audienceType: "Construtoras, gerenciadoras, empresas e gestores de facilities",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "Nova instalação VRV/VRF",
          item: `${BASE_URL}/instalacao-vrv-vrf`,
        },
        { "@type": "ListItem", position: 3, name: "Instalação VRF para empresas", item: URL },
      ],
    },
  ],
};

export const Route = createFileRoute(PATH)({
  staticData: { sitemap: true },
  head: () => {
    const base = meta(TITLE, DESCRIPTION, PATH);
    const imageURL = new URL(heroImage, BASE_URL).href;
    return {
      ...base,
      meta: [
        ...base.meta,
        { property: "og:locale", content: "pt_BR" },
        { property: "og:image", content: imageURL },
        { property: "og:image:alt", content: "Obra corporativa com sistema VRF" },
        { name: "author", content: SITE.name },
        { name: "twitter:image", content: imageURL },
        { name: "robots", content: "index,follow,max-image-preview:large" },
      ],
      scripts: [{ type: "application/ld+json", children: JSON.stringify(serviceSchema) }],
    };
  },
  component: InstallationForBusiness,
});

const stages = [
  {
    n: "01",
    title: "Levantamento técnico e premissas",
    text: "Analisamos tipologia de ocupação, cargas térmicas de projeto, infraestrutura disponível, acessos, restrições arquitetônicas e critérios de operação.",
  },
  {
    n: "02",
    title: "Compatibilização e planejamento",
    text: "Revisamos interfaces com elétrica, arquitetura, drenagem, automação e demais disciplinas. Definimos sequenciamento, logística, responsabilidades e pontos de inspeção.",
  },
  {
    n: "03",
    title: "Infraestrutura e montagem",
    text: "Executamos, conforme o escopo aprovado, suportação, linhas frigorígenas, drenagem, interligações e posicionamento de equipamentos, observando os manuais dos fabricantes.",
  },
  {
    n: "04",
    title: "Ensaios, partida e entrega",
    text: "Conduzimos verificações de estanqueidade, desidratação por vácuo, conferências elétricas e de comunicação, parametrização e acompanhamento de startup, com registros aplicáveis.",
  },
];

const quality = [
  {
    title: "Tubulação frigorígena",
    text: "Traçados, diâmetros, isolamento, suportes e procedimentos de brasagem conforme projeto e instruções da marca, incluindo fluxo de nitrogênio quando especificado.",
  },
  {
    title: "Testes documentados",
    text: "Pressões, tempos, critérios de aceitação e níveis de vácuo seguem o modelo do equipamento e o procedimento aprovado — não uma regra única para toda instalação VRF.",
  },
  {
    title: "Integração entre disciplinas",
    text: "Interfaces com alimentação elétrica, comandos, drenagem, automação predial e acesso para manutenção são coordenadas para reduzir retrabalho.",
  },
  {
    title: "Entrega para operação",
    text: "Organização dos relatórios e documentos previstos em contrato, como checklists, registros de testes, as-built, manuais e ART quando cabível.",
  },
];

const faqs = [
  [
    "A THÉRMICA atende obras VRF em todo o Brasil?",
    "Avaliamos demandas corporativas de diferentes regiões do Brasil. A viabilidade de atendimento depende de localização, escopo, porte, cronograma e mobilização necessária.",
  ],
  [
    "Vocês executam a instalação com projeto de outra empresa?",
    "Sim, o ponto de partida pode ser um projeto existente. Antes da proposta, verificamos documentação, compatibilização, interfaces de responsabilidade e eventuais pendências técnicas.",
  ],
  [
    "Qual é a diferença entre VRF e VRV?",
    "VRF é a denominação genérica da tecnologia de fluxo de refrigerante variável. VRV é a denominação comercial utilizada pela Daikin. A seleção de fabricantes e modelos depende das premissas de engenharia.",
  ],
  [
    "É possível instalar VRF em um prédio em operação?",
    "É possível avaliar implantação por etapas, horários e zonas de trabalho. A continuidade da operação depende de um plano executivo compatível com as restrições reais de cada edificação.",
  ],
  [
    "Que informações são necessárias para receber uma proposta?",
    "Ajuda enviar cidade e endereço da obra, uso do imóvel, etapa da construção, plantas ou projeto de climatização, quantitativo preliminar de equipamentos, prazo esperado e contato técnico responsável. Também avaliamos demandas ainda em concepção.",
  ],
  [
    "Vocês realizam startup, comissionamento e emissão de ART?",
    "Os procedimentos de partida, testes, documentação e responsabilidade técnica são definidos conforme o escopo contratado, as atribuições profissionais aplicáveis e as exigências de cada fabricante.",
  ],
] as const;

const audiences = [
  { icon: Building2, title: "Construtoras e incorporadoras", text: "Obras novas e expansão de empreendimentos." },
  { icon: ClipboardCheck, title: "Gerenciadoras de obras", text: "Compatibilização e execução por cronograma." },
  { icon: Gauge, title: "Facilities e patrimônio", text: "Adaptação de sistemas a operações existentes." },
  { icon: ShieldCheck, title: "Empresas e instituições", text: "Escritórios, hotéis, educação e áreas administrativas." },
];

const coverageRegions = [
  {
    label: "Norte",
    states: ["Acre (AC)", "Amapá (AP)", "Amazonas (AM)", "Pará (PA)", "Rondônia (RO)", "Roraima (RR)", "Tocantins (TO)"],
    cities: "Rio Branco, Macapá, Manaus, Belém, Porto Velho, Boa Vista e Palmas",
  },
  {
    label: "Nordeste",
    states: ["Alagoas (AL)", "Bahia (BA)", "Ceará (CE)", "Maranhão (MA)", "Paraíba (PB)", "Pernambuco (PE)", "Piauí (PI)", "Rio Grande do Norte (RN)", "Sergipe (SE)"],
    cities: "Maceió, Salvador, Fortaleza, São Luís, João Pessoa, Recife, Teresina, Natal e Aracaju",
  },
  {
    label: "Centro-Oeste",
    states: ["Distrito Federal (DF)", "Goiás (GO)", "Mato Grosso (MT)", "Mato Grosso do Sul (MS)"],
    cities: "Brasília, Goiânia, Cuiabá e Campo Grande",
  },
  {
    label: "Sudeste",
    states: ["Espírito Santo (ES)", "Minas Gerais (MG)", "Rio de Janeiro (RJ)", "São Paulo (SP)"],
    cities: "Vitória, Belo Horizonte, Rio de Janeiro, São Paulo, Campinas, Sorocaba, Jundiaí, Barueri e Ribeirão Preto",
  },
  {
    label: "Sul",
    states: ["Paraná (PR)", "Rio Grande do Sul (RS)", "Santa Catarina (SC)"],
    cities: "Curitiba, Porto Alegre e Florianópolis",
  },
] as const;

function WhatsAppAction({ label = "Falar pelo WhatsApp" }: { label?: string }) {
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

function InstallationForBusiness() {
  return (
    <>
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <img
          src={heroImage}
          width={1448}
          height={1086}
          fetchPriority="high"
          alt="Instalação de sistema VRF em edifício administrativo, referência de obra corporativa da THÉRMICA"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/35" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <nav aria-label="Caminho da página" className="mb-10 text-xs text-primary-foreground/70">
            <Link to="/" className="hover:text-primary-foreground">Home</Link>
            <span aria-hidden="true" className="px-2">/</span>
            <Link to="/instalacao-vrv-vrf" className="hover:text-primary-foreground">Nova instalação</Link>
            <span aria-hidden="true" className="px-2">/</span>
            <span aria-current="page">VRF para empresas</span>
          </nav>
          <p className="eyebrow">Engenharia e execução • Atendimento B2B</p>
          <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
            Instalação de ar-condicionado VRF para empresas
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-primary-foreground/85">
            A THÉRMICA realiza instalação de ar-condicionado VRF para empresas com planejamento
            técnico, implantação de infraestrutura, montagem, ensaios e entrega documentada.
            Uma solução de engenharia para construtoras, gerenciadoras de obras, escritórios e
            operações corporativas que precisam integrar climatização ao empreendimento.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contato">Solicitar orçamento técnico <ArrowRight className="size-4" /></Link>
            </Button>
            <WhatsAppAction label="Orçamento pelo WhatsApp" />
          </div>
          <p className="mt-7 text-sm text-primary-foreground/65">
            Solicite uma avaliação para obras em qualquer estado brasileiro. Atendimento sujeito
            à análise do escopo, localização, cronograma e mobilização.
          </p>
        </div>
      </section>

      <section aria-label="Diferenciais" className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-7 sm:grid-cols-3 lg:px-8">
          {[
            ["Desde 2015", "Atuação empresarial"],
            ["VRV/VRF", "Especialização em sistemas multizonas"],
            ["Engenharia + obra", "Do planejamento à entrega técnica"],
          ].map(([label, text]) => (
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
            <p className="eyebrow text-primary">Instalação corporativa de VRF</p>
            <h2 id="escopo-heading" className="section-title">Uma obra de climatização exige mais que montar equipamentos.</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A <strong className="text-foreground">instalação de ar-condicionado VRF para empresas</strong> envolve
              interfaces entre o projeto térmico, arquitetura, alimentação elétrica, drenagem,
              infraestrutura frigorígena, controles e rotina de operação do edifício. Uma decisão
              inadequada nessas etapas pode se transformar em retrabalho ou indisponibilidade futura.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              A THÉRMICA atua com foco em instalações VRV/VRF corporativas, para contratantes que
              precisam de escopo definido, documentação de engenharia e uma execução coordenada.
              Podemos avaliar projetos existentes ou demandas em fase de estudo, respeitando a
              participação dos projetistas, fabricantes e responsáveis de cada disciplina.
            </p>
            <h3 className="mt-8 text-2xl font-semibold">Projeto pronto ou demanda em estudo?</h3>
            <p className="mt-4 leading-8 text-muted-foreground">
              Quando o cliente já dispõe de desenhos e memorial, iniciamos pela leitura crítica
              das quantidades, interfaces e premissas de execução. Quando a solução ainda está
              em concepção, o primeiro passo é compreender o uso do imóvel, as condições
              disponíveis e os limites de fornecimento. Em ambos os cenários, a contratação
              deve diferenciar projeto, equipamentos, montagem, testes e responsabilidades.
            </p>
            <Link to="/qualificacao-tecnica" className="mt-7 inline-flex items-center gap-2 font-semibold text-primary">
              Conheça nossa abordagem técnica <ArrowRight className="size-4" />
            </Link>
          </div>
          <figure className="overflow-hidden bg-secondary">
            <img
              src={officeImage}
              width={1448}
              height={1086}
              loading="lazy"
              decoding="async"
              alt="Empreendimento empresarial em Indaiatuba com instalação de sistema VRV Daikin"
              className="h-full min-h-72 w-full object-cover"
            />
            <figcaption className="px-5 py-3 text-xs leading-6 text-muted-foreground">
              Referência de obra: escritório em Indaiatuba, sistema VRV Daikin.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section bg-secondary" aria-labelledby="etapas-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow text-primary">Método executivo</p>
          <h2 id="etapas-heading" className="section-title">Como conduzimos uma instalação VRF empresarial</h2>
          <p className="section-copy">Cada contrato tem suas premissas. Estas são as frentes normalmente avaliadas para estruturar uma execução segura.</p>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {stages.map((stage) => (
              <article key={stage.n} className="border border-border bg-background p-7">
                <span className="font-display text-3xl font-semibold text-accent">{stage.n}</span>
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
            <p className="eyebrow text-primary">Aplicação e decisão de engenharia</p>
            <h2 id="aplicacoes-heading" className="section-title">
              Instalação de sistemas VRF em edifícios corporativos: quando faz sentido?
            </h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              Um sistema de fluxo de refrigerante variável pode atender diversos ambientes
              independentes, com controle por zonas e modulação conforme a carga térmica.
              Essa característica torna a tecnologia relevante para escritórios com salas de
              reunião, pavimentos de ocupação variável, hotéis, escolas e áreas administrativas.
              A escolha entre VRF/VRV e outras soluções exige avaliar simultaneamente
              arquitetura, capacidade, comprimento das redes, renovação de ar, operação e manutenção.
            </p>
            <h3 className="mt-8 text-2xl font-semibold">Nem todo ambiente exige a mesma solução</h3>
            <p className="mt-4 leading-8 text-muted-foreground">
              Em ambientes hospitalares, laboratórios e áreas de missão crítica, a seleção
              depende de requisitos próprios de controle ambiental, ventilação, filtragem,
              pressurização, confiabilidade e redundância. O VRF pode compor a solução em
              espaços adequados, mas não substitui automaticamente os sistemas específicos
              necessários para ambientes controlados.
            </p>
            <h3 className="mt-8 text-2xl font-semibold">Por que a instalação interfere no desempenho?</h3>
            <p className="mt-4 leading-8 text-muted-foreground">
              A performance prevista pelo fabricante pressupõe projeto e execução compatíveis.
              Linhas frigorígenas, drenagem, comunicação, alimentação elétrica, distâncias e
              limites do sistema precisam ser respeitados. Na instalação de VRF comercial,
              a qualidade da infraestrutura é tão importante quanto a escolha das unidades
              internas e externas. Veja também nossas orientações sobre{" "}
              <Link to="/conteudo/etapas-implantacao" className="font-semibold text-primary underline">
                etapas de implantação VRV/VRF
              </Link>.
            </p>
          </div>
          <figure className="overflow-hidden bg-secondary">
            <img
              src={healthImage}
              width={1448}
              height={1086}
              loading="lazy"
              decoding="async"
              alt="Sistema VRF Trane em edificação hospitalar na Vila Clementino, São Paulo, referência de obra da THÉRMICA"
              className="h-full min-h-72 w-full object-cover"
            />
            <figcaption className="px-5 py-3 text-xs leading-6 text-muted-foreground">
              Referência de obra: edificação hospitalar na Vila Clementino, sistema VRF Trane.
              A aplicação técnica depende das exigências de cada ambiente.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section" aria-labelledby="qualidade-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow text-primary">Controle de qualidade</p>
              <h2 id="qualidade-heading" className="section-title">Pontos técnicos que importam na entrega</h2>
              <p className="section-copy">Os critérios de execução são definidos pelo projeto, normas aplicáveis e instruções específicas de cada sistema e fabricante.</p>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">
                As exigências de ART, ensaios, documentação e entrega são verificadas em cada contratação.
                Não adotamos promessas genéricas de economia ou desempenho sem análise de engenharia.
              </p>
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              {quality.map((item) => (
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

      <section className="section bg-primary text-primary-foreground" aria-labelledby="contratante-heading">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="eyebrow">Para quem atendemos</p>
            <h2 id="contratante-heading" className="mt-4 text-3xl font-semibold md:text-5xl">
              Uma interlocução técnica para compras, obras e facilities.
            </h2>
            <p className="mt-6 leading-8 text-primary-foreground/80">
              O foco da página é a contratação empresarial. Não se trata de instalação doméstica
              de split hi-wall: avaliamos sistemas que demandam engenharia, coordenação de
              disciplinas e planejamento de implantação.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {audiences.map((item) => {
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
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-[1fr_1fr] lg:px-8">
          <figure className="overflow-hidden bg-secondary">
            <img
              src={retrofitImage}
              width={1448}
              height={1086}
              loading="lazy"
              decoding="async"
              alt="Retrofit corporativo executado em escritório na Lapa com sistema VRV Daikin"
              className="h-full min-h-80 w-full object-cover"
            />
            <figcaption className="px-5 py-3 text-xs leading-6 text-muted-foreground">
              Referência de obra: retrofit corporativo na Lapa, São Paulo.
            </figcaption>
          </figure>
          <div>
            <p className="eyebrow text-primary">Cotação técnica</p>
            <h2 id="proposta-heading" className="section-title">O que influencia o orçamento de instalação VRF?</h2>
            <p className="mt-6 leading-8 text-muted-foreground">
              Uma proposta responsável considera mais do que a quantidade de evaporadoras. O custo
              varia com capacidade, configuração, extensão das redes, altura da edificação,
              interferências, transporte vertical, regime de execução e documentos exigidos.
            </p>
            <p className="mt-5 leading-8 text-muted-foreground">
              Para comparar propostas de <strong className="text-foreground">instalação de ar-condicionado VRF para empresas</strong>,
              o departamento de suprimentos precisa verificar a mesma base de escopo entre
              fornecedores. É essencial definir quem fornece as máquinas, as redes, os insumos,
              a alimentação elétrica, a automação e quais testes e documentos serão entregues.
              Isso torna a análise financeira mais clara e reduz divergências na contratação.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                "Local e cidade da obra, cronograma e horários de trabalho",
                "Projeto executivo, memorial e quantitativo, quando disponíveis",
                "Fornecimento dos equipamentos e limites de responsabilidade",
                "Infraestrutura elétrica, drenagem e integração com automação",
                "Testes, startup, documentação, garantias e entrega técnica",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 leading-7">
                  <FileCheck2 aria-hidden="true" className="mt-1 size-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contato">Enviar projeto para orçamento <ArrowRight className="size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section bg-background" aria-labelledby="responsabilidade-heading">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          <p className="eyebrow text-primary">Responsabilidade contratual</p>
          <h2 id="responsabilidade-heading" className="section-title">O que precisa estar claro antes de contratar uma instaladora VRF?</h2>
          <p className="mt-6 leading-8 text-muted-foreground">
            Ao contratar uma empresa de instalação VRF, construtoras e gestores técnicos
            devem receber uma delimitação objetiva das etapas incluídas. Um projeto pode
            prever apenas montagem ou abranger fornecimento, infraestrutura, instalação,
            ensaios, acompanhamento da partida e documentação final. A proposta da THÉRMICA
            parte dessa definição para que as interfaces com os demais contratados não
            fiquem implícitas.
          </p>
          <div className="mt-8 overflow-x-auto border border-border">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="bg-secondary">
                <tr><th className="p-4 font-semibold">Frente</th><th className="p-4 font-semibold">Verificação na contratação</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr><th scope="row" className="p-4 font-semibold">Projeto e engenharia</th><td className="p-4 text-muted-foreground">Premissas térmicas, desenhos, compatibilização e responsabilidade de revisão</td></tr>
                <tr><th scope="row" className="p-4 font-semibold">Fornecimento</th><td className="p-4 text-muted-foreground">Modelos, equipamentos, materiais, insumos e logística</td></tr>
                <tr><th scope="row" className="p-4 font-semibold">Execução</th><td className="p-4 text-muted-foreground">Infraestrutura, instalação, interfaces e cronograma</td></tr>
                <tr><th scope="row" className="p-4 font-semibold">Entrega</th><td className="p-4 text-muted-foreground">Ensaios, startup, garantias, relatórios, as-built e ART, quando aplicáveis</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 leading-8 text-muted-foreground">
            Esse alinhamento é especialmente importante em obras corporativas com vários
            fornecedores simultâneos ou edifícios em funcionamento, nos quais a programação
            de desligamentos, acessos e segurança interfere diretamente no plano executivo.
          </p>
        </div>
      </section>

      <section className="section bg-secondary" aria-labelledby="duvidas-heading">
        <div className="mx-auto max-w-4xl px-5 lg:px-8">
          <p className="eyebrow text-primary">Perguntas frequentes</p>
          <h2 id="duvidas-heading" className="section-title">Dúvidas sobre instalação de VRF para empresas</h2>
          <div className="mt-10 divide-y divide-border border-y border-border">
            {faqs.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="cursor-pointer list-none pr-5 text-lg font-semibold marker:hidden">
                  {question}<span aria-hidden="true" className="float-right text-accent group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-3xl leading-8 text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm leading-7 text-muted-foreground">
            Explore também: <Link to="/sistemas-vrv-vrf" className="font-semibold text-primary underline">sistemas VRV/VRF</Link>,{" "}
            <Link to="/instalacao-vrv-vrf" className="font-semibold text-primary underline">nova instalação</Link>,{" "}
            <Link to="/retrofit-vrv-vrf" className="font-semibold text-primary underline">retrofit</Link> e{" "}
            <Link to="/conteudo/etapas-implantacao" className="font-semibold text-primary underline">etapas de implantação</Link>.
          </p>
          <p className="mt-6 text-xs leading-6 text-muted-foreground">
            Conteúdo técnico institucional da THÉRMICA, sob orientação de Daniel Rocha,
            engenheiro mecânico. As exigências normativas e de fabricantes devem ser
            verificadas para cada empreendimento.
          </p>
        </div>
      </section>

      <section className="bg-primary py-14 text-primary-foreground" aria-labelledby="contato-final-heading">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 lg:flex-row lg:items-center lg:px-8">
          <div>
            <p className="eyebrow">Sua próxima obra VRV/VRF</p>
            <h2 id="contato-final-heading" className="mt-3 text-3xl font-semibold md:text-4xl">
              Precisa de uma empresa para instalação VRF corporativa?
            </h2>
            <p className="mt-4 max-w-2xl leading-8 text-primary-foreground/75">
              Envie localização, plantas, quantitativos e cronograma, se disponíveis.
              A equipe da THÉRMICA avaliará o escopo de instalação de ar-condicionado VRF
              para sua empresa e os próximos passos comerciais.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contato">Solicitar orçamento técnico <ArrowRight className="size-4" /></Link>
            </Button>
            <WhatsAppAction label="Conversar no WhatsApp" />
          </div>
        </div>
      </section>

      <section className="bg-secondary py-14" aria-labelledby="atendimento-brasil-heading">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow text-primary">Abrangência nacional</p>
          <h2 id="atendimento-brasil-heading" className="mt-3 text-3xl font-semibold md:text-4xl">
            Instalação de VRF para empresas nos 26 estados e no Distrito Federal
          </h2>
          <p className="mt-5 max-w-4xl leading-8 text-muted-foreground">
            A THÉRMICA recebe consultas para implantação de sistemas VRV/VRF em todas as
            unidades federativas. A execução em cada cidade depende de avaliação prévia de
            distância, escopo, infraestrutura de apoio, disponibilidade e mobilização.
            A relação abaixo indica localidades para as quais podemos analisar solicitações,
            e não a existência de filial ou equipe permanente em cada estado.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {coverageRegions.map((region) => (
              <details key={region.label} open className="border border-border bg-background p-5">
                <summary className="cursor-pointer font-display text-lg font-semibold text-primary">
                  {region.label} <span className="text-sm text-muted-foreground">({region.states.length})</span>
                </summary>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-foreground/80">
                  {region.states.map((state) => <li key={state}>{state}</li>)}
                </ul>
                <details className="mt-4 border-t border-border pt-3">
                  <summary className="cursor-pointer text-xs font-semibold text-primary">Exemplos de municípios</summary>
                  <p className="mt-2 text-xs leading-6 text-muted-foreground">{region.cities}. Outras cidades podem ser avaliadas.</p>
                </details>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
