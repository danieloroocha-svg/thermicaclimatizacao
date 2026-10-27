import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina30 } from "@/lib/seo-keyword-pages-26-30";

export const Route = createFileRoute("/empresa-de-engenharia-termica-e-climatizacao-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina30),
  component: () => <SeoKeywordLanding page={pagina30} />,
});
