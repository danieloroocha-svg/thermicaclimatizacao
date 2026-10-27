import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina09 } from "@/lib/seo-keyword-pages-06-10";

export const Route = createFileRoute("/empresa-de-climatizacao-para-construtoras-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina09),
  component: () => <SeoKeywordLanding page={pagina09} />,
});
