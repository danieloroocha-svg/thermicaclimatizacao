import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina48 } from "@/lib/seo-keyword-pages-46-50";

export const Route = createFileRoute("/retrofit-de-ar-condicionado-central-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina48),
  component: () => <SeoKeywordLanding page={pagina48} />,
});
