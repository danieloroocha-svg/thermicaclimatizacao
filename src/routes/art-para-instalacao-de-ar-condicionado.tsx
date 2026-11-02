import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina55 } from "@/lib/seo-keyword-page-55";
export const Route = createFileRoute("/art-para-instalacao-de-ar-condicionado")({
 staticData: { sitemap: true }, head: () => seoKeywordHead(pagina55), component: () => <SeoKeywordLanding page={pagina55} />,
});
