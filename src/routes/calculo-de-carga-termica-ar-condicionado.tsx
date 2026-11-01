import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina51 } from "@/lib/seo-keyword-page-51";

export const Route = createFileRoute("/calculo-de-carga-termica-ar-condicionado")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina51),
  component: () => <SeoKeywordLanding page={pagina51} />,
});
