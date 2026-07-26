## PROMPTS UTILIZADOS PARA DESARROLLO DE LANDING PAGE Y FORMULARIO:

**[ROL]**:

Actua como un desarrollador de software experto en frontend - Utiliza las mejores prácticas y decisiones m+as adecuadas para cumplir con los requerimientos.

**[CONTEXTO]**:

- Crear un landing page y un formulario para capturar datos personales del usuario.
- Toma toda la información necesaria sobre la empresa HealthCore para que completar el contenido del landing pge y formulario agregada en el archivo CONTEXT.es.md

**[TAREAS Y RESTRICCIONES]**:

1. Crea solamente los archivos requeridos, siendo la estructura básica del proyecto:
   ├── index.html (landing page)
   ├── application.html (formulario de aplicación/registro)
   └── validation.js (lógica de validación del formulario)
   └── styles.css (agrega estilos solo para interacciones y estilos complejos)
   agrega un archivo para la configuración de tailwind config si es necesario.

2. Asegurate que los archivos html tengan: title, y que a lo largo del desarrollo consideres usar HTML semántico, etiquetas ARIA cuando sea necesario, y atributos alt en imágenes
    -implementa Schema.org 

3. Enlaza los archivos entre si:

- en index.html, solamente crea un botón sin estilos que te lleve a application.html.
- en application.html solo agrega un titulo que diga "form"
- liga el archivo validation.js dentro de application.html

**[DISEÑO]**

1. Utiliza la paleta de - colores primarios: #CFF0EA, #88C9C4, #3E9B94, #20666B, #0C3B45 - secundario: #722F37 - fondo degradado:
   background: #CFF0EA;
   background: linear-gradient(148deg, rgba(207, 240, 234, 1) 0%, rgba(255, 255, 255, 1) 37%, rgba(255, 255, 255, 1) 60%, rgba(255, 255, 255, 1) 65%, rgba(255, 255, 255, 1) 69%, rgba(255, 255, 255, 1) 53%, rgba(62, 155, 148, 0.82) 100%);
2. logo tomalo de la carpeta assets, llamado logo.png
   3 el fondo del landing page debe se ir de inicio a fin el degradado, que no sea repit, no que se vean cortes entre los degradados.
3. botones, fields, inputs, etc. con relieve, con contornos redondos, y trnasparencias.
4. titulos con bold.
5. agregar trnasisiones sutiles con estilos, hovers con colores.
6. Utiliza font google sans

**[DESARROLLO]**

**landing page:**

- Crea Landing page en index.html, usando html semantico, tailwind y considerando accesibilidad, considerando los criterios señalados en la sección de diseño y todo el contenido proveido por el contexto.es.md - contemplando estas secciones:
- encabezado con navegación clara que te lleve a secciones, el mobile, hacer que el menu se colapse con un botón flotante y icono de hamburguesa.
- Secciones:
  - Hero: que hacemos y porque elegirnos
  - Beneficios clave - experiencia en sector.
  - Contacto
  - Footer profesional con los datos en el contexto
  - considera mobile first, que el pagina sea responsiva
  - header en mobile debe colapsarse en un menú de hamburguesa
  - agrega una sección switch que consuma el contenido en ingles y traduzca la pagina.
  - Bilingüe (ES/EN): Implementa un botón para cambiar el idioma entre Español e Inglés al instante sin recargar la página, usando atributos data-es y data-en sacando información del contexto.

**Fromulario**

- crear un formulario para crear cita con los siguientes requerimientos:
- El formulario debe estar dividido por bloques temáticos usando <fieldset>. Cada bloque debe verse como una tarjeta (card) con un color de fondo pastel distinto.
- Estilo Amigable: Usa un fondo general claro con un patrón sutil. Incluye emojis descriptivos en los títulos, labels y opciones para hacerlo muy visual.
- Accesibilidad Aplica buenas prácticas estrictas. Usa <label for> vinculados a los id, <fieldset> y <legend> para los radio buttons, y textos ocultos con .sr-only junto con atributos aria-\* para lectores de pantalla.
- Bilingüe (ES/EN): Implementa un botón para cambiar el idioma entre Español e Inglés al instante sin recargar la página, usando atributos data-es y data-en sacando información del contexto.
- Lógica JS Condicional: Muestra campos adicionales solo si es necesario (ej: pedir "Aseguradora" solo si marcan "Sí tengo seguro").
- Agrega un boton que limpie los campos del formulario.
- Validaciones: El campo de fecha no debe permitir fechas pasadas. El campo de "motivo de consulta" debe tener un contador de caracteres en tiempo real.
- Simulación de Envío: Al enviar, oculta el formulario y muestra una tarjeta atractiva de "Éxito" (Success Screen) agradeciendo al usuario, con un botón para resetear el formulario.

  deploy: https://sueherrera30-health-core.vercel.app/
  
