import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina81 } from "@/lib/seo-keyword-page-81";
export const Route = createFileRoute("/empresa-de-climatizacao-para-retrofit-comercial")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina81),
  component: () => <SeoKeywordLanding page={pagina81} />,
});
