import manifest from "@images/manifest.json";
import type { Manifest } from "@/types/manifest";
import type { Photo } from "@/types/content";

/**
 * Bridges the pipeline's manifest into the view models components consume.
 *
 * This is the only place that knows how a photo's on-disk identity maps to a
 * web path. Alt text comes from the manifest's `note`, which is a real Spanish
 * description written during the ranking pass -- not the filename, which the
 * repository's own CLAUDE.md forbids as alt text.
 *
 * The src intentionally points at the full-size AVIF. next/image asks the
 * custom loader for a width, and the loader maps that back down to whichever
 * tiers actually exist for this photo (see src/lib/image/loader.ts).
 */

const data = manifest as Manifest;
const IMAGE_ROOT = "/images";

/** Web path for a photo's largest encoded AVIF. */
export function photoSrc(dir: string, base: string): string {
  return `${IMAGE_ROOT}/${dir}/${base}.avif`;
}

function toPhoto(
  dir: string,
  photo: Manifest["projects"][number]["photos"][number],
  projectTitle: string,
): Photo {
  return {
    src: photoSrc(dir, photo.base),
    alt: projectTitle ? `${photo.note} — ${projectTitle}` : photo.note,
    width: photo.full.width,
    height: photo.full.height,
  };
}

/** Manifest entry for a project directory, or undefined if it has none. */
export function findManifestProject(dir: string) {
  return data.projects.find((project) => project.dir === dir);
}

/**
 * Photos for a project, best first.
 *
 * Ordered by the manifest's own `order`, which is the human quality ranking.
 * Photos scoring 1 or 2 are excluded: CLAUDE.md is explicit that the bottom of
 * each folder is below portfolio grade, and a portfolio is judged by its worst
 * photo.
 */
export function getProjectPhotos(dir: string, projectTitle = ""): Photo[] {
  const project = findManifestProject(dir);
  if (!project) return [];

  return project.photos
    .filter((photo) => photo.score >= 3)
    .sort((a, b) => a.order.localeCompare(b.order))
    .map((photo) => toPhoto(dir, photo, projectTitle));
}

/**
 * The project's highest-ranked photo, which is its `01-` entry.
 *
 * `orientation` narrows the candidates before ranking is applied. A slot that
 * renders full width needs a landscape source: four of the six featured covers
 * are portrait, and a 1200x1600 photo stretched across a 1310px card is being
 * upscaled by the browser. Falls back to the rank-1 photo when the project has
 * nothing in the requested orientation, so this never returns null for a
 * project that has photos at all.
 */
export function getProjectCover(
  dir: string,
  projectTitle = "",
  orientation: "any" | "landscape" = "any",
): Photo | null {
  const project = findManifestProject(dir);
  if (!project?.photos.length) return null;

  const ranked = [...project.photos].sort((a, b) =>
    a.order.localeCompare(b.order),
  );
  const candidates =
    orientation === "landscape"
      ? ranked.filter((photo) => photo.full.width > photo.full.height)
      : ranked;

  return toPhoto(dir, candidates[0] ?? ranked[0], projectTitle);
}

export function getProjectPhotoCount(dir: string): number {
  return findManifestProject(dir)?.photos.length ?? 0;
}

export const manifestMeta = {
  generated: data.generated,
  projects: data.stats.projects,
  photos: data.stats.photos,
};
