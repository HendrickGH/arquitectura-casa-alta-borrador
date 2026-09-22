"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { REVEAL_IN, REVEAL_PENDING } from "@/lib/reveal";

type ChromePolarity = "ink" | "canvas";

/** The mobile menu's open state, shared between `HeaderShell` and `SiteNav`. */
interface NavOpenState {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavOpenContext = createContext<NavOpenState | null>(null);

/**
 * Reads the shared mobile-menu state. Only `SiteNav` consumes it, and only
 * while mounted inside `HeaderShell`, which is its provider.
 */
export function useNavOpen(): NavOpenState {
  const state = useContext(NavOpenContext);
  if (!state) {
    throw new Error("useNavOpen must be used inside <HeaderShell>.");
  }
  return state;
}

interface HeaderShellProps {
  /**
   * The hero's chrome polarity. When set, the header floats transparent over the
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
  const [open, setOpen] = useState(false);
  const navOpen = useMemo(() => ({ open, setOpen }), [open]);

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
    // whenever the header itself holds focus.
    let lastY = window.scrollY;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        if (chrome) setSurface(y <= TOP ? "hero" : "page");
        if (y <= 8) setVisible(true);
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

  // A white (filled) chrome while the mobile menu is open: the overlay below it
  // is canvas, so a transparent header would render white-on-white. The
  // scroll-derived surface is kept underneath and restored when the menu closes.
  const effectiveSurface = open ? "page" : surface;

  return (
    <NavOpenContext.Provider value={navOpen}>
      <header
        ref={headerRef}
        data-surface={effectiveSurface}
        data-chrome={chrome}
        data-visible={visible ? "true" : "false"}
        className="sticky top-0 z-50 border-b"
      >
        {children}
      </header>
    </NavOpenContext.Provider>
  );
}

/**
 * A figure the reveal script counts up: the numeric target, its trailing unit
 * ("+", "%") and whether the authored string grouped thousands.
 */
interface Figure {
  target: number;
  suffix: string;
  grouped: boolean;
}

/**
 * Reads the target out of an authored figure such as "2016", "150+", "50,000"
 * or "100%". The string owns its formatting, so the count can reproduce it
 * exactly instead of guessing: "50,000" re-groups and "2016" stays a year.
 */
function parseFigure(raw: string): Figure | null {
  const match = raw.match(/^([\d.,]+)\s*(.*)$/);
  if (!match) return null;
  const [, digits, suffix] = match;
  const target = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(target)) return null;
  return { target, suffix, grouped: digits.includes(",") };
}

function formatFigure(value: number, grouped: boolean, suffix: string): string {
  const rounded = Math.round(value);
  return `${grouped ? rounded.toLocaleString("en-US") : String(rounded)}${suffix}`;
}

/** Runs once per figure; the WeakSet keeps a re-reveal from counting twice. */
const counted = new WeakSet<HTMLElement>();

/**
 * Counts one figure from zero to its authored value, fast and decelerating, the
 * first time its section is revealed. The text is rewritten in place, so no
 * layout shifts; `tabular-nums` on the figure keeps the width steady as it runs.
 */
function countUp(el: HTMLElement): void {
  if (counted.has(el)) return;
  const raw = el.dataset.count;
  if (!raw) return;
  const figure = parseFigure(raw);
  if (!figure) return;
  counted.add(el);

  const { target, grouped, suffix } = figure;
  const duration = 900;
  const start = performance.now();
  const tick = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatFigure(target * eased, grouped, suffix);
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function countFigures(scope: HTMLElement): void {
  for (const el of scope.querySelectorAll<HTMLElement>("[data-count]")) {
    countUp(el);
  }
}

/**
 * Reveals content as it crosses the fold line, in two granularities.
 *
 * A `fade` section (`[data-reveal]` without a stagger variant) reveals as one
 * block, the way it always has. A `stagger` section never fades as a block:
 * each `[data-reveal-step]` child carries its own `data-reveal-step` state and
 * is flipped individually as its own top crosses the line, so the cascade stays
 * visible element by element as the visitor scrolls instead of firing all at
 * once when the section's leading edge arrives.
 *
 * The server HTML carries the starting state "idle", which is fully visible:
 * with no JavaScript everything renders. This only adds the start state to
 * elements the visitor cannot see yet, so nothing that is already on screen is
 * hidden and nothing flashes. The animation itself is a CSS transition; this
 * only flips the attribute.
 *
 * It also starts the `[data-count]` figures inside a revealed element as it
 * reveals, so the ledger counts up once, on arrival, and never twice.
 *
 * WHY A SCROLL PASS AND NOT AN IntersectionObserver. An observer reports an
 * element only when it *intersects* the viewport. Any jump -- an in-page anchor
 * (`/#proyectos`), the End key, a fast wheel, a restored scroll position -- skips
 * elements entirely, and those never intersect again while they sit above the
 * viewport, so an observer leaves them hidden permanently. Measured with
 * Playwright: a jump to the bottom left 11 of 12 sections at `opacity: 0`, above
 * the fold, unreachable. The pass below reveals anything whose top has crossed
 * the line, whether it was scrolled through or jumped over.
 */
export function RevealObserver() {
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal]:not([data-reveal-variant='stagger'])",
      ),
    );
    const steps = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-reveal-variant='stagger'] [data-reveal-step]",
      ),
    );
    if (sections.length === 0 && steps.length === 0) return;

    // Reveal at 90% of the viewport height: the animation starts as the element
    // enters, not after it has already arrived.
    const foldLine = () => window.innerHeight * 0.9;

    const showSection = (el: HTMLElement) => {
      el.dataset.reveal = REVEAL_IN;
      countFigures(el);
    };
    const showStep = (el: HTMLElement) => {
      el.dataset.revealStep = REVEAL_IN;
      countFigures(el);
    };

    // Anything already on screen stays visible; hiding it would be a flash.
    for (const el of sections) {
      if (el.getBoundingClientRect().top < foldLine()) showSection(el);
      else el.dataset.reveal = REVEAL_PENDING;
    }
    for (const el of steps) {
      if (el.getBoundingClientRect().top < foldLine()) showStep(el);
      else el.dataset.revealStep = REVEAL_PENDING;
    }

    let frame = 0;
    const pass = () => {
      frame = 0;
      const line = foldLine();
      for (const el of sections) {
        if (
          el.dataset.reveal === REVEAL_PENDING &&
          el.getBoundingClientRect().top < line
        ) {
          showSection(el);
        }
      }
      for (const el of steps) {
        if (
          el.dataset.revealStep === REVEAL_PENDING &&
          el.getBoundingClientRect().top < line
        ) {
          showStep(el);
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
  /** A server-rendered section. Nothing here hides it or gates it on JS. */
  children: React.ReactNode;
}

/**
 * Wraps the masonry wall and hands it to the scroll choreography.
 *
 * It renders a plain `div` in the server HTML: no class hides content, no inline
 * style is written for a reveal. GSAP is imported lazily inside the effect, so
 * it never reaches the eager chunk of the routes that render the header -- and
 * the wall is fully visible whether or not the chunk ever arrives.
 *
 * Since the hero's and the closing CTA's photo parallax were removed, the wall
 * is the only section that still gets a scene.
 */
export function ScrollScene({ children }: ScrollSceneProps) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    void import("./gsap-scenes")
      .then(({ createScenes }) => {
        if (cancelled) return;
        revert = createScenes({ scope });
      })
      .catch(() => {
        // A failed chunk is not a content failure: the section is already in
        // the server HTML and stays visible without its choreography.
      });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  return <div ref={scopeRef}>{children}</div>;
}
