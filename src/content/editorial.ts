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
  /** Authored alt text. */
  alt: string;
  /**
   * Optional manifest directory and photo base when the studio's own archive
   * now provides a real photograph for this service (`images-optimizado/`).
   */
  dir?: string;
  base?: string;
}

export const editorialRefs: EditorialRef[] = [
  {
    service: "proyectos-arquitectonicos-integrales",
    slug: "servicios-proyecto-planos-arquitectonicos",
    dir: "proyectos-integrales",
    base: "01-arquitectos-revisando-planos-estructurales-mesa-madera",
    alt: "Dos arquitectos de Casa Alta trabajando y haciendo anotaciones sobre planos ejecutivos en mesa de juntas de madera",
  },
  {
    service: "arquitectura-interior",
    slug: "servicios-arquitectura-interior-cocina",
    dir: "arquitectura-interiores",
    base: "03-cocina-comedor-muro-terracota-techo-bambu-isla",
    alt: "Cocina y comedor de diseño con isla monolítica en piedra de importación, mesa de madera, muro terracota y cubierta de bambú",
  },
  {
    service: "proyectos-eco-sustentables",
    slug: "servicios-eco-sustentables-paneles-solares",
    dir: "arquitectura-sostenible",
    base: "01-asoleadero-alberca-ventilacion-cruzada-arquitectura-tierra",
    alt: "Arquitectura bioclimática en tonos tierra con amplios vanos para ventilación cruzada, terraza sombreada y alberca",
  },
  {
    service: "construccion-habitacional",
    slug: "servicios-construccion-estructura-gruas",
    dir: "07-casa-tarrastro",
    base: "10-fachada-frontal-pergola-superior-ventanales",
    alt: "Residencia unifamiliar contemporánea con terraza techada, cancelería de piso a techo y pérgola superior en Oaxaca",
  },
  {
    service: "construccion-comercial-industrial",
    slug: "servicios-construccion-comercial-nave-industrial",
    dir: "naves-industriales",
    base: "01-maniobra-gruas-izado-muros-prefabricados-concreto",
    alt: "Dos grúas realizando maniobra de izado y montaje de muros prefabricados de concreto de gran altura para nave industrial",
  },
  {
    service: "construccion-y-obra-civil",
    slug: "servicios-obra-civil-asfalto",
    dir: "obra-civil",
    base: "10-montaje-trabes-cajon-puente-sobre-pilas-concreto",
    alt: "Colocación y montaje de trabes cajón de concreto sobre pilas estructurales durante la construcción de un puente vehicular",
  },
  {
    service: "presforzado-y-estructura-metalica",
    slug: "servicios-estructura-metalica-trabes",
    dir: "obra-civil",
    base: "11-conjunto-porticos-columnas-trabes-prefabricadas-obra",
    alt: "Vista general de pórticos estructurales armados con columnas y trabes prefabricadas de concreto presforzado",
  },
  {
    service: "espacios-publicos-y-deportivos",
    slug: "servicios-espacios-publicos-estadio",
    alt: "Graderío de un estadio y equipamiento deportivo para eventos de gran concurrencia",
  },
  {
    service: "skateparks",
    slug: "servicios-exterior-pista-skate",
    alt: "Rampa, transiciones de concreto pulido y barandales en pista de skate al aire libre",
  },
  {
    service: "landscape",
    slug: "servicios-landscape-sendero-jardin",
    dir: "arquitectura-sostenible",
    base: "02-jardines-nativos-alberca-cubiertas-palma-natural",
    alt: "Integración de vegetación nativa, espejo de agua y cubiertas de palma natural en jardín costero",
  },
  {
    service: "albercas-y-espacios-exteriores",
    slug: "servicios-albercas-villa-exterior",
    dir: "arquitectura-sostenible",
    base: "03-espejo-agua-alberca-sombra-palmeras-microclima",
    alt: "Perspectiva de alberca con espejo de agua entre palmeras y terrazas sombreadas en la costa de Oaxaca",
  },
  {
    service: "instalaciones-electricas",
    slug: "servicios-instalaciones-electricas-subestacion",
    alt: "Transformador y subestación eléctrica de media y alta tensión al aire libre",
  },
  {
    service: "instalaciones-hidrosanitarias",
    slug: "servicios-instalaciones-tratamiento-agua",
    alt: "Tanques de sedimentación y sistemas de tratamiento de agua e infraestructura hidrosanitaria",
  },
];


