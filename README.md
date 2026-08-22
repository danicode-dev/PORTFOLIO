# Portfolio de Daniel García Ortega

Portfolio profesional de Daniel García Ortega, estudiante de 2º curso de Desarrollo de Aplicaciones Web en el Instituto FOC (Granada), en búsqueda de empresa para las prácticas del ciclo.

🔗 **[danicode-dev.github.io/PORTFOLIO](https://danicode-dev.github.io/PORTFOLIO/)**

## Sobre el proyecto

Sitio estático multipágina construido con **Astro 7**, **TypeScript** en modo estricto y **Tailwind CSS 4**, sin frameworks de cliente. Todo el contenido (perfil, proyectos, formación, experiencia) vive en datos tipados dentro de `src/data/`, por lo que actualizar texto o enlaces no requiere tocar componentes.

Incluye:

- Portada con presentación, proyectos destacados, tecnologías, formación y experiencia.
- `/proyectos/`, con los tres proyectos desarrollados hasta ahora y su detalle en modal.
- `/cv/`, el currículum en HTML con descarga directa en PDF.
- Modales de "Sobre mí" y "Contacto" con copia de correo al portapapeles.
- Menú y navegación totalmente responsive, sin navegación inferior móvil.

## Requisitos y arranque

- Node.js 22.12 o posterior (Node 24 en CI).
- npm 11.

```bash
npm ci
npm run dev
```

La app se sirve por defecto en `http://localhost:4321/`.

## Comandos

```bash
npm run dev              # servidor de desarrollo
npm run optimize:assets  # regenerar imágenes optimizadas desde input/
npm run export:cv        # regenerar el PDF del CV desde su HTML
npm run format:check     # comprobar formato (Prettier)
npm run check            # validar tipos y Astro
npm run build            # compilar a dist/
npm run test:e2e         # Playwright + axe + capturas responsive
npm test                 # cadena completa: formato, tipos, build y E2E
```

## Estructura

```
src/
  data/           # contenido tipado: perfil, proyectos, tecnologías, enlaces
  components/     # UI reutilizable (header, footer, diálogos, tarjetas)
  layouts/        # BaseLayout con head, header y footer comunes
  pages/          # rutas: inicio, /proyectos/, 404
  styles/         # global.css
  scripts/        # diálogos, menú móvil, portapapeles, animaciones de scroll
public/
  cv/             # CV en HTML/CSS/PDF, servido directamente
  images/         # activos optimizados (generados, no editar a mano)
input/            # fuentes originales de las imágenes optimizadas
scripts/          # optimize-assets.mjs, export-cv.mjs
tests/            # Playwright: funcional, accesibilidad y visual
```

Todas las rutas internas pasan por `src/utils/paths.ts` y respetan `import.meta.env.BASE_URL`, por lo que el sitio funciona igual en local (`/`) que en GitHub Pages (`/PORTFOLIO/`).

## Activos

Las imágenes publicadas en `public/images/` se generan desde `input/` con `npm run optimize:assets` (usa [sharp](https://sharp.pixelplumbing.com/)). No se editan a mano: para cambiar una imagen, se sustituye la fuente en `input/` y se regenera.

## Despliegue

El sitio se publica en GitHub Pages mediante [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml), que en cada push a `main`:

1. ejecuta `npm test` (formato, tipos, build y toda la suite E2E/accesibilidad);
2. compila el sitio con `withastro/action`;
3. lo publica con `actions/deploy-pages`.

`astro.config.mjs` infiere automáticamente el dominio y la ruta base desde `GITHUB_REPOSITORY` en Actions, así que no hace falta configurar nada manualmente para publicar en un repositorio distinto.

## Licencia

Uso personal — código y contenido de Daniel García Ortega.
