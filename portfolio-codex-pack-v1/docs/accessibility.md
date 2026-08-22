# Accesibilidad

## Objetivo

Cumplir buenas prácticas equivalentes a WCAG 2.2 AA en el alcance de la interfaz, sin afirmar certificación formal.

## Requisitos generales

- HTML semántico.
- Orden lógico de encabezados.
- Un `h1` por página.
- Navegación completa por teclado.
- Controles nativos (`button`, `a`, `dialog`) en lugar de `div` interactivos.
- Contraste suficiente de texto, bordes y estados de foco.
- Texto alternativo útil en imágenes informativas.
- `alt=""` en imágenes decorativas.
- No depender solo del color para comunicar estados.
- Áreas táctiles mínimas aproximadas de 44 x 44 px.
- Respetar zoom al 200 % sin pérdida funcional.
- Sin scroll horizontal a 320 px salvo elementos que lo requieran expresamente.
- Respetar `prefers-reduced-motion`.

## Modales

- Usar `<dialog>` nativo.
- Abrir con `showModal()`.
- No añadir `tabindex` al elemento `<dialog>`.
- Asociar título mediante `aria-labelledby` cuando sea necesario.
- Incluir botón de cierre explícito.
- Mantener cierre con Escape.
- Definir foco inicial lógico, preferentemente en el botón de cierre si no existe una acción más importante.
- Restaurar el foco al disparador al cerrar.
- No abrir dos diálogos simultáneamente.

## Menú móvil

- Botón real con nombre accesible.
- `aria-expanded` actualizado.
- Panel identificado con `aria-controls`.
- Foco visible en todos los enlaces.
- Cierre con Escape.

## Copiado del correo

- El correo sigue visible aunque JavaScript falle.
- El estado de éxito se comunica con `aria-live="polite"`.
- El botón tiene un nombre accesible explícito.
- No eliminar la selección manual como fallback.

## Imágenes

Ejemplos de `alt`:

- Perfil: `Daniel García Ortega presentando un proyecto`.
- Al-Lío: `Panel principal de Al-Lío con tareas, calendario y oportunidades`.
- Logo de empresa decorativo junto a su nombre textual: `alt=""`.

## Pruebas manuales obligatorias

1. Recorrer toda la web solo con Tab, Shift+Tab, Enter, Espacio y Escape.
2. Abrir y cerrar cada modal.
3. Abrir y cerrar el menú móvil.
4. Copiar el correo y probar el fallback.
5. Activar reducción de movimiento.
6. Aumentar zoom a 200 %.
7. Revisar contraste de estados hover y focus.
8. Comprobar que los lectores de pantalla reciben nombres claros en botones y enlaces.

## Pruebas automatizadas

Playwright + `@axe-core/playwright` debe revisar como mínimo:

- `/`;
- `/proyectos/`;
- modal “Sobre mí” abierto;
- un modal de proyecto abierto;
- menú móvil abierto.

Las pruebas automatizadas no sustituyen las revisiones manuales.
