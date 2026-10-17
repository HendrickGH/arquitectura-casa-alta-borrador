"use client";

import { useState } from "react";
import { Photo } from "@/components/atoms/Photo";
import { Section } from "@/components/atoms/Section";
import { cx } from "@/lib/cx";
import { revealStep } from "@/lib/reveal";
import { useEditorialCarousel } from "@/lib/useEditorialCarousel";
import type { MasonryItem } from "@/types/content";

interface MasonryGalleryProps {
  items: MasonryItem[];
  tone?: "canvas" | "bone";
}

/**
 * `sizes` for the two cell widths the mosaic declares.
 *
 * At 1200px and up the double cell spans two of three columns (~66vw) and every
 * other cell one (~33vw). Between 768 and 1199 the wall is two columns: the
 * double cell is a half-width tall slot and the rest are halves, so both share
 * the same value there. Below 768 the wall adapts to an editorial carousel.
 */
const DOUBLE_SIZES = "(min-width: 1200px) 66vw, (min-width: 768px) 50vw, 100vw";
const CELL_SIZES = "(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw";
const MOBILE_SIZES = "(max-width: 767px) 85vw, 50vw";

/**
 * The archive wall: the strongest photographs the studio has, across its
 * projects, packed into an architectural mosaic.
 *
 * Responsive behavior:
 * - On desktop/tablet (`>= 768px`): Full-bleed architectural wall with 3-column
 *   and 2-column CSS grid and GSAP parallax drift on single cells (`[data-drift-item]`).
 * - On mobile (`< 768px`): Touch-enabled editorial carousel with progress scrubber,
 *   preventing mobile users from being trapped in a 12-image vertical stack.
 */
export function MasonryGallery({ items, tone = "bone" }: MasonryGalleryProps) {
  const [mobileView, setMobileView] = useState<"carousel" | "wall">("carousel");
  const {
    scrollRef,
    scrollProgress,
    canScrollLeft,
    canScrollRight,
    scrollPrev,
    scrollNext,
  } = useEditorialCarousel();

  if (items.length === 0) return null;

  return (
    <Section tone={tone} reveal="stagger" className="!py-12 md:!py-20">
      {/* Mobile-only Editorial Carousel Navigation Bar */}
      <div className="mb-6 block px-6 min-[768px]:hidden">
        <div className="flex items-center justify-between border-b border-bone-200/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="number-pill">(09)</span>
            <span className="label text-[0.6875rem] font-semibold text-brand-800">
              ARCHIVO DE OBRA
            </span>
          </div>
          <button
            type="button"
            onClick={() =>
              setMobileView((prev) =>
                prev === "carousel" ? "wall" : "carousel",
              )
            }
            className="number-pill cursor-pointer bg-white text-[0.625rem] hover:border-brand-800"
          >
            {mobileView === "carousel"
              ? "Ver en lista vertical"
              : "Ver carrusel"}
          </button>
        </div>

        {mobileView === "carousel" && (
          <div className="mt-3 flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="h-1 w-full overflow-hidden bg-bone-200/80">
                <div
                  className="h-full bg-brand-800 transition-all duration-150"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                onClick={scrollPrev}
                disabled={!canScrollLeft}
                className="arrow-pill cursor-pointer px-2.5 py-1 text-[0.7rem] disabled:opacity-30"
                aria-label="Foto anterior"
              >
                ←
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollRight}
                className="arrow-pill cursor-pointer px-2.5 py-1 text-[0.7rem] disabled:opacity-30"
                aria-label="Foto siguiente"
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Swipeable Track */}
      {mobileView === "carousel" && (
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-6 pt-1 pb-6 snap-x snap-mandatory scrollbar-none min-[768px]:hidden"
        >
          {items.map((item, index) => {
            const numStr = String(index + 1).padStart(2, "0");
            const cleanProjectName = item.projectSlug
              .replace(/^\d+-/, "")
              .replace(/-/g, " ")
              .toUpperCase();

            return (
              <div
                key={item.photo.src}
                className="w-[85vw] shrink-0 snap-center"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-200">
                  <Photo
                    photo={item.photo}
                    sizes={MOBILE_SIZES}
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
                  <div className="absolute right-3 bottom-2.5 left-3 flex items-center justify-between text-[0.625rem] font-medium tracking-wider text-white uppercase">
                    <span>{cleanProjectName}</span>
                    <span>{`(${numStr} / ${String(items.length).padStart(2, "0")})`}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Desktop/Tablet Architectural Wall (also shown if mobileView === 'wall') */}
      <div
        className={cx(
          "grid grid-flow-row-dense gap-6",
          mobileView === "carousel"
            ? "hidden min-[768px]:grid"
            : "grid grid-cols-1 px-6 min-[768px]:px-0",
          "min-[768px]:aspect-[2/5] min-[768px]:grid-cols-2 min-[768px]:grid-rows-8",
          "min-[1200px]:aspect-[3/5] min-[1200px]:grid-cols-3",
        )}
      >
        {items.map((item, index) => {
          const doubled = index % 3 === 0;
          const rightSide = (index / 3) % 2 === 1;

          return (
            <div
              key={item.photo.src}
              {...revealStep(index)}
              // The wall reveals by opacity only, never translate: the drift
              // owns each single cell's `transform`, so a translate reveal would
              // fight it. See `buildDrift` in gsap-scenes.ts.
              data-reveal-motion="fade"
              // The drift carries the single cells only. A double spans two
              // columns at the three-column tier, so translating it pulls it out
              // of the row it shares with its neighbours; the doubles anchor the
              // wall instead. See `buildDrift` in gsap-scenes.ts.
              data-drift-item={doubled ? undefined : ""}
              className={cx(
                doubled && "min-[768px]:row-span-2",
                doubled && "min-[1200px]:col-span-2",
                doubled && rightSide && "min-[1200px]:col-start-2",
              )}
            >
              <Photo
                photo={item.photo}
                sizes={doubled ? DOUBLE_SIZES : CELL_SIZES}
                fit="mosaic"
              />
            </div>
          );
        })}
      </div>
    </Section>
  );
}

