import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina17 } from "@/lib/seo-keyword-pages-16-20";

export const Route = createFileRoute("/retrofit-de-tubulacoes-de-sistema-de-agua-gelada-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina17),
  component: () => <SeoKeywordLanding page={pagina17} />,
});
