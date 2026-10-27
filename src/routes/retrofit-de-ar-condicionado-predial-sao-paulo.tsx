import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina06 } from "@/lib/seo-keyword-pages-06-10";

export const Route = createFileRoute("/retrofit-de-ar-condicionado-predial-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina06),
  component: () => <SeoKeywordLanding page={pagina06} />,
});
