"use client";

import { useState } from "react";
import { Button } from "@/components/atoms/Button";
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
}

/**
 * One project card with a MANUAL image carousel.
 *
 * The card is no longer a single link: the arrows are controls, and a link
 * wrapping them would navigate on every click. The only link is the explicit
 * "Conoce más sobre {title}" button at the end.
 *
 * The carousel is manual on purpose -- two overlaid arrows, no timer -- so the
 * visitor decides which photograph is shown. A project with a single
 * publishable photograph renders no arrows. The images slide on a flex track,
 * which avoids a crossfade flashing the empty frame between two photographs.
 */
export function ProjectCard({
  project,
  sizes,
  priority = false,
  revealIndex,
}: ProjectCardProps) {
  const images = project.gallery.length > 0 ? project.gallery : [project.cover];
  const [index, setIndex] = useState(0);
  const total = images.length;

  const move = (step: number) =>
    setIndex((current) => (current + step + total) % total);

  return (
    <article {...revealStep(revealIndex)} className="flex flex-col">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone-100">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((photo, i) => (
            <div key={photo.src} className="relative h-full w-full shrink-0">
              <Photo
                photo={photo}
                sizes={sizes}
                priority={priority && i === 0}
              />
            </div>
          ))}
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

      {/* Category, title, place: three lines, each one job. */}
      <div className="mt-6 flex flex-col gap-2">
        {project.categoryLabel ? (
          <p className="label text-brand-800">{project.categoryLabel}</p>
        ) : null}
        <Heading
          as="h3"
          voice="serif"
          sizeClassName="text-[1.5rem] leading-[1.15] md:text-[1.75rem]"
        >
          {project.title}
        </Heading>
        {project.location ? (
          <p className="text-sm text-ink-muted">{project.location}</p>
        ) : null}
      </div>

      <Button
        href={`/proyectos/${project.slug}`}
        variant="secondary"
        size="sm"
        className="mt-5 max-w-full"
      >
        {`Conoce más sobre ${project.title}`}
      </Button>
    </article>
  );
}

interface CarouselArrowProps {
  label: string;
  side: "left" | "right";
  onClick: () => void;
}

/**
 * One carousel arrow: centred vertically over the photograph, a few pixels in
 * from the edge, translucent so it stays legible on any image and never hides
 * it. The inset grows a little on wider cards.
 */
function CarouselArrow({ label, side, onClick }: CarouselArrowProps) {
  const position = side === "left" ? "left-2 md:left-3" : "right-2 md:right-3";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-ink/55 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-ink/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${position}`}
    >
      <Icon
        name={side === "left" ? "arrow-left" : "arrow-right"}
        className="h-5 w-5"
      />
    </button>
  );
}
