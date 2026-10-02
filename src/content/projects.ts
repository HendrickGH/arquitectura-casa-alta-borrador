import type { Project, ProjectCategory } from "@/types/content";

/**
 * EDITORIAL project data.
 *
 * ---------------------------------------------------------------------------
 * READ THIS BEFORE ADDING A PROJECT
 *
 * images-optimizado/manifest.json carries ordering, slugs, per-photo notes and
 * dimensions -- and no narrative. The pipeline drops the display names during
 * normalisation, so it cannot regenerate them. Every title, category, location
 * and story in THIS FILE was therefore authored by hand; that is what this file
 * is for, and it is the only place in the repository where they exist.
 *
 * Only two entries have been confirmed by the client so far: El Bicho and Punta
 * Zicatela. The other twelve carry a provisional title derived from the client's
 * own source folder name (images/<name>/), a provisional category inferred from
 * the photo notes, and EMPTY narrative fields. Empty is deliberate: an empty
 * field is a to-do, a guessed one is a lie that ships to production.
 *
 * Confirm a project by filling `location`, `year`, `summary` and `story`.
 * ---------------------------------------------------------------------------
 */

type ProjectContent = Omit<
  Project,
  "cover" | "wideCover" | "photos" | "photoCount" | "gallery"
> & {
  /**
   * Curated manifest `base` slugs for the project card, best first. The first
   * is the card's principal. Chosen by visual review of the archive; resolved
   * by `getProjectGallery()`.
   */
  images?: string[];
};

/**
 * The category labels. Exported so the landing's tiles reuse them instead of
 * restating four of them, which is how the two drift apart.
 */
export const categoryLabels: Record<ProjectCategory, string> = {
  habitacional: "Habitacional",
  multifamiliar: "Multifamiliar",
  comercial: "Comercial",
  industrial: "Industrial",
  "obra-civil": "Obra civil",
  "espacios-publicos": "Espacio público",
  interiorismo: "Interiorismo",
};

function provisional(
  slug: string,
  title: string,
  category: ProjectCategory,
  images: string[],
): ProjectContent {
  return {
    slug,
    title,
    category,
    categoryLabel: categoryLabels[category],
    location: "",
    year: "",
    summary: "",
    story: "",
    outcome: "",
    images,
  };
}

/**
 * Curated card galleries, keyed by manifest `dir` and ordered best first.
 *
 * The picks were chosen by visual review of the contact sheets: landscape
 * whenever the project has one, the whole project legible in the frame, no
 * watermark. The featured projects (Plaza Esmeralda, El Bicho, Casa Blake,
 * Punta Zicatela, Palmarito, Vilas Cavan) also avoid their masonry photograph
 * here, so the landing never shows one file twice. Every slug is a manifest
 * `base`; `getProjectGallery()` drops anything unknown.
 */
const curatedGalleries: Record<string, string[]> = {
  "01-plaza-esmeralda-puerto-escondido": [
    "07-terraza-madera-cristal-ciudad",
    "12-cristal-madera-noche-ciudad",
    "05-toma-aerea-azoteas-jardin",
  ],
  "02-el-bicho": [
    "31-fachada-iluminada-nocturna",
    "12-armadura-techo-palapa-obra",
    "13-fachada-alberca-palmeras",
  ],
  "03-casa-blake-tlalixtac": [
    "08-fachada-frontal-dos-plantas",
    "07-corredor-vigas-madera-lamparas",
    "09-esquina-ventanal-farol-terraza",
  ],
  "04-casa-melchor-ocampo": [
    "01-calle-pendiente-fachada-colonial",
    "04-fachada-amarilla-balcones-celosia",
    "08-balcon-forjado-cielo-nubes",
  ],
  "05-cafe-malagua": [
    "01-barra-tabique-lamparas-calidas",
    "04-interior-palapa-lamparas-colgantes",
    "03-barra-tabique-celosia-madera",
  ],
  "06-capilla-el-tule": [
    "01-capilla-cantera-jacaranda-flor",
    "03-esquina-cantera-detalle-bajo",
    "05-interior-banca-madera-ventanas",
  ],
  "07-casa-tarrastro": [
    "01-fachada-piedra-pergola-jardin",
    "02-terraza-celosia-madera-encino",
    "04-celosia-madera-contrapicado",
  ],
  "08-rbnb-palmarito": [
    "03-marco-concreto-vista-playa",
    "09-atardecer-maquinaria-silueta",
    "01-trabajadores-barra-techo-palapa",
  ],
  "09-casa-santa-rosa": [
    "02-fachada-blanca-macetas-patios",
    "01-pergola-madera-terraza-piso",
    "03-puerta-madera-acceso-interior",
  ],
  "10-obra-punta-zicatela": [
    "01-ventana-circular-sombra-follaje",
    "03-ventana-circular-celosia-bambu",
  ],
  "11-columnas-c1-c2": [
    "01-izado-columna-grua-jacaranda",
    "03-columna-prefabricada-terreno-jacaranda",
    "02-columna-suspendida-plataforma",
  ],
  "12-vilas-cavan": [
    "01-interior-sala-cocina-chimenea",
    "03-sala-ventanal-montana",
  ],
  "13-puente-cd-administrativa": [
    "02-puente-peatonal-avenida-rampas",
    "01-puente-peatonal-crucero-malla",
  ],
  "14-pavimentacion": ["01-revolvedora-concreto-sobre-pavimento"],
};

/** Keyed by the manifest's `dir`, which is the only stable identifier. */
export const projectContent: Record<string, ProjectContent> = {
  "01-plaza-esmeralda-puerto-escondido": provisional(
    "plaza-esmeralda-puerto-escondido",
    "Plaza Esmeralda",
    "comercial",
    curatedGalleries["01-plaza-esmeralda-puerto-escondido"],
  ),

  // Confirmed by the client: villas operating as a beachfront rest hotel.
  "02-el-bicho": {
    slug: "el-bicho",
    title: "El Bicho",
    category: "comercial",
    categoryLabel: "Hotel",
    location: "Punta Zicatela, Puerto Escondido, Oaxaca",
    year: "",
    summary:
      "Villas frente al mar que funcionan como hotel de descanso, con un lenguaje constructivo nacido de la propia playa.",
    story:
      "Un concepto nuevo que nació del mar para el mar. Buscamos darle un carácter local a Zicatela: concreto con palapas triangulares en el nivel más alto, y un interior donde el techo de palma le devuelve la playa a la habitación.",
    outcome:
      "El hotel es muy visitado por su diseño y por la tranquilidad que da el propio edificio.",
    images: curatedGalleries["02-el-bicho"],
  },

  "03-casa-blake-tlalixtac": provisional(
    "casa-blake-tlalixtac",
    "Casa Blake",
    "habitacional",
    curatedGalleries["03-casa-blake-tlalixtac"],
  ),
  "04-casa-melchor-ocampo": provisional(
    "casa-melchor-ocampo",
    "Casa Melchor Ocampo",
    "habitacional",
    curatedGalleries["04-casa-melchor-ocampo"],
  ),
  "05-cafe-malagua": provisional(
    "cafe-malagua",
    "Café Malagua",
    "comercial",
    curatedGalleries["05-cafe-malagua"],
  ),
  "06-capilla-el-tule": provisional(
    "capilla-el-tule",
    "Capilla El Tule",
    "espacios-publicos",
    curatedGalleries["06-capilla-el-tule"],
  ),
  "07-casa-tarrastro": provisional(
    "casa-tarrastro",
    "Casa Tarrastro",
    "habitacional",
    curatedGalleries["07-casa-tarrastro"],
  ),
  "08-rbnb-palmarito": provisional(
    "rbnb-palmarito",
    "Palmarito",
    "habitacional",
    curatedGalleries["08-rbnb-palmarito"],
  ),
  "09-casa-santa-rosa": provisional(
    "casa-santa-rosa",
    "Casa Santa Rosa",
    "habitacional",
    curatedGalleries["09-casa-santa-rosa"],
  ),

  // Partly confirmed: the client named this one as apartamentos in Punta Zicatela.
  "10-obra-punta-zicatela": {
    slug: "obra-punta-zicatela",
    title: "Departamentos Punta Zicatela",
    category: "multifamiliar",
    categoryLabel: "Multifamiliar",
    location: "Punta Zicatela, Puerto Escondido, Oaxaca",
    year: "",
    summary: "",
    story: "",
    outcome: "",
    images: curatedGalleries["10-obra-punta-zicatela"],
  },

  "11-columnas-c1-c2": provisional(
    "columnas-c1-c2",
    "Columnas C1 - C2",
    "obra-civil",
    curatedGalleries["11-columnas-c1-c2"],
  ),
  "12-vilas-cavan": provisional(
    "vilas-cavan",
    "Vilas Cavan",
    "multifamiliar",
    curatedGalleries["12-vilas-cavan"],
  ),
  "13-puente-cd-administrativa": provisional(
    "puente-cd-administrativa",
    "Puente Cd. Administrativa",
    "obra-civil",
    curatedGalleries["13-puente-cd-administrativa"],
  ),
  "14-pavimentacion": provisional(
    "pavimentacion",
    "Pavimentación",
    "obra-civil",
    curatedGalleries["14-pavimentacion"],
  ),
};

/**
 * Landing order. The brief's §0 decision fixes the first three: the numeric
 * prefix IS the ranking, so Plaza Esmeralda, El Bicho and Casa Blake lead the
 * portfolio in that order, 01 first. The rest follow the same ranking and fill
 * the row under them -- the featured three and this tail are split in the seam,
 * so no project lands on the page twice.
 */
export const featuredProjectDirs = [
  "01-plaza-esmeralda-puerto-escondido",
  "02-el-bicho",
  "03-casa-blake-tlalixtac",
  "10-obra-punta-zicatela",
  "08-rbnb-palmarito",
  "12-vilas-cavan",
];
