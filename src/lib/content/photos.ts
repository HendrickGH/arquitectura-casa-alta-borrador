import manifest from "@images/manifest.json";
import type {
  Manifest,
  ManifestPhoto,
  ManifestProject,
} from "@/types/manifest";
import type { MasonrySlot, Photo } from "@/types/content";

/**
 * Bridges the pipeline's manifest into the view models components consume.
 *
 * This is the only place that knows how a photo's on-disk identity maps to a
 * web path. Alt text comes from the manifest's `note`, which is a real Spanish
 * description written during the ranking pass -- not the filename, which the
 * repository's own AGENTS.md forbids as alt text.
 *
 * The src intentionally points at the full-size AVIF. next/image asks the
 * custom loader for a width, and the loader maps that back down to whichever
 * tiers actually exist for this photo (see src/lib/image/loader.ts).
 */

const data = manifest as Manifest;
const IMAGE_ROOT = "/images";

/** 1/5 and 2/5 sit below portfolio grade and never reach a page. */
const SCORE_FLOOR = 3;

/**
 * The narrowest file a full-bleed slot can be served at. The loader never
 * invents a width the pipeline did not encode, so a narrower source would be
 * upscaled by the browser across the whole viewport.
 */
const FULL_BLEED_WIDTH = 1600;

/** A photograph together with the manifest project it belongs to. */
export interface ProjectPhoto {
  dir: string;
  photo: Photo;
}

/** Web path for a photo's largest encoded AVIF. */
export function photoSrc(dir: string, base: string): string {
  return `${IMAGE_ROOT}/${dir}/${base}.avif`;
}

/** The manifest's projects, in the pipeline's ranking order. */
function orderedProjects(): ManifestProject[] {
  return [...data.projects].sort((a, b) => a.order.localeCompare(b.order));
}

/** A project's publishable photographs, best first. */
function rankedPhotos(project: ManifestProject): ManifestPhoto[] {
  return project.photos
    .filter((photo) => photo.score >= SCORE_FLOOR)
    .sort((a, b) => a.order.localeCompare(b.order));
}

function toPhoto(
  dir: string,
  photo: ManifestPhoto,
  projectTitle: string,
): Photo {
  return {
    src: photoSrc(dir, photo.base),
    alt: projectTitle ? `${photo.note} — ${projectTitle}` : photo.note,
    width: photo.full.width,
    height: photo.full.height,
  };
}

/** True when a photograph is wider than it is tall. */
function isLandscape(photo: ManifestPhoto): boolean {
  return photo.full.width > photo.full.height;
}

/**
 * The best photograph of a project that the page is not already showing.
 *
 * `used` is compared by src, which is what makes this an addition to the page
 * rather than a second showing of one file. Landscape is preferred when asked
 * for because the tile band crops rather than letterboxes, and a project with
 * no landscape falls through to its best portrait instead of to nothing -- that
 * fall-through is what used to hand a project's card and its tile the same
 * file. Returns null when every photograph of the project is already on the
 * page, so the caller drops the slot rather than repeating one.
 */
export function pickUnusedProjectPhoto(
  dir: string,
  projectTitle: string,
  used: ReadonlySet<string>,
  orientation: "any" | "landscape" = "any",
): Photo | null {
  const project = findManifestProject(dir);
  if (!project) return null;

  const available = rankedPhotos(project);
  const ordered =
    orientation === "landscape"
      ? [
          ...available.filter(isLandscape),
          ...available.filter((photo) => !isLandscape(photo)),
        ]
      : available;

  const free = ordered.find((photo) => !used.has(photoSrc(dir, photo.base)));

  return free ? toPhoto(dir, free, projectTitle) : null;
}

/** Manifest entry for a project directory, or undefined if it has none. */
export function findManifestProject(dir: string) {
  return data.projects.find((project) => project.dir === dir);
}

/**
 * Photos for a project, best first.
 *
 * Ordered by the manifest's own `order`, which is the human quality ranking.
 * Photos scoring 1 or 2 are excluded: AGENTS.md is explicit that the bottom of
 * each folder is below portfolio grade, and a portfolio is judged by its worst
 * photo.
 */
export function getProjectPhotos(dir: string, projectTitle = ""): Photo[] {
  const project = findManifestProject(dir);
  if (!project) return [];

  return rankedPhotos(project).map((photo) =>
    toPhoto(dir, photo, projectTitle),
  );
}

/**
 * The masonry's photographs, in the wall's authored display order.
 *
 * The order lives in `src/content/masonry.ts`, not here: the wall's double cells
 * sit at fixed positions, so the order decides which photographs get the four
 * largest cells, and that is an editorial call rather than one the manifest's
 * dimensions should make. An earlier version interleaved tall and short photos
 * to feed CSS multi-column's height balancer; the wall is a fixed-row grid now,
 * which packs its own rows, so the balancing had nothing left to balance.
 *
 * A slot whose project or photograph is missing, or whose photograph scores
 * below the portfolio floor, drops out rather than rendering a guessed image.
 */
export function masonryPhotos(
  slots: readonly MasonrySlot[],
  resolveTitle: (dir: string) => string,
): ProjectPhoto[] {
  return slots.flatMap((slot) => {
    const project = findManifestProject(slot.dir);
    const photo = project?.photos.find((entry) => entry.base === slot.base);
    if (!project || !photo || photo.score < SCORE_FLOOR) return [];
    return [
      {
        dir: slot.dir,
        photo: toPhoto(slot.dir, photo, resolveTitle(slot.dir)),
      },
    ];
  });
}

/**
 * The strongest landscape photograph the landing is not already showing, for
 * the full-bleed band.
 *
 * Landscape and at least `FULL_BLEED_WIDTH` because the band is a `100vw` slot:
 * the loader serves nothing wider than the pipeline encoded, so a narrower
 * source would be stretched. `used` is compared by src, which is what makes the
 * band an addition to the page rather than another showing of a photograph that
 * is already on it. Ties keep the earlier project, so the choice follows the
 * manifest's ranking and not this function's iteration order.
 */
export function strongestUnusedLandscapePhoto(
  used: ReadonlySet<string>,
  resolveTitle: (dir: string) => string,
): ProjectPhoto | null {
  const candidates = orderedProjects().flatMap((project) =>
    rankedPhotos(project)
      .filter(
        (photo) =>
          photo.full.width > photo.full.height &&
          photo.full.width >= FULL_BLEED_WIDTH &&
          !used.has(photoSrc(project.dir, photo.base)),
      )
      .map((photo) => ({ dir: project.dir, photo })),
  );

  if (candidates.length === 0) return null;

  const best = candidates.reduce((leader, candidate) =>
    candidate.photo.score > leader.photo.score ? candidate : leader,
  );

  return {
    dir: best.dir,
    photo: toPhoto(best.dir, best.photo, resolveTitle(best.dir)),
  };
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
