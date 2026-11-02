import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina80 } from "@/lib/seo-keyword-page-80";

export const Route = createFileRoute("/consultoria-em-engenharia-de-climatizacao-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina80),
  component: () => <SeoKeywordLanding page={pagina80} />,
});
