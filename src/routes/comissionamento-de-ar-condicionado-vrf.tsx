import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina69 } from "@/lib/seo-keyword-page-69";
export const Route = createFileRoute("/comissionamento-de-ar-condicionado-vrf")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina69),
  component: () => <SeoKeywordLanding page={pagina69} />,
});
