import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina37 } from "@/lib/seo-keyword-pages-36-40";

export const Route = createFileRoute("/sistema-vrf-para-hospitais-e-clinicas-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina37),
  component: () => <SeoKeywordLanding page={pagina37} />,
});
