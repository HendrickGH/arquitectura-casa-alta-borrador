import Link from "next/link";
import { Heading } from "@/components/atoms/Heading";
import { Photo } from "@/components/atoms/Photo";
import type { Photo as PhotoModel, Project } from "@/types/content";

interface ProjectCardProps {
  project: Project;
  /** Drives the loader, so it has to match the cell this card lands in. */
  sizes: string;
  /**
   * Which photograph to show. Defaults to the project's rank-1 cover; a
   * full-width slot passes `project.wideCover` because a portrait photo would
   * be upscaled there.
   */
  photo?: PhotoModel;
  /**
   * Omit until the project detail pages exist. A card that links to a route
   * nobody has built is a dead end, so without this the card renders as a plain
   * article with no hover affordance -- there is nothing to afford.
   */
  href?: string;
  priority?: boolean;
}

/**
 * One project. The photograph is full-bleed inside a fixed aspect box; the
 * caption sits under it on the page background with no frame around either.
 * Provisional projects carry no location, so the meta line is built from
 * whatever parts actually exist rather than printing a dangling separator.
 */
export function ProjectCard({
  project,
  sizes,
  photo,
  href,
  priority = false,
}: ProjectCardProps) {
  const meta = [project.categoryLabel, project.location]
    .filter(Boolean)
    .join(" · ");

  const body = (
    <>
      <div className="aspect-[4/3] w-full overflow-hidden bg-bone-100">
        <Photo
          photo={photo ?? project.cover}
          sizes={sizes}
          priority={priority}
          className={
            href
              ? "transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              : undefined
          }
        />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <p className="label text-ink-muted">{meta}</p>
        <Heading
          as="h3"
          voice="serif"
          className={
            href
              ? "transition-colors duration-300 group-hover:text-brand-700"
              : undefined
          }
        >
          {project.title}
        </Heading>
      </div>
    </>
  );

  if (!href) {
    return <article>{body}</article>;
  }

  return (
    <Link href={href} className="group block">
      {body}
    </Link>
  );
}
