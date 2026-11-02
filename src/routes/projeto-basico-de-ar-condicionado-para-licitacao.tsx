import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina93 } from "@/lib/seo-keyword-page-93";
export const Route = createFileRoute("/projeto-basico-de-ar-condicionado-para-licitacao")({ staticData: { sitemap: true }, head: () => seoKeywordHead(pagina93), component: () => <SeoKeywordLanding page={pagina93} /> });
