import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina73 } from "@/lib/seo-keyword-page-73";

export const Route = createFileRoute("/instalacao-de-tubulacao-frigorifera-vrf-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina73),
  component: () => <SeoKeywordLanding page={pagina73} />,
});
