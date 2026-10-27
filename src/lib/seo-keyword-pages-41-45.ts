import type { SeoKeywordPage } from "@/components/seo-keyword-landing";

import cagHero from "@/assets/seo/modernizacao-central-agua-gelada-cag-sp-01.webp";
import cagInspecao from "@/assets/seo/modernizacao-central-agua-gelada-cag-sp-02.webp";
import cagRedes from "@/assets/seo/modernizacao-central-agua-gelada-cag-sp-03.webp";
import cagEntrega from "@/assets/seo/modernizacao-central-agua-gelada-cag-sp-04.webp";

import bimHero from "@/assets/seo/compatibilizacao-bim-climatizacao-vrf-01.webp";
import bimEngenharia from "@/assets/seo/compatibilizacao-bim-climatizacao-vrf-02.webp";
import bimInfra from "@/assets/seo/compatibilizacao-bim-climatizacao-vrf-03.webp";
import bimRevisao from "@/assets/seo/compatibilizacao-bim-climatizacao-vrf-04.webp";

import facilitiesHero from "@/assets/seo/contrato-climatizacao-predial-facilities-sp-01.webp";
import facilitiesTecnica from "@/assets/seo/contrato-climatizacao-predial-facilities-sp-02.webp";
import facilitiesEquipamentos from "@/assets/seo/contrato-climatizacao-predial-facilities-sp-03.webp";
import facilitiesEntrega from "@/assets/seo/contrato-climatizacao-predial-facilities-sp-04.webp";

import gestaoHero from "@/assets/seo/gestao-obras-climatizacao-sao-paulo-01.webp";
import gestaoProjeto from "@/assets/seo/gestao-obras-climatizacao-sao-paulo-02.webp";
import gestaoObra from "@/assets/seo/gestao-obras-climatizacao-sao-paulo-03.webp";
import gestaoTestes from "@/assets/seo/gestao-obras-climatizacao-sao-paulo-04.webp";

import gerenciadorasHero from "@/assets/seo/empresa-ar-condicionado-gerenciadoras-obras-01.webp";
import gerenciadorasEquipe from "@/assets/seo/empresa-ar-condicionado-gerenciadoras-obras-02.webp";
import gerenciadorasInstalacao from "@/assets/seo/empresa-ar-condicionado-gerenciadoras-obras-03.webp";
import gerenciadorasFinalizacao from "@/assets/seo/empresa-ar-condicionado-gerenciadoras-obras-04.webp";

/** Expressões literais #41 a #45 do estudo fornecido pelo cliente. */
export const pagina41: SeoKeywordPage = {
  path: "/modernizacao-de-central-de-agua-gelada-cag-sp",
  keyword: "modernização de central de água gelada cag sp",
  description: "Modernização de central de água gelada CAG SP: diagnóstico de chiller, bombas, automação, redes hidráulicas e execução por etapas com a THÉRMICA.",
  serviceType: "Diagnóstico técnico e modernização de centrais de água gelada prediais",
  badge: "Retrofit CAG • Engenharia térmica",
  breadcrumb: "Modernização de central de água gelada SP",
  introduction: "Centrais de água gelada atendem edificações corporativas e operações com cargas térmicas relevantes. A THÉRMICA avalia a modernização desses sistemas a partir do desempenho dos chillers, bombas, tubulações, controles e equipamentos terminais, considerando a continuidade do edifício.",
  scopeHeading: "avaliação integrada da central e da distribuição",
  scopeText: "A substituição isolada de um chiller nem sempre corrige consumo elevado ou falhas recorrentes. Vazões inadequadas, trocadores sujos, bombas fora do ponto, sensores defeituosos e estratégias de controle podem comprometer o desempenho. O diagnóstico deve observar produção de água gelada, circuito de distribuição, unidades terminais e interfaces de automação antes de selecionar o investimento.",
  scopeDetailHeading: "Comparação de alternativas com dados de operação",
  scopeDetailText: "A engenharia pode estudar recuperação de máquinas, substituição de componentes, reorganização de bombas, atualização de controles ou instalação de novos chillers, conforme viabilidade. Avaliações de carga parcial, temperaturas de água, vazões e horários de funcionamento ajudam a comparar cenários. Economias percentuais e prazo de retorno dependem de medições e hipóteses demonstráveis, não de valores universais.",
  stagesIntro: "a proposta técnica começa no levantamento de funcionamento real e avança com alternativas documentadas e plano de intervenção.",
  stages: [
    { title: "Diagnóstico da CAG", text: "Inventário de chillers, bombas, torres quando existentes, trocadores, válvulas, rede hidráulica, sensores e histórico de falhas." },
    { title: "Estudo de modernização", text: "Análise de cargas, operação, eficiência, infraestrutura e cenários de manutenção, substituição parcial ou renovação ampla." },
    { title: "Projeto e execução por fases", text: "Definição das interfaces hidráulicas, elétricas, civis e de automação, logística e eventuais desligamentos ou soluções provisórias." },
    { title: "Comissionamento e entrega", text: "Verificações de vazão, temperaturas, comandos, proteções e registros de desempenho nos limites efetivamente contratados." },
  ],
  applicationsHeading: "edifícios corporativos e centrais comerciais existentes",
  applicationsText: "a modernização pode interessar a condomínios empresariais, hotéis, edifícios de escritórios e instalações com custos de operação elevados. Cada prédio possui perfil de demanda, horários, redundância e condicionantes de acesso próprios, que influenciam a melhor solução técnica.",
  applicationsDetailHeading: "Rede hidráulica, fan coils e automação precisam conversar",
  applicationsDetailText: "A CAG fornece água gelada, mas o conforto final depende da distribuição e da transferência de calor nos terminais. Válvulas, balanceamento, filtros, isolamento e comandos podem necessitar revisão. Quando há automação predial, a estratégia de bombas e máquinas deve ter projeto, integração e responsabilidades claramente definidos.",
  qualityText: "a contratação deve estabelecer desempenho esperado, critérios hidráulicos, interfaces de controle, etapas de transição e registros dos testes finais.",
  quality: [
    { title: "Linha de base operacional", text: "Inventário, cargas, horários, consumo disponível e parâmetros de água que fundamentem decisões de investimento." },
    { title: "Hidráulica verificada", text: "Vazões, bombas, perdas de carga, isolamentos, válvulas e capacidade de distribuição avaliados tecnicamente." },
    { title: "Controles definidos", text: "Sequenciamento de máquinas, sensores, inversores e BMS somente no escopo projetado e contratado." },
    { title: "Transição e aceite", text: "Plano de desligamentos, ensaios, partida, registro de alterações e documentação entregue à operação predial." },
  ],
  buyersText: "A THÉRMICA recebe consultas de gestores de facilities, condomínios empresariais, proprietários de imóveis, gerenciadoras e engenharia predial que desejam estudar retrofit de climatização central com critérios mensuráveis.",
  estimateText: "Os valores dependem do número e porte dos chillers, tecnologia, condições das bombas e redes, necessidade de obras civis, automação, espaço para movimentação e operação durante o retrofit. Comparar somente preço de máquina pode omitir a maior parte das interfaces.",
  estimateDetail: "a proposta deve distinguir equipamentos, adequações hidráulicas e elétricas, projeto, suportes, automação, desmontagem, mobilização, ensaios e custos de continuidade operacional.",
  estimateItems: ["Inventário e características de chillers e bombas", "Diagramas hidráulicos, plantas e rede existente", "Dados de consumo, cargas e horários de operação", "Histórico de manutenção, falhas e temperaturas de água", "Restrições de parada, orçamento e cronograma pretendido"],
  responsibilityHeading: "Quando modernizar uma central de água gelada?",
  responsibilityText: "A decisão depende da condição dos ativos, capacidade de atender às cargas, manutenção, disponibilidade e desempenho real. Pode ser mais econômico corrigir a distribuição ou atualizar controles antes de substituir o conjunto completo; em outros casos, a troca de máquinas é justificável. A análise deve preservar requisitos de conforto e operação em todos os cenários comparados.",
  responsibilityNote: "A THÉRMICA avalia obras de engenharia térmica B2B em São Paulo e em âmbito nacional conforme a complexidade e a equipe envolvida. Resultados de economia, certificações de desempenho e integração de BMS não são prometidos sem estudos, medições e contrato específico.",
  faq: [
    { title: "É obrigatório trocar todos os chillers antigos?", text: "Não. O diagnóstico pode indicar correções de hidráulica, controles, recuperação de componentes ou substituição parcial." },
    { title: "Uma CAG modernizada sempre reduz energia?", text: "O resultado depende de operação, carga, eficiência das máquinas, bombas, controles e manutenção; não há percentual garantido sem estudo." },
    { title: "O serviço inclui rede de fan coils?", text: "A distribuição e os terminais são avaliados conforme a necessidade, mas a intervenção depende de escopo específico." },
    { title: "É possível modernizar com o prédio ocupado?", text: "Pode ser viável por fases, considerando contingências, acesso e desligamentos aprovados pelo responsável pela operação." },
    { title: "Quais informações iniciarão a análise técnica?", text: "Plantas, diagramas, inventário, consumo, falhas, condições operacionais e objetivos de modernização." },
  ],
  audience: "Facilities, engenharia e condomínios empresariais em São Paulo e em todo o Brasil",
  regionLead: "Centrais de imóveis da capital e interior paulista, assim como de outros polos do país, podem receber avaliação preliminar conforme escopo.",
  pictures: [cagHero, cagInspecao, cagRedes, cagEntrega],
  pictureAlt: ["Central de climatização predial em estudo de modernização, imagem ilustrativa THÉRMICA", "Equipamentos HVAC de grande porte em inspeção técnica, ilustração", "Redes e instalações hidráulicas de climatização corporativa, imagem ilustrativa", "Equipamentos de central térmica empresarial em inspeção final, ilustração"],
  pictureCaption: ["Imagem ilustrativa de inspeção de sistemas centrais.", "Imagem ilustrativa de redes e equipamentos de climatização.", "Imagem ilustrativa de controles e conferências de entrega."],
};

export const pagina42: SeoKeywordPage = {
  path: "/compatibilizacao-bim-projetos-de-climatizacao-vrf",
  keyword: "compatibilização bim projetos de climatização vrf",
  description: "Compatibilização BIM projetos de climatização VRF: interferências, espaços técnicos, percursos, documentação e coordenação MEP para obras corporativas.",
  serviceType: "Avaliação de compatibilização de projetos VRF com fluxos BIM e coordenação multidisciplinar",
  badge: "Projetos VRF • Coordenação BIM e MEP",
  breadcrumb: "Compatibilização BIM climatização VRF",
  introduction: "Projetos corporativos de climatização compartilham espaços com estrutura, arquitetura, elétrica e instalações hidráulicas. A THÉRMICA avalia demandas de coordenação técnica de redes VRF, com compatibilização documental ou integração a fluxos BIM conforme os entregáveis, ferramentas e responsáveis definidos no contrato.",
  scopeHeading: "interferências identificadas antes da montagem",
  scopeText: "A coordenação de climatização precisa verificar passagens de tubulação frigorígena, dutos de ar externo, drenos, suportes, áreas de manutenção, condensadoras e evaporadoras. Modelos BIM podem apoiar a detecção de conflitos geométricos, mas a compatibilização também requer decisões sobre acesso, sequenciamento, níveis, isolamentos e limites permitidos pelos fabricantes.",
  scopeDetailHeading: "Modelo tridimensional não substitui verificação técnica",
  scopeDetailText: "Um encontro de elementos pode ser conflito real ou condição resolvível em obra, enquanto uma rede sem choque visual pode violar declividade de dreno ou raio de instalação, acesso de manutenção e limites do VRF. A matriz de responsabilidades deve definir quem modela, quem revisa, como são registradas as incompatibilidades e qual revisão de projeto autoriza a execução.",
  stagesIntro: "o processo depende de modelos e projetos coordenados, parâmetros de informação e rotina formal para resolução de interferências.",
  stages: [
    { title: "Recebimento da base técnica", text: "Conferência de plantas, memoriais, formatos BIM disponíveis, níveis, eixos, revisões e requisitos de troca de informação." },
    { title: "Revisão dos percursos VRF", text: "Análise de equipamentos, tubulações, dutos, drenos, suportes, áreas técnicas e folgas necessárias à montagem e manutenção." },
    { title: "Coordenação de interferências", text: "Registro e discussão de conflitos com arquitetura, estrutura, elétrica e instalações prediais, segundo fluxo definido pelo cliente." },
    { title: "Consolidação de alterações", text: "Emissão de pendências resolvidas, diretrizes, revisões e documentos de execução na abrangência contratada." },
  ],
  applicationsHeading: "obras corporativas com disciplinas simultâneas",
  applicationsText: "a coordenação beneficia lajes comerciais, edifícios multiusuários, hospitais, hotéis e empreendimentos com forros densos e shafts disputados. O valor está na identificação de decisões necessárias antes de fechar áreas de instalação, sempre de acordo com a maturidade do projeto disponível.",
  applicationsDetailHeading: "IFC, modelos federados e processo de revisão",
  applicationsDetailText: "Padrões abertos como IFC podem apoiar o intercâmbio de informações entre ferramentas BIM, mas não resolvem sozinhos divergências de projeto ou responsabilidades contratuais. O contratante deve estabelecer formatos, nível de informação, ambiente de dados, critérios de aprovação e se o escopo envolve modelagem, coordenação ou apenas consultoria técnica HVAC.",
  qualityText: "o comprador deve definir formato e qualidade dos dados, prazos de revisão, abrangência dos modelos e responsabilidade por alterações de cada disciplina.",
  quality: [
    { title: "Revisão controlada", text: "Versões de plantas e modelos identificadas para evitar coordenação sobre documentos superados." },
    { title: "Rotas executáveis", text: "Distâncias, declividades, isolamento, suportes, acesso de manutenção e limites de fabricante considerados além da geometria." },
    { title: "Pendências rastreáveis", text: "Conflitos descritos, atribuídos a responsáveis e encerrados conforme o procedimento de coordenação da obra." },
    { title: "Entregável compatível", text: "Relatórios, arquivos, modelos e desenhos com formato e nível de desenvolvimento definidos no contrato." },
  ],
  buyersText: "A THÉRMICA recebe demandas de construtoras, gerenciadoras, escritórios de arquitetura, projetistas e coordenação MEP para avaliar interfaces de sistemas VRV/VRF. Recursos de autoria ou coordenação BIM especializada dependem da estrutura e de parceiros tecnicamente adequados ao escopo.",
  estimateText: "A proposta depende de área e complexidade, quantidade de disciplinas, existência de modelos, qualidade dos dados, número de ciclos de revisão e formatos de entrega. Converter plantas em modelos é diferente de compatibilizar modelos prontos e deve ser cotado separadamente.",
  estimateDetail: "o pedido precisa delimitar produção de modelo, revisão de engenharia, detecção de conflitos, reuniões, relatórios, atualizações, licenças e responsabilidade de cada projetista.",
  estimateItems: ["Projetos VRF, memoriais e lista de máquinas", "Arquivos de arquitetura, estrutura e demais disciplinas", "Modelos e formatos BIM disponíveis, inclusive IFC se houver", "Critérios de informação, revisões e coordenação", "Prazo, reuniões, relatórios e tipo de entregável pretendido"],
  responsibilityHeading: "Como definir a compatibilização BIM de climatização?",
  responsibilityText: "O contrato deve indicar o responsável por cada modelo, o processo de emissão de interferências e a autoridade para aprovar alterações em projeto. A THÉRMICA pode avaliar o componente técnico de climatização e sua integração ao fluxo contratado, observando limites de escopo, qualificação e disponibilidade de modelagem especializada.",
  responsibilityNote: "A THÉRMICA atua em engenharia e instalações VRV/VRF empresariais, com prioridade para São Paulo e atendimento nacional conforme viabilidade. Esta página não afirma certificação BIM, equipe própria de modeladores ou interoperabilidade garantida sem avaliação documental.",
  faq: [
    { title: "BIM identifica todos os problemas de instalação VRF?", text: "Não. Além das interferências geométricas, é necessário verificar especificações, montagem, drenagem, acesso e limites de fabricante." },
    { title: "É necessário ter arquivo IFC?", text: "O formato depende do processo e das ferramentas do empreendimento; IFC pode facilitar troca aberta, mas não é exigência universal." },
    { title: "A THÉRMICA produz o modelo BIM completo?", text: "A disponibilidade de modelagem específica deve ser avaliada e contratada. O escopo pode ser limitado à revisão técnica HVAC." },
    { title: "Quem decide mover um duto ou tubulação?", text: "A decisão segue as responsabilidades de projeto e a coordenação multidisciplinar, com aprovação formal de revisões." },
    { title: "Quais arquivos enviar para uma avaliação?", text: "Projetos, modelos disponíveis, revisão vigente, memorial, formato exigido e plano de coordenação da obra." },
  ],
  audience: "Construtoras, gerenciadoras e coordenação de engenharia em São Paulo e em âmbito nacional",
  regionLead: "Projetos com coordenação técnica na capital paulista e outras regiões brasileiras podem ser avaliados conforme requisitos de informação e mobilização.",
  pictures: [bimHero, bimEngenharia, bimInfra, bimRevisao],
  pictureAlt: ["Engenharia analisando instalações de VRF corporativo, imagem ilustrativa THÉRMICA", "Equipe técnica revisando projeto de climatização, ilustração", "Infraestrutura de redes HVAC em obra comercial, imagem ilustrativa", "Engenharia verificando documentação e interferências de climatização, ilustração"],
  pictureCaption: ["Imagem ilustrativa de revisão técnica e coordenação de projetos.", "Imagem ilustrativa de rotas de instalação predial.", "Imagem ilustrativa de análise de interfaces e documentação."],
};

export const pagina43: SeoKeywordPage = {
  path: "/contrato-de-climatizacao-predial-para-facilities-sp",
  keyword: "contrato de climatização predial para facilities sp",
  description: "Contrato de climatização predial para facilities SP: definição de escopo HVAC, manutenção, PMOC, indicadores, intervenções e responsabilidades de engenharia.",
  serviceType: "Avaliação técnica de contratos de manutenção e intervenções em climatização predial B2B",
  badge: "Facilities • Climatização predial empresarial",
  breadcrumb: "Contrato de climatização facilities SP",
  introduction: "Gestores de facilities precisam definir com precisão quem inspeciona, mantém, opera e moderniza os sistemas de climatização. A THÉRMICA avalia demandas empresariais de engenharia HVAC, intervenções técnicas e escopos de serviços prediais que podem se integrar aos processos de contratação e gestão do imóvel.",
  scopeHeading: "contratação vinculada aos ativos e à operação",
  scopeText: "Um contrato pode contemplar manutenção preventiva, corretiva, assistência técnica, pequenas adequações ou modernizações, mas não se deve presumir inclusão de todas essas atividades. Inventário de equipamentos, sistemas VRF, fan coils, CAG, dutos e automação definem a complexidade do escopo. Frequência de visita, peças, mão de obra, emergências e horário de cobertura precisam estar explícitos.",
  scopeDetailHeading: "PMOC, engenharia e manutenção têm limites próprios",
  scopeDetailText: "O Plano de Manutenção, Operação e Controle é um instrumento de gestão sujeito às exigências aplicáveis, mas a existência de PMOC não equivale automaticamente a execução de todos os serviços. A responsabilidade técnica, a operação da central, análises de qualidade do ar e substituição de equipamentos podem demandar profissionais e contratos distintos. Cada proposta deve documentar essas fronteiras.",
  stagesIntro: "a contratação eficiente começa com inventário, nível de serviço esperado e responsabilidades pactuadas entre facilities e fornecedores.",
  stages: [
    { title: "Levantamento de ativos", text: "Relação de máquinas, localização, capacidade, criticidade, histórico, idade, documentação e condições operacionais." },
    { title: "Escopo e níveis de serviço", text: "Definição de rotinas, intervenções, peças, tempos de resposta, horário de atendimento e critérios de acionamento." },
    { title: "Planejamento e acompanhamento", text: "Programação de visitas, relatórios, segurança de acesso, pendências, aprovações de corretivas e interface com operações." },
    { title: "Avaliação de resultados", text: "Indicadores acordados de execução, disponibilidade e não conformidades, além de plano de correções e renovações." },
  ],
  applicationsHeading: "condomínios comerciais, lajes e operações empresariais",
  applicationsText: "edifícios corporativos, sedes administrativas, hotéis e unidades comerciais podem precisar de contratos diferentes, conforme criticidade, uso, tecnologia e horário de funcionamento. A decisão deve distinguir manutenção cotidiana de obras de retrofit e de projetos de engenharia de maior porte.",
  applicationsDetailHeading: "Gestão de chamados e intervenções extraordinárias",
  applicationsDetailText: "Atendimento emergencial, peças de alto valor, falhas de automação, recuperação de compressor e obras de substituição não devem ficar implícitos em uma mensalidade genérica. A matriz contratual deve prever processo de cotação, aprovação, prazo e medição para serviços extraordinários, além de regras de entrega de documentação.",
  qualityText: "o cliente deve identificar indicadores verificáveis, periodicidade, limites de peças, responsabilidade por segurança e registros técnicos associados aos ativos.",
  quality: [
    { title: "Inventário consistente", text: "Base de equipamentos e histórico de intervenções para permitir planejamento e comparabilidade entre propostas." },
    { title: "Rotinas documentadas", text: "Atividades preventivas e verificações periódicas compatíveis com tecnologia, manual e uso do empreendimento." },
    { title: "Responsabilidade definida", text: "Limites de PMOC, ART, operação, automação, qualidade do ar e serviços especializados devidamente identificados." },
    { title: "Relatórios úteis", text: "Registros de execução, falhas, peças, pendências e recomendações para orçamento de modernizações." },
  ],
  buyersText: "A THÉRMICA recebe solicitações de gestores de facilities, administradoras prediais, contratantes de manutenção e departamentos de compras que buscam apoio em engenharia e climatização B2B. A viabilidade de uma contratação recorrente é avaliada conforme os sistemas e o nível de atendimento exigido.",
  estimateText: "O custo depende de número e porte dos ativos, complexidade tecnológica, distribuição geográfica, acessos, equipe necessária, janelas de trabalho e exigências de atendimento. Uma proposta mensal sem inventário e atividades definidas pode gerar diferenças significativas no serviço efetivamente recebido.",
  estimateDetail: "deve-se esclarecer visitas, inspeções, mão de obra, corretivas, peças, materiais, laudos, PMOC, ART, emergências, horários de cobertura e serviços fora do escopo.",
  estimateItems: ["Inventário e localização dos equipamentos", "Histórico de falhas e contratos atualmente vigentes", "Horários de ocupação e criticidade dos ambientes", "Serviços e níveis de resposta desejados", "Documentação técnica, PMOC e indicadores exigidos"],
  responsibilityHeading: "O que não pode faltar em contrato predial de climatização?",
  responsibilityText: "A descrição dos ativos, rotinas, responsabilidades, exclusões, registros, condições de atendimento e procedimento para serviços extras precisa ser objetiva. Sem essas definições, uma cobrança mensal pode ser comparada indevidamente com outra de escopo diferente. É recomendável separar obrigações de manutenção das intervenções de engenharia e substituição de ativos.",
  responsibilityNote: "A THÉRMICA tem foco em instalação VRV/VRF, engenharia e retrofit B2B; a disponibilidade de contratos recorrentes deve ser confirmada caso a caso. A atuação prioritária é São Paulo, com análise de demandas nacionais conforme porte e logística. PMOC, RT e obrigações legais são delimitados pela contratação e atribuições profissionais.",
  faq: [
    { title: "O contrato mensal inclui automaticamente todas as peças?", text: "Não. É necessário especificar consumíveis, peças, componentes de alto valor e serviços extraordinários." },
    { title: "PMOC é o mesmo que manutenção preventiva?", text: "Não exatamente. O PMOC é um plano de gestão e controle; a execução de rotinas e a responsabilidade técnica precisam ser definidas separadamente." },
    { title: "A THÉRMICA oferece contratos recorrentes para qualquer prédio?", text: "A viabilidade é avaliada conforme inventário, localização, escopo, equipe e nível de serviço pretendido." },
    { title: "Retrofit ou troca de chiller entram no mesmo contrato?", text: "Geralmente são intervenções de maior porte e devem possuir projeto, orçamento e contratação específicos." },
    { title: "Quais documentos enviar para cotação?", text: "Inventário, plantas, PMOC existente, histórico de manutenção, horários e requisitos contratuais de facilities." },
  ],
  audience: "Facilities, administradoras e empresas de São Paulo e outras regiões do Brasil",
  regionLead: "A análise de demandas de facilities abrange imóveis paulistas e pode alcançar carteiras nacionais mediante escopo e capacidade de mobilização.",
  pictures: [facilitiesHero, facilitiesTecnica, facilitiesEquipamentos, facilitiesEntrega],
  pictureAlt: ["Infraestrutura de climatização de edifício empresarial, imagem ilustrativa THÉRMICA", "Equipe técnica em inspeção de instalações HVAC corporativas, ilustração", "Equipamentos de ar condicionado predial em área técnica, imagem ilustrativa", "Registros e inspeção de sistemas de climatização empresarial, ilustração"],
  pictureCaption: ["Imagem ilustrativa de inspeção e manutenção técnica.", "Imagem ilustrativa de equipamentos prediais monitorados.", "Imagem ilustrativa de documentação e avaliação operacional."],
};

export const pagina44: SeoKeywordPage = {
  path: "/gestao-de-obras-de-climatizacao-sao-paulo",
  keyword: "gestão de obras de climatização são paulo",
  description: "Gestão de obras de climatização São Paulo: planejamento HVAC, cronograma, interfaces, fiscalização técnica, documentação e controle de entrega com THÉRMICA.",
  serviceType: "Coordenação técnica e execução de obras de engenharia de climatização empresarial",
  badge: "Obras HVAC • Planejamento e coordenação",
  breadcrumb: "Gestão de obras de climatização SP",
  introduction: "Projetos de climatização corporativa envolvem equipamentos, redes, prazos e interfaces com diversas disciplinas. A THÉRMICA avalia demandas de coordenação técnica e execução de obras HVAC com escopo, responsabilidades e critérios de fiscalização definidos pelo contratante.",
  scopeHeading: "planejamento técnico para reduzir interferências",
  scopeText: "A obra de climatização depende de projeto aprovado, frentes liberadas, suprimentos, acessos e sequenciamento com arquitetura, estrutura, elétrica, hidráulica e automação. Uma programação que considere apenas a instalação das máquinas ignora suporte, redes, drenagem, testes e retrabalhos que surgem quando as disciplinas se sobrepõem sem compatibilização.",
  scopeDetailHeading: "Cronograma e responsabilidades de cada fornecedor",
  scopeDetailText: "É importante separar gestão global do empreendimento, fiscalização independente, coordenação da instaladora e execução da equipe própria. Um contrato de instalação não implica automaticamente assumir a gestão de todas as empreiteiras, medições ou segurança global do canteiro. A matriz de interfaces estabelece quem aprova desenhos, libera frentes e responde por ajustes de escopo.",
  stagesIntro: "o acompanhamento deve conectar planejamento, materiais, montagem e testes a entregas mensuráveis e registradas.",
  stages: [
    { title: "Revisão do pacote executivo", text: "Conferência de escopo, desenhos, memorial, lista de máquinas, interfaces, responsáveis e cronograma de referência." },
    { title: "Plano de frentes e suprimentos", text: "Programação de equipes, liberação de áreas, materiais críticos, acessos, segurança e compatibilização com o canteiro." },
    { title: "Controle da execução", text: "Verificação de avanços, registros de não conformidades, esclarecimentos técnicos, atualização de pendências e mudanças aprovadas." },
    { title: "Comissionamento e entrega", text: "Coordenação de ensaios contratados, partidas, documentação as-built, treinamento previsto e aceite do cliente." },
  ],
  applicationsHeading: "obras VRF, retrofit e infraestrutura HVAC corporativa",
  applicationsText: "a gestão pode interessar a construtoras, gerenciadoras e equipes de facilities em novas lajes, retrofits prediais, hotéis, instituições de ensino e ampliações empresariais. A complexidade aumenta quando o edifício permanece ocupado e é necessário planejar janelas de intervenção e contingência operacional.",
  applicationsDetailHeading: "Medições e mudanças precisam de controle formal",
  applicationsDetailText: "Quantitativos, serviços executados, ensaios pendentes e revisões de projeto devem ser registrados para que medições reflitam entrega real. Solicitações verbais de mudança podem provocar aditivos ou disputas posteriores. Antes de executar serviços extras, é recomendável formalizar efeito em materiais, prazo e responsabilidade técnica.",
  qualityText: "o contratante precisa de marcos de obra, responsáveis, evidências de execução, procedimentos de ensaio e documentação comparável com o pacote contratado.",
  quality: [
    { title: "Escopo e interfaces", text: "Delimitação entre projeto, aquisição, civil, elétrica, automação, montagem e testes." },
    { title: "Planejamento rastreável", text: "Cronograma de frentes, prioridades, suprimentos e riscos coordenados com a obra principal." },
    { title: "Fiscalização documentada", text: "Checklists, pendências, revisão de quantitativos e registros de alteração na extensão prevista no contrato." },
    { title: "Entrega técnica", text: "Critérios de aceite de redes, equipamentos, testes, partida e documentação operacional estabelecidos antecipadamente." },
  ],
  buyersText: "A THÉRMICA atende consultas de gerenciadoras de obras, construtoras, incorporadoras, engenheiros de instalações e facilities que necessitam planejamento e execução profissional de climatização, com eventual coordenação técnica conforme equipe e escopo disponível.",
  estimateText: "O investimento em coordenação depende de porte, número de disciplinas, prazo, quantidade de fornecedores, fases de instalação, documentação e nível de dedicação técnica. Custos de gestão não devem ser confundidos com materiais e mão de obra de execução.",
  estimateDetail: "é necessário especificar se o serviço inclui planejamento, visitas, fiscalização, reunião de obra, levantamentos, medições, programação de equipes, ensaios ou responsabilidade de gerenciamento geral.",
  estimateItems: ["Projeto HVAC, memorial e cronograma do empreendimento", "Escopo de execução e matriz de responsabilidades", "Empreiteiras e interfaces a serem coordenadas", "Requisitos de fiscalização, medição e relatórios", "Local, duração, frentes e entregáveis de aceite"],
  responsibilityHeading: "O que uma gestão de obra HVAC deve entregar?",
  responsibilityText: "O contrato deve estabelecer relatórios, reuniões, controle documental, registro de alterações e critérios de aceite. A gestão técnica da instalação pode integrar uma obra, mas não transfere automaticamente ao prestador atribuições de segurança global, projeto de terceiros ou direção de outras empreiteiras. Essas responsabilidades exigem contratação própria.",
  responsibilityNote: "A THÉRMICA foca engenharia e execução VRV/VRF, retrofit e sistemas corporativos em São Paulo, com avaliação nacional por porte. Serviços de fiscalização independente ou gerenciamento integral são avaliados conforme habilitação, equipe e limites expressamente definidos.",
  faq: [
    { title: "Gestão de obras HVAC inclui execução de instalação?", text: "São escopos diferentes. Podem integrar um contrato quando claramente previstos e com responsabilidades compatíveis." },
    { title: "A THÉRMICA pode coordenar todas as empreiteiras do canteiro?", text: "Gerenciamento integral não é presumido; disponibilidade e limites de coordenação precisam ser definidos em contratação específica." },
    { title: "Como controlar aditivos e mudanças?", text: "Registre revisão de projeto, quantitativo, custo, impacto de prazo e aprovação antes da execução adicional." },
    { title: "É possível atuar em prédio ocupado?", text: "A viabilidade depende das áreas, janelas de acesso, contingência, proteção de usuários e autorização do operador predial." },
    { title: "O que encaminhar para proposta?", text: "Projetos, cronograma, escopo de coordenação, fornecedores envolvidos, local e entregáveis exigidos." },
  ],
  audience: "Construtoras, gerenciadoras e engenharia de obras em São Paulo e no Brasil",
  regionLead: "Demandas de gestão e coordenação HVAC da capital paulista, interior e demais regiões podem ser analisadas conforme porte e dedicação técnica.",
  pictures: [gestaoHero, gestaoProjeto, gestaoObra, gestaoTestes],
  pictureAlt: ["Coordenação de obra de climatização de edifício corporativo, imagem ilustrativa THÉRMICA", "Engenheiro conferindo projeto e infraestrutura HVAC, ilustração", "Instalação empresarial de redes e equipamentos em obra, imagem ilustrativa", "Inspeção final de sistemas de ar condicionado corporativo, ilustração"],
  pictureCaption: ["Imagem ilustrativa de análise de projeto e cronograma.", "Imagem ilustrativa de execução e acompanhamento técnico.", "Imagem ilustrativa de testes e documentação da entrega."],
};

export const pagina45: SeoKeywordPage = {
  path: "/empresa-de-ar-condicionado-para-gerenciadoras-de-obras",
  keyword: "empresa de ar condicionado para gerenciadoras de obras",
  description: "Empresa de ar condicionado para gerenciadoras de obras: contratação B2B de VRF/VRV, infraestrutura HVAC, retrofit, execução, testes e documentação THÉRMICA.",
  serviceType: "Empresa de engenharia e instalação de climatização para gerenciadoras de obras",
  badge: "Gerenciadoras de obras • Parceiro HVAC",
  breadcrumb: "Ar-condicionado para gerenciadoras",
  introduction: "Gerenciadoras precisam contratar instaladoras que compreendam projetos executivos, prazos, documentação e coordenação de frentes. A THÉRMICA atua em climatização empresarial VRV/VRF, retrofit e infraestrutura HVAC, avaliando concorrências conforme porte, escopo e exigências do empreendimento.",
  scopeHeading: "instalação empresarial com interfaces claras",
  scopeText: "A gerenciadora geralmente reúne projetos de várias disciplinas e precisa que cada contratado identifique fornecimento, quantidade e responsabilidade. Sistemas VRF, redes frigorígenas, dutos, drenos, ventilação e equipamentos centrais podem compor um pacote, mas a proposta deve explicitar exatamente quais elementos estão incluídos. A clareza previne sobreposição entre instaladora de climatização, elétrica, automação e obra civil.",
  scopeDetailHeading: "Qualificação e documentação para contratação corporativa",
  scopeDetailText: "Além de preço, o contratante deve verificar aderência ao memorial, projeto, equipe, procedimentos de instalação, condições de segurança, ART nas atividades aplicáveis e histórico compatível com o porte da obra. Credenciamentos de fabricantes e cadastros corporativos devem ser comprovados conforme exigência do processo, sem presumir homologação automática.",
  stagesIntro: "o parceiro técnico deve trabalhar com informações suficientes para precificar, programar a obra e comprovar cada etapa da entrega.",
  stages: [
    { title: "Análise da concorrência", text: "Conferência de edital, projetos, quantitativos, especificações, anexos de segurança, visitas e esclarecimentos." },
    { title: "Proposta e interfaces", text: "Separação de fornecimentos, prazo, riscos, condições de medição, recursos e exclusões em matriz contratual." },
    { title: "Execução de climatização", text: "Mobilização, instalação de redes e equipamentos contratados e registro de qualidade, avanços e interferências de obra." },
    { title: "Comissionamento e aceite", text: "Ensaios e partida conforme escopo, resolução de pendências, documentação final e entrega aos responsáveis pela operação." },
  ],
  applicationsHeading: "construtoras, incorporadoras e obras corporativas",
  applicationsText: "gerenciadoras atuam em obras novas, adequações de lajes, hotelaria, hospitais, centros comerciais e retrofit empresarial. Cada segmento requer requisitos próprios de tecnologia, acesso e ensaios; a qualificação do fornecedor precisa corresponder à criticidade da instalação e não apenas ao nome genérico do serviço.",
  applicationsDetailHeading: "Acompanhamento de qualidade e alterações de projeto",
  applicationsDetailText: "Durante a obra, revisões de desenho, interferências e solicitações adicionais devem ser avaliadas antes de impactarem tubulações, equipamentos e prazo. Checklists e evidências de ensaio ajudam na medição e fiscalização. O as-built deve representar as alterações efetivamente executadas, quando previsto na contratação.",
  qualityText: "o pacote técnico-comercial deve demonstrar recursos, procedimentos, documentação, responsabilidade de interfaces e critérios de recebimento claros para a gerenciadora.",
  quality: [
    { title: "Engenharia alinhada", text: "Leitura técnica de projeto e memoriais, conferência de equipamentos, redes, normas aplicáveis e restrições de obra." },
    { title: "Fornecimento definido", text: "Materiais, mão de obra, equipamentos, elétrica, automação e serviços auxiliares expressamente incluídos ou excluídos." },
    { title: "Controle de execução", text: "Equipe, qualidade, segurança, comunicação de não conformidades e medições conforme as exigências contratuais." },
    { title: "Aceite documentado", text: "Testes, partida, relatórios e as-built nos limites contratados, com pendências e responsabilidades identificadas." },
  ],
  buyersText: "A THÉRMICA recebe contatos de gerenciadoras, engenheiros de obras, construtoras, compras e fiscalização técnica que buscam fornecedor especializado em instalações de climatização corporativa e sistemas VRF/VRV.",
  estimateText: "Uma proposta confiável depende de tecnologia, equipamentos, redes, acesso, estágio da obra, documentação, equipes, prazo e exigências da gerenciadora. Valores de concorrências devem ser comparados com escopos iguais, evitando propostas aparentemente mais baratas por exclusões não percebidas.",
  estimateDetail: "o contratante deve discriminar máquinas, infraestrutura, suprimentos, instalação, controles, energia, testes, garantias, registros, mobilização e atividades atribuídas a terceiros.",
  estimateItems: ["Edital, memorial e desenhos atualizados", "Planilha de quantitativos e equipamentos previstos", "Regras de cadastro, segurança e fiscalização", "Cronograma, frentes, logística e localização", "Critérios de entrega, medição e responsabilidades"],
  responsibilityHeading: "Como homologar uma empresa de HVAC para gerenciadora?",
  responsibilityText: "O processo deve verificar documentação e capacidade para o escopo real, conferir a proposta técnica, formalizar exclusões e estabelecer canais de acompanhamento da obra. A experiência declarada precisa ser proporcional aos requisitos de engenharia, segurança e operação previstos, sem confundir qualificação técnica com homologação por qualquer contratante.",
  responsibilityNote: "A THÉRMICA concentra sua atividade em engenharia e execução B2B de climatização, VRV/VRF e retrofit. Prioriza São Paulo e avalia concorrências nacionais conforme porte e mobilização. Atribuições técnicas e documentação de cadastro são verificadas conforme o empreendimento.",
  faq: [
    { title: "A THÉRMICA participa de concorrências de gerenciadoras?", text: "Sim, solicitações com projeto, escopo, prazo e documentos de cadastro são recebidas para avaliação de viabilidade." },
    { title: "É possível contratar somente a instalação do VRF?", text: "A instalação sem fornecimento de máquinas pode ser analisada, desde que acessórios, materiais e interfaces estejam definidos." },
    { title: "As obras incluem ART e documentação técnica?", text: "A documentação depende das atividades assumidas e de profissional habilitado, com escopo explícito no contrato." },
    { title: "Vocês assumem automação predial ou elétrica?", text: "Somente quando previstas e tecnicamente compatíveis com as responsabilidades contratadas." },
    { title: "Que materiais devo enviar para orçamento?", text: "Projeto, memorial, quantitativos, cronograma, regras da obra e exigências de testes e aceite." },
  ],
  audience: "Gerenciadoras, construtoras e engenharia de obras em São Paulo e no Brasil",
  regionLead: "Oportunidades de execução HVAC da capital paulista, interior e outros estados podem ser avaliadas conforme porte, prazo e mobilização.",
  pictures: [gerenciadorasHero, gerenciadorasEquipe, gerenciadorasInstalacao, gerenciadorasFinalizacao],
  pictureAlt: ["Equipe de ar condicionado em obra corporativa gerenciada, imagem ilustrativa THÉRMICA", "Instalação de redes HVAC empresariais com engenheiro de obra, ilustração", "Infraestrutura VRF em construção comercial, imagem ilustrativa", "Equipamentos de ar condicionado corporativo em inspeção final, ilustração"],
  pictureCaption: ["Imagem ilustrativa de coordenação com gerenciadora.", "Imagem ilustrativa de infraestrutura e execução HVAC.", "Imagem ilustrativa de testes e documentação final."],
};
