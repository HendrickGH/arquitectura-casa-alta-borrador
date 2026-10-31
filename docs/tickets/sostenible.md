# Épica: Página Sostenible

Depuración de marcas registradas ajenas, enfoque en arquitectura bioclimática, sistemas pasivos y materiales regionales.

> **Índice general**: Volver a [tickets.md](./tickets.md) | **Insumos del cliente**: [entregables-cliente.md](./entregables-cliente.md)

**Métricas de la épica**: Total tickets: **4** | Pendientes/Bloqueados: **0** | Resueltos/Descartados: **4**

---

## Tareas Activas y Bloqueadas

*No hay tareas pendientes en esta sección. Todos los tickets han sido completados.*

---

## Descartados, Aprobados y Resueltos

<a id="cas-052"></a>
- [x] **`CAS-052` Actualizar Pilar "Materiales" a "Materiales locales y artesanales"** — `Terminado / Resuelto`
  - **Estado**: `Terminado` | **Prioridad**: 🟠 Alta | **Tipo**: Contenido / Copy | **Responsable**: Hendrick Galarza
  - **Puntos y Criterios Verificados**:
    - [x] Reemplazar "Materiales locales y Chucún" por "Materiales locales y artesanales" en la sección de pilares bioclimáticos (tarjetas superiores y desglose inferior).
    - [x] Depurar eyebrow del Hero (`"Arquitectura bioclimática y tropical"`).
    - [x] Depurar subheadline del Hero (`"Optimizamos la carga térmica y acústica..."`).
    - [x] Eliminar botones de llamada a la acción del Hero (`[Explorar pilares bioclimáticos]` y `[Planear proyecto bioclimático]`).
  - **Motivo / Resolución**: Se actualizó el título del pilar en `src/content/pages.ts` (`sustainabilityPageContent.pillars.sections`) a `"Materiales locales y artesanales"`, reflejándose de forma consistente en el escenario expandido superior y en las columnas inferiores de la sección. Se depuraron el eyebrow, subheadline y CTAs del Hero en `sustainabilityPageContent`, `SustainabilityPageTemplate.tsx` y `ThematicPillarPageTemplate.tsx`.
  - **Referencia**: [Llamada 3 (16:40 - 18:28, 20:06 - 20:20)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

<a id="cas-053"></a>
- [x] **`CAS-053` Eliminar la palabra "pericial" en el pilar "Resiliencia sísmica y huracanes"** — `Terminado / Resuelto`
  - **Estado**: `Terminado` | **Prioridad**: 🟠 Alta | **Tipo**: Contenido / Copy | **Responsable**: Hendrick Galarza
  - **Puntos y Criterios Verificados**:
    - [x] Cambiar "Supervisión pericial directa con firma DRO" por "Supervisión directa con firma DRO" en especificaciones técnicas.
    - [x] Conservar el botón hacia WhatsApp ("Consultar viabilidad de terreno").
    - [x] Conservar sin cambios el pilar "Gestión hídrica y captación pluvial".
  - **Motivo / Resolución**: Se modificó la especificación técnica en `src/content/pages.ts` de `"Supervisión pericial directa con firma DRO"` a `"Supervisión directa con firma DRO"`. Se conservó el botón hacia WhatsApp y el pilar de gestión hídrica intacto.
  - **Referencia**: [Llamada 3 (18:29 - 20:06)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

<a id="cas-054"></a>
- [x] **`CAS-054` Actualizar Estrategia 3 ("Masa térmica") a "recubrimientos de tierra" y "pasta de cal y pigmento"** — `Terminado / Resuelto`
  - **Estado**: `Terminado` | **Prioridad**: 🟠 Alta | **Tipo**: Contenido / Copy | **Responsable**: Hendrick Galarza
  - **Puntos y Criterios Verificados**:
    - [x] Conservar sin cambios la Estrategia 1 ("Orientación solar y evacuación convectiva").
    - [x] Conservar sin cambios la Estrategia 2 ("Celosías de barro").
    - [x] Cambiar el título de Estrategia 3 a "Masa térmica de concreto y recubrimientos de tierra" (quitando chucún/chucumbis).
    - [x] Cambiar en su descripción "...revestidos con pasta de cal y pigmento que absorben y expulsan la humedad ambiental sin degradarse."
  - **Motivo / Resolución**: En `src/content/pages.ts` (`sustainabilityPageContent.strategies.items`), se cambió el título de la Estrategia 3 a `"Masa térmica de concreto y recubrimientos de tierra"` y su descripción a `"...revestidos con pasta de cal y pigmento que absorben y expulsan la humedad ambiental sin degradarse."`, manteniendo las Estrategias 1 y 2 intactas.
  - **Referencia**: [Llamada 3 (36:25 - 39:30)](https://fathom.video/share/3-PxDDgHbvo9RbZsgByyicuX2uXPzs68)

<a id="cas-055"></a>
- [x] **`CAS-055` Actualizar Estrategia 4 ("Cubiertas ventiladas"): eliminar "carrizo", "en autoclave al vacío" y "extendida con herrajes marinos"** — `Terminado / Resuelto`
  - **Estado**: `Terminado` | **Prioridad**: 🟠 Alta | **Tipo**: Contenido / Copy | **Responsable**: Hendrick Galarza
  - **Puntos y Criterios Verificados**:
    - [x] Cambiar subtítulo a "Cubiertas ventiladas de palma natural" (removiendo carrizo).
    - [x] Cambiar "Estructuras de madera tropical tratada en autoclave al vacío" a "Estructuras de madera tropical tratada".
    - [x] Cambiar "Mantenimiento programado y vida útil extendida con herrajes marinos" a "Mantenimiento programado y vida útil".
  - **Motivo / Resolución**: En `src/content/pages.ts` (`sustainabilityPageContent.strategies.items`), se ajustó el título de la Estrategia 4 a `"Cubiertas ventiladas de palma natural"` (removiendo carrizo), el punto 1 a `"Estructuras de madera tropical tratada"` (removiendo autoclave al vacío) y el punto 3 a `"Mantenimiento programado y vida útil"` (removiendo extendida con herrajes marinos).
  - **Referencia**: [Llamada 4 (00:46 - 02:35)](https://fathom.video/share/sLxWUiL_hzDkkwwyKGAossLKRjcRYGS2)
