import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina32 } from "@/lib/seo-keyword-pages-31-35";

export const Route = createFileRoute("/subempreiteira-de-ar-condicionado-para-obras")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina32),
  component: () => <SeoKeywordLanding page={pagina32} />,
});
