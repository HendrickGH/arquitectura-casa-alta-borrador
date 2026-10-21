import type { SectionIntro, SpaceCategory, ThematicPillar } from "@/types/content";

/**
 * Authored content for the dedicated interior routes:
 *   - /arquitectura-interiores
 *   - /construccion-sustentable
 *   - /nosotros
 *   - /servicios
 *   - /contacto
 *
 * Joined with manifest photographs in `src/lib/content/index.ts` so components
 * receive ready-to-render view models.
 */

export const interiorsPageContent = {
  hero: {
    eyebrow: "Arquitectura de interiores · Acabados de alta gama",
    heading: "Acabados de Alta Gama y Superficies de Importación",
    subheadline:
      "Materiales de importación para proyectos residenciales, instalación certificada y garantizada.",
    dir: "arquitectura-interiores",
    base: "03-cocina-comedor-muro-terracota-techo-bambu-isla",
  },
  inspiration: {
    eyebrow: "Diseño arquitectónico de interiores",
    heading: "Diseño con propósito para inspirar la vida de las personas",
    body: "Materiales de importación para proyectos residenciales, instalación certificada y garantizada. Cada superficie y espacio está concebido para resistir el tiempo, el clima costero y enriquecer la convivencia cotidiana.",
    tabs: [
      { id: "all", label: "Todos los espacios" },
      { id: "cocinas", label: "Cocinas e islas" },
      { id: "banos", label: "Baños residenciales" },
      { id: "terrazas", label: "Terrazas y barras exteriores" },
      { id: "interiores", label: "Comedores y galerías" },
      { id: "showroom", label: "Showroom y convivencia" },
    ] satisfies Array<{ id: SpaceCategory; label: string }>,
  },
  surfaces: {
    eyebrow: "Instalación y certificación técnica",
    heading: "Acabados de Alta Gama y Superficies de Importación",
    claim:
      "Materiales de importación para proyectos residenciales, instalación certificada y garantizada.",
    body: "Un espacio residencial se experimenta a través de las superficies que se tocan todos los días. En Casa Alta proyectamos, fabricamos e instalamos cocinas integrales, islas monolíticas, baños, vestidores y recubrimientos arquitectónicos utilizando superficies ultracompactas y piedras de importación con mano de obra certificada y garantía por escrito.",
    badges: [
      "Acabados de Alta Gama y Superficies de Importación",
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
        title: "Garantía técnica y despiece milimétrico",
        description:
          "El mejor material falla si su corte o colocación es improvisado. Nuestro equipo ejecuta el despiece milimétrico, transporte especializado y montaje certificado en sitio con garantía directa de Casa Alta.",
        items: [
          "Cero fisuras: juntas imperceptibles con adhesivos epóxicos de curado controlado.",
          "Nivelación milimétrica: control láser en sustratos y cubiertas de gran formato.",
          "Sellado bioclimático: aislamiento elástico de alta resistencia al salitre y la humedad costera.",
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
    dir: "02-el-bicho",
    base: "01-fachada-tres-palapas-alberca",
  },
  narrative: {
    eyebrow: "Manifiesto bioclimático",
    heading: "Diseño en armonía con el entorno",
    // Exact verbatim copy provided by the client ("no cambiar nada").
    verbatimQuote:
      "Proyecto de arquitectura sostenible para un clima y ambiente tropical . En donde se optimiza la carga térmica y acústica usando materiales sostenibles que reducen el uso de energias artificiales optimizando lo vientos cruzados y la buena ventalacion , arquitectura de playa que funciona para espacios donde la densidad térmica es muy alta dando como resultado espacios amplios y frescos donde el lujo está en sentirse cómoda realmente y contento con el espacio y uno mismo .",
    paragraphs: [
      "En la costa y el Istmo de Oaxaca, construir contra el clima encarece el mantenimiento y obliga a depender día y noche del aire acondicionado. En Casa Alta partimos de la orientación solar, los vientos dominantes del mar y la masa térmica de los materiales antes de trazar el primer muro.",
      "Combinamos técnicas constructivas tradicionales de la región —acabados minerales en chukum, celosías de barro cocido, maderas certificadas y cubiertas ventiladas de palma natural— con ingeniería contemporánea de captación pluvial, biodigestores y energía solar.",
    ],
    ctaLabel: "Planear un proyecto bioclimático",
    ctaHref: "/contacto",
  },
  pillars: [
    {
      number: "01",
      title: "Eficiencia energética pasiva y ventilación cruzada",
      description:
        "Orientamos vanos, corredores, dobles alturas y muros de celosía para acelerar el paso de la brisa marina y evacuar el aire caliente por convección natural sin consumo eléctrico.",
      items: [
        "Muros de celosía geométrica y de barro para filtrar el sol directo",
        "Vanos de doble altura y patios interiores con ventilación convectiva",
        "Orientación estratégica respecto a los vientos dominantes del mar",
      ],
    },
    {
      number: "02",
      title: "Maderas tropicales curadas y cubiertas de palma",
      description:
        "Estructuras de madera de la región tratadas para resistir la intemperie costera, integradas con cubiertas de palapa tejida que disipan la radiación térmica y refrescan los espacios interiores.",
      items: [
        "Curado preventivo de maderas contra salitre, termita y humedad",
        "Palapas de alta disipación térmica y renovación continua de aire",
        "Ensambles tradicionales reforzados con herrajes marinos inoxidables",
      ],
    },
    {
      number: "03",
      title: "Materiales locales y acabados minerales de bajo impacto",
      description:
        "Selección de materiales autóctonos con baja huella de carbono y sistemas hidrosanitarios autónomos que protegen los mantos freáticos y el suelo en zonas donde la red municipal es limitada.",
      items: [
        "Acabados minerales en chukum y tonos tierra de bajo impacto ambiental",
        "Losas aligeradas con aislamiento térmico y acústico continuo",
        "Captación pluvial, plantas de tratamiento y biodigestores ecológicos",
      ],
    },
    {
      number: "04",
      title: "Cimentaciones sismorresistentes y cálculo estructural",
      description:
        "Ingeniería civil calculada en gabinete para la sismicidad y topografía real de Oaxaca, garantizando seguridad estructural y durabilidad patrimonial frente a la corrosión marina.",
      items: [
        "Ingeniería calculada para la sismicidad de Oaxaca y suelo de playa",
        "Zapatas marinas y cimentaciones protegidas contra corrosión salina",
        "Supervisión directa de armados de acero y pruebas de resistencia de concreto",
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
    eyebrow: "",
    heading: "Ingeniería, oficio y presencia real en cada obra",
    subheadline:
      "Más de 150 obras entregadas y 50,000 m² construidos en la Costa, Valles Centrales, Sierra e Istmo de Oaxaca.",
    dir: "credibilidad",
    base: "01-arquitecto-chaleco-casa-alta-supervision-topografia",
  },
  story: {
    eyebrow: "Nuestra identidad",
    heading: "Construir con dignidad lo que se proyecta con sensibilidad",
    paragraphs: [
      "Fundada en Oaxaca, Casa Alta integra taller de diseño arquitectónico y empresa constructora bajo una misma responsabilidad técnica. Proyectamos con sensibilidad espacial y ejecutamos con el rigor que exige el suelo y el clima de nuestra tierra, sin intermediarios ni atajos.",
    ],
    missionTitle: "Misión",
    mission:
      "Dar certeza técnica, legal y estética a cada espacio que construimos, respaldando su patrimonio desde el primer trazo.",
    visionTitle: "Filosofía",
    vision:
      "La arquitectura es el medio de expresión en donde se combina la proporción, el diseño y la línea para lograr construir obras que edifiquen la vida del ser humano.",
  },
  credibilityIntro: {
    eyebrow: "Credibilidad en campo",
    heading: "Nuestro equipo y supervisión directa en obra",
    body: "No subcontratamos la responsabilidad de su proyecto. Nuestro personal técnico, residentes y cuadrillas portan el uniforme de Casa Alta en cada frente de obra.",
  } satisfies SectionIntro,
  credibilityHighlights: [
    {
      number: "01",
      title: "Cálculo propio",
      description:
        "Ingeniería civil calculada en casa para la sismicidad y topografía real de Oaxaca, sin subcontratar la seguridad estructural.",
    },
    {
      number: "02",
      title: "Supervisión en sitio",
      description:
        "Presencia permanente de arquitectos e ingenieros de la firma en cada colado, armado de acero y etapa constructiva.",
    },
    {
      number: "03",
      title: "Certeza patrimonial",
      description:
        "Contratos transparentes, presupuestos cerrados sin partidas ocultas y póliza de garantía post-entrega por escrito.",
    },
  ] satisfies ThematicPillar[],
  enduringIntro: {
    eyebrow: "El resultado del oficio",
    heading: "Espacios que sostienen su valor en el tiempo",
    body: "Cuando la cimentación, la estructura y los acabados se supervisan sin atajos, la arquitectura conserva su belleza y su valor patrimonial año tras año.",
  } satisfies SectionIntro,
  methodologyIntro: {
    eyebrow: "Metodología de obra",
    heading: "Cómo transformamos el terreno en arquitectura",
    body: "Tres fases maestras de rigor técnico sin intermediarios, desde el cálculo inicial hasta la entrega final.",
  } satisfies SectionIntro,
  methodology: [
    {
      number: "01",
      kicker: "Gabinete técnico · Cálculo estructural",
      title: "Proyecto ejecutivo y cálculo estructural",
      description:
        "Desarrollamos la arquitectura integral y la memoria de cálculo sismorresistente antes de iniciar faena en el terreno. Cada detalle constructivo e hidrosanitario queda resuelto en plano.",
      deliverable: "Memoria de cálculo y planos ejecutivos firmados",
      dir: "proyectos-integrales",
      base: "01-arquitectos-revisando-planos-estructurales-mesa-madera",
      photoAlt:
        "Arquitectos de Casa Alta revisando planos ejecutivos y memorias de cálculo estructural en mesa de trabajo",
    },
    {
      number: "02",
      kicker: "Faena en terreno · Residencia de obra",
      title: "Cimentación y supervisión técnica en sitio",
      description:
        "Dirección técnica permanente con ingenieros y cuadrilla propia de la firma. Verificamos armados de acero, zapatas sismorresistentes y la resistencia del concreto en cada colado.",
      deliverable:
        "Bitácora de obra en sitio y verificación de laboratorio de concreto",
      dir: "credibilidad",
      base: "06-armado-acero-estructural-zapata-trabajador-casa-alta",
      photoAlt:
        "Personal técnico de Casa Alta supervisando el armado de acero estructural en zapata de cimentación",
    },
    {
      number: "03",
      kicker: "Materialidad noble · Entrega llave en mano",
      title: "Acabados de autor y garantía patrimonial",
      description:
        "Integramos maderas tropicales curadas, cantera local y herrería artesanal. Entregamos la obra con finiquito cerrado sin sobrecostos y póliza de garantía post-entrega por escrito.",
      deliverable: "Póliza de garantía por escrito y finiquito sin costos ocultos",
      dir: "arquitectura-que-perdura",
      base: "01-comedor-exterior-madera-bajo-palapa-lamparas-tejidas",
      photoAlt:
        "Espacio arquitectónico terminado con ensamble de madera noble, palapa e iluminación en Oaxaca",
    },
  ],
};

export const aboutPage = aboutPageContent;

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
    dir: "proyectos-integrales",
    base: "01-arquitectos-revisando-planos-estructurales-mesa-madera",
    photoCaption: "Ingeniería y proyecto ejecutivo en gabinete",
  },
  catalog: {
    eyebrow: "Catálogo técnico",
    heading: "Alcances por etapa de proyecto y construcción.",
    body: "Contrate el desarrollo integral llave en mano o la especialidad técnica que su obra requiera.",
  },
  specialties: {
    eyebrow: "Evidencia técnica en sitio",
    heading: "Nuestras divisiones en ejecución real",
    body: "Registro fotográfico directo de nuestras cuadrillas, maquinaria pesada y mesas de ingeniería resolviendo proyectos ejecutivos, obra civil, naves industriales y remodelaciones.",
    deliverablesLabel: "Entregables clave de ingeniería:",
    ctaLabel: "Solicitar asesoría técnica",
    ctaHref: "#contacto",
    closeLabel: "Cerrar",
    sections: [
      {
        slug: "proyectos-integrales",
        number: "01",
        title: "Proyectos arquitectónicos y ejecutivos integrales",
        shortTitle: "Planeación",
        subtitle: "Planeación",
        description:
          "Toda gran obra se resuelve primero en el gabinete de ingeniería. Nuestro equipo desarrolla el paquete estándar completo: anteproyecto, planos ejecutivos de albañilería e instalaciones, memorias de cálculo estructural y visualización arquitectónica.",
        deliverables: [
          "Anteproyecto y diseño arquitectónico personalizado",
          "Proyecto ejecutivo completo y planos de detalle constructivo",
          "Cálculo estructural y validación sísmica de sistemas",
          "Renders de alta calidad y catálogo de conceptos con presupuesto",
        ],
        dir: "proyectos-integrales",
        base: "02-detalle-revision-plano-ingenieria-detalle-constructivo",
      },
      {
        slug: "obra-civil-pesada",
        number: "02",
        title: "Ingeniería civil, puentes y concreto presforzado",
        shortTitle: "Infraestructura",
        subtitle: "Infraestructura",
        description:
          "Ejecutamos obra civil de alta complejidad: cimentaciones profundas, izado y montaje de columnas y capiteles prefabricados con grúas telescópicas, trabes cajón para puentes vehiculares y peatonales, y pavimentación con concreto hidráulico.",
        deliverables: [
          "Montaje de columnas, capiteles y trabes prefabricadas de gran claro",
          "Construcción de puentes vehiculares y peatonales",
          "Pavimentación con concreto hidráulico, asfaltos y terracerías",
          "Cimentaciones profundas, dados, zapatas y control topográfico",
        ],
        dir: "obra-civil",
        base: "02-montaje-columna-prefabricada-en-candelero-cimentacion",
      },
      {
        slug: "naves-industriales",
        number: "03",
        title: "Naves industriales y edificación comercial",
        shortTitle: "Estructura metálica",
        subtitle: "Estructura metálica",
        description:
          "Construimos naves industriales, bodegas, centros comerciales y hoteles con sistemas prefabricados de concreto de gran altura y estructuras metálicas que reducen los tiempos de montaje y aseguran plazos firmes de apertura.",
        deliverables: [
          "Izado de muros y pórticos prefabricados de concreto de gran altura",
          "Estructuras metálicas y cubiertas de gran claro",
          "Patios de maniobras, pisos industriales e instalaciones de media tensión",
          "Locales comerciales, hoteles y desarrollos de usos mixtos",
        ],
        dir: "naves-industriales",
        base: "01-maniobra-gruas-izado-muros-prefabricados-concreto",
      },
      {
        slug: "remodelacion-residencial",
        number: "04",
        title: "Remodelación, ampliación y modernización residencial",
        shortTitle: "Acabados",
        subtitle: "Acabados",
        description:
          "Transformamos inmuebles existentes mediante refuerzo estructural, rediseño de volumetría y fachadas, renovación de instalaciones y aplicación de acabados contemporáneos sin demoler el patrimonio previo.",
        deliverables: [
          "Diagnóstico estructural y demolición controlada",
          "Modernización de fachadas, balcones, herrería y cancelería",
          "Colado de accesos vehiculares, cocheras y firmes de concreto",
          "Renovación integral de interiores, baños, cocinas e iluminación",
        ],
        dir: "remodelacion",
        base: "02-fachada-remodelada-blanca-dos-niveles-balcones-cristal",
      },
    ],
  },
};

export const contactPageContent = {
  hero: {
    eyebrow: "Contacto directo · Estudio y Obra",
    heading: "Iniciemos la conversación sobre su proyecto arquitectónico",
    subheadline:
      "Gabinete de proyectos y residencia de obra en Puerto Escondido, Valles Centrales, Sierra e Istmo de Oaxaca.",
    dir: "proyectos-integrales",
    base: "03-sesion-trabajo-revision-proyecto-ejecutivo-oficina",
    photoAlt:
      "Sesión de trabajo y revisión de proyecto ejecutivo en oficina de arquitectura de Constructora Casa Alta",
  },
  formPhoto: {
    dir: "proyectos-integrales",
    base: "01-arquitectos-revisando-planos-estructurales-mesa-madera",
    photoAlt:
      "Arquitectos de Casa Alta revisando planos ejecutivos y detalles estructurales sobre mesa de madera",
  },
  stage: {
    eyebrow: "Sede Puerto Escondido · Costa de Oaxaca",
    regionBadge: "Oaxaca · Costa e Istmo",
    heading: "Atención técnica directa y localización en campo",
    body: "Reunión técnica presencial en Puerto Escondido o por videollamada para revisar viabilidad de terreno, programa arquitectónico y presupuesto de obra.",
    dir: "02-el-bicho",
    base: "01-fachada-tres-palapas-alberca",
    photoAlt:
      "Fachada de tres palapas y alberca en El Bicho, proyecto residencial en la costa de Oaxaca por Constructora Casa Alta",
    phonesLabel: "Líneas directas de atención",
    scheduleLabel: "Horarios de atención",
    mapLabel: "Mapa de localización · Puerto Escondido",
    mapNote: "Colonia Brisas de Zicatela · Atención presencial con cita previa.",
    whatsappCta: "Escribir por WhatsApp",
    consultationCta: "Iniciar consulta",
    mapsCta: "Abrir en Google Maps",
  },
  contactForm: {
    eyebrow: "Primera sesión técnica",
    heading: "Cuéntenos sobre su proyecto",
    body: "Reciba un diagnóstico preliminar de viabilidad, estimación paramétrica y ruta crítica sin costo ni compromiso.",
    specialtiesLabel: "1. Especialidad de su proyecto",
    specialties: [
      "Arquitectura Residencial",
      "Ingeniería y Obra Civil",
      "Acabados de Alta Gama y Superficies de Importación",
      "Construcción Sustentable",
      "Remodelación / Gabinete",
    ],
    localitiesLabel: "2. Ubicación o plaza de ejecución",
    localities: [
      "Puerto Escondido",
      "Oaxaca Centro",
      "Salina Cruz",
      "Costa / Otra región",
    ],
    budgetRangesLabel: "3. Rango de inversión estimada",
    budgetRanges: [
      "$1.5M – $3.5M MXN",
      "$3.5M – $7M MXN",
      "$7M – $15M MXN",
      "Más de $15M MXN",
    ],
    timeframesLabel: "4. Plazo proyectado de inicio",
    timeframes: [
      "Inmediato (1–2 meses)",
      "3 a 6 meses",
      "6 a 12 meses",
      "Fase de planeación",
    ],
    consultationTitle: "Primera sesión técnica sin costo",
    consultationChecklist: [
      "Evaluación de predio, mecánica preliminar y orientación solar",
      "Estimación paramétrica de inversión y catálogo de partidas",
      "Ruta crítica de proyecto ejecutivo y supervisión DRO",
    ],
    directAttentionLabel: "Atención directa",
    freeCostLabel: "Sin costo",
    coverageLabel: "Puerto Escondido · Oaxaca Centro · Salina Cruz",
    name: { label: "Nombre", placeholder: "Su nombre completo" },
    email: { label: "Correo electrónico", placeholder: "nombre@correo.com" },
    phone: { label: "Teléfono / WhatsApp", placeholder: "951 000 0000" },
    message: {
      label: "Sobre su proyecto",
      placeholder:
        "Cuéntenos qué desea construir o remodelar, en qué localidad y para cuándo lo proyecta.",
    },
    submit: "Enviar mensaje",
    sending: "Enviando…",
    success: "Gracias. Recibimos su mensaje y le responderemos a la brevedad.",
    error:
      "No pudimos enviar el mensaje. Intente de nuevo o escríbanos directamente por WhatsApp.",
    whatsapp: "Escribir por WhatsApp",
  },
  address: {
    label: "Ubicación del estudio",
    street: "Guerrero s/n, entre Justo Salvador e Hidalgo",
    neighborhood: "Colonia Brisas de Zicatela",
    city: "70934 Puerto Escondido, Oax.",
    full: "Guerrero s/n, entre Justo Salvador e Hidalgo, Colonia Brisas de Zicatela, 70934 Puerto Escondido, Oax.",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Guerrero+s%2Fn%2C+entre+Justo+Salvador+e+Hidalgo%2C+Colonia+Brisas+de+Zicatela%2C+70934+Puerto+Escondido%2C+Oax.",
    embedUrl:
      "https://maps.google.com/maps?q=Guerrero+s%2Fn%2C+entre+Justo+Salvador+e+Hidalgo%2C+Colonia+Brisas+de+Zicatela%2C+70934+Puerto+Escondido%2C+Oax.&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  phones: [
    {
      role: "Dirección de Obra y DRO",
      number: "951 458 1395",
      href: "tel:+529514581395",
    },
    {
      role: "Gabinete de Proyectos y Presupuestos",
      number: "951 165 0678",
      href: "tel:+529511650678",
    },
  ],
  schedule: [
    {
      label: "Gabinete de Proyectos",
      hours: "Lun–Vie 09:00 a 18:00 hrs (previa cita)",
    },
    {
      label: "Supervisión de Obra",
      hours: "Lun–Sáb 08:00 a 14:00 hrs",
    },
  ],
  email: {
    label: "Correo electrónico",
    value: "contacto@arquitecturacasaalta.com",
    href: "mailto:contacto@arquitecturacasaalta.com",
  },
  whatsappPrefill:
    "Hola Casa Alta, me gustaría agendar una reunión para cotizar un proyecto arquitectónico.",
  dir: "02-el-bicho",
  base: "01-fachada-tres-palapas-alberca",
  photoAlt:
    "Fachada de tres palapas y alberca en El Bicho, proyecto residencial en la costa de Oaxaca por Constructora Casa Alta",
  eyebrow: "Sede Puerto Escondido · Costa de Oaxaca",
  heading: "Atención técnica directa y localización en campo",
  body: "Reunión técnica presencial en Puerto Escondido o por videollamada para revisar viabilidad de terreno, programa arquitectónico y presupuesto de obra.",
};
