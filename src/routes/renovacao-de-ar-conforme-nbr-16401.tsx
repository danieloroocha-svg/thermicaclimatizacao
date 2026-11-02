import { createFileRoute } from "@tanstack/react-router";
import { SeoKeywordLanding, seoKeywordHead } from "@/components/seo-keyword-landing";
import { pagina57 } from "@/lib/seo-keyword-page-57";
export const Route = createFileRoute("/renovacao-de-ar-conforme-nbr-16401")({
 staticData: { sitemap: true }, head: () => seoKeywordHead(pagina57), component: () => <SeoKeywordLanding page={pagina57} />,
});
