# Informe de implementación y validación

Última actualización local: 3 de agosto de 2026  
Workspace: `C:\Users\danga\Desktop\PORTFOLIO`  
Estado: implementación local completada; publicación remota bloqueada de forma explícita.

## Resultado

Se ha implementado el portfolio estático solicitado con Astro 7, TypeScript estricto y Tailwind CSS 4, sin React ni otro framework cliente. Incluye una portada compacta, proyectos, diálogos nativos, navegación responsive, 404, metadatos, activos optimizados, CV HTML original, pruebas automatizadas y workflow de GitHub Pages.

La revisión del 3 de agosto compactó la portada para que entre completa en tablet y escritorio, redujo el nombre a dos líneas, dejó únicamente DAW y la experiencia de prácticas en el resumen, ordenó los proyectos como `AL-LÍO`, `SIDN Cost Control` y `Feedback2Action`, retiró numeración y reconocimientos visibles, y centró los diálogos en ambos ejes. Cada imagen válida de proyecto puede abrirse a tamaño completo.

La última revisión retiró “Tecnologías” del menú, convirtió la franja inferior en un resumen con logo y nombre, redujo `/proyectos/` al listado sin introducción ni bloque de contacto e incorporó al CV una descarga PDF A4 directa. El HTML y el PDF del CV quedaron sincronizados con la grafía `AL-LÍO` y el mismo orden de proyectos que el portfolio.

La web principal oculta correo, LinkedIn, disponibilidad, roles y CTAs no confirmados. El CV integrado conserva sus datos y enlaces originales, tal como exige la especificación; por ese motivo, y por la ausencia de remoto, el job `deploy` solo se ejecutará cuando la variable de repositorio `PUBLICATION_APPROVED` sea exactamente `true`.

## Archivos creados o modificados

Todo el proyecto de implementación era nuevo porque el workspace inicial no contenía un repositorio ni una aplicación. `portfolio-codex-pack-v1/` se conservó sin cambios. En `input/cv/` solo se añadieron las mejoras solicitadas al código fuente original y una exportación PDF nueva; no se reconstruyó el CV.

### Auditoría y documentación

- `AUDIT_REPORT.md`
- `AUDIT_BLOCKERS.md`
- `README.md`
- `IMPLEMENTATION_REPORT.md`
- `AGENTS.md`
- `.env.example`
- 18 evidencias en `docs/screenshots/` para 390 × 844, 768 × 1024, 1440 × 900 y 1920 × 1080, incluido el CV.

### Configuración y automatización

- `package.json` y `package-lock.json`
- `astro.config.mjs`
- `tsconfig.json`
- `playwright.config.ts`
- `.prettierrc.mjs`, `.prettierignore` y `.gitignore`
- `.github/workflows/deploy.yml`
- `scripts/optimize-assets.mjs`
- `scripts/serve-e2e.mjs`
- `scripts/export-cv.mjs`

### Aplicación

- 34 archivos bajo `src/`: layout base, cabecera, pie, portada compacta, resumen profesional, tarjetas y diálogos de proyectos, diálogo Sobre mí, utilidades de rutas, datos tipados, mapa de logos, scripts progresivos, estilos y las rutas `/`, `/proyectos/` y 404.
- 31 archivos bajo `public/`: favicon, robots, Open Graph, fotografías, logos optimizados y los 10 archivos publicables del CV, incluido el PDF.
- 3 archivos bajo `tests/`: funcionalidad/rutas, accesibilidad axe y capturas visuales.

### Cambios mínimos del CV

`public/cv/` procede directamente de `input/cv/`. No se reconstruyó desde PDF o capturas. Se aplicaron cambios acotados: retorno al portfolio, descarga directa, impresión sin handler inline en la copia pública, adaptación de las acciones a móvil, grafía `AL-LÍO` y orden coherente de proyectos. `npm run export:cv` genera un PDF A4 de una página desde ese mismo HTML y conserva una copia de trabajo en `input/cv/output/pdf/`.

## Comandos principales ejecutados

### Auditoría e inicialización

```text
git rev-parse --show-toplevel
git status --short --branch
git branch --show-current
git remote -v
rg --files
git init -b main
npm create astro@latest . -- --template minimal --install --no-git --yes
```

El generador de Astro detectó la raíz no vacía y creó una carpeta temporal; se trasladó fuera del workspace y la implementación se realizó en la raíz correcta. Git quedó inicializado localmente en `main`, sin commits ni remoto.

### Instalación y activos

```text
npm install
npx playwright install chromium
npm run optimize:assets
npm ci
npm audit --audit-level=high
```

La instalación reproducible añadió 305 paquetes y auditó 306. Resultado de seguridad: `found 0 vulnerabilities`.

### Calidad y navegador

```text
npm run format
npm run export:cv
npm test
git diff --check
playwright_cli.sh open http://127.0.0.1:4321/PORTFOLIO/
playwright_cli.sh snapshot
playwright_cli.sh click <referencia>
playwright_cli.sh console error
playwright_cli.sh goto http://127.0.0.1:4321/PORTFOLIO/cv/
pdfinfo public/cv/CV-Daniel-Garcia-Ortega.pdf
pdftoppm -png public/cv/CV-Daniel-Garcia-Ortega.pdf <salida-temporal>
```

Resultado final de `npm test`, ejecutado después de `npm ci`:

- Prettier: todos los archivos conformes.
- `astro check`: 42 archivos, 0 errores, 0 advertencias y 0 indicaciones.
- `astro build`: salida estática, 3 páginas Astro generadas, build correcto en 1,74 s.
- Playwright/Chromium: 19 de 19 pruebas superadas en 58,9 s.
- axe: sin violaciones automatizadas en inicio, proyectos, Sobre mí, modal de proyecto y menú móvil.
- Consola en comprobación manual: 0 errores y 0 advertencias.
- `git diff --check`: sin errores de espacios.

Una ejecución intermedia detectó que el servidor E2E etiquetaba el PDF como `application/octet-stream`; se añadió el MIME `application/pdf` y se repitió la cadena completa con resultado correcto. El PDF final tiene una página A4, no está cifrado y sus dos copias tienen SHA-256 `D2AECA6F909FE308244E1CC65BAE29351FA42F8B372273EE75E986B10801191B`.

## Rutas y estados comprobados

Las pruebas levantan el build con la base realista `/PORTFOLIO/`:

| Ruta o estado                  | Resultado                                                                    |
| ------------------------------ | ---------------------------------------------------------------------------- |
| `/PORTFOLIO/`                  | 200; navegación, hero y secciones correctas                                  |
| `/PORTFOLIO/proyectos/`        | 200; tres proyectos, diálogos y CTAs derivados de datos                      |
| `/PORTFOLIO/cv/`               | 200; diez recursos locales, retorno, descarga PDF e impresión correctos      |
| `/PORTFOLIO/ruta-inexistente/` | estado 404 y página personalizada visible                                    |
| Modales                        | apertura, Escape, cierre y restauración de foco comprobados                  |
| Posición de modales            | centrado horizontal y vertical comprobado tras la transición                 |
| Menú móvil                     | apertura, Escape, `aria-expanded` y restauración de foco comprobados         |
| Contacto principal             | sin correo ni LinkedIn no confirmados                                        |
| Enlaces falsos                 | sin `href="#"` ni valores `PENDING_*` en las páginas generadas del portfolio |
| Portada 768–1920 px            | sin desplazamiento vertical                                                  |

No se detectó desbordamiento horizontal en 360 × 800, 390 × 844, 430 × 932, 768 × 1024, 1024 × 768, 1280 × 800, 1440 × 900 y 1920 × 1080.

Artefactos comprobados:

- `dist/index.html`
- `dist/proyectos/index.html`
- `dist/cv/index.html`
- `dist/cv/CV-Daniel-Garcia-Ortega.pdf`
- `dist/404.html`
- `public/og-image.webp`
- `docs/screenshots/`
- `output/playwright/manual-about-dialog.png`

## Estado Git y despliegue

- Estado inicial: no existía `.git`.
- Estado final: repositorio local inicializado, rama `main`, todavía sin commits.
- Remoto: ninguno configurado.
- Workflow: preparado con validación previa, build oficial de Astro y despliegue de Pages.
- Publicación: no ejecutada ni declarada como completada.

## Pendientes reales

1. Confirmar cuál de los dos correos detectados será el correo público definitivo.
2. Confirmar la URL definitiva de LinkedIn.
3. Confirmar o crear el repositorio de destino y configurar su remoto.
4. Solo entonces, actualizar los datos públicos, revisar el CV original, configurar Pages y crear `PUBLICATION_APPROVED=true`.

La disponibilidad, los roles individuales y las URLs opcionales no confirmadas no bloquean el código: sus acciones permanecen ocultas.

Las cuatro capturas aportadas el 3 de agosto se usaron como referencias de composición y para identificar los fallos de modal y pie. No se publicaron como capturas de proyecto porque contienen anotaciones o proyectos ajenos y no son activos reales de `AL-LÍO`, SIDN Cost Control o Feedback2Action.
