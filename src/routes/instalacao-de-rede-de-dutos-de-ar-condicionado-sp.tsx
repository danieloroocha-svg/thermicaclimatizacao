import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina72 } from "@/lib/seo-keyword-page-72";

export const Route = createFileRoute("/instalacao-de-rede-de-dutos-de-ar-condicionado-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina72),
  component: () => <SeoKeywordLanding page={pagina72} />,
});
