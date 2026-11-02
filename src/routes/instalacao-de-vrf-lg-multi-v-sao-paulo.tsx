import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina77 } from "@/lib/seo-keyword-page-77";

export const Route = createFileRoute("/instalacao-de-vrf-lg-multi-v-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina77),
  component: () => <SeoKeywordLanding page={pagina77} />,
});
