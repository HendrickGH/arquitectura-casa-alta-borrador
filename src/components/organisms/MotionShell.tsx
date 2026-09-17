"use client";

import { useEffect, useRef, useState } from "react";
import type { SceneMode } from "./gsap-scenes";

type ChromePolarity = "ink" | "canvas";

interface HeaderShellProps {
  /**
   * The hero's authored chrome polarity. When set, the header is transparent
   * over the hero and fills once the hero leaves the viewport; when omitted it
   * stays filled at every scroll position.
   *
   * Omitted today: the shipped hero has not passed the chrome-band contrast
   * gate, so the transparent state is not turned on for it (design D2/D3). It
   * is a content edit -- `home.hero.chrome` -- plus the hero shell work, and no
   * component change.
   */
  chrome?: ChromePolarity;
  /** Server-rendered logo, nav entries and CTA. Never composed here. */
  children: React.ReactNode;
}

/**
 * The single client boundary of the site.
 *
 * It owns exactly two things a server render cannot: the header's scroll state
 * and the height token the scroll padding is built from. It renders no copy, no
 * link and no image -- its children arrive as props from `Header.tsx`, so the
 * emitted header is byte-identical in content with or without this chunk.
 */
export function HeaderShell({ chrome, children }: HeaderShellProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [surface, setSurface] = useState<"hero" | "page">(
    chrome ? "hero" : "page",
  );

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // `--chrome-h` is the measured header height. A ResizeObserver keeps it
    // honest across breakpoints and reflows; the pre-hydration default in
    // globals.css is a first-paint stand-in, not a value never revisited.
    const syncHeight = () => {
      document.documentElement.style.setProperty(
        "--chrome-h",
        `${header.offsetHeight}px`,
      );
    };
    syncHeight();
    const sizeObserver = new ResizeObserver(syncHeight);
    sizeObserver.observe(header);

    // With no declared polarity there is no transparent state to switch to, so
    // no scroll observer is created and the header keeps its filled state.
    const hero = chrome ? document.getElementById("hero") : null;
    if (!hero) return () => sizeObserver.disconnect();

    // The hero intersects the shrunken root box exactly while some part of it
    // lies below the header band; when its bottom edge passes the navbar the
    // fill comes back. Geometry, not a threshold.
    const scrollObserver = new IntersectionObserver(
      ([entry]) => setSurface(entry.isIntersecting ? "hero" : "page"),
      { rootMargin: `-${header.offsetHeight}px 0px 0px 0px`, threshold: 0 },
    );
    scrollObserver.observe(hero);
    return () => {
      sizeObserver.disconnect();
      scrollObserver.disconnect();
    };
  }, [chrome]);

  return (
    <header
      ref={headerRef}
      data-surface={surface}
      data-chrome={chrome}
      className="sticky top-0 z-50 border-b backdrop-blur transition-colors duration-300"
    >
      {children}
    </header>
  );
}

interface ScrollSceneProps {
  mode: SceneMode;
  /** A server-rendered section. Nothing here hides it or gates it on JS. */
  children: React.ReactNode;
}

/**
 * Wraps a photographic section and hands it to the scroll choreography.
 *
 * It renders a plain `div` with one data attribute in the server HTML: no class
 * hides content, no inline style is written for a reveal. GSAP is imported
 * lazily inside the effect, so it never reaches the eager chunk of the routes
 * that render the header -- and the section is fully visible whether or not the
 * chunk ever arrives.
 */
export function ScrollScene({ mode, children }: ScrollSceneProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    void import("./gsap-scenes")
      .then(({ createScenes }) => {
        if (cancelled) return;
        revert = createScenes({ scope, mode });
      })
      .catch(() => {
        // A failed chunk is not a content failure: the section is already in
        // the server HTML and stays visible without its choreography.
      });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [mode]);

  return (
    <div ref={scopeRef} data-scene={mode}>
      {children}
    </div>
  );
}
