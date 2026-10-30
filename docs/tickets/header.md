# Épica: Menú de Navegación (Header)

Reorganización del menú principal: incorporación de Obra Civil, renombre de Sostenible y eliminación de Interiores/Real Estate.

> **Índice general**: Volver a [tickets.md](./tickets.md) | **Insumos del cliente**: [entregables-cliente.md](./entregables-cliente.md)

**Métricas de la épica**: Total tickets: **4** | Pendientes/Bloqueados: **0** | Resueltos/Descartados: **4**

---

## Tareas Activas y Bloqueadas

*No hay tareas pendientes en esta sección.*

---

## Descartados, Aprobados y Resueltos

<a id="cas-006"></a>
- [x] **`CAS-006` Eliminar la pestaña "Interiores" (Arquitectura de Interiores) del menú superior** — `Resuelto`
  - **Prioridad**: 🔴 Crítica | **Tipo**: Estructura / UX | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se eliminó "Interiores" del arreglo de navegación principal en `src/content/site.ts`. La ruta `/arquitectura-interiores` se preserva para el catálogo de servicios sin protagonismo en el Header principal, mitigando riesgos de marca.
  - **Referencia**: [Llamada 2 (31:40 - 38:10)](https://fathom.video/share/NAmhzBmzN9zLafz-R7wPaPxKb_4Fmzus)

<a id="cas-007"></a>
- [x] **`CAS-007` Agregar nueva pestaña "Obra Civil" en el menú superior** — `Resuelto`
  - **Prioridad**: 🔴 Crítica | **Tipo**: Estructura / UX | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se integró la nueva pestaña "Obra Civil" en el Header apuntando a `/obra-civil`. Se desarrolló la página completa con los mismos componentes de interiores (`ThematicPillarPageTemplate`: PageHero, SpecialtiesShowcase, ManifestoLine, CredibilityGallery, WhyCasaAltaEditorial y ClosingCTA), integrando exclusivamente fotografías 5/5 estrellas de obra civil, puentes, prefabricados y supervisión pericial.
  - **Referencia**: [Llamada 2 (38:08 - 38:28) y Llamada 3 (05:56 - 14:55)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

<a id="cas-008"></a>
- [x] **`CAS-008` Renombrar pestaña "Sustentable" a "Sostenible" y posicionar en menú superior** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Estructura / UX | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se actualizó la etiqueta de navegación en `src/content/site.ts` de "Sustentable" a "Sostenible", manteniendo su enlace canónico en el menú superior junto a Obra Civil.
  - **Referencia**: [Llamada 3 (14:54 - 15:26, 20:40)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

<a id="cas-009"></a>
- [x] **`CAS-009` Descartar pestaña de "Real Estate" (Venta/Preventa de 10 propiedades) en web de Casa Alta** — `Descartado`
  - **Prioridad**: 🟢 Baja | **Tipo**: Decisión / Descartado | **Responsable**: Gerardo Bejarano / Hendrick Galarza
  - **Motivo / Resolución**: Gerardo propuso sustituir Interiores por una pestaña "Real Estate" con mínimo 10 propiedades en venta/preventa (Punta Brasil, Casa Tehuantepec, etc.). Hendrick explicó que mezclar constructora con inmobiliaria penalizaría el SEO en Google y confundiría a los bots de IA, recomendando un dominio/marca aparte. Gerardo y Felipe aceptaron descartar Real Estate de este sitio.
  - **Referencia**: [Llamada 3 (02:09 - 05:56)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

