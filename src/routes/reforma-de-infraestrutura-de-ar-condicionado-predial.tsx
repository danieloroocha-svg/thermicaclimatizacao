import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina79 } from "@/lib/seo-keyword-page-79";

export const Route = createFileRoute("/reforma-de-infraestrutura-de-ar-condicionado-predial")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina79),
  component: () => <SeoKeywordLanding page={pagina79} />,
});
