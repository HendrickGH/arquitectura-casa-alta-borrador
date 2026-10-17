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
    title: "Primera reunión, sin costo",
    description:
      "Nos sentamos con usted, por Zoom o en persona en Puerto Escondido o Salina Cruz. Escuchamos qué necesita y definimos las bases reales: para cuándo lo requiere, con qué presupuesto cuenta y cómo imagina el final de su proyecto.",
    deliverables: [
      "Asesoría inicial sin costo (Zoom o presencial)",
      "Diagnóstico de terreno, clima y viabilidad",
    ],
    dir: "proyectos-integrales",
    base: "03-sesion-trabajo-revision-proyecto-ejecutivo-oficina",
  },
  {
    order: 2,
    title: "Propuesta y presupuesto",
    description:
      "Le entregamos el alcance técnico por escrito, el cronograma estimado de ejecución y el presupuesto desglosado por partidas. Sin costos sorpresivos ni conceptos que aparezcan a mitad de la obra.",
    deliverables: [
      "Alcance por escrito y catálogo de conceptos",
      "Programa de obra y estimación económica transparente",
    ],
    dir: "proyectos-integrales",
    base: "02-detalle-revision-plano-ingenieria-detalle-constructivo",
  },
  {
    order: 3,
    title: "Paquete estándar de proyecto",
    description:
      "Contratado el paquete, desarrollamos la ingeniería y la arquitectura completa antes de abrir cepa en el terreno: diseño arquitectónico, planos ejecutivos, cálculo estructural y visualización.",
    deliverables: [
      "Anteproyecto y diseño arquitectónico",
      "Proyecto ejecutivo y detalles constructivos",
      "Cálculo estructural y validación de sistemas",
      "Renders y visualización de alta calidad",
    ],
    dir: "arquitectura-que-perdura",
    base: "08-acceso-doble-altura-celosia-circular-palmas",
  },
  {
    order: 4,
    title: "Certeza legal y planeación",
    description:
      "Formalizamos cada compromiso por contrato: especificaciones técnicas de materiales, tiempos de entrega y alcances legales claros para proteger su inversión y su patrimonio desde el primer día.",
    deliverables: [
      "Contrato con especificaciones y plazos firmados",
      "Certeza jurídica sobre alcances y materiales",
    ],
    dir: "credibilidad",
    base: "01-arquitecto-chaleco-casa-alta-supervision-topografia",
  },
  {
    order: 5,
    title: "Ejecución y supervisión en obra",
    description:
      "Aquí está nuestro mayor cuidado. Supervisión permanente en sitio por arquitectos e ingenieros residentes, control de calidad en aceros y colados, y revisión rigurosa de cada detalle constructivo.",
    deliverables: [
      "Residencia de obra y supervisión permanente",
      "Control de calidad de materiales y procesos",
      "Reportes fotográficos y técnicos de avance",
    ],
    dir: "credibilidad",
    base: "06-armado-acero-estructural-zapata-trabajador-casa-alta",
  },
  {
    order: 6,
    title: "Entrega en tiempo y forma",
    description:
      "Entregamos en el plazo acordado y con las especificaciones que se firmaron al inicio, después de verificar instalaciones eléctricas, hidrosanitarias y acabados finales.",
    deliverables: [
      "Pruebas de funcionamiento e instalaciones",
      "Recorrido de recepción y entrega de llaves",
    ],
    dir: "arquitectura-que-perdura",
    base: "02-fachada-tierra-camastros-madera-alberca-palmeras",
  },
  {
    order: 7,
    title: "Garantía y seguimiento post-entrega",
    description:
      "Una obra no termina el día que se entregan las llaves. Respaldamos nuestra ejecución con garantía por escrito y permanecemos disponibles para el seguimiento posterior de su inmueble.",
    deliverables: [
      "Garantía de obra y vicios ocultos por escrito",
      "Acompañamiento y mantenimiento post-entrega",
    ],
    dir: "arquitectura-que-perdura",
    base: "04-patio-hamacas-huellas-piedra-alberca-palmeras",
  },
];


