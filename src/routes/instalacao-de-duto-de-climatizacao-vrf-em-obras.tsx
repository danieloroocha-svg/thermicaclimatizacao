import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina75 } from "@/lib/seo-keyword-page-75";

export const Route = createFileRoute("/instalacao-de-duto-de-climatizacao-vrf-em-obras")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina75),
  component: () => <SeoKeywordLanding page={pagina75} />,
});
