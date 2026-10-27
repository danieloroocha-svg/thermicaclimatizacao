import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina13 } from "@/lib/seo-keyword-pages-11-15";

export const Route = createFileRoute("/empresa-instaladora-de-vrf-sao-paulo")({
  staticData: { sitemap: true },
  head: () => seoKeywordHead(pagina13),
  component: () => <SeoKeywordLanding page={pagina13} />,
});
