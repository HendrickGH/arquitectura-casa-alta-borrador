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
    "22-fachada-frontal-acceso-escaleras-electricas",
    "07-terraza-madera-cristal-ciudad",
    "02-terraza-anochecer-planta-jardinera",
    "20-local-esquinero-ventanal-panoramico-calle",
    "33-estacionamiento-subterraneo-cajones-columnas",
  ],
  "02-el-bicho": [
    "91-punta-zicatela-villas-palapas-alberca-playa",
    "92-punta-zicatela-alberca-cenital-palapas",
    "02-fachada-palapas-alberca-palmeras",
    "54-fachada-nocturna-alberca-iluminada-palapas",
    "31-fachada-iluminada-nocturna",
    "01-fachada-tres-palapas-alberca",
    "03-terraza-hamaca-jardin",
    "03-casa-blake-tlalixtac/38-alberca-curva-terminada-mosaico-gris-jardin",
    "03-casa-blake-tlalixtac/36-vista-superior-alberca-mosaico-negro-sol",
  ],
  "03-casa-blake-tlalixtac": [
    "08-fachada-frontal-dos-plantas",
    "06-fachada-camino-losas-jardin",
    "07-corredor-vigas-madera-lamparas",
    "09-esquina-ventanal-farol-terraza",
    "32-bomba-concreto-colado-estructura-dos-niveles",
  ],
  "04-casa-melchor-ocampo": [
    "01-calle-pendiente-fachada-colonial",
    "04-fachada-amarilla-balcones-celosia",
    "02-puerta-acero-oxidado-relieve",
    "03-herreria-balcon-cielo",
    "08-balcon-forjado-cielo-nubes",
  ],
  "05-cafe-malagua": [
    "01-barra-tabique-lamparas-calidas",
    "02-barra-central-lamparas-encendidas",
    "03-barra-tabique-celosia-madera",
    "04-interior-palapa-lamparas-colgantes",
  ],
  "06-capilla-el-tule": [
    "01-capilla-cantera-jacaranda-flor",
    "03-esquina-cantera-detalle-bajo",
    "02-cornisa-cantera-contrapicado",
    "05-interior-banca-madera-ventanas",
  ],
  "07-casa-tarrastro": [
    "12-fachada-principal-dos-niveles-pergola-jardin",
    "08-terraza-techada-pergola-madera-muro-cantera",
    "10-fachada-frontal-pergola-superior-ventanales",
    "09-escalera-interior-barandal-geometrico-doble-altura",
    "02-terraza-celosia-madera-encino",
  ],
  "08-rbnb-palmarito": [
    "42-fachada-dos-niveles-palapa-balcon-escalera",
    "02-cielo-palapa-barra-mar",
    "03-marco-concreto-vista-playa",
    "04-postes-madera-vista-mar",
    "05-torre-concreto-cristal-carretilla",
    "01-trabajadores-barra-techo-palapa",
    "02-el-bicho/77-bomba-concreto-colado-torre-costa",
    "02-el-bicho/36-colado-con-manguera-playa",
  ],
  "10-obra-punta-zicatela": [
    "43-modulo-chukum-ventana-circular-mesa-concreto",
    "09-fachada-chukum-ventana-circular-barra-concreto",
    "12-modulo-terminado-bajo-sombra-arboles-zicatela",
    "13-recamara-muros-chukum-cama-madera-lampara-halo",
    "01-ventana-circular-sombra-follaje",
  ],
  "11-columnas-c1-c2": [
    "07-posicionamiento-columna-prefabricada-cuadrilla-zapata",
    "03-columna-prefabricada-terreno-jacaranda",
    "01-izado-columna-grua-jacaranda",
    "04-columna-prefabricada-cuadrilla-grua",
    "06-izado-columnas-prefabricadas-grua-cielo-azul",
  ],
  "12-vilas-cavan": [
    "10-fachada-frontal-chimenea-ladrillo-techo-teja",
    "07-pasillo-acceso-fachada-blanca-teja-cantera",
    "11-estancia-chimenea-ladrillo-barra-cocina",
    "14-cancel-corredizo-negro-terraza-vista-montana",
    "09-portico-acceso-columnas-cantera-ventanal",
  ],
  "13-puente-cd-administrativa": [
    "02-puente-peatonal-avenida-rampas",
    "01-puente-peatonal-crucero-malla",
  ],
  "14-pavimentacion": ["01-revolvedora-concreto-sobre-pavimento"],
  "15-casa-charco-seco": [
    "08-perspectiva-fachada-terracota-vegetacion-cielo",
    "04-fachada-exterior-terracota-portones-madera-vegetacion",
    "05-vista-cenital-patio-alberca-muro-celosia-barro",
    "03-planta-baja-abierta-cocina-comedor-estancia",
    "01-sillon-lectura-bajo-escalera-celosia-iluminada",
  ],
  "16-casa-la-barra": [
    "02-fachada-horizontal-chukum-palapa-porton",
    "01-fachada-chukum-celosia-barro-techo-palapa-porton-madera",
    "03-perspectiva-casa-chukum-terraza-palapa-jardin",
  ],
  "17-el-tomatal": [
    "02-fachada-principal-chukum-celosia-ladrillo-palmeras",
    "03-acceso-vehicular-adoquin-barro-fachada-celosia",
    "01-detalle-celosia-vertical-macetas-monstera-helecho",
  ],
  remodelacion: [
    "02-fachada-remodelada-blanca-dos-niveles-balcones-cristal",
    "01-vista-frontal-residencia-modernizada-cochera-acceso",
    "06-patio-frontal-pavimentado-fachada-blanca-remodelada",
  ],
};

/** Keyed by the manifest's `dir`, which is the only stable identifier. */
export const projectContent: Record<string, ProjectContent> = {
  "01-plaza-esmeralda-puerto-escondido": {
    slug: "plaza-esmeralda-puerto-escondido",
    title: "Plaza Esmeralda",
    category: "comercial",
    categoryLabel: categoryLabels.comercial,
    location: "Puerto Escondido, Oaxaca",
    year: "",
    summary:
      "Conjunto comercial con terrazas de madera, cancelería de cristal y azoteas ajardinadas abiertas a la brisa costera de Puerto Escondido.",
    story:
      "Resuelto mediante estructura metálica y losacero con carpintería arquitectónica en fachadas y niveles superiores. Los corredores perimetrales y terrazas abiertas integran iluminación cálida y vegetación para operar tanto de día como de noche.",
    outcome:
      "Un punto de referencia comercial en Puerto Escondido que combina durabilidad estructural en ambiente salino con calidez en sus espacios exteriores.",
    specs: [
      { label: "Tipología", value: "Comercial y usos mixtos" },
      { label: "Ubicación", value: "Puerto Escondido, Oaxaca" },
      { label: "Sistema", value: "Estructura metálica y losacero, cristal y madera" },
    ],
    images: curatedGalleries["01-plaza-esmeralda-puerto-escondido"],
  },

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
    specs: [
      { label: "Tipología", value: "Hotel / Villas costeras" },
      { label: "Ubicación", value: "Punta Zicatela, Puerto Escondido" },
      { label: "Sistema", value: "Concreto armado y palapa triangular" },
    ],
    images: curatedGalleries["02-el-bicho"],
  },

  "03-casa-blake-tlalixtac": {
    slug: "casa-blake-tlalixtac",
    title: "Casa Blake",
    category: "habitacional",
    categoryLabel: categoryLabels.habitacional,
    location: "Tlalixtac de Cabrera, Oaxaca",
    year: "",
    summary:
      "Residencia de dos niveles con corredores de vigas de madera, ladrillo aparente y ventanales hacia los Valles Centrales.",
    story:
      "Diseñada para dialogar con la arquitectura vernácula de Tlalixtac mediante muros blancos de gran espesor, pilares de tabique, herrería forjada y cubiertas con viguería de madera.",
    outcome:
      "Una residencia fresca y atemporal donde los pórticos exteriores articulan la vida familiar con el jardín.",
    specs: [
      { label: "Tipología", value: "Habitacional unifamiliar" },
      { label: "Ubicación", value: "Tlalixtac de Cabrera, Oaxaca" },
      { label: "Sistema", value: "Mampostería, concreto y viguería de madera" },
    ],
    images: curatedGalleries["03-casa-blake-tlalixtac"],
  },

  "04-casa-melchor-ocampo": {
    ...provisional(
      "casa-melchor-ocampo",
      "Casa Melchor Ocampo",
      "habitacional",
      curatedGalleries["04-casa-melchor-ocampo"],
    ),
    location: "Oaxaca de Juárez, Oaxaca",
    summary:
      "Vivienda urbana de corte tradicional con balcones de herrería forjada y celosías de barro en esquina.",
  },
  "05-cafe-malagua": {
    ...provisional(
      "cafe-malagua",
      "Café Malagua",
      "comercial",
      curatedGalleries["05-cafe-malagua"],
    ),
    location: "Puerto Escondido, Oaxaca",
    summary:
      "Espacio gastronómico bajo gran palapa con barra de tabique artesanal, celosías de madera e iluminación cálida.",
  },
  "06-capilla-el-tule": {
    ...provisional(
      "capilla-el-tule",
      "Capilla El Tule",
      "espacios-publicos",
      curatedGalleries["06-capilla-el-tule"],
    ),
    location: "Santa María del Tule, Oaxaca",
    summary:
      "Recinto comunitario edificado en cantera labrada con carpintería tradicional y vitrales laterales.",
  },
  "07-casa-tarrastro": {
    ...provisional(
      "casa-tarrastro",
      "Casa Tarrastro",
      "habitacional",
      curatedGalleries["07-casa-tarrastro"],
    ),
    location: "Oaxaca",
    summary:
      "Residencia con basamento de piedra natural, pérgolas y celosías verticales de madera de encino.",
  },
  "08-rbnb-palmarito": {
    ...provisional(
      "rbnb-palmarito",
      "Departamento Palmarito – Construcción de estructura",
      "habitacional",
      curatedGalleries["08-rbnb-palmarito"],
    ),
    location: "Playa Palmarito, Puerto Escondido, Oaxaca",
    summary:
      "Desarrollo residencial frente al mar en Playa Palmarito. Registro fotográfico enfocado en el proceso constructivo y colado de su estructura de concreto y cubiertas de palma.",
    specs: [
      { label: "Tipología", value: "Departamento / Proceso estructural" },
      { label: "Ubicación", value: "Playa Palmarito, Puerto Escondido" },
      { label: "Sistema", value: "Estructura de concreto armado y palapa" },
    ],
  },

  // Partly confirmed: the client named this one as apartamentos in Punta Zicatela.
  "10-obra-punta-zicatela": {
    slug: "obra-punta-zicatela",
    title: "Departamentos Punta Zicatela",
    category: "multifamiliar",
    categoryLabel: "Multifamiliar",
    location: "Punta Zicatela, Puerto Escondido, Oaxaca",
    year: "",
    summary:
      "Desarrollo multifamiliar en Punta Zicatela con vanos circulares, celosías de bambú y concreto aparente.",
    story:
      "Pensado para el clima costero de Zicatela, combinando muros blancos y concreto aparente con filtros solares de bambú y aberturas circulares que enmarcan la vegetación tropical.",
    outcome: "",
    specs: [
      { label: "Tipología", value: "Vivienda multifamiliar" },
      { label: "Ubicación", value: "Punta Zicatela, Puerto Escondido" },
      { label: "Sistema", value: "Concreto armado y celosías naturales" },
    ],
    images: curatedGalleries["10-obra-punta-zicatela"],
  },

  "11-columnas-c1-c2": {
    ...provisional(
      "columnas-c1-c2",
      "Columnas C1 - C2",
      "obra-civil",
      curatedGalleries["11-columnas-c1-c2"],
    ),
    location: "Oaxaca",
    summary:
      "Fabricación, transporte e izado de columnas prefabricadas de concreto de gran escala con grúa telescópica.",
  },
  "12-vilas-cavan": {
    ...provisional(
      "vilas-cavan",
      "Vilas Cavan",
      "multifamiliar",
      curatedGalleries["12-vilas-cavan"],
    ),
    location: "Sierra de Oaxaca",
    summary:
      "Villas de montaña en tabique aparente y teja con chimenea central y ventanales panorámicos hacia el bosque.",
  },
  "13-puente-cd-administrativa": {
    ...provisional(
      "puente-cd-administrativa",
      "Puente Cd. Administrativa",
      "obra-civil",
      curatedGalleries["13-puente-cd-administrativa"],
    ),
    location: "Tlalixtac de Cabrera, Oaxaca",
    summary:
      "Puente peatonal de gran claro con rampas de accesibilidad universal frente a Ciudad Administrativa.",
  },
  "14-pavimentacion": {
    ...provisional(
      "pavimentacion",
      "Pavimentación",
      "obra-civil",
      curatedGalleries["14-pavimentacion"],
    ),
    location: "Oaxaca",
    summary:
      "Obra de pavimentación con concreto hidráulico de alta resistencia para vialidades y accesos.",
  },

  // Confirmed verbatim narrative provided by the client for Casa Charco Seco.
  "15-casa-charco-seco": {
    slug: "casa-charco-seco",
    title: "Casa Charco Seco",
    category: "habitacional",
    categoryLabel: categoryLabels.habitacional,
    location: "Charco Seco · Frente a Playa Cumaná, Puerto Escondido, Oaxaca",
    year: "2025",
    summary:
      "Arquitectura que nace de la tierra y encuentra su horizonte en el mar.",
    story:
      "Emplazada en el paisaje costero de Charco Seco, frente a Playa Cumaná, esta residencia representa la esencia de Arquitectura Costa Natura, una propuesta que fusiona la elegancia contemporánea con la autenticidad del entorno natural. Su concepción arquitectónica privilegia la integración con el paisaje, la nobleza de los materiales, la luz natural y el confort bioclimático, creando una experiencia de vida donde los espacios dialogan con la brisa marina, la vegetación y la serenidad del océano.",
    paragraphs: [
      "Arquitectura que nace de la tierra y encuentra su horizonte en el mar.",
      "Emplazada en el paisaje costero de Charco Seco, frente a Playa Cumaná, esta residencia representa la esencia de Arquitectura Costa Natura, una propuesta que fusiona la elegancia contemporánea con la autenticidad del entorno natural.",
      "Su concepción arquitectónica privilegia la integración con el paisaje, la nobleza de los materiales, la luz natural y el confort bioclimático, creando una experiencia de vida donde los espacios dialogan con la brisa marina, la vegetación y la serenidad del océano.",
      "CASA ALTA | Arquitectura Costa Natura",
      "No concebimos únicamente espacios para habitar; creamos arquitectura que pertenece al lugar y permanece en el tiempo.",
    ],
    outcome:
      "No concebimos únicamente espacios para habitar; creamos arquitectura que pertenece al lugar y permanece en el tiempo.",
    specs: [
      { label: "Tipología", value: "Habitacional / Residencia de descanso" },
      { label: "Ubicación", value: "Charco Seco · Frente a Playa Cumaná, Puerto Escondido, Oaxaca" },
      { label: "Concepto", value: "Arquitectura Costa Natura" },
      { label: "Programa", value: "2 recámaras con baño, sala-comedor, cocina integral, corredor-jardín con jacuzzi y estacionamiento" },
      { label: "Acabados", value: "Acabado fino residencial en tono concha nácar, celosía de barro y madera" },
    ],
    images: curatedGalleries["15-casa-charco-seco"],
  },

  "16-casa-la-barra": {
    slug: "casa-la-barra",
    title: "Casa La Barra",
    category: "habitacional",
    categoryLabel: categoryLabels.habitacional,
    location: "La Barra, Puerto Escondido, Oaxaca",
    year: "",
    summary:
      "Residencia costera en La Barra resuelta con celosía artesanal de barro, portón de madera y cubierta superior de palapa.",
    story:
      "Combina la inercia térmica de los muros con filtros de celosía de barro cocido y una palapa ventilada en el nivel superior para habitar el trópico con frescura natural.",
    outcome: "",
    specs: [
      { label: "Tipología", value: "Habitacional costera" },
      { label: "Ubicación", value: "La Barra, Puerto Escondido, Oaxaca" },
      { label: "Materialidad", value: "Celosía de barro, madera y palma" },
    ],
    images: curatedGalleries["16-casa-la-barra"],
  },

  "17-el-tomatal": {
    slug: "el-tomatal",
    title: "El Tomatal",
    category: "habitacional",
    categoryLabel: categoryLabels.habitacional,
    location: "El Tomatal, Puerto Escondido, Oaxaca",
    year: "",
    summary:
      "Vivienda costera de un nivel con celosías verticales de ladrillo de barro, acceso adoquinado y vegetación tropical integrada.",
    story:
      "Un proyecto de escala serena donde los muros color arena y las celosías verticales de barro tamizan el sol de la costa oaxaqueña y permiten ventilación cruzada permanente.",
    outcome: "",
    specs: [
      { label: "Tipología", value: "Habitacional" },
      { label: "Ubicación", value: "El Tomatal, Costa de Oaxaca" },
      { label: "Materialidad", value: "Adoquín y celosía de barro" },
    ],
    images: curatedGalleries["17-el-tomatal"],
  },

  remodelacion: {
    slug: "remodelacion-residencial",
    title: "Remodelación Residencial",
    category: "habitacional",
    categoryLabel: categoryLabels.habitacional,
    location: "Oaxaca",
    year: "",
    summary:
      "Modernización integral de residencia de dos niveles: ampliación de áreas sociales, balcones con cancelería contemporánea y fachada en acabado blanco minimalista.",
    story:
      "Transformación volumétrica y funcional de una residencia unifamiliar existente, incorporando nueva cochera techada, cancelería de cristal, balcones contemporáneos y acabados de alta durabilidad.",
    outcome: "",
    specs: [
      { label: "Tipología", value: "Remodelación y ampliación habitacional" },
      { label: "Ubicación", value: "Oaxaca" },
      { label: "Materialidad", value: "Estructura de concreto, herrería y cancelería contemporánea" },
    ],
    images: curatedGalleries.remodelacion,
  },
};

/**
 * Canonical portfolio order across the site (CAS-039, CAS-040, CAS-044).
 * El Bicho leads at #1, Plaza Esmeralda sits at #5, and Santa Rosa is removed.
 */
export const portfolioOrder: string[] = [
  "02-el-bicho",
  "15-casa-charco-seco",
  "03-casa-blake-tlalixtac",
  "04-casa-melchor-ocampo",
  "01-plaza-esmeralda-puerto-escondido",
  "05-cafe-malagua",
  "06-capilla-el-tule",
  "07-casa-tarrastro",
  "08-rbnb-palmarito",
  "10-obra-punta-zicatela",
  "11-columnas-c1-c2",
  "12-vilas-cavan",
  "13-puente-cd-administrativa",
  "14-pavimentacion",
  "16-casa-la-barra",
  "17-el-tomatal",
  "remodelacion",
];

/**
 * Landing order. The first five projects lead the flagship showcase on the
 * landing page, with El Bicho at #1 and Plaza Esmeralda positioned at #5 (CAS-039).
 */
export const featuredProjectDirs = [
  "02-el-bicho",
  "15-casa-charco-seco",
  "03-casa-blake-tlalixtac",
  "07-casa-tarrastro",
  "01-plaza-esmeralda-puerto-escondido",
  "remodelacion",
  "16-casa-la-barra",
  "17-el-tomatal",
];

