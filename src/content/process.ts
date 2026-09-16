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
      "Nos sentamos con usted, por Zoom o en persona. Escuchamos qué necesita y le preguntamos lo que hace falta saber: para cuándo lo necesita, con qué presupuesto cuenta y cómo imagina el final del proyecto.",
  },
  {
    order: 2,
    title: "Propuesta y presupuesto",
    description:
      "Le entregamos el alcance por escrito, el tiempo estimado de ejecución y la estimación económica. Sin partidas que aparezcan después.",
  },
  {
    order: 3,
    title: "Proyecto",
    description:
      "Contratado el paquete, desarrollamos el proyecto arquitectónico y ejecutivo, y definimos con usted los sistemas y materiales que le convienen.",
  },
  {
    order: 4,
    title: "Ejecución",
    description:
      "Aquí está nuestro mayor cuidado. Supervisión permanente en obra, procesos revisados paso a paso y control de calidad en cada etapa. Es la parte que define cómo va a envejecer su construcción.",
  },
  {
    order: 5,
    title: "Entrega",
    description:
      "Entregamos en el tiempo acordado y con las especificaciones que se firmaron al inicio. Es el compromiso que asumimos desde la primera reunión.",
  },
  {
    order: 6,
    title: "Seguimiento posterior",
    description:
      "Después de la entrega seguimos disponibles. Una obra no termina el día que se entregan las llaves.",
  },
];
