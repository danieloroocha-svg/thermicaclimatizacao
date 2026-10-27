import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina25 } from "@/lib/seo-keyword-pages-21-25";

export const Route = createFileRoute("/climatizacao-para-supermercados-e-atacarejos-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina25),
  component: () => <SeoKeywordLanding page={pagina25} />,
});
