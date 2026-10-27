import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina43 } from "@/lib/seo-keyword-pages-41-45";

export const Route = createFileRoute("/contrato-de-climatizacao-predial-para-facilities-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina43),
  component: () => <SeoKeywordLanding page={pagina43} />,
});
