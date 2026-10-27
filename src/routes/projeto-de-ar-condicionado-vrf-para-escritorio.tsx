import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina08 } from "@/lib/seo-keyword-pages-06-10";

export const Route = createFileRoute("/projeto-de-ar-condicionado-vrf-para-escritorio")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina08),
  component: () => <SeoKeywordLanding page={pagina08} />,
});
