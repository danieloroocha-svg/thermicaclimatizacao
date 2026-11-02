import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina94 } from "@/lib/seo-keyword-page-94";
export const Route = createFileRoute("/projeto-de-exaustao-de-coifa-industrial-lanchonete")({ staticData: { sitemap: true }, head: () => seoKeywordHead(pagina94), component: () => <SeoKeywordLanding page={pagina94} /> });
