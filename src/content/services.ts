import type { ServiceGroup } from "@/types/content";

/**
 * The service catalogue, grouped for the landing's index.
 *
 * The sub-item lists are the client's own, kept close to verbatim because they
 * are the actual deliverable list. Titles are the client's names. The intros and
 * summaries are repo-authored (brief §14.8): short, formal (usted) and warm, per
 * the brief's tone rules -- "cortos y emocionales", "local con un toque de
 * experiencia", nothing that reads as expensive. No claim here goes past what
 * the brief states.
 *
 * "Arquitectura interior" carries the interiorismo and premium-materials work.
 * The partner brand behind it is deliberately never named.
 */
export const serviceGroups: ServiceGroup[] = [
  {
    slug: "proyecto-y-diseno",
    title: "Proyecto y diseño",
    intro:
      "Cada obra empieza en el papel. Proyectamos y calculamos antes de construir, para que su inversión se sostenga en decisiones y no en supuestos. Del anteproyecto al proyecto ejecutivo, con todo listo para obra.",
    services: [
      {
        slug: "proyectos-arquitectonicos-integrales",
        title: "Proyectos arquitectónicos integrales",
        summary:
          "Del concepto al proyecto ejecutivo. Planos, memorias y especificaciones para que cualquier constructora pueda levantarlo sin adivinar, más renders y cálculo estructural.",
        items: [
          "Anteproyecto y diseño arquitectónico",
          "Proyecto ejecutivo y detalle constructivo",
          "Cálculo estructural y validación de sistemas",
          "Renders y visualización de alta calidad",
        ],
      },
      {
        slug: "arquitectura-interior",
        title: "Arquitectura interior",
        summary:
          "Interiorismo y mobiliario a medida, con materiales premium y acabados de importación. Espacios que se sienten terminados desde el primer día.",
        items: [
          "Interiorismo integral",
          "Cocinas premium",
          "Closets y vestidores",
          "Mobiliario sobre diseño",
          "Fachadas en porcelánico y cuarzo",
          "Pisos y recubrimientos en porcelánico",
          "Puertas residenciales",
          "Materiales premium",
        ],
      },
      {
        slug: "proyectos-eco-sustentables",
        title: "Proyectos eco-sustentables",
        summary:
          "Diseñamos con el clima, no contra él. Aprovechamos ventilación e iluminación natural y sumamos captación de agua y energía para bajar el consumo durante toda la vida del edificio.",
        items: [
          "Diseños bioclimáticos, con aprovechamiento de ventilación e iluminación natural",
          "Uso de materiales de bajo impacto ambiental",
          "Sistemas de captación de agua pluvial",
          "Equipos ahorradores de energía",
          "Sistemas de energía renovable y paneles solares",
          "Estrategias de eficiencia térmica y confort ambiental",
        ],
      },
    ],
  },
  {
    slug: "construccion",
    title: "Construcción",
    intro:
      "Aquí está nuestra reputación: más de 150 obras alrededor del estado. Elegimos el sistema constructivo por proyecto --clima, terreno, plazo y presupuesto--, no por costumbre.",
    services: [
      {
        slug: "construccion-habitacional",
        title: "Construcción habitacional",
        summary:
          "Casa unifamiliar y multifamiliar, desde la cimentación hasta los acabados finales, con sistemas aligerados para losas de entrepiso y azotea.",
        items: [
          "Casa habitación unifamiliar",
          "Vivienda multifamiliar y departamentos",
          "Remodelación y ampliación",
          "Sistemas aligerados para losas de entrepiso y azotea",
        ],
      },
      {
        slug: "construccion-comercial-industrial",
        title: "Construcción comercial e industrial",
        summary:
          "Naves, bodegas y locales pensados para operar: claros amplios, plazos firmes y mantenimiento bajo. También hoteles, restaurantes y proyectos de salud.",
        items: [
          "Centros comerciales y locales",
          "Bodegas y oficinas con bodega",
          "Naves industriales",
          "Hoteles, restaurantes y proyectos de salud",
        ],
      },
      {
        slug: "construccion-y-obra-civil",
        title: "Construcción y obra civil",
        summary:
          "Concreto armado, pavimentos, asfaltos y puentes. Obra pesada con control de calidad en cada etapa y cada colado.",
        items: [
          "Concreto armado en todo tipo de construcción",
          "Pavimentación de concreto hidráulico",
          "Asfaltos y carreteras",
          "Puentes vehiculares y peatonales",
        ],
      },
      {
        slug: "presforzado-y-estructura-metalica",
        title: "Concreto presforzado y estructura metálica",
        summary:
          "Cuando el claro es grande o el plazo aprieta. Concreto presforzado y estructura metálica --incluso sistemas mixtos--, según lo que más convenga al proyecto.",
        items: [
          "Soluciones de concreto presforzado",
          "Estructura metálica",
          "Naves de gran claro",
          "Sistemas mixtos, según lo que más convenga al proyecto",
        ],
      },
    ],
  },
  {
    slug: "espacio-publico-y-exterior",
    title: "Espacio público y exterior",
    intro:
      "El espacio que rodea la obra también se construye, y es el que más gente termina usando. Lo proyectamos y lo ejecutamos como una habitación más.",
    services: [
      {
        slug: "espacios-publicos-y-deportivos",
        title: "Espacios públicos y deportivos",
        summary:
          "Equipamiento urbano y deportivo, de la cancha de barrio al auditorio. Estadios, gradas, parques y espacios recuperados para que la gente los use.",
        items: [
          "Estadios y gradas",
          "Centros de convenciones",
          "Canchas de basket",
          "Canchas de pádel",
          "Parques públicos",
          "Recuperación de espacios públicos",
          "Cines al aire libre y explanadas",
          "Auditorios con isóptica vertical y horizontal",
        ],
      },
      {
        slug: "skateparks",
        title: "Skateparks",
        summary:
          "Especialistas en diseño y construcción de skateparks. Geometría y durabilidad para el uso real, dentro y fuera de la ciudad.",
        items: [
          "Diseño de skateparks, índoor y outdoor",
          "Instalaciones artísticas urbanas para uso de skate y escultóricas",
          "Spots urbanos para eventos de skate y de arte",
          "Remodelación y restauración de skateparks",
          "Landscaping integrado",
          "Supervisión de construcción de skateparks",
        ],
      },
      {
        slug: "landscape",
        title: "Landscape",
        summary:
          "Áreas verdes que se mantienen verdes: riego, iluminación y mobiliario resueltos desde el proyecto, no después.",
        items: [
          "Áreas verdes y jardines",
          "Diseño de senderos, andadores y plazas",
          "Sistema de riego",
          "Iluminación exterior paisajística",
          "Mobiliario urbano y espacios decorativos",
        ],
      },
      {
        slug: "albercas-y-espacios-exteriores",
        title: "Albercas y espacios exteriores",
        summary:
          "Albercas, asadores y áreas de descanso en un mismo lenguaje. El exterior como una habitación más de la casa.",
        items: [
          "Albercas",
          "Asadores",
          "Estacionamientos y zonas vehiculares",
          "Áreas de descanso complementarias",
          "Baños y regaderas de exterior",
        ],
      },
    ],
  },
  {
    slug: "instalaciones",
    title: "Instalaciones",
    intro:
      "Lo que no se ve pero sostiene todo lo demás. Se calcula, se instala y se prueba antes de entregar.",
    services: [
      {
        slug: "instalaciones-electricas",
        title: "Instalaciones eléctricas de media y alta tensión",
        summary:
          "Suministro y distribución para proyectos que ya no se resuelven con una acometida doméstica: transformadores y subestaciones.",
        items: ["Transformadores", "Subestaciones eléctricas"],
      },
      {
        slug: "instalaciones-hidrosanitarias",
        title: "Instalaciones hidrosanitarias",
        summary:
          "Drenaje y tratamiento resueltos en sitio, clave donde la red municipal no llega: plantas de tratamiento y biodigestores.",
        items: ["Drenajes", "Plantas de tratamiento", "Biodigestores"],
      },
    ],
  },
];
