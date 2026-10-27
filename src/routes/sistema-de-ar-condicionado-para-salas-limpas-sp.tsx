import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina23 } from "@/lib/seo-keyword-pages-21-25";

export const Route = createFileRoute("/sistema-de-ar-condicionado-para-salas-limpas-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina23),
  component: () => <SeoKeywordLanding page={pagina23} />,
});
