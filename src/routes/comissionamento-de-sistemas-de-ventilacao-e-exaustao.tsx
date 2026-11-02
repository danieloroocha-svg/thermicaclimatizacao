import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina91 } from "@/lib/seo-keyword-page-91";
export const Route = createFileRoute("/comissionamento-de-sistemas-de-ventilacao-e-exaustao")({ staticData: { sitemap: true }, head: () => seoKeywordHead(pagina91), component: () => <SeoKeywordLanding page={pagina91} /> });
