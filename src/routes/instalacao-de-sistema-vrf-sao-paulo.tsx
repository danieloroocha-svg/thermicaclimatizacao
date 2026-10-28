import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina49 } from "@/lib/seo-keyword-pages-46-50";

export const Route = createFileRoute("/instalacao-de-sistema-vrf-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina49),
  component: () => <SeoKeywordLanding page={pagina49} />,
});
