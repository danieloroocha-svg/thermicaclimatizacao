import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina68 } from "@/lib/seo-keyword-page-68";
export const Route = createFileRoute("/projeto-de-pressurizacao-de-escada-de-incendio")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina68),
  component: () => <SeoKeywordLanding page={pagina68} />,
});
