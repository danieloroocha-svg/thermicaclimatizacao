import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina31 } from "@/lib/seo-keyword-pages-31-35";

export const Route = createFileRoute("/projeto-avac-edificios-comerciais-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina31),
  component: () => <SeoKeywordLanding page={pagina31} />,
});
