import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina24 } from "@/lib/seo-keyword-pages-21-25";

export const Route = createFileRoute("/ar-condicionado-para-laboratorios-e-areas-limpas")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina24),
  component: () => <SeoKeywordLanding page={pagina24} />,
});
