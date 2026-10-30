# Épica: Página de Inicio (Home)

Hero carrusel con eslogan, sección Quiénes Somos (40px), integración de Charco Seco, arquitectura nativa y métricas.

> **Índice general**: Volver a [tickets.md](./tickets.md) | **Insumos del cliente**: [entregables-cliente.md](./entregables-cliente.md)

**Métricas de la épica**: Total tickets: **14** | Pendientes/Bloqueados: **3** | Resueltos/Descartados: **11**

---

## Tareas Activas y Bloqueadas

<a id="cas-015"></a>
- [ ] **`CAS-015` Revisar y enviar adiciones al texto de "Arquitectura nativa" y frase gancho del video**
  - **Estado**: ⚠️ `Bloqueado / Esperando Cliente` | **Prioridad**: 🟡 Media | **Tipo**: Entregable de Cliente
  - **Responsable**: Gerardo Bejarano / Felipe (Arqui) | **Fecha / Sprint**: Antes del Lunes/Martes
  - **Descripción y Criterios de Aceptación**: Gerardo y Felipe acordaron revisar con calma si añaden algo más al párrafo de "Arquitectura nativa" y definir la frase gancho exacta que encabezará el video del recorrido virtual de Charco Seco en el Inicio.
  - **Dependencias / Bloqueos**: Ninguna
  - **Referencia**: [Llamada 2 (11:18 - 11:35, 24:54 - 28:55)](https://fathom.video/share/NAmhzBmzN9zLafz-R7wPaPxKb_4Fmzus)

<a id="cas-020"></a>
- [ ] **`CAS-020` Reemplazar las imágenes de los 8 pasos de "Cómo trabajamos"**
  - **Estado**: ⚠️ `Bloqueado / Esperando Cliente` | **Prioridad**: 🟠 Alta | **Tipo**: Galería / Multimedia
  - **Responsable**: Hendrick Galarza | **Fecha / Sprint**: Lunes/Martes (Pre-Lanzamiento 7 Nov)
  - **Descripción y Criterios de Aceptación**: Quitar las imágenes actuales (especialmente donde aparece Felipe hablando con una persona) y colocar las nuevas fotografías específicas de oficina, planos (conservar o validar la del plano en "Paquete estándar") y obra en construcción para cada uno de los 8 pasos una vez que Gerardo las envíe.
  - **Dependencias / Bloqueos**: Esperando envío de fotos por paso de Gerardo (CAS-021)
  - **Referencia**: [Llamada 1 (11:50 - 12:08, 16:32 - 17:31, 20:09 - 20:55)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

<a id="cas-021"></a>
- [ ] **`CAS-021` Seleccionar y enviar fotos específicas etiquetadas para cada uno de los 8 pasos de "Cómo trabajamos"**
  - **Estado**: ⚠️ `Bloqueado / Esperando Cliente` | **Prioridad**: 🟠 Alta | **Tipo**: Entregable de Cliente
  - **Responsable**: Gerardo Bejarano | **Fecha / Sprint**: Antes del Lunes/Martes
  - **Descripción y Criterios de Aceptación**: Enviar a Hendrick las imágenes seleccionadas indicando explícitamente a qué paso corresponde cada foto (Paso 1 Primera reunión: foto de oficina; Paso 2 Paquete estándar: plano; Ejecución: obra en construcción, etc.).
  - **Dependencias / Bloqueos**: Ninguna
  - **Referencia**: [Llamada 1 (17:00 - 17:31, 20:09 - 20:55)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

---

## Descartados, Aprobados y Resueltos

<a id="cas-010"></a>
- [x] **`CAS-010` Actualizar texto del Hero / Carrusel principal con "Casa Alta" y eslogan "Arquitectura que perdura"** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Diseño / UI | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se eliminaron los nombres individuales de las obras del carrusel y se implementó "Casa Alta" en tipografía editorial con el eslogan "Arquitectura que perdura" abarcando de la C a la A en `src/components/organisms/Hero.tsx` y `src/content/home.ts`.
  - **Referencia**: [Llamada 1 (46:46 - 48:15)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

<a id="cas-011"></a>
- [x] **`CAS-011` Cambiar título de "¿Quiénes somos?" y ajustar tamaño a 40px** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Contenido / Copy | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se actualizó el título de la sección a "Despacho y estudio de arquitectura" sin la palabra construcción, y se fijó el tamaño de fuente a 40px (`text-[32px] sm:text-[36px] md:text-[40px]`) en `src/components/organisms/IntroSection.tsx` y `src/content/home.ts`.
  - **Referencia**: [Llamada 1 (06:04 - 07:21, 48:25 - 49:49) y Llamada 2 (09:10 - 09:23)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

<a id="cas-012"></a>
- [x] **`CAS-012` Actualizar párrafo descriptivo de "¿Quiénes somos?"** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Contenido / Copy | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se reemplazó el texto por "Somos un despacho y estudio de arquitectura mexicana especializados en construcción, ingeniería y arquitectura de interiores." en `src/content/home.ts` y se aplicó alineación justificada en `src/components/organisms/IntroSection.tsx`.
  - **Referencia**: [Llamada 1 (08:25 - 09:45)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

<a id="cas-013"></a>
- [x] **`CAS-013` Conservar animación y tamaño actual de números de estadísticas en Inicio** — `Aprobado / Sin Cambios`
  - **Prioridad**: 🟢 Baja | **Tipo**: Diseño / UI | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Felipe preguntó si los números de estadísticas tenían movimiento; Hendrick mostró la animación activa y Gerardo/Felipe confirmaron que el tamaño actual es el adecuado.
  - **Referencia**: [Llamada 1 (09:53 - 10:19)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

<a id="cas-014"></a>
- [x] **`CAS-014` Renombrar sección "Obra y territorio" / "El Bicho" a "El nuevo lujo no se ve, se siente" y "Arquitectura nativa"** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Contenido / Copy | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se eliminó el subtítulo "Proyectos seleccionados", se cambió el título de la sección por "El nuevo lujo no se ve, se siente", se renombró el encabezado a "Arquitectura nativa", se justificó el texto descriptivo y se integró el botón CTA "Conoce todos nuestros proyectos" hacia `/proyectos` en `src/components/organisms/TerritoryShowcase.tsx`.
  - **Referencia**: [Llamada 2 (09:25 - 12:20, 17:33 - 18:55)](https://fathom.video/share/NAmhzBmzN9zLafz-R7wPaPxKb_4Fmzus)

<a id="cas-016"></a>
- [x] **`CAS-016` Eliminar la sección de galería "Obra construida / Portafolio seleccionado" de la página de Inicio** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Estructura / UX | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se retiró `FeaturedPortfolio` del Home en `src/components/templates/LandingTemplate.tsx` para no saturar el inicio ni duplicar el portafolio, dejando la navegación a través del botón en la sección de "Arquitectura nativa".
  - **Referencia**: [Llamada 2 (08:00 - 08:35, 12:21 - 12:46, 17:44 - 18:55)](https://fathom.video/share/NAmhzBmzN9zLafz-R7wPaPxKb_4Fmzus)

<a id="cas-017"></a>
- [x] **`CAS-017` Insertar video de recorrido virtual ("Charco Seco") con frase gancho y botón "Conoce nuestros servicios"** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Galería / Multimedia | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se creó el organismo `VirtualTourSection.tsx` ubicado inmediatamente debajo de "Arquitectura nativa" en `LandingTemplate.tsx`, con visor de video panorámico 16:9, poster de Casa Charco Seco, frase gancho y botón CTA "Conoce nuestros servicios" con enlace a `/servicios`.
  - **Referencia**: [Llamada 2 (19:50 - 28:55)](https://fathom.video/share/NAmhzBmzN9zLafz-R7wPaPxKb_4Fmzus)

<a id="cas-018"></a>
- [x] **`CAS-018` Quitar las 3 tarjetas de "Servicios" del Inicio y moverlas a la página de Servicios** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Estructura / UX | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se eliminó `ServicesEditorialShowcase` del Home en `LandingTemplate.tsx` y se trasladó a `ServicesPageTemplate.tsx` y `src/app/servicios/page.tsx` para consolidar el catálogo de servicios en su página dedicada.
  - **Referencia**: [Llamada 2 (12:46 - 14:46, 19:15 - 19:45, 29:12 - 30:12)](https://fathom.video/share/NAmhzBmzN9zLafz-R7wPaPxKb_4Fmzus)

<a id="cas-019"></a>
- [x] **`CAS-019` Rediseñar proporción, tamaño de letra y justificación en "Metodología Casalta / Cómo trabajamos" (8 pasos)** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Diseño / UI | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se amplió la columna de texto de metodología a ~48-50% reduciendo el ancho de imagen a ~50-52%, se aumentó el tamaño de fuente del texto introductorio y de las descripciones, los títulos activos de los pasos se escalaron a tamaño display (`text-4xl`), y se aplicó alineación justificada a todos los textos en `src/components/organisms/ProcessList.tsx` y `src/components/molecules/ProcessEntry.tsx`.
  - **Referencia**: [Llamada 1 (10:20 - 19:57) y Llamada 2 (30:18 - 30:52)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

<a id="cas-022"></a>
- [x] **`CAS-022` Conservar tamaño actual de la frase intermedia antes del cierre de Inicio** — `Aprobado / Sin Cambios`
  - **Prioridad**: 🟢 Baja | **Tipo**: Diseño / UI | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Gerardo y Felipe revisaron en computadora y celular la frase ubicada debajo de "Cómo trabajamos" y confirmaron que se ve bien y se mantiene sin cambios.
  - **Referencia**: [Llamada 1 (21:24 - 21:37)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

<a id="cas-023"></a>
- [x] **`CAS-023` Mejorar contraste del texto blanco y cambiar título en CTA final ("Construir con Casalta es sencillo")** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Diseño / UI | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se oscureció el fondo con capa base `bg-ink/40` y gradiente de alto contraste en `src/components/organisms/ClosingCTA.tsx`, se cambió el título a "La experiencia de construir con Casalta" en `src/content/home.ts` y se garantizó la eliminación de menciones de costo.
  - **Referencia**: [Llamada 1 (21:38 - 22:48, 30:04 - 32:10) y Llamada 4 (02:35 - 02:50)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)


