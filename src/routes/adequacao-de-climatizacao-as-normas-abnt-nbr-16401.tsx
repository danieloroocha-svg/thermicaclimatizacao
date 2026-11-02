import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina87 } from "@/lib/seo-keyword-page-87";
export const Route = createFileRoute("/adequacao-de-climatizacao-as-normas-abnt-nbr-16401")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina87),
  component: () => <SeoKeywordLanding page={pagina87} />,
});
