import { useState, useCallback, useEffect, type RefObject } from "react";

export interface UseCarouselScrollOptions {
  gap?: number;
  fallbackWidth?: number;
}

/**
 * Reusable hook for horizontal scroll containers with boundary detection
 * and step-based smooth scrolling.
 */
export function useCarouselScroll(
  trackRef: RefObject<HTMLElement | null>,
  options: UseCarouselScrollOptions = {}
) {
  const { gap = 24, fallbackWidth = 440 } = options;
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, [trackRef]);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      const el = trackRef.current;
      if (!el) return;
      const firstChild = el.firstElementChild as HTMLElement | null;
      const step = (firstChild ? firstChild.offsetWidth : fallbackWidth) + gap;
      el.scrollBy({
        left: direction === "left" ? -step : step,
        behavior: "smooth",
      });
    },
    [trackRef, gap, fallbackWidth]
  );

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [trackRef, updateScrollState]);

  return {
    canScrollLeft,
    canScrollRight,
    scrollLeft: () => scroll("left"),
    scrollRight: () => scroll("right"),
    updateScrollState,
  };
}
