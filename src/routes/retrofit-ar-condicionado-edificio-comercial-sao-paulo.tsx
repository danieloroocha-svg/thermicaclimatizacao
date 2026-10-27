import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina29 } from "@/lib/seo-keyword-pages-26-30";

export const Route = createFileRoute("/retrofit-ar-condicionado-edificio-comercial-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina29),
  component: () => <SeoKeywordLanding page={pagina29} />,
});
