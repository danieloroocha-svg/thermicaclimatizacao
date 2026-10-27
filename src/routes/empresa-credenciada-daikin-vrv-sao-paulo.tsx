import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina12 } from "@/lib/seo-keyword-pages-11-15";

export const Route = createFileRoute("/empresa-credenciada-daikin-vrv-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina12),
  component: () => <SeoKeywordLanding page={pagina12} />,
});
