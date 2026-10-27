import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina04 } from "@/lib/seo-keyword-pages";

export const Route = createFileRoute("/instalacao-de-vrv-comercial-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina04),
  component: () => <SeoKeywordLanding page={pagina04} />,
});
