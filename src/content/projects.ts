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
    "03-escaleras-electricas-atrio-blanco",
  ],
  "02-el-bicho": [
    "02-fachada-palapas-alberca-palmeras",
    "54-fachada-nocturna-alberca-iluminada-palapas",
    "31-fachada-iluminada-nocturna",
    "13-fachada-alberca-palmeras",
    "03-terraza-hamaca-jardin",
  ],
  "03-casa-blake-tlalixtac": [
    "08-fachada-frontal-dos-plantas",
    "06-fachada-camino-losas-jardin",
    "07-corredor-vigas-madera-lamparas",
    "09-esquina-ventanal-farol-terraza",
    "38-alberca-curva-terminada-mosaico-gris-jardin",
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
    "06-fachada-principal-dos-niveles-pergola-piedra",
    "08-terraza-techada-pergola-madera-muro-cantera",
    "10-fachada-frontal-pergola-superior-ventanales",
    "09-escalera-interior-barandal-geometrico-doble-altura",
    "02-terraza-celosia-madera-encino",
  ],
  "08-rbnb-palmarito": [
    "05-torre-concreto-cristal-carretilla",
    "03-marco-concreto-vista-playa",
    "02-cielo-palapa-barra-mar",
    "01-trabajadores-barra-techo-palapa",
    "04-postes-madera-vista-mar",
  ],
  "09-casa-santa-rosa": [
    "02-fachada-blanca-macetas-patios",
    "01-pergola-madera-terraza-piso",
    "03-puerta-madera-acceso-interior",
  ],
  "10-obra-punta-zicatela": [
    "09-fachada-chukum-ventana-circular-barra-concreto",
    "12-modulo-terminado-bajo-sombra-arboles-zicatela",
    "13-recamara-muros-chukum-cama-madera-lampara-halo",
    "01-ventana-circular-sombra-follaje",
  ],
  "11-columnas-c1-c2": [
    "03-columna-prefabricada-terreno-jacaranda",
    "01-izado-columna-grua-jacaranda",
    "04-columna-prefabricada-cuadrilla-grua",
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
    "01-fachada-chukum-celosia-barro-techo-palapa-porton-madera",
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
  "arquitectura-interiores": [
    "03-cocina-comedor-muro-terracota-techo-bambu-isla",
    "01-isla-cocina-piedra-parrilla-horno-muro-terracota",
    "02-comedor-madera-integrado-isla-cocina-cuadro-arte",
    "04-bano-moderno-marmol-espejo-circular-iluminacion-led",
    "05-cubierta-isla-cocina-veta-lineal-techo-carrizo",
    "08-cocina-madera-ventanal-jardin-interior-techo-bambu",
    "09-mesa-comedor-madera-luminarias-globo-cocina",
    "10-mueble-lavabo-negro-mate-monomando-minimalista",
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
      "Resuelto mediante estructura mixta de concreto y acero con carpintería arquitectónica en fachadas y niveles superiores. Los corredores perimetrales y terrazas abiertas integran iluminación cálida y vegetación para operar tanto de día como de noche.",
    outcome:
      "Un punto de referencia comercial en Puerto Escondido que combina durabilidad estructural en ambiente salino con calidez en sus espacios exteriores.",
    specs: [
      { label: "Tipología", value: "Comercial y usos mixtos" },
      { label: "Ubicación", value: "Puerto Escondido, Oaxaca" },
      { label: "Sistema", value: "Estructura mixta, cristal y madera" },
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
      "Palmarito",
      "habitacional",
      curatedGalleries["08-rbnb-palmarito"],
    ),
    location: "Playa Palmarito, Puerto Escondido, Oaxaca",
    summary:
      "Conjunto costero frente al mar en Playa Palmarito con estructuras de concreto expuesto y cubiertas de palma.",
  },
  "09-casa-santa-rosa": {
    ...provisional(
      "casa-santa-rosa",
      "Casa Santa Rosa",
      "habitacional",
      curatedGalleries["09-casa-santa-rosa"],
    ),
    location: "Santa Rosa Panzacola, Oaxaca",
    summary:
      "Casa habitación con patios interiores, pérgola de madera y volúmenes blancos de líneas limpias.",
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
    categoryLabel: "Habitacional · Airbnb",
    location: "Costa Cumaná y Rancho Neptuno, Puerto Escondido, Oaxaca",
    year: "2025",
    summary:
      "Excepcional casas hábitacional estilo Merida con vista al mar , concepto de playa para vivir cerca del mar , entre las playas de costa Cumaná y rancho Neptuno en Puerto escondido Oaxaca , en la zona de mayor plusvalía frente a la carretera federal que conecta toda la costa Oaxaqueña.",
    story:
      "Casas con un concepto de arquitectura es basado en un estilo sencillo pero a la vez contemporánea con toque interiores de arquitectura de playa tipo Mérida Yucatán , colores neutros que dan una sensación de paz y confort para usar como casas de descanso y aventura de playa , especiales para rentas de Airbnb .",
    paragraphs: [
      "Excepcional casas hábitacional estilo Merida con vista al mar , concepto de playa para vivir cerca del mar , entre las playas de costa Cumaná y rancho Neptuno en Puerto escondido Oaxaca , en la zona de mayor plusvalía frente a la carretera federal que conecta toda la costa Oaxaqueña.",
      "Casas con un concepto de arquitectura es basado en un estilo sencillo pero a la vez contemporánea con toque interiores de arquitectura de playa tipo Mérida Yucatán , colores neutros que dan una sensación de paz y confort para usar como casas de descanso y aventura de playa , especiales para rentas de Airbnb .",
      "Ubicada en el triángulo de mayor plusvalía de Puerto Escondido, teniendo una vista impecable hacia el mar y recibiendo la brisa encantadora que proviene de las olas de costa Cumaná esta casa cuenta con dos habitaciones completas con baños independientes, cada una sala comedor con un espacio incluido para el centro de TV, cocina integral, estilo tipo playa contando con un corredor en medio de la casa en donde se puede usar como pasillo de lectura jardín, y como área de descanso en el jacuzzi , esta casa cuenta con todos los servicios incluidos y con un estacionamiento exclusivo para cada propietario.",
      "En los interiores, los muros y plafones, serán en acabado fino residencial, con una capa de pintura del tono concha nácar para mantener la vibra del lugar que es cerca del mar.",
      "Las recámaras amplias nos permitirán tener un perfecto desarrollo dentro de cada habitación para poder desarrllls nuestras actividades amplia y confortablemente.",
      "El juego de detalles en sus accesorios son distintivos únicos que hace de este proyecto una joya en su decoración y funcionamiento.",
      "Cada espacio interior y detalles de la casa está siendo diseñado y cuidadosamente supervisado  con el fin de mantener viva la armonía que el medio ambiente y los alrededores de la zona nos regalan .",
      "Los detalles en las escaleras , muros y pisos son lo que hace de esta tiny house un detalle para vivir confortablemente , en cada juego de luz de la escalera, se pretende mantener el realce arquitectónico y residencial.",
      "La recámaras amplias nos regalan la sensación de libertad dentro de un espacio natural",
    ],
    outcome:
      "La recámaras amplias nos regalan la sensación de libertad dentro de un espacio natural",
    specs: [
      { label: "Tipología", value: "Habitacional / Descanso y Airbnb" },
      { label: "Ubicación", value: "Costa Cumaná — Rancho Neptuno, Puerto Escondido" },
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
      "Residencia costera en La Barra resuelta con volúmenes en acabado mineral chukum, celosía artesanal de barro, portón de madera y cubierta superior de palapa.",
    story:
      "Combina la inercia térmica de los muros en acabado chukum con filtros de celosía de barro cocido y una palapa ventilada en el nivel superior para habitar el trópico con frescura natural.",
    outcome: "",
    specs: [
      { label: "Tipología", value: "Habitacional costera" },
      { label: "Ubicación", value: "La Barra, Puerto Escondido, Oaxaca" },
      { label: "Materialidad", value: "Chukum, celosía de barro, madera y palma" },
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
      "Vivienda costera de un nivel con fachada en acabado chukum, celosías verticales de ladrillo de barro, acceso adoquinado y vegetación tropical integrada.",
    story:
      "Un proyecto de escala serena donde los muros color arena y las celosías verticales de barro tamizan el sol de la costa oaxaqueña y permiten ventilación cruzada permanente.",
    outcome: "",
    specs: [
      { label: "Tipología", value: "Habitacional" },
      { label: "Ubicación", value: "El Tomatal, Costa de Oaxaca" },
      { label: "Materialidad", value: "Chukum, adoquín y celosía de barro" },
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

  "arquitectura-interiores": {
    slug: "arquitectura-interiores",
    title: "Showroom y Carpintería Residencial",
    category: "interiorismo",
    categoryLabel: categoryLabels.interiorismo,
    location: "Oaxaca de Juárez, Oaxaca",
    year: "2024",
    summary:
      "Cocinas integrales de autor, superficies ultracompactas de gran formato y carpintería residencial fabricada sobre diseño en taller propio.",
    story:
      "El proyecto de interiores de Casa Alta resuelve la transición entre la escala arquitectónica y el detalle táctil. Diseñado con muros de terracota, techos de bambú y carrizo, e islas monolíticas con faldón a 45 grados en piedra tecnológica.",
    outcome:
      "Espacios habitables con ergonomía milimétrica, resistencia bioclimática y ensamble estructural avalado por perito DRO.",
    specs: [
      { label: "Tipología", value: "Interiorismo residencial y cocinas" },
      { label: "Ubicación", value: "Oaxaca de Juárez, Oaxaca" },
      { label: "Materialidad", value: "Piedra tecnológica, parota y chukum" },
    ],
    images: curatedGalleries["arquitectura-interiores"],
  },
};

/**
 * Landing order. The first four projects lead the flagship showcase on the
 * landing page (Plaza Esmeralda, El Bicho, Casa Charco Seco, Casa Blake),
 * followed by the rest of the curated portfolio below them.
 */
export const featuredProjectDirs = [
  "02-el-bicho",
  "15-casa-charco-seco",
  "01-plaza-esmeralda-puerto-escondido",
  "03-casa-blake-tlalixtac",
  "07-casa-tarrastro",
  "remodelacion",
  "16-casa-la-barra",
  "17-el-tomatal",
];

