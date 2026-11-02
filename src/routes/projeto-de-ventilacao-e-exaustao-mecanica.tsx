import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina59 } from "@/lib/seo-keyword-page-59";
export const Route = createFileRoute("/projeto-de-ventilacao-e-exaustao-mecanica")({
 staticData: { sitemap: true }, head: () => seoKeywordHead(pagina59), component: () => <SeoKeywordLanding page={pagina59} />,
});
