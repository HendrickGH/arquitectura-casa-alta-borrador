import type { SectionIntro, ThematicPillar } from "@/types/content";

/**
 * Authored content for the dedicated interior routes:
 *   - /arquitectura-interiores
 *   - /construccion-sustentable
 *   - /nosotros
 *   - /servicios
 *
 * Joined with manifest photographs in `src/lib/content/index.ts` so components
 * receive ready-to-render view models.
 */

export const interiorsPageContent = {
  hero: {
    eyebrow: "Arquitectura de interiores · Cosentino",
    heading: "Materiales de importación e interiorismo residencial",
    subheadline:
      "Materiales de importación para proyectos residenciales, instalación certificada y garantizada.",
    dir: "arquitectura-interiores",
    base: "03-cocina-comedor-muro-terracota-techo-bambu-isla",
  },
  cosentino: {
    eyebrow: "Alianza y certificación técnica",
    heading: "Arquitectura de interiores / Cosentino",
    claim:
      "Materiales de importación para proyectos residenciales, instalación certificada y garantizada.",
    body: "Un espacio residencial se experimenta a través de las superficies que se tocan todos los días. En Casa Alta proyectamos, fabricamos e instalamos cocinas integrales, islas monolíticas, baños, vestidores y recubrimientos arquitectónicos utilizando superficies ultracompactas y piedras de importación con mano de obra certificada y garantía por escrito.",
    badges: [
      "Superficies Cosentino de importación",
      "Instalación certificada y garantizada",
      "Cocinas e islas a medida",
      "Carpintería y herrajes residenciales",
    ],
    pillars: [
      {
        number: "01",
        title: "Superficies de importación y piedra tecnológica",
        description:
          "Trabajamos con superficies de alta resistencia térmica, mecánica y a la humedad salina —piedra sinterizada, cuarzo y porcelánicos de gran formato— ideales tanto para residencias urbanas como para casas de playa.",
        items: [
          "Cubiertas e islas monolíticas con veta continua",
          "Recubrimientos de muros y pisos en gran formato",
          "Fachadas ventiladas y barras exteriores resistentes al sol",
        ],
      },
      {
        number: "02",
        title: "Cocinas premium y mobiliario sobre diseño",
        description:
          "Diseñamos cada cocina, closet y vestidor desde los planos ejecutivos de la obra para integrar instalaciones ocultas, iluminación LED indirecta y sistemas de organización extraíbles.",
        items: [
          "Cocinas integrales en madera certificada y acabados mate",
          "Sistemas de alacena extraíble y herrajes de cierre suave",
          "Closets, vestidores, puertas residenciales y tocadores flotantes",
        ],
      },
      {
        number: "03",
        title: "Instalación certificada y garantizada",
        description:
          "El mejor material falla si su corte o colocación es improvisado. Nuestro equipo ejecuta el despiece milimétrico, transporte especializado y montaje certificado en sitio con garantía directa de Casa Alta.",
        items: [
          "Levantamiento láser y despiece técnico previo a corte",
          "Colocación certificada con adhesivos y selladores específicos",
          "Garantía por escrito en materiales y mano de obra",
        ],
      },
    ] satisfies ThematicPillar[],
  },
  interiorsGalleryIntro: {
    eyebrow: "Obra interior ejecutada",
    heading: "Materia, luz e integración espacial",
    body: "Cocinas, comedores, baños y galerías interiores resueltos en nuestras obras residenciales en Oaxaca: piedra veteada, maderas cálidas, muros en tono terracota y concha nácar.",
  } satisfies SectionIntro,
  lifestyleIntro: {
    eyebrow: "Espacios habitados · Showroom Casa Alta",
    heading: "Diseñados para vivirse y compartirse",
    body: "Un proyecto de arquitectura interior cobra sentido cuando se habita. Nuestra sesión en showroom muestra la escala real de nuestras cocinas integrales en cuarzo negro veteado, mobiliario negro mate, iluminación cálida y barras pensadas para la convivencia diaria.",
  } satisfies SectionIntro,
};

export const sustainabilityPageContent = {
  hero: {
    eyebrow: "Arquitectura bioclimática y tropical",
    heading: "Construcción sustentable para el clima de Oaxaca",
    subheadline:
      "Optimizamos la carga térmica y acústica con vientos cruzados, luz natural filtrada y materiales sostenibles de bajo impacto.",
    dir: "arquitectura-sostenible",
    base: "01-asoleadero-alberca-ventilacion-cruzada-arquitectura-tierra",
  },
  narrative: {
    eyebrow: "Manifiesto bioclimático",
    heading: "El lujo de habitar un espacio verdaderamente fresco",
    // Exact verbatim copy provided by the client ("no cambiar nada").
    verbatimQuote:
      "Proyecto de arquitectura sostenible para un clima y ambiente tropical . En donde se optimiza la carga térmica y acústica usando materiales sostenibles que reducen el uso de energias artificiales optimizando lo vientos cruzados y la buena ventalacion , arquitectura de playa que funciona para espacios donde la densidad térmica es muy alta dando como resultado espacios amplios y frescos donde el lujo está en sentirse cómoda realmente y contento con el espacio y uno mismo .",
    paragraphs: [
      "En la costa y el Istmo de Oaxaca, construir contra el clima encarece el mantenimiento y obliga a depender día y noche del aire acondicionado. En Casa Alta partimos de la orientación solar, los vientos dominantes del mar y la masa térmica de los materiales antes de trazar el primer muro.",
      "Combinamos técnicas constructivas tradicionales de la región —acabados minerales en chukum, celosías de barro cocido, maderas certificadas y cubiertas ventiladas de palma natural— con ingeniería contemporánea de captación pluvial, biodigestores y energía solar.",
    ],
  },
  pillars: [
    {
      number: "01",
      title: "Vientos cruzados y ventilación pasiva",
      description:
        "Orientamos vanos, corredores, dobles alturas y muros de celosía para acelerar el paso de la brisa marina y evacuar el aire caliente por convección natural sin consumo eléctrico.",
      items: [
        "Muros de celosía geométrica y de barro para filtrar el sol directo",
        "Vanos de doble altura y patios interiores con espejo de agua",
        "Cubiertas altas de palapa que disipan el calor acumulado",
      ],
    },
    {
      number: "02",
      title: "Optimización de carga térmica y acústica",
      description:
        "Reducimos la ganancia de calor en muros y losas mediante materiales de baja conductividad térmica, aleros profundos y vegetación endémica que genera microclimas frescos alrededor de la casa.",
      items: [
        "Acabados minerales en chukum y tonos tierra de baja reflectancia",
        "Losas aligeradas con aislamiento térmico y acústico",
        "Conservación de palmeras e integración de jardines nativos de bajo riego",
      ],
    },
    {
      number: "03",
      title: "Autonomía hídrica y eficiencia energética",
      description:
        "Integramos sistemas activos de bajo impacto ambiental para que el edificio consuma menos recursos durante toda su vida útil, especialmente en zonas costeras donde la infraestructura municipal es limitada.",
      items: [
        "Sistemas de energía renovable y paneles solares integrados",
        "Captación de agua pluvial, plantas de tratamiento y biodigestores",
        "Iluminación LED cálida de bajo consumo y equipos ahorradores",
      ],
    },
  ] satisfies ThematicPillar[],
  bioclimaticGalleryIntro: {
    eyebrow: "Soluciones pasivas en obra",
    heading: "Arquitectura sostenible en clima tropical",
    body: "Cada fotografía documenta una decisión bioclimática real: celosías que tamizan la luz, espejos de agua bajo sombra de palmeras, terrazas orientadas a la brisa y materiales locales.",
  } satisfies SectionIntro,
  enduringGalleryIntro: {
    eyebrow: "Materialidad atemporal",
    heading: "Arquitectura que perdura",
    body: "Obras que envejecen con dignidad frente al salitre, la humedad y el sol de la costa oaxaqueña.",
  } satisfies SectionIntro,
};

export const aboutPageContent = {
  hero: {
    eyebrow: "Constructora Casa Alta · Desde 2016",
    heading: "Ingeniería, oficio y presencia real en cada obra",
    subheadline:
      "Más de 150 obras entregadas y 50,000 m² construidos en la Costa, Valles Centrales, Sierra e Istmo de Oaxaca.",
    dir: "credibilidad",
    base: "01-arquitecto-chaleco-casa-alta-supervision-topografia",
  },
  story: {
    eyebrow: "Nuestra identidad",
    heading: "CASA ALTA: Arquitectura que perdura",
    paragraphs: [
      "Fundada en 2016 bajo la dirección del Arq. Felipe Humberto Hernández Bejarano, Constructora Casa Alta nació en Oaxaca con una convicción clara: unir la sensibilidad del diseño arquitectónico con el rigor técnico de la ingeniería civil y la supervisión directa en campo.",
      "Contamos con oficinas operativas en Puerto Escondido y Salina Cruz, cuadrillas uniformadas, flotilla propia y residentes de obra que supervisan personalmente cada etapa constructiva —desde el trazo topográfico y el armado de acero de cimentación hasta el último detalle de carpintería e iluminación.",
      "Construir lejos de su lugar de residencia o invertir el patrimonio familiar exige confianza absoluta. Por eso trabajamos con contratos claros, presupuestos sin partidas ocultas, cumplimiento del 100% en tiempos pactados y garantía por escrito post-entrega.",
    ],
    missionTitle: "Misión",
    mission:
      "Ser una empresa que solucione todas las soluciones constructivas y dar función y carácter a cada proyecto que llega a nuestras manos.",
    visionTitle: "Filosofía",
    vision:
      "La arquitectura es el medio de expresión donde se crea el espacio íntimo que envuelve al ser para su desarrollo.",
  },
  credibilityIntro: {
    eyebrow: "Credibilidad en campo",
    heading: "Nuestro equipo y supervisión directa en obra",
    body: "No subcontratamos la responsabilidad de su proyecto. Nuestro personal técnico, residentes y cuadrillas portan el uniforme de Casa Alta en cada frente de obra.",
  } satisfies SectionIntro,
  credibilityHighlights: [
    {
      number: "01",
      title: "Supervisión técnica permanente",
      description:
        "Arquitectos e ingenieros residentes verifican en sitio el trazo topográfico, armado de parrillas de cimentación, calidad de concreto, casetones y nivelación láser.",
    },
    {
      number: "02",
      title: "Capacidad operativa y logística propia",
      description:
        "Flotilla oficial, bodegas de insumos y red de proveedores consolidada en Puerto Escondido, Oaxaca centro y Salina Cruz para garantizar el abasto sin retrasos.",
    },
    {
      number: "03",
      title: "Certeza jurídica y garantía por escrito",
      description:
        "Cada paquete contratado incluye proyecto ejecutivo completo, contrato con especificaciones y plazos fijos, y póliza de garantía posterior a la entrega de llaves.",
    },
  ] satisfies ThematicPillar[],
  enduringIntro: {
    eyebrow: "El resultado del oficio",
    heading: "Espacios que sostienen su valor en el tiempo",
    body: "Cuando la cimentación, la estructura y los acabados se supervisan sin atajos, la arquitectura conserva su belleza y su valor patrimonial año tras año.",
  } satisfies SectionIntro,
};

export const servicesPageContent = {
  hero: {
    eyebrow: "Ingeniería civil · Proyecto ejecutivo · Construcción",
    heading: "Capacidad técnica para obras de cualquier escala",
    subheadline:
      "Del plano estructural en mesa de juntas al izado de columnas prefabricadas, puentes, naves industriales y residencias llave en mano.",
    dir: "obra-civil",
    base: "06-construccion-puente-vehicular-sobre-rio-dos-gruas",
  },
  intro: {
    eyebrow: "Frentes de trabajo",
    heading: "Elegimos el sistema constructivo por cálculo, no por costumbre",
    body: "Cada terreno en Oaxaca plantea un reto distinto. Validamos con cálculo estructural si el proyecto requiere concreto armado, presforzado, estructura metálica, losa aligerada o sistemas vernáculos mejorados.",
  } satisfies SectionIntro,
  specialties: {
    eyebrow: "Evidencia técnica en sitio",
    heading: "Nuestras divisiones en ejecución real",
    body: "Registro fotográfico directo de nuestras cuadrillas, maquinaria pesada y mesas de ingeniería resolviendo proyectos ejecutivos, obra civil, naves industriales y remodelaciones.",
    sections: [
      {
        slug: "proyectos-integrales",
        number: "01",
        title: "Proyectos arquitectónicos y ejecutivos integrales",
        subtitle: "Planeación · Cálculo estructural · Planos de detalle",
        description:
          "Toda gran obra se resuelve primero en el gabinete de ingeniería. Nuestro equipo desarrolla el paquete estándar completo: anteproyecto, planos ejecutivos de albañilería e instalaciones, memorias de cálculo estructural y visualización arquitectónica.",
        deliverables: [
          "Anteproyecto y diseño arquitectónico personalizado",
          "Proyecto ejecutivo completo y planos de detalle constructivo",
          "Cálculo estructural y validación sísmica de sistemas",
          "Renders de alta calidad y catálogo de conceptos con presupuesto",
        ],
        dir: "proyectos-integrales",
        maxPhotos: 3,
      },
      {
        slug: "obra-civil-pesada",
        number: "02",
        title: "Ingeniería civil, puentes y concreto presforzado",
        subtitle: "Infraestructura · Grúas de gran tonelaje · Prefabricados",
        description:
          "Ejecutamos obra civil de alta complejidad: cimentaciones profundas, izado y montaje de columnas y capiteles prefabricados con grúas telescópicas, trabes cajón para puentes vehiculares y peatonales, y pavimentación con concreto hidráulico.",
        deliverables: [
          "Montaje de columnas, capiteles y trabes prefabricadas de gran claro",
          "Construcción de puentes vehiculares y peatonales",
          "Pavimentación con concreto hidráulico, asfaltos y terracerías",
          "Cimentaciones profundas, dados, zapatas y control topográfico",
        ],
        dir: "obra-civil",
        maxPhotos: 12,
      },
      {
        slug: "naves-industriales",
        number: "03",
        title: "Naves industriales y edificación comercial",
        subtitle: "Grandes claros · Prefabricados · Estructura metálica",
        description:
          "Construimos naves industriales, bodegas, centros comerciales y hoteles con sistemas prefabricados de concreto de gran altura y estructuras metálicas que reducen los tiempos de montaje y aseguran plazos firmes de apertura.",
        deliverables: [
          "Izado de muros y pórticos prefabricados de concreto de gran altura",
          "Estructuras metálicas y cubiertas de gran claro",
          "Patios de maniobras, pisos industriales e instalaciones de media tensión",
          "Locales comerciales, hoteles y desarrollos de usos mixtos",
        ],
        dir: "naves-industriales",
        maxPhotos: 1,
      },
      {
        slug: "remodelacion-residencial",
        number: "04",
        title: "Remodelación, ampliación y modernización residencial",
        subtitle: "Intervención estructural · Nuevas fachadas · Acabados",
        description:
          "Transformamos inmuebles existentes mediante refuerzo estructural, rediseño de volumetría y fachadas, renovación de instalaciones y aplicación de acabados contemporáneos sin demoler el patrimonio previo.",
        deliverables: [
          "Diagnóstico estructural y demolición controlada",
          "Modernización de fachadas, balcones, herrería y cancelería",
          "Colado de accesos vehiculares, cocheras y firmes de concreto",
          "Renovación integral de interiores, baños, cocinas e iluminación",
        ],
        dir: "remodelacion",
        maxPhotos: 6,
      },
    ],
  },
};
