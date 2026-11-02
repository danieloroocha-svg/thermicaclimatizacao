import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina64 } from "@/lib/seo-keyword-page-64";
export const Route = createFileRoute("/projeto-de-climatizacao-industrial-galpao")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina64),
  component: () => <SeoKeywordLanding page={pagina64} />,
});
