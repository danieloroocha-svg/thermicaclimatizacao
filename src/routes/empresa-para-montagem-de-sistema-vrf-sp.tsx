import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina74 } from "@/lib/seo-keyword-page-74";

export const Route = createFileRoute("/empresa-para-montagem-de-sistema-vrf-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina74),
  component: () => <SeoKeywordLanding page={pagina74} />,
});
