import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina27 } from "@/lib/seo-keyword-pages-26-30";

export const Route = createFileRoute("/retrofit-de-chiller-para-vrf")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina27),
  component: () => <SeoKeywordLanding page={pagina27} />,
});
