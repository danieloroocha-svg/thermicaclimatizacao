import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina46 } from "@/lib/seo-keyword-pages-46-50";

export const Route = createFileRoute("/automacao-de-sistema-vrf-bms-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina46),
  component: () => <SeoKeywordLanding page={pagina46} />,
});
