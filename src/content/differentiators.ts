import type { Differentiator } from "@/types/content";

/**
 * What actually separates Casa Alta, taken from the brief rather than from
 * generic industry claims. The brief's own priorities were experience, the use
 * of materials and systems, and the service given from the project stage on.
 */
export const differentiators: Differentiator[] = [
  {
    title: "Presupuesto y plazos cerrados",
    description:
      "Sin sobrecostos sorpresa ni partidas abiertas. Cada concepto se vincula a un catálogo de precios unitarios y calendario de obra firmado bajo contrato con penalización por desfase.",
    tag: "Certeza contractual y financiera",
    points: [
      "Catálogo de conceptos y precios unitarios cerrados por contrato",
      "Ruta crítica y calendario de estimaciones por hito constructivo",
      "Garantía por escrito post-entrega en vicios ocultos y acabados",
    ],
    dir: "credibilidad",
    base: "03-camioneta-constructora-casa-alta-frente-obra",
  },
  {
    title: "Cálculo estructural y DRO propio",
    description:
      "No subcontratamos la firma ni el criterio estructural. Validamos cimentación, marcos y losas bajo normas sismorresistentes para zonas de alta sismicidad con Director Responsable de Obra en casa.",
    tag: "Seguridad y normativa sísmica",
    points: [
      "Memoria de cálculo y firma DRO avalada ante colegios oficiales",
      "Ingeniería adaptada a sismos, empuje de vientos costeros y mecánica de suelos",
      "Supervisión continua en sitio registrada en bitácora oficial de obra",
    ],
    dir: "obra-civil",
    base: "03-colocacion-capitel-prefabricado-sobre-columna-concreto",
  },
  {
    title: "Cuadrillas y maquinaria propia",
    description:
      "Control directo del frente de trabajo sin intermediación opaca. Disponemos de equipo propio para excavación, armado de acero, colados y montaje pesado en cualquier frente de obra.",
    tag: "Control de ejecución y logística",
    points: [
      "Cuadrillas especializadas en fierrería, carpintería de obra y colados",
      "Maquinaria propia para excavación, presfuerzo y bombeo de concreto",
      "Cobertura y cadena de suministro en Puerto Escondido, Valles Centrales e Istmo",
    ],
    dir: "credibilidad",
    base: "02-trabajador-uniforme-casa-alta-armado-acero-playa",
  },
  {
    title: "Arquitectura regional nativa",
    description:
      "Diseño vanguardista y dominio de los materiales nobles y regionales: concreto aparente, recubrimiento chukum impermeable, maderas tropicales curadas y cubiertas artesanales de palma.",
    tag: "Materialidad noble y clima",
    points: [
      "Diseño contemporáneo integrado al paisaje y la orientación solar",
      "Chukum mineral, madera de parota certificada y celosías artesanales",
      "Soluciones bioclimáticas para confort térmico y alta plusvalía patrimonial",
    ],
    dir: "arquitectura-sostenible",
    base: "05-materiales-locales-chukum-madera-palapa-costera",
  },
];

