import type { ServiceGroup } from "@/types/content";

/**
 * The service catalogue, grouped for the landing's index.
 *
 * The sub-item lists are the client's own, kept close to verbatim because they
 * are the actual deliverable list. Copy is formal (usted) and short, per the
 * brief's tone rules. Nothing here mentions public-sector clients: that market
 * is a goal, not something the site states.
 *
 * "Arquitectura interior" carries the interiorismo and premium-materials work.
 * The partner brand behind it is deliberately never named.
 */
export const serviceGroups: ServiceGroup[] = [
  {
    slug: "proyecto-y-diseno",
    title: "Proyecto y diseño",
    intro:
      "Cada obra empieza en el papel. Proyectamos para que su inversión se sostenga en cálculos, no en supuestos.",
    services: [
      {
        slug: "proyectos-arquitectonicos-integrales",
        title: "Proyectos arquitectónicos integrales",
        summary:
          "Del concepto al proyecto ejecutivo, con planos, memorias y especificaciones listos para construir.",
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
          "Interiorismo y mobiliario a medida, con materiales premium y acabados de importación.",
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
          "Decisiones que bajan el consumo del edificio durante toda su vida, no solo en la obra.",
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
      "Es donde hemos construido nuestra reputación. Elegimos el sistema constructivo por proyecto, no por costumbre.",
    services: [
      {
        slug: "construccion-habitacional",
        title: "Construcción habitacional",
        summary:
          "Casa unifamiliar y multifamiliar, desde la cimentación hasta los acabados finales.",
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
          "Naves, bodegas y locales pensados para operar: claros amplios, plazos firmes y mantenimiento bajo.",
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
          "Concreto armado, pavimentos y puentes. Obra pesada con control de calidad en cada colado.",
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
          "Cuando el claro es grande o el plazo es corto, estos sistemas resuelven lo que el concreto tradicional no alcanza.",
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
      "El espacio que rodea a la obra también se construye, y es el que más gente termina usando.",
    services: [
      {
        slug: "espacios-publicos-y-deportivos",
        title: "Espacios públicos y deportivos",
        summary:
          "Equipamiento urbano y deportivo, desde la cancha de barrio hasta el auditorio.",
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
          "Especialistas en diseño y construcción de skateparks, con la geometría y la durabilidad que el uso real exige.",
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
          "Áreas verdes que se mantienen verdes: riego, iluminación y mobiliario resueltos desde el proyecto.",
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
          "El exterior como una habitación más: alberca, asadores y áreas de descanso en un mismo lenguaje.",
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
      "Lo que no se ve y sostiene todo lo demás. Se calcula, se instala y se prueba antes de entregar.",
    services: [
      {
        slug: "instalaciones-electricas",
        title: "Instalaciones eléctricas de media y alta tensión",
        summary:
          "Suministro y distribución para proyectos que ya no se resuelven con una acometida doméstica.",
        items: ["Transformadores", "Subestaciones eléctricas"],
      },
      {
        slug: "instalaciones-hidrosanitarias",
        title: "Instalaciones hidrosanitarias",
        summary:
          "Drenaje y tratamiento resueltos en sitio, clave donde la red municipal no llega.",
        items: ["Drenajes", "Plantas de tratamiento", "Biodigestores"],
      },
    ],
  },
];
