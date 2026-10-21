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
      "Conocimiento de las ideas y necesidades de su proyecto, en sesión presencial o por videollamada, definiendo las bases para iniciar el proceso creativo.",
    dir: "proyectos-integrales",
    base: "03-sesion-trabajo-revision-proyecto-ejecutivo-oficina",
  },
  {
    order: 2,
    title: "Paquete estándar",
    description:
      "Conjunto de estudios y planimetría indispensables para realizar el proyecto, evaluando la viabilidad del terreno y el alcance técnico preliminar.",
    dir: "proyectos-integrales",
    base: "02-detalle-revision-plano-ingenieria-detalle-constructivo",
  },
  {
    order: 3,
    title: "Proyecto e ingenierías",
    description:
      "Desarrollo de proyecto arquitectónico junto con ingenierías y sistemas constructivos, definiendo materiales y estructuras que erigirán los cimientos de la obra.",
    dir: "arquitectura-que-perdura",
    base: "08-acceso-doble-altura-celosia-circular-palmas",
  },
  {
    order: 4,
    title: "Certeza legal",
    description:
      "Asegura la inversión de cada etapa apegándonos a contrato de tiempos y estimaciones derivadas del cronograma, con ruta confiable para el respaldo fiscal y jurídico.",
    dir: "credibilidad",
    base: "01-arquitecto-chaleco-casa-alta-supervision-topografia",
  },
  {
    order: 5,
    title: "Ejecución y supervisión",
    description:
      "Experiencia y tecnología combinadas en supervisión permanente paso a paso en el control de calidad, definiendo la estructura fundamental y el carácter arquitectónico.",
    dir: "credibilidad",
    base: "06-armado-acero-estructural-zapata-trabajador-casa-alta",
  },
  {
    order: 6,
    title: "Entrega de obra",
    description:
      "Terminación de obra en base al tiempo acordado en las especificaciones del cronograma y programa de estimaciones, con acta de entrega-recepción firmada por ambas partes.",
    dir: "arquitectura-que-perdura",
    base: "02-fachada-tierra-camastros-madera-alberca-palmeras",
  },
  {
    order: 7,
    title: "Garantía post-entrega",
    description:
      "Ofrecemos garantía por escrito con vigencia según el tipo de proyecto (con garantía mínima de 6 meses), protegiendo la calidad constructiva y su patrimonio.",
    dir: "arquitectura-que-perdura",
    base: "04-patio-hamacas-huellas-piedra-alberca-palmeras",
  },
];


