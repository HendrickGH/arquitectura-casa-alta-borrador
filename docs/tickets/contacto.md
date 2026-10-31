# Épica: Página de Contacto y Formularios

Reingeniería del formulario guiado paso a paso, eliminación de campos de presupuesto intrusivos, WhatsApp y mapa de ubicación.

> **Índice general**: Volver a [tickets.md](./tickets.md) | **Insumos del cliente**: [entregables-cliente.md](./entregables-cliente.md)

**Métricas de la épica**: Total tickets: **4** | Pendientes/Bloqueados: **3** | Resueltos/Descartados: **1**

---

## Tareas Activas y Bloqueadas

<a id="cas-058"></a>
- [ ] **`CAS-058` Actualizar sedes en Contacto a "Puerto Escondido, Salina Cruz y Oaxaca de Juárez, y capacidad de ejecución en todo México"**
  - **Estado**: `Por Hacer` | **Prioridad**: 🟠 Alta | **Tipo**: Contenido / Copy
  - **Responsable**: Hendrick Galarza | **Fecha / Sprint**: Lunes/Martes (Pre-Lanzamiento 7 Nov)
  - **Descripción y Criterios de Aceptación**: En el encabezado de la página de Contacto, actualizar el texto para que mencione explícitamente las 3 sedes: "Gabinete de proyectos y residencia de obra con sedes en Puerto Escondido, Salina Cruz y Oaxaca de Juárez, y capacidad de ejecución en todo México".
  - **Dependencias / Bloqueos**: Ninguna
  - **Referencia**: [Llamada 4 (09:44 - 10:50)](https://fathom.video/share/sLxWUiL_hzDkkwwyKGAossLKRjcRYGS2)

<a id="cas-060"></a>
- [ ] **`CAS-060` Reestructurar el Formulario de Contacto (encabezado generalizado, sin precios y con nuevas preguntas clave)**
  - **Estado**: ⚠️ `Bloqueado / Esperando Cliente` | **Prioridad**: 🔴 Crítica | **Tipo**: Funcionalidad / CTA
  - **Responsable**: Hendrick Galarza | **Fecha / Sprint**: Lunes/Martes (Pre-Lanzamiento 7 Nov)
  - **Descripción y Criterios de Aceptación**: 1) Cambiar el encabezado del formulario a: "Agende su primera reunión por Zoom o en nuestras oficinas" (sin mencionar "sin costo" y sin listar ciudades específicas ahí); 2) Eliminar el selector actual "Especialidad de su proyecto" y cualquier campo de precios, presupuestos o números de obra; 3) Implementar paso a paso los nuevos campos y preguntas clave que Gerardo y Felipe envíen en su boceto; 4) Configurar el envío de respuestas al correo electrónico corporativo.
  - **Dependencias / Bloqueos**: Esperando boceto del formulario por Gerardo/Felipe (CAS-061)
  - **Referencia**: [Llamada 1 (33:30 - 44:45) y Llamada 4 (10:55 - 11:38)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

<a id="cas-061"></a>
- [ ] **`CAS-061` Diseñar y enviar boceto del nuevo Formulario de Contacto y texto de "Atención técnica directa y localización en campo"**
  - **Estado**: ⚠️ `Bloqueado / Esperando Cliente` | **Prioridad**: 🔴 Crítica | **Tipo**: Entregable de Cliente
  - **Responsable**: Gerardo Bejarano / Felipe (Arqui) | **Fecha / Sprint**: Antes del Lunes/Martes
  - **Descripción y Criterios de Aceptación**: Elaborar el boceto paso a paso con las preguntas clave para calificar al cliente (ej. si busca Construcción, Proyecto o Presupuesto; tipo de obra: Habitacional unifamiliar/multifamiliar, Comercial, Salud/Clínicas, Hotelería, Ingeniería/Civil; ubicación; datos de contacto, sin pedir montos de dinero) y redactar el texto de la sección "Atención técnica directa y localización en campo".
  - **Dependencias / Bloqueos**: Ninguna
  - **Referencia**: [Llamada 1 (34:25 - 44:45) y Llamada 4 (10:55 - 11:38)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

---

## Descartados, Aprobados y Resueltos

<a id="cas-059"></a>
- [x] **`CAS-059` Reparar el botón "Cotizar proyecto" y verificar botones "Agendar primera reunión" (WhatsApp) e "Iniciar consulta" (Formulario)** — `Terminado / Resuelto`
  - **Estado**: `Terminado` | **Prioridad**: 🟠 Alta | **Tipo**: Funcionalidad / CTA | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se eliminó la supresión del modal (`disableContactModal`) en `ContactPageTemplate.tsx` y `SiteChrome.tsx`, permitiendo que `ContactModalProvider` esté activo en todas las rutas del sitio, incluyendo `/contacto`. Se desacopló el botón "Cotizar proyecto" del Header en `SiteNav.tsx` de un enlace `href="/contacto"` para ser un `<button type="button">` que siempre ejecuta `contactModal.openContactModal()` (cerrando el drawer móvil si estuviera abierto). Se añadió el disparador en el overlay móvil, se sincronizó la etiqueta "Agendar primera reunión" en `home.ts` apuntando a WhatsApp, y se verificó que "Iniciar consulta" despliegue el modal o ancle al formulario en todo el sitio.
  - **Referencia**: [Llamada 1 (32:14 - 33:25) y Llamada 4 (12:10 - 13:15)](https://fathom.video/share/sLxWUiL_hzDkkwwyKGAossLKRjcRYGS2)

