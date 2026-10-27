import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina39 } from "@/lib/seo-keyword-pages-36-40";

export const Route = createFileRoute("/fornecedor-de-sistema-vrf-para-construtora-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina39),
  component: () => <SeoKeywordLanding page={pagina39} />,
});
