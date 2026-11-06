# Tablero de Tickets y Épicas — Casa Alta Web

Este documento es el índice maestro operativo del proyecto web de **Arquitectura Casa Alta**, generado a partir de la auditoría y acuerdos de las 4 llamadas de feedback con Gerardo Bejarano y Felipe.

## Cómo Gestionar los Tickets

1. **Avance en Checkboxes**: Cuando completes una tarea técnica, cambiá el estado `- [ ]` por `- [x]` en el archivo `.md` de la épica correspondiente.
2. **Dependencias e Insumos**: Si una tarea indica que está bloqueada por el cliente, revisá [`entregables-cliente.md`](./entregables-cliente.md) para confirmar el ID del insumo requerido.
3. **Convención de Commits**: Realizá commits atómicos siguiendo las reglas del repositorio: `feat(web): ...`, `fix(web): ...` o `docs: ...` referenciando el ID del ticket (ej. `CAS-001`).
4. **Alineación con Arquitectura (`DESIGN.md`)**: Todo cambio visual debe respetar la geometría `0px`, tokens de color y la jerarquía Marcellus/Montserrat estipulada en el contrato de diseño.
5. **Denominación Oficial de Marca**: El nombre oficial del despacho es **Casa Alta** (nunca "Casalta", excepto estrictamente en el dominio técnico registrado `arquitecturacasalta.com`). Toda referencia en código, textos de interfaz y documentación debe respetar esta convención oficial (`CAS-023`).

## Índice Operativo de Épicas

| Épica / Sección | Archivo | Descripción | Total | Activos | Resueltos |
| :--- | :--- | :--- | :---: | :---: | :---: |
| **Global y Diseño Base** | [`base-design.md`](./base-design.md) | Ajustes globales de diseño, alineación justificada, eliminación de frases de costo y guardas de estilo visual. | 5 | 0 | 5 |
| **Menú de Navegación (Header)** | [`header.md`](./header.md) | Reorganización del menú principal: incorporación de Obra Civil, renombre de Sostenible y eliminación de Interiores/Real Estate. | 4 | 0 | 4 |
| **Página de Inicio (Home)** | [`home.md`](./home.md) | Hero carrusel con eslogan, sección Quiénes Somos (40px), integración de Charco Seco, arquitectura nativa y métricas. | 14 | 3 | 11 |
| **Pie de Página (Footer)** | [`footer.md`](./footer.md) | Enlaces de navegación consistentes, datos de contacto oficiales, derechos reservados y eliminación de links obsoletos. | 2 | 0 | 2 |
| **Página de Servicios** | [`servicios.md`](./servicios.md) | Catálogo integral de servicios de arquitectura y constructora, sección cocinas/interiores, Skate Parks e ingeniería. | 8 | 0 | 8 |
| **Página de Proyectos** | [`proyectos.md`](./proyectos.md) | Portafolio de obras destacadas (El Bicho, Blake, Tarrastro, etc.), filtros por tipología, galerías fotográficas y fichas técnicas. | 16 | 3 | 13 |
| **Página Obra Civil** | [`obra-civil.md`](./obra-civil.md) | Nueva página y sección dedicada a infraestructura pública, puentes, pavimentaciones, muros de contención y naves. | 2 | 1 | 1 |
| **Página Sostenible** | [`sostenible.md`](./sostenible.md) | Depuración de marcas registradas ajenas, enfoque en arquitectura bioclimática, sistemas pasivos y materiales regionales. | 4 | 0 | 4 |
| **Página Nosotros** | [`nosotros.md`](./nosotros.md) | Narrativa del despacho, arraigo en Oaxaca, capacidad de ejecución a nivel nacional, equipo profesional y respaldo contractual. | 2 | 2 | 0 |
| **Página de Contacto y Formularios** | [`contacto.md`](./contacto.md) | Reingeniería del formulario guiado paso a paso, eliminación de campos de presupuesto intrusivos, WhatsApp y mapa de ubicación. | 4 | 2 | 2 |
| **Dominios, Correos y Lanzamiento** | [`lanzamiento.md`](./lanzamiento.md) | Gestión del dominio arquitecturacasalta.com (10 años), DNS, configuración de 5 correos corporativos y despliegue final. | 5 | 5 | 0 |
| **Post-Lanzamiento (Fase 2 - CMS y SEO)** | [`post-lanzamiento.md`](./post-lanzamiento.md) | Implementación futura de Payload CMS para gestión autónoma del cliente y auditoría continua de posicionamiento SEO. | 2 | 2 | 0 |
| **TOTALES** | | | **68** | **18** | **50** |

## Insumos y Entregables del Cliente

- [`entregables-cliente.md`](./entregables-cliente.md): **16 insumos** bajo responsabilidad de Gerardo y Felipe (textos, fotos por WeTransfer, boceto de formulario, pago de dominio y correos corporativos).

## Acceso Rápido por Archivo

- [x] **[Global y Diseño Base](./base-design.md)** (0 pendientes / 5 totales) — Ajustes globales de diseño, alineación justificada, eliminación de frases de costo y guardas de estilo visual.
- [x] **[Menú de Navegación (Header)](./header.md)** (0 pendientes / 4 totales) — Reorganización del menú principal: incorporación de Obra Civil, renombre de Sostenible y eliminación de Interiores/Real Estate.
- [ ] **[Página de Inicio (Home)](./home.md)** (3 pendientes / 14 totales) — Hero carrusel con eslogan, sección Quiénes Somos (40px), integración de Charco Seco, arquitectura nativa y métricas.
- [x] **[Pie de Página (Footer)](./footer.md)** (0 pendientes / 2 totales) — Enlaces de navegación consistentes, datos de contacto oficiales, derechos reservados y eliminación de links obsoletos.
- [x] **[Página de Servicios](./servicios.md)** (0 pendientes / 8 totales) — Catálogo integral de servicios de arquitectura y constructora, sección cocinas/interiores, Skate Parks e ingeniería.
- [ ] **[Página de Proyectos](./proyectos.md)** (3 pendientes / 16 totales) — Portafolio de obras destacadas (El Bicho, Blake, Tarrastro, etc.), filtros por tipología, galerías fotográficas y fichas técnicas.
- [ ] **[Página Obra Civil](./obra-civil.md)** (1 pendientes / 2 totales) — Nueva página y sección dedicada a infraestructura pública, puentes, pavimentaciones, muros de contención y naves.
- [x] **[Página Sostenible](./sostenible.md)** (0 pendientes / 4 totales) — Depuración de marcas registradas ajenas, enfoque en arquitectura bioclimática, sistemas pasivos y materiales regionales.
- [ ] **[Página Nosotros](./nosotros.md)** (2 pendientes / 2 totales) — Narrativa del despacho, arraigo en Oaxaca, capacidad de ejecución a nivel nacional, equipo profesional y respaldo contractual.
- [ ] **[Página de Contacto y Formularios](./contacto.md)** (2 pendientes / 4 totales) — Reingeniería del formulario guiado paso a paso, eliminación de campos de presupuesto intrusivos, WhatsApp y mapa de ubicación.
- [ ] **[Dominios, Correos y Lanzamiento](./lanzamiento.md)** (5 pendientes / 5 totales) — Gestión del dominio arquitecturacasalta.com (10 años), DNS, configuración de 5 correos corporativos y despliegue final.
- [ ] **[Post-Lanzamiento (Fase 2 - CMS y SEO)](./post-lanzamiento.md)** (2 pendientes / 2 totales) — Implementación futura de Payload CMS para gestión autónoma del cliente y auditoría continua de posicionamiento SEO.
- [ ] **[Insumos del Cliente](./entregables-cliente.md)** (16 insumos requeridos)
