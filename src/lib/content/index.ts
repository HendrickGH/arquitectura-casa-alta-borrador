import { site } from "@/content/site";
import { serviceGroups } from "@/content/services";
import { home } from "@/content/home";
import { processSteps } from "@/content/process";
import { differentiators } from "@/content/differentiators";
import { testimonials } from "@/content/testimonials";
import {
  categoryLabels,
  featuredProjectDirs,
  projectContent,
} from "@/content/projects";
import {
  findManifestProject,
  getProjectCover,
  getProjectPhotoCount,
  getProjectPhotos,
  masonryPhotos,
  pickUnusedProjectPhoto,
  strongestUnusedLandscapePhoto,
} from "./photos";
import type {
  CategoryTile,
  Differentiator,
  HomePage,
  MasonryItem,
  Photo,
  ProcessStep,
  Project,
  ServiceGroup,
  SiteConfig,
  Testimonial,
} from "@/types/content";

/**
 * THE CONTENT SEAM.
 *
 * Pages call these functions. Components never call them -- they receive the
 * results as props. That means introducing Payload CMS later is a change to
 * this file alone: every function below becomes an async read from Payload, the
 * return types stay identical, and no component or page needs to be touched.
 *
 * Functions are synchronous today because the content is local modules. Making
 * them async is the one signature change Payload will force, which is why pages
 * already `await` them where practical.
 */

export function getSiteConfig(): SiteConfig {
  return site;
}

export function getServiceGroups(): ServiceGroup[] {
  return serviceGroups;
}

export function getProcessSteps(): ProcessStep[] {
  return processSteps;
}

export function getDifferentiators(): Differentiator[] {
  return differentiators;
}

export function getTestimonials(): Testimonial[] {
  return testimonials;
}

function buildProject(dir: string): Project | null {
  const editorial = projectContent[dir];
  const manifestProject = findManifestProject(dir);
  const cover = getProjectCover(dir, editorial?.title ?? "");

  // A project needs both halves: editorial data for the story, a manifest entry
  // for the photographs. Without a cover there is nothing to show, so skip it
  // rather than render an empty card.
  if (!editorial || !manifestProject || !cover) return null;

  return {
    ...editorial,
    cover,
    wideCover: getProjectCover(dir, editorial.title, "landscape") ?? cover,
    photos: getProjectPhotos(dir, editorial.title),
    photoCount: getProjectPhotoCount(dir),
  };
}

/** Every project that has both editorial data and photographs, in pipeline order. */
export function getProjects(): Project[] {
  return (
    Object.keys(projectContent)
      .map(buildProject)
      .filter((project): project is Project => project !== null)
      // The pipeline's quality ranking lives in the manifest's `order`, not in
      // the key order of projectContent.
      .sort(
        (a, b) =>
          Number(findManifestProject(a.slug)?.order ?? 0) -
          Number(findManifestProject(b.slug)?.order ?? 0),
      )
  );
}

export function getProject(slug: string): Project | null {
  const dir = Object.keys(projectContent).find(
    (key) => projectContent[key].slug === slug,
  );
  return dir ? buildProject(dir) : null;
}

/** The subset shown on the landing, in the order the editorial file sets. */
export function getFeaturedProjects(): Project[] {
  return featuredProjectDirs
    .map(buildProject)
    .filter((project): project is Project => project !== null);
}

/** The number the brief's §0 decision fixes for the leading portfolio row. */
const FEATURED_COUNT = 3;

/**
 * The masonry's size, and how deep into each project's ranking it draws.
 *
 * Twelve, not nine. The wall's column balance is decided in photos.ts, and the
 * residual gap it cannot close falls from 421px to 176px once the count reaches
 * twelve -- measured against the manifest. The count and the ordering are one
 * decision, not two.
 */
const MASONRY_COUNT = 12;
const MASONRY_RANK = 1;

/** A project's display title, for the alt text the manifest cannot supply. */
function projectTitle(dir: string): string {
  return projectContent[dir]?.title ?? "";
}

/**
 * The landing's portfolio, split into the three the brief ranks first and the
 * row under them. Split here rather than in a component so no project can end
 * up in both rows, and so the page can hand two plain arrays down.
 */
export function getLandingPortfolio(): {
  featured: Project[];
  remaining: Project[];
} {
  const all = getFeaturedProjects();
  return {
    featured: all.slice(0, FEATURED_COUNT),
    remaining: all.slice(FEATURED_COUNT),
  };
}

/**
 * The category tiles below the hero.
 *
 * The label is the authored category label and the photograph is the mapped
 * project's best landscape shot, so the tile restates neither a string nor a
 * path. A mapping whose project has no publishable photograph drops out rather
 * than rendering an empty tile.
 *
 * The band chooses after the rest of the page has claimed its photographs,
 * because a landing that shows one file twice is showing fewer photographs than
 * it says it is. That is not hypothetical here: the one project in the band
 * with no landscape shot used to fall back to its cover, which its own card in
 * the row below was already showing. The project now contributes its next
 * available shot instead, and a tile only drops out when its project has
 * nothing left to give.
 */
export function getTiles(): CategoryTile[] {
  const { featured, remaining } = getLandingPortfolio();
  const claimed = new Set<string>([
    ...featured.flatMap((project) => [
      project.wideCover.src,
      project.cover.src,
    ]),
    ...remaining.map((project) => project.cover.src),
    ...getMasonry().map((item) => item.photo.src),
  ]);

  return home.tiles
    .map((tile) => {
      const photo = pickUnusedProjectPhoto(
        tile.projectDir,
        projectTitle(tile.projectDir),
        claimed,
        "landscape",
      );

      return photo
        ? {
            label: categoryLabels[tile.category],
            href: tile.href,
            photo,
          }
        : null;
    })
    .filter((tile): tile is CategoryTile => tile !== null);
}

/**
 * The masonry's photographs: the strongest images the archive holds across
 * projects, which is the one thing the page shows at this density.
 */
export function getMasonry(): MasonryItem[] {
  return masonryPhotos(MASONRY_COUNT, MASONRY_RANK, projectTitle).map(
    (entry) => ({
      photo: entry.photo,
      projectSlug: projectContent[entry.dir]?.slug ?? entry.dir,
    }),
  );
}

/** Every photograph the landing already shows, by src. */
function landingSources(): Set<string> {
  const { featured, remaining } = getLandingPortfolio();
  return new Set([
    home.hero.image.src,
    ...getTiles().map((tile) => tile.photo.src),
    ...getMasonry().map((item) => item.photo.src),
    ...featured.flatMap((project) => [
      project.wideCover.src,
      project.cover.src,
    ]),
    ...remaining.map((project) => project.cover.src),
  ]);
}

/**
 * The second full-bleed moment's photograph: the strongest landscape image the
 * page is not already showing. Selecting it against what is already on the page
 * is what keeps the band an addition rather than a repeat.
 */
export function getMomentPhoto(): Photo | null {
  return (
    strongestUnusedLandscapePhoto(landingSources(), projectTitle)?.photo ?? null
  );
}

/**
 * The landing view model. Section intros live in src/content/home.ts while their
 * items live in list files, so this is where the two halves are joined.
 */
export function getHomePage(): HomePage {
  return {
    ...home,
    differentiators: { ...home.differentiators, items: differentiators },
    testimonials: { ...home.testimonials, items: testimonials },
  };
}
