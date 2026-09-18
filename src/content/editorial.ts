/**
 * Editorial (stock) imagery for the services section.
 *
 * This is the one place the site uses imagery that is not the studio's own work
 * (design.md §D7 / specs/stock-imagery). Each entry attaches one image to one
 * authored service, as section texture. These images are never captioned as the
 * studio's own work and never reach the portfolio, the masonry or a project
 * gallery — the separation is structural: sources live under
 * `images/editorial/`, never in the manifest.
 *
 * `alt` is authored copy, not the filename, and it describes what is visible
 * without claiming authorship.
 */
export interface EditorialRef {
  /** The service this image is texture for (`src/content/services.ts`). */
  service: string;
  /** The image slug, i.e. the directory name under `images/editorial/`. */
  slug: string;
  /** Authored alt text. Never describes the image as the studio's work. */
  alt: string;
}

export const editorialRefs: EditorialRef[] = [
  {
    service: "proyectos-arquitectonicos-integrales",
    slug: "servicios-proyecto-planos-arquitectonicos",
    alt: "Planos arquitectónicos y herramientas de dibujo sobre una mesa de trabajo",
  },
  {
    service: "arquitectura-interior",
    slug: "servicios-arquitectura-interior-cocina",
    alt: "Cocina contemporánea con isla de mármol y mobiliario a medida",
  },
  {
    service: "proyectos-eco-sustentables",
    slug: "servicios-eco-sustentables-paneles-solares",
    alt: "Paneles solares instalados sobre una cubierta, vistos desde el aire",
  },
  {
    service: "construccion-habitacional",
    slug: "servicios-construccion-estructura-gruas",
    alt: "Estructura de concreto en construcción junto a una grúa torre",
  },
  {
    service: "construccion-comercial-industrial",
    slug: "servicios-construccion-comercial-nave-industrial",
    alt: "Fachada de una nave industrial con accesos y patio de maniobras",
  },
  {
    service: "construccion-y-obra-civil",
    slug: "servicios-obra-civil-asfalto",
    alt: "Aplicación de asfalto caliente durante la pavimentación de una vialidad",
  },
  {
    service: "presforzado-y-estructura-metalica",
    slug: "servicios-estructura-metalica-trabes",
    alt: "Trabes de acero de una estructura metálica vistas a contraluz",
  },
  {
    service: "espacios-publicos-y-deportivos",
    slug: "servicios-espacios-publicos-estadio",
    alt: "Graderío de un estadio vacío visto desde la cancha",
  },
  {
    service: "skateparks",
    slug: "servicios-exterior-pista-skate",
    alt: "Rampa y barandal de concreto en una pista de skate al aire libre",
  },
  {
    service: "landscape",
    slug: "servicios-landscape-sendero-jardin",
    alt: "Sendero entre áreas verdes y palmeras en un jardín",
  },
  {
    service: "albercas-y-espacios-exteriores",
    slug: "servicios-albercas-villa-exterior",
    alt: "Alberca de una villa moderna con área de descanso exterior",
  },
  {
    service: "instalaciones-electricas",
    slug: "servicios-instalaciones-electricas-subestacion",
    alt: "Transformador de una subestación eléctrica al aire libre",
  },
  {
    service: "instalaciones-hidrosanitarias",
    slug: "servicios-instalaciones-tratamiento-agua",
    alt: "Vista aérea de tanques circulares de sedimentación de agua",
  },
];
