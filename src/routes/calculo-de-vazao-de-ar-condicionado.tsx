import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina60 } from "@/lib/seo-keyword-page-60";
export const Route = createFileRoute("/calculo-de-vazao-de-ar-condicionado")({
 staticData: { sitemap: true }, head: () => seoKeywordHead(pagina60), component: () => <SeoKeywordLanding page={pagina60} />,
});
