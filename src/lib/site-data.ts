import logo from "@/assets/thermica-logo.png.asset.json";
import osasco from "@/assets/obra-osasco.webp.asset.json";
import lapa from "@/assets/obra-lapa.png.asset.json";
import indaiatuba from "@/assets/obra-indaiatuba.webp.asset.json";
import baroneza from "@/assets/obra-baroneza.webp.asset.json";
import hospital from "@/assets/obra-hospital.webp.asset.json";
import centro from "@/assets/obra-centro-sp.webp.asset.json";
import universidade from "@/assets/obra-universidade.webp.asset.json";

export const SITE = {
  name: "THÉRMICA Soluções em Climatização Ltda.",
  email: "comercial@thermicaclimatizacao.com.br",
  phone: "(11) 95591-3582",
  address: "Estrada das Lágrimas, 489 — Ipiranga, São Paulo — SP, CEP 04232-000",
  logo: logo.url,
  whatsapp: "https://wa.me/5511955913582?text=Ol%C3%A1%21%20Entrei%20em%20contato%20pelo%20site%20da%20TH%C3%89RMICA%20e%20gostaria%20de%20falar%20sobre%20uma%20demanda%20de%20climatiza%C3%A7%C3%A3o.",
} as const;

export const projects = [
  { slug: "predio-administrativo-osasco", title: "Prédio administrativo em Osasco", system: "Sistema VRF Hitachi", type: "Corporativo", image: osasco.url },
  { slug: "retrofit-escritorio-lapa", title: "Retrofit de escritório na Lapa", system: "Sistema VRV Daikin", type: "Retrofit", image: lapa.url },
  { slug: "escritorio-indaiatuba", title: "Escritório em Indaiatuba — 3 andares com fábrica", system: "Sistema VRV Daikin", type: "Industrial", image: indaiatuba.url },
  { slug: "quinta-da-baroneza", title: "Casa de alto padrão — Quinta da Baroneza", system: "Sistema VRF Samsung", type: "Alto padrão", image: baroneza.url },
  { slug: "hospital-vila-clementino", title: "Hospital na Vila Clementino", system: "Sistema VRF Trane", type: "Saúde", image: hospital.url },
  { slug: "predio-publico-centro-sp", title: "Prédio público no centro de São Paulo", system: "Sistema VRF LG", type: "Institucional", image: centro.url },
  { slug: "universidade-guarulhos", title: "Universidade em Guarulhos", system: "Sistema VRF Midea", type: "Educação", image: universidade.url },
] as const;

export const articles = [
  { slug: "fundamentos-vrv-vrf", title: "VRV/VRF: fundamentos para decisões de engenharia", excerpt: "Como a modulação de refrigerante atende diferentes zonas e aplicações corporativas." },
  { slug: "quando-optar-retrofit", title: "Quando considerar um retrofit de climatização", excerpt: "Critérios para avaliar obsolescência, continuidade operacional e adequação do sistema." },
  { slug: "avaliacao-tecnica", title: "O que envolve uma avaliação técnica", excerpt: "O levantamento que antecede uma decisão segura sobre instalação, ampliação ou modernização." },
  { slug: "etapas-implantacao", title: "Etapas de implantação de um sistema VRV/VRF", excerpt: "Da compatibilização à partida: os pontos de controle de uma execução estruturada." },
] as const;

export const meta = (title: string, description: string) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});