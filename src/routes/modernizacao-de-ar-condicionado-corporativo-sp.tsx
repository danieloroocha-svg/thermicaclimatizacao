import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina28 } from "@/lib/seo-keyword-pages-26-30";

export const Route = createFileRoute("/modernizacao-de-ar-condicionado-corporativo-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina28),
  component: () => <SeoKeywordLanding page={pagina28} />,
});
