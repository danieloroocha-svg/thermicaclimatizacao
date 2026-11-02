import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina67 } from "@/lib/seo-keyword-page-67";
export const Route = createFileRoute("/balanceamento-de-sistemas-de-ar-condicionado")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina67),
  component: () => <SeoKeywordLanding page={pagina67} />,
});
