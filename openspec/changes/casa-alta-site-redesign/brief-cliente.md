# Brief del cliente — Casa Alta

**Tipo:** material de entrada, no artefacto SDD. Es la fuente autoritativa de todo lo que este
cambio construye.

**Procedencia:** respuestas del cliente al cuestionario de contenido del sitio.
**Transcripción:** las palabras son textuales. Solo se normalizaron las mayúsculas para que el
archivo se pueda leer; el cliente respondió casi todo en versalitas. Nada se resumió, nada se
corrigió y no se agregó ninguna afirmación que él no haya hecho.

Cualquier hueco que este documento deje se queda como hueco. Un campo vacío es una tarea
pendiente; un campo inventado es una mentira que se publica.

---

## 0. Decisiones tomadas después del brief

Estas no vienen del cliente. Son decisiones de alcance, tomadas en conversación aparte.

| Tema | Decisión |
|---|---|
| Dirección de diseño | Adaptar un estilo estructural de referencia —hero de una sola frase, tiles de categoría con foto, línea manifiesto como respiro, doble rejilla de servicios, navegación plana y corta— conservando la esencia de Casa Alta. El sitio de referencia es **solo una referencia visual**: su nombre no aparece en el contenido, ni en el código, ni en los comentarios. Lo que falla es la arquitectura de información, no la paleta ni la tipografía. |
| Hero | Ocupa **100vw x 100vh** (implementado como `dvh`/`svh`, nunca `vh`). Relativamente minimalista. El texto va **dentro de la zona limpia del hero**, no encima de toda la imagen. Decidido así después de que dos intentos de texto sobre la foto se midieran y fallaran. |
| Navbar | Flotante y transparente mientras está sobre el hero. Al salir del hero toma un color de relleno. |
| Imágenes por sección | Cada sección lleva imágenes alusivas. |
| Portafolio | Sección de portafolio con los **3 proyectos más destacados**. |
| Masonry | Sección nueva: masonry con las imágenes más destacadas de los proyectos. |
| Fuente de imágenes de sección | Autorizado Unsplash para imágenes alusivas de sección, **descargadas y procesadas por el pipeline de imágenes** del repo, nunca enlazadas en caliente a Unsplash. **Restricción:** todo lo que represente obra real —portafolio, masonry, páginas de proyecto— sale del set propio. Una constructora no muestra stock como su obra. |
| Animación | **GSAP**. El sitio se anima; el objetivo declarado es un sitio de nicho, no genérico. |
| Portafolio: cuáles 3 | El orden `01-` **es** el ranking. Los destacados son **01-plaza-esmeralda-puerto-escondido**, **02-el-bicho** y **03-casa-blake-tlalixtac**, en ese orden, siendo el 01 el más importante. |
| Obra pública | **En espera.** El cliente quiere atraerla pero pidió no publicarlo. No se construye para ella y no se menciona en el sitio. |
| Guadalajara | **Posicionamiento SEO únicamente.** Sin sede, sin presencia física, sin obra allá. |
| Estados Unidos | **Fuera de alcance.** |
| Peso visual | El cliente reportó que el sitio "luce simple, muerto, sin identidad". Medido: 144 fotos publicables en el archivo, 6 en la página (4.2%), 1,208 palabras visibles, 134 palabras por imagen, y solo 2 valores de `sizes` en todo el sitio. |

---

## 1. Portada principal

**Nombre exacto de la empresa o marca:** Constructora Casa Alta

**Servicio principal que quieren vender:** "Somos una constructora dedicada a trabajar con proyectos residenciales, industriales usando diferentes sistemas vanguardistas de construcción e ingeniería; tanto unifamiliar como multifamiliar, comerciales e industriales. Así como servicios propios de la construcción y diseño. Partiendo de la visión de cumplir con las expectativas del cliente, creando un proyecto único."

**Zona exacta donde trabajan:** "Trabajamos en todo el estado de Oaxaca, en la sierra, costa, istmo, centro y contamos con oficinas en PXM y Salina Cruz." Agrega: "pero nos gustaría tener [alcance/posicionamiento] en Guadalajara y Estados Unidos para trabajarle a los paisanos mexicanos que se encuentran en el extranjero."

> Nota: el cliente escribió "algoritmo". Se interpretó como alcance o posicionamiento y se confirmó
> como SEO para Guadalajara; Estados Unidos quedó fuera. Ver §0.

**Frase principal de la portada:** "Arquitectura y construcción civil e industrial."

**Frase secundaria:** "Proyectos de ingeniería civil y proyectos ejecutivos arquitectónicos."

**Botón principal:** "Construcción con Casa Alta"

**Botón secundario:** "Agendar llamada"

---

## 2. Presentación de la empresa

**Descripción en 3 a 5 líneas:** "Una constructora que busca satisfacer todas las necesidades constructivas en el desarrollo de proyectos enfocados en usar los sistemas constructivos más vanguardistas hasta la construcción tradicional."

**Misión o propósito:** "Ser una empresa que solucione todas las soluciones constructivas y dar función y carácter a cada proyecto que llega a nuestras manos."

**Tipo de proyectos más frecuentes:** "Nos especializamos en desarrollar diferentes tipos de construcción, tanto hábitat residencial, como multifamiliar, construcción de centros comerciales, hoteles, restaurantes y de salud. En el área de la construcción civil ofrecemos todo tipo de construcción de concreto armado, nos especializamos en soluciones de concreto presforzado para la realización de puentes vehiculares y peatonales, pavimentación de concreto hidráulico, asfaltos y carreteras, construcción con estructura metálica, naves industriales y oficinas con bodegas."

**Qué los hace diferentes:** "Que en Casa Alta tenemos experiencia en múltiples tipos de sistemas de construcción, hemos construido diferentes tipos de proyectos que van desde una casa habitación hasta otro tipo de obras con mayor complejidad, el diseño vanguardista y los renders de alta calidad, el cuidado de los detalles en la supervisión."

**Valores a transmitir:** "La confianza de ser una empresa responsable en la administración de los recursos disponibles y capaz de solucionar dando diferentes tipos de sistemas de construcción para llevar a cabo un proyecto."

**Tono:** "Más cálido y con confianza" — con la aclaración explícita: "que no les dé miedo a los clientes de que es caro."

---

## 3. Datos de confianza

| Dato | Valor |
|---|---|
| Año de fundación | 2016 |
| Obras realizadas | "alrededor de unas 150 obras alrededor de todo el estado" |
| Metros cuadrados construidos | "más de 50,000 metros cuadrados de construcción entre casa habitación y obra civil" |
| Cifra adicional a destacar | "El porcentaje de entregas que ha sido del 100 por ciento con todos los proyectos ejecutados" |

---

## 4. Servicios

**Servicios exactos a mostrar:**

- Proyectos arquitectónicos integrales
- Construcción y obra civil
- Construcción comercial, bodegas y naves industriales
- Construcción habitacional
- Construcción con estructura de concreto presforzado y construcción con estructura metálica
- Espacios públicos, deportivos y skateparks

**Los más importantes:** "Todos son partes de los más importantes pero construcción en hábitat y obra civil son los más importantes."

**Qué incluye cada servicio:** "Los diferentes tipos de sistemas, materiales y soluciones constructivas que podemos ofrecer para cada proyecto."

**Tipo de cliente por servicio:** "Nos enfocamos en clientes privados pero nos gustaría que se interesen por nosotros clientes de obra pública pero **no decirlo en la página**."

**Servicio que ya no quieren mostrar:** no.

**Servicio nuevo que quieren agregar:** "Proyectos, portafolio, quiénes somos."

> Estas tres últimas son navegación, no servicios. Se tratan como rutas.

### 4.1 Líneas de servicio adicionales (observaciones del cliente)

**Especialistas en construcción de skateparks**
- Diseño de skateparks, indoor y outdoor
- Instalaciones artísticas urbanas para uso de skate y escultóricas
- Spots urbanos para eventos de skate y de arte
- Remodelación y restauración de skateparks
- Landscaping
- Supervisión de construcción de skateparks

**Landscape**
- Áreas verdes y jardines
- Diseño de senderos, andadores y plazas
- Sistema de riego
- Iluminación exterior paisajística
- Mobiliario urbano y espacios decorativos

**Construcción de espacios públicos y deportivos**
- Estadios y gradas
- Centros de convenciones
- Canchas de basket
- Canchas de pádel
- Parques públicos
- Recuperación de espacios públicos
- Cines al aire libre y explanadas
- Auditorios con isóptica vertical y horizontal

**Albercas y espacios exteriores**
- Asadores
- Estacionamientos y zonas vehiculares
- Áreas de descanso complementarias
- Baños y regaderas de exterior

**Proyectos eco-sustentables**
- Diseños bioclimáticos y aprovechamiento de ventilación e iluminación natural
- Uso de materiales de bajo impacto ambiental
- Sistemas de captación de agua pluvial
- Equipos ahorradores de energía
- Sistemas de energía renovable, paneles solares
- Estrategias de eficiencia térmica y confort ambiental

**Instalaciones eléctricas de media y alta tensión**
- Transformadores
- Subestaciones eléctricas

**Instalaciones hidrosanitarias**
- Drenajes
- Plantas de tratamiento
- Biodigestores

### 4.2 Arquitectura interior (pregunta abierta del cliente)

El cliente pregunta si se puede hacer un apartado para los servicios de arquitectura interior sin
nombrar al fabricante, con imágenes de proyectos. El apartado se llamaría **Arquitectura interior**
y listaría:

- Interiorismo
- Cocinas premium
- Closets
- Mobiliario sobre diseño
- Fachadas en porcelánico y cuarzo
- Pisos y recubrimientos en porcelánico
- Puertas residenciales
- Materiales premium

> **Riesgo de marca — RESUELTO.** El cliente confirmó que la marca de superficies era únicamente
> una referencia de diseño suya, no un socio ni una línea de servicio concesionada. Se eliminó de
> todo el repositorio: los dos items publicados en `src/content/services.ts` se reescribieron a
> nombres genéricos de material y se retiró el nombre de los comentarios de código. No se debe
> reintroducir ninguna marca de terceros en el contenido.

---

## 5. Portafolio / Proyectos

El cliente enviará una carpeta por obra.

**Proyectos reales a mostrar:** "Departamentos en Punta Zicatela, construcciones de casas y de obra civil." Enviará fotos por carpeta. Sugiere "una foto en portada del bicho mostrando construcción en la costa".

**Nombre correcto de un proyecto:** "El Bicho"

**Tipo de proyecto:** "Unas villas que funcionan como hotel de descanso a orilla de playa."

**Ubicación:** "La Punta Zicatela, Puerto Escondido."

**Detalle importante a contar:** "De este proyecto, que fue un concepto nuevo que nació del mar para el mar y que se le buscó dar un concepto muy local a la playa de Puerto Escondido (Zicatela), naciendo de esta manera el estilo nativo, que es donde se encuentra una construcción de concreto con palapas tipo triángulo en el nivel más alto, dando espacio a un concepto dentro de las habitaciones de estar en la playa por el techo de palma pero desde tu habitación."

**Resultado o valor aportado al cliente:** "El hotel es muy visitado por el diseño y la tranquilidad del lugar que da la construcción."

**Fotos reales disponibles:** sí. "Ahí se puede ver la alberca color negro y las áreas de la playa que son parte del mismo edificio."

---

## 6. Diferenciadores

**Por qué elegirlos:** "Porque nos preocupamos por hacer la entrega del proyecto en tiempos y con las especificaciones que se firmó en el contrato de inicio."

**Tres o cuatro fortalezas:** "La experiencia, el uso de los materiales y sistemas, el servicio que desde el proyecto damos a los clientes."

**Problema que resuelven mejor:** "Nos enfocamos en obra nueva pero también remodelaciones."

**En qué destacan:** "Experiencia local y tiempos de ejecución, diseños vanguardistas y de alta calidad."

**Sostenibilidad, materiales, ingeniería, atención:** "Nos enfocamos en brindar a cada proyecto las mejores soluciones constructivas que se requiera, así como el uso de diferentes tipos de materiales según lo que los proyectos requieran. Construimos con sistemas aligerados para losas de entrepiso y azotea, así como estructuras de concreto armado, concreto presforzado o de estructura metálica, según sea lo más conveniente al proyecto. Todo esto lo validamos con el cálculo estructural para determinar la mejor de todas las opciones posibles a elegir, partiendo desde el precio, tiempo de ejecución y localización del proyecto, ya que según el clima cambian las resistencias de los materiales y su durabilidad."

---

## 7. Frase emocional / llamada intermedia

**Frase:** "Arquitectura y construcción que perdura."

**Mensaje a transmitir:** "Hacer valer el esfuerzo de tu trabajo requiere construir con calidad y cuidando los detalles de una excelente ejecución de obra."

**Idea que debe quedar:** "Que somos una empresa de confianza de construir su proyecto y de administrar sus recursos económicos, y certezas legal."

**Acción esperada del visitante en esa sección:** "Que puedan ver imágenes de personas felices viviendo sus proyectos y desde cómo fue iniciando el proceso del diseño hasta la construcción y terminando habitando felizmente su proyecto."

---

## 8. Proceso de trabajo

**Proceso real, de cliente a entrega:** "Damos asesoría gratis en una primera reunión por Zoom o presencial, empezamos con la contratación del paquete para empezar a hacer su proyecto y los servicios con los que contamos. También escuchamos al cliente y le preguntamos tiempo, estimación económica para el proyecto y cuál será el fin del proyecto."

**Etapas exactas a mostrar:** "Cómo escuchamos a nuestros clientes y les damos lo que buscan en soluciones constructivas de calidad."

**Mencionar visita, propuesta, presupuesto, ejecución y entrega:** sí.

**Seguimiento post-entrega:** sí, "tenemos un seguimiento post entrega".

**Parte a destacar más:** "La ejecución cuidando los detalles de los procesos en obra."

---

## 9. Testimonios

**¿Hay testimonios reales?** "No, pero podemos conseguirlos en video."

**Nombre a mostrar en cada testimonio:** "El nombre del proyecto."

**Idea principal a comunicar:** "La confianza y que se muestren satisfechos con los resultados."

**¿Completos o resumidos?** "Versiones resumidas."

**¿Calificaciones, reseñas o métricas reales?** "No, nada aún."

> Estado actual del repositorio: `src/content/testimonials.ts` exporta un arreglo vacío a propósito.
> Se queda vacío hasta que existan las palabras reales del cliente.

---

## 10. Contacto

| Campo | Valor |
|---|---|
| Teléfonos | 951 458 1395 y 951 165 0678 |
| WhatsApp | los mismos números |
| Correo | constructoracasaalta@outlook.com — "pero nos gustaría hacer unos correos institucionales" |
| Dirección o zona a mostrar | "Puerto Escondido, Oaxaca y Salina Cruz" |
| Botón principal de contacto | WhatsApp |
| Destino del contacto | "sí" a WhatsApp, formulario, llamada y correo |

---

## 11. Cierre final

**Mensaje final del sitio:** "La construcción en sencilla con nosotros" — el cliente agrega: "o alguna frase similar más profesional".

**Cómo invitar al siguiente paso:** "No tenemos idea."

**Texto del último botón:** "Contacto"

---

## 12. Estilo de redacción

| Pregunta | Respuesta |
|---|---|
| ¿Tú o usted? | **Usted** |
| ¿Cortos y directos, o emocionales y aspiracionales? | "Cortos y emocionales" |
| ¿Local, elegante o corporativa? | "Local con un toque de experiencia" |
| Palabras que sí quiere usar siempre | "La de gracias" |
| Palabras o frases que no deben aparecer | "La de no podemos" |

---

## 13. Observaciones sueltas

- **Color institucional:** el azul del logotipo. Ya es `--color-brand-800: #0e2d78`, muestreado del archivo del logo.
- **Hasta arriba del inicio** debe haber un texto que diga **"empresa 100% mexicana"**. Existe como `claim` en la barra superior.
- **Redes sociales a agregar:** Facebook, Instagram, TikTok. Hoy Facebook y TikTok tienen `href: ""` y no se renderizan.

---

## 14. Huecos abiertos

Cosas que el brief deja sin resolver. Ninguna se puede inventar.

1. **Frase de cierre final.** El cliente no tiene una y pidió una "más profesional". Hay que proponerla y que la apruebe.
2. **Cómo invitar al siguiente paso en el cierre.** "No tenemos idea."
3. **Correos institucionales.** Quiere cambiarlos; hoy hay un solo correo de Outlook.
4. **Testimonios.** No existen todavía; dice que puede conseguirlos en video.
5. ~~**Autorización de marca de terceros** en la línea de arquitectura interior. Sin decidir.~~ **CERRADO.** Era solo una referencia de diseño del cliente. Se retiró del contenido y de los comentarios de código.
6. **Fotos por obra.** El cliente enviará carpetas. El brief solo nombra El Bicho con detalle; el resto de proyectos está descrito en genérico.
7. **"Alcance" en Guadalajara.** Confirmado como SEO; falta decidir el mecanismo —páginas de servicio por ciudad, campaña pagada o alianzas locales— porque un sitio cuyo contenido entero es Oaxaca no rankea en Guadalajara por sí solo.
8. **Nombre oficial de los servicios nuevos.** El cliente los escribió como listas de viñetas sin un nombre de servicio que las agrupe.
