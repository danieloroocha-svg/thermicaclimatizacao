import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina14 } from "@/lib/seo-keyword-pages-11-15";

export const Route = createFileRoute("/sistema-vrf-para-edificios-corporativos-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina14),
  component: () => <SeoKeywordLanding page={pagina14} />,
});
