import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina99 } from "@/lib/seo-keyword-page-99";
export const Route = createFileRoute("/dimensionamento-de-dutos-de-ar-nbr-16401")({ staticData: { sitemap: true }, head: () => seoKeywordHead(pagina99), component: () => <SeoKeywordLanding page={pagina99} /> });
