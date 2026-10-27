import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina44 } from "@/lib/seo-keyword-pages-41-45";

export const Route = createFileRoute("/gestao-de-obras-de-climatizacao-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina44),
  component: () => <SeoKeywordLanding page={pagina44} />,
});
