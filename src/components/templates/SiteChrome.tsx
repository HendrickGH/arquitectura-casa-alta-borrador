import { Footer } from "@/components/organisms/Footer";
import { Header } from "@/components/organisms/Header";
import { RevealObserver } from "@/components/organisms/MotionShell";
import type { SiteConfig } from "@/types/content";

interface SiteChromeProps {
  site: SiteConfig;
  /** The page's `<main>`, plus anything that must sit beside it. */
  children: React.ReactNode;
}

/**
 * The shell every page shares: skip link, header (contact strip + navigation),
 * the page's main content, footer and the reveal observer.
 *
 * It exists so the routes compose the chrome once instead of each page
 * restating the same elements in the same order. The contact strip lives inside
 * the header, so the header is the single sticky element.
 */
export function SiteChrome({ site, children }: SiteChromeProps) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-canvas focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        Saltar al contenido
      </a>

      <Header site={site} />

      {children}

      <Footer site={site} />

      <RevealObserver />
    </>
  );
}
