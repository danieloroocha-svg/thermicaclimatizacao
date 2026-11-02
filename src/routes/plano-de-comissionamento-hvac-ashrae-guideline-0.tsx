import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina98 } from "@/lib/seo-keyword-page-98";
export const Route = createFileRoute("/plano-de-comissionamento-hvac-ashrae-guideline-0")({ staticData: { sitemap: true }, head: () => seoKeywordHead(pagina98), component: () => <SeoKeywordLanding page={pagina98} /> });
