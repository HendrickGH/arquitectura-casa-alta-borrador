"use client";

import { useState } from "react";
import { Icon } from "@/components/atoms/Icon";
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

const DOUBLE_SIZES = "(min-width: 1200px) 66vw, (min-width: 768px) 50vw, 100vw";
const CELL_SIZES = "(min-width: 1200px) 33vw, (min-width: 768px) 50vw, 100vw";
const MOBILE_SIZES = "(max-width: 767px) 85vw, 50vw";

/**
 * The archive wall: the strongest photographs the studio has, across its
 * projects, packed into an architectural mosaic.
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
    <Section tone={tone} density="compact" reveal="stagger">
      {/* Mobile-only Editorial Carousel Navigation Bar */}
      <div className="mb-6 block px-6 min-[768px]:hidden">
        <div className="flex items-center justify-between border-b border-bone-200 pb-3">
          <span className="label text-brand-800">Archivo de obra</span>
          <button
            type="button"
            onClick={() =>
              setMobileView((prev) =>
                prev === "carousel" ? "wall" : "carousel",
              )
            }
            className="label min-h-[44px] cursor-pointer border border-bone-200 bg-canvas px-3 py-1.5 text-ink transition-colors hover:border-brand-800"
          >
            {mobileView === "carousel"
              ? "Ver en lista vertical"
              : "Ver carrusel"}
          </button>
        </div>

        {mobileView === "carousel" && (
          <div className="mt-3 flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="h-[2px] w-full overflow-hidden bg-bone-200">
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
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-bone-200 bg-canvas text-ink transition-colors hover:border-brand-800 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Foto anterior"
              >
                <Icon name="arrow-left" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                disabled={!canScrollRight}
                className="inline-flex h-11 w-11 cursor-pointer items-center justify-center border border-bone-200 bg-canvas text-ink transition-colors hover:border-brand-800 disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Foto siguiente"
              >
                <Icon name="arrow-right" className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Swipeable Track */}
      {mobileView === "carousel" && (
        <div
          ref={scrollRef}
          className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pt-1 pb-6 min-[768px]:hidden"
        >
          {items.map((item, index) => {
            const numStr = String(index + 1).padStart(2, "0");
            const cleanProjectName = item.projectSlug
              .replace(/^\d+-/, "")
              .replace(/-/g, " ");

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
                </div>
                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <span className="label text-ink-muted">
                    {cleanProjectName}
                  </span>
                  <span className="label text-ink-muted tabular-nums">
                    {`${numStr} / ${String(items.length).padStart(2, "0")}`}
                  </span>
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
              data-reveal-motion="fade"
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

