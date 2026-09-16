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
  "cover" | "wideCover" | "photos" | "photoCount"
>;

const categoryLabels: Record<ProjectCategory, string> = {
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
  };
}

/** Keyed by the manifest's `dir`, which is the only stable identifier. */
export const projectContent: Record<string, ProjectContent> = {
  "01-plaza-esmeralda-puerto-escondido": provisional(
    "plaza-esmeralda-puerto-escondido",
    "Plaza Esmeralda",
    "comercial",
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
  },

  "03-casa-blake-tlalixtac": provisional(
    "casa-blake-tlalixtac",
    "Casa Blake",
    "habitacional",
  ),
  "04-casa-melchor-ocampo": provisional(
    "casa-melchor-ocampo",
    "Casa Melchor Ocampo",
    "habitacional",
  ),
  "05-cafe-malagua": provisional("cafe-malagua", "Café Malagua", "comercial"),
  "06-capilla-el-tule": provisional(
    "capilla-el-tule",
    "Capilla El Tule",
    "espacios-publicos",
  ),
  "07-casa-tarrastro": provisional(
    "casa-tarrastro",
    "Casa Tarrastro",
    "habitacional",
  ),
  "08-rbnb-palmarito": provisional(
    "rbnb-palmarito",
    "Palmarito",
    "habitacional",
  ),
  "09-casa-santa-rosa": provisional(
    "casa-santa-rosa",
    "Casa Santa Rosa",
    "habitacional",
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
  },

  "11-columnas-c1-c2": provisional(
    "columnas-c1-c2",
    "Columnas C1 - C2",
    "obra-civil",
  ),
  "12-vilas-cavan": provisional("vilas-cavan", "Vilas Cavan", "multifamiliar"),
  "13-puente-cd-administrativa": provisional(
    "puente-cd-administrativa",
    "Puente Cd. Administrativa",
    "obra-civil",
  ),
  "14-pavimentacion": provisional(
    "pavimentacion",
    "Pavimentación",
    "obra-civil",
  ),
};

/**
 * Landing order. El Bicho leads because it is the only project with a confirmed
 * story and a hero-grade cover; the rest follow the pipeline's quality ranking,
 * which is what tools/priority.txt encodes.
 */
export const featuredProjectDirs = [
  "02-el-bicho",
  "10-obra-punta-zicatela",
  "03-casa-blake-tlalixtac",
  "08-rbnb-palmarito",
  "01-plaza-esmeralda-puerto-escondido",
  "12-vilas-cavan",
];
