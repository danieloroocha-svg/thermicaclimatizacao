import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina16 } from "@/lib/seo-keyword-pages-16-20";

export const Route = createFileRoute("/empresa-de-retrofit-de-climatizacao-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina16),
  component: () => <SeoKeywordLanding page={pagina16} />,
});
