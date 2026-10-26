import type {
  CategoryTileContent,
  DivisionCardContent,
  HomePage,
  Photo,
  Stat,
} from "@/types/content";
import { whatsappHref } from "./site";

/** The landing hero lead photo: Punta Zicatela - Vista aérea panorámica en alta resolución (2000x1116 max capped, original 2752x1536). */
const heroPuntaZicatelaHorizontalPhoto: Photo = {
  src: "/images/hero/punta-zicatela-villas-palapas-alberca-playa.avif",
  alt: "Vista aérea panorámica de las villas de Punta Zicatela con cubiertas de palapa, alberca y costa de Puerto Escondido",
  width: 2000,
  height: 1116,
};

/** The landing hero second photo: Casa La Barra - Fachada horizontal chukum y palapa (2000x1116 max capped, original 2752x1536). */
const heroCasaLaBarraHorizontalPhoto: Photo = {
  src: "/images/hero/casa-la-barra-fachada-horizontal-chukum.avif",
  alt: "Residencia costera Casa La Barra en acabado mineral chukum, portón de listones de madera, celosías y cubierta de palapa",
  width: 2000,
  height: 1116,
};

/** The landing hero third photo: Casa Charco Seco - Fachada horizontal en terracota con enredadera (2000x1116 max capped, original 2752x1536). */
const heroCasaCharcoSecoHorizontalPhoto: Photo = {
  src: "/images/hero/casa-charco-seco-fachada-horizontal-terracota.avif",
  alt: "Fachada residencial Casa Charco Seco en acabado terracota con portones de madera, celosía y enredadera natural",
  width: 2000,
  height: 1116,
};

const columnasCivilPhoto: Photo = {
  src: "/images/hero/columnas-prefabricadas-grua-obra-civil.avif",
  alt: "Montaje con grúa de columnas prefabricadas de concreto con ménsulas para obra vial",
  width: 1600,
  height: 1200,
};

const villasCavanFachadaPhoto: Photo = {
  src: "/images/hero/villas-cavan-fachada-cantera-letreros.avif",
  alt: "Fachada de villas residenciales en cantera clara con letreros y cubiertas de teja",
  width: 1719,
  height: 2000,
};

const villasCavanPorticoPhoto: Photo = {
  src: "/images/hero/villas-cavan-portico-cantera-escalones.avif",
  alt: "Pórtico de acceso con columna en cantera clara, escalinata y jardinería exterior",
  width: 1290,
  height: 1747,
};

const supervisionObraPhoto: Photo = {
  src: "/images/hero/supervision-residencia-obra-chaleco-casa-alta.avif",
  alt: "Arquitecto de Casa Alta con chaleco institucional supervisando estructura de madera y palapa",
  width: 960,
  height: 1280,
};

const casaBlakePhoto: Photo = {
  src: "/images/hero/casa-blake-fachada-dos-niveles-herreria-negra.avif",
  alt: "Fachada de dos niveles con cancelería geométrica negra, muros blancos y terraza con vigas de madera",
  width: 1200,
  height: 1600,
};

const casaMelchorOcampoPhoto: Photo = {
  src: "/images/hero/casa-melchor-ocampo-balcon-herreria-celosia.avif",
  alt: "Fachada colonial en tono amarillo con balcón de herrería artesanal, farol y celosía de barro",
  width: 1280,
  height: 854,
};

const casaCharcoSecoFachadaPhoto: Photo = {
  src: "/images/hero/casa-charco-seco-fachada-terracota-enredadera.avif",
  alt: "Fachada residencial en acabado mineral terracota con portones de madera y balcón con enredadera",
  width: 768,
  height: 1280,
};

const casaCharcoSecoPatioPhoto: Photo = {
  src: "/images/hero/casa-charco-seco-patio-alberca-cenital.avif",
  alt: "Vista cenital del patio privado con alberca, sillas Acapulco, huellas de cantera y muro de celosía",
  width: 960,
  height: 1600,
};

const casaLaBarraPhoto: Photo = {
  src: "/images/hero/casa-la-barra-fachada-chukum-porton-palapa.avif",
  alt: "Residencia costera en acabado chukum con portón de listones de madera, celosías de barro y palapa",
  width: 829,
  height: 1280,
};

const elBichoTerrazaPhoto: Photo = {
  src: "/images/hero/el-bicho-terraza-hamaca-jardin-costero.avif",
  alt: "Terraza exterior con hamaca, ventanales de cristal y jardín tropical frente a la alberca",
  width: 1280,
  height: 720,
};

const elBichoAtardecerPhoto: Photo = {
  src: "/images/hero/el-bicho-fachada-palapas-atardecer.avif",
  alt: "Fachada de tres palapas al atardecer con iluminación cálida interior, alberca y palmeras",
  width: 1280,
  height: 720,
};

const puntaZicatelaIntroPhoto: Photo = {
  src: "/images/hero/punta-zicatela-alberca-cenital-palapas.avif",
  alt: "Toma aérea cenital con dron de Punta Zicatela: alberca triangular, cubiertas de palapa, vegetación tropical y asoleadero en Puerto Escondido",
  width: 1024,
  height: 574,
};


/** Studio photograph for the Architect Manifesto section. */
const manifestoStudioPhoto: Photo = {
  src: "/images/arquitectura-que-perdura/01-comedor-exterior-madera-bajo-palapa-lamparas-tejidas.avif",
  alt: "Comedor exterior bajo estructura de palapa con mesa de madera parota y lámparas tejidas artesanales en la costa de Oaxaca",
  width: 829,
  height: 1280,
};

/** Studio photograph for the Contact section. */
const contactStudioPhoto: Photo = {
  src: "/images/arquitectura-interiores/02-comedor-madera-integrado-isla-cocina-cuadro-arte.avif",
  alt: "Estancia y comedor de madera tropical integrados con isla de cocina en piedra de importación y muro terracota",
  width: 960,
  height: 1280,
};

/** Flagship photograph for the Closing CTA section: El Bicho 5 estrellas (01-fachada-tres-palapas-alberca). */
const closingStudioPhoto: Photo = {
  src: "/images/02-el-bicho/01-fachada-tres-palapas-alberca.avif",
  alt: "Edificio terminado de El Bicho con tres niveles de palapas, alberca y palmeras en la costa de Oaxaca por Casa Alta",
  width: 1200,
  height: 1600,
};

/** Technical supervision and blueprints session for WhyCasaAltaEditorial. */
const teamBlueprintsPhoto: Photo = {
  src: "/images/proyectos-integrales/01-arquitectos-revisando-planos-estructurales-mesa-madera.avif",
  alt: "Dos arquitectos de Casa Alta realizando anotaciones y coordinando especificaciones técnicas sobre planos ejecutivos",
  width: 960,
  height: 1280,
};

/** Noble construction materiality (chukum and cast concrete) for WhyCasaAltaEditorial. */
const materialChukumConcretePhoto: Photo = {
  src: "/images/10-obra-punta-zicatela/09-fachada-chukum-ventana-circular-barra-concreto.avif",
  alt: "Fachada en acabado chukum mineral con ventana circular y barra monolítica en concreto aparente en Punta Zicatela",
  width: 960,
  height: 1280,
};

/**
 * Figures the client supplied directly.
 */
const stats: Stat[] = [
  {
    value: "2016",
    label: "Construyendo desde",
    tag: "TRAYECTORIA",
    sub: "Proyectos en todo México",
  },
  {
    value: "150+",
    label: "Obras entregadas",
    tag: "PROYECTOS",
    sub: "Edificación habitacional y civil",
  },
  {
    value: "50,000",
    label: "Metros cuadrados construidos",
    tag: "SUPERFICIE",
    sub: "Cálculo y estructura ejecutada",
  },
  {
    value: "100%",
    label: "Entregas cumplidas",
    tag: "GARANTÍA",
    sub: "Certeza técnica y contractual",
  },
];

const tiles: CategoryTileContent[] = [
  {
    category: "habitacional",
    projectDir: "15-casa-charco-seco",
    href: "/proyectos",
  },
  {
    category: "multifamiliar",
    projectDir: "17-el-tomatal",
    href: "/proyectos",
  },
  {
    category: "comercial",
    projectDir: "01-plaza-esmeralda-puerto-escondido",
    href: "/proyectos",
  },
  {
    category: "obra-civil",
    projectDir: "03-casa-blake-tlalixtac",
    href: "/proyectos",
  },
];

const divisions: DivisionCardContent[] = [
  {
    number: "01",
    title: "Arquitectura Residencial y Turística",
    subtitle: "Vivienda · Hotelería · Airbnb",
    description:
      "Proyectos ejecutivos y construcción integral de casas de descanso, villas costeras y desarrollos multifamiliares pensados para la plusvalía y climas de alta exigencia.",
    href: "/proyectos",
    dir: "02-el-bicho",
    base: "01-fachada-tres-palapas-alberca",
  },
  {
    number: "02",
    title: "Ingeniería y Obra Civil",
    subtitle: "Estructuras · Puentes · Naves",
    description:
      "Concreto armado y presforzado, montaje con grúas de gran capacidad, puentes vehiculares y peatonales, pavimentación hidráulica y naves industriales.",
    href: "/servicios",
    dir: "obra-civil",
    base: "04-izado-cabezal-columna-puente-grua-cielo-azul",
  },
  {
    number: "03",
    title: "Arquitectura de Interiores y Acabados de Alta Gama",
    subtitle: "Materiales de Importación · Cocinas",
    description:
      "Materiales de importación para proyectos residenciales con instalación certificada y garantizada: islas monolíticas, cuarzo, piedra sinterizada y carpintería a medida.",
    href: "/arquitectura-interiores",
    dir: "arquitectura-interiores",
    base: "01-isla-cocina-piedra-parrilla-horno-muro-terracota",
  },
  {
    number: "04",
    title: "Construcción Sustentable",
    subtitle: "Bioclimática · Confort Térmico",
    description:
      "Arquitectura en armonía con el entorno: diseño contemporáneo e innovación bioclimática que optimiza el confort térmico, la ventilación natural y la eficiencia energética.",
    href: "/construccion-sustentable",
    dir: "arquitectura-sostenible",
    base: "04-fachada-celosia-proteccion-solar-vegetacion",
  },
];

export interface ServicePillarSource {
  title: string;
  description: string;
  href: string;
  dir: string;
  base: string;
  alt: string;
}

export const servicePillarSources: ServicePillarSource[] = [
  {
    title: "Arquitectura",
    description:
      "Diseño arquitectónico y desarrollo de proyecto ejecutivo, atendiendo la funcionalidad, las proporciones, los materiales y el entorno.",
    href: "/servicios",
    dir: "02-el-bicho",
    base: "02-fachada-palapas-alberca-palmeras",
    alt: "Diseño arquitectónico integral con alberca y palapas de Casa Alta en Oaxaca",
  },
  {
    title: "Arquitectura de interiores",
    description:
      "Materiales de importación para proyectos residenciales con instalación certificada: islas monolíticas, cuarzo, piedra sinterizada y carpintería a medida.",
    href: "/arquitectura-interiores",
    dir: "arquitectura-interiores",
    base: "03-cocina-comedor-muro-terracota-techo-bambu-isla",
    alt: "Arquitectura de interiores con acabados nobles, cocina integral e isla de piedra",
  },
  {
    title: "Construcción sustentable",
    description:
      "Soluciones que consideran el clima, la innovación, los recursos y las condiciones propias de cada sitio.",
    href: "/construccion-sustentable",
    dir: "arquitectura-sostenible",
    base: "04-fachada-celosia-proteccion-solar-vegetacion",
    alt: "Construcción sustentable con celosía bioclimática y protección solar pasiva",
  },
];

export const home: HomePage = {
  hero: {
    slides: [
      {
        title: "Punta Zicatela",
        photo: heroPuntaZicatelaHorizontalPhoto,
      },
      {
        title: "Casa La Barra",
        photo: heroCasaLaBarraHorizontalPhoto,
      },
      {
        title: "Casa Charco Seco",
        photo: heroCasaCharcoSecoHorizontalPhoto,
      },
    ],
    subheadline:
      "Proyectos ejecutivos de arquitectura residencial e ingeniería civil.",
    chrome: { tone: "canvas" },
  },

  stats,

  // The architect's philosophical statement from the client brief (PDF p. 2 / p. 4).
  manifesto:
    "La arquitectura es el medio de expresión en donde se combina la proporción, el diseño y la línea para lograr construir obras que edifiquen la vida del ser humano.",
  manifestoPhoto: manifestoStudioPhoto,

  // The studio's mission statement from the client brief.
  mission:
    "Ser una empresa que solucione todas las soluciones constructivas y dar función y carácter a cada proyecto que llega a nuestras manos.",

  tiles,

  divisionsIntro: {
    eyebrow: "Divisiones especializadas",
    heading: "Cuatro frentes bajo una misma firma",
    body: "Integramos diseño arquitectónico, ingeniería pesada, interiorismo certificado y bioclimática tropical para resolver su proyecto de principio a fin sin intermediarios.",
  },

  divisions,

  intro: {
    eyebrow: "Quiénes somos",
    heading: "Arquitectura que perdura",
    body: "Somos una constructora mexicana especializada en arquitectura, ingeniería y construcción, integrada por profesionales comprometidos con el desarrollo de proyectos que combinan diseño, funcionalidad y calidad constructiva.",
    paragraphs: [
      "Desarrollamos proyectos residenciales, comerciales y de obra civil, incorporando soluciones arquitectónicas innovadoras y principios de construcción sostenible, con especial atención al entorno natural.",
      "Nuestra filosofía se fundamenta en la transparencia, la responsabilidad y el cumplimiento de nuestros compromisos. Brindamos a nuestros clientes claridad durante cada etapa del proyecto, desde la búsqueda y selección del terreno hasta el diseño arquitectónico y la construcción, ofreciendo un acompañamiento integral y personalizado.",
    ],
    photo: puntaZicatelaIntroPhoto,
    photoCaption: "Punta Zicatela · Puerto Escondido, Oaxaca",
  },

  services: {
    eyebrow: "Catálogo de servicios",
    heading: "Soluciones constructivas e ingeniería",
    body: "No todos los proyectos se resuelven con el mismo sistema. Validamos cada partida con cálculo estructural y ejecutamos con personal técnico y maquinaria propia en proyectos residenciales, comerciales e industriales.",
  },

  projects: {
    eyebrow: "Portafolio seleccionado",
    heading: "Obra construida",
    body: "Una selección de obras proyectadas y entregadas por nuestra firma. Cada obra responde a su propio terreno, a su clima y al propósito de quien la habita.",
  },

  process: {
    eyebrow: "Metodología Casa Alta",
    heading: "Cómo trabajamos",
    body: "Para realizar un proyecto con Casa Alta es importante seguir los siguientes pasos para conocer el proceso creativo que elaboramos:",
  },

  differentiatorsIntro: {
    eyebrow: "Certeza tectónica",
    heading: "Por qué Casa Alta",
    body: "No separamos el cálculo en gabinete de la faena en terreno. Cada obra se ejecuta con precios cerrados por catálogo, supervisión DRO continua y el dominio artesanal de los materiales que resisten climas costeros, salinos y de alta radiación solar.",
    paragraphs: [
      "Abordamos cada encargo desde una perspectiva unificada: la arquitectura, el cálculo estructural y la dirección de obra convergen en un solo equipo responsable desde el primer trazo conceptual.",
      "Nuestra estructura operativa integra maquinaria propia, cuadrillas especializadas y presencia directa en Puerto Escondido y los Valles Centrales, garantizando control de costos y cumplimiento de plazos sin intermediación opaca.",
      "Construimos con honestidad constructiva y rigor técnico ante zonas de alta sismicidad y ambiente costero, empleando concreto aparente, chukum mineral y maderas tropicales curadas para edificar obras sólidas concebidas para perdurar.",
    ],
  },

  differentiators: {
    intro: {
      eyebrow: "Certeza tectónica",
      heading: "Por qué Casa Alta",
      body: "No separamos el cálculo en gabinete de la faena en terreno. Cada obra se ejecuta con precios cerrados por catálogo, supervisión DRO continua y el dominio artesanal de los materiales que resisten climas costeros, salinos y de alta radiación solar.",
      paragraphs: [
        "Abordamos cada encargo desde una perspectiva unificada: la arquitectura, el cálculo estructural y la dirección de obra convergen en un solo equipo responsable desde el primer trazo conceptual.",
        "Nuestra estructura operativa integra maquinaria propia, cuadrillas especializadas y presencia directa en Puerto Escondido y los Valles Centrales, garantizando control de costos y cumplimiento de plazos sin intermediación opaca.",
        "Construimos con honestidad constructiva y rigor técnico ante zonas de alta sismicidad y ambiente costero, empleando concreto aparente, chukum mineral y maderas tropicales curadas para edificar obras sólidas concebidas para perdurar.",
      ],
    },
    items: [],
    teamPhoto: teamBlueprintsPhoto,
    materialPhoto: materialChukumConcretePhoto,
  },

  testimonials: {
    intro: {
      eyebrow: "Respaldo y certidumbre",
      heading: "Garantía contractual de entrega por obra",
      body: "Nuestra credibilidad descansa en obras concluidas, memorias técnicas auditables y compromisos por escrito entregados en mano a cada propietario.",
    },
    items: [],
    dossiers: [],
  },

  closing: {
    eyebrow: "Primera reunión sin costo",
    heading: "Construir con Casa Alta es sencillo",
    body: "Hacer valer el esfuerzo de su trabajo requiere construir con calidad y cuidar los detalles de una buena ejecución. De eso nos ocupamos nosotros. Cuéntenos su idea y le ayudamos a desarrollarla.",
    cta: { label: "Agendar primera reunión", href: whatsappHref },
    photo: closingStudioPhoto,
  },

  contact: {
    eyebrow: "Contacto directo",
    heading: "Cuéntenos su proyecto",
    body: "Agende su primera reunión sin costo por Zoom o en nuestras oficinas de Puerto Escondido y Salina Cruz. Si prefiere atención inmediata, escríbanos por WhatsApp.",
    specialtiesLabel: "Especialidad de su proyecto",
    specialties: [
      "Arquitectura Residencial",
      "Ingeniería y Obra Civil",
      "Acabados de Alta Gama y Superficies de Importación",
      "Construcción Sustentable",
      "Remodelación / Gabinete",
    ],
    localitiesLabel: "Ubicación o plaza de ejecución",
    localities: [
      "Puerto Escondido",
      "Oaxaca Centro",
      "Salina Cruz",
      "Costa / Otra región",
    ],
    budgetRangesLabel: "Rango de inversión estimada",
    budgetRanges: [
      "$1.5M – $3.5M MXN",
      "$3.5M – $7M MXN",
      "$7M – $15M MXN",
      "Más de $15M MXN",
    ],
    timeframesLabel: "Plazo proyectado de inicio",
    timeframes: [
      "Inmediato (1–2 meses)",
      "3 a 6 meses",
      "6 a 12 meses",
      "Fase de planeación",
    ],
    name: { label: "Nombre", placeholder: "Su nombre completo" },
    email: { label: "Correo electrónico", placeholder: "nombre@correo.com" },
    phone: { label: "Teléfono / WhatsApp", placeholder: "951 000 0000" },
    message: {
      label: "Sobre su proyecto",
      placeholder:
        "Cuéntenos qué desea construir o remodelar, en qué localidad y para cuándo lo proyecta.",
    },
    submit: "Enviar mensaje",
    sending: "Enviando…",
    success: "Gracias. Recibimos su mensaje y le responderemos a la brevedad.",
    error:
      "No pudimos enviar el mensaje. Intente de nuevo o escríbanos directamente por WhatsApp.",
    whatsapp: "Escribir por WhatsApp",
  },
  contactPhoto: contactStudioPhoto,
};


