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
    slug: "arquitectura-y-desarrollo",
    title: "Arquitectura y desarrollo",
    intro:
      "Cada obra empieza en el papel. Proyectamos y calculamos antes de construir, para que su inversión se sostenga en decisiones y no en supuestos. Del anteproyecto al proyecto ejecutivo, con todo listo para obra.",
    services: [
      {
        slug: "proyectos-arquitectonicos-integrales",
        title: "Proyectos arquitectónicos integrales",
        summary:
          "Transformamos ideas en proyectos arquitectónicos de alto valor estético, funcional y constructivo.\n\nDesarrollamos soluciones integrales que abarcan desde la conceptualización y el diseño arquitectónico hasta la elaboración del proyecto ejecutivo, integrando ingeniería estructural, criterios técnicos y visualización arquitectónica.\n\nCada proyecto se desarrolla con precisión, innovación y atención al detalle, garantizando una propuesta arquitectónica viable, eficiente y preparada para su correcta ejecución.",
        items: [
          "Conceptualización, anteproyecto y diseño arquitectónico.",
          "Proyecto ejecutivo y planos constructivos.",
          "Ingeniería estructural y memorias de cálculo.",
          "Diseño y coordinación de instalaciones.",
          "Detalles arquitectónicos y especificaciones técnicas.",
          "Renders y visualización arquitectónica de alta calidad.",
        ],
      },
      {
        slug: "arquitectura-interior",
        title: "Arquitectura de Interiores y Acabados de Alta Gama",
        summary:
          "Materiales de importación para proyectos residenciales, instalación certificada y garantizada. Interiorismo integral y mobiliario a medida que entregan espacios terminados desde el primer día.",
        items: [
          "Acabados de Alta Gama y Superficies de Importación",
          "Instalación certificada y garantizada",
          "Cocinas residenciales premium e islas monolíticas",
          "Closets, vestidores y mobiliario sobre diseño",
          "Fachadas y cubiertas en porcelánico, piedra sinterizada y cuarzo",
          "Pisos, baños y recubrimientos de gran formato",
          "Puertas residenciales y carpintería arquitectónica",
          "Iluminación arquitectónica e interiorismo integral",
        ],
      },
      {
        slug: "proyectos-sostenibles",
        title: "Proyectos sostenibles",
        eyebrow: "Arquitectura Sostenible | El nuevo estilo de hábitat",
        summary:
          "En Casa Alta concebimos una arquitectura donde el confort, la innovación y la sostenibilidad convergen. Integramos sistemas constructivos modernos y estrategias bioclimáticas que optimizan los tiempos de ejecución, mejoran la eficiencia energética y reducen el impacto ambiental.\n\nConstruimos espacios más inteligentes, eficientes y responsables con el entorno, donde la sostenibilidad se convierte en una nueva forma de lujo.",
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
    title: "Construcción y obra civil",
    intro:
      "Aquí está nuestra reputación: más de 150 obras entregadas con rigor técnico y contractual. Elegimos el sistema constructivo por proyecto --clima, terreno, plazo y presupuesto--, no por costumbre.",
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
        title: "Concreto presforzado y estructuras metálicas",
        eyebrow: "Ingeniería estructural de alto desempeño | Casa Alta",
        summary:
          "En Casa Alta desarrollamos soluciones constructivas mediante sistemas de concreto presforzado, estructuras metálicas y sistemas mixtos, que permiten alcanzar grandes claros, optimizar los tiempos de ejecución y mejorar la eficiencia estructural.\n\nIntegramos ingeniería, innovación y tecnología constructiva para crear estructuras resistentes, funcionales y duraderas, adaptadas a las exigencias arquitectónicas de cada proyecto.",
        items: [
          "Concreto presforzado: Elementos pretensados y postensados para estructuras de alto desempeño.",
          "Estructuras metálicas: Diseño, fabricación y montaje de sistemas estructurales de acero.",
          "Grandes claros: Soluciones estructurales para naves industriales, espacios comerciales y edificios.",
          "Sistemas constructivos mixtos: Integración de acero y concreto para optimizar resistencia y eficiencia.",
          "Ingeniería estructural: Análisis, diseño, cálculo y desarrollo de soluciones estructurales.",
          "Sistemas prefabricados: Elementos estructurales industrializados que permiten optimizar tiempos de construcción.",
        ],
      },
      {
        slug: "remodelacion-y-modernizacion",
        title: "Remodelación y ampliación",
        eyebrow: "Transformamos espacios existentes | Casa Alta",
        summary:
          "En Casa Alta reinventamos el valor de los inmuebles mediante soluciones de arquitectura, ingeniería y diseño contemporáneo. Desarrollamos proyectos de remodelación, ampliación y rehabilitación que optimizan la funcionalidad, modernizan los espacios y elevan su valor estético y patrimonial, respetando la esencia de cada edificación.",
        items: [
          "Remodelación arquitectónica: Transformación de espacios residenciales, comerciales y corporativos.",
          "Ampliaciones: Crecimiento de superficies construidas y nuevas áreas funcionales.",
          "Rehabilitación estructural: Diagnóstico, reforzamiento y adecuación de estructuras existentes.",
          "Modernización de fachadas: Rediseño arquitectónico, acabados, herrería y cancelería.",
          "Renovación de interiores: Cocinas, baños, iluminación y acabados de alta calidad.",
          "Actualización de instalaciones: Modernización de sistemas eléctricos, hidráulicos y sanitarios.",
          "Revalorización inmobiliaria: Intervenciones arquitectónicas orientadas a mejorar la funcionalidad y el valor comercial del inmueble.",
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
        eyebrow: "Diseño y Construcción Especializada",
        summary:
          "Arquitectura, ingeniería y creatividad al servicio de la cultura urbana.\n\nEn Casa Alta somos especialistas en el diseño, desarrollo y construcción de skateparks y espacios deportivos urbanos, integrando ingeniería especializada, geometrías de precisión y sistemas constructivos de alta resistencia.\n\nCreamos espacios innovadores, seguros y funcionales que responden a las exigencias técnicas del skateboarding, incorporando arquitectura contemporánea, paisajismo y arte urbano para transformar el espacio público en lugares de identidad, convivencia y expresión cultural.",
        items: [
          "Diseño especializado: Skateparks profesionales, recreativos, interiores y exteriores.",
          "Ingeniería y construcción: Superficies de concreto, rampas, bowls, transiciones y obstáculos técnicos.",
          "Arquitectura urbana: Integración de skateplazas, paisajismo y espacios de convivencia.",
          "Infraestructura para competencias: Instalaciones deportivas para entrenamiento, exhibiciones y eventos.",
          "Arte e intervención urbana: Integración de elementos escultóricos, mobiliario y expresiones artísticas.",
          "Rehabilitación y modernización: Remodelación, restauración y ampliación de skateparks existentes.",
          "Supervisión especializada: Control de geometrías, acabados, calidad constructiva y seguridad de las instalaciones.",
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
