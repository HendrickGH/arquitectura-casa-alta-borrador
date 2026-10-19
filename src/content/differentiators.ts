import type { Differentiator } from "@/types/content";

/**
 * What actually separates Casa Alta, taken from the brief rather than from
 * generic industry claims. The brief's own priorities were experience, the use
 * of materials and systems, and the service given from the project stage on.
 */
export const differentiators: Differentiator[] = [
  {
    title: "El sistema se elige por cálculo",
    description:
      "Losa aligerada, concreto armado, presforzado o estructura metálica: validamos cada opción con cálculo estructural y decidimos según precio, tiempo de ejecución y la zona de la obra. El clima de la sierra no resiste lo mismo que el de la costa, y eso cambia el proyecto.",
    tag: "Cálculo estructural y sistemas",
    points: [
      "Validación de losas, marcos y cimentación con cálculo estructural",
      "Adaptación térmica y sísmica para costa, valles o sierra oaxaqueña",
      "Optimización de costos y plazos con personal técnico calificado",
    ],
    dir: "obra-civil",
    base: "01-grua-izando-parrilla-acero-cimentacion-vialidad",
  },
  {
    title: "Se entrega lo que se firmó",
    description:
      "Nuestro compromiso es entregar en el tiempo acordado y con las especificaciones del contrato inicial. Es la razón por la que nos vuelven a llamar.",
    tag: "Certeza contractual y plazos",
    points: [
      "Entrega rigurosa en tiempo y catálogo de conceptos firmado",
      "Supervisión continua en sitio registrada en bitácora de obra",
      "Garantía por escrito post-entrega en estructura y acabados",
    ],
    dir: "credibilidad",
    base: "01-arquitecto-chaleco-casa-alta-supervision-topografia",
  },
  {
    title: "Experiencia en todo Oaxaca",
    description:
      "Hemos construido en la sierra, en la costa, en el Istmo y en el centro del estado. Conocemos el terreno, la logística y los proveedores de cada región.",
    tag: "Cobertura logística en Oaxaca",
    points: [
      "Operación en Puerto Escondido, Oaxaca Centro, Salina Cruz e Istmo",
      "Conocimiento de logística, normativas y proveeduría regional",
      "Capacidad para obra civil pesada, puentes y naves industriales",
    ],
    dir: "arquitectura-sostenible",
    base: "01-asoleadero-alberca-ventilacion-cruzada-arquitectura-tierra",
  },
  {
    title: "Experiencia local, diseño actual",
    description:
      "Desde una casa habitación hasta obra de mayor complejidad. Diseño vanguardista, renders de alta calidad y supervisión cuidada en el detalle.",
    tag: "Diseño vanguardista y tradición",
    points: [
      "Renders hiperrealistas y proyecto ejecutivo completo en gabinete",
      "Uso de maderas tropicales parota, chukum y palapa artesanal",
      "Detalle constructivo de alta gama y plusvalía patrimonial",
    ],
    dir: "arquitectura-que-perdura",
    base: "02-fachada-tierra-camastros-madera-alberca-palmeras",
  },
];

