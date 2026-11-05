/**
 * Editorial imagery for the services section.
 *
 * Each entry attaches one photograph from the studio's optimized archive
 * (`images-optimizado/<dir>/<base>`) to one authored service (`src/content/services.ts`).
 *
 * `alt` is authored copy, not the filename, and describes what is visible.
 */
export interface EditorialRef {
  /** The service this image is attached to (`src/content/services.ts`). */
  service: string;
  /** Manifest directory under `images-optimizado/`. */
  dir: string;
  /** Photo base name in `manifest.json`. */
  base: string;
  /** Authored alt text. */
  alt: string;
}

export const editorialRefs: EditorialRef[] = [
  {
    service: "proyectos-arquitectonicos-integrales",
    dir: "proyectos-integrales",
    base: "01-arquitectos-revisando-planos-estructurales-mesa-madera",
    alt: "Dos arquitectos de Casa Alta trabajando y haciendo anotaciones sobre planos ejecutivos en mesa de juntas de madera",
  },
  {
    service: "arquitectura-interior",
    dir: "arquitectura-interiores",
    base: "03-cocina-comedor-muro-terracota-techo-bambu-isla",
    alt: "Cocina y comedor de diseño con isla monolítica en piedra de importación, mesa de madera, muro terracota y cubierta de bambú",
  },
  {
    service: "proyectos-eco-sustentables",
    dir: "arquitectura-sostenible",
    base: "15-paneles-sips-arquitectura-modular-sustentable-fachada",
    alt: "Construcción sustentable con paneles SIP: fachada modular blanca con terrazas y celosías de madera en entorno tropical",
  },
  {
    service: "proyectos-sostenibles",
    dir: "arquitectura-sostenible",
    base: "15-paneles-sips-arquitectura-modular-sustentable-fachada",
    alt: "Construcción sustentable con paneles SIP: fachada modular blanca con terrazas y celosías de madera en entorno tropical",
  },
  {
    service: "construccion-habitacional",
    dir: "07-casa-tarrastro",
    base: "12-fachada-principal-dos-niveles-pergola-jardin",
    alt: "Fachada principal contemporánea de Casa Tarrastro con muros de cantera, pérgolas metálicas y jardín terminado",
  },
  {
    service: "construccion-comercial-industrial",
    dir: "naves-industriales",
    base: "03-estacionamiento-comercial-losacero-columnas-acero-rampa",
    alt: "Estacionamiento comercial techado con sistema de entrepiso losacero, columnas de acero y rampa de acceso",
  },
  {
    service: "construccion-y-obra-civil",
    dir: "obra-civil",
    base: "02-montaje-columna-prefabricada-en-candelero-cimentacion",
    alt: "Cuadrilla guiando la inserción y montaje de columna prefabricada de concreto en dado de cimentación para obra civil",
  },
  {
    service: "presforzado-y-estructura-metalica",
    dir: "obra-civil",
    base: "29-edificio-concreto-presforzado-marcos-estructurales-andamiaje",
    alt: "Estructura multinivel de ingeniería civil en concreto presforzado y marcos estructurales con andamios durante obra",
  },
  {
    service: "remodelacion-y-modernizacion",
    dir: "remodelacion",
    base: "02-fachada-remodelada-blanca-dos-niveles-balcones-cristal",
    alt: "Fachada de residencia modernizada con acabados en blanco, dos niveles y cancelería contemporánea",
  },
  {
    service: "espacios-publicos-y-deportivos",
    dir: "espacios-publicos",
    base: "02-estadio-deportivo-pista-atletismo-azul-graderio",
    alt: "Estadio deportivo con pista de tartán azul de atletismo, cancha de fútbol reglamentario y graderío techado",
  },
  {
    service: "skateparks",
    dir: "skateparks",
    base: "02-construccion-bowl-skatepark-cimbra-curva-armado-acero",
    alt: "Construcción de bowl y transiciones para skatepark con armado de acero estructural y cimbra curva de madera",
  },
  {
    service: "landscape",
    dir: "landscape",
    base: "02-masterplan-paisajismo-parque-lineal-corredor-fluvial",
    alt: "Masterplan axonométrico de arquitectura del paisaje con parque lineal, corredor biológico fluvial y senderos",
  },
  {
    service: "albercas-y-espacios-exteriores",
    dir: "arquitectura-sostenible",
    base: "03-espejo-agua-alberca-sombra-palmeras-microclima",
    alt: "Perspectiva de alberca con espejo de agua entre palmeras y terrazas sombreadas en la costa de Oaxaca",
  },
  {
    service: "instalaciones-electricas",
    dir: "instalaciones-electricas",
    base: "02-linieros-canastilla-mantenimiento-red-electrica-media-tension",
    alt: "Maniobras de mantenimiento en red de distribución eléctrica de media y alta tensión con linieros en canastilla",
  },
  {
    service: "instalaciones-hidrosanitarias",
    dir: "instalaciones-hidrosanitarias",
    base: "01-sistema-biodigestor-cisterna-tratamiento-aguas-residuales",
    alt: "Instalación de sistema de biodigestores, cisternas y tratamiento de aguas residuales en obra residencial costera",
  },
];


