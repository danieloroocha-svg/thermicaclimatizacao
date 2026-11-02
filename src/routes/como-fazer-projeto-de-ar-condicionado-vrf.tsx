import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina62 } from "@/lib/seo-keyword-page-62";
export const Route = createFileRoute("/como-fazer-projeto-de-ar-condicionado-vrf")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina62),
  component: () => <SeoKeywordLanding page={pagina62} />,
});
