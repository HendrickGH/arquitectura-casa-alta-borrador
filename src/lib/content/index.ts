import { site } from "@/content/site";
import { serviceGroups } from "@/content/services";
import { home } from "@/content/home";
import { processSteps } from "@/content/process";
import { differentiators } from "@/content/differentiators";
import { testimonials } from "@/content/testimonials";
import { featuredProjectDirs, projectContent } from "@/content/projects";
import {
  findManifestProject,
  getProjectCover,
  getProjectPhotoCount,
  getProjectPhotos,
} from "./photos";
import type {
  Differentiator,
  HomePage,
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
