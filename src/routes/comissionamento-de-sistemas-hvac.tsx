import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina65 } from "@/lib/seo-keyword-page-65";
export const Route = createFileRoute("/comissionamento-de-sistemas-hvac")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina65),
  component: () => <SeoKeywordLanding page={pagina65} />,
});
