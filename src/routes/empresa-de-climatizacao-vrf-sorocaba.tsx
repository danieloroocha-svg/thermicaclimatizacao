import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina85 } from "@/lib/seo-keyword-page-85";
export const Route = createFileRoute("/empresa-de-climatizacao-vrf-sorocaba")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina85),
  component: () => <SeoKeywordLanding page={pagina85} />,
});
