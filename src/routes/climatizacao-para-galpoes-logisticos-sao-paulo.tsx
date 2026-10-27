import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina10 } from "@/lib/seo-keyword-pages-06-10";

export const Route = createFileRoute("/climatizacao-para-galpoes-logisticos-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina10),
  component: () => <SeoKeywordLanding page={pagina10} />,
});
