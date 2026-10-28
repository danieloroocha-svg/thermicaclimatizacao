import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina47 } from "@/lib/seo-keyword-pages-46-50";

export const Route = createFileRoute("/empresa-de-ar-condicionado-homologada-suprimentos")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina47),
  component: () => <SeoKeywordLanding page={pagina47} />,
});
