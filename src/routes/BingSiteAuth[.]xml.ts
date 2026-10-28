import { createFileRoute } from "@tanstack/react-router";

// Caminho alternativo ao arquivo estático public/BingSiteAuth.xml.
// Mantém a verificação XML disponível em implantações com servidor TanStack Start.
const bingOwnershipXml = '<?xml version="1.0"?>\n<users>\n\t<user>D228FB1E04A598DD381DF3D488F05462</user>\n</users>\n';

export const Route = createFileRoute("/BingSiteAuth.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => new Response(bingOwnershipXml, {
        status: 200,
        headers: {
          "Content-Type": "application/xml; charset=utf-8",
          "Cache-Control": "public, max-age=300",
          "X-Content-Type-Options": "nosniff",
        },
      }),
    },
  },
});
