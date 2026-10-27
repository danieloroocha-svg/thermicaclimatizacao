import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina19 } from "@/lib/seo-keyword-pages-16-20";

export const Route = createFileRoute("/projeto-de-climatizacao-com-art-crea-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina19),
  component: () => <SeoKeywordLanding page={pagina19} />,
});
