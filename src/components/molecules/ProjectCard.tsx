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
   * The card's detail route. Supplied by every current call site now that
   * `/proyectos/<slug>` exists; the card still renders as a plain article
   * without it, so a future unlinked slot does not become a dead link.
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
  const body = (
    <>
      <div className="aspect-[4/3] w-full overflow-hidden bg-bone-100">
        <Photo
          photo={photo ?? project.cover}
          sizes={sizes}
          priority={priority}
          className={
            href
              ? "transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
              : undefined
          }
        />
      </div>

      {/* Category, title, place: three lines, each one job. The place is a
          sentence, not a tracked caption, so a long Puerto Escondido address
          reads as a location instead of as a shout. */}
      <div className="mt-6 flex flex-col gap-2">
        {project.categoryLabel ? (
          <p className="label text-brand-800">{project.categoryLabel}</p>
        ) : null}
        <Heading
          as="h3"
          voice="serif"
          sizeClassName="text-[1.5rem] leading-[1.15] md:text-[1.75rem]"
          className={
            href
              ? "transition-colors duration-300 group-hover:text-brand-800 group-focus-visible:text-brand-800"
              : undefined
          }
        >
          {project.title}
        </Heading>
        {project.location ? (
          <p className="text-sm text-ink-muted">{project.location}</p>
        ) : null}
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
