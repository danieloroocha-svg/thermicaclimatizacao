import { createFileRoute } from "@tanstack/react-router";
import { seoSiteEntries } from "@/lib/seo-site-directory";
import { articles, BASE_URL, projects } from "@/lib/site-data";
import { sitemapXML, type SitemapEntry } from "@/lib/sitemap";

/**
 * Sitemap público da THÉRMICA.
 *
 * A lista é deliberadamente independente de getRouterInstance(). A função
 * anterior dependia da geração e resolução de todas as rotas em tempo de
 * requisição; se essa resolução falhasse, o buscador receberia um erro HTTP.
 *
 * O arquivo equivalente em public/sitemap.xml atende hospedagens estáticas.
 * Ao acrescentar páginas fora do diretório SEO, atualizar institutionalPaths.
 */
const institutionalPaths = [
  "/",
  "/empresa",
  "/obras",
  "/conteudo",
  "/contato",
  "/qualificacao-tecnica",
  "/sistemas-vrv-vrf",
  "/instalacao-vrv-vrf",
  "/retrofit-vrv-vrf",
  "/mapa-site",
] as const;

function sitemapEntries(): SitemapEntry[] {
  const paths = [
    ...institutionalPaths,
    ...seoSiteEntries.map((page) => page.path),
    ...projects.map((project) => `/obras/${project.slug}`),
    ...articles.map((article) => `/conteudo/${article.slug}`),
  ];

  const uniquePaths = [...new Set(paths)];
  return uniquePaths.map((path) => ({ path }));
}

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const body = sitemapXML(BASE_URL, sitemapEntries());
        return new Response(body, {
          status: 200,
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=300",
            "X-Content-Type-Options": "nosniff",
          },
        });
      },
    },
  },
});
