import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina92 } from "@/lib/seo-keyword-page-92";
export const Route = createFileRoute("/relatorio-de-comissionamento-de-ar-condicionado")({ staticData: { sitemap: true }, head: () => seoKeywordHead(pagina92), component: () => <SeoKeywordLanding page={pagina92} /> });
