import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina70 } from "@/lib/seo-keyword-page-70";
export const Route = createFileRoute("/balanceamento-hidraulico-hvac-agua-gelada")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina70),
  component: () => <SeoKeywordLanding page={pagina70} />,
});
