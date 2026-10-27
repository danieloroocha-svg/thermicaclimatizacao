import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina33 } from "@/lib/seo-keyword-pages-31-35";

export const Route = createFileRoute("/empresa-de-climatizacao-para-shopping-centers-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina33),
  component: () => <SeoKeywordLanding page={pagina33} />,
});
