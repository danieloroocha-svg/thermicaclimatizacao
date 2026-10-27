import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina20 } from "@/lib/seo-keyword-pages-16-20";

export const Route = createFileRoute("/instalacao-de-ar-condicionado-para-construtora")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina20),
  component: () => <SeoKeywordLanding page={pagina20} />,
});
