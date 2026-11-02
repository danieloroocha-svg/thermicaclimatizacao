import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { WhatsAppGlyph } from "@/components/whatsapp-icon";

const OPEN_WHATSAPP_EVENT = "thermica:open-whatsapp";

// The CRM form, Radix dialog and Supabase client are not fetched at initial page load.
const WhatsAppDialog = lazy(() => import("./whatsapp-dialog"));

function currentPage() {
  const title = document.title.split("|")[0]?.trim();
  const h1 = document.querySelector("h1")?.textContent?.trim();
  return { title: title || h1 || "site", url: window.location.href };
}

export function WhatsAppButton() {
  const [context, setContext] = useState<{ title: string; url: string } | null>(null);

  const openDialog = useCallback(() => {
    setContext(currentPage());
  }, []);

  // Keep the global CTAs on SEO pages and the floating button working identically.
  useEffect(() => {
    window.addEventListener(OPEN_WHATSAPP_EVENT, openDialog);
    return () => window.removeEventListener(OPEN_WHATSAPP_EVENT, openDialog);
  }, [openDialog]);

  return (
    <>
      <button type="button" onClick={openDialog} aria-label="Falar com nossa equipe pelo WhatsApp" className="group wa-fab">
        <span className="wa-fab-label" aria-hidden="true">
          <span className="block whitespace-nowrap pr-3 text-sm font-semibold">Falar com nossa equipe</span>
        </span>
        <span className="relative flex shrink-0 items-center justify-center">
          <span className="wa-fab-halo" aria-hidden="true" />
          <WhatsAppGlyph className="relative size-8 sm:size-9" />
        </span>
      </button>
      {context && (
        <Suspense fallback={null}>
          <WhatsAppDialog
            page={context.title}
            pageUrl={context.url}
            onOpenChange={(open) => { if (!open) setContext(null); }}
          />
        </Suspense>
      )}
    </>
  );
}
