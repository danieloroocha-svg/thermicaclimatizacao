import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina61 } from "@/lib/seo-keyword-page-61";
export const Route = createFileRoute("/pmoc-ar-condicionado-valor-por-maquina")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina61),
  component: () => <SeoKeywordLanding page={pagina61} />,
});
