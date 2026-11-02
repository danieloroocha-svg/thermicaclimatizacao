import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina82 } from "@/lib/seo-keyword-page-82";
export const Route = createFileRoute("/empresa-de-manutencao-e-operacao-de-climatizacao-predial")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina82),
  component: () => <SeoKeywordLanding page={pagina82} />,
});
