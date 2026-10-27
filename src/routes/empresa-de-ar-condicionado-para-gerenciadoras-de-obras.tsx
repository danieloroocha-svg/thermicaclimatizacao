import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina45 } from "@/lib/seo-keyword-pages-41-45";

export const Route = createFileRoute("/empresa-de-ar-condicionado-para-gerenciadoras-de-obras")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina45),
  component: () => <SeoKeywordLanding page={pagina45} />,
});
