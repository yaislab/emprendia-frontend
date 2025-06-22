# Plataforma de Mentoría y Formación Accesible para Emprendedores con Discapacidad

## Información del Proyecto

Este proyecto es una plataforma web/móvil de mentoría y formación inclusiva que acompaña al usuario desde la ideación hasta la creación de su producto mínimo viable (MVP). El diseño se centra en la autonomía del emprendedor con discapacidad, integrando elementos de accesibilidad clave (subtítulos e intérprete en lengua de señas, texto-voz y alto contraste, navegación simple con botones grandes y soporte de comandos por voz).

## Tecnologías utilizadas

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Instalación y uso

Asegúrate de tener Node.js y npm instalados.

```sh
# Clona el repositorio
 git clone <TU_GIT_URL>

# Entra al directorio del proyecto
 cd <NOMBRE_DEL_PROYECTO>

# Instala las dependencias
 npm i

# Inicia el servidor de desarrollo
 npm run dev
```

## Despliegue

Puedes desplegar la aplicación en tu plataforma de preferencia. Asegúrate de configurar correctamente las variables de entorno y el dominio si es necesario.

---

## Contexto y Necesidad de una Plataforma Accesible
En Bolivia, la comunidad sorda enfrenta barreras significativas para acceder a formación en emprendimiento debido a la falta de materiales disponibles en Lengua de Señas Boliviana (LSB). La LSB es la lengua natural de las personas sordas bolivianas (aún no reconocida oficialmente en el país), por lo que cualquier plataforma educativa dirigida a este público debe incluir contenido en señas para ser verdaderamente accesible. Estudios regionales resaltan que solo una fracción mínima de personas con discapacidad accede a educación superior y atribuyen esta brecha, en parte, a la falta de metodologías inclusivas como contenido en lengua de señas. Por ejemplo, en Perú se lanzaron recientemente los primeros cursos online de marketing con intérprete de señas justamente para ofrecer oportunidades a emprendedores sordos y visibilizar la escasez de ofertas formativas adaptadas.
Además, muchas personas sordas presentan dificultades con el español escrito debido a que la educación tradicional no ha sido bilingüe. Numerosos estudios muestran que, en promedio, un adulto sordo alcanza un nivel de lectura equivalente al de cuarto grado de primaria, muy por debajo del promedio oyente. Esto evidencia la importancia de usar lenguaje sencillo, claro y complementarlo con apoyos visuales en cualquier plataforma educativa dirigida a esta población. En resumen, existe una necesidad urgente de una plataforma de mentoría en emprendimiento que elimine estas barreras lingüísticas y cognitivas, ofreciendo contenidos en LSB, subtítulos en español simple y recursos visuales adaptados. El objetivo del MVP será demostrar cómo una interfaz inclusiva puede empoderar a emprendedores sordos bolivianos para aprender conceptos de negocio (como modelado de ideas, segmentación de clientes o creación de un producto mínimo viable) de forma efectiva.

## Mejores Prácticas de Diseño Inclusivo para Personas Sordas

- **Contenido en Lengua de Señas:** Todo concepto clave debe presentarse a través de videos en LSB, preferiblemente narrados por mentores o educadores sordos (o intérpretes calificados). La información no se considera accesible para una persona sorda si no se ofrece de forma visual en su lengua (señas), subtítulos u otros medios gráficos.
- **Subtítulos en Español de Alta Calidad:** Junto con cada video en lengua de señas se deben proveer subtítulos en español claro. Estos subtítulos permiten reforzar la información para quienes deseen leer el contenido, sirviendo también a usuarios oyentes. Los subtítulos deben cumplir estándares de calidad: alta precisión, sincronía con el video y formato legible.
- **Lenguaje escrito simple y lectura fácil:** Todo texto complementario debe utilizar frases cortas, vocabulario sencillo y directo. Incluir explicaciones breves, listados de viñetas y evitar jerga no explicada. Cuando sea necesario usar términos técnicos, brindar una definición simple y, de ser posible, la seña correspondiente en LSB.
- **Apoyo de recursos visuales claros:** La información se refuerza con gráficos, íconos e infografías que ejemplifiquen los conceptos empresariales. El uso de pictogramas e ilustraciones facilita una comprensión rápida y trasciende barreras idiomáticas.
- **Interfaz limpia e intuitiva:** La estructura visual de la plataforma debe ser sencilla, con navegación consistente e íconos reconocibles. Se priorizarán menús claros, botones y secciones importantes con etiquetas en español de fácil lectura y contrastadas. Cumplir con los criterios WCAG de alto contraste y permitir redimensionar textos.
- **Optimización para dispositivos apropiados:** El diseño será responsive pero se recomienda el uso en pantallas medianas o grandes. En móvil, la interfaz debe mostrar un elemento por vez para no saturar visualmente al usuario.
- **Enfoque bilingüe (Señas–Español):** La plataforma debe concebirse como una experiencia bilingüe, donde la LSB sea el idioma principal de instrucción y el español escrito un idioma complementario. Todos los contenidos educativos se ofrecen en señas con traducción al español.

## Pantallas del MVP

### 1. Pantalla Bienvenida
- Título motivador, imágenes inclusivas o video de introducción.
- Botón destacado "Iniciar" de alto contraste.
- Accesibilidad: Video introductorio con intérprete LSB y subtítulos, audio de bienvenida, texto grande y botones claros, ícono de micrófono para navegación por voz.

### 2. Presentación de Idea
- Área para describir la idea de negocio (texto o chat).
- Video tutorial breve sobre cómo formular la idea.
- Accesibilidad: Dictado por voz, texto leído en voz alta, instrucciones claras, video con subtítulos y LSB.

### 3. Validación del Problema
- Serie de preguntas o chat simulado para identificar y validar el problema.
- Accesibilidad: Lectura en voz de cada pregunta, video explicativo con subtítulos y LSB, botones grandes y claros.

### 4. Perfil del Cliente
- Formulario para definir el cliente ideal, plantilla visual de "buyer persona".
- Accesibilidad: Preguntas y opciones leídas en voz alta, imágenes con texto alternativo, campos accesibles, compatible con lectores de pantalla.

### 5. Propuesta de Valor
- Lienzo para definir la propuesta de valor: problema resuelto, solución ofrecida, ventaja competitiva.
- Accesibilidad: Guía leída automáticamente, colores de alto contraste, iconos con descripciones auditivas, ejemplos ilustrativos accesibles.

### 6. Construcción del MVP
- Editor visual para armar el prototipo mínimo.
- Accesibilidad: Componentes grandes y etiquetados, instrucciones por voz, diseño de alto contraste.

### 7. Retroalimentación de IA
- Chat interactivo donde la IA mentora responde y da feedback.
- Accesibilidad: Mensajes reproducibles en audio, subtítulos, ventana emergente con intérprete LSB si es video, soporte de comandos de voz.

### 8. Resumen Visual del Negocio
- Vista final con resumen gráfico del plan, gráficos simples o íconos y un párrafo breve.
- Accesibilidad: Texto grande y claro, botón de "Escuchar Resumen", gráficos con texto alternativo, opción de descargar PDF accesible.

## Recursos Didácticos Accesibles
- Videos y audios de ayuda en cada módulo, subtitulados y con intérprete LSB.
- Navegación homogénea con botones e íconos identificados y accesibles por teclado y voz.
- Propósito del MVP: Empoderar a emprendedores con discapacidad para desarrollar su idea de negocio de manera autónoma y accesible.

---

Cada pantalla y componente está diseñado pensando en la inclusión: se prioriza la usabilidad, la autonomía del usuario y la eliminación de barreras.
