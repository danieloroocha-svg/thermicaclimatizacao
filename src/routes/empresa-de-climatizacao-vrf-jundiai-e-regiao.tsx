import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina89 } from "@/lib/seo-keyword-page-89";
export const Route = createFileRoute("/empresa-de-climatizacao-vrf-jundiai-e-regiao")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina89),
  component: () => <SeoKeywordLanding page={pagina89} />,
});
