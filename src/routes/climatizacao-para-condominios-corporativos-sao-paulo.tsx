import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina34 } from "@/lib/seo-keyword-pages-31-35";

export const Route = createFileRoute("/climatizacao-para-condominios-corporativos-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina34),
  component: () => <SeoKeywordLanding page={pagina34} />,
});
