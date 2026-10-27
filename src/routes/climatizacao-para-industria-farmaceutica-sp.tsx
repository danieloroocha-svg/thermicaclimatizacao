import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina36 } from "@/lib/seo-keyword-pages-36-40";

export const Route = createFileRoute("/climatizacao-para-industria-farmaceutica-sp")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina36),
  component: () => <SeoKeywordLanding page={pagina36} />,
});
