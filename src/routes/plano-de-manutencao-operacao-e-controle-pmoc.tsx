import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina52 } from "@/lib/seo-keyword-page-52";
export const Route = createFileRoute("/plano-de-manutencao-operacao-e-controle-pmoc")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina52),
  component: () => <SeoKeywordLanding page={pagina52} />,
});
