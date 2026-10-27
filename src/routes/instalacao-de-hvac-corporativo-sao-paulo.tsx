import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina21 } from "@/lib/seo-keyword-pages-21-25";

export const Route = createFileRoute("/instalacao-de-hvac-corporativo-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina21),
  component: () => <SeoKeywordLanding page={pagina21} />,
});
