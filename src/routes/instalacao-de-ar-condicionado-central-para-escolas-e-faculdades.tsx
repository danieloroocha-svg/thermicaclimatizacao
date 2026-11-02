import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina84 } from "@/lib/seo-keyword-page-84";
export const Route = createFileRoute("/instalacao-de-ar-condicionado-central-para-escolas-e-faculdades")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina84),
  component: () => <SeoKeywordLanding page={pagina84} />,
});
