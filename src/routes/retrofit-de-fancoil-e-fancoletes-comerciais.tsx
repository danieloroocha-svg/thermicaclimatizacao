import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina78 } from "@/lib/seo-keyword-page-78";

export const Route = createFileRoute("/retrofit-de-fancoil-e-fancoletes-comerciais")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina78),
  component: () => <SeoKeywordLanding page={pagina78} />,
});
