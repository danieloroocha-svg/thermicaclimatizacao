import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina56 } from "@/lib/seo-keyword-page-56";
export const Route = createFileRoute("/sistema-de-exaustao-mecanica-industrial")({
 staticData: { sitemap: true }, head: () => seoKeywordHead(pagina56), component: () => <SeoKeywordLanding page={pagina56} />,
});
