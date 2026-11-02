import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina88 } from "@/lib/seo-keyword-page-88";
export const Route = createFileRoute("/comissionamento-de-sistema-vrf-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina88),
  component: () => <SeoKeywordLanding page={pagina88} />,
});
