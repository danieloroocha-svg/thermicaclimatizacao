import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina18 } from "@/lib/seo-keyword-pages-16-20";

export const Route = createFileRoute("/empresa-de-projetos-de-hvac-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina18),
  component: () => <SeoKeywordLanding page={pagina18} />,
});
