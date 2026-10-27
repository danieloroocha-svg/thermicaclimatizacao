import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina05 } from "@/lib/seo-keyword-pages";

export const Route = createFileRoute("/instalacao-de-ar-condicionado-vrf-campinas")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina05),
  component: () => <SeoKeywordLanding page={pagina05} />,
});
