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
    base: "15-paneles-sips-arquitectura-modular-sustentable-fachada",
    alt: "Construcción sustentable con paneles SIP: fachada modular blanca con terrazas y celosías de madera en entorno tropical",
  },
  {
    service: "proyectos-sostenibles",
    slug: "servicios-eco-sustentables-paneles-solares",
    dir: "arquitectura-sostenible",
    base: "15-paneles-sips-arquitectura-modular-sustentable-fachada",
    alt: "Construcción sustentable con paneles SIP: fachada modular blanca con terrazas y celosías de madera en entorno tropical",
  },
  {
    service: "construccion-habitacional",
    slug: "servicios-construccion-estructura-gruas",
    dir: "04-casa-melchor-ocampo",
    base: "04-fachada-amarilla-balcones-celosia",
    alt: "Fachada colonial contemporánea en amarillo con balcones de herrería, celosía de ladrillo y farol en Casa Melchor Ocampo",
  },
  {
    service: "construccion-comercial-industrial",
    slug: "servicios-construccion-comercial-nave-industrial",
    dir: "naves-industriales",
    base: "02-estacionamiento-comercial-estructura-metalica-losacero",
    alt: "Estacionamiento comercial techado con sistema estructural de losacero, vigas de acero y piso de concreto",
  },
  {
    service: "construccion-y-obra-civil",
    slug: "servicios-obra-civil-asfalto",
    dir: "obra-civil",
    base: "02-montaje-columna-prefabricada-en-candelero-cimentacion",
    alt: "Cuadrilla guiando la inserción y montaje de columna prefabricada de concreto en dado de cimentación para obra civil",
  },
  {
    service: "presforzado-y-estructura-metalica",
    slug: "servicios-estructura-metalica-trabes",
    dir: "obra-civil",
    base: "28-estructura-edificio-concreto-presforzado-claros-andamios",
    alt: "Estructura multinivel de ingeniería civil en concreto presforzado y marcos estructurales con claros amplios durante obra",
  },
  {
    service: "remodelacion-y-modernizacion",
    slug: "servicios-remodelacion-fachada-modernizada",
    dir: "remodelacion",
    base: "02-fachada-remodelada-blanca-dos-niveles-balcones-cristal",
    alt: "Fachada de residencia modernizada con acabados en blanco, dos niveles y cancelería contemporánea",
  },
  {
    service: "espacios-publicos-y-deportivos",
    slug: "servicios-espacios-publicos-estadio",
    dir: "espacios-publicos",
    base: "01-estadio-atletismo-pista-azul-graderio-techado",
    alt: "Estadio deportivo con pista de atletismo azul, campo de fútbol y graderío techado con iluminación",
  },
  {
    service: "skateparks",
    slug: "servicios-exterior-pista-skate",
    dir: "skateparks",
    base: "01-armado-acero-cimbra-curva-bowl-skatepark",
    alt: "Construcción de bowl y transiciones para skatepark con armado de acero estructural y cimbra curva de madera",
  },
  {
    service: "landscape",
    slug: "servicios-landscape-sendero-jardin",
    dir: "landscape",
    base: "01-masterplan-arquitectura-paisaje-parque-corredor-verde",
    alt: "Masterplan isométrico de arquitectura del paisaje con parque lineal, corredor biológico fluvial y senderos",
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
    dir: "instalaciones-electricas",
    base: "01-linieros-canastilla-mantenimiento-lineas-media-alta-tension",
    alt: "Maniobras de mantenimiento en red de distribución eléctrica de media y alta tensión con linieros en canastilla",
  },
  {
    service: "instalaciones-hidrosanitarias",
    slug: "servicios-instalaciones-tratamiento-agua",
    alt: "Tanques de sedimentación y sistemas de tratamiento de agua e infraestructura hidrosanitaria",
  },
];


