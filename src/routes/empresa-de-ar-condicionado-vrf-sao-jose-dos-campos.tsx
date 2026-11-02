import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina86 } from "@/lib/seo-keyword-page-86";
export const Route = createFileRoute("/empresa-de-ar-condicionado-vrf-sao-jose-dos-campos")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina86),
  component: () => <SeoKeywordLanding page={pagina86} />,
});
