import { RouteScrollReset } from "@/components/atoms/RouteScrollReset";
import { ContactModalProvider } from "@/components/organisms/ContactModalContext";
import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { RevealObserver } from "@/components/organisms/MotionShell";
import { WhatsAppFloat } from "@/components/organisms/WhatsAppFloat";
import type { SiteConfig } from "@/types/content";

interface SiteChromeProps {
  site: SiteConfig;
  /** When true, explicitly suppresses mounting the consultation modal (e.g. on /contacto). */
  disableContactModal?: boolean;
  /**
   * The hero's chrome polarity, when the page opens on a photograph the header
   * can float over. Omitted on every page that starts on a clean ground.
   */
  chrome?: "ink" | "canvas";
  /** The page's `<main>`, plus anything that must sit beside it. */
  children: React.ReactNode;
}

/**
 * The shell every page shares: skip link, header (contact strip + navigation),
 * the page's main content, footer, modal provider, and the reveal observer.
 *
 * It exists so the routes compose the chrome once instead of each page
 * restating the same elements in the same order. The contact strip lives inside
 * the header, so the header is the single sticky element and the hero can run
 * under both of its rows. The landing passes its measured hero polarity; the
 * projects pages leave it undefined, which keeps the header filled at every
 * scroll position.
 */
export function SiteChrome({
  site,
  disableContactModal = false,
  chrome,
  children,
}: SiteChromeProps) {
  const content = (
    <>
      <RouteScrollReset />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-canvas focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        Saltar al contenido
      </a>

      <Header site={site} chrome={chrome} />

      {children}

      <Footer site={site} />

      <WhatsAppFloat link={site.whatsapp} />

      <RevealObserver />
    </>
  );

  if (!disableContactModal && site.contactForm) {
    return (
      <ContactModalProvider
        contact={site.contactForm}
        whatsappHref={site.whatsapp.href}
      >
        {content}
      </ContactModalProvider>
    );
  }

  return content;
}
