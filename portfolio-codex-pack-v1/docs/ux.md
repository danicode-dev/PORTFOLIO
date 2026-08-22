# UX, responsive e interacciones

## Composición de escritorio

### Hero

Rejilla principal inspirada en la referencia:

- columna de fotografía;
- columna de presentación;
- columna amplia de proyectos destacados.

En anchos intermedios, pasar a dos filas antes de comprimir el contenido.

### Sección inferior

- tecnologías;
- formación;
- experiencia;
- conexiones/contacto.

Usar separadores verticales solo cuando exista espacio suficiente.

## Composición móvil

Orden recomendado:

1. etiqueta profesional;
2. nombre;
3. descripción;
4. CTAs;
5. fotografía;
6. proyectos destacados;
7. tecnologías;
8. formación;
9. experiencia;
10. contacto.

La fotografía no debe ocupar toda la primera pantalla. Mantener un recorte útil mediante `object-position` configurable.

## Breakpoints de validación

- 360 x 800.
- 390 x 844.
- 430 x 932.
- 768 x 1024.
- 1024 x 768.
- 1280 x 800.
- 1440 x 900.
- 1920 x 1080.

No diseñar únicamente para estos tamaños; son puntos de comprobación.

## Modal “Sobre mí”

### Escritorio

- ancho máximo aproximado: 760 px;
- título, dos párrafos, tres datos breves y CTAs;
- cierre visible en esquina superior;
- backdrop oscuro y ligeramente desenfocado;
- scroll interno si el viewport es bajo.

### Móvil

- panel casi completo o bottom sheet alto;
- margen exterior mínimo de 12-16 px;
- área de cierre de al menos 44 x 44 px;
- botones apilados si no caben.

## Modal de proyecto

Contenido máximo:

1. captura o imagen del proyecto;
2. nombre y estado;
3. descripción de 2-4 líneas;
4. problema/objetivo;
5. solución o resultado;
6. rol;
7. tecnologías;
8. CTAs reales de demo y/o código.

No añadir cronologías extensas, arquitectura detallada, galerías largas ni README completo.

## Apertura y cierre de modales

- Abrir con `showModal()`.
- Botón de cierre explícito.
- Cierre con Escape.
- Cierre al pulsar el backdrop, sin cerrar cuando se pulsa el contenido.
- Restaurar el foco al botón que abrió el modal.
- Evitar varios diálogos abiertos simultáneamente.
- El contenido de fondo debe quedar inerte mediante el comportamiento nativo de `<dialog>`.

## Menú móvil

- Botón con `aria-expanded` y `aria-controls`.
- El icono debe cambiar de menú a cerrar.
- Panel con enlace activo visible.
- Cerrar al cambiar de ruta.
- Cerrar con Escape.
- Restaurar el foco al botón de menú.
- Evitar que el fondo haga scroll mientras está abierto.

## Hover y focus

Cada control interactivo debe tener:

- estado normal;
- hover;
- active;
- `focus-visible` con contorno evidente;
- estado disabled cuando corresponda.

No ocultar información importante exclusivamente detrás de hover.

## Tarjetas de proyecto

- Imagen con relación de aspecto consistente.
- Título y descripción visibles sin abrir el modal.
- Chips de tecnologías limitados a 3-5 en la tarjeta.
- Botón “Ver proyecto” abre el modal.
- La tarjeta puede elevarse 2 px en hover, sin rotaciones ni 3D.

## Copiar correo

1. Mostrar el correo como texto seleccionable.
2. El botón intenta `navigator.clipboard.writeText()` solo tras interacción del usuario.
3. Si falla, seleccionar el campo de correo y mostrar `Selecciona el correo y pulsa Ctrl+C` o equivalente.
4. Mostrar confirmación temporal mediante `aria-live`.
5. No cambiar el texto del correo ni ocultarlo tras un icono.

## Navegación rápida

- Mantener navegación multipágina estándar.
- Activar la precarga oficial de Astro para enlaces internos relevantes.
- No introducir `ClientRouter` en v1 para evitar reejecución compleja de scripts de modales y menú.
- Las animaciones de entrada deben ser CSS y progresivas; la navegación seguirá funcionando sin JavaScript.
