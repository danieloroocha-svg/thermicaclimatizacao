import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina53 } from "@/lib/seo-keyword-page-53";
export const Route = createFileRoute("/lei-do-pmoc-ar-condicionado-13589")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina53),
  component: () => <SeoKeywordLanding page={pagina53} />,
});
