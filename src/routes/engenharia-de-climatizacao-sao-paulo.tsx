import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina50 } from "@/lib/seo-keyword-pages-46-50";

export const Route = createFileRoute("/engenharia-de-climatizacao-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina50),
  component: () => <SeoKeywordLanding page={pagina50} />,
});
