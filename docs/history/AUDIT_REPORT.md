# Informe de auditoría inicial

Fecha de auditoría: 2 de agosto de 2026  
Directorio auditado: `C:\Users\danga\Desktop\PORTFOLIO`

Actualización del 3 de agosto de 2026: a petición expresa del usuario, el PDF final dejó de ser un histórico ignorado. Se verificó visualmente, se regeneró desde el HTML original actualizado y se publicó como `public/cv/CV-Daniel-Garcia-Ortega.pdf`; la fuente reproducible quedó en `input/cv/output/pdf/cv-daniel-garcia-ortega-portfolio.pdf`.

## Resumen ejecutivo

- La raíz de trabajo contiene únicamente `input/` y el paquete documental `portfolio-codex-pack-v1/`; todavía no existe un proyecto Astro ni un `package.json`.
- La raíz de trabajo no es un repositorio Git y no existe ningún directorio `.git` dentro del workspace. Por tanto, no hay rama actual ni remoto configurado que permita confirmar el nombre del repositorio, `site` o `base` de GitHub Pages.
- El código fuente original del CV sí está disponible directamente en `input/cv/`. No hace falta ni debe esperarse `cv-source.zip`.
- `input/cv/index.html`, `input/cv/styles.css` y los ocho recursos locales que referencian existen. La exportación se implementa con `window.print()` y dos listeners inline de `beforeprint`/`afterprint`.
- La fotografía principal confirmada `input/png/profile-main.jpg` es válida, tiene 6000 × 4000 px y muestra a Daniel presentando un proyecto.
- No hay capturas reales de interfaz de los tres proyectos. Sí hay identidades válidas para Al-Lío y Feedback2Action y una insignia inequívoca del premio de Gen AI Arena.
- Faltan tres confirmaciones obligatorias para publicar: correo público, LinkedIn definitivo y repositorio/remoto de destino. La disponibilidad y los roles/URLs opcionales se ocultarán mientras no estén confirmados.

## Fuentes leídas

Se han leído íntegramente:

1. `portfolio-codex-pack-v1/AGENTS.md`.
2. `portfolio-codex-pack-v1/START_PROMPT(1).md` (nombre real encontrado; no existe `START_PROMPT.md`).
3. `portfolio-codex-pack-v1/README.md` y `MANIFEST.md`.
4. Todos los documentos de `portfolio-codex-pack-v1/docs/` en el orden fijado por el README: `context.md`, `product.md`, `content.md`, `brand.md`, `ux.md`, `architecture.md`, `data.md`, `accessibility.md`, `tests.md`, `deploy.md`, `acceptance.md`, `assets.md`, `pending.md`, `tasks.md` y `sources.md`.
5. `input/cv/README.md`, `input/cv/index.html`, `input/cv/styles.css`, los scripts inline y todas las referencias de activos del CV.

## Estado de Git

- `git rev-parse --show-toplevel`: falla con `not a git repository`.
- `git status --short --branch`: falla por ausencia de repositorio.
- `git branch --show-current`: no existe rama actual.
- `git remote -v`: no existe remoto configurado.
- Búsqueda recursiva de `.git`: sin resultados.

No puede deducirse de forma segura que el destino real sea `danicode-dev/PORTFOLIO` solo porque el portfolio anterior use esa URL.

## Archivos encontrados

### Raíz

- `input/`
- `portfolio-codex-pack-v1/`
- No había archivos sueltos en la raíz antes de crear este informe.

### Paquete documental

- `portfolio-codex-pack-v1/AGENTS.md`
- `portfolio-codex-pack-v1/MANIFEST.md`
- `portfolio-codex-pack-v1/README.md`
- `portfolio-codex-pack-v1/START_PROMPT(1).md`
- `portfolio-codex-pack-v1/docs/acceptance.md`
- `portfolio-codex-pack-v1/docs/accessibility.md`
- `portfolio-codex-pack-v1/docs/architecture.md`
- `portfolio-codex-pack-v1/docs/assets.md`
- `portfolio-codex-pack-v1/docs/brand.md`
- `portfolio-codex-pack-v1/docs/content.md`
- `portfolio-codex-pack-v1/docs/context.md`
- `portfolio-codex-pack-v1/docs/data.md`
- `portfolio-codex-pack-v1/docs/deploy.md`
- `portfolio-codex-pack-v1/docs/pending.md`
- `portfolio-codex-pack-v1/docs/product.md`
- `portfolio-codex-pack-v1/docs/sources.md`
- `portfolio-codex-pack-v1/docs/tasks.md`
- `portfolio-codex-pack-v1/docs/tests.md`
- `portfolio-codex-pack-v1/docs/ux.md`

### `input/png/`

| Archivo                              |      Tamaño | Dimensiones | Resultado de auditoría                                                                          |
| ------------------------------------ | ----------: | ----------: | ----------------------------------------------------------------------------------------------- |
| `500x500.jpg`                        |    22.312 B |   500 × 500 | Logo de Alcampo; asignación confirmada por el HTML del CV.                                      |
| `al_lio_favicon_transparent_512.png` |    72.149 B |   512 × 512 | Identidad de Al-Lío; válido.                                                                    |
| `al_lio_symbol_transparent.png`      |    38.608 B |   197 × 185 | Símbolo de Al-Lío; válido.                                                                      |
| `ejemploaseguir.png`                 | 1.432.926 B | 1122 × 1402 | Referencia visual; no copiar a producción como proyecto.                                        |
| `feedback2action-logo.png`           |    42.206 B |   320 × 226 | Identidad de Feedback2Action; válido.                                                           |
| `FOTO CARNET.jpg`                    | 1.106.374 B | 2152 × 2553 | Foto usada por el CV; válida solo para conservar el CV.                                         |
| `gen-ai-arena-winner.png`            |   354.589 B | 1536 × 1536 | Insignia “Ganador I Edición Hackathon”; significado inequívoco y válido para SIDN Cost Control. |
| `images.jpg`                         |     4.132 B |   225 × 225 | Logo de Konecta; asignación confirmada por el HTML del CV.                                      |
| `profile-main.jpg`                   | 4.163.418 B | 6000 × 4000 | Fotografía principal confirmada para el portfolio; válida y requiere optimización.              |

### Código fuente principal de `input/cv/`

- `index.html` — 20.478 B; fuente principal.
- `styles.css` — 17.172 B; hoja principal.
- `README.md` — 10.877 B; describe el proyecto SIDN Cost Control, no el CV, por lo que no se copiará a producción.
- `FOTO CARNET.jpg`, `al_lio_symbol_transparent.png`, `feedback2action-logo.png`, `gen-ai-arena-winner.png`, `salunox-logo.svg`, `images.jpg` y `500x500.jpg` — todos referenciados y presentes.
- `al_lio_favicon_transparent_512.png`, `ejemploaseguir.png` y `nuevafoto.png` — no referenciados por el CV actual.
- `index.backup-before-redesign.html` y `styles.backup-before-redesign.css` — históricos.
- `img/Gemini_Generated_Image_c0k1b8c0k1b8c0k1.png` — imagen generada con texto superpuesto; no referenciada.

### Material histórico de `input/cv/`

- `.playwright-mcp/`: 5 archivos de logs/YAML, 40.053 B.
- `output/pdf/`: dos PDFs, un render PNG y un render adicional en `output/pdf/rendered/`; material de salida, no fuente.
- `output/playwright/`: 35 capturas, HTML y PDFs de iteraciones, 16.380.289 B.
- Backups HTML/CSS ya indicados.

El inventario completo de archivos históricos se conserva en `input/`, pero no se copiará automáticamente a `public/cv/`.

## Activos válidos y destino previsto

| Origen                                                                           | Uso seguro previsto                                                                                     |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `input/png/profile-main.jpg`                                                     | Hero del portfolio, optimizada a formatos y tamaños web.                                                |
| `input/png/al_lio_favicon_transparent_512.png` o `al_lio_symbol_transparent.png` | Identidad del proyecto Al-Lío.                                                                          |
| `input/png/feedback2action-logo.png`                                             | Identidad del proyecto Feedback2Action.                                                                 |
| `input/png/gen-ai-arena-winner.png`                                              | Recurso del reconocimiento de SIDN Cost Control.                                                        |
| `input/cv/salunox-logo.svg`                                                      | Logo de Salunox.                                                                                        |
| `input/png/images.jpg`                                                           | Logo de Konecta, renombrado de forma descriptiva.                                                       |
| `input/png/500x500.jpg`                                                          | Logo de Alcampo, renombrado de forma descriptiva.                                                       |
| `input/cv/index.html`, `styles.css` y los ocho recursos locales referenciados    | Aplicación estática autocontenida en `public/cv/`, con cambios mínimos de rutas/navegación/exportación. |

Los archivos duplicados entre `input/png/` e `input/cv/` tienen hashes SHA-256 idénticos. Se conservará una sola copia de cada recurso en cada destino funcional necesario.

## Archivos que deben ignorarse en producción

- Todo `input/cv/.playwright-mcp/`.
- Todo `input/cv/output/`, excepto `output/pdf/cv-daniel-garcia-ortega-portfolio.pdf`, generado de forma reproducible para la descarga solicitada.
- `input/cv/index.backup-before-redesign.html`.
- `input/cv/styles.backup-before-redesign.css`.
- `input/cv/README.md`, porque corresponde a SIDN Cost Control y no documenta el CV.
- `input/cv/ejemploaseguir.png` y `input/png/ejemploaseguir.png` como activo público; se usan solo como referencia.
- `input/cv/nuevafoto.png`, porque no es la foto principal confirmada y presenta apariencia generada/retocada.
- `input/cv/img/Gemini_Generated_Image_c0k1b8c0k1b8c0k1.png`, porque es una imagen generada, no referenciada y contiene texto decorativo.
- Duplicados no referenciados de imágenes ya presentes en `input/png/`.
- PDFs y capturas renderizadas históricas, salvo la exportación final nueva identificada en la excepción anterior.

## Referencias del CV y estado

Referencias locales comprobadas:

- `styles.css`: presente.
- `FOTO CARNET.jpg`: presente.
- `al_lio_symbol_transparent.png`: presente.
- `feedback2action-logo.png`: presente.
- `gen-ai-arena-winner.png`: presente.
- `salunox-logo.svg`: presente.
- `images.jpg`: presente.
- `500x500.jpg`: presente.

Referencias externas actuales del CV:

- Google Fonts (`Inter`).
- Font Awesome 6.5.1 desde cdnjs.

Estas referencias no son archivos faltantes, pero hacen que el CV no sea totalmente autocontenido sin conexión. Se conservará su aspecto y solo se sustituirán si puede hacerse con un cambio mínimo y verificable.

## Datos confirmados

- Nombre: Daniel García Ortega.
- Marca: `DGO.`.
- Cargo: Desarrollador web full-stack.
- Ubicación pública: Granada, España.
- GitHub: `https://github.com/danicode-dev`.
- Portfolio anterior: `https://danicode-dev.github.io/PORTFOLIO/`.
- Textos de hero y “Sobre mí” fijados en la documentación.
- Tres proyectos y sus descripciones/tecnologías según `docs/content.md`.
- Repositorio y demo de Al-Lío.
- Métricas documentadas de Feedback2Action.
- Premio de SIDN Cost Control.
- Experiencia, formación, idiomas y stack documentados.
- El repositorio de Feedback2Action es privado; no se mostrará CTA de código.
- Los datos privados excluidos de la web principal son teléfono, discapacidad, carné y vehículo.

## Datos pendientes y tratamiento seguro

| Dato                                   | Estado                                                                | Tratamiento durante la implementación                                                                                 |
| -------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Correo público definitivo              | Obligatorio para publicar; existen dos valores distintos.             | No inventar ni elegir. El bloque de contacto se prepara, pero el CTA de correo no se publica con un valor arbitrario. |
| LinkedIn definitivo                    | URL detectada en el CV/portfolio anterior, pendiente de confirmación. | Ocultar la acción hasta confirmar.                                                                                    |
| Repositorio/remoto de destino          | No existe Git ni remoto local.                                        | Configuración parametrizable y build local seguro; no declarar despliegue publicado.                                  |
| Disponibilidad pública                 | No confirmada.                                                        | Ocultar el estado del hero y modal.                                                                                   |
| Rol personal en Feedback2Action y SIDN | No confirmado.                                                        | Omitir el campo.                                                                                                      |
| Demo/código de Feedback2Action y SIDN  | No confirmados o privados.                                            | Omitir CTAs.                                                                                                          |
| Capturas reales de los proyectos       | No aportadas.                                                         | Usar solo identidades válidas; no generar ni inventar capturas.                                                       |

## Bloqueos reales

1. Correo público definitivo sin confirmar.
2. LinkedIn definitivo sin confirmar.
3. Ausencia de repositorio Git, rama y remoto, por lo que no pueden confirmarse el nombre del repositorio, la ruta `base`, la URL final de Pages ni ejecutarse/publicarse un workflow real.

El código fuente del CV no es un bloqueo: existe completo en carpeta y todas sus dependencias locales referenciadas están presentes. Los demás pendientes son opcionales y su interfaz se ocultará.

## Dirección de implementación

### Tesis visual

Portfolio editorial cálido y sobrio, con el retrato documental de Daniel como ancla, tipografía azul marino de alta jerarquía y detalles bronze/terracota que conectan visualmente con el CV.

### Plan de contenido

1. Hero: identidad, propuesta profesional y CTAs disponibles, con fotografía principal.
2. Apoyo: tres proyectos destacados con identidad visual y evidencia confirmada.
3. Detalle: tecnologías, formación y experiencia en una secuencia editorial escaneable.
4. Cierre: contacto y redes, mostrando únicamente acciones confirmadas.

### Tesis de interacción

- Entrada inicial breve mediante CSS: etiqueta, nombre, texto y acciones aparecen en secuencia.
- Revelado discreto de secciones al entrar en viewport, con fallback visible sin JavaScript y respeto de `prefers-reduced-motion`.
- Estados hover/focus coherentes y desplazamientos de 2–4 px en proyectos; diálogos y menú usan transiciones cortas sin librería de animación.

## Plan de ejecución

1. Crear el archivo único de bloqueos obligatorios y conservar la documentación de entrada.
2. Verificar versiones y sintaxis actuales en documentación oficial.
3. Inicializar Astro estático con TypeScript estricto, Tailwind CSS 4 mediante Vite, Prettier, `astro check`, Playwright y axe.
4. Crear sistema base: rutas con `BASE_URL`, tokens, layout, metadatos, datos tipados y componentes mínimos.
5. Implementar cabecera, navegación multipágina y menú móvil accesible.
6. Implementar inicio completo y página `/proyectos/` reutilizando datos.
7. Implementar `<dialog>` nativo para “Sobre mí” y proyectos, con restauración de foco.
8. Integrar el CV original en `public/cv/` copiando solo los archivos necesarios y añadiendo retorno al portfolio con cambios mínimos.
9. Implementar el bloque de contacto preparado para activarse con un correo confirmado; no exponer ningún correo arbitrario.
10. Añadir 404, metadatos, favicon, Open Graph local y workflow de Pages parametrizado/documentado, sin afirmar que existe un despliegue.
11. Ejecutar formato, tipos, build, E2E, axe, rutas/404, capturas responsive y prueba de exportación del CV.
12. Actualizar README y documentación final con resultados exactos y pendientes reales.
