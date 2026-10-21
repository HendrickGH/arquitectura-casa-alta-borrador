import { site, whatsappHref } from "@/content/site";
import { serviceGroups } from "@/content/services";
import { editorialRefs } from "@/content/editorial";
import { home } from "@/content/home";
import { processSteps } from "@/content/process";
import { differentiators } from "@/content/differentiators";
import {
  institutionalDossiers,
  testimonials,
} from "@/content/testimonials";
import {
  aboutPageContent,
  contactPageContent,
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
  pickUnusedProjectPhoto,
  strongestUnusedLandscapePhoto,
} from "./photos";
import type {
  AboutPageContent,
  CategoryTile,
  ContactFormContent,
  ContactPageContent,
  Differentiator,
  DivisionCard,
  HomePage,
  InteriorsPageContent,
  SpecialtySection,
  MethodologyPhase,
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
  return {
    ...site,
    contactForm: home.contact,
  };
}

export function getContactFormContent(): ContactFormContent {
  return home.contact;
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
      item.photo ??
      (item.dir && item.base
        ? (findPhotoByBase(item.dir, item.base, item.title) ?? undefined)
        : undefined),
  }));
}

export function getTestimonials(): Testimonial[] {
  return testimonials;
}

function buildProject(dir: string): Project | null {
  const editorial = projectContent[dir];
  const manifestProject = findManifestProject(dir);
  if (!editorial || !manifestProject) return null;

  const title = editorial.title ?? "";
  const gallery = getProjectGallery(
    dir,
    title,
    editorial.images ?? [],
  );

  // The curated lead photo is the primary photo chosen for this project (first in gallery).
  const curatedCover = gallery[0] ?? null;
  const cover = curatedCover ?? getProjectCover(dir, title);
  if (!cover) return null;

  // The curated lead photo is the authoritative cover for both monograph card preview and dossier modal lead.
  const wideCover =
    curatedCover ?? getProjectCover(dir, title, "landscape") ?? cover;

  return {
    ...editorial,
    cover,
    wideCover,
    gallery,
    photos: getProjectPhotos(dir, title),
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

/** Four flagship projects lead the landing showcase (`01 / 04`). */
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
 * The four vertical division cards on the landing page.
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
  const diffIntro =
    home.differentiatorsIntro ?? home.differentiators.intro;

  return {
    ...home,
    differentiatorsIntro: diffIntro,
    differentiators: {
      ...home.differentiators,
      intro: diffIntro,
      items: getDifferentiators(),
    },
    testimonials: {
      ...home.testimonials,
      items: testimonials,
      dossiers: institutionalDossiers,
    },
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

  // 1. Materials for SpecialtiesShowcase
  const materialSections: SpecialtySection[] =
    interiorsPageContent.materials.sections.map((m) => {
      const photo =
        findPhotoByBase(m.dir, m.base, m.title) ?? heroPhoto;
      return {
        slug: m.slug,
        number: m.number,
        title: m.title,
        shortTitle: m.shortTitle,
        subtitle: m.subtitle,
        description: m.description,
        deliverables: m.deliverables,
        photo,
        photos: [photo],
      };
    });

  // 2. Manifesto photo
  const manifestoPhoto =
    findPhotoByBase(
      interiorsPageContent.manifesto.dir,
      interiorsPageContent.manifesto.base,
      "Manifiesto de interiores",
    ) ?? heroPhoto;

  // 3. Interior Projects for FeaturedPortfolio
  const interiorsProject = getProject("arquitectura-interiores");
  const vilasCavan = getProject("vilas-cavan");
  const cafeMalagua = getProject("cafe-malagua");
  const casaCharcoSeco = getProject("casa-charco-seco");
  const casaBlake = getProject("casa-blake-tlalixtac");
  const puntaZicatela = getProject("obra-punta-zicatela");

  const interiorProjects = [
    interiorsProject,
    vilasCavan,
    cafeMalagua,
    casaCharcoSeco,
    casaBlake,
    puntaZicatela,
  ].filter((p): p is Project => p !== null);

  const featured = interiorProjects.slice(0, 4);
  const remaining = interiorProjects.slice(4);

  // 4. Engineering Pillars for WhyCasaAltaEditorial
  const engineeringItems: Differentiator[] =
    interiorsPageContent.engineering.items.map((item) => {
      const photo =
        item.dir && item.base
          ? findPhotoByBase(item.dir, item.base, item.title) ?? undefined
          : undefined;
      return {
        title: item.title,
        description: item.description,
        tag: item.tag,
        points: item.points,
        photo,
      };
    });

  return {
    hero: {
      eyebrow: interiorsPageContent.hero.eyebrow,
      heading: interiorsPageContent.hero.heading,
      subheadline: interiorsPageContent.hero.subheadline,
      photo: heroPhoto,
      catalogCtaLabel: interiorsPageContent.hero.catalogCtaLabel,
      consultationCtaLabel: interiorsPageContent.hero.consultationCtaLabel,
    },
    materials: {
      eyebrow: interiorsPageContent.materials.eyebrow,
      heading: interiorsPageContent.materials.heading,
      body: interiorsPageContent.materials.body,
      sections: materialSections,
    },
    manifesto: {
      text: interiorsPageContent.manifesto.text,
      photo: manifestoPhoto,
    },
    portfolio: {
      intro: interiorsPageContent.portfolio.intro,
      featured,
      remaining,
    },
    engineering: {
      intro: interiorsPageContent.engineering.intro,
      items: engineeringItems,
    },
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

  const rawBioclimatic = getProjectPhotos(
    "arquitectura-sostenible",
    "Arquitectura sostenible Casa Alta",
  );

  // Exclude the lead photo used in the narrative column, yielding exactly 12 gallery photos
  // (4 complete rows of 3 on desktop, 6 complete rows of 2 on tablet, 0 orphans).
  const narrativePhoto = rawBioclimatic[0];
  const bioclimaticPhotos = rawBioclimatic.slice(1, 13);

  // Exclude photo 18 (superimposed marketing text, Score 3★) and cap at exactly 12 top-tier Score 5★ photos
  // (4 complete rows of 3 on desktop, 6 complete rows of 2 on tablet, 0 orphans).
  const rawEnduring = getProjectPhotos(
    "arquitectura-que-perdura",
    "Arquitectura que perdura Casa Alta",
  );
  const enduringPhotos = rawEnduring
    .filter(
      (p) =>
        !p.src.includes("18-cartel-construye-puerto-escondido") &&
        !p.src.includes("cartel-construye"),
    )
    .slice(0, 12);

  return {
    hero: {
      eyebrow: sustainabilityPageContent.hero.eyebrow,
      heading: sustainabilityPageContent.hero.heading,
      subheadline: sustainabilityPageContent.hero.subheadline,
      photo: heroPhoto,
    },
    narrative: {
      ...sustainabilityPageContent.narrative,
      photo: narrativePhoto,
    },
    pillars: sustainabilityPageContent.pillars,
    bioclimaticGalleryIntro: sustainabilityPageContent.bioclimaticGalleryIntro,
    bioclimaticPhotos,
    enduringGalleryIntro: sustainabilityPageContent.enduringGalleryIntro,
    enduringPhotos,
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

  const methodology: MethodologyPhase[] = aboutPageContent.methodology.map(
    (phase) => ({
      number: phase.number,
      kicker: phase.kicker,
      title: phase.title,
      description: phase.description,
      deliverable: phase.deliverable,
      photo:
        findPhotoByBase(phase.dir, phase.base, "", phase.photoAlt) ?? {
          src: `/images/${phase.dir}/${phase.base}.avif`,
          alt: phase.photoAlt,
          width: 1200,
          height: 800,
        },
    }),
  );

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
    methodologyIntro: aboutPageContent.methodologyIntro,
    methodology,
    enduringIntro: aboutPageContent.enduringIntro,
    enduringPhotos: getProjectPhotos(
      "arquitectura-que-perdura",
      "Arquitectura que perdura Casa Alta",
    ).slice(0, 8),
  };
}

export function getMethodologyPhases(): MethodologyPhase[] {
  return getAboutPage().methodology;
}

export function getServicesPage(): ServicesPageContent {
  const heroPhoto =
    findPhotoByBase(
      servicesPageContent.hero.dir,
      servicesPageContent.hero.base,
      "Ingeniería civil y construcción",
    ) ??
    getProjectCover(servicesPageContent.hero.dir, "Ingeniería civil Casa Alta")!;

  const introPhoto =
    findPhotoByBase(
      servicesPageContent.intro.dir,
      servicesPageContent.intro.base,
      "Ingeniería y proyecto ejecutivo en gabinete",
    ) ?? undefined;

  // Track used photos on the services page so specialty galleries don't duplicate
  // the hero or the service catalogue cards.
  const used = new Set<string>([
    heroPhoto.src,
    ...(introPhoto ? [introPhoto.src] : []),
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
    intro: {
      eyebrow: servicesPageContent.intro.eyebrow,
      heading: servicesPageContent.intro.heading,
      body: servicesPageContent.intro.body,
      photo: introPhoto,
      photoCaption: servicesPageContent.intro.photoCaption,
    },
    catalog: servicesPageContent.catalog,
    specialties: {
      eyebrow: servicesPageContent.specialties.eyebrow,
      heading: servicesPageContent.specialties.heading,
      body: servicesPageContent.specialties.body,
      deliverablesLabel: servicesPageContent.specialties.deliverablesLabel,
      ctaLabel: servicesPageContent.specialties.ctaLabel,
      ctaHref: servicesPageContent.specialties.ctaHref,
      closeLabel: servicesPageContent.specialties.closeLabel,
      sections: servicesPageContent.specialties.sections.map((section) => {
        const photo =
          findPhotoByBase(section.dir, section.base, section.title) ??
          getProjectCover(section.dir, section.title)!;
        used.add(photo.src);
        return {
          slug: section.slug,
          number: section.number,
          title: section.title,
          shortTitle: section.shortTitle,
          subtitle: section.subtitle,
          description: section.description,
          deliverables: section.deliverables,
          photo,
          photos: [photo],
        };
      }),
    },
  };
}

export function getContactPage(): ContactPageContent {
  const heroPhoto =
    findPhotoByBase(
      contactPageContent.hero.dir,
      contactPageContent.hero.base,
      "Gabinete de Arquitectura",
      contactPageContent.hero.photoAlt,
    ) ??
    getProjectCover(
      contactPageContent.hero.dir,
      contactPageContent.hero.photoAlt,
    )!;

  const formPhoto = undefined;

  const stagePhoto =
    findPhotoByBase(
      contactPageContent.stage.dir,
      contactPageContent.stage.base,
      "El Bicho",
      contactPageContent.stage.photoAlt,
    ) ??
    getProjectCover(
      contactPageContent.stage.dir,
      contactPageContent.stage.photoAlt,
    )!;

  return {
    hero: {
      eyebrow: contactPageContent.hero.eyebrow,
      heading: contactPageContent.hero.heading,
      subheadline: contactPageContent.hero.subheadline,
      photo: heroPhoto,
    },
    contactForm: contactPageContent.contactForm,
    formPhoto,
    stage: {
      heading: contactPageContent.stage.heading,
      body: contactPageContent.stage.body,
      photo: stagePhoto,
      phonesLabel: contactPageContent.stage.phonesLabel,
      scheduleLabel: contactPageContent.stage.scheduleLabel,
      mapNote: contactPageContent.stage.mapNote,
      whatsappCta: contactPageContent.stage.whatsappCta,
      consultationCta: contactPageContent.stage.consultationCta,
      mapsCta: contactPageContent.stage.mapsCta,
    },
    address: contactPageContent.address,
    phones: contactPageContent.phones,
    schedule: contactPageContent.schedule,
    email: contactPageContent.email,
    whatsappPrefill: contactPageContent.whatsappPrefill,
    heading: contactPageContent.stage.heading,
    body: contactPageContent.stage.body,
    photo: stagePhoto,
  };
}


