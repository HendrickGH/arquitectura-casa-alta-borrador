# Épica: Página de Proyectos

Portafolio de obras destacadas (El Bicho, Blake, Tarrastro, etc.), filtros por tipología, galerías fotográficas y fichas técnicas.

> **Índice general**: Volver a [tickets.md](./tickets.md) | **Insumos del cliente**: [entregables-cliente.md](./entregables-cliente.md)

**Métricas de la épica**: Total tickets: **16** | Pendientes/Bloqueados: **3** | Resueltos/Descartados: **13**

---

## Tareas Activas y Bloqueadas

<a id="cas-038"></a>
- [ ] **`CAS-038` Redactar y enviar las fichas descriptivas / textos de cada obra del portafolio**
  - **Estado**: ⚠️ `Bloqueado / Esperando Cliente` | **Prioridad**: 🟠 Alta | **Tipo**: Entregable de Cliente
  - **Responsable**: Gerardo Bejarano / Felipe (Arqui) | **Fecha / Sprint**: Antes del Lunes/Martes
  - **Descripción y Criterios de Aceptación**: Gerardo y Felipe acordaron redactar un texto nuevo y específico para la ficha técnica/descripción de cada uno de los proyectos del portafolio y enviarlo a Hendrick.
  - **Dependencias / Bloqueos**: Ninguna
  - **Referencia**: [Llamada 2 (06:28 - 06:43) y Llamada 3 (21:55 - 22:18, 24:00)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

<a id="cas-048"></a>
- [ ] **`CAS-048` Subir nuevas fotografías de proyectos con pocas imágenes (Malagua, Tarrastro, Columnas C1/C2, Villas Cabán, Puente Ciudad Administrativa, Pavimentación)**
  - **Estado**: ⚠️ `Bloqueado / Esperando Cliente` | **Prioridad**: 🟡 Media | **Tipo**: Galería / Multimedia
  - **Responsable**: Hendrick Galarza | **Fecha / Sprint**: Lunes/Martes (Pre-Lanzamiento 7 Nov)
  - **Descripción y Criterios de Aceptación**: Integrar en cada galería las fotos de alta resolución una vez que Gerardo envíe el enlace de WeTransfer con el material fotográfico faltante. (Si se incluyen videos en algún proyecto, verificar que tengan la misma proporción que las fotos).
  - **Dependencias / Bloqueos**: Esperando WeTransfer de Gerardo (CAS-049)
  - **Referencia**: [Llamada 3 (28:02 - 28:55, 32:14 - 33:20, 34:47 - 35:20)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

<a id="cas-049"></a>
- [ ] **`CAS-049` Enviar por WeTransfer fotos faltantes de proyectos (El Bicho, Malagua, Tarrastro, Columnas C1/C2, Villas Cabán, Puente Ciudad Administrativa, Pavimentación)**
  - **Estado**: ⚠️ `Bloqueado / Esperando Cliente` | **Prioridad**: 🟠 Alta | **Tipo**: Entregable de Cliente
  - **Responsable**: Gerardo Bejarano | **Fecha / Sprint**: Antes del Lunes/Martes
  - **Descripción y Criterios de Aceptación**: Recopilar y enviar a Hendrick vía WeTransfer las fotos adicionales de: El Bicho, Malagua (solo tiene 6), Tarrastro (solo tiene 10), Columnas C1/C2, Villas Cabán, Puente Ciudad Administrativa (solo tiene 2) y Pavimentación (solo tiene 1).
  - **Dependencias / Bloqueos**: Ninguna
  - **Referencia**: [Llamada 3 (26:15, 28:02 - 28:55, 32:14 - 33:20, 35:14)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

---

## Descartados, Aprobados y Resueltos

<a id="cas-034"></a>
- [x] **`CAS-034` Configurar carrusel superior de Proyectos con las fotos de portada de todas las obras** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Galería / Multimedia | **Responsable**: Hendrick Galarza
  - **Resolución**: Configurado en `ProjectsIndexTemplate.tsx` mediante `PageHero` dinámico recibiendo el array de portadas (`photos={projects.map(p => p.wideCover ?? p.cover)}`). Incluye crossfade automático, contador de diapositivas (`01/15`), líneas segmentadas y controles de flecha 0px.
  - **Referencia**: [Llamada 1 (50:49 - 51:40)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

<a id="cas-035"></a>
- [x] **`CAS-035` Cambiar el título "Obra construida" por "Nuestras obras" y agrandar/justificar textos** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Contenido / Copy | **Responsable**: Hendrick Galarza
  - **Resolución**: Título principal cambiado a "Nuestras obras" en `src/content/home.ts` y en el encabezado del showcase. El texto descriptivo se amplió a escala `text-base sm:text-lg lg:text-xl` con alineación justificada (`text-justify`).
  - **Referencia**: [Llamada 1 (52:17 - 53:55)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

<a id="cas-036"></a>
- [x] **`CAS-036` Rediseñar el portafolio de Proyectos estilo "CR Colectif" y eliminar filtros de categorías** — `Resuelto`
  - **Prioridad**: 🔴 Crítica | **Tipo**: Estructura / UX | **Responsable**: Hendrick Galarza
  - **Resolución**: Eliminados los botones de pestañas superiores (`Tabs`). Implementado el organismo `ProjectsShowcaseCR.tsx`: visor principal interactivo con gran imagen y contador `01/15`, ficha técnica arquitectónica, botón principal "Ver proyecto" (abre `ProjectCaseStudyModal`), botón secundario "Cotizar mi nuevo proyecto" (abre modal de contacto), flechas `<` / `>` y track horizontal deslizable con snap para todas las miniaturas del portafolio.
  - **Referencia**: [Llamada 2 (01:14 - 07:55, 30:55)](https://fathom.video/share/NAmhzBmzN9zLafz-R7wPaPxKb_4Fmzus)

<a id="cas-037"></a>
- [x] **`CAS-037` Ordenar las galerías de todos los proyectos mostrando primero "Obra terminada" y al final "Obra gris"** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Galería / Multimedia | **Responsable**: Hendrick Galarza
  - **Resolución**: Implementada la lógica `isObraGris()` y separación bipartita en `src/lib/content/photos.ts`. Todas las fotos de obra terminada se presentan primero, relegando las fotos de procesos constructivos (colados, cimbra, andamios, armados de varilla) al final de cada galería.
  - **Referencia**: [Llamada 3 (30:51 - 32:12)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

<a id="cas-039"></a>
- [x] **`CAS-039` Proyecto "Plaza Esmeralda": corregir texto a "estructura metálica y losacero", eliminar 1 foto duplicada y mover al 5.º lugar** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Contenido / Copy | **Responsable**: Hendrick Galarza
  - **Resolución**: Texto corregido a "estructura metálica y losacero" en narrativa y especificaciones técnicas. Foto repetida del acceso eliminada conservando la foto del estacionamiento subterráneo. Proyecto ubicado en el 5.º lugar en `portfolioOrder` y `featuredProjectDirs`.
  - **Referencia**: [Llamada 3 (21:12 - 23:39)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

<a id="cas-040"></a>
- [x] **`CAS-040` Proyecto "El Bicho": colocar en 1.er lugar, cambiar portada, limpiar fotos ajenas/baño/repetidas y agregar fotos de alberca** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Galería / Multimedia | **Responsable**: Hendrick Galarza
  - **Resolución**: Posicionado en el 1.er lugar del portafolio general (`portfolioOrder`). Portada cambiada a `02-fachada-palapas-alberca-palmeras`. Eliminada la foto del baño (`05-bano-...`), las fotos repetidas (`08`, `13`, `16`, `21`) y las fotos de bombeo de concreto pertenecientes a Palmarito (`36`, `77`, `78`). Integradas las fotos de alberca terminada y en proceso provenientes de Casa Blake.
  - **Referencia**: [Llamada 3 (23:40 - 27:25)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

<a id="cas-041"></a>
- [x] **`CAS-041` Proyecto "Casa Blake": quitar todas las fotos de la alberca (moverlas a El Bicho)** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Galería / Multimedia | **Responsable**: Hendrick Galarza
  - **Resolución**: Removidas todas las fotos de la alberca (`36` a `39` y `44` a `49`) de la galería de Casa Blake y reasignadas a El Bicho. Se conservaron la portada original (`08-fachada-frontal-dos-plantas`) y las fotos de colado con camión bomba en estructura de dos niveles (`32` a `35`).
  - **Referencia**: [Llamada 3 (26:26 - 27:41)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

<a id="cas-042"></a>
- [x] **`CAS-042` Proyectos aprobados en galería: "El Choro Campo" (14 fotos), "El Tule / La Capilla", "Casa Charco Seco" (23 fotos) y "El Tomatán" (3 fotos)** — `Aprobado / Sin Cambios`
  - **Prioridad**: 🟢 Baja | **Tipo**: Galería / Multimedia | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Durante la revisión de portafolio se validó que las galerías actuales de El Choro Campo (14 fotos), El Tule / La Capilla, Casa Charco Seco (23 fotos y descripción ya integrada) y El Tomatán (3 fotos, únicas existentes) están completas y no requieren fotos adicionales.
  - **Referencia**: [Llamada 3 (27:42 - 28:01, 28:26 - 28:37, 33:21 - 33:43, 34:01 - 34:20)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

<a id="cas-043"></a>
- [x] **`CAS-043` Proyecto "El Palmarito": renombrar a "Departamento Palmarito – Construcción de estructura"** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Contenido / Copy | **Responsable**: Hendrick Galarza
  - **Resolución**: Renombrado a "Departamento Palmarito – Construcción de estructura" con subtítulo y descripción explicativa de que el registro documenta el proceso estructural de concreto y cubiertas de palma. Asignadas las fotos de bombeo de concreto reubicadas de El Bicho.
  - **Referencia**: [Llamada 3 (29:00 - 29:53)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

<a id="cas-044"></a>
- [x] **`CAS-044` Eliminar por completo el proyecto "Santa Rosa"** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Galería / Multimedia | **Responsable**: Hendrick Galarza
  - **Resolución**: Proyecto `09-casa-santa-rosa` eliminado por completo de `curatedGalleries`, `projectContent` y el catálogo de proyectos.
  - **Referencia**: [Llamada 3 (29:58 - 30:25)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

<a id="cas-045"></a>
- [x] **`CAS-045` Proyecto "Zicatela": cambiar foto de portada por la primera imagen** — `Resuelto`
  - **Prioridad**: 🟡 Media | **Tipo**: Galería / Multimedia | **Responsable**: Hendrick Galarza
  - **Resolución**: Fijada como portada la primera imagen `09-fachada-chukum-ventana-circular-barra-concreto`, tal como confirmó Felipe en llamada y ratificó el usuario indicando que el ticket se refiere a Zicatela.
  - **Referencia**: [Llamada 1 (54:09 - 54:55)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

<a id="cas-046"></a>
- [x] **`CAS-046` Eliminar mención/texto de "Cosentino" en el proyecto de consultoría / "La Farm"** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Contenido / Copy | **Responsable**: Hendrick Galarza
  - **Resolución**: Auditadas todas las fichas del catálogo; verificado que ninguna contiene mención o uso de marca de "Cosentino" en sus descripciones o fichas técnicas.
  - **Referencia**: [Llamada 3 (34:21 - 34:46)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

<a id="cas-047"></a>
- [x] **`CAS-047` Buscar e integrar las fotos ya enviadas del proyecto "La Barra" y limpiar duplicadas** — `Resuelto`
  - **Prioridad**: 🟡 Media | **Tipo**: Galería / Multimedia | **Responsable**: Hendrick Galarza
  - **Resolución**: Galería de Casa La Barra depurada y enlazada con las imágenes optimizadas de fachada chukum y portón de madera sin duplicados.
  - **Referencia**: [Llamada 3 (30:26 - 30:50, 33:44 - 34:00)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)


