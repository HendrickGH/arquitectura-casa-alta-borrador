# Épica: Global y Diseño Base

Ajustes globales de diseño, alineación justificada, eliminación de frases de costo y guardas de estilo visual.

> **Índice general**: Volver a [tickets.md](./tickets.md) | **Insumos del cliente**: [entregables-cliente.md](./entregables-cliente.md)

**Métricas de la épica**: Total tickets: **5** | Pendientes/Bloqueados: **0** | Resueltos/Descartados: **5**

---

## Tareas Activas y Bloqueadas

*No hay tareas pendientes en esta sección.*

---

## Descartados, Aprobados y Resueltos

<a id="cas-001"></a>
- [x] **`CAS-001` Justificar todos los textos del sitio web** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Diseño / UI | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se aplicó alineación justificada global a los párrafos de cuerpo en `globals.css` (`p { text-align: justify; text-justify: inter-word; }`), se incorporó `text-justify` en las variantes del átomo `Text.tsx`, salvaguardando la alineación izquierda de `.display`, `.voice`, `.eyebrow` y `.label` en `@layer components`, y preservando `text-center` en encabezados centrados.
  - **Referencia**: [Llamada 1 (07:21 - 08:24, 53:35)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

<a id="cas-002"></a>
- [x] **`CAS-002` Eliminar la frase "sin costo" en todo el sitio web** — `Resuelto`
  - **Prioridad**: 🔴 Crítica | **Tipo**: Contenido / Copy | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se eliminaron todas las ocurrencias de "sin costo", "sin costos ocultos" y "gratuita" en CTAs, botones, tarjetas y formulario en `src/content/home.ts`, `src/content/pages.ts`, `src/components/organisms/ClosingCTA.tsx` y `AUDIT_COMPONENT_REUSE.md`, sustituyéndolas por formulaciones transparentes como "Primera reunión", "finiquito transparente" y "con nuestro equipo técnico".
  - **Referencia**: [Llamada 1 (21:38 - 22:09, 32:40, 33:33)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

<a id="cas-003"></a>
- [x] **`CAS-003` Eliminar la palabra "Chucún" / "Chucumbis" de todo el sitio** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Contenido / Copy | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se depuraron todas las menciones a nivel de textos de interfaz, descripciones de obras, fichas de materialidad y pilares en `src/content/differentiators.ts`, `src/content/home.ts`, `src/content/pages.ts`, `src/content/projects.ts` y `src/content/testimonials.ts`, reemplazándolas por "pastas minerales", "recubrimientos de tierra", "pasta de cal y pigmento" y "materiales locales, naturales de la zona y artesanales", preservando intactas las rutas físicas de imágenes para no romper indexación ni SEO.
  - **Referencia**: [Llamada 3 (16:48, 35:58, 38:23)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

<a id="cas-004"></a>
- [x] **`CAS-004` Verificar comportamiento responsivo del carrusel y menú en ventanas no maximizadas** — `Resuelto / Revisión Preventiva`
  - **Prioridad**: 🟡 Media | **Tipo**: Diseño / UI | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: En la llamada Gerardo veía el carrusel cortado y los servicios a la izquierda porque su ventana de navegador no estaba maximizada (activaba breakpoint de tableta). Aunque se resolvió al maximizar, verificar el diseño responsivo en resoluciones intermedias de laptop/escritorio para que no se corte el carrusel ni se oculte el botón "Iniciar consulta".
  - **Referencia**: [Llamada 1 (01:50 - 04:22, 33:09 - 33:25)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

<a id="cas-005"></a>
- [x] **`CAS-005` Descartar música de fondo al abrir la página web** — `Descartado`
  - **Prioridad**: 🟢 Baja | **Tipo**: Decisión / Descartado | **Responsable**: Felipe (Arqui) / Hendrick Galarza
  - **Motivo / Resolución**: Felipe propuso agregar una canción de fondo al entrar al sitio; tras la advertencia de Hendrick sobre derechos de autor y riesgo de que bajen la página, Felipe decidió descartarlo definitivamente ("No, pues entonces no, déjalo").
  - **Referencia**: [Llamada 1 (05:21 - 05:54)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

