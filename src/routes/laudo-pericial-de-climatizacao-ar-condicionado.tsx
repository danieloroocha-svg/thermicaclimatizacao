import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina95 } from "@/lib/seo-keyword-page-95";
export const Route = createFileRoute("/laudo-pericial-de-climatizacao-ar-condicionado")({ staticData: { sitemap: true }, head: () => seoKeywordHead(pagina95), component: () => <SeoKeywordLanding page={pagina95} /> });
