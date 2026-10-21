"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Photo } from "@/components/atoms/Photo";
import { cx } from "@/lib/cx";
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
  /** Aspect ratio class, e.g. "aspect-[16/10]" or "aspect-[4/5]". Defaults to "aspect-[4/3]". */
  aspectClassName?: string;
  /** Grid layout and column placement classes. */
  className?: string;
  /** Whether to prefer project.wideCover for landscape cells. */
  preferWide?: boolean;
}

/**
 * Architectural Monograph Project Card (Bloom 3D Reference).
 *
 * - Resting: Pristine architectural photograph with dynamic proportions (wide 16:10 vs tall 4:5).
 *   Zero description, zero overlaid text or scrims when unhovered.
 * - Desktop Hover: Smooth dark gradient scrim fades in with the project title
 *   at bottom-left and location at bottom-right. Clicking anywhere opens the
 *   dossier modal (`onSelect`).
 * - Mobile Touch: First tap activates the hover state (revealing title, location,
 *   and a centered "Conoce más" Button). Tapping "Conoce más" opens the dossier modal.
 *   Tapping outside or tapping the card again closes the active state.
 */
export function ProjectCard({
  project,
  sizes,
  priority = false,
  revealIndex,
  onSelect,
  aspectClassName = "aspect-[4/3]",
  className,
  preferWide = false,
}: ProjectCardProps) {
  const [isActive, setIsActive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  const photo =
    preferWide && project.wideCover ? project.wideCover : project.cover;

  useEffect(() => {
    const mq = window.matchMedia("(hover: none) or (max-width: 767px)");
    const updateTouch = () => setIsTouchDevice(mq.matches);
    updateTouch();
    mq.addEventListener("change", updateTouch);
    return () => mq.removeEventListener("change", updateTouch);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const handlePointerDownOutside = (e: PointerEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDownOutside);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside);
    };
  }, [isActive]);

  const handleCardClick = (e: React.MouseEvent) => {
    if (isTouchDevice) {
      if (!isActive) {
        e.preventDefault();
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    } else {
      onSelect?.(project);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect?.(project);
    }
  };

  return (
    <article
      ref={cardRef}
      {...revealStep(revealIndex)}
      role="button"
      tabIndex={0}
      aria-label={`Ver proyecto ${project.title}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className={cx(
        "group relative w-full cursor-pointer overflow-hidden bg-bone-100 select-none",
        aspectClassName,
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-800",
        className,
      )}
    >
      {/* 1° Clean Photograph */}
      <Photo
        photo={photo}
        sizes={sizes}
        priority={priority}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />

      {/* 2° Hover / Active Overlay */}
      <div
        className={cx(
          "absolute inset-0 flex flex-col justify-between transition-opacity duration-300",
          isActive
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-focus-visible:opacity-100 group-focus-visible:pointer-events-auto",
        )}
      >
        {/* Scrim gradient: deep bottom, soft middle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-transparent"
        />

        {/* Mobile CTA: "Conoce más" button (shown when active on touch/mobile) */}
        {isActive ? (
          <div
            className="relative z-20 flex flex-1 items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="inverse"
              size="sm"
              arrow
              onClick={() => {
                setIsActive(false);
                onSelect?.(project);
              }}
            >
              Conoce más
            </Button>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        {/* Bottom Bar: Title (left) & Location (right) */}
        <div className="relative z-10 flex flex-col gap-1 lg:flex-row lg:items-end lg:justify-between lg:gap-4 p-3.5 sm:p-4 md:p-5">
          <h3 className="voice text-base sm:text-lg lg:text-xl font-normal text-white drop-shadow-sm leading-tight tracking-normal">
            {project.title}
          </h3>

          {project.location ? (
            <span className="label text-[0.6875rem] sm:text-xs text-white/90 drop-shadow-sm tracking-[0.14em] uppercase lg:text-right shrink-0">
              {project.location}
            </span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
