## PROMPTS UTILIZADOS PARA DESARROLLO DE LANDING PAGE Y FORMULARIO:

**[ROL]**:

Actua como un desarrollador de software experto en frontend - Utiliza las mejores prácticas y decisiones m+as adecuadas para cumplir con los requerimientos.

**[CONTEXTO]**:

- Crear un landing page y un formulario para capturar datos personales del usuario.
- Toma toda la información necesaria sobre la empresa HealthCore para que completar el contenido del landing pge y formulario.

**[TAREAS Y RESTRICCIONES]**:

1. Crea solamente los archivos requeridos, siendo la estructura básica del proyecto:
   ├── index.html (landing page)
   ├── application.html (formulario de aplicación/registro)
   └── validation.js (lógica de validación del formulario)

2. Asegurate que los archivos html tengan: title, y que a lo largo del desarrollo consideres usar HTML semántico, etiquetas ARIA cuando sea necesario, y atributos alt en imágenes
    -implementa Schema.org 

3. Enlaza los archivos entre si:

- en index.html, solamente crea un botón sin estilos que te lleve a application.html.
- en application.html solo agrega un titulo que diga "form"
- liga el archivo validation.js dentro de application.html
