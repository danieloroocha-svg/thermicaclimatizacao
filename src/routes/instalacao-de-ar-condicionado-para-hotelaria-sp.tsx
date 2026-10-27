import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina35 } from "@/lib/seo-keyword-pages-31-35";

export const Route = createFileRoute("/instalacao-de-ar-condicionado-para-hotelaria-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina35),
  component: () => <SeoKeywordLanding page={pagina35} />,
});
