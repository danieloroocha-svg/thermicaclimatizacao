import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina41 } from "@/lib/seo-keyword-pages-41-45";

export const Route = createFileRoute("/modernizacao-de-central-de-agua-gelada-cag-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina41),
  component: () => <SeoKeywordLanding page={pagina41} />,
});
