import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina63 } from "@/lib/seo-keyword-page-63";
export const Route = createFileRoute("/laudo-tecnico-de-ar-condicionado-crea")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina63),
  component: () => <SeoKeywordLanding page={pagina63} />,
});
