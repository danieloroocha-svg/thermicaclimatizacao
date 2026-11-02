import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina76 } from "@/lib/seo-keyword-page-76";

export const Route = createFileRoute("/instalacao-de-ar-condicionado-vrf-fujitsu-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina76),
  component: () => <SeoKeywordLanding page={pagina76} />,
});
