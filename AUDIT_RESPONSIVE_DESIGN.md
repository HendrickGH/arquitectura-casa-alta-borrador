# Reporte Consolidado de Auditoría: Responsive Design, Proporción Visual y Coherencia de Contenido

**Proyecto:** Casa Alta — Sitio Web de Arquitectura e Ingeniería Civil  
**Fecha de Emisión:** 31 de Octubre de 2026  
**Tipo de Documento:** Auditoría Técnica de Solo Lectura (Código Fuente 100% Intacto)  
**Alcance:** 8 Páginas del Sitio (`/`, `/nosotros`, `/obra-civil`, `/servicios`, `/contacto`, `/proyectos`, `/arquitectura-interiores`, `/construccion-sostenible`) y Componentes Globales Compartidos  
**Normas y Contratos de Referencia:** `DESIGN.md` (*Cosentino Architectural Editorial Contract*), W3C WCAG 2.2 AA, Web Interface Guidelines.

---

## 1. Resumen Ejecutivo y Metodología de Auditoría

### 1.1 Contexto y Objetivos del Proyecto
La firma de arquitectura e ingeniería civil **Casa Alta** cuenta con una plataforma web desarrollada en Next.js (App Router), React 19, TypeScript y Tailwind CSS v4, orientada a proyectar sobriedad técnica, rigor pericial y excelencia arquitectónica bajo la dirección estética *Cosentino Architectural Editorial*.

El presente documento constituye la consolidación exhaustiva de la auditoría técnica de diseño responsive, proporciones visuales e integridad de contenido. La auditoría se enfocó en detectar:
1. **Incoherencias visuales y de diseño responsive:** Elementos desbordados, desproporciones de escala, problemas de alineación, legibilidad comprometida en pantallas pequeñas y violaciones al contrato visual de 0px de `DESIGN.md`.
2. **Incoherencias de contenido en mobile frente a desktop:** Datos redundantes, textos duplicados, discrepancias entre fuentes de datos y omisión de información técnica en versiones móviles.
3. **Interacciones duplicadas y enlaces rotos:** Disparadores redundantes de la misma acción en una sola pantalla, apertura de modales sobre formularios ya visibles en la página y anclas sin destino en el DOM.

### 1.2 Alcance de la Auditoría
La inspección cubrió el 100% de las rutas públicas del proyecto:
- **Página 1:** Inicio / Portada (`/`)
- **Página 2:** Estudio / Nosotros (`/nosotros`)
- **Página 3:** Ingeniería Civil e Infraestructura (`/obra-civil`)
- **Página 4:** Catálogo Integral de Servicios (`/servicios`)
- **Página 5:** Contacto y Ubicación (`/contacto`)
- **Página 6:** Portafolio de Proyectos Seleccionados (`/proyectos`)
- **Página 7:** Arquitectura de Interiores y Acabados de Autor (`/arquitectura-interiores`)
- **Página 8:** Construcción Sostenible y Bioclimática (`/construccion-sostenible`)
- **Capa Global:** Cabecera fija (`Header.tsx`, `SiteNav.tsx`, `Logo.tsx`), Drawer móvil, Botón persistente `WhatsAppFloat`, Cierre monumental `ClosingCTA` y `Footer`.

### 1.3 Entorno y Viewports Evaluados
El análisis se ejecutó considerando los perfiles de dispositivos representativos del mercado:
- **Mobile Extra Small (320px – 360px):** iPhone SE (1ª gen), Samsung Galaxy Fold exterior, dispositivos Android compactos.
- **Mobile Small / Standard (375px – 390px):** iPhone SE (2ª/3ª gen), iPhone 12/13/14/15/16 estándar, Google Pixel.
- **Mobile Large (412px – 430px):** iPhone Pro Max, Samsung Galaxy S Ultra.
- **Tablet (768px – 1024px):** iPad Mini, iPad Air, Surface Pro en orientación vertical y horizontal.
- **Desktop (1280px, 1440px, 1920px+):** Laptops y monitores panorámicos de alta densidad de píxeles.

### 1.4 Marco Normativo y Criterios de Evaluación
1. **Contrato `DESIGN.md`:**
   - **Geometría 0px estricta:** Cero bordes redondeados, cápsulas o píldoras (la única excepción circular autorizada es el botón flotante `WhatsAppFloat`).
   - **Alternancia Tonal de Superficies:** Secuencia limpia y rítmica entre `canvas` (`#ffffff`), `bone` (`#f4f3f1`) e `ink` (`#111111`) sin bordes artificiales divisorios.
   - **Jerarquía Tipográfica:** Tipografía display `Marcellus` para encabezados editoriales y citas de autor; `Montserrat` con `tabular-nums` para cuerpo, etiquetas y métricas. Prohibición total de fuentes monoespaciadas.
   - **Content Seam:** Todo texto o dato visible debe provenir de `src/content/*` y consumirse como props; cero textos codificados directamente en componentes.
   - **Contratos de Componentes:** *Cosentino Catalogue Bar* (pestañas `0px` sin líneas inferiores divisorias), *Monolith Cards* (tarjetas monolíticas fotográficas equilibradas) y *Clean-Ground Visual Order* (imagen precede al texto en tarjetas).
2. **Accesibilidad WCAG 2.2 AA y Web Interface Guidelines:**
   - **Criterio 2.5.5 (Target Size):** Objetivos táctiles mínimos de 44×44px para controles interactivos.
   - **Criterio 2.1.1 (Keyboard Navigation):** Pestañas y selectores deben ser completamente operables mediante teclado (`Tab`, `Space`, `Enter`, flechas de dirección).
   - **Criterio 2.1.2 (No Keyboard Trap / Scroll Trap):** Ningún contenedor secundario debe atrapar el foco o el scroll impidiendo la navegación vertical del usuario.

### 1.5 Resumen Estadístico de Hallazgos
La auditoría identificó un total de **39 hallazgos específicos**, desglosados en:
- **Por Nivel de Prioridad:**
  - **P1 (Crítico / Bloqueante):** 11 hallazgos (colisiones en <375px, enlaces rotos, metadatos vacíos, scroll trap, disparadores duplicados y contradicciones factuales de contacto).
  - **P2 (Mayor / Usabilidad y Responsive):** 18 hallazgos (desproporciones de escala, inaccesibilidad por teclado, omisión de datos en móvil, justificación de texto, colisiones de color).
  - **P3 (Menor / Consistencia Editorial y Polish):** 10 hallazgos (textos huérfanos, textos hardcodeados, descripciones alt repetitivas, micro-asimetrías).
- **Por Categoría Técnica:**
  - Visual Responsive y Proporción: 16 hallazgos (41.0%)
  - Redundancia y Disonancia de Contenido: 11 hallazgos (28.2%)
  - Interacción Duplicada y Flujos Rotos: 7 hallazgos (17.9%)
  - Accesibilidad y Contratos de Diseño: 5 hallazgos (12.8%)

---

## 2. Componentes Globales y Layout Compartido

### 2.1 Cabecera y Logotipo (`Logo.tsx`, `Header.tsx`, `SiteNav.tsx`)

#### Hallazgo G-01: Desproporción de escala del logotipo en Header y colisión crítica en viewport móvil (<375px)
- **Ubicación:** `src/components/atoms/Logo.tsx` (líneas 16–17), `src/components/organisms/Header.tsx` (líneas 52–56), `src/app/globals.css` (línea 59).
- **Código Observado:**
  ```tsx
  // Logo.tsx
  const sizeClasses =
    size === "header" ? "h-[72px] md:h-[88px]" : "h-9 md:h-11";
  ```
  ```css
  /* globals.css */
  --chrome-h: 9.625rem; /* ~154px */
  ```
- **Incoherencia Identificada:**
  1. El archivo fuente del logotipo (`/brand/logo-casa-alta.png`) posee dimensiones originales de 354×160 píxeles, con una relación de aspecto intrínseca de **2.21:1**.
  2. En dispositivos móviles (`< md`), fijar la altura en `h-[72px]` impone un ancho automático de **159 píxeles**.
  3. En un viewport móvil estándar de **375px** (iPhone SE, iPhone estándar) con un `Container` que aplica `px-6` (48px de padding acumulado), el ancho interior libre es de solo **327px**.
  4. Los elementos presentes en la barra son:
     - Logotipo (`shrink-0`): 159px
     - Separación (`gap-4`): 16px
     - Botón CTA "Iniciar consulta": ~130px
     - Separación interna (`gap-2`): 8px
     - Botón menú hamburguesa: 44px
     - **Ancho total indispensable:** `159 + 16 + 130 + 8 + 44 = 357px`.
  5. Dado que `357px > 327px`, se produce un déficit de **30px**, ocasionando compresión horizontal severa, colisión física entre elementos y desbordamiento en anchos inferiores a 375px. Además, la cabecera fija consume ~140px de altura vertical, secuestrando más del 20% del viewport útil del teléfono.
- **Recomendación Técnica:**  
  Redimensionar el logotipo del header a una escala proporcional y compacta: `size === "header" ? "h-9 sm:h-10 md:h-12" : "h-8 md:h-9"`. Ajustar el token `--chrome-h` en `globals.css` a ~72px–80px en pantallas móviles.

#### Hallazgo G-02: Parche CSS `translate-y-[10px]` para compensar el desajuste vertical del Header
- **Ubicación:** `src/components/organisms/SiteNav.tsx` (línea 141).
- **Código Observado:**
  ```tsx
  <div className="flex items-center gap-2 xl:gap-4 2xl:gap-7 translate-y-[10px]">
  ```
- **Incoherencia Identificada:**  
  Se incorporó una traslación vertical manual arbitraria (`translate-y-[10px]`) sobre el bloque de navegación, enlaces de escritorio, botón CTA y menú hamburguesa. Este parche fue introducido para intentar compensar visualmente el sobredimensionamiento del logotipo de 72px–88px, pero rompe el centrado óptico nativo (`items-center`) y desalinea los controles con respecto a la rejilla base.
- **Recomendación Técnica:**  
  Eliminar la clase `translate-y-[10px]` de `SiteNav.tsx`. Al reducir el tamaño del logo según G-01, el flexbox alineará con naturalidad y precisión todos los elementos verticalmente sin necesidad de desplazamientos artificiales.

#### Hallazgo G-03: Drawer de navegación móvil con recorte vertical severo y duplicación simultánea de CTA
- **Ubicación:** `src/components/organisms/SiteNav.tsx` (líneas 78–137, 152–162).
- **Código Observado:**
  ```tsx
  <div
    id="site-nav"
    className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto bg-canvas xl:hidden"
    style={{ top: "var(--chrome-h)" }}
  >
  ...
  <Button type="button" onClick={...} size="md" className="w-full justify-center">
    {cta.label}
  </Button>
  ```
- **Incoherencia Identificada:**  
  1. El menú móvil desplegable se posiciona debajo de `--chrome-h` (~140px en móvil), perdiendo un área sustancial de pantalla superior.
  2. Dentro del cuerpo del drawer se incluye un botón de conversión a ancho completo ("Cotizar proyecto"). Sin embargo, la barra fija superior (justo arriba del drawer) mantiene visible el botón CTA primario (`chrome-cta`). Como resultado, el usuario móvil visualiza simultáneamente dos botones de "Cotizar proyecto" idénticos a pocos centímetros de distancia en la misma vista.
  3. El contenedor `#site-nav` carece de atributos de accesibilidad (`role="dialog"`, `aria-modal="true"`) y no implementa confinamiento de foco accesible (`focus trap`).
- **Recomendación Técnica:**  
  Ocultar el botón CTA de la cabecera cuando el menú móvil se encuentre abierto (`open === true`), o suprimir el botón interno del drawer confiando en el CTA principal fijo. Incorporar `role="dialog"`, `aria-modal="true"` y una rutina de atrape de foco accesible.

### 2.2 Botón Persistente Flotante de WhatsApp (`WhatsAppFloat.tsx`)

#### Hallazgo G-04: Ausencia de Safe Area Inset en dispositivos iOS con Home Indicator
- **Ubicación:** `src/components/organisms/WhatsAppFloat.tsx` (línea 23).
- **Código Observado:**
  ```tsx
  className="fixed right-5 bottom-5 z-40 inline-flex h-14 w-14 ... rounded-full bg-brand-800"
  ```
- **Incoherencia Identificada:**  
  La coordenada fija `bottom-5` (20px) no toma en cuenta el área segura del sistema (`env(safe-area-inset-bottom)`). En dispositivos Apple iPhone con navegación gestual por barra de inicio (*Home Indicator*, altura de 34px), el botón de WhatsApp se solapa parcialmente con la zona táctil del sistema operativo, provocando activaciones accidentales del chat o bloqueos al intentar salir de la aplicación.
- **Recomendación Técnica:**  
  Utilizar la función de entorno CSS: `bottom-[max(1.25rem,env(safe-area-inset-bottom))]` en la clase del componente para garantizar un margen seguro y ergonómico en todo dispositivo móvil moderno.

### 2.3 Sección de Cierre Monumental y Pie de Página (`ClosingCTA.tsx`, `Footer.tsx`)

#### Hallazgo G-05: Colisión cromática de dos etapas oscuras consecutivas (`ClosingCTA` + `Footer`) y desproporción vertical (140vh)
- **Ubicación:** `src/components/organisms/ClosingCTA.tsx` (líneas 85–86), `src/components/organisms/Footer.tsx` (líneas 18–35), plantillas de página (`ServicesPageTemplate.tsx`, `CivilWorksPageTemplate.tsx`, etc.).
- **Código Observado:**
  ```tsx
  <section className="relative flex min-h-[140vh] w-full flex-col justify-end overflow-hidden bg-ink md:min-h-[150vh]">
  ```
- **Incoherencia Identificada:**  
  1. `ClosingCTA` fuerza una altura mínima de `min-h-[140vh]` en mobile con distribución `justify-end`. En pantallas móviles pequeñas, esto genera más de 700px de vacío oscuro con fotografía de fondo antes de llegar a los títulos y botones de acción.
  2. Al llegar al final de `ClosingCTA` (`bg-ink` / fondo negro), la página desemboca inmediatamente en el `Footer` (también con `bg-ink`). Esta yuxtaposición crea una masa continua oscura de más de 200vh que satura la experiencia de lectura y duplica enlaces de contacto sin una pausa o diferenciación visual.
- **Recomendación Técnica:**  
  Ajustar la altura de `ClosingCTA` en móviles a `min-h-[85vh]` o `py-20`, manteniendo `min-h-[140vh]` exclusivamente para desktop. Introducir un separador perimetral de contraste o regular la densidad cromática antes del pie de página.

### 2.4 Navegación Global del Sitio (`site.ts`)

#### Hallazgo G-06: Omisión de `/arquitectura-interiores` en la estructura de navegación global (`site.nav`)
- **Ubicación:** `src/content/site.ts` (líneas 33–41).
- **Código Observado:**
  ```ts
  nav: [
    { label: "Inicio", href: "/" },
    { label: "Proyectos", href: "/proyectos" },
    { label: "Servicios", href: "/servicios" },
    { label: "Obra Civil", href: "/obra-civil" },
    { label: "Sostenible", href: "/construccion-sostenible" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Contacto", href: "/contacto" },
  ],
  ```
- **Incoherencia Identificada:**  
  La división de **Arquitectura de Interiores** (`/arquitectura-interiores`), pilar temático esencial del estudio, se encuentra totalmente excluida del menú principal y del drawer móvil. Los usuarios que navegan por el sitio no disponen de una ruta de acceso directo a este catálogo salvo que sigan un enlace disperso en el cuerpo de otra sección.
- **Recomendación Técnica:**  
  Incorporar el enlace `{ label: "Interiores", href: "/arquitectura-interiores" }` en `site.nav`, consolidando el acceso equitativo a las tres ramas operativas de la firma.

---

## 3. Auditoría Detallada Individual por Página (Las 8 Páginas)

### 3.1 Página 1: Inicio / Portada (`/`)

#### Hallazgo L-01: Duplicación funcional de botón CTA en sección "Recorrido Virtual"
- **Ubicación:** `src/components/organisms/VirtualTourSection.tsx` (líneas 66–81 y 132–143), `src/components/molecules/SectionHeading.tsx` (líneas 73–87).
- **Código Observado:**
  ```tsx
  {/* Botón 1 en SectionHeading (renderizado siempre en el encabezado) */}
  <SectionHeading
    eyebrow={tour.eyebrow ?? "Recorrido virtual"}
    heading={tour.heading}
    body={tour.hook}
    action={
      <Button href={tour.cta.href || "/servicios"} variant="primary" size="md" arrow>
        {tour.cta.label || "Conoce nuestros servicios"}
      </Button>
    }
    className="mb-8 md:mb-12"
  />

  {/* Tarjeta de video interactiva */}
  <div onClick={() => setIsOpen(true)} ...>...</div>

  {/* Botón 2 en Mobile Action Bar (renderizado debajo en mobile) */}
  <div className="mt-8 flex justify-center md:hidden">
    <Button href={tour.cta.href || "/servicios"} variant="primary" size="md" arrow className="w-full justify-center">
      {tour.cta.label || "Conoce nuestros servicios"}
    </Button>
  </div>
  ```
- **Incoherencia Identificada:**  
  `SectionHeading` renderiza el slot `action` de forma incondicional en todas las resoluciones. En vista móvil (`< md`), el usuario observa el botón primario "Conoce nuestros servicios" arriba del reproductor de video y, al desplazarse inmediatamente debajo del reproductor, se encuentra con el bloque `{/* Mobile Action Bar */}` con exactamente el mismo botón, mismo texto, misma ruta destino (`/servicios`) y mismo estilo.
- **Recomendación Técnica:**  
  Ocultar el botón del slot de cabecera en móvil aplicando `className="hidden md:inline-flex"` dentro de `action`, O suprimir el bloque inferior `{/* Mobile Action Bar */}` (líneas 132–143) manteniendo una llamada de acción única y limpia.

#### Hallazgo L-02: Redundancia de ordinales y etiquetas en etapas de Metodología
- **Ubicación:** `src/components/molecules/ProcessEntry.tsx` (líneas 103–115).
- **Código Observado:**
  ```tsx
  <div className="flex items-center gap-3">
    <span className="flex h-7 w-7 items-center justify-center bg-bone-200 text-xs font-semibold tabular-nums text-brand-800">
      {marker}
    </span>
    <span className="label tabular-nums text-ink-muted">
      {`Etapa ${marker} de ${String(total).padStart(2, "0")}`}
    </span>
  </div>
  ```
- **Incoherencia Identificada:**  
  En la variante de tarjeta para móvil y tablet (`variant="card"`), se presenta consecutivamente el bloque numérico `[ 01 ]` adyacente al texto `Etapa 01 de 07`. El número `01` y la palabra indicadora se repiten en un margen horizontal de escasos 12 píxeles, recargando innecesariamente la interfaz sin aportar información nueva.
- **Recomendación Técnica:**  
  Simplificar el indicador visual en `ProcessEntry.tsx` a:
  ```tsx
  <div className="flex items-center gap-2">
    <span className="label font-semibold tabular-nums text-brand-800">{marker}</span>
    <span className="label tabular-nums text-ink-muted">/ {String(total).padStart(2, "0")} · Etapa de obra</span>
  </div>
  ```

#### Hallazgo L-03: Justificación forzada de párrafos (`text-justify`) y ríos de espacio en blanco
- **Ubicación:** `src/app/globals.css` (líneas 92–95), `src/components/organisms/IntroSection.tsx` (línea 67), `src/components/organisms/TerritoryShowcase.tsx` (línea 63), `src/components/organisms/ProcessList.tsx` (línea 148).
- **Código Observado:**
  ```css
  p {
    text-align: justify;
    text-justify: inter-word;
  }
  ```
- **Incoherencia Identificada:**  
  La justificación forzada de párrafos en columnas estrechas de teléfonos móviles (con apenas 30 a 38 caracteres por línea) genera graves ríos de espacio en blanco (*rivers of whitespace*) y espaciados interpalabra desmedidos e irregulares en textos en español sin partición silábica automática.
- **Recomendación Técnica:**  
  Eliminar la regla global de justificación en `globals.css` y redefinirla como alineación izquierda predeterminada: `p { text-align: left; }`. Limitar `text-justify` a pantallas grandes (`@media (min-width: 1024px)`) en secciones de formato puramente editorial.

#### Hallazgo L-04: Contenido hardcodeado en componentes violando el principio "Content Seam"
- **Ubicación:** `src/components/organisms/TerritoryShowcase.tsx` (líneas 35, 59, 65, 77), `src/components/organisms/ClosingCTA.tsx` (líneas 116, 155).
- **Código Observado:**
  - `TerritoryShowcase.tsx`: `heading="El nuevo lujo no se ve, se siente"`, `"Arquitectura nativa"`, `"Conoce todos nuestros proyectos"`.
  - `ClosingCTA.tsx`: `"Reunión por Zoom o en nuestras sedes"`, `"Iniciar consulta"`.
- **Incoherencia Identificada:**  
  Infracción directa al contrato de arquitectura de contenido establecido en `DESIGN.md` §7.2 (*Zero Hardcoded Copy in Components*). Todo texto debe residir en `src/content/home.ts` y pasarse por props.
- **Recomendación Técnica:**  
  Migrar las cadenas hardcodeadas a `src/content/home.ts` dentro de las estructuras tipadas correspondientes.

#### Hallazgo L-05: Relleno asimétrico en cuadrícula móvil y token tipográfico incorrecto en `StatsBand`
- **Ubicación:** `src/components/organisms/StatsBand.tsx` (líneas 11–15, 25), `src/components/molecules/StatItem.tsx` (línea 25).
- **Código Observado:**
  ```tsx
  // StatsBand.tsx
  const ruleClass = index % 2 === 1 && "pl-6";
  ```
  ```tsx
  // StatItem.tsx
  <span className="font-serif text-3xl ...">
  ```
- **Incoherencia Identificada:**  
  1. En móvil (`grid-cols-2`), la segunda columna recibe `pl-6` (24px de relleno) mientras la primera columna tiene 0px, produciendo desalineación y desequilibrio visual en la cuadrícula.
  2. `StatItem.tsx` utiliza `font-serif` (Georgia/Times genérica en Tailwind v4) en lugar de invocar el token de display oficial `font-display` o `voice="serif"` (`Marcellus`).
- **Recomendación Técnica:**  
  Sustituir `ruleClass` por un espaciado homogéneo de rejilla: `grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4`. En `StatItem.tsx`, vincular el estilo tipográfico a `font-display` para asegurar la renderización de Marcellus.

---

### 3.2 Página 2: Estudio / Nosotros (`/nosotros`)

#### Hallazgo N-01: Redundancia crítica de texto en fases de Metodología
- **Ubicación:** `src/components/organisms/MethodologyZigzag.tsx` (líneas 72–96), `src/content/pages.ts` (líneas 556–594).
- **Código Observado:**
  - **Fase 01:**
    - Kicker/Etiqueta: `FASE 01 · GABINETE TÉCNICO · CÁLCULO ESTRUCTURAL`
    - Título (`h3`): `Proyecto ejecutivo y cálculo estructural`
  - **Fase 03:**
    - Descripción: `"...Entregamos la obra sin sobrecostos y con póliza de garantía post-entrega por escrito."`
    - Entregable: `ENTREGABLE: Póliza de garantía por escrito`
- **Incoherencia Identificada:**  
  - En la Fase 01, la frase técnica "cálculo estructural" aparece en la etiqueta superior y se reitera de forma inmediata en el título principal adyacente.
  - En la Fase 03, la promesa comercial "póliza de garantía post-entrega por escrito" forma parte del párrafo descriptivo y se duplica textualmente en la viñeta inferior del entregable.
- **Recomendación Técnica:**  
  En `src/content/pages.ts`:
  - Para Fase 01, ajustar el kicker a: `FASE 01 · GABINETE TÉCNICO · INGENIERÍA SISMORRESISTENTE`.
  - Para Fase 03, diferenciar el entregable: `ENTREGABLE: Expediente finiquito y póliza de vicios ocultos (6 meses)`.

#### Hallazgo N-02: Disonancia conceptual y metodológica: 7 etapas comerciales vs 3 fases constructivas
- **Ubicación:** `src/content/process.ts` (7 etapas) frente a `src/content/pages.ts` (líneas 556–594, 3 fases).
- **Incoherencia Identificada:**  
  El sitio expone dos explicaciones contradictorias sobre cómo opera el estudio sin aclarar su relación:
  - En Inicio (`/`): Secuencia de **7 etapas** que abarca desde la asesoría previa hasta la entrega.
  - En Nosotros (`/nosotros`): Secuencia de **3 fases** centradas en cálculo, cimentación y acabados.
  El usuario no comprende si Casa Alta trabaja bajo un esquema de 7 pasos o de 3 fases operativas.
- **Recomendación Técnica:**  
  Clarificar la jerarquía en `/nosotros`: titular la sección como `Fases de Ejecución en Obra` e incluir una nota aclaratoria: *"Las 3 fases técnicas en terreno que materializan el proyecto ejecutivo una vez concluidas las etapas previas de planeación y diseño"*.

#### Hallazgo N-03: Reutilización repetida de la misma fotografía de supervisión en tres instancias
- **Ubicación:** `src/components/templates/AboutPageTemplate.tsx` (líneas 47–70), `src/content/pages.ts` (líneas 505–506, 564–565, 577–578).
- **Incoherencia Identificada:**  
  La fotografía pericial `06-armado-acero-estructural-zapata-trabajador-casa-alta` se utiliza:
  1. Como fotografía estática destacada en `EditorialSplitSection`.
  2. Como la primera fotografía del carrusel de `CredibilityGallery`.
  3. Reaparece como imagen ilustrativa en la Fase 02 de `MethodologyZigzag`.
  El usuario visualiza la misma escena de armado de zapatas tres veces en una misma página.
- **Recomendación Técnica:**  
  Asignar a `EditorialSplitSection` una fotografía de gabinete o de taller arquitectónico (por ejemplo, planos o maquetas), reservando las fotos de armado estructural exclusivamente para la galería de supervisión y la fase de obra.

#### Hallazgo N-04: Redundancia literal de cifras estadísticas entre PageHero y StatsBand
- **Ubicación:** `src/content/pages.ts` (líneas 503–504), `src/components/templates/AboutPageTemplate.tsx` (línea 55).
- **Código Observado:**
  - `subheadline` de `PageHero`: `"Más de 150 obras entregadas y 50,000 m² construidos con cobertura en el Pacífico, el sur y proyectos a nivel nacional."`
  - Métricas de `StatsBand` inmediatamente debajo: `150+` (`Obras entregadas`) y `50,000` (`Metros cuadrados construidos`).
- **Incoherencia Identificada:**  
  El usuario lee exactamente las mismas cifras numéricas y unidades métricas dos veces en un desplazamiento vertical menor a 200 píxeles.
- **Recomendación Técnica:**  
  Reescribir el `subheadline` del hero con un enfoque filosófico e institucional (ej. *"Estudio fundado en 2016 con práctica ininterrumpida de diseño sismorresistente y dirección de obra de alta complejidad en el Pacífico mexicano"*), dejando los datos cuantitativos exclusivamente para las tarjetas numéricas de `StatsBand`.

#### Hallazgo N-05: Contenido huérfano: Misión, Filosofía y Pilares de credibilidad definidos pero no renderizados
- **Ubicación:** `src/content/pages.ts` (líneas 514–550), `src/components/templates/AboutPageTemplate.tsx`.
- **Incoherencia Identificada:**  
  En `pages.ts` existen campos ricos y redactados con precisión: `missionTitle` ("Misión"), `mission`, `visionTitle` ("Filosofía"), `vision` y un arreglo completo de 3 pilares (`credibilityHighlights`: "01. Cálculo propio", "02. Supervisión en sitio", "03. Certeza patrimonial"). Sin embargo, la plantilla `AboutPageTemplate` no renderiza ninguno de estos bloques, ignorándolos y dejando huérfana la declaración institucional del despacho.
- **Recomendación Técnica:**  
  Actualizar `AboutPageTemplate.tsx` para exponer la misión y filosofía dentro de `EditorialSplitSection` o mediante un bloque específico de pilares institucionales.

#### Hallazgo N-06: Eyebrow vacío en PageHero provocando asimetría con el resto del sitio
- **Ubicación:** `src/content/pages.ts` (línea 501).
- **Incoherencia Identificada:**  
  `aboutPageContent.hero.eyebrow` está asignado como `""` (cadena vacía), a diferencia de las demás páginas del sitio que muestran un kicker editorial distintivo.
- **Recomendación Técnica:**  
  Definir `eyebrow: "Estudio de arquitectura e ingeniería civil"` en `pages.ts`.

---

### 3.3 Página 3: Obra Civil e Infraestructura (`/obra-civil`)

#### Hallazgo OC-01: Textos vacíos en Hero, columna derecha desierta y metadatos SEO/Schema incompletos
- **Ubicación:** `src/content/pages.ts` (líneas 178–187), `src/app/obra-civil/page.tsx` (líneas 15, 21, 57), `src/components/organisms/PageHero.tsx` (líneas 102–104).
- **Código Observado:**
  ```typescript
  hero: {
    eyebrow: "",
    heading: "Ingeniería civil, puentes vehiculares y montaje de prefabricados de concreto",
    subheadline: "",
    catalogCtaLabel: "",
    consultationCtaLabel: "",
  }
  ```
- **Incoherencia Identificada:**  
  1. En desktop, la columna derecha de `PageHero` queda completamente vacía y desierta por falta de `subheadline` y botones CTA.
  2. En mobile, se presenta una pantalla de 100svh oscura sin contexto ni llamada a la acción.
  3. **Impacto Crítico de SEO:** `src/app/obra-civil/page.tsx` utiliza `page.hero.subheadline` para alimentar `<meta name="description">`, OpenGraph description y Schema.org JSON-LD. En consecuencia, la página se publica con metadatos descriptivos en blanco (`content=""`), perjudicando el posicionamiento orgánico en Google.
- **Recomendación Técnica:**  
  Poblar `civilWorksPageContent.hero` con contenido pericial auténtico:
  - `eyebrow`: `"Ingeniería Civil y Estructuras Mayores · Obras de Alto Tonelaje"`
  - `subheadline`: `"Montaje de prefabricados de concreto, puentes vehiculares y cimentaciones profundas con equipo propio y certificación pericial DRO en Oaxaca y el sureste."`
  - `catalogCtaLabel`: `"Ver especialidades técnicas"` (hacia `#especialidades`)
  - `consultationCtaLabel`: `"Cotizar obra civil"` (hacia WhatsApp).

#### Hallazgo OC-02: Enlace roto a ancla inexistente `#contacto` en tarjeta de especialidades
- **Ubicación:** `src/components/templates/ThematicPillarPageTemplate.tsx` (línea 111), `src/components/organisms/SpecialtiesShowcase.tsx` (líneas 37, 181–185).
- **Código Observado:**
  ```tsx
  // SpecialtiesShowcase.tsx
  ctaHref = "#contacto",
  ...
  <Button href={ctaHref} variant="inverse" size="sm" arrow>
    {ctaLabel}
  </Button>
  ```
- **Incoherencia Identificada:**  
  Al ser `consultationCtaLabel === ""` en `/obra-civil`, `ctaHref` asume el valor por defecto `"#contacto"`. Sin embargo, en todo el DOM de la página `/obra-civil` **no existe ningún elemento con `id="contacto"`** (las secciones tienen IDs `especialidades`, `infraestructura` y `respaldo-tecnico`). Al hacer clic en "Solicitar cotización técnica", el navegador busca infructuosamente el ancla sin ejecutar acción alguna.
- **Recomendación Técnica:**  
  Asignar `id="contacto"` a la sección `<ClosingCTA>` o asegurar que `ctaHref` pase directamente el enlace oficial de WhatsApp (`site.whatsapp.href`).

#### Hallazgo OC-03: Pseudo-pestañas inaccesibles por teclado y clic en escritorio
- **Ubicación:** `src/components/organisms/SpecialtiesShowcase.tsx` (líneas 193–245).
- **Código Observado:**
  ```tsx
  <div role="tablist" aria-label="Especialidades de ejecución" ...>
    {sections.map((section) => (
      <div
        key={section.slug}
        id={`tab-${section.slug}`}
        role="tab"
        aria-selected={isActive}
        className="flex flex-col text-left pb-2"
      >
  ```
- **Incoherencia Identificada:**  
  Los elementos se identifican semánticamente con `role="tab"` pero son etiquetas `<div>` pasivas sin `tabIndex={0}`, sin evento `onClick` y sin listeners de teclado (`onKeyDown`). La pestaña activa únicamente se conmuta mediante `onMouseEnter` sobre la fotografía superior. Los usuarios que navegan mediante teclado, pantalla táctil en desktop o lectores de pantalla quedan totalmente incapacitados para interactuar con las pestañas de especialidades (violación de WCAG 2.1.1).
- **Recomendación Técnica:**  
  Reemplazar los `<div>` por botones `<button type="button" role="tab" tabIndex={isActive ? 0 : -1} onClick={...} onKeyDown={...}>` e implementar la navegación con flechas izquierda/derecha conforme a las especificaciones W3C WAI-ARIA.

#### Hallazgo OC-04: Supresión total de entregables técnicos y botones de conversión en dispositivos móviles
- **Ubicación:** `src/components/organisms/SpecialtiesShowcase.tsx` (líneas 252–307).
- **Código Observado:**
  ```tsx
  {/* Complete deliverables in DOM for assistive tech & search engines */}
  <ul className="sr-only">
    {section.deliverables.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
  ```
- **Incoherencia Identificada:**  
  En pantallas móviles (`< md`), las cuatro especialidades se muestran en un carrusel táctil, pero la lista de entregables técnicos de cada una se encierra bajo `ul.sr-only` (completamente invisible para usuarios visuales móviles) y se omite al 100% el botón de acción `<Button>`. La versión móvil queda desprovista de especificaciones de tonelaje y sin vía de conversión.
- **Recomendación Técnica:**  
  Mostrar en mobile una versión compacta visible con viñetas técnicas de 0px e incluir un botón secundario de conversión hacia cotización técnica.

#### Hallazgo OC-05: Fotografías idénticas reutilizadas en Manifiesto, Especialidades e Ingeniería
- **Ubicación:** `src/content/pages.ts` (líneas 259, 266, 306, 332).
- **Incoherencia Identificada:**  
  - Foto `04-izado-cabezal-columna-puente-grua-cielo-azul`: Utilizada en `manifesto` (línea 266) y repetida de forma idéntica en `engineering.items[1]` (línea 306).
  - Foto `01-grua-izando-parrilla-acero-cimentacion-vialidad`: Utilizada en `specialties.sections[3]` (línea 259) y repetida de forma idéntica en `engineering.items[3]` (línea 332).
  El 50% de las imágenes de respaldo técnico son duplicados directos de fotos vistas previamente en la misma página.
- **Recomendación Técnica:**  
  Seleccionar identificadores fotográficos únicos del repertorio de obra civil (`01-obra-civil`), asegurando variedad documental en cada sección.

#### Hallazgo OC-06: Desproporción vertical extrema y fatiga de scroll en sección "Respaldo Técnico"
- **Ubicación:** `src/components/organisms/WhyCasaAltaEditorial.tsx` (líneas 156–235).
- **Incoherencia Identificada:**  
  En mobile (`< lg`), los 4 puntos técnicos se apilan en una sola columna: cada punto incluye una fotografía vertical de proporción `4:5` a pantalla completa (~410px), seguida de título, descripción extensa y 3 viñetas. La sección totaliza **más de 3,600 píxeles verticales** de desplazamiento monótono sin variaciones visuales ni pausas ergonómicas.
- **Recomendación Técnica:**  
  En dispositivos móviles, presentar los puntos técnicos en un formato de acordeón plegable o convertir la galería en un carrusel táctil horizontal compacto, preservando el layout en zigzag para pantallas grandes.

---

### 3.4 Página 4: Catálogo de Servicios (`/servicios`)

#### Hallazgo S-01: Selector `<select>` con borde rectangular gris violando el contrato canónico de Catalogue Bar
- **Ubicación:** `src/components/organisms/ServicesIndex.tsx` (líneas 108–145), `DESIGN.md` (líneas 98–108).
- **Código Observado:**
  ```tsx
  <select
    id="services-filter"
    value={selectedFilter}
    onChange={(e) => setSelectedFilter(e.target.value)}
    aria-label="Filtrar servicios por especialidad o interés"
    className="min-h-[50px] w-full appearance-none rounded-none border border-bone-200 bg-canvas px-5 py-3.5 pr-12 text-sm sm:text-base font-medium text-ink transition-colors duration-200 hover:border-brand-800 focus:border-brand-800 focus:outline-none focus:ring-1 focus:ring-brand-800 cursor-pointer"
  >
  ```
- **Incoherencia Identificada:**  
  `DESIGN.md` §5.2 (*Tabs & Category Switchers - Cosentino Catalogue Bar*) estipula textualmente:
  > *"Zero Border Policy: Tabs must never render hairline borders, divider strokes, or baseline rules. Container: flex flex-wrap items-center gap-6 md:gap-8 (with role='tablist'). Tab Item: 0px button (role='tab', aria-selected)... Inactive State: text-ink-muted hover:text-ink."*
  `ServicesIndex` sustituyó la barra de pestañas canónica por un `<select>` nativo con borde rectangular visible (`border border-bone-200`), rompiendo la armonía estética de catálogo editorial.
- **Recomendación Técnica:**  
  Restaurar el componente canónico de pestañas *Catalogue Bar* con `role="tablist"` y botones planos de 0px sin bordes en concordancia estricta con `DESIGN.md`.

#### Hallazgo S-02: Desproporción en `MonolithCard`: altura excesiva de 580px y 85.5% de oscurecimiento por scrims en móvil
- **Ubicación:** `src/components/molecules/MonolithCard.tsx` (líneas 65–74, 120–125).
- **Código Observado:**
  ```tsx
  {/* Scrim gradients */}
  <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-44 bg-gradient-to-b from-ink/85 via-ink/35 to-transparent" />
  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-80 bg-gradient-to-t from-ink via-ink/85 to-transparent" />
  ...
  variant === "carousel"
    ? "h-[580px] w-[85vw] shrink-0 snap-start sm:h-[620px] sm:w-[50vw] md:w-[420px] lg:h-[680px] lg:w-[480px] p-7 lg:p-9"
  ```
- **Incoherencia Identificada:**  
  En un teléfono móvil estándar (375px de ancho):
  - Ancho de tarjeta: 85vw = ~318px.
  - Altura fija de tarjeta: `580px` (relación de aspecto vertical forzada de 1:1.82).
  - Degradado oscuro superior (`h-44`): 176px.
  - Degradado oscuro inferior (`h-80`): 320px.
  - Altura combinada de scrims negros: `176px + 320px = 496px` sobre 580px totales (**85.5% del área vertical**).
  La fotografía de fondo queda prácticamente cegada en pantallas pequeñas, dejando visible apenas una franja central de 84px de imagen clara.
- **Recomendación Técnica:**  
  Reducir la altura de la tarjeta en móvil a `h-[460px] sm:h-[520px] md:h-[580px]` y moderar los degradados a `h-28` superior y `h-48` inferior, permitiendo que la fotografía respire y abarque al menos el 45% del área visible sin sombreado destructivo.

#### Hallazgo S-03: Interacción duplicada: Apertura de modal de contacto sobre formulario idéntico embebido en la página
- **Ubicación:** `src/components/templates/ServicesPageTemplate.tsx` (líneas 53–70), `src/components/organisms/ServiceScopeModal.tsx` (líneas 63–82), `src/components/organisms/ClosingCTA.tsx` (líneas 53, 142–157).
- **Incoherencia Identificada:**  
  En `/servicios`, la plantilla renderiza en el flujo principal:
  1. Catálogo de servicios (`ServicesIndex`)
  2. Formulario completo de contacto (`<ContactForm id="contacto">`)
  3. Sección de cierre (`ClosingCTA`).
  Si el usuario interactúa con la página ocurre una grave interacción redundante:
  - Al pulsar "Consultar alcance" en el modal de un servicio, se cierra este modal y se **dispara el modal flotante `ContactModal`**, el cual contiene exactamente el mismo formulario que ya se encuentra en el cuerpo de la página debajo.
  - Al pulsar "Iniciar consulta" en `ClosingCTA`, en lugar de hacer scroll al formulario `#contacto` ubicado a escasos píxeles, se vuelve a abrir el modal emergente.
- **Recomendación Técnica:**  
  Configurar los botones de `ServiceScopeModal` y `ClosingCTA` en `/servicios` para que ejecuten un scroll suave (`document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })`), prescindiendo de modales superpuestos innecesarios.

#### Hallazgo S-04: Botón HTML manual `<a>` en lugar del componente atómico `<Button>` en modal de servicio
- **Ubicación:** `src/components/organisms/ServiceScopeModal.tsx` (líneas 159–167).
- **Código Observado:**
  ```tsx
  <a
    href={whatsappMessageHref}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex min-h-[48px] items-center justify-center bg-bone-100 px-7 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-bone-200 hover:text-brand-800 border-0 no-underline cursor-pointer"
  >
    <span>Consultar por WhatsApp</span>
  </a>
  ```
- **Incoherencia Identificada:**  
  Infracción directa a `DESIGN.md` §5.1 (*No Hand-Rolled Action Markup*), que prohíbe estilizar enlaces manuales con clases ad-hoc cuando existe el átomo canónico `<Button>`.
- **Recomendación Técnica:**  
  Sustituir la etiqueta manual por:
  ```tsx
  <Button href={whatsappMessageHref} external variant="secondary" size="md">
    Consultar por WhatsApp
  </Button>
  ```

#### Hallazgo S-05: Transición abrupta y saturación de masa oscura entre `ClosingCTA` y `Footer`
- **Ubicación:** `src/components/templates/ServicesPageTemplate.tsx` (línea 69), `src/components/templates/SiteChrome.tsx` (línea 51).
- **Incoherencia Identificada:**  
  `ClosingCTA` (bloque de 140vh con fondo `bg-ink`) termina e inmediatamente conecta con `Footer` (también con `bg-ink`), sumando más de 200vh continuos de masa negra sin descanso visual.
- **Recomendación Técnica:**  
  Introducir una banda intermedia de respiración cromática clara (`tone="bone"` o `tone="canvas"`) o ajustar los tonos del contenedor antes del footer.

---

### 3.5 Página 5: Contacto y Ubicación (`/contacto`)

#### Hallazgo C-01: Contradicción crítica de datos de contacto: correos dispares (@outlook.com vs @arquitecturacasaalta.com) y etiquetas telefónicas divergentes
- **Ubicación:** `src/content/site.ts` (líneas 50–65) frente a `src/content/pages.ts` (líneas 835–861).
- **Incoherencia Identificada:**  
  1. **Discrepancia de Correo Electrónico:**
     - En `site.ts` (se muestra en el Footer de todo el sitio): `constructoracasaalta@outlook.com`.
     - En `pages.ts` (se muestra en la tarjeta de contacto principal de `/contacto`): `contacto@arquitecturacasaalta.com`.
     Un cliente potencial observa dos direcciones de correo completamente distintas en la misma pantalla.
  2. **Discrepancia en Etiquetas Telefónicas:**
     - En `site.ts`: Las líneas se clasifican por **sedes geográficas**:
       - `951 458 1395` -> *"Puerto Escondido"*
       - `951 165 0678` -> *"Salina Cruz"*
     - En `pages.ts`: Los mismos números se clasifican por **responsabilidad técnica**:
       - `951 458 1395` -> *"Dirección de Obra y DRO"*
       - `951 165 0678` -> *"Gabinete de Proyectos y Presupuestos"*
- **Recomendación Técnica:**  
  Unificar la verdad factual en `site.ts` y `pages.ts`:
  - Adoptar como único correo oficial la cuenta corporativa `contacto@arquitecturacasaalta.com`.
  - Homologar las etiquetas integrando sede y función: *"Puerto Escondido · Dirección de Obra y DRO"* y *"Salina Cruz · Gabinete Técnico"*.

#### Hallazgo C-02: Botón redundante "Iniciar consulta" con rebote hacia arriba sobre el formulario recién completado
- **Ubicación:** `src/components/organisms/ContactLocationStage.tsx` (líneas 128–135).
- **Código Observado:**
  ```tsx
  <Button href="#formulario-contacto" variant="outline" size="md" arrow>
    {stageData.consultationCta ?? "Iniciar consulta"}
  </Button>
  ```
- **Incoherencia Identificada:**  
  En `/contacto`, el formulario principal se sitúa en la Sección 2 (`#formulario-contacto`). Cuando el usuario desciende a la Sección 3 (`ContactLocationStage`) para revisar la ubicación geográfica en el mapa, se topa con un botón "Iniciar consulta" cuyo único efecto es provocar un salto de scroll hacia arriba regresándolo al formulario que acaba de dejar atrás.
- **Recomendación Técnica:**  
  Eliminar el botón hacia `#formulario-contacto` de la tarjeta de sedes o reemplazarlo por un enlace directo de llamada telefónica.

#### Hallazgo C-03: Disparo de modal duplicado al presionar CTA del Header estando en la propia página de contacto
- **Ubicación:** `src/components/organisms/SiteNav.tsx` (líneas 102–112, 152–162).
- **Incoherencia Identificada:**  
  El botón CTA del header ejecuta `contactModal?.openContactModal()`. Cuando el usuario se encuentra navegando activamente en la página `/contacto`, al pulsar este botón se despliega una ventana modal sobre el formulario que ya está plenamente visible en la página.
- **Recomendación Técnica:**  
  En `SiteNav.tsx`, detectar si la ruta actual es `/contacto`: de ser así, hacer que el botón haga scroll al inicio del formulario con foco en el primer campo en lugar de desplegar el modal.

#### Hallazgo C-04: Fricción extrema en móvil: 17 botones tipo chip desplazando los campos de entrada a más de 450px bajo el pliegue
- **Ubicación:** `src/components/organisms/ContactFormFields.tsx` (líneas 133–250).
- **Incoherencia Identificada:**  
  El formulario renderiza cuatro grupos de chips de selección previa: Especialidad (5 chips), Ubicación (4 chips), Rango de inversión (4 chips) y Plazo proyectado (4 chips), totalizando **17 botones rectangulares**. En dispositivos móviles, estos chips ocupan más de 450px de altura vertical antes de que el usuario logre divisar el primer campo editable de texto ("Nombre"), provocando fricción cognitiva y abandono prematuro.
- **Recomendación Técnica:**  
  En dispositivos móviles, condensar estos grupos en selectores desplegables compactos o acordeones colapsables, permitiendo que los campos de entrada principales queden visibles en el pliegue inicial.

#### Hallazgo C-05: Ausencia de marcas visuales de obligatoriedad en campos de formulario
- **Ubicación:** `src/components/molecules/FormField.tsx` (líneas 47–51).
- **Incoherencia Identificada:**  
  Aunque los campos tienen la propiedad `required={required}`, las etiquetas visuales no exhiben ningún indicador (como un asterisco `*` o la leyenda de obligatoriedad). En pantallas móviles, esto ocasiona intentos fallidos de envío sin que el usuario comprenda con antelación qué campos son indispensables.
- **Recomendación Técnica:**  
  Añadir un asterisco indicador sutil en la etiqueta cuando `required` sea verdadero:
  ```tsx
  {label} {required && <span className="text-brand-800 ml-0.5">*</span>}
  ```

#### Hallazgo C-06: Captura y secuestro de scroll táctil en el iframe de Google Maps en dispositivos móviles
- **Ubicación:** `src/components/organisms/ContactLocationStage.tsx` (líneas 241–253).
- **Código Observado:**
  ```tsx
  <div className="relative w-full overflow-hidden bg-white/5 aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/10]">
    <iframe src={page.address.embedUrl} ... className="h-full w-full border-0" />
  </div>
  ```
- **Incoherencia Identificada:**  
  El iframe de Google Maps no cuenta con protección contra gestos táctiles. En smartphones, cuando el usuario desliza el pulgar sobre la pantalla para continuar leyendo la página, el gesto es interceptado por el iframe (haciendo zoom o pan en el mapa de Google), atrapando el scroll de la página y frustrando la navegación.
- **Recomendación Técnica:**  
  Aplicar `pointer-events-none md:pointer-events-auto` al iframe en móviles junto con una superposición con botón "Toca para explorar mapa", o apoyarse exclusivamente en el botón existente "Abrir en Google Maps".

#### Hallazgo C-07: Saturación y dilución de conversión: 6 puntos de contacto independientes de WhatsApp en la misma vista
- **Ubicación:** `src/components/templates/ContactPageTemplate.tsx` (toda la ruta).
- **Incoherencia Identificada:**  
  En `/contacto`, el usuario se encuentra con:
  1. Enlace telefónico en UtilityBar (`Header.tsx`)
  2. Botón WhatsApp en el formulario (`ContactFormFields.tsx:321`)
  3. Enlace directo en el banner de error (`ContactFormFields.tsx:358`)
  4. Botón "Escribir por WhatsApp" en `ContactLocationStage.tsx:118`
  5. Botón flotante persistente `WhatsAppFloat.tsx:23`
  6. Enlace en el `Footer.tsx:66`.
  Seis instancias desconectadas compitiendo entre sí generan saturación visual y debilitan el objetivo primario de la página: la captura estructurada de prospectos mediante el formulario.
- **Recomendación Técnica:**  
  Jerarquizar los puntos de contacto: mantener el formulario como canal prioritario y unificar WhatsApp en el botón flotante y un único bloque secundario en la tarjeta de contacto.

---

### 3.6 Página 6: Portafolio de Proyectos (`/proyectos`)

#### Hallazgo P-01: Hero monumental de 100svh desierto con columna derecha vacía e indicadores huérfanos
- **Ubicación:** `src/components/templates/ProjectsIndexTemplate.tsx` (líneas 68–73), `src/components/organisms/PageHero.tsx` (líneas 102–108, 153–200).
- **Código Observado:**
  ```tsx
  // ProjectsIndexTemplate.tsx
  const heroPhotos = projects.map((p) => p.wideCover ?? p.cover);
  <PageHero heading="Proyectos" photos={heroPhotos} />
  ```
- **Incoherencia Identificada:**  
  Se instanció `PageHero` con 14 fotografías pero sin `subheadline` ni `actions`. Debido a que `totalSlides > 1`, `hasRightColumn` se evalúa como `true`. En desktop, la columna derecha queda desierta con 14 guiones milimétricos no interactivos en la esquina inferior. En mobile, se fuerza una pantalla completa de 100svh que oculta el catálogo bajo el pliegue inicial.
- **Recomendación Técnica:**  
  Reducir la altura del hero en páginas de índice a una proporción compacta (`min-h-[45svh]` a `50svh`) o proveer un subheadline editorial que contextualice el portafolio arquitectónico.

#### Hallazgo P-02: Redundancia jerárquica de títulos consecutivos monumentales ("Proyectos" -> "Nuestras obras")
- **Ubicación:** `src/components/templates/ProjectsIndexTemplate.tsx` (línea 70), `src/components/organisms/ProjectsShowcaseCR.tsx` (líneas 92–95).
- **Incoherencia Identificada:**  
  Al hacer scroll desde el hero, el usuario se topa de inmediato con:
  - Título 1 (Hero): `<h1 ...>Proyectos</h1>`
  - Título 2 (`SectionHeading` adyacente): `<p className="eyebrow">Portafolio seleccionado</p>` seguido de `<h2 ...>Nuestras obras</h2>`.
  Dos cabeceras monumentales consecutivas con el mismo significado conceptual.
- **Recomendación Técnica:**  
  Unificar la jerarquía: conservar "Proyectos" en el hero y emplear `Nuestras obras` como encabezado de catálogo sin duplicar kickers de presentación.

#### Hallazgo P-03: Tipografía justificada (`text-justify`) en narrativa de proyectos generando espaciado interpalabra anómalo
- **Ubicación:** `src/components/organisms/ProjectsShowcaseCR.tsx` (líneas 98–102).
- **Código Observado:**
  ```tsx
  <p className="text-base sm:text-lg lg:text-xl text-ink-muted text-justify leading-relaxed">
    {intro.body}
  </p>
  ```
- **Incoherencia Identificada:**  
  El uso de `text-justify` en párrafos descriptivos en mobile genera espacios en blanco desproporcionados e interrumpe el ritmo tipográfico.
- **Recomendación Técnica:**  
  Reemplazar `text-justify` por `text-left` con ancho acotado (`max-w-[62ch]`).

#### Hallazgo P-04: Disparadores de interacción duplicados para abrir el expediente de obra
- **Ubicación:** `src/components/organisms/ProjectsShowcaseCR.tsx` (líneas 109–132 y 190–196).
- **Incoherencia Identificada:**  
  En la tarjeta principal del proyecto activo, tanto la fotografía (`<button onClick={() => onSelectProject(activeProject)}>`) como el botón adyacente (`<Button onClick={() => onSelectProject(activeProject)}>`) disparan idéntica función con etiquetas redundantes ("Ver expediente completo" vs "Ver proyecto").
- **Recomendación Técnica:**  
  Preservar la fotografía como enlace táctil natural y rediseñar el botón secundario hacia una acción concreta (como "Descargar ficha técnica" o consulta directa).

#### Hallazgo P-05: Incoherencia de canal de cotización: Modal interno en catálogo vs WhatsApp externo en expediente
- **Ubicación:** `src/components/organisms/ProjectsShowcaseCR.tsx` (líneas 198–204) frente a `src/components/organisms/ProjectCaseStudyModal.tsx` (líneas 132–140).
- **Incoherencia Identificada:**  
  En la página de catálogo, el botón "Cotizar mi nuevo proyecto" abre el modal de formulario (`ContactModal`), mientras que dentro del expediente detallado del proyecto, el botón equivalente redirige a la aplicación externa de WhatsApp. Esta bifurcación desconcierta al usuario sobre cuál es el canal de cotización oficial de la firma.
- **Recomendación Técnica:**  
  Estandarizar el canal: vincular ambos puntos a WhatsApp con mensaje prellenado que incorpore el nombre del proyecto consultado.

#### Hallazgo P-06: Desbordamiento horizontal de tarjetas miniatura (`w-[360px]`) en pantallas móviles ≤375px
- **Ubicación:** `src/components/organisms/ProjectsShowcaseCR.tsx` (líneas 251–257).
- **Código Observado:**
  ```tsx
  className={cx("snap-start flex-shrink-0 w-[360px] sm:w-[420px] ...")}
  ```
- **Incoherencia Identificada:**  
  La anchura fija `w-[360px]` excede el espacio interior libre en pantallas de 320px a 375px (donde el ancho útil con padding de 48px es de 312px a 327px). La tarjeta desborda el viewport y no permite vislumbrar el borde de la siguiente obra para sugerir el deslizamiento táctil.
- **Recomendación Técnica:**  
  Cambiar la anchura a `w-[82vw] sm:w-[50vw] md:w-[420px]` con sangría para permitir que la siguiente tarjeta asome visualmente (*peek*).

#### Hallazgo P-07: Supresión de filtros de categorización por tipología arquitectónica
- **Ubicación:** `src/components/templates/ProjectsIndexTemplate.tsx` (línea 44), `src/components/organisms/ProjectsShowcaseCR.tsx`.
- **Incoherencia Identificada:**  
  Se eliminaron las pestañas de filtrado por categoría arquitectónica (`Residencial`, `Comercial`, `Obra Civil`). Las 14 obras se presentan en una sola hilera lineal continua, obligando al usuario móvil a un deslizamiento interminable para encontrar proyectos de un rubro particular.
- **Recomendación Técnica:**  
  Restablecer las pestañas de filtro tipológico (*Catalogue Bar*) sobre el selector de proyectos.

#### Hallazgo P-08: Atrapamiento severo de scroll (scroll trap) por mosaico fotográfico de 924px de altura en móvil
- **Ubicación:** `src/components/organisms/ProjectCaseStudyModal.tsx` (líneas 267–274).
- **Código Observado:**
  ```tsx
  photos.length >= 8
    ? "grid-rows-[repeat(3,300px)] sm:grid-rows-[repeat(3,380px)] lg:grid-rows-[repeat(3,460px)] auto-cols-[300px] ..."
    : "grid-rows-[repeat(2,340px)] ..."
  ```
- **Incoherencia Identificada:**  
  En proyectos con 8 o más fotografías, `grid-rows-[repeat(3,300px)]` genera una altura neta de **924px** (3 × 300px + gaps). En dispositivos móviles cuya pantalla mide entre 667px y 844px de alto, este contenedor abarca más del 100% de la altura visible, secuestrando los gestos verticales del usuario en un bucle de desplazamiento horizontal y bloqueando el acceso al pie del expediente.
- **Recomendación Técnica:**  
  En pantallas móviles (`< lg`), reconfigurar el carrusel a una sola fila (`grid-rows-1` de 260px) o una cuadrícula vertical simple, restringiendo las 3 filas exclusivamente a pantallas de escritorio (`lg:`).

#### Hallazgo P-09: Área táctil insuficiente del botón de cierre de expediente en móviles (36×36px) violando WCAG 2.5.5
- **Ubicación:** `src/components/organisms/ProjectCaseStudyModal.tsx` (líneas 105–110).
- **Código Observado:**
  ```tsx
  <span className="inline-flex h-9 w-9 items-center justify-center bg-ink text-canvas transition-colors duration-200 group-hover:bg-brand-800">
    <Icon name="close" className="h-4 w-4" />
  </span>
  ```
- **Incoherencia Identificada:**  
  En mobile (`max-sm:hidden`), el texto se oculta y la caja táctil del botón de cierre mide `h-9 w-9` (**36×36 píxeles**), violando tanto el criterio WCAG 2.2 AA (Criterio 2.5.5) como el contrato de `DESIGN.md` §5.4 que exige un área táctil mínima de 44×44px (`h-11 w-11`).
- **Recomendación Técnica:**  
  Ajustar las dimensiones del contenedor del icono a `h-11 w-11` (44×44px).

---

### 3.7 Página 7: Arquitectura de Interiores (`/arquitectura-interiores`)

#### Hallazgo I-01: Colisión de fondos planos `canvas` sobre `canvas` por omisión del enlace con `ManifestoLine`
- **Ubicación:** `src/components/templates/InteriorsPageTemplate.tsx` (líneas 37–70), `src/lib/content/index.ts` (líneas 431–534), `src/components/templates/ThematicPillarPageTemplate.tsx` (líneas 99, 118–132).
- **Incoherencia Identificada:**  
  El contenido de `manifesto` existe en `src/content/pages.ts:102-106`, pero `getInteriorsPage()` en `lib/content/index.ts` no lo mapea y `InteriorsPageTemplate` no lo transfiere a `ThematicPillarPageTemplate`. Al omitirse la Capa 3 (`ManifestoLine` con fondo `bg-concha-nacar`), la Capa 2 (Especialidades en `tone="canvas"`) queda inmediatamente pegada a la Capa 4 (Galería en `tone="canvas"`), violando la regla estricta de alternancia cromática de `DESIGN.md` §2.2.
- **Recomendación Técnica:**  
  Conectar la propiedad `manifesto` en `getInteriorsPage()` y enviarla a `ThematicPillarPageTemplate` para renderizar la cita editorial con fondo concha-nácar entre ambas secciones.

#### Hallazgo I-02: Oclusión total de entregables técnicos bajo `sr-only` y ausencia de botones de conversión en mobile
- **Ubicación:** `src/components/organisms/SpecialtiesShowcase.tsx` (líneas 252–307 frente a 163–186).
- **Incoherencia Identificada:**  
  En mobile (`< md`), las especificaciones de maderas curadas, cuarzo y mármoles se envuelven en `ul.sr-only`, impidiendo que los visitantes móviles lean las características de los acabados, y se suprime al 100% el botón de consulta técnica por material.
- **Recomendación Técnica:**  
  Renderizar en móvil las 2 viñetas clave de cada material de manera visible e incluir un botón secundario de consulta técnica vía WhatsApp.

#### Hallazgo I-03: Inaccesibilidad de interacción por teclado en la galería de especialidades en desktop
- **Ubicación:** `src/components/organisms/SpecialtiesShowcase.tsx` (líneas 68–81, 198–245).
- **Incoherencia Identificada:**  
  La alternancia de materiales en desktop depende exclusivamente de `onMouseEnter`. Ningún elemento posee `tabIndex={0}` ni listeners para las teclas `Enter` o `Space`, bloqueando la navegación para usuarios de teclado (WCAG 2.1.1).
- **Recomendación Técnica:**  
  Dotar a los selectores de pestañas de naturaleza interactiva con eventos de foco y teclado.

#### Hallazgo I-04: Saturación vertical y recorte de textos superiores en `PageHero` en pantallas móviles reducidas
- **Ubicación:** `src/components/organisms/PageHero.tsx` (líneas 108, 144–199).
- **Incoherencia Identificada:**  
  En `/arquitectura-interiores`, el hero acumula: chrome header (136px), eyebrow largo (59 caracteres), h1 en 4 líneas, subheadline (164 caracteres) y dos botones. Al forzarse a `h-svh overflow-hidden` con `justify-end`, en smartphones pequeños (iPhone SE) el contenido excede la altura y los textos superiores (el eyebrow y la primera línea del h1) sufren recorte físico.
- **Recomendación Técnica:**  
  Sustituir `h-svh overflow-hidden` por `min-h-[100svh] h-auto pb-12` en dispositivos móviles y modular el tamaño del titular mediante funciones clamp CSS (`text-[clamp(1.75rem,5vw,2.75rem)]`).

#### Hallazgo I-05: Textos alternativos (`alt`) genéricos e indistinguibles en galería de interiores
- **Ubicación:** `src/lib/content/index.ts` (líneas 460–477).
- **Código Observado:**
  ```tsx
  const studioInteriors = getProjectPhotos(
    "arquitectura-interiores",
    "Arquitectura de interiores Casa Alta",
  );
  ```
- **Incoherencia Identificada:**  
  Todas las fotografías reciben el texto alternativo genérico e idéntico `"Arquitectura de interiores Casa Alta"`. Al abrir el visor en alta resolución (`PhotoLightboxModal`), se repite la misma etiqueta sin distinguir si la toma corresponde a una cocina de autor, un baño en mármol o carpintería fina.
- **Recomendación Técnica:**  
  Vincular los textos `alt` con los slugs descriptivos y notas archivadas en `images-optimizado/manifest.json`.

---

### 3.8 Página 8: Construcción Sostenible (`/construccion-sostenible`)

#### Hallazgo CS-01: Hero monumental desierto de 100svh sin textos contextuales ni llamadas a la acción
- **Ubicación:** `src/content/pages.ts` (líneas 339–347), `src/components/templates/SustainabilityPageTemplate.tsx` (líneas 32–51).
- **Código Observado:**
  ```typescript
  hero: {
    eyebrow: "",
    heading: "Construcción sustentable\ny arquitectura bioclimática",
    subheadline: "",
    catalogCtaLabel: "",
    consultationCtaLabel: "",
  }
  ```
- **Incoherencia Identificada:**  
  Al estar vacíos el eyebrow, subheadline y CTAs, el hero monumental de 100svh muestra una masa oscura con solo dos líneas de título, sin contexto ni opciones de conversión, dejando la columna derecha completamente estéril en desktop.
- **Recomendación Técnica:**  
  Definir en `sustainabilityPageContent.hero`:
  - `eyebrow`: `"Arquitectura Bioclimática y Sostenibilidad Territorial"`
  - `subheadline`: `"Diseño pasivo integrado a la costa oaxaqueña: confort térmico natural mediante inercia de cal, cubiertas ventiladas de palma y reducción drástica de consumo energético."`
  - `catalogCtaLabel`: `"Conocer pilares bioclimáticos"`
  - `consultationCtaLabel`: `"Consultar viabilidad de terreno"`.

#### Hallazgo CS-02: Colisión cromática de secciones claras por omisión de `ManifestoLine`
- **Ubicación:** `src/content/pages.ts` (líneas 423–428), `src/lib/content/index.ts` (líneas 643–725), `src/components/templates/SustainabilityPageTemplate.tsx` (líneas 40–72).
- **Incoherencia Identificada:**  
  Al igual que en Interiores, el manifiesto existe en `pages.ts` pero no se conecta en `getSustainabilityPage()`, provocando que la sección de Especialidades en `canvas` colisione directamente contra la Galería de Credibilidad en `canvas`, suprimiendo la pausa en tono concha-nácar.
- **Recomendación Técnica:**  
  Conectar `manifesto` en `getSustainabilityPage()` y habilitar el pase a la plantilla.

#### Hallazgo CS-03: Redundancia conceptual casi textual entre Pilares de sostenibilidad y Estrategias técnicas
- **Ubicación:** `src/content/pages.ts` (líneas 352–421 frente a 436–495).
- **Incoherencia Identificada:**  
  Se detectó una duplicación conceptual y léxica directa entre dos secciones adyacentes:
  1. *Pilar 01 ("Ventilación Pasiva"):* "Orientación estratégica hacia los vientos dominantes del Pacífico y chimeneas térmicas que evacuan el calor sin consumo eléctrico".  
     *Estrategia 01:* "Orientamos vanos, dobles alturas y patios interiores según los vientos dominantes del mar para crear un tiro térmico natural que desaloja el aire caliente sin motores eléctricos".
  2. *Pilar 02:* Resume cal apagada, maderas curadas y cubiertas de palma natural.  
     *Estrategias 02, 03 y 04:* Desglosan por separado celosías de barro, pasta de cal apagada y cubiertas de palma.
  En mobile, donde las secciones se suceden en una sola columna vertical, el usuario lee los mismos argumentos repetidos dos veces en pocos segundos.
- **Recomendación Técnica:**  
  Especializar los textos: enfocar `pillars` en la conceptualización bioclimática (orientación solar, brisa cruzada y confort térmico) y enfocar `strategies` en la especificación artesanal y constructiva en obra.

#### Hallazgo CS-04: Proporción fotográfica vertical (4:5) generando un túnel monótono de más de 3,000px de scroll en móvil
- **Ubicación:** `src/components/organisms/WhyCasaAltaEditorial.tsx` (líneas 34, 156–236).
- **Incoherencia Identificada:**  
  Al igual que en `/obra-civil`, la visualización en móvil apila verticalmente 4 fotografías de proporción `4:5` con bloques descriptivos extensos, sumando casi 3,000px de recorrido uniforme y pesado para el usuario.
- **Recomendación Técnica:**  
  Adaptar la presentación móvil a un formato de carrusel deslizable horizontal o lista compacta.

---

## 4. Matriz Consolidada de Hallazgos y Priorización de Remediación

A continuación se presenta la matriz unificada de los 39 hallazgos técnicos documentados en el sitio, clasificados por prioridad de remediación:
- **Prioridad P1 (Crítica / Bloqueante):** Errores de navegación, enlaces rotos, desbordamientos en resoluciones reales (<375px), contradicciones factuales y deficiencias críticas de SEO.
- **Prioridad P2 (Mayor / Usabilidad y Responsive):** Desproporciones visuales severas, omisión de datos en móvil, inaccesibilidad por teclado y violación a contratos de diseño.
- **Prioridad P3 (Menor / Consistencia Editorial y Polish):** Textos huérfanos o redundantes, textos hardcodeados y ajustes cosméticos de espaciado.

| ID | Ruta / Componente | Archivo y Líneas | Categoría | Impacto Mobile vs Desktop | Recomendación Técnica Concreta | Prioridad |
|---|---|---|---|---|---|:---:|
| **G-01** | Global / Header & Logo | `src/components/atoms/Logo.tsx:16-17`<br>`Header.tsx:52`<br>`globals.css:59` | Visual responsive | **Crítico en móvil (<375px)**: Desborda en iPhone SE (déficit de 30px); cabecera fija roba ~140px (>20% del viewport). | Reducir logo en header a `h-9 sm:h-10 md:h-12` y recortar `--chrome-h` a ~72-80px en móvil. | **P1** |
| **G-02** | Global / Nav Alignment | `src/components/organisms/SiteNav.tsx:141` | Visual responsive | Ambos viewports: Desalinea verticalmente los controles con un parche manual `translate-y-[10px]`. | Suprimir `translate-y-[10px]` y alinear mediante `items-center` nativo. | **P2** |
| **G-03** | Global / Drawer Móvil | `src/components/organisms/SiteNav.tsx:81, 102-112, 159` | Interacción duplicada / A11y | **Exclusivo en móvil**: Dos botones "Cotizar proyecto" visibles a la vez; falta focus trap. | Ocultar CTA del header con menú abierto; añadir `role="dialog"`, `aria-modal="true"` y focus trap. | **P2** |
| **G-04** | Global / WhatsAppFloat | `src/components/organisms/WhatsAppFloat.tsx:23` | Visual responsive | **Exclusivo en móvil iOS**: Solapa el Home Indicator por falta de safe-area-inset. | Aplicar `bottom-[max(1.25rem,env(safe-area-inset-bottom))]`. | **P2** |
| **G-05** | Global / ClosingCTA & Footer | `ClosingCTA.tsx:85-86`<br>`Footer.tsx:18-35` | Visual responsive | Ambos viewports: Dos bloques oscuros consecutivos sumando >200vh de masa negra; 140vh vacío en móvil. | Ajustar `ClosingCTA` en móvil a `min-h-[85vh]` e insertar pausa tonal clara antes del Footer. | **P2** |
| **G-06** | Global / Navegación | `src/content/site.ts:33-41` | Incoherencia funcional | Ambos viewports: `/arquitectura-interiores` está omitida del menú principal y drawer móvil. | Incluir `{ label: "Interiores", href: "/arquitectura-interiores" }` en `site.nav`. | **P2** |
| **L-01** | `/` (Inicio) / Recorrido Virtual | `VirtualTourSection.tsx:70-79, 132-143` | Interacción duplicada | **Exclusivo en móvil**: Dos botones idénticos ("Conoce nuestros servicios") antes y después del video. | Añadir `hidden md:inline-flex` en botón de cabecera o remover el contenedor inferior `md:hidden`. | **P1** |
| **L-02** | `/` (Inicio) / Metodología | `ProcessEntry.tsx:104-109` | Redundancia de contenido | **Exclusivo en móvil/tablet**: Muestra `[ 01 ]` pegado a `Etapa 01 de 07`. | Simplificar indicador a `{marker} / {total} · Etapa de obra` eliminando la duplicación del número. | **P3** |
| **L-03** | `/` (Inicio) / Tipografía | `globals.css:92-95`<br>`IntroSection.tsx:67` | Visual responsive | **Crítico en móvil**: Ríos de espacio blanco y espaciado irregular por justificación forzada. | Cambiar a `p { text-align: left; }` globalmente y reservar `text-justify` para pantallas `lg:` en editorial. | **P2** |
| **L-04** | `/` (Inicio) / Content Seam | `TerritoryShowcase.tsx:35, 59, 65, 77`<br>`ClosingCTA.tsx:116, 155` | Contrato de contenido | Ambos viewports: Textos codificados a mano en componentes violando `DESIGN.md` §7.2. | Migrar textos literales a `src/content/home.ts` y pasarlos por props. | **P3** |
| **L-05** | `/` (Inicio) / StatsBand | `StatsBand.tsx:13, 25`<br>`StatItem.tsx:25` | Visual responsive | Móvil: Relleno asimétrico (`pl-6` solo en col 2). Tipografía usa `font-serif` genérica en vez de Marcellus. | Reemplazar `ruleClass` por `gap-x-6 gap-y-6`. En `StatItem.tsx` usar `font-display` o `voice="serif"`. | **P3** |
| **N-01** | `/nosotros` / Metodología | `MethodologyZigzag.tsx:72-96`<br>`pages.ts:556-594` | Redundancia de contenido | Ambos viewports: Fase 1 duplica "cálculo estructural"; Fase 3 duplica "póliza de garantía por escrito". | En Fase 1 cambiar kicker a `Ingeniería sismorresistente`; en Fase 3 cambiar entregable a `Póliza de vicios ocultos`. | **P2** |
| **N-02** | `/nosotros` / Metodología | `process.ts` vs `pages.ts:556` | Disonancia conceptual | Ambos viewports: 7 etapas en Inicio vs 3 fases en Nosotros sin distinción explicativa. | Titular como `Fases de Ejecución en Obra` e incluir nota aclaratoria sobre su relación con las etapas previas. | **P2** |
| **N-03** | `/nosotros` / Fotografía | `AboutPageTemplate.tsx:63, 69`<br>`pages.ts:505, 564, 577` | Redundancia de contenido | Ambos viewports: La foto `06-armado-acero...` se repite 3 veces en la misma página. | Asignar foto de gabinete/estudio a `EditorialSplitSection`, reservando armados para la galería técnica. | **P3** |
| **N-04** | `/nosotros` / Hero y Stats | `pages.ts:503`<br>`AboutPageTemplate.tsx:55` | Redundancia de contenido | Ambos viewports: Subheadline repite literalmente "150 obras y 50,000 m²" que se muestran abajo. | Redactar subheadline filosófico/territorial y reservar cifras para las tarjetas de `StatsBand`. | **P3** |
| **N-05** | `/nosotros` / Identidad | `pages.ts:514-550`<br>`AboutPageTemplate.tsx` | Contenido huérfano | Ambos viewports: Misión, Filosofía y 3 Pilares existen en datos pero nunca se renderizan. | Integrar Misión/Visión en `EditorialSplitSection` o incorporar cuadrícula de pilares de credibilidad. | **P2** |
| **N-06** | `/nosotros` / Hero Eyebrow | `pages.ts:501` | Incoherencia de maquetación | Ambos viewports: Eyebrow vacío (`""`) produce asimetría con el resto del sitio. | Asignar `eyebrow: "Estudio de arquitectura e ingeniería civil"` en `pages.ts`. | **P3** |
| **OC-01** | `/obra-civil` / Hero & SEO | `pages.ts:178-187`<br>`page.tsx:15, 21, 57` | Incoherencia / SEO crítico | Desktop: Hero desierto con col derecha vacía. Móvil: 100svh sin CTA. **Crítico: Meta description y Schema vacíos**. | Redactar eyebrow, subheadline y CTAs ("Ver especialidades" y "Cotizar obra civil") en `pages.ts`. | **P1** |
| **OC-02** | `/obra-civil` / Ancla Rota | `ThematicPillarPageTemplate.tsx:111`<br>`SpecialtiesShowcase.tsx:37, 181` | Enlace roto | Desktop: Clic en "Solicitar cotización técnica" no hace nada (ancla `#contacto` inexistente en DOM). | Asignar `id="contacto"` a `<ClosingCTA>` o vincular el botón directamente a WhatsApp. | **P1** |
| **OC-03** | `/obra-civil` / Accesibilidad | `SpecialtiesShowcase.tsx:193-245` | Accesibilidad (WCAG 2.1.1) | Desktop: Pestañas son `div` sin teclado ni foco; solo responden a `onMouseEnter`. | Convertir a `<button type="button" role="tab">` con gestión de foco y flechas del teclado. | **P2** |
| **OC-04** | `/obra-civil` / Mobile Content | `SpecialtiesShowcase.tsx:252-307` | Incoherencia mobile | **Exclusivo en móvil**: Oculta entregables técnicos (`sr-only`) y suprime el 100% de los botones CTA. | Mostrar entregables compactos visibles y reincorporar botón secundario de cotización en mobile. | **P2** |
| **OC-05** | `/obra-civil` / Fotos repetidas | `pages.ts:259, 266, 306, 332` | Redundancia de contenido | Ambos viewports: Fotos `04-izado...` y `01-grua...` repetidas en dos secciones de la página. | Asignar identificadores fotográficos únicos de la carpeta `01-obra-civil` a cada sección. | **P3** |
| **OC-06** | `/obra-civil` / Respaldo Técnico | `WhyCasaAltaEditorial.tsx:156-235` | Visual responsive | **Exclusivo en móvil**: Scroll vertical de >3,600px monótono con 4 fotos verticales gigantes. | Adaptar a carrusel deslizable horizontal o acordeón técnico colapsable en pantallas móviles. | **P2** |
| **S-01** | `/servicios` / Catalogue Bar | `ServicesIndex.tsx:108-145`<br>`DESIGN.md:98-108` | Contrato de diseño | Ambos viewports: Usa `<select>` con borde rectangular violando el contrato de Catalogue Bar (tabs sin bordes). | Reemplazar `<select>` por la barra de pestañas canónica de `DESIGN.md` §5.2 (`role="tablist"`). | **P2** |
| **S-02** | `/servicios` / MonolithCard | `MonolithCard.tsx:65-74, 120-125` | Visual responsive / Proporción | **Exclusivo en móvil**: Altura fija de 580px y 85.5% oscurecido por degradados (franja visible de solo 84px). | Reducir a `h-[460px]` en móvil y moderar degradados a `h-28` y `h-48` para visibilizar la imagen. | **P2** |
| **S-03** | `/servicios` / Modal Duplicado | `ServiceScopeModal.tsx:63-82`<br>`ClosingCTA.tsx:53, 142` | Interacción duplicada | Ambos viewports: Dispara modal de contacto sobre una página que ya tiene el formulario en el cuerpo. | Hacer scroll suave (`#contacto`) en lugar de abrir un modal emergente redundante. | **P1** |
| **S-04** | `/servicios` / Botón Modal | `ServiceScopeModal.tsx:159-167`<br>`DESIGN.md:95-97` | Contrato de componentes | Ambos viewports: Usa enlace manual `<a>` con clases ad-hoc en vez del átomo `<Button>`. | Sustituir por `<Button href={...} external variant="secondary">`. | **P3** |
| **S-05** | `/servicios` / Cierre & Footer | `ServicesPageTemplate.tsx:69`<br>`SiteChrome.tsx:51` | Visual responsive | Ambos viewports: Colisión de dos bloques oscuros continuos de más de 200vh (`ClosingCTA` + `Footer`). | Intercalar franja clara de respiración o moderar la transición antes del pie de página. | **P2** |
| **C-01** | `/contacto` / Datos de Contacto | `site.ts:50-66`<br>`pages.ts:835-861` | Incoherencia factual | Ambos viewports: Correo @outlook en Footer vs @arquitecturacasaalta en página; etiquetas telefónicas divergentes. | Homologar a `contacto@arquitecturacasaalta.com` y unificar etiquetas integrando sede y rol técnico. | **P1** |
| **C-02** | `/contacto` / Botón Rebote | `ContactLocationStage.tsx:128-135` | Interacción redundante | Ambos viewports: Botón "Iniciar consulta" hace scroll hacia arriba sobre el formulario recién superado. | Suprimir el botón o sustituirlo por enlace directo de llamada telefónica. | **P2** |
| **C-03** | `/contacto` / CTA del Header | `SiteNav.tsx:102-112, 152-162` | Interacción duplicada | Ambos viewports: Botón del header abre modal emergente estando ya en la página del formulario. | En `/contacto`, hacer scroll al primer input del formulario en vez de abrir el modal. | **P1** |
| **C-04** | `/contacto` / Fricción Chips | `ContactFormFields.tsx:133-250` | Visual responsive / UX | **Exclusivo en móvil**: 17 chips en 4 filas desplazan los inputs más de 450px bajo el pliegue inicial. | Condensar en selectores compactos o acordeones plegables para priorizar los campos de texto. | **P2** |
| **C-05** | `/contacto` / Campos Required | `FormField.tsx:47-51` | Usabilidad móvil | **Exclusivo en móvil**: Errores al enviar por falta de indicadores visuales de obligatoriedad (`*`). | Añadir asterisco sutil `<span className="text-brand-800">*</span>` en campos con `required`. | **P2** |
| **C-06** | `/contacto` / Captura de Scroll | `ContactLocationStage.tsx:241-253` | Interacción táctil móvil | **Exclusivo en móvil**: Iframe de Google Maps secuestra el scroll táctil atrapando al usuario. | Aplicar `pointer-events-none md:pointer-events-auto` y botón explícito para interactuar con el mapa. | **P1** |
| **C-07** | `/contacto` / Saturación WhatsApp | `ContactPageTemplate.tsx` | Redundancia de canales | Ambos viewports: 6 puntos de contacto independientes hacia WhatsApp compitiendo con el formulario. | Jerarquizar canales: priorizar el formulario y unificar WhatsApp en el botón flotante y un único bloque secundario. | **P2** |
| **P-01** | `/proyectos` / Hero Desierto | `ProjectsIndexTemplate.tsx:68-73`<br>`PageHero.tsx:102-108` | Visual responsive | Desktop: Columna derecha vacía con ticks aislados. Móvil: 100svh estéril retrasando el catálogo. | Reducir altura del hero a formato compacto (`min-h-[45svh]`) y redactar subheadline contextual. | **P2** |
| **P-02** | `/proyectos` / Títulos Redundantes | `ProjectsIndexTemplate.tsx:70`<br>`ProjectsShowcaseCR.tsx:92-95` | Redundancia de contenido | Ambos viewports: Dos cabeceras consecutivas masivas ("Proyectos" -> "Nuestras obras"). | Unificar jerarquía: "Proyectos" en el hero y usar "Nuestras obras" como encabezado de catálogo. | **P3** |
| **P-03** | `/proyectos` / Tipografía | `ProjectsShowcaseCR.tsx:99` | Visual responsive | Móvil: Ríos de espacio blanco y espaciado irregular por uso de `text-justify`. | Cambiar a `text-left` con `max-w-[62ch]`. | **P2** |
| **P-04** | `/proyectos` / Disparadores Tarjeta | `ProjectsShowcaseCR.tsx:109-132, 190-196` | Interacción duplicada | Ambos viewports: La foto y el botón disparan exactamente la misma acción `onSelectProject`. | Mantener la foto como trigger y orientar el botón a ficha técnica o consulta directa. | **P2** |
| **P-05** | `/proyectos` / Cotización | `ProjectsShowcaseCR.tsx:200`<br>`ProjectCaseStudyModal.tsx:132-140` | Incoherencia de flujo | Ambos viewports: En catálogo abre modal de formulario; dentro del expediente abre WhatsApp externo. | Homologar flujo: enlazar ambos botones a WhatsApp prellenado con el nombre de la obra consultada. | **P2** |
| **P-06** | `/proyectos` / Miniaturas | `ProjectsShowcaseCR.tsx:252` | Visual responsive | **Exclusivo en móvil (≤375px)**: `w-[360px]` desborda el viewport y no permite vislumbrar la siguiente tarjeta. | Cambiar a `w-[82vw] sm:w-[50vw] md:w-[420px]` con sangría para inducir el scroll táctil (*peek*). | **P1** |
| **P-07** | `/proyectos` / Filtros | `ProjectsIndexTemplate.tsx:44` | Incoherencia funcional | **Exclusivo en móvil**: 14 obras en fila horizontal fuerzan desplazamiento interminable. | Reincorporar pestañas de filtro tipológico (*Catalogue Bar*) por rubro (Residencial, Comercial, Obra Civil). | **P2** |
| **P-08** | `/proyectos` / Scroll Trap Modal | `ProjectCaseStudyModal.tsx:269-272` | Visual responsive / UX crítica | **Exclusivo en móvil**: Mosaico de 3 filas mide 924px de alto, atrapando el scroll vertical del teléfono. | Reducir en mobile (`< lg`) a 1 sola fila (`grid-rows-1` de 260px) o rejilla vertical de 2 columnas. | **P1** |
| **P-09** | `/proyectos` / Cierre Modal | `ProjectCaseStudyModal.tsx:107-110` | Accesibilidad (WCAG 2.5.5) | **Exclusivo en móvil**: Icono de cierre mide 36×36px (`h-9 w-9`), por debajo del mínimo de 44px. | Actualizar contenedor a `h-11 w-11` (44×44px) cumpliendo con `DESIGN.md` §5.4. | **P2** |
| **I-01** | `/arquitectura-interiores` / Manifesto | `ThematicPillarPageTemplate.tsx:99, 118-132`<br>`lib/content/index.ts:510-534` | Contrato de diseño | Ambos viewports: Omisión de `ManifestoLine` provoca colisión de dos fondos blancos `canvas` consecutivos. | Conectar `manifesto` en `getInteriorsPage()` para renderizar la cita con fondo concha-nácar. | **P2** |
| **I-02** | `/arquitectura-interiores` / Mobile Specs | `SpecialtiesShowcase.tsx:252-307` | Incoherencia mobile | **Exclusivo en móvil**: Entregables técnicos ocultos en `sr-only` y omisión del 100% de botones CTA. | Mostrar especificaciones técnicas compactas y añadir botón secundario de cotización por material. | **P2** |
| **I-03** | `/arquitectura-interiores` / Teclado | `SpecialtiesShowcase.tsx:68-81, 198-245` | Accesibilidad (WCAG 2.1.1) | Desktop: Interacción depende de `onMouseEnter`; usuarios de teclado no pueden operar las pestañas. | Dotar a los selectores de naturaleza interactiva con soporte de teclado y foco accesible. | **P2** |
| **I-04** | `/arquitectura-interiores` / Hero | `PageHero.tsx:108, 144-199` | Visual responsive | **Exclusivo en móvil**: Exceso de texto en `h-svh overflow-hidden` provoca recorte del eyebrow y título en iPhone SE. | Usar `min-h-[100svh] h-auto` en móvil y ajustar tamaño del titular con clamp CSS. | **P2** |
| **I-05** | `/arquitectura-interiores` / Alt Text | `lib/content/index.ts:460-477` | Accesibilidad / SEO | Ambos viewports: Todas las fotos reciben descripciones `alt` genéricas e idénticas. | Asignar descripciones periciales diferenciadas a cada imagen a partir de `manifest.json`. | **P3** |
| **CS-01** | `/construccion-sostenible` / Hero | `pages.ts:339-347`<br>`SustainabilityPageTemplate.tsx:32-51` | Incoherencia de contenido | Desktop: Hero desierto con columna derecha vacía. Móvil: 100svh oscuro sin contexto ni CTAs. | Redactar eyebrow, subheadline y botones de acción en `sustainabilityPageContent.hero`. | **P1** |
| **CS-02** | `/construccion-sostenible` / Manifesto | `pages.ts:423-428`<br>`lib/content/index.ts:643-725` | Contrato de diseño | Ambos viewports: Omisión de `ManifestoLine` provoca colisión de dos secciones `canvas` continuas. | Conectar `manifesto` en `getSustainabilityPage()` y habilitar el pase a la plantilla. | **P2** |
| **CS-03** | `/construccion-sostenible` / Contenido | `pages.ts:352-421` vs `442-495` | Redundancia de contenido | **Crítico en móvil**: Pilares y Estrategias repiten textualmente los mismos conceptos de ventilación y cal. | Especializar `pillars` para principios bioclimáticos y `strategies` para ejecución técnica en obra. | **P2** |
| **CS-04** | `/construccion-sostenible` / Respaldo | `WhyCasaAltaEditorial.tsx:34, 156-236` | Visual responsive | **Exclusivo en móvil**: Túnel de scroll monótono de casi 3,000px con 4 fotos verticales 4:5. | Adaptar a carrusel deslizable horizontal o acordeón técnico en pantallas móviles. | **P2** |

---

## 5. Protocolo de Verificación e Integridad

### 5.1 Verificación de Preservación del Código Fuente
En cumplimiento irrestricto de las directrices de integridad de la auditoría:
- **Ningún archivo en `src/`, `public/` o `tools/` ha sido modificado, renombrado o eliminado.**
- Comprobación mediante `git status --short`:
  ```bash
  $ git status --short
  # (Salida 100% limpia: ningún archivo fuente modificado)
  ```
- Comprobación de compilación del proyecto con TypeScript:
  ```bash
  $ pnpm tsc --noEmit
  # (Salida con código de salida 0: el árbol de tipos original se mantiene intacto)
  ```

### 5.2 Procedimiento de Reproducción Independiente de Hallazgos
Para verificar de manera autónoma las observaciones reportadas:
1. **Comprobación de Rutas y Líneas:**  
   Utilizar cualquier visor de archivos para inspeccionar las líneas exactas señaladas en la matriz en `src/components/`, `src/content/` y `src/app/`.
2. **Inspección en Navegador y Emulación Responsive:**  
   - Ejecutar el servidor local: `pnpm dev`.
   - Cargar las rutas en Chrome DevTools / Safari Web Inspector configurando las siguientes dimensiones:
     - **375×667 (iPhone SE):** Observar en la cabecera fija que la suma de anchos (logo de 72px + CTA + hamburguesa = 357px) excede los 327px útiles del contenedor, y comprobar en `/` que en `#recorrido-virtual` existen dos botones "Conoce nuestros servicios" arriba y abajo del video.
     - **390×844 (iPhone 14/15) en `/proyectos`:** Abrir el modal de un proyecto con ≥8 fotografías y constatar que el mosaico mide 924px de alto, produciendo bloqueo del scroll vertical de la página.
     - **390×844 en `/contacto`:** Observar los 17 botones tipo chip desplazando los campos de texto más de 450px bajo el pliegue inicial, y verificar que en el Footer figura `constructoracasaalta@outlook.com` mientras en la página figura `contacto@arquitecturacasaalta.com`.
     - **1440×900 (Desktop) en `/obra-civil`:** Comprobar que el hero no tiene subtítulo ni botones dejando la columna derecha vacía, y hacer clic en "Solicitar cotización técnica" en especialidades para comprobar que el ancla `#contacto` no existe en el DOM.
3. **Condición de Falsabilidad / Invalidación:**  
   Este reporte solo se considerará superado cuando el equipo de ingeniería implemente las correcciones descritas en una fase posterior de desarrollo y se verifiquen mediante pruebas de regresión visual y funcional.
