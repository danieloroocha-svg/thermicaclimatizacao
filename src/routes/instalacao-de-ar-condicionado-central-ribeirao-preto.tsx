import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina71 } from "@/lib/seo-keyword-page-71";

export const Route = createFileRoute("/instalacao-de-ar-condicionado-central-ribeirao-preto")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina71),
  component: () => <SeoKeywordLanding page={pagina71} />,
});
