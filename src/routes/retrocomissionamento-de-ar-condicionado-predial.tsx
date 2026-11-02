import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina97 } from "@/lib/seo-keyword-page-97";
export const Route = createFileRoute("/retrocomissionamento-de-ar-condicionado-predial")({ staticData: { sitemap: true }, head: () => seoKeywordHead(pagina97), component: () => <SeoKeywordLanding page={pagina97} /> });
