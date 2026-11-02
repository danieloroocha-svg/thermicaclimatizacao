import headerLogo from "@/assets/thermica-logo-header.webp";
import osasco from "@/assets/obra-osasco.webp";
import lapa from "@/assets/obra-lapa.webp";
import osascoMobile from "@/assets/obra-osasco-mobile.webp";
export const HERO_MOBILE = osascoMobile;
import indaiatuba from "@/assets/obra-indaiatuba.webp";
import baroneza from "@/assets/obra-baroneza.webp";
import hospital from "@/assets/obra-hospital.webp";
import centro from "@/assets/obra-centro-sp.webp";
import universidade from "@/assets/obra-universidade.webp";

import osascoCard480 from "@/assets/obra-osasco-card-480.webp";
import osascoCard900 from "@/assets/obra-osasco-card-900.webp";
import lapaCard480 from "@/assets/obra-lapa-card-480.webp";
import lapaCard900 from "@/assets/obra-lapa-card-900.webp";
import indaiatubaCard480 from "@/assets/obra-indaiatuba-card-480.webp";
import indaiatubaCard900 from "@/assets/obra-indaiatuba-card-900.webp";
import baronezaCard480 from "@/assets/obra-baroneza-card-480.webp";
import baronezaCard900 from "@/assets/obra-baroneza-card-900.webp";
import hospitalCard480 from "@/assets/obra-hospital-card-480.webp";
import hospitalCard900 from "@/assets/obra-hospital-card-900.webp";
import centroSpCard480 from "@/assets/obra-centro-sp-card-480.webp";
import centroSpCard900 from "@/assets/obra-centro-sp-card-900.webp";
import universidadeCard480 from "@/assets/obra-universidade-card-480.webp";
import universidadeCard900 from "@/assets/obra-universidade-card-900.webp";

export const SITE = {
  name: "THÉRMICA Soluções em Climatização Ltda.",
  email: "comercial@thermicaclimatizacao.com.br",
  phone: "(11) 95504-6147",
  address: "Estrada das Lágrimas, 489 — Ipiranga, São Paulo — SP, CEP 04232-000",
  headerLogo: headerLogo,
  whatsapp: "https://wa.me/5511955046147?text=Ol%C3%A1%21%20Entrei%20em%20contato%20pelo%20site%20da%20TH%C3%89RMICA%20e%20gostaria%20de%20falar%20sobre%20uma%20demanda%20de%20climatiza%C3%A7%C3%A3o.",
} as const;

export const projects = [
  { slug: "predio-administrativo-osasco", title: "Prédio administrativo em Osasco", system: "Sistema VRF Hitachi", type: "Corporativo", image: osasco, thumbSmall: osascoCard480, thumbLarge: osascoCard900 },
  { slug: "retrofit-escritorio-lapa", title: "Retrofit de escritório na Lapa", system: "Sistema VRV Daikin", type: "Retrofit", image: lapa, thumbSmall: lapaCard480, thumbLarge: lapaCard900 },
  { slug: "escritorio-indaiatuba", title: "Escritório em Indaiatuba — 3 andares com fábrica", system: "Sistema VRV Daikin", type: "Industrial", image: indaiatuba, thumbSmall: indaiatubaCard480, thumbLarge: indaiatubaCard900 },
  { slug: "quinta-da-baroneza", title: "Casa de alto padrão — Quinta da Baroneza", system: "Sistema VRF Samsung", type: "Alto padrão", image: baroneza, thumbSmall: baronezaCard480, thumbLarge: baronezaCard900 },
  { slug: "hospital-vila-clementino", title: "Hospital na Vila Clementino", system: "Sistema VRF Trane", type: "Saúde", image: hospital, thumbSmall: hospitalCard480, thumbLarge: hospitalCard900 },
  { slug: "predio-publico-centro-sp", title: "Prédio público no centro de São Paulo", system: "Sistema VRF LG", type: "Institucional", image: centro, thumbSmall: centroSpCard480, thumbLarge: centroSpCard900 },
  { slug: "universidade-guarulhos", title: "Universidade em Guarulhos", system: "Sistema VRF Midea", type: "Educação", image: universidade, thumbSmall: universidadeCard480, thumbLarge: universidadeCard900 },
] as const;

export const articles = [
  { slug: "fundamentos-vrv-vrf", title: "VRV/VRF: fundamentos para decisões de engenharia", excerpt: "Como a modulação de refrigerante atende diferentes zonas e aplicações corporativas." },
  { slug: "quando-optar-retrofit", title: "Quando considerar um retrofit de climatização", excerpt: "Critérios para avaliar obsolescência, continuidade operacional e adequação do sistema." },
  { slug: "avaliacao-tecnica", title: "O que envolve uma avaliação técnica", excerpt: "O levantamento que antecede uma decisão segura sobre instalação, ampliação ou modernização." },
  { slug: "etapas-implantacao", title: "Etapas de implantação de um sistema VRV/VRF", excerpt: "Da compatibilização à partida: os pontos de controle de uma execução estruturada." },
] as const;

export const BASE_URL = "https://thermicaclimatizacao.com.br";

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