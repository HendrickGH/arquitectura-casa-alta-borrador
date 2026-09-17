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
 * Reveals every `[data-reveal]` section that is still below the fold as it
 * enters the viewport.
 *
 * The server HTML carries `data-reveal="idle"`, which is fully visible: with no
 * JavaScript everything renders. This only adds the start state to elements the
 * visitor cannot see yet, so nothing that is already on screen is hidden and
 * nothing flashes. The animation itself is a CSS transition; the observer only
 * flips the attribute.
 */
export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.reveal = "in";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    // Reduced motion gets no hidden state at all: every section renders in its
    // final position and nothing waits on an animation to become readable.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal="idle"]');
    for (const el of nodes) {
      const rect = el.getBoundingClientRect();
      if (reduce.matches || rect.top < window.innerHeight * 0.9) {
        el.dataset.reveal = "in";
        continue;
      }
      el.dataset.reveal = "pending";
      observer.observe(el);
    }

    return () => observer.disconnect();
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
