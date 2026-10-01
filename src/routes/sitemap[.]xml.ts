import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import {
  isSitemapRouteIncluded,
  sitemapPathForLocation,
  sitemapStaticPaths,
  sitemapXML,
  type SitemapEntry,
} from "@/lib/sitemap";
import { articles, projects, BASE_URL } from "@/lib/site-data";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        const obrasRouteId = "/obras/$slug";
        if (isSitemapRouteIncluded(router.routesById[obrasRouteId])) {
          for (const project of projects) {
            const location = router.buildLocation({
              to: "/obras/$slug",
              params: { slug: project.slug },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, obrasRouteId);
            if (path) entries.push({ path });
          }
        }

        const conteudoRouteId = "/conteudo/$slug";
        if (isSitemapRouteIncluded(router.routesById[conteudoRouteId])) {
          for (const article of articles) {
            const location = router.buildLocation({
              to: "/conteudo/$slug",
              params: { slug: article.slug },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, location, conteudoRouteId);
            if (path) entries.push({ path });
          }
        }

        if (entries.length === 0) {
          return new Response("No pages are included in this sitemap.", {
            status: 404,
            headers: { "Cache-Control": "no-store" },
          });
        }

        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
