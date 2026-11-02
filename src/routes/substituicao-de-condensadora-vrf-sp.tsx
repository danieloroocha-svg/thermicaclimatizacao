import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina90 } from "@/lib/seo-keyword-page-90";
export const Route = createFileRoute("/substituicao-de-condensadora-vrf-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina90),
  component: () => <SeoKeywordLanding page={pagina90} />,
});
