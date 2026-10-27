import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina11 } from "@/lib/seo-keyword-pages-11-15";

export const Route = createFileRoute("/instalacao-de-ar-condicionado-hospitalar-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina11),
  component: () => <SeoKeywordLanding page={pagina11} />,
});
