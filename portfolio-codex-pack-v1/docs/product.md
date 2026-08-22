# Especificación de producto

## Usuario principal

Reclutador, responsable técnico, empresa o colaborador que necesita comprender en pocos segundos:

- quién es Daniel;
- qué tipo de desarrollo realiza;
- qué proyectos puede enseñar;
- qué tecnologías utiliza;
- qué experiencia y formación tiene;
- cómo contactar con él;
- cómo consultar o descargar su CV.

## Objetivo de conversión

La acción principal es que el visitante revise un proyecto, consulte el CV o copie el correo para contactar.

## Arquitectura de información

### Página principal `/`

1. Cabecera.
2. Hero con fotografía, disponibilidad, nombre, cargo y descripción.
3. Tres proyectos destacados.
4. Resumen de tecnologías.
5. Formación.
6. Experiencia.
7. Contacto y redes.
8. Footer.
9. Modal “Sobre mí”.
10. Modales breves de proyectos.

### Página `/proyectos/`

1. Cabecera común.
2. Introducción breve.
3. Rejilla/listado de proyectos.
4. Filtros solo si existen suficientes proyectos reales; no implementar filtros para tres elementos.
5. Modal breve para cada proyecto.
6. Contacto final.
7. Footer.

### Página `/cv/`

- Debe reutilizar el código fuente original del CV.
- Debe permitir verlo en navegador.
- Debe conservar el botón existente de exportación/descarga PDF.
- Debe tener una forma clara de volver al portfolio.

## Navegación

### Escritorio

- Logo/monograma a la izquierda.
- Enlaces: Inicio, Sobre mí, Proyectos, Tecnologías, Contacto.
- Botón destacado: Ver CV.
- Hover visible mediante subrayado o desplazamiento corto, sin animación exagerada.
- Cabecera fija o sticky con fondo ligeramente translúcido cuando haya scroll.

### Móvil

- Logo/monograma.
- Botón de menú con nombre accesible.
- Panel móvil superpuesto.
- Enlaces grandes, ordenados y táctiles.
- Cierre mediante botón, selección de enlace y tecla Escape.
- Bloqueo de scroll de fondo mientras el menú esté abierto.

## Comportamiento de enlaces

- `Sobre mí`: abre modal; no navega a otra página.
- `Proyectos`: navega a `/proyectos/`.
- `Tecnologías`: desplaza a la sección correspondiente en inicio; desde otra página navega al ancla del inicio.
- `Contacto`: desplaza al bloque de contacto.
- `Ver CV`: navega a `/cv/`.
- GitHub, LinkedIn, demos y repositorios: enlaces externos con `target="_blank"` y `rel="noopener noreferrer"`.

## Contacto

No se implementará un formulario de envío. El bloque tendrá:

- correo visible en un control seleccionable o texto claramente seleccionable;
- botón “Copiar correo”;
- estado accesible “Correo copiado” mediante `aria-live`;
- fallback que seleccione el correo y muestre instrucciones si la API de portapapeles falla;
- enlace secundario `mailto:` “Abrir aplicación de correo”.

## Reglas para proyectos

- La tarjeta completa no debe ser un `<a>` si contiene varios botones; usar un botón de apertura de modal bien definido.
- El modal debe ser breve y escaneable.
- No mostrar una acción si falta su URL real.
- No enlazar repositorios privados como si fueran públicos.
- No mostrar métricas no confirmadas.
