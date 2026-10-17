"use client";

import { useRef, useState } from "react";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Photo } from "@/components/atoms/Photo";
import { revealStep } from "@/lib/reveal";
import type { Project } from "@/types/content";

interface ProjectCardProps {
  project: Project;
  /** Drives the loader, so it has to match the cell this card lands in. */
  sizes: string;
  priority?: boolean;
  /** Zero-based position in the `stagger` cascade; omitted when unstaggered. */
  revealIndex?: number;
  /** Interactive dossier modal trigger. */
  onSelect?: (project: Project) => void;
}

/**
 * Thirdway-style editorial project card (`cards-insights-carousel` plate).
 *
 * Framed on a warm `concha-nacar` plate with oval capsule metadata tags
 * `(01) (TIPOLOGÍA) (UBICACIÓN)`, a manual multi-photo carousel, and an
 * inline underlined action with an oval arrow pill that opens the full
 * architectural dossier modal — never a generic rectangular bordered button.
 */
export function ProjectCard({
  project,
  sizes,
  priority = false,
  revealIndex,
  onSelect,
}: ProjectCardProps) {
  const images = project.gallery.length > 0 ? project.gallery : [project.cover];
  const [index, setIndex] = useState(0);
  const total = images.length;
  const touchStartX = useRef<number | null>(null);

  const move = (step: number) =>
    setIndex((current) => (current + step + total) % total);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = e.changedTouches[0]?.clientX ?? null;
    if (endX === null) return;
    const diff = touchStartX.current - endX;
    touchStartX.current = null;
    if (Math.abs(diff) > 40) {
      move(diff > 0 ? 1 : -1);
    }
  };

  const ordinal =
    typeof revealIndex === "number"
      ? String(revealIndex + 1).padStart(2, "0")
      : "01";

  return (
    <article
      {...revealStep(revealIndex)}
      className="group flex flex-col justify-between"
    >
      <div>
        {/* Top Thirdway oval capsule metadata bar */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="number-pill">{`(${ordinal})`}</span>
            {project.categoryLabel ? (
              <span className="number-pill">{project.categoryLabel}</span>
            ) : null}
          </div>
          {project.location ? (
            <span className="text-xs tracking-wider text-ink-muted uppercase">
              {project.location}
            </span>
          ) : null}
        </div>

        {/* Title & concise summary above the photograph (Thirdway plate order) */}
        <div
          {...(onSelect
            ? {
                role: "button",
                tabIndex: 0,
                onClick: () => onSelect(project),
                onKeyDown: (e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(project);
                  }
                },
                "aria-label": `Ver expediente completo de ${project.title}`,
                className:
                  "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-800",
              }
            : {})}
        >
          <Heading
            as="h3"
            voice="serif"
            sizeClassName="text-[1.45rem] leading-[1.12] md:text-[1.7rem] transition-colors group-hover:text-brand-800"
          >
            {project.title}
          </Heading>

          {project.summary ? (
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
              {project.summary}
            </p>
          ) : null}
        </div>
      </div>

      {/* Framed photograph carousel with touch swipe support */}
      <div className="mt-5">
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative aspect-[4/3] w-full overflow-hidden"
        >
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {images.map((photo, i) => (
              <div
                key={photo.src}
                onClick={() => onSelect?.(project)}
                className={`relative h-full w-full shrink-0 ${
                  onSelect ? "cursor-pointer" : ""
                }`}
              >
                <Photo
                  photo={photo}
                  sizes={sizes}
                  priority={priority && i === 0}
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-1.5">
            <span className="number-pill-inverse">
              {`(${String(index + 1).padStart(2, "0")}) / (${String(total).padStart(2, "0")})`}
            </span>
          </div>

          {total > 1 ? (
            <>
              <CarouselArrow
                label="Imagen anterior"
                side="left"
                onClick={() => move(-1)}
              />
              <CarouselArrow
                label="Imagen siguiente"
                side="right"
                onClick={() => move(1)}
              />
            </>
          ) : null}
        </div>

        {/* Bottom inline Thirdway action bar */}
        <div className="mt-4 flex items-center justify-between gap-4 border-t border-ink/12 pt-3.5">
          <span className="text-xs text-ink-muted">
            {`${project.photoCount} fotografías de obra`}
          </span>

          {onSelect ? (
            <button
              type="button"
              onClick={() => onSelect(project)}
              className="group/btn label inline-flex items-center gap-2.5 text-ink transition-colors hover:text-brand-800"
            >
              <span className="underline decoration-ink/40 underline-offset-[5px] group-hover/btn:decoration-brand-800">
                Ver expediente
              </span>
              <span aria-hidden="true" className="arrow-pill arrow-pill-ink">
                <svg
                  viewBox="0 0 16 16"
                  className="arrow-pill-out h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path
                    d="M2.5 8h11m-4-4 4 4-4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  viewBox="0 0 16 16"
                  className="arrow-pill-in h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                >
                  <path
                    d="M2.5 8h11m-4-4 4 4-4 4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </article>
  );
}

interface CarouselArrowProps {
  label: string;
  side: "left" | "right";
  onClick: () => void;
}

function CarouselArrow({ label, side, onClick }: CarouselArrowProps) {
  const position = side === "left" ? "left-2.5" : "right-2.5";
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      aria-label={label}
      className={`absolute top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-ink/55 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-ink/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${position}`}
    >
      <Icon
        name={side === "left" ? "arrow-left" : "arrow-right"}
        className="h-4 w-4"
      />
    </button>
  );
}
