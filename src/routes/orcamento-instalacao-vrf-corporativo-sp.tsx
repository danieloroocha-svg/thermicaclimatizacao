import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina26 } from "@/lib/seo-keyword-pages-26-30";

export const Route = createFileRoute("/orcamento-instalacao-vrf-corporativo-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina26),
  component: () => <SeoKeywordLanding page={pagina26} />,
});
