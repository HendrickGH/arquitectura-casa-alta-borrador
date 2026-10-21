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
  MaterialSwatch,
  ShowroomStoryScene,
  SpaceDossier,
  MethodologyPhase,
  Photo,
  ProcessStep,
  Project,
  SectionIntro,
  ServiceGroup,
  ServicesPageContent,
  SiteConfig,
  SpaceCard,
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

  const studioInteriors = getProjectPhotos(
    "arquitectura-interiores",
    "Arquitectura de interiores Casa Alta",
  ).filter((p) => p.src !== heroPhoto.src);

  const lifestylePhotos = getProjectPhotos(
    "modelos-mujeres",
    "Showroom de cocinas e interiorismo Casa Alta",
  );

  const banoElBicho = findPhotoByBase(
    "02-el-bicho",
    "05-bano-espejo-redondo-lavabo",
    "El Bicho",
    "Interior de baño residencial con espejo redondo de madera y lavabo de piedra",
  );

  const residentialPhotos = [
    findPhotoByBase(
      "12-vilas-cavan",
      "01-interior-sala-cocina-chimenea",
      "Vilas Cavan",
      "Sala y cocina integradas con chimenea y carpintería residencial",
    ),
    findPhotoByBase(
      "07-casa-tarrastro",
      "02-terraza-celosia-madera-encino",
      "Casa Tarrastro",
      "Galería techada con celosía de madera y cancelería de vidrio",
    ),
    findPhotoByBase(
      "03-casa-blake-tlalixtac",
      "07-corredor-vigas-madera-lamparas",
      "Casa Blake",
      "Corredor residencial con vigas de madera y cancelería",
    ),
    findPhotoByBase(
      "02-el-bicho",
      "04-corredor-madera-vista-mar",
      "El Bicho",
      "Corredor habitable con columnas de madera estructural y vista abierta",
    ),
    findPhotoByBase(
      "12-vilas-cavan",
      "03-sala-ventanal-montana",
      "Vilas Cavan",
      "Estancia residencial con ventanal panorámico hacia montaña",
    ),
    findPhotoByBase(
      "02-el-bicho",
      "03-terraza-hamaca-jardin",
      "El Bicho",
      "Área de descanso y estancia exterior integrada a la arquitectura",
    ),
  ].filter((p): p is Photo => p !== null);

  const interiorsPhotos = [...studioInteriors, ...residentialPhotos];

  const materials: MaterialSwatch[] = interiorsPageContent.materialsMatrix.materials.map(
    (m) => {
      const photo = findPhotoByBase(m.dir, m.base, m.name) ?? heroPhoto;
      return {
        id: m.id,
        name: m.name,
        subtitle: m.subtitle,
        category: m.category,
        description: m.description,
        specs: m.specs,
        photo,
      };
    },
  );

  const spaces: SpaceDossier[] = [];

  // Cocinas (3)
  const cocinaPhotos = studioInteriors.filter(
    (p) =>
      p.src.includes("isla") ||
      p.src.includes("cocina") ||
      p.src.includes("cubierta"),
  );
  cocinaPhotos.slice(0, 3).forEach((photo, idx) => {
    const isComedor = photo.src.includes("comedor");
    const isCubierta = photo.src.includes("cubierta");
    const title = isComedor
      ? "Comedor en madera noble integrado a isla de cocina"
      : isCubierta
        ? "Cubierta continua con veta lineal en piedra noble"
        : "Isla monolítica en piedra sinterizada con parrilla integrada";
    const description = isComedor
      ? "Mesa en tablón continuo de madera tropical ensamblada directamente a la isla, creando una transición fluida entre la zona caliente y la zona de comensales bajo techo de carrizo."
      : isCubierta
        ? "Área de preparación longitudinal con remate de antepecho integrado en una sola pieza de piedra, eliminando esquinas vivas y facilitando el aseo diario."
        : "Isla de gran formato con faldón a 45° en piedra sinterizada de 20 mm, parrilla de cinco quemadores empotrada y módulo para horno bajo cubierta con ventilación perimetral.";
    const specs = isComedor
      ? {
          cubierta: "Tablón de Parota maciza curada con sellado mate grado alimenticio",
          cuerpo: "Estructura interna de acero al carbón con anclaje oculto a losa",
          herrajes: "Herrajes marinos de acero inoxidable AISI 316 resistentes a salitre",
          entrega: "5 a 7 semanas con curado en autoclave y ensamble en sitio",
        }
      : isCubierta
        ? {
            cubierta: "Porcelánico ultracompacto mate con alineación de veta continua",
            cuerpo: "Módulos suspendidos con iluminación LED cálida integrada a 3000K",
            herrajes: "Sistemas elevables Aventos HK y pistones amortiguados",
            entrega: "4 a 5 semanas con levantamiento láser previo",
          }
        : {
            cubierta: "Piedra sinterizada 20 mm con inglete a 45° y veta continua",
            cuerpo: "Tableros hidrófugos de alta densidad en tono grafito mate",
            herrajes: "Guías Blum Tandembox de extracción total (cierre suave 100,000 ciclos)",
            entrega: "4 a 6 semanas desde validación ejecutiva en sitio",
          };

    spaces.push({
      id: `cocina-${idx}`,
      category: "cocinas",
      categoryLabel: "Cocina e isla",
      title,
      materials: isComedor
        ? "Madera de Parota curada · Piedra tecnológica"
        : "Piedra sinterizada ultracompacta · Veta continua",
      description,
      specs,
      photo,
      quoteContext: `Hola Casa Alta, me interesa cotizar un espacio similar a ${title} (Ref: cocina-${idx}). Quisiera coordinar la asesoría técnica gratuita.`,
    });
  });

  // Baños (3)
  const banoStudio = studioInteriors.find(
    (p) => p.src.includes("bano") || p.src.includes("lavabo"),
  );
  if (banoStudio) {
    spaces.push({
      id: "bano-0",
      category: "banos",
      categoryLabel: "Baño residencial",
      title: "Baño contemporáneo en porcelánico con espejo retroiluminado",
      materials: "Porcelánico de gran formato · Espejo perimetral LED",
      description:
        "Recubrimiento de gran formato de piso a techo, espejo circular flotado con encendido perimetral indirecto y cancelería de cristal templado sin perfiles visibles.",
      specs: {
        cubierta: "Porcelánico rectificado antibacteriano y nula absorción de humedad",
        cuerpo: "Mueble vanitory suspendido con acabado en laca poliuretano mate",
        herrajes: "Cajones con recorte sifónico oculto y guías ocultas de extracción",
        entrega: "3 a 4 semanas con trazo hidrosanitario en obra",
      },
      photo: banoStudio,
      quoteContext:
        "Hola Casa Alta, me interesa cotizar un espacio similar al Baño contemporáneo en porcelánico (Ref: bano-0). Quisiera coordinar la asesoría técnica gratuita.",
    });
  }
  if (banoElBicho) {
    spaces.push({
      id: "bano-1",
      category: "banos",
      categoryLabel: "Baño residencial",
      title: "Lavabo artesanal en piedra labrada y espejo de madera",
      materials: "Piedra natural labrada · Madera tropical curada",
      description:
        "Lavamanos monobloque tallado en piedra de río o cantera local, montado sobre meseta de madera tratada para resistir salpicaduras continuas.",
      specs: {
        cubierta: "Piedra natural labrada a mano con sellado hidrofugante nanotecnológico",
        cuerpo: "Repisa estructural en madera tropical dura tratada con cera de abeja",
        herrajes: "Monomando alto de latón macizo acabado negro mate minimalista",
        entrega: "3 a 5 semanas sujeto a labrado artesanal",
      },
      photo: banoElBicho,
      quoteContext:
        "Hola Casa Alta, me interesa cotizar un espacio similar al Lavabo artesanal en piedra (Ref: bano-1). Quisiera coordinar la asesoría técnica gratuita.",
    });
  }
  const banoPunta = findPhotoByBase(
    "10-obra-punta-zicatela",
    "26-bano-exterior-puertas-celosia-bambu-sanitario",
    "Punta Zicatela",
    "Sanitario residencial con cancelería y celosía de madera",
  );
  if (banoPunta) {
    spaces.push({
      id: "bano-2",
      category: "banos",
      categoryLabel: "Baño residencial",
      title: "Sanitario con cancelería de celosía y muros en chukum",
      materials: "Carpintería en celosía · Muros en chukum y piedra",
      description:
        "Espacio con ventilación natural cruzada mediante celosía de madera, muros continuos en acabado chukum hidrófugo y piezas sanitarias suspendidas.",
      specs: {
        cubierta: "Repisa corrida en concreto pulido con sellado epóxico satinado",
        cuerpo: "Mampostería y pastas de cal con pigmentos minerales de la región",
        herrajes: "Cancelería de madera estufada con bisagras de pivote oculto",
        entrega: "4 a 6 semanas integrado a la fase de obra civil",
      },
      photo: banoPunta,
      quoteContext:
        "Hola Casa Alta, me interesa cotizar un espacio similar al Sanitario en celosía y chukum (Ref: bano-2). Quisiera coordinar la asesoría técnica gratuita.",
    });
  }

  // Terrazas (6)
  const terrazaItems = [
    {
      photo: findPhotoByBase(
        "01-plaza-esmeralda-puerto-escondido",
        "02-terraza-anochecer-planta-jardinera",
        "Plaza Esmeralda",
        "Terraza exterior en anochecer con jardineras integradas y deck de madera",
      ),
      title: "Terraza exterior con jardineras integradas y deck de madera",
      materials: "Madera tropical tratada · Iluminación rasante cálida",
      description:
        "Deck exterior resistente a intemperie con jardineras corridas revestidas en madera y luces de cortesía perimetrales para uso nocturno.",
      specs: {
        cubierta: "Deck de Cumarú o Parota tratada con aceites botánicos filtro UV",
        cuerpo: "Bastidor de acero estructural protegido con imprimación anticorrosiva",
        herrajes: "Tornillería oculta de acero inoxidable calidad marina AISI 316",
        entrega: "4 a 6 semanas con habilitado en taller y montaje rápido",
      },
    },
    {
      photo: findPhotoByBase(
        "08-rbnb-palmarito",
        "01-trabajadores-barra-techo-palapa",
        "Palmarito",
        "Barra exterior residencial bajo cubierta de palapa frente al mar",
      ),
      title: "Barra exterior y cubierta de palapa frente al mar",
      materials: "Concreto aparente · Madera de zapote y palma tejida",
      description:
        "Barra de servicio para asador y coctelería exterior, protegida de la radiación solar directa por una armadura artesanal de palma tejida.",
      specs: {
        cubierta: "Superficie de cuarzo o granito cepillado de 20 mm resistente a UV",
        cuerpo: "Mampostería de concreto aparente con sellado marino antihumedad",
        herrajes: "Puertas inferiores con ventilación cruzada y cerrojos inoxidables",
        entrega: "4 a 5 semanas en coordinación con la palapa",
      },
    },
    {
      photo: findPhotoByBase(
        "01-plaza-esmeralda-puerto-escondido",
        "07-terraza-madera-cristal-ciudad",
        "Plaza Esmeralda",
        "Terraza exterior con piso de madera y barandal de cristal templado",
      ),
      title: "Terraza apergolada con barandal de cristal templado",
      materials: "Madera estructural · Cristal templado con herrajes marinos",
      description:
        "Área apergolada con vistas despejadas, piso de madera de tráfico pesado y barandal de seguridad en vidrio templado sin postes verticales invasivos.",
      specs: {
        cubierta: "Pergolado de vigas de madera dura regional estufada",
        cuerpo: "Pilares de acero estructural con acabado electrostático negro",
        herrajes: "Botones de sujeción para cristal templado de 10 mm en acero inoxidable",
        entrega: "3 a 5 semanas con cálculo de resistencia al viento",
      },
    },
    {
      photo: findPhotoByBase(
        "08-rbnb-palmarito",
        "02-cielo-palapa-barra-mar",
        "Palmarito",
        "Barra de convivencia exterior bajo cubierta de palapa con vista al mar",
      ),
      title: "Barra de convivencia exterior bajo cubierta natural",
      materials: "Superficie de alta resistencia · Estructura de madera tropical",
      description:
        "Estación de bar exterior con contrabarra y conexión eléctrica para enfriadores de bebidas, diseñada para resistir el rocío salino permanente.",
      specs: {
        cubierta: "Placa pétrea sellada resistente a grasa, alcohol y ácidos de cítricos",
        cuerpo: "Estructura de troncos curados al vacío contra insectos xilófagos",
        herrajes: "Conectores marinos para intemperie y cajas eléctricas herméticas IP66",
        entrega: "4 a 6 semanas",
      },
    },
    {
      photo: findPhotoByBase(
        "02-el-bicho",
        "01-fachada-tres-palapas-alberca",
        "El Bicho",
        "Terraza y deck de madera frente a alberca con vista al horizonte",
      ),
      title: "Deck de madera y alberca frente al horizonte",
      materials: "Deck de madera tropical · Alberca integrada",
      description:
        "Plataforma de asoleadero en madera de grano cerrado que no transmite exceso de calor a los pies descalzos y canaliza el agua pluvial hacia drenes perimetrales.",
      specs: {
        cubierta: "Madera tropical de alta densidad resistente a inmersión y salinidad",
        cuerpo: "Subestructura ventilada con canaletas de desagüe rápido",
        herrajes: "Fijación mediante clip oculto sin perforaciones vistas en superficie",
        entrega: "4 a 6 semanas",
      },
    },
    {
      photo: findPhotoByBase(
        "01-plaza-esmeralda-puerto-escondido",
        "30-iluminacion-rasante-muro-terraza-anochecer",
        "Plaza Esmeralda",
        "Terraza lounge con iluminación rasante cálida en muro perimetral",
      ),
      title: "Terraza lounge con iluminación rasante cálida",
      materials: "Concreto aparente · Iluminación rasante en muro",
      description:
        "Muros perimetrales con acabado mineral continuo y luminarias de piso empotradas que resaltan la textura de la piedra durante el atardecer.",
      specs: {
        cubierta: "Muros texturizados en acabado mineral artesanal concha nácar",
        cuerpo: "Concreto desbastado y jardineras perimetrales de absorción",
        herrajes: "Luminarias rasantes LED con driver remoto y protección IP67",
        entrega: "3 a 4 semanas",
      },
    },
  ];
  terrazaItems.forEach((item, idx) => {
    if (item.photo) {
      spaces.push({
        id: `terraza-${idx}`,
        category: "terrazas",
        categoryLabel: "Terrazas y barras exteriores",
        title: item.title,
        materials: item.materials,
        description: item.description,
        specs: item.specs,
        photo: item.photo,
        quoteContext: `Hola Casa Alta, me interesa cotizar una terraza o barra similar a ${item.title} (Ref: terraza-${idx}). Quisiera coordinar la asesoría técnica gratuita.`,
      });
    }
  });

  // Interiores (3)
  const interioresStudio = studioInteriors.filter(
    (p) =>
      !p.src.includes("bano") &&
      !p.src.includes("lavabo") &&
      !p.src.includes("isla") &&
      !p.src.includes("cocina") &&
      !p.src.includes("cubierta"),
  );
  interioresStudio.slice(0, 2).forEach((photo, idx) => {
    const isGaleria = photo.src.includes("galeria");
    const title = isGaleria
      ? "Pasillo galería con muro terracota y aplique de luz"
      : "Comedor residencial en parota con vista a jardín";
    const description = isGaleria
      ? "Circulación interior con muro de acento en pigmento mineral terracota, iluminación indirecta dirigida y remate visual en vegetación exterior."
      : "Mesa de comedor de ocho plazas en madera maciza de parota, concebida para articular la estancia principal con el jardín interior.";
    const specs = isGaleria
      ? {
          cubierta: "Muros en pasta mineral terracota con textura artesanal",
          cuerpo: "Paneles con refuerzo acústico y aislamiento térmico interior",
          herrajes: "Rieles de iluminación empotrados a ras de plafón",
          entrega: "2 a 3 semanas",
        }
      : {
          cubierta: "Tablón macizo de Parota con borde vivo natural y sellado mate",
          cuerpo: "Base monolítica en madera y acero con refuerzo antisísmico",
          herrajes: "Niveladores ocultos de alta resistencia a torsión",
          entrega: "4 a 5 semanas",
        };

    spaces.push({
      id: `interior-${idx}`,
      category: "interiores",
      categoryLabel: "Estancias y comedores",
      title,
      materials: isGaleria
        ? "Pasta mineral terracota · Apliques de luz cálida"
        : "Madera tropical certificada · Acabado concha nácar",
      description,
      specs,
      photo,
      quoteContext: `Hola Casa Alta, me interesa cotizar un espacio interior similar a ${title} (Ref: interior-${idx}). Quisiera coordinar la asesoría técnica gratuita.`,
    });
  });
  const escaleraTarrastro = findPhotoByBase(
    "07-casa-tarrastro",
    "09-escalera-interior-barandal-geometrico-doble-altura",
    "Casa Tarrastro",
    "Escalera interior en doble altura con porcelánico gris y herrería geométrica",
  );
  if (escaleraTarrastro) {
    spaces.push({
      id: "interior-2",
      category: "interiores",
      categoryLabel: "Estancias y comedores",
      title: "Escalera en doble altura con barandal de diseño",
      materials: "Porcelánico de gran formato · Herrería contemporánea y luz cenital",
      description:
        "Núcleo vertical en doble altura con peldaños monolíticos en porcelánico de alta resistencia al desgaste y barandal escultural en herrería negra mate.",
      specs: {
        cubierta: "Huellas en porcelánico rectificado de gran formato con canto pulido",
        cuerpo: "Estructura de concreto armado con luz de cortesía en zoclo",
        herrajes: "Barandal de diseño continuo en herrería electropintada sin tornillos visibles",
        entrega: "3 a 5 semanas con trazo geométrico en sitio",
      },
      photo: escaleraTarrastro,
      quoteContext:
        "Hola Casa Alta, me interesa cotizar un espacio similar a la Escalera en doble altura (Ref: interior-2). Quisiera coordinar la asesoría técnica gratuita.",
    });
  }

  // Showroom (3)
  const showroomPhotos = lifestylePhotos.slice(0, 3);
  showroomPhotos.forEach((photo, idx) => {
    const title =
      idx === 0
        ? "Isla central en cuarzo negro con iluminación lineal suspendida"
        : idx === 1
          ? "Barra contemporánea con mobiliario negro mate y barra desayunadora"
          : "Torre de alacena extraíble y cocina integral en showroom";
    const description =
      idx === 0
        ? "Espacio de interacción social alrededor de una isla de cuarzo de gran escala, diseñada para cocinar y convivir sin barreras visuales."
        : idx === 1
          ? "Módulos de cocina en acabado negro mate antihuella, integrados con barra de madera cálida para desayunos informales."
          : "Módulo despensero de columna alta con herrajes cromados de extracción total y gavetas interiores de apertura suave.";
    const specs =
      idx === 0
        ? {
            cubierta: "Cuarzo negro de importación con veta lineal continua",
            cuerpo: "Gabinetes en melamina hidrófuga acabado carbón mate",
            herrajes: "Sistemas push-to-open y cierre amortiguado Blum",
            entrega: "4 a 6 semanas",
          }
        : idx === 1
          ? {
              cubierta: "Cuarzo de alta densidad con cantos biselados a 45°",
              cuerpo: "Armarios de piso a techo con iluminación LED indirecta a 3000K",
              herrajes: "Bisagras Clip Top Blumotion 110° niqueladas",
              entrega: "4 a 6 semanas",
            }
          : {
              cubierta: "Módulos verticales en negro mate anti-huella digital",
              cuerpo: "Estructura modular con divisores internos regulables",
              herrajes: "Mecanismo extraíble cromado de 5 niveles con amortiguación hidráulica",
              entrega: "4 a 6 semanas",
            };

    spaces.push({
      id: `showroom-${idx}`,
      category: "showroom",
      categoryLabel: "Showroom y convivencia",
      title,
      materials: "Cuarzo de importación · Mobiliario negro mate y herrajes Blum",
      description,
      specs,
      photo,
      quoteContext: `Hola Casa Alta, me interesa cotizar un espacio similar a ${title} (Ref: showroom-${idx}). Quisiera coordinar la asesoría técnica gratuita.`,
    });
  });

  const showroomScenes: ShowroomStoryScene[] =
    interiorsPageContent.showroomStory.scenes.map((s) => {
      const primaryPhoto =
        findPhotoByBase(s.primaryDir, s.primaryBase, s.title) ?? heroPhoto;
      const secondaryPhoto =
        s.secondaryDir && s.secondaryBase
          ? findPhotoByBase(s.secondaryDir, s.secondaryBase, s.subtitle) ?? undefined
          : undefined;
      return {
        id: s.id,
        number: s.number,
        title: s.title,
        subtitle: s.subtitle,
        description: s.description,
        highlights: s.highlights,
        primaryPhoto,
        secondaryPhoto,
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
    materialsMatrix: {
      eyebrow: interiorsPageContent.materialsMatrix.eyebrow,
      heading: interiorsPageContent.materialsMatrix.heading,
      body: interiorsPageContent.materialsMatrix.body,
      materials,
    },
    inspiration: {
      ...interiorsPageContent.inspiration,
      spaces,
    },
    engineeringGuarantee: interiorsPageContent.engineeringGuarantee,
    showroomStory: {
      eyebrow: interiorsPageContent.showroomStory.eyebrow,
      heading: interiorsPageContent.showroomStory.heading,
      body: interiorsPageContent.showroomStory.body,
      scenes: showroomScenes,
    },
    estimator: interiorsPageContent.estimator,
    surfaces: interiorsPageContent.surfaces,
    interiorsGalleryIntro: interiorsPageContent.interiorsGalleryIntro,
    interiorsPhotos,
    lifestyleIntro: interiorsPageContent.lifestyleIntro,
    lifestylePhotos,
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


