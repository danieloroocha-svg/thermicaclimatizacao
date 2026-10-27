import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina02 } from "@/lib/seo-keyword-pages";

export const Route = createFileRoute("/modernizacao-de-sistema-de-climatizacao-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina02),
  component: () => <SeoKeywordLanding page={pagina02} />,
});
