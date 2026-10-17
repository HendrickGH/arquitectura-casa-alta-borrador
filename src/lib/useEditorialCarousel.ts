"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Editorial Carousel interaction hook adapted from Wenda Ingredients.
 *
 * Provides:
 * - Dynamic scroll progression calculation (from initial viewport fraction expanding to 100%).
 * - Boundary awareness (`canScrollLeft`, `canScrollRight`).
 * - Smooth step scrolling (`scrollPrev`, `scrollNext`).
 * - Scrubbing to an arbitrary ratio (`seekToRatio`).
 */
export function useEditorialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(25);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateProgress = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;

    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < maxScroll - 6);

    if (maxScroll <= 0) {
      setScrollProgress(100);
      return;
    }

    const rawProgress = ((scrollLeft + clientWidth) / scrollWidth) * 100;
    const clampedProgress = Math.min(100, Math.max(15, rawProgress));
    setScrollProgress(clampedProgress);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const rafId = requestAnimationFrame(() => {
      updateProgress();
    });

    const handleScroll = () => {
      updateProgress();
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress]);

  const scrollPrev = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement | null;
    const scrollAmount = firstChild
      ? firstChild.offsetWidth + 16
      : el.clientWidth * 0.8;
    el.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }, []);

  const scrollNext = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const firstChild = el.firstElementChild as HTMLElement | null;
    const scrollAmount = firstChild
      ? firstChild.offsetWidth + 16
      : el.clientWidth * 0.8;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  }, []);

  const seekToRatio = useCallback((ratio: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: Math.max(0, maxScroll * ratio), behavior: "smooth" });
  }, []);

  return {
    scrollRef,
    scrollProgress,
    canScrollLeft,
    canScrollRight,
    scrollPrev,
    scrollNext,
    seekToRatio,
    updateProgress,
  };
}
