import type {
  CategoryTileContent,
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

/** Civil works: the crane hoisting a precast column in the columns project. */
const civilImage: Photo = {
  src: "/images/11-columnas-c1-c2/01-izado-columna-grua-jacaranda.avif",
  alt: "Grúa izando una columna prefabricada de concreto junto a un jacarandá en flor, en una obra civil al borde de la carretera",
  width: 1600,
  height: 1200,
};

/** Industrial works: a concrete mixer over fresh pavement. */
const industrialImage: Photo = {
  src: "/images/14-pavimentacion/01-revolvedora-concreto-sobre-pavimento.avif",
  alt: "Revolvedora de concreto sobre el pavimento recién tendido, bajo un cielo con nubes",
  width: 2000,
  height: 1500,
};

/**
 * Figures the client supplied directly. Left exactly as given -- notably 100%
 * for on-time delivery, which is a claim about their whole history and should
 * be re-confirmed before it goes to print.
 */
const stats: Stat[] = [
  { value: "2016", label: "Construyendo desde" },
  { value: "150+", label: "Obras entregadas" },
  { value: "50,000", label: "Metros cuadrados construidos" },
  { value: "100%", label: "Entregas cumplidas" },
];

/**
 * The four categories the tiles show, each illustrated by one project that has
 * the work for it. Only the mapping is authored here: the label comes from
 * `categoryLabels` in projects.ts and the photograph from the manifest, so the
 * tile renders whatever the archive holds for that project.
 *
 * Four, not seven: `industrial` has no project, `interiorismo` is not a
 * published project type, and Espacio público is a single project whose
 * category is better stated by the Capilla than by a tile. The four that
 * remain are the ones the studio's own portfolios are grouped under.
 */
const tiles: CategoryTileContent[] = [
  {
    category: "habitacional",
    projectDir: "07-casa-tarrastro",
    href: "/proyectos",
  },
  {
    category: "multifamiliar",
    projectDir: "10-obra-punta-zicatela",
    href: "/proyectos",
  },
  {
    category: "comercial",
    projectDir: "05-cafe-malagua",
    href: "/proyectos",
  },
  {
    category: "obra-civil",
    projectDir: "11-columnas-c1-c2",
    href: "/proyectos",
  },
];

/**
 * Landing copy. Formal register (usted), short sentences, warm rather than
 * aspirational, per the brief's tone rules. The brand's own line --
 * "Arquitectura que perdura", already in the logo -- is the through-line.
 */
export const home: HomePage = {
  hero: {
    // Names the studio's actual offices plus the capital, instead of the broad
    // geographic list of the sierra, costa, istmo and centro.
    eyebrow: "Puerto Escondido, Oaxaca centro y Salina Cruz",
    // One line per discipline, one photograph each: the carousel highlights the
    // line whose image is active.
    slides: [
      { title: "Arquitectura", photo: heroImage },
      { title: "Construcción civil", photo: civilImage },
      { title: "Construcción industrial", photo: industrialImage },
    ],
    subheadline:
      "Proyectos de ingeniería civil y proyectos ejecutivos arquitectónicos.",
    // White chrome over the hero's dark overlay; the header goes white once the
    // hero leaves the viewport. Measured against the rendered composition.
    chrome: { tone: "canvas" },
  },

  stats,

  // The client's own sentence from §2 of the brief ("Misión o propósito"),
  // verbatim, rendered nowhere until now. It replaced §7's "Arquitectura y
  // construcción que perdura" as the page's emotional line: that one restates
  // the logo's tagline, already in site.ts and repeated in the intro below.
  manifesto:
    "Ser una empresa que solucione todas las soluciones constructivas y dar función y carácter a cada proyecto que llega a nuestras manos.",

  tiles,

  intro: {
    eyebrow: "Quiénes somos",
    heading: "Arquitectura que perdura",
    body: "Somos una constructora oaxaqueña dedicada a resolver todas las necesidades constructivas de un proyecto, desde los sistemas más vanguardistas hasta la construcción tradicional. Trabajamos con proyectos residenciales, comerciales e industriales, y con obra civil. Cada proyecto que llega a nuestras manos recibe una solución pensada para él: función, carácter y un resultado que se sostiene en el tiempo.",
  },

  services: {
    eyebrow: "Servicios",
    heading: "Lo que construimos",
    body: "No todos los proyectos se resuelven con el mismo sistema. Estos son los frentes en los que trabajamos y las soluciones que ofrecemos en cada uno.",
  },

  projects: {
    eyebrow: "Proyectos",
    heading: "Obra construida",
    body: "Una selección de lo que hemos entregado en Oaxaca. Cada proyecto tiene su propia lógica, su propio terreno y su propio clima.",
  },

  process: {
    eyebrow: "Proceso",
    heading: "Cómo trabajamos",
    body: "Empezamos por escucharlo. De ahí sale un alcance, un presupuesto y un tiempo que después cumplimos.",
  },

  differentiators: {
    intro: {
      eyebrow: "Por qué Casa Alta",
      heading: "Decisiones que se sostienen",
      body: "La diferencia no está en lo que prometemos, sino en cómo decidimos cada partida de la obra.",
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
    cta: { label: "Contacto", href: whatsappHref },
  },

  // The form replaced the closing block as the contact section. The closing
  // copy now rides on the full-bleed photograph above it; this is the working
  // section a visitor lands on from the header's Contacto link.
  contact: {
    eyebrow: "Contacto",
    heading: "Cuéntenos su proyecto",
    body: "Déjenos sus datos y le responderemos por correo. Si prefiere una respuesta inmediata, escríbanos por WhatsApp.",
    name: { label: "Nombre", placeholder: "Su nombre" },
    email: { label: "Correo", placeholder: "nombre@correo.com" },
    phone: { label: "Teléfono", placeholder: "951 000 0000" },
    message: {
      label: "Mensaje",
      placeholder:
        "Cuéntenos qué quiere construir, dónde y para cuándo lo necesita.",
    },
    submit: "Enviar mensaje",
    sending: "Enviando…",
    success: "Gracias. Recibimos su mensaje y le responderemos a la brevedad.",
    error:
      "No pudimos enviar el mensaje. Intente de nuevo o escríbanos por WhatsApp.",
    whatsapp: "Escribir por WhatsApp",
  },
};
