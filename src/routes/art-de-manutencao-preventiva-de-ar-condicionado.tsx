import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina96 } from "@/lib/seo-keyword-page-96";
export const Route = createFileRoute("/art-de-manutencao-preventiva-de-ar-condicionado")({ staticData: { sitemap: true }, head: () => seoKeywordHead(pagina96), component: () => <SeoKeywordLanding page={pagina96} /> });
