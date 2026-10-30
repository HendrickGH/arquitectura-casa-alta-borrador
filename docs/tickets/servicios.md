# Épica: Página de Servicios

Catálogo integral de servicios de arquitectura y constructora, sección cocinas/interiores, Skate Parks e ingeniería.

> **Índice general**: Volver a [tickets.md](./tickets.md) | **Insumos del cliente**: [entregables-cliente.md](./entregables-cliente.md)

**Métricas de la épica**: Total tickets: **8** | Pendientes/Bloqueados: **2** | Resueltos/Descartados: **6**

---

## Tareas Activas y Bloqueadas

<a id="cas-032"></a>
- [ ] **`CAS-032` Reemplazar imagen de "Skate Parks" y actualizar textos/imágenes de Servicios según envíe el cliente**
  - **Estado**: ⚠️ `Bloqueado / Esperando Cliente` | **Prioridad**: 🟡 Media | **Tipo**: Galería / Multimedia
  - **Responsable**: Hendrick Galarza | **Fecha / Sprint**: Lunes/Martes (Pre-Lanzamiento 7 Nov)
  - **Descripción y Criterios de Aceptación**: Cambiar la fotografía actual del servicio de "Skate Parks" (y de instalaciones hidrosanitarias/otros si el cliente las incluye) y actualizar los textos descriptivos de cada servicio cuando Gerardo envíe el documento definitivo.
  - **Dependencias / Bloqueos**: Esperando foto de Skate Parks y textos de Gerardo (CAS-033)
  - **Referencia**: [Llamada 1 (20:45 - 21:15, 56:28 - 56:45, 1:02:15 - 1:02:55)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

<a id="cas-033"></a>
- [ ] **`CAS-033` Enviar nueva foto de "Skate Parks" y documento con lista y textos definitivos de Servicios**
  - **Estado**: ⚠️ `Bloqueado / Esperando Cliente` | **Prioridad**: 🟠 Alta | **Tipo**: Entregable de Cliente
  - **Responsable**: Gerardo Bejarano / Felipe (Arqui) | **Fecha / Sprint**: Antes del Lunes/Martes
  - **Descripción y Criterios de Aceptación**: Gerardo debe enviar a Hendrick una fotografía real/atractiva para el servicio de Skate Parks y el documento con la definición y textos revisados de los servicios de la constructora.
  - **Dependencias / Bloqueos**: Ninguna
  - **Referencia**: [Llamada 1 (20:45 - 21:15, 37:44 - 38:04, 1:02:32 - 1:02:45)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

---

## Descartados, Aprobados y Resueltos

<a id="cas-026"></a>
- [x] **`CAS-026` Actualizar Hero de Servicios: carrusel con fotos de obra civil/ingeniería, quitar párrafo superpuesto y achicar título**
  - **Estado**: `Resuelto` | **Prioridad**: 🟠 Alta | **Tipo**: Galería / Multimedia
  - **Resolución**: Configurado el carrusel superior con 5 fotografías de obra civil y maniobras con grúas, eliminado el párrafo de texto superpuesto sobre la imagen y ajustado el tamaño tipográfico del título para despejar la visualización de la fotografía.

<a id="cas-027"></a>
- [x] **`CAS-027` Eliminar sección de texto introductorio ("Frentes de trabajo" y "Elegimos el sistema constructivo por cálculo...")**
  - **Estado**: `Resuelto` | **Prioridad**: 🟠 Alta | **Tipo**: Contenido / Copy
  - **Resolución**: Eliminado todo el bloque de texto introductorio (`EditorialSplitSection`) debajo del Hero para pasar de forma inmediata y directa al catálogo de servicios.

<a id="cas-028"></a>
- [x] **`CAS-028` Cambiar el título "Nuestras divisiones en ejecución real" por "Nuestros servicios" y homologar secciones**
  - **Estado**: `Resuelto` | **Prioridad**: 🟠 Alta | **Tipo**: Contenido / Copy
  - **Resolución**: Se retiró la sección independiente de divisiones en ejecución real y la sección de 3 pilares, homologando todo el contenido en el catálogo principal con el eyebrow "Nuestros servicios" y título "Alcances por etapa de proyecto y construcción".

<a id="cas-029"></a>
- [x] **`CAS-029` Consolidar todos los servicios en una sola vista/lista unificada con filtro select ambientado**
  - **Estado**: `Resuelto` | **Prioridad**: 🔴 Crítica | **Tipo**: Estructura / UX
  - **Resolución**: Integradas todas las especialidades técnicas (incluyendo remodelación, obra civil pesada, arquitectura de interiores, skate parks y naves industriales) en una cuadrícula monográfica unificada de 14 partidas. Se sustituyó el menú horizontal ambiguo por un control `<select>` con estética Casa Alta (geometría 0px, tipografía Montserrat), con "Todos nuestros servicios" como opción predeterminada y filtrado dinámico por interés.

<a id="cas-030"></a>
- [x] **`CAS-030` Renombrar "Proyecto y diseño" a "Arquitectura y desarrollo" y "Proyectos eco-sustentables" a "Proyectos sostenibles"**
  - **Estado**: `Resuelto` | **Prioridad**: 🟡 Media | **Tipo**: Contenido / Copy
  - **Resolución**: Renombrados los títulos y slugs tanto en el catálogo de servicios como en las referencias editoriales asociadas.

<a id="cas-031"></a>
- [x] **`CAS-031` Mantener el módulo de "Arquitectura de Interiores" (con imagen de Cosentino) dentro de Servicios**
  - **Estado**: `Resuelto` | **Prioridad**: 🟠 Alta | **Tipo**: Estructura / UX
  - **Resolución**: Conservada la partida técnica de "Arquitectura de Interiores y Acabados de Alta Gama" con fotografía de cocina en piedra sinterizada, acabados de importación y detalle de entregables en el modal de alcances.

