import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina42 } from "@/lib/seo-keyword-pages-41-45";

export const Route = createFileRoute("/compatibilizacao-bim-projetos-de-climatizacao-vrf")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina42),
  component: () => <SeoKeywordLanding page={pagina42} />,
});
