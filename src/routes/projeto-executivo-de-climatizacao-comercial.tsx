import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina07 } from "@/lib/seo-keyword-pages-06-10";

export const Route = createFileRoute("/projeto-executivo-de-climatizacao-comercial")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina07),
  component: () => <SeoKeywordLanding page={pagina07} />,
});
