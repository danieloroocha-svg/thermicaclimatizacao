import logo from "@/assets/thermica-logo.png";
import headerLogo from "@/assets/thermica-logo-header-oficial.png";
import osasco from "@/assets/obra-osasco.webp";
import lapa from "@/assets/obra-lapa.webp";
import indaiatuba from "@/assets/obra-indaiatuba.webp";
import baroneza from "@/assets/obra-baroneza.webp";
import hospital from "@/assets/obra-hospital.webp";
import centro from "@/assets/obra-centro-sp.webp";
import universidade from "@/assets/obra-universidade.webp";

export const SITE = {
  name: "THÉRMICA Soluções em Climatização Ltda.",
  email: "comercial@thermicaclimatizacao.com.br",
  phone: "(11) 95591-3582",
  address: "Estrada das Lágrimas, 489 — Ipiranga, São Paulo — SP, CEP 04232-000",
  logo: logo,
  headerLogo: headerLogo,
  whatsapp: "https://wa.me/5511955913582?text=Ol%C3%A1%21%20Entrei%20em%20contato%20pelo%20site%20da%20TH%C3%89RMICA%20e%20gostaria%20de%20falar%20sobre%20uma%20demanda%20de%20climatiza%C3%A7%C3%A3o.",
} as const;

export const projects = [
  { slug: "predio-administrativo-osasco", title: "Prédio administrativo em Osasco", system: "Sistema VRF Hitachi", type: "Corporativo", image: osasco },
  { slug: "retrofit-escritorio-lapa", title: "Retrofit de escritório na Lapa", system: "Sistema VRV Daikin", type: "Retrofit", image: lapa },
  { slug: "escritorio-indaiatuba", title: "Escritório em Indaiatuba — 3 andares com fábrica", system: "Sistema VRV Daikin", type: "Industrial", image: indaiatuba },
  { slug: "quinta-da-baroneza", title: "Casa de alto padrão — Quinta da Baroneza", system: "Sistema VRF Samsung", type: "Alto padrão", image: baroneza },
  { slug: "hospital-vila-clementino", title: "Hospital na Vila Clementino", system: "Sistema VRF Trane", type: "Saúde", image: hospital },
  { slug: "predio-publico-centro-sp", title: "Prédio público no centro de São Paulo", system: "Sistema VRF LG", type: "Institucional", image: centro },
  { slug: "universidade-guarulhos", title: "Universidade em Guarulhos", system: "Sistema VRF Midea", type: "Educação", image: universidade },
] as const;

export const articles = [
  { slug: "fundamentos-vrv-vrf", title: "VRV/VRF: fundamentos para decisões de engenharia", excerpt: "Como a modulação de refrigerante atende diferentes zonas e aplicações corporativas." },
  { slug: "quando-optar-retrofit", title: "Quando considerar um retrofit de climatização", excerpt: "Critérios para avaliar obsolescência, continuidade operacional e adequação do sistema." },
  { slug: "avaliacao-tecnica", title: "O que envolve uma avaliação técnica", excerpt: "O levantamento que antecede uma decisão segura sobre instalação, ampliação ou modernização." },
  { slug: "etapas-implantacao", title: "Etapas de implantação de um sistema VRV/VRF", excerpt: "Da compatibilização à partida: os pontos de controle de uma execução estruturada." },
] as const;

export const BASE_URL = "https://thermicaclimatizacao.lovable.app";

export const meta = (title: string, description: string, path = "/") => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `${BASE_URL}${path}` },
    { name: "twitter:card", content: "summary_large_image" },
  ],
  links: [{ rel: "canonical", href: `${BASE_URL}${path}` }],
});