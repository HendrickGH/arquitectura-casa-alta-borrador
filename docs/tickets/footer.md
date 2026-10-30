# Épica: Pie de Página (Footer)

Enlaces de navegación consistentes, datos de contacto oficiales, derechos reservados y eliminación de links obsoletos.

> **Índice general**: Volver a [tickets.md](./tickets.md) | **Insumos del cliente**: [entregables-cliente.md](./entregables-cliente.md)

**Métricas de la épica**: Total tickets: **2** | Pendientes/Bloqueados: **0** | Resueltos/Descartados: **2**

---

## Tareas Activas y Bloqueadas

*No hay tareas pendientes en esta sección.*

---

## Descartados, Aprobados y Resueltos

<a id="cas-024"></a>
- [x] **`CAS-024` Agregar "Oaxaca de Juárez" a la lista de Sedes en el Footer** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Contenido / Copy | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: Se incorporó `{ city: "Oaxaca de Juárez", region: "Oaxaca" }` en `src/content/site.ts`, reflejándose automáticamente en el listado de Sedes del Footer junto con Puerto Escondido y Salina Cruz.
  - **Referencia**: [Llamada 1 (44:55 - 45:55)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)

<a id="cas-025"></a>
- [x] **`CAS-025` Agrandar el eslogan "Arquitectura que perdura" al ancho completo de "Casa Alta" en el Footer** — `Resuelto`
  - **Prioridad**: 🟠 Alta | **Tipo**: Diseño / UI | **Responsable**: Hendrick Galarza
  - **Motivo / Resolución**: En `src/components/organisms/Footer.tsx`, se agrupó el wordmark en un bloque `w-fit flex flex-col` y se agrandó el eslogan a `text-[clamp(0.65rem,1.35vw,1.15rem)] font-medium uppercase tracking-[0.1em]` con justificación balanceada `w-full text-justify [text-align-last:justify]`, alineándose de la C a la A de "CASA ALTA" de forma proporcional y responsive en todas las resoluciones.
  - **Referencia**: [Llamada 1 (46:05 - 47:05)](https://fathom.video/share/rF83SZSjYrbompXZfDtFZBzKd1P21cHs)
