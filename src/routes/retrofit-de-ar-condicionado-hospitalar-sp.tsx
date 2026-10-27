import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina40 } from "@/lib/seo-keyword-pages-36-40";

export const Route = createFileRoute("/retrofit-de-ar-condicionado-hospitalar-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina40),
  component: () => <SeoKeywordLanding page={pagina40} />,
});
