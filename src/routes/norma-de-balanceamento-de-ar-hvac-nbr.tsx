import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina100 } from "@/lib/seo-keyword-page-100";
export const Route = createFileRoute("/norma-de-balanceamento-de-ar-hvac-nbr")({ staticData: { sitemap: true }, head: () => seoKeywordHead(pagina100), component: () => <SeoKeywordLanding page={pagina100} /> });
