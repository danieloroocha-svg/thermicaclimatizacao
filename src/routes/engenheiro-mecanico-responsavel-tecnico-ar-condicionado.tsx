import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina58 } from "@/lib/seo-keyword-page-58";
export const Route = createFileRoute("/engenheiro-mecanico-responsavel-tecnico-ar-condicionado")({
 staticData: { sitemap: true }, head: () => seoKeywordHead(pagina58), component: () => <SeoKeywordLanding page={pagina58} />,
});
