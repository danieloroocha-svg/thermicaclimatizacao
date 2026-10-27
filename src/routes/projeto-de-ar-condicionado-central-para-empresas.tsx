import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina03 } from "@/lib/seo-keyword-pages";

export const Route = createFileRoute("/projeto-de-ar-condicionado-central-para-empresas")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina03),
  component: () => <SeoKeywordLanding page={pagina03} />,
});
