# Estrategia de validación

## Scripts requeridos

El `package.json` debe incluir equivalentes a:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "format": "prettier . --write",
    "format:check": "prettier . --check",
    "test:e2e": "playwright test",
    "test": "npm run format:check && npm run check && npm run build && npm run test:e2e"
  }
}
```

## Pruebas E2E mínimas

### Inicio

- El `h1` muestra `Daniel García Ortega`.
- El enlace de proyectos navega a la ruta correcta con base.
- El botón “Sobre mí” abre el diálogo.
- Escape cierra el diálogo.
- El foco vuelve al botón de apertura.
- Cada proyecto destacado abre el modal correcto.
- Los enlaces de demo/código solo aparecen cuando tienen URL.
- El botón de CV navega a `/cv/` bajo la ruta base.
- El correo es visible.
- El botón copiar muestra confirmación.

### Proyectos

- Se muestran los tres proyectos iniciales.
- Cada tarjeta abre el contenido correcto.
- No existen enlaces `#`.
- Los CTAs inexistentes no se renderizan.

### Menú móvil

- Abre y cierra.
- Actualiza `aria-expanded`.
- Cierra con Escape.
- No produce scroll horizontal.

### CV

- La ruta carga.
- Los estilos y activos del CV cargan sin 404.
- El control de exportación existe.
- La función de exportación se prueba manualmente; si es posible automatizarla de forma estable, añadir prueba.

## Accesibilidad automatizada

Usar `@axe-core/playwright` para errores detectables en los estados principales. No ignorar reglas sin justificarlo en código.

## Pruebas visuales

Generar capturas con Playwright al menos en:

- 390 x 844;
- 768 x 1024;
- 1440 x 900;
- 1920 x 1080.

Capturas requeridas:

- inicio;
- inicio con modal de proyecto;
- página de proyectos;
- menú móvil abierto.

Las capturas de referencia deben generarse en un entorno consistente. No actualizar snapshots automáticamente para ocultar regresiones.

## Comprobación de rutas base

El entorno de prueba debe poder simular `base: '/NOMBRE_REPO'`.

Comprobar que no existen 404 en:

- CSS;
- scripts;
- imágenes;
- favicon;
- Open Graph;
- enlaces internos;
- `/proyectos/`;
- `/cv/`;
- 404.

## Criterios de rendimiento

No fijar una puntuación Lighthouse como único criterio, porque puede variar por entorno. Como objetivo orientativo en ejecución local estable:

- Performance >= 90.
- Accessibility >= 95.
- Best Practices >= 95.
- SEO >= 90.

Lo obligatorio es no tener errores funcionales, scripts de terceros innecesarios, imágenes sin dimensiones ni recursos rotos.
