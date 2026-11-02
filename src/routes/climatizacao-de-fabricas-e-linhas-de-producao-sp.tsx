import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina83 } from "@/lib/seo-keyword-page-83";
export const Route = createFileRoute("/climatizacao-de-fabricas-e-linhas-de-producao-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina83),
  component: () => <SeoKeywordLanding page={pagina83} />,
});
