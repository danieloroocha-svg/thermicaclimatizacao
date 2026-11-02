import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina66 } from "@/lib/seo-keyword-page-66";
export const Route = createFileRoute("/responsabilidade-tecnica-manutencao-ar-condicionado-crea")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina66),
  component: () => <SeoKeywordLanding page={pagina66} />,
});
