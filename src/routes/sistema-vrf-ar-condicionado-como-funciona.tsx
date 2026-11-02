import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina54 } from "@/lib/seo-keyword-page-54";
export const Route = createFileRoute("/sistema-vrf-ar-condicionado-como-funciona")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina54),
  component: () => <SeoKeywordLanding page={pagina54} />,
});
