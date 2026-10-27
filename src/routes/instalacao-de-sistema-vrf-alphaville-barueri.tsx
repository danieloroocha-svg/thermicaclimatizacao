import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina38 } from "@/lib/seo-keyword-pages-36-40";

export const Route = createFileRoute("/instalacao-de-sistema-vrf-alphaville-barueri")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina38),
  component: () => <SeoKeywordLanding page={pagina38} />,
});
