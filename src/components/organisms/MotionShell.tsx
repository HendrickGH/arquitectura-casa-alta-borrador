"use client";

import { useEffect, useRef, useState } from "react";
import type { SceneMode } from "./gsap-scenes";

type ChromePolarity = "ink" | "canvas";

interface HeaderShellProps {
  /**
   * The hero's chrome polarity. When set, the header is transparent over the
   * hero and turns white once the hero leaves the viewport; when omitted it
   * stays white at every scroll position.
   */
  chrome?: ChromePolarity;
  /** Server-rendered logo, nav entries and CTA. Never composed here. */
  children: React.ReactNode;
}

/**
 * The single client boundary of the site.
 *
 * It owns the header's scroll behaviour: transparent over the hero, white past
 * it, sliding out of the way on the way down and back on the way up. It owns no
 * copy, link or image -- its children arrive as props from `Header.tsx`, so the
 * emitted header is byte-identical in content with or without this chunk.
 */
export function HeaderShell({ chrome, children }: HeaderShellProps) {
  const headerRef = useRef<HTMLElement>(null);
  const [surface, setSurface] = useState<"hero" | "page">(
    chrome ? "hero" : "page",
  );
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // `--chrome-h` is the measured header height; it feeds the hero's overlap
    // and the global scroll padding.
    const syncHeight = () => {
      document.documentElement.style.setProperty(
        "--chrome-h",
        `${header.offsetHeight}px`,
      );
    };
    syncHeight();
    const sizeObserver = new ResizeObserver(syncHeight);
    sizeObserver.observe(header);

    // Transparent only while the page is still at its very top, where the hero's
    // dark top gradient sits under the navbar; white from the first scroll on.
    //
    // A transparent navbar held for the whole hero was measured unreadable: once
    // the page scrolls, the navbar band lands on the bright middle of the
    // photograph (~2:1 for white). The two options were a uniformly dark hero or
    // a transparent state confined to the top; the top-only rule keeps the
    // photograph brighter and still gives the requested transparent start.
    const TOP = 16;

    // Hide on the way down, reveal on the way up; always shown at the top and
    // whenever the header itself holds focus. Reduced motion keeps it put --
    // the state changes, the slide does not happen.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lastY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        if (chrome) setSurface(y <= TOP ? "hero" : "page");
        if (reduce.matches || y <= 8) setVisible(true);
        else if (y > lastY + 6) setVisible(false);
        else if (y < lastY - 6) setVisible(true);
        lastY = y;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const onFocusIn = () => setVisible(true);
    header.addEventListener("focusin", onFocusIn);

    return () => {
      sizeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      header.removeEventListener("focusin", onFocusIn);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [chrome]);

  return (
    <header
      ref={headerRef}
      data-surface={surface}
      data-chrome={chrome}
      data-visible={visible ? "true" : "false"}
      className="sticky top-0 z-50 border-b backdrop-blur"
    >
      {children}
    </header>
  );
}

/**
 * Reveals every `[data-reveal]` section once its top crosses the fold line.
 *
 * The server HTML carries `data-reveal="idle"`, which is fully visible: with no
 * JavaScript everything renders. This only adds the start state to elements the
 * visitor cannot see yet, so nothing that is already on screen is hidden and
 * nothing flashes. The animation itself is a CSS transition; this only flips the
 * attribute.
 *
 * WHY A SCROLL PASS AND NOT AN IntersectionObserver. An observer reports an
 * element only when it *intersects* the viewport. Any jump -- an in-page anchor
 * (`/#proyectos`), the End key, a fast wheel, a restored scroll position -- skips
 * elements entirely, and those never intersect again while they sit above the
 * viewport, so an observer leaves them hidden permanently. Measured with
 * Playwright: a jump to the bottom left 11 of 12 sections at `opacity: 0`, above
 * the fold, unreachable. The pass below reveals anything whose top has crossed
 * the line, whether it was scrolled through or jumped over.
 *
 * Reduced motion gets no hidden state at all: every section renders in its final
 * position and nothing waits on an animation to become readable.
 */
export function RevealObserver() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (nodes.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduce.matches) {
      for (const el of nodes) el.dataset.reveal = "in";
      return;
    }

    // Reveal at 90% of the viewport height: the animation starts as the section
    // enters, not after it has already arrived.
    const foldLine = () => window.innerHeight * 0.9;

    // Anything already on screen stays visible; hiding it would be a flash.
    for (const el of nodes) {
      el.dataset.reveal =
        el.getBoundingClientRect().top < foldLine() ? "in" : "pending";
    }

    let frame = 0;
    const pass = () => {
      frame = 0;
      const line = foldLine();
      for (const el of nodes) {
        if (
          el.dataset.reveal === "pending" &&
          el.getBoundingClientRect().top < line
        ) {
          el.dataset.reveal = "in";
        }
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(pass);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    pass();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
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
