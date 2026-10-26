import type { ProcessStep } from "@/types/content";

/**
 * The working process. This is a genuine sequence, which is why the landing
 * numbers it -- the numbering encodes order rather than decorating a set.
 *
 * Sourced from the brief: free first consultation (Zoom or in person), then the
 * contracted package, then execution, then post-handover follow-up. The brief
 * singled out on-site execution and attention to detail as the stage to
 * emphasise, so step 4 carries the most weight in the copy.
 */
export const processSteps: ProcessStep[] = [
  {
    order: 1,
    title: "Primera reunión (asesoría)",
    description:
      "Conocimiento de las ideas y requerimientos para definir las bases iniciales del proceso creativo que elaboramos.",
    dir: "proyectos-integrales",
    base: "03-sesion-trabajo-revision-proyecto-ejecutivo-oficina",
  },
  {
    order: 2,
    title: "Paquete estándar",
    description:
      "Es el conjunto de estudios y planimetría para realizar un proyecto. Más información detallada durante la primera reunión.",
    dir: "proyectos-integrales",
    base: "02-detalle-revision-plano-ingenieria-detalle-constructivo",
  },
  {
    order: 3,
    title: "Proyecto",
    description:
      "Desarrollo de proyecto arquitectónico, junto con ingenierías y sistemas constructivos, definiendo así los materiales y estructuras que erigirán los cimientos de la obra.",
    dir: "arquitectura-que-perdura",
    base: "08-acceso-doble-altura-celosia-circular-palmas",
  },
  {
    order: 4,
    title: "Ejecución",
    description:
      "La experiencia y la tecnología se combinan en el proceso permanente de la obra, logrando con ello una supervisión paso a paso en el control de calidad de cada etapa; esta parte define la estructura fundamental de la construcción y el carácter arquitectónico de cada obra.",
    dir: "credibilidad",
    base: "06-armado-acero-estructural-zapata-trabajador-casa-alta",
  },
  {
    order: 5,
    title: "Certeza legal",
    description:
      "Asegura la inversión de cada etapa del proyecto apegándonos a un contrato de tiempos y estimaciones derivadas del cronograma de obra. Establecemos una ruta confiable y estratégica para el respaldo fiscal y jurídico de las estimaciones de obra.",
    dir: "credibilidad",
    base: "01-arquitecto-chaleco-casa-alta-supervision-topografia",
  },
  {
    order: 6,
    title: "Entrega",
    description:
      "La terminación de obra se establece con base en el tiempo acordado en las especificaciones del cronograma de obra y programa de estimaciones, dando con ello un acta de entrega-recepción que se firma por ambas partes.",
    dir: "arquitectura-que-perdura",
    base: "02-fachada-tierra-camastros-madera-alberca-palmeras",
  },
  {
    order: 7,
    title: "Garantía post-entrega",
    description:
      "Ofrecemos una garantía por escrito con una vigencia que depende del tipo de proyecto (garantía mínima de 6 meses).",
    dir: "arquitectura-que-perdura",
    base: "04-patio-hamacas-huellas-piedra-alberca-palmeras",
  },
];


