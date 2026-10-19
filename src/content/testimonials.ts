import type { InstitutionalDossier, Testimonial } from "@/types/content";

/**
 * EMPTY ON PURPOSE. Do not fill this with placeholder quotes.
 *
 * The brief asked for testimonials but confirmed there are none yet: no client
 * quotes, no reviews, no ratings ("NO TENEMOS IDEA", "NO NADA AUN"). Inventing
 * quotes and attributing them to named real projects would put fabricated
 * endorsements in front of buyers -- that is deceptive advertising, and in
 * Mexico it is what PROFECO regulates. It is also trivially discoverable: the
 * projects named here are real and their owners can be asked.
 *
 * The type, the component and the section are all built and waiting. The
 * landing renders the section only when this array has entries, so nothing
 * looks broken in the meantime.
 *
 * To go live, the brief said video is the preferred format. The fastest real
 * path: ask two or three past clients for a short clip or a written line, then
 * record them here with their project name as the attribution.
 */
export const testimonials: Testimonial[] = [];

/**
 * Verified institutional project guarantees rendered when client testimonials
 * have not yet been collected.
 */
export const institutionalDossiers: InstitutionalDossier[] = [
  {
    id: "plaza-esmeralda",
    code: "EXP-01 / COM",
    title: "Plaza Esmeralda",
    location: "Puerto Escondido, Oaxaca",
    typology: "Comercial y Uso Mixto",
    surface: "4,500 m²",
    year: "2021",
    commitment:
      "Toda obra en franja costera exige resistencia a ambiente salino, vientos huracanados y cimentación profunda. Cada metro cuadrado fue entregado con memoria de cálculo avalada y póliza de garantía estructural por escrito.",
    points: [
      "Pruebas de compresión de concreto en laboratorio certificado",
      "Bitácora de obra con firma de Director Responsable de Obra (DRO)",
      "Garantía contractual en impermeabilización y estructura de concreto",
    ],
    seal: "ENTREGA-RECEPCIÓN CONFORME",
  },
  {
    id: "villas-el-bicho",
    code: "EXP-02 / RES",
    title: "Villas El Bicho",
    location: "Puerto Escondido, Oaxaca",
    typology: "Residencial Turístico Bioclimático",
    surface: "1,200 m²",
    year: "2023",
    commitment:
      "La arquitectura de playa requiere maderas tropicales curadas, palapas artesanales de alta durabilidad y albercas con acabado chukum garantizado contra fisuras y filtraciones.",
    points: [
      "Madera certificada con tratamiento autoclave anti-plagas",
      "Instalaciones hidroneumáticas y sanitarias presurizadas y testeadas",
      "Póliza post-entrega de vicios ocultos y acabados de autor",
    ],
    seal: "EXPEDIENTE CERRADO SIN VICIOS",
  },
  {
    id: "puente-obra-civil",
    code: "EXP-03 / CIV",
    title: "Infraestructura y Obra Civil Pesada",
    location: "Valles Centrales / Puerto Escondido",
    typology: "Puentes vehiculares, cimentaciones y naves",
    surface: "50,000+ m² acumulados",
    year: "2022-2024",
    commitment:
      "En obra de infraestructura pública y privada, la tolerancia al error es cero. Casa Alta dispone de maquinaria de izaje, topografía satelital y control estricto de dosificación para garantizar la seguridad de miles de usuarios.",
    points: [
      "Montaje milimétrico de trabes pretensadas con grúas de alto tonelaje",
      "Cumplimiento riguroso de especificaciones normativas de transporte y SCT",
      "Control sismorresistente con factor de seguridad sobredimensionado",
    ],
    seal: "DICTAMEN ESTRUCTURAL APROBADO",
  },
  {
    id: "casa-blake",
    code: "EXP-04 / RES",
    title: "Casa Blake",
    location: "Tlalixtac de Cabrera, Oaxaca",
    typology: "Residencia Unifamiliar de Alta Gama",
    surface: "680 m²",
    year: "2022",
    commitment:
      "Construir el patrimonio familiar exige transparencia absoluta en catálogo de conceptos, control presupuestal sin sorpresas de sobrecosto y acabados artesanales en piedra regional.",
    points: [
      "Contrato a precio alzado con catálogo de conceptos firmado",
      "Integración de piedra sinterizada Cosentino con instalador avalado",
      "Acta formal de entrega y finiquito con planos As-Built",
    ],
    seal: "SATISFACCIÓN Y FINIQUITO FIRMADO",
  },
];
