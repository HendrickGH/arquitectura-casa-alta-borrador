import { site, whatsappHref } from "@/content/site";
import { serviceGroups } from "@/content/services";
import { editorialRefs } from "@/content/editorial";
import { home } from "@/content/home";
import { processSteps } from "@/content/process";
import { differentiators } from "@/content/differentiators";
import { testimonials } from "@/content/testimonials";
import { masonrySlots } from "@/content/masonry";
import {
  aboutPageContent,
  interiorsPageContent,
  servicesPageContent,
  sustainabilityPageContent,
} from "@/content/pages";
import {
  categoryLabels,
  featuredProjectDirs,
  projectContent,
} from "@/content/projects";
import {
  findManifestProject,
  findPhotoByBase,
  getProjectCover,
  getProjectGallery,
  getProjectPhotoCount,
  getProjectPhotos,
  masonryPhotos,
  pickUnusedProjectPhoto,
  strongestUnusedLandscapePhoto,
} from "./photos";
import type {
  AboutPageContent,
  CategoryTile,
  Differentiator,
  DivisionCard,
  HomePage,
  InteriorsPageContent,
  MasonryItem,
  Photo,
  ProcessStep,
  Project,
  SectionIntro,
  ServiceGroup,
  ServicesPageContent,
  SiteConfig,
  SustainabilityPageContent,
  Testimonial,
} from "@/types/content";

/**
 * THE CONTENT SEAM.
 *
 * Pages call these functions. Components never call them -- they receive the
 * results as props. That means introducing Payload CMS later is a change to
 * this file alone: every function below becomes an async read from Payload, the
 * return types stay identical, and no component or page needs to be touched.
 */

export function getSiteConfig(): SiteConfig {
  return site;
}

/**
 * The primary WhatsApp target. Passed to components as a prop so no component
 * ever reaches into src/content for it -- the seam stays the only reader.
 */
export function getWhatsappHref(): string {
  return whatsappHref;
}

/**
 * The photograph attached to each service, keyed by service slug.
 *
 * Resolves 100% from real studio photographs in `manifest.json` — zero stock
 * images are ever used.
 */
export function getEditorial(): Map<string, Photo> {
  const byService = new Map<string, Photo>();
  for (const ref of editorialRefs) {
    if (ref.dir && ref.base) {
      const studioPhoto = findPhotoByBase(ref.dir, ref.base, "", ref.alt);
      if (studioPhoto) {
        byService.set(ref.service, studioPhoto);
      }
    }
  }
  return byService;
}

/**
 * The catalogue with each service's photograph attached.
 */
export function getServiceGroups(): ServiceGroup[] {
  const editorial = getEditorial();
  return serviceGroups.map((group) => ({
    ...group,
    services: group.services.map((service) => ({
      ...service,
      image: editorial.get(service.slug) ?? null,
    })),
  }));
}

export function getProcessSteps(): ProcessStep[] {
  return processSteps.map((step) => ({
    ...step,
    photo:
      step.dir && step.base
        ? (findPhotoByBase(step.dir, step.base, step.title) ?? undefined)
        : undefined,
  }));
}

export function getDifferentiators(): Differentiator[] {
  return differentiators.map((item) => ({
    ...item,
    photo:
      item.dir && item.base
        ? (findPhotoByBase(item.dir, item.base, item.title) ?? undefined)
        : undefined,
  }));
}

export function getTestimonials(): Testimonial[] {
  return testimonials;
}

function buildProject(dir: string): Project | null {
  const editorial = projectContent[dir];
  const manifestProject = findManifestProject(dir);
  const cover = getProjectCover(dir, editorial?.title ?? "");

  if (!editorial || !manifestProject || !cover) return null;

  return {
    ...editorial,
    cover,
    wideCover: getProjectCover(dir, editorial.title, "landscape") ?? cover,
    gallery: getProjectGallery(
      dir,
      editorial?.title ?? "",
      editorial?.images ?? [],
    ),
    photos: getProjectPhotos(dir, editorial.title),
    photoCount: getProjectPhotoCount(dir),
  };
}

/** Every project that has both editorial data and photographs, in pipeline order. */
export function getProjects(): Project[] {
  return Object.keys(projectContent)
    .sort(
      (dirA, dirB) =>
        Number(findManifestProject(dirA)?.order ?? 0) -
        Number(findManifestProject(dirB)?.order ?? 0),
    )
    .map(buildProject)
    .filter((project): project is Project => project !== null);
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

/** Four flagship projects lead the landing showcase (`[01] / [04]`). */
const FEATURED_COUNT = 4;

/** A project's display title, for the alt text the manifest cannot supply. */
function projectTitle(dir: string): string {
  return projectContent[dir]?.title ?? "";
}

/**
 * The landing's portfolio, split into the four flagship projects and the
 * continuation grid under them.
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
 * The four vertical division cards on the landing page (Thirdway expandable
 * card pattern).
 */
export function getDivisionCards(): DivisionCard[] {
  return home.divisions
    .map((item) => {
      const photo =
        findPhotoByBase(item.dir, item.base, item.title) ??
        getProjectCover(item.dir, item.title);
      if (!photo) return null;
      return {
        number: item.number,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        href: item.href,
        photo,
      };
    })
    .filter((card): card is DivisionCard => card !== null);
}

/**
 * The category tiles below the hero.
 */
export function getTiles(): CategoryTile[] {
  const { featured, remaining } = getLandingPortfolio();
  const divisions = getDivisionCards();
  const claimed = new Set<string>([
    ...home.hero.slides.map((slide) => slide.photo.src),
    ...(home.intro.photo ? [home.intro.photo.src] : []),
    ...divisions.map((card) => card.photo.src),
    ...featured.flatMap((project) => project.gallery.map((photo) => photo.src)),
    ...remaining.flatMap((project) =>
      project.gallery.map((photo) => photo.src),
    ),
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
 * projects, in the wall's authored order.
 */
export function getMasonry(): MasonryItem[] {
  return masonryPhotos(masonrySlots, projectTitle).map((entry) => ({
    photo: entry.photo,
    projectSlug: projectContent[entry.dir]?.slug ?? entry.dir,
  }));
}

/** Every photograph the landing already shows, by src. */
function landingSources(): Set<string> {
  const { featured, remaining } = getLandingPortfolio();
  const groups = getServiceGroups();
  const divisions = getDivisionCards();
  const steps = getProcessSteps();
  const diffs = getDifferentiators();
  return new Set([
    ...home.hero.slides.map((slide) => slide.photo.src),
    ...(home.intro.photo ? [home.intro.photo.src] : []),
    ...(home.intro.secondaryPhoto ? [home.intro.secondaryPhoto.src] : []),
    ...(home.manifestoPhoto ? [home.manifestoPhoto.src] : []),
    ...(home.contactPhoto ? [home.contactPhoto.src] : []),
    ...divisions.map((card) => card.photo.src),
    ...steps.flatMap((s) => (s.photo ? [s.photo.src] : [])),
    ...diffs.flatMap((d) => (d.photo ? [d.photo.src] : [])),
    ...featured.flatMap((project) => project.gallery.map((photo) => photo.src)),
    ...remaining.flatMap((project) =>
      project.gallery.map((photo) => photo.src),
    ),
    ...groups.flatMap((g) =>
      g.services.flatMap((s) => (s.image ? [s.image.src] : [])),
    ),
    ...getTiles().map((tile) => tile.photo.src),
    ...getMasonry().map((item) => item.photo.src),
  ]);
}

/**
 * The second full-bleed moment's photograph: the strongest landscape image the
 * page is not already showing.
 */
export function getMomentPhoto(): Photo | null {
  return (
    strongestUnusedLandscapePhoto(landingSources(), projectTitle)?.photo ?? null
  );
}

/**
 * The intro the projects index opens with. Reuses the landing's own portfolio
 * intro rather than restating it, so the two surfaces cannot drift apart.
 */
export function getProjectsIntro(): SectionIntro {
  return home.projects;
}

/** The closing call to action, shared by the landing and the projects index. */
export function getClosing(): HomePage["closing"] {
  return home.closing;
}

/**
 * The landing view model.
 */
export function getHomePage(): HomePage {
  return {
    ...home,
    differentiators: {
      ...home.differentiators,
      items: getDifferentiators(),
    },
    testimonials: { ...home.testimonials, items: testimonials },
  };
}

/* ---------- dedicated routes ---------- */

export function getInteriorsPage(): InteriorsPageContent {
  const heroPhoto =
    findPhotoByBase(
      interiorsPageContent.hero.dir,
      interiorsPageContent.hero.base,
      "Arquitectura de interiores",
    ) ??
    getProjectCover(interiorsPageContent.hero.dir, "Arquitectura de interiores")!;

  return {
    hero: {
      eyebrow: interiorsPageContent.hero.eyebrow,
      heading: interiorsPageContent.hero.heading,
      subheadline: interiorsPageContent.hero.subheadline,
      photo: heroPhoto,
    },
    cosentino: interiorsPageContent.cosentino,
    interiorsGalleryIntro: interiorsPageContent.interiorsGalleryIntro,
    interiorsPhotos: getProjectPhotos(
      "arquitectura-interiores",
      "Arquitectura de interiores Casa Alta",
    ).filter((p) => p.src !== heroPhoto.src),
    lifestyleIntro: interiorsPageContent.lifestyleIntro,
    lifestylePhotos: getProjectPhotos(
      "modelos-mujeres",
      "Showroom de cocinas e interiorismo Casa Alta",
    ),
  };
}

export function getSustainabilityPage(): SustainabilityPageContent {
  const heroPhoto =
    findPhotoByBase(
      sustainabilityPageContent.hero.dir,
      sustainabilityPageContent.hero.base,
      "Construcción sustentable",
    ) ??
    getProjectCover(
      sustainabilityPageContent.hero.dir,
      "Construcción sustentable",
    )!;

  return {
    hero: {
      eyebrow: sustainabilityPageContent.hero.eyebrow,
      heading: sustainabilityPageContent.hero.heading,
      subheadline: sustainabilityPageContent.hero.subheadline,
      photo: heroPhoto,
    },
    narrative: sustainabilityPageContent.narrative,
    pillars: sustainabilityPageContent.pillars,
    bioclimaticGalleryIntro: sustainabilityPageContent.bioclimaticGalleryIntro,
    bioclimaticPhotos: getProjectPhotos(
      "arquitectura-sostenible",
      "Arquitectura sostenible Casa Alta",
    ).filter((p) => p.src !== heroPhoto.src),
    enduringGalleryIntro: sustainabilityPageContent.enduringGalleryIntro,
    enduringPhotos: getProjectPhotos(
      "arquitectura-que-perdura",
      "Arquitectura que perdura Casa Alta",
    ),
  };
}

export function getAboutPage(): AboutPageContent {
  const heroPhoto =
    findPhotoByBase(
      aboutPageContent.hero.dir,
      aboutPageContent.hero.base,
      "Credibilidad y supervisión en obra",
    ) ??
    getProjectCover(aboutPageContent.hero.dir, "Supervisión Casa Alta")!;

  return {
    hero: {
      eyebrow: aboutPageContent.hero.eyebrow,
      heading: aboutPageContent.hero.heading,
      subheadline: aboutPageContent.hero.subheadline,
      photo: heroPhoto,
    },
    story: aboutPageContent.story,
    credibilityIntro: aboutPageContent.credibilityIntro,
    credibilityHighlights: aboutPageContent.credibilityHighlights,
    credibilityPhotos: getProjectPhotos(
      "credibilidad",
      "Equipo y supervisión Casa Alta",
    ).filter((p) => p.src !== heroPhoto.src),
    enduringIntro: aboutPageContent.enduringIntro,
    enduringPhotos: getProjectPhotos(
      "arquitectura-que-perdura",
      "Arquitectura que perdura Casa Alta",
    ).slice(0, 8),
  };
}

export function getServicesPage(): ServicesPageContent {
  const heroPhoto =
    findPhotoByBase(
      servicesPageContent.hero.dir,
      servicesPageContent.hero.base,
      "Ingeniería civil y construcción",
    ) ??
    getProjectCover(servicesPageContent.hero.dir, "Ingeniería civil Casa Alta")!;

  // Track used photos on the services page so specialty galleries don't duplicate
  // the hero or the service catalogue cards.
  const used = new Set<string>([
    heroPhoto.src,
    ...getServiceGroups().flatMap((g) =>
      g.services.flatMap((s) => (s.image ? [s.image.src] : [])),
    ),
  ]);

  return {
    hero: {
      eyebrow: servicesPageContent.hero.eyebrow,
      heading: servicesPageContent.hero.heading,
      subheadline: servicesPageContent.hero.subheadline,
      photo: heroPhoto,
    },
    intro: servicesPageContent.intro,
    specialties: {
      eyebrow: servicesPageContent.specialties.eyebrow,
      heading: servicesPageContent.specialties.heading,
      body: servicesPageContent.specialties.body,
      sections: servicesPageContent.specialties.sections.map((section) => {
        const allPhotos = getProjectPhotos(section.dir, section.title);
        const filtered = allPhotos.filter((p) => !used.has(p.src));
        const selected = (filtered.length > 0 ? filtered : allPhotos).slice(
          0,
          section.maxPhotos,
        );
        for (const p of selected) used.add(p.src);
        return {
          slug: section.slug,
          number: section.number,
          title: section.title,
          subtitle: section.subtitle,
          description: section.description,
          deliverables: section.deliverables,
          photos: selected,
        };
      }),
    },
  };
}

