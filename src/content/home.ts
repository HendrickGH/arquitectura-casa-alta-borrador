import type {
  CategoryTileContent,
  DivisionCardContent,
  HomePage,
  Photo,
  Stat,
} from "@/types/content";
import { whatsappHref } from "./site";

/** The landing hero. Encoded by tools/hero.sh, served through the image loader. */
const heroImage: Photo = {
  src: "/images/hero/vista-aerea-palapas-alberca-playa.avif",
  alt: "Vista aérea de las villas de El Bicho en Punta Zicatela: tres niveles de palapa triangular, alberca de fondo negro y la playa al frente",
  width: 1600,
  height: 900,
};

/** Civil works: heavy crane hoisting a precast structural concrete frame. */
const civilImage: Photo = {
  src: "/images/hero/montaje-estructura-puente-grua-obra-civil.avif",
  alt: "Maniobra de izado con grúa de elemento prefabricado de concreto sobre superestructura de puente bajo cielo despejado",
  width: 1280,
  height: 960,
};

/** Industrial construction: crane operations hoisting precast concrete walls for industrial building. */
const industrialImage: Photo = {
  src: "/images/hero/maniobra-gruas-nave-industrial-prefabricados.avif",
  alt: "Maniobra de grúas para izado de muros y estructura prefabricada de concreto en nave industrial",
  width: 1280,
  height: 960,
};

/** Full-color aerial reference photo of Punta Zicatela placed after Quiénes somos (PDF p. 2). */
const introAerialPhoto: Photo = {
  src: "/images/02-el-bicho/57-panoramica-aerea-conjunto-costero-zicatela.avif",
  alt: "Panorámica aérea a color del conjunto arquitectónico con cubiertas de palma en Punta Zicatela, Puerto Escondido, con la costa y las montañas de Oaxaca al fondo",
  width: 1280,
  height: 720,
};

/** Secondary studio photograph for Quiénes somos: on-site coastal construction supervision. */
const introSupervisionPhoto: Photo = {
  src: "/images/credibilidad/02-trabajador-uniforme-casa-alta-armado-acero-playa.avif",
  alt: "Personal técnico de Casa Alta con uniforme institucional armando estructura de acero frente al mar en la costa de Oaxaca",
  width: 1200,
  height: 1600,
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

/**
 * Figures the client supplied directly.
 */
const stats: Stat[] = [
  { value: "2016", label: "Construyendo desde" },
  { value: "150+", label: "Obras entregadas" },
  { value: "50,000", label: "Metros cuadrados construidos" },
  { value: "100%", label: "Entregas cumplidas" },
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
      "Proyectos ejecutivos y construcción integral de casas de descanso, villas costeras y desarrollos multifamiliares pensados para la plusvalía y el clima de Oaxaca.",
    href: "/proyectos",
    dir: "arquitectura-que-perdura",
    base: "05-volumen-tres-niveles-chukum-remate-palapa",
  },
  {
    number: "02",
    title: "Ingeniería y Obra Civil",
    subtitle: "Estructuras · Puentes · Naves",
    description:
      "Concreto armado y presforzado, montaje con grúas de gran capacidad, puentes vehiculares y peatonales, pavimentación hidráulica y naves industriales.",
    href: "/servicios",
    dir: "obra-civil",
    base: "01-grua-izando-parrilla-acero-cimentacion-vialidad",
  },
  {
    number: "03",
    title: "Arquitectura de Interiores / Cosentino",
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
      "Arquitectura para clima tropical que optimiza la carga térmica y acústica mediante vientos cruzados, celosías, chukum, palma natural y energías limpias.",
    href: "/construccion-sustentable",
    dir: "arquitectura-sostenible",
    base: "05-materiales-locales-chukum-madera-palapa-costera",
  },
];

export const home: HomePage = {
  hero: {
    eyebrow: "Puerto Escondido, Oaxaca centro y Salina Cruz",
    slides: [
      { title: "Arquitectura", photo: heroImage },
      { title: "Construcción civil", photo: civilImage },
      { title: "Construcción industrial", photo: industrialImage },
    ],
    subheadline:
      "Proyectos de ingeniería civil y proyectos ejecutivos arquitectónicos.",
    chrome: { tone: "canvas" },
  },

  stats,

  // The architect's philosophical statement from the client brief (PDF p. 4).
  manifesto:
    "La arquitectura es el medio de expresión donde se crea el espacio íntimo que envuelve al ser para su desarrollo.",
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
    heading: "CASA ALTA · Arquitectura que perdura",
    body: "Somos una constructora oaxaqueña dedicada a resolver todas las necesidades constructivas de un proyecto, desde los sistemas más vanguardistas hasta la construcción tradicional. Trabajamos con proyectos residenciales, comerciales e industriales, y con obra civil.",
    paragraphs: [
      "Cada proyecto que llega a nuestras manos recibe una solución pensada para él: cálculo estructural, selección de materiales según el clima real de la costa, la sierra o el valle, y un resultado que se sostiene en el tiempo.",
      "Nuestra misión es dar función, carácter y certeza técnica y legal a cada espacio que construimos, respaldando su patrimonio desde el primer trazo hasta la garantía post-entrega.",
    ],
    photo: introAerialPhoto,
    photoCaption:
      "Conjunto arquitectónico en Punta Zicatela, Puerto Escondido — Vista aérea en su versión original a color.",
    secondaryPhoto: introSupervisionPhoto,
    secondaryPhotoCaption:
      "Supervisión técnica permanente y armado estructural en obra costera.",
  },

  services: {
    eyebrow: "Catálogo de servicios",
    heading: "Soluciones constructivas e ingeniería",
    body: "No todos los proyectos se resuelven con el mismo sistema. Validamos cada partida con cálculo estructural y ejecutamos con personal y maquinaria propia en todo Oaxaca.",
  },

  projects: {
    eyebrow: "Portafolio seleccionado",
    heading: "Obra construida",
    body: "Una selección de lo que hemos proyectado y entregado en Oaxaca. Cada obra responde a su propio terreno, a su clima y al propósito de quien la habita.",
  },

  process: {
    eyebrow: "Metodología Casa Alta",
    heading: "Cómo trabajamos",
    body: "Empezamos por escucharlo sin costo. De ahí nace un paquete ejecutivo completo, certeza legal por contrato, supervisión permanente en obra y garantía por escrito.",
  },

  differentiators: {
    intro: {
      eyebrow: "Por qué Casa Alta",
      heading: "Decisiones que se sostienen",
      body: "La diferencia no está en lo que prometemos, sino en cómo calculamos, supervisamos y respaldamos cada partida de la obra.",
    },
    items: [],
  },

  testimonials: {
    intro: {
      eyebrow: "Clientes",
      heading: "Lo que dicen de nosotros",
      body: "",
    },
    items: [],
  },

  closing: {
    heading: "Construir con Casa Alta es sencillo",
    body: "Hacer valer el esfuerzo de su trabajo requiere construir con calidad y cuidar los detalles de una buena ejecución. De eso nos ocupamos nosotros. Cuéntenos su idea y le ayudamos a desarrollarla.",
    cta: { label: "Agendar primera reunión", href: whatsappHref },
  },

  contact: {
    eyebrow: "Contacto directo",
    heading: "Cuéntenos su proyecto",
    body: "Agende su primera reunión sin costo por Zoom o en nuestras oficinas de Puerto Escondido y Salina Cruz. Si prefiere atención inmediata, escríbanos por WhatsApp.",
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


