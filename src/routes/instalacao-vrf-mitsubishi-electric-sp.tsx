import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina15 } from "@/lib/seo-keyword-pages-11-15";

export const Route = createFileRoute("/instalacao-vrf-mitsubishi-electric-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina15),
  component: () => <SeoKeywordLanding page={pagina15} />,
});
