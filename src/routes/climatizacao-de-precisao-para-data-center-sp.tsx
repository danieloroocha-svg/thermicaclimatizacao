import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina22 } from "@/lib/seo-keyword-pages-21-25";

export const Route = createFileRoute("/climatizacao-de-precisao-para-data-center-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina22),
  component: () => <SeoKeywordLanding page={pagina22} />,
});
