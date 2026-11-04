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
        eyebrow: "Construcción Habitacional | Casa Alta",
        summary:
          "Construimos espacios para vivir, diseñados para trascender.\n\nEn Casa Alta desarrollamos proyectos habitacionales que integran arquitectura, ingeniería y construcción de alta calidad. Desde residencias exclusivas hasta desarrollos multifamiliares, combinamos sistemas constructivos tradicionales y tecnologías modernas para optimizar recursos, tiempos de ejecución y calidad estructural.\n\nCada obra refleja nuestro compromiso con el diseño, la funcionalidad, la innovación y el valor patrimonial de nuestros clientes.",
        items: [
          "Residencias unifamiliares: Viviendas personalizadas, residencias de lujo y casas de descanso.",
          "Desarrollos multifamiliares: Edificios de departamentos, condominios y conjuntos residenciales.",
          "Desarrollos inmobiliarios: Villas, complejos habitacionales y proyectos residenciales para inversión.",
          "Construcción tradicional: Sistemas de concreto armado, mampostería y estructuras convencionales.",
          "Sistemas constructivos modernos: Steel Framing, estructuras metálicas y sistemas de losas aligeradas.",
          "Remodelaciones y ampliaciones: Modernización, rehabilitación y transformación de espacios habitacionales.",
          "Construcción integral: Ejecución de obra desde cimentación y estructura hasta instalaciones y acabados finales.",
        ],
      },
      {
        slug: "construccion-comercial-industrial",
        title: "Construcción comercial e industrial",
        eyebrow: "Construcción Comercial e Industrial | Casa Alta",
        summary:
          "Diseñamos y construimos espacios que impulsan el crecimiento empresarial.\n\nEn Casa Alta desarrollamos proyectos comerciales, industriales y de servicios, integrando arquitectura, ingeniería y sistemas constructivos modernos que priorizan la funcionalidad, la seguridad estructural y la eficiencia operativa.\n\nOfrecemos soluciones integrales que optimizan los tiempos de construcción, los recursos y la inversión, creando infraestructura de alto valor, adaptable a las necesidades de cada actividad empresarial.",
        items: [
          "Infraestructura comercial: Centros comerciales, locales, plazas y espacios corporativos.",
          "Construcción industrial: Naves industriales, plantas de producción y centros logísticos.",
          "Bodegas y almacenamiento: Bodegas industriales, centros de distribución y oficinas con almacén.",
          "Infraestructura turística: Hoteles, desarrollos de hospedaje, restaurantes y complejos turísticos.",
          "Infraestructura de salud: Clínicas, consultorios y centros de atención médica.",
          "Sistemas constructivos especializados: Estructuras metálicas, concreto armado, sistemas prefabricados y soluciones de construcción ligera.",
          "Construcción integral: Desarrollo y ejecución de obra civil, instalaciones especializadas y acabados arquitectónicos.",
        ],
      },
      {
        slug: "construccion-y-obra-civil",
        title: "Construcción y obra civil",
        eyebrow: "Construcción y Obra Civil | Casa Alta",
        summary:
          "Construimos infraestructura sólida que impulsa el desarrollo y transforma nuestro entorno.\n\nEn Casa Alta ejecutamos proyectos de obra civil e infraestructura mediante soluciones de ingeniería, tecnología constructiva y altos estándares de calidad, garantizando seguridad estructural, eficiencia y durabilidad.",
        items: [
          "Construcción de estructuras de concreto armado.",
          "Pavimentación de concreto hidráulico y asfáltico.",
          "Construcción y rehabilitación de carreteras y vialidades.",
          "Puentes vehiculares y peatonales.",
          "Obras de urbanización e infraestructura hidráulica y sanitaria.",
          "Cimentaciones y obras de infraestructura pesada.",
        ],
      },
      {
        slug: "presforzado-y-estructura-metalica",
        title: "Concreto presforzado y estructuras metálicas",
        eyebrow: "Concreto Presforzado y Estructuras Metálicas | Casa Alta",
        summary:
          "Ingeniería estructural de alto desempeño para proyectos que exigen grandes soluciones.\n\nEn Casa Alta desarrollamos soluciones constructivas mediante sistemas de concreto presforzado, estructuras metálicas y sistemas mixtos, que permiten alcanzar grandes claros, optimizar los tiempos de ejecución y mejorar la eficiencia estructural.\n\nIntegramos ingeniería, innovación y tecnología constructiva para crear estructuras resistentes, funcionales y duraderas, adaptadas a las exigencias arquitectónicas de cada proyecto.",
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
        title: "Remodelación y ampliaciones",
        eyebrow: "Remodelación y Ampliación | Casa Alta",
        summary:
          "Transformamos espacios existentes en nuevas experiencias arquitectónicas.\n\nEn Casa Alta reinventamos el valor de los inmuebles mediante soluciones de arquitectura, ingeniería y diseño contemporáneo. Desarrollamos proyectos de remodelación, ampliación y rehabilitación que optimizan la funcionalidad, modernizan los espacios y elevan su valor estético y patrimonial, respetando la esencia de cada edificación.",
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
        eyebrow: "Espacios Públicos y Deportivos | Casa Alta",
        summary:
          "Diseñamos y construimos espacios que transforman comunidades y generan bienestar colectivo.\n\nEn Casa Alta desarrollamos proyectos de infraestructura urbana, recreativa y deportiva que integran arquitectura, ingeniería y funcionalidad. Creamos espacios seguros, accesibles y sostenibles que promueven la convivencia, el deporte y el desarrollo social, contribuyendo al mejoramiento de la imagen urbana y la calidad de vida.",
        items: [
          "Infraestructura deportiva: Estadios, graderías, gimnasios y unidades deportivas.",
          "Canchas deportivas: Fútbol, básquetbol, pádel y espacios multideportivos.",
          "Espacios públicos: Parques, plazas, jardines y áreas recreativas.",
          "Infraestructura cultural: Auditorios, foros, teatros al aire libre y centros de convenciones.",
          "Equipamiento urbano: Andadores, explanadas, mobiliario urbano e iluminación pública.",
          "Rehabilitación urbana: Recuperación, modernización y ampliación de espacios públicos.",
          "Ingeniería especializada: Diseño estructural, cubiertas de grandes claros y soluciones constructivas para infraestructura deportiva.",
        ],
      },
      {
        slug: "skateparks",
        title: "Skateparks",
        eyebrow: "Skateparks | Diseño y Construcción Especializada",
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
        eyebrow: "Arquitectura del Paisaje",
        summary:
          "Diseñamos paisajes que conectan la arquitectura con la naturaleza.\n\nEn Casa Alta concebimos el paisajismo como una extensión esencial de la arquitectura, integrando naturaleza, diseño y sostenibilidad para crear espacios exteriores que transmiten armonía, bienestar e identidad.\n\nDesarrollamos proyectos de arquitectura del paisaje que combinan vegetación, materiales naturales, iluminación y elementos arquitectónicos, privilegiando especies adaptadas al entorno, eficiencia hídrica y soluciones de bajo mantenimiento.",
        items: [
          "Diseño paisajístico: Jardines residenciales, comerciales y espacios naturales.",
          "Arquitectura exterior: Terrazas, patios, plazas, senderos y áreas de convivencia.",
          "Paisajismo sostenible: Vegetación nativa, jardines de bajo consumo hídrico y conservación ambiental.",
          "Sistemas de riego: Soluciones automatizadas y eficientes para el aprovechamiento del agua.",
          "Iluminación paisajística: Diseño de iluminación arquitectónica y ambiental para exteriores.",
          "Mobiliario y elementos decorativos: Jardineras, pérgolas, fuentes y elementos escultóricos.",
          "Integración arquitectónica: Diseño de espacios exteriores en armonía con la arquitectura y el entorno natural.",
        ],
      },
      {
        slug: "albercas-y-espacios-exteriores",
        title: "Albercas y espacios exteriores",
        eyebrow: "Albercas y Espacios Exteriores | Casa Alta",
        summary:
          "Creamos espacios donde la arquitectura, el confort y la naturaleza se convierten en una experiencia de vida.\n\nEn Casa Alta diseñamos y construimos albercas y espacios exteriores que integran estética, funcionalidad e innovación. Transformamos áreas al aire libre en ambientes exclusivos de descanso, recreación y convivencia, mediante soluciones arquitectónicas que armonizan con el entorno y elevan el valor de cada propiedad.",
        items: [
          "Albercas residenciales y comerciales: Diseño, ingeniería, construcción y equipamiento.",
          "Espacios de relajación: Jacuzzis, spas, terrazas húmedas y áreas de descanso.",
          "Arquitectura exterior: Terrazas, pérgolas, palapas y zonas de convivencia.",
          "Áreas recreativas: Asadores, cocinas exteriores, bares y comedores al aire libre.",
          "Instalaciones especializadas: Sistemas hidráulicos, filtración, climatización e iluminación de albercas.",
          "Espacios complementarios: Baños, vestidores, regaderas exteriores y áreas de servicio.",
          "Urbanización exterior: Estacionamientos, accesos vehiculares, andadores y pavimentos arquitectónicos.",
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
        eyebrow: "Instalaciones Eléctricas de Media y Alta Tensión | Casa Alta",
        summary:
          "Ingeniería eléctrica especializada para impulsar infraestructura segura, eficiente y de alto rendimiento.\n\nEn Casa Alta desarrollamos soluciones integrales de ingeniería eléctrica para proyectos industriales, comerciales y de infraestructura. Integramos tecnología, seguridad y eficiencia energética mediante el diseño, instalación y modernización de sistemas de distribución eléctrica, transformadores y subestaciones, garantizando confiabilidad operativa y cumplimiento de las normativas aplicables.",
        items: [
          "Subestaciones eléctricas: Diseño, construcción, instalación y equipamiento.",
          "Transformadores: Suministro, instalación y puesta en operación.",
          "Redes de distribución: Infraestructura eléctrica aérea y subterránea de media y alta tensión.",
          "Ingeniería eléctrica: Proyectos ejecutivos, cálculos de carga, diagramas unifilares y estudios técnicos.",
          "Sistemas de protección: Tableros eléctricos, sistemas de puesta a tierra y protecciones eléctricas.",
          "Infraestructura industrial y comercial: Sistemas de alimentación y distribución para desarrollos de gran demanda energética.",
          "Mantenimiento y modernización: Rehabilitación, actualización y pruebas de instalaciones eléctricas.",
        ],
      },
      {
        slug: "instalaciones-hidrosanitarias",
        title: "Instalaciones hidrosanitarias",
        eyebrow: "Instalaciones Hidrosanitarias | Casa Alta",
        summary:
          "Ingeniería hidráulica y sanitaria para un desarrollo eficiente, sostenible y responsable con el agua.\n\nEn Casa Alta desarrollamos soluciones integrales para el abastecimiento, distribución, aprovechamiento y tratamiento del agua en proyectos residenciales, comerciales, industriales y urbanos.\n\nIntegramos ingeniería especializada, tecnologías modernas y sistemas sostenibles que optimizan el consumo de agua, garantizan el funcionamiento de las instalaciones y contribuyen a la protección del medio ambiente.",
        items: [
          "Instalaciones hidráulicas: Redes de abastecimiento, distribución y almacenamiento de agua potable.",
          "Instalaciones sanitarias: Sistemas de drenaje, alcantarillado y conducción de aguas residuales.",
          "Plantas de tratamiento: Diseño e instalación de sistemas de tratamiento y reutilización de aguas residuales.",
          "Biodigestores: Soluciones de saneamiento para desarrollos sin conexión a redes municipales.",
          "Captación pluvial: Sistemas de recolección, almacenamiento y aprovechamiento de agua de lluvia.",
          "Sistemas de bombeo: Equipos hidroneumáticos, presurización, cisternas y cárcamos.",
          "Infraestructura hidráulica: Redes exteriores, drenaje pluvial y sanitario para desarrollos habitacionales y comerciales.",
          "Ingeniería y proyectos ejecutivos: Cálculos hidráulicos, planos, especificaciones técnicas y diseño de instalaciones.",
        ],
      },
    ],
  },
];
