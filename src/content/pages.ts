import type { SectionIntro, ThematicPillar } from "@/types/content";

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
    eyebrow: "Arquitectura de interiores · Acabados nobles y carpintería",
    heading:
      "Cocinas integrales, superficies nobles y carpintería residencial de autor",
    subheadline:
      "Fabricación propia con despiece milimétrico, cálculo de resistencia costera y maderas curadas. Asesoría técnica inicial sin costo, presencial en estudio o por videollamada.",
    dir: "arquitectura-interiores",
    base: "03-cocina-comedor-muro-terracota-techo-bambu-isla",
    catalogCtaLabel: "Explorar catálogo de materiales",
    consultationCtaLabel: "Agendar asesoría gratuita",
  },
  materials: {
    eyebrow: "Materialidad",
    heading: "Superficies nobles y maderas del trópico",
    body: "Piedras tecnológicas, cuarzo puro, maderas curadas y chukum mineral seleccionados para climas costeros y de alta exigencia térmica.",
    sections: [
      {
        slug: "piedras-tecnologicas",
        number: "01",
        title: "Piedras Tecnológicas",
        shortTitle: "Piedras",
        subtitle: "Piedras",
        description:
          "Cero porosidad y absorción nula (<0.05%). Inmunidad ante ácidos, calor directo y uso culinario intensivo.",
        deliverables: [
          "Absorción < 0.05% antimanchas",
          "Resistencia térmica > 300 °C",
          "Inglete a 45° con veta continua",
          "Espesores técnicos: 12 y 20 mm",
        ],
        dir: "arquitectura-interiores",
        base: "05-cubierta-isla-cocina-veta-lineal-techo-carrizo",
      },
      {
        slug: "cuarzo-pureza",
        number: "02",
        title: "Cuarzo de Alta Pureza",
        shortTitle: "Cuarzo",
        subtitle: "Cuarzo",
        description:
          "93% de cuarzo mineral y resinas compactadas al vacío. Superficie bacteriostática de tacto cálido sin selladores.",
        deliverables: [
          "Dureza mineral Mohs 7",
          "Empates invisibles pigmentados",
          "Acabado mate antideslumbrante",
          "Garantía contra delaminación",
        ],
        dir: "arquitectura-interiores",
        base: "01-isla-cocina-piedra-parrilla-horno-muro-terracota",
      },
      {
        slug: "maderas-tropicales",
        number: "03",
        title: "Maderas Tropicales Curadas",
        shortTitle: "Maderas",
        subtitle: "Maderas",
        description:
          "Madera estabilizada a humedad de equilibrio para prevenir alabeos por calor y salinidad costera.",
        deliverables: [
          "Curado en autoclave anti-xilófagos",
          "Acabado botánico a poro abierto",
          "Ensambles tradicionales reforzados",
          "Tolerancia a humedad > 85%",
        ],
        dir: "arquitectura-interiores",
        base: "02-comedor-madera-integrado-isla-cocina-cuadro-arte",
      },
      {
        slug: "acabados-bioclimaticos",
        number: "04",
        title: "Acabados Minerales",
        shortTitle: "Minerales",
        subtitle: "Minerales",
        description:
          "Extracto de corteza de chukum y cal viva apagada en obra. Regula la humedad ambiental y permanece fresca.",
        deliverables: [
          "Hidrófugo natural sin VOC",
          "Superficie continua sin juntas",
          "Difusión de luz indirecta",
          "Ideal para áreas húmedas y muros",
        ],
        dir: "arquitectura-interiores",
        base: "04-bano-moderno-marmol-espejo-circular-iluminacion-led",
      },
    ],
  },
  manifesto: {
    text: "El interior no se decora: se construye desde la luz natural, la ergonomía de la rutina y la verdad tectónica de los materiales nobles.",
    dir: "arquitectura-interiores",
    base: "08-cocina-madera-ventanal-jardin-interior-techo-bambu",
  },
  gallery: {
    intro: {
      eyebrow: "Dossier fotográfico · Espacios habitados",
      heading: "Materia, luz y convivencia en torno a la arquitectura interior",
      body: "Inspección fotográfica continua en doble cinta: cocinas integrales, carpintería residencial de autor y momentos de uso real en nuestro showroom y talleres centrales.",
    },
  },
  engineering: {
    intro: {
      eyebrow: "Ingeniería de detalle y respaldo DRO",
      heading: "Rigor estructural y certificación técnica en cada ensamble",
      body: "Frente a los retos del clima tropical y la sismicidad, la arquitectura interior no es solo decoración: es ingeniería de precisión con levantamiento láser, fijaciones de acero inoxidable y póliza formal de vicios ocultos.",
    },
    items: [
      {
        title: "Levantamiento láser y despiece CNC sin holguras",
        tag: "PRE-FABRICACIÓN Y LEVANTAMIENTO",
        description:
          "Antes de ordenar o cortar un solo módulo o losa, digitalizamos los muros en obra con escáner láser de precisión milimétrica para absorber desplomes de albañilería y asegurar ajustes perfectos.",
        points: [
          "Modelado BIM 3D y despiece a control numérico CNC",
          "Tolerancia de holgura en juntas menor a 1.5 milímetros",
          "Integración oculta de instalaciones eléctricas e hidráulicas",
        ],
        dir: "arquitectura-interiores",
        base: "05-cubierta-isla-cocina-veta-lineal-techo-carrizo",
      },
      {
        title: "Fijación antisísmica y juntas de alivio elástico",
        tag: "CÁLCULO ESTRUCTURAL Y SEGURIDAD",
        description:
          "En zonas de alta sismicidad, nuestras cubiertas pesadas y muebles suspendidos incorporan bastidores de acero anclados a elementos estructurales y adhesivos de curado controlado.",
        points: [
          "Adhesivos epóxicos bicomponentes de alta flexibilidad elástica",
          "Anclajes químicos certificados Hilti en muros de carga",
          "Cero fisuras en empates de piedra bajo torsión tectónica",
        ],
        dir: "arquitectura-interiores",
        base: "10-mueble-lavabo-negro-mate-monomando-minimalista",
      },
      {
        title: "Sellado costero y herrajes de acero inoxidable",
        tag: "PROTECCIÓN BIOCLIMÁTICA",
        description:
          "Para proyectos en Puerto Escondido, Huatulco y la costa oaxaqueña, aislamos cada unión con selladores marinos resistentes a la radiación UV, la salinidad y la proliferación de moho.",
        points: [
          "Bisagras y correderas inoxidables con prueba de niebla salina",
          "Barnices y selladores hidrófugos con filtro UV de grado marino",
          "Maderas tratadas al vacío contra termitas y carcoma",
        ],
        dir: "arquitectura-interiores",
        base: "06-pasillo-galeria-muro-terracota-aplique-luz",
      },
      {
        title: "Garantía contractual y firma pericial DRO",
        tag: "RESPALDO TÉCNICO FORMAL",
        description:
          "Toda intervención de arquitectura de interiores cuenta con firma pericial de Director Responsable de Obra (DRO), póliza de vicios ocultos y entrega de memorias de cálculo por escrito.",
        points: [
          "Firma pericial DRO certificada ante colegios oficiales",
          "Póliza de garantía por escrito contra vicios ocultos",
          "Bitácora técnica de obra y manual de conservación de acabados",
        ],
        dir: "arquitectura-interiores",
        base: "07-perspectiva-comedor-muro-terracota-cuadros-jardin",
      },
    ],
  },
};

export const sustainabilityPageContent = {
  hero: {
    eyebrow: "Arquitectura bioclimática y tropical",
    heading: "Construcción sustentable y arquitectura bioclimática",
    subheadline:
      "Optimizamos la carga térmica y acústica con vientos cruzados, luz natural filtrada y materiales sostenibles de bajo impacto.",
    dir: "arquitectura-sostenible",
    base: "14-residencia-bioclimatica-palapa-celosia-chukum",
    catalogCtaLabel: "Explorar pilares bioclimáticos",
    consultationCtaLabel: "Planear proyecto bioclimático",
  },
  pillars: {
    eyebrow: "Ingeniería bioclimática",
    heading: "Sistemas pasivos de confort térmico y resiliencia",
    body: "Soluciones de ingeniería que reducen la carga energética y aprovechan los vientos del Pacífico.",
    sections: [
      {
        slug: "ventilacion-pasiva",
        number: "01",
        title: "Ventilación Pasiva y Brisa Cruzada",
        shortTitle: "Ventilación",
        subtitle: "Ventilación",
        description:
          "Orientación estratégica hacia los vientos dominantes del Pacífico y chimeneas térmicas que evacuan el calor sin consumo eléctrico.",
        deliverables: [
          "Muros de celosía que aceleran la brisa",
          "Vanos de doble altura para convección natural",
          "Orientación respecto al viento dominante",
          "Confort térmico pasivo sin climatización",
        ],
        dir: "arquitectura-sostenible",
        base: "01-asoleadero-alberca-ventilacion-cruzada-arquitectura-tierra",
      },
      {
        slug: "materiales-locales",
        number: "02",
        title: "Materiales Locales y Chukum",
        shortTitle: "Materialidad",
        subtitle: "Materialidad",
        description:
          "Acabados minerales en chukum, pastas de cal apagada y maderas de la región tratadas al vacío para resistir la salinidad costera.",
        deliverables: [
          "Acabados minerales de nula huella química",
          "Curado de maderas contra salitre y termita",
          "Palapas de palma que disipan la radiación",
          "Ensambles tradicionales reforzados",
        ],
        dir: "arquitectura-sostenible",
        base: "05-materiales-locales-chukum-madera-palapa-costera",
      },
      {
        slug: "gestion-del-agua",
        number: "03",
        title: "Gestión Hídrica y Captación Pluvial",
        shortTitle: "Agua",
        subtitle: "Agua",
        description:
          "Sistemas hidrosanitarios autónomos con captación de agua de lluvia, biodigestores y tratamiento ecológico que protegen el manto freático.",
        deliverables: [
          "Captación pluvial en cubiertas y filtrado",
          "Biodigestores ecológicos certificados",
          "Protección de mantos freáticos en playa",
          "Jardines endémicos de bajo riego",
        ],
        dir: "arquitectura-sostenible",
        base: "03-espejo-agua-alberca-sombra-palmeras-microclima",
      },
      {
        slug: "resiliencia-estructural",
        number: "04",
        title: "Resiliencia Sísmica y Huracanes",
        shortTitle: "Resiliencia",
        subtitle: "Resiliencia",
        description:
          "Ingeniería estructural calculada en gabinete para alta sismicidad y entornos marinos de máxima salinidad, garantizando permanencia patrimonial.",
        deliverables: [
          "Cálculo sísmico en suelo de playa y roca",
          "Cimentaciones protegidas contra corrosión marina",
          "Supervisión pericial directa con firma DRO",
          "Estructuras mixtas de concreto, acero y madera",
        ],
        dir: "arquitectura-sostenible",
        base: "06-volumen-sombreado-aleros-palapa-vegetacion-endemica",
      },
    ],
  },
  manifesto: {
    text:
      "No construimos contra el clima: proyectamos desde la sombra, la brisa del mar y la materia local.",
    dir: "arquitectura-sostenible",
    base: "02-jardines-nativos-alberca-cubiertas-palma-natural",
  },
  gallery: {
    intro: {
      eyebrow: "Dossier fotográfico",
      heading: "Evidencia de obra y permanencia en el trópico",
      body: "Registro en doble cinta continua de decisiones bioclimáticas reales: celosías de barro, cubiertas de palma natural, espejos de agua sombreados y acabados que resisten el clima de la costa oaxaqueña.",
    },
  },
  strategies: {
    intro: {
      eyebrow: "Estrategias constructivas",
      heading: "Construir para el clima del trópico y la costa",
      body: "En la costa y el Istmo, edificar contra el clima encarece el mantenimiento y fuerza la dependencia del aire acondicionado. Integramos cuatro estrategias pasivas desde el primer trazo.",
    },
    items: [
      {
        title: "Orientación solar y evacuación convectiva",
        tag: "TERMODINÁMICA PASIVA",
        description:
          "Orientamos vanos, dobles alturas y patios interiores según los vientos dominantes del mar para crear un tiro térmico natural que desaloja el aire caliente sin motores eléctricos.",
        points: [
          "Cálculo de trayectorias solares y sombras arrojadas",
          "Efecto chimenea en circulaciones verticales y atrios",
          "Reducción de hasta 6 °C respecto a la temperatura exterior",
        ],
        dir: "arquitectura-sostenible",
        base: "07-doble-altura-celosia-iluminacion-natural-filtrada",
      },
      {
        title: "Celosías de barro y tamiz de luz natural",
        tag: "PROTECCIÓN SOLAR",
        description:
          "Muros de celosía artesanal cocida en la región que interceptan la radiación solar directa antes de que impacte los cristales, filtrando brisa constante e iluminación suave.",
        points: [
          "Bloqueo del 70% de la radiación térmica solar directa",
          "Ventilación constante día y noche sin comprometer la privacidad",
          "Material cerámico de alta inercia térmica y fabricación local",
        ],
        dir: "arquitectura-sostenible",
        base: "04-fachada-celosia-proteccion-solar-vegetacion",
      },
      {
        title: "Masa térmica de concreto y recubrimientos de chukum",
        tag: "HIGROTÉRMICA Y TRANSPIRABILIDAD",
        description:
          "Muros masivos que absorben el calor diurno y lo liberan durante la noche fresca, revestidos con pastas de cal y chukum que absorben y expulsan la humedad ambiental sin degradarse.",
        points: [
          "Inercia higrotérmica que estabiliza la temperatura interior",
          "Fungicida e hidrófugo natural impermeable a la brisa marina",
          "Muros monolíticos sin juntas de dilatación vulnerables al salitre",
        ],
        dir: "arquitectura-sostenible",
        base: "08-terrazas-abiertas-orientacion-solar-alberca",
      },
      {
        title: "Cubiertas ventiladas de palma natural y carrizo",
        tag: "DISIPACIÓN TÉRMICA SUPERIOR",
        description:
          "Techumbres tradicionales tejidas por maestros artesanos sobre estructuras de madera curada. El aire caliente asciende y escapa libremente entre el tejido vegetal.",
        points: [
          "Estructuras de madera tropical tratada en autoclave al vacío",
          "Cero acumulación de calor bajo techo en las horas pico de sol",
          "Mantenimiento programado y vida útil extendida con herrajes marinos",
        ],
        dir: "arquitectura-sostenible",
        base: "02-jardines-nativos-alberca-cubiertas-palma-natural",
      },
    ],
  },
};

export const aboutPageContent = {
  hero: {
    eyebrow: "",
    heading: "Ingeniería, oficio y presencia real en cada obra",
    subheadline:
      "Más de 150 obras entregadas y 50,000 m² construidos con cobertura en el Pacífico, el sur y proyectos a nivel nacional.",
    dir: "credibilidad",
    base: "01-arquitecto-chaleco-casa-alta-supervision-topografia",
  },
  story: {
    eyebrow: "Nuestra identidad",
    heading: "Construir con dignidad lo que se proyecta con sensibilidad",
    paragraphs: [
      "Con sede central en Oaxaca y alcance en todo el país, Casa Alta integra taller de diseño arquitectónico y empresa constructora bajo una misma responsabilidad técnica. Proyectamos con sensibilidad espacial y ejecutamos con el rigor que exige el suelo y el clima de cada latitud, sin intermediarios ni atajos.",
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
        "Ingeniería civil calculada en casa para sismicidad severa y topografías complejas, sin subcontratar la seguridad estructural.",
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
    body: "Cada terreno y latitud plantea un reto distinto. Validamos con cálculo estructural si el proyecto requiere concreto armado, presforzado, estructura metálica, losa aligerada o sistemas vernáculos mejorados.",
    dir: "proyectos-integrales",
    base: "03-equipo-ingenieria-analisis-proyecto-sala-trabajo",
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
      "Gabinete de proyectos y residencia de obra con sedes en Puerto Escondido y Salina Cruz, y capacidad de ejecución en todo México.",
    dir: "proyectos-integrales",
    base: "03-sesion-trabajo-revision-proyecto-ejecutivo-oficina",
    photoAlt:
      "Sesión de trabajo y revisión de proyecto ejecutivo en oficina de arquitectura de Constructora Casa Alta",
  },
  stage: {
    heading: "Atención técnica directa y localización en campo",
    body: "Reunión técnica presencial en Puerto Escondido o por videollamada para revisar viabilidad de terreno, programa arquitectónico y presupuesto de obra.",
    dir: "02-el-bicho",
    base: "01-fachada-tres-palapas-alberca",
    photoAlt:
      "Fachada de tres palapas y alberca en El Bicho, proyecto residencial en la costa de Oaxaca por Constructora Casa Alta",
    phonesLabel: "Líneas directas de atención",
    scheduleLabel: "Horarios de atención",
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
  heading: "Atención técnica directa y localización en campo",
  body: "Reunión técnica presencial en Puerto Escondido o por videollamada para revisar viabilidad de terreno, programa arquitectónico y presupuesto de obra.",
};
