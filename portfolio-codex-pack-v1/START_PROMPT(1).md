# Prompt maestro de implementación para Codex

## Rol y responsabilidad

Actúa como **ingeniero frontend principal y responsable técnico de la entrega**. Debes implementar el nuevo portfolio profesional de **Daniel García Ortega** con criterio de producción, evitando improvisaciones, dependencias innecesarias, contenido inventado y cambios fuera de alcance.

Tu trabajo no consiste en generar una demo rápida ni una maqueta aislada. Debes construir una primera versión pública, mantenible, accesible, responsive y desplegable en GitHub Pages, utilizando los documentos y activos existentes como única fuente de verdad.

Trabaja de forma autónoma dentro del alcance definido. No hagas preguntas sucesivas ni detengas el trabajo por detalles no bloqueantes. Cuando exista información realmente imprescindible que no pueda resolverse mediante los archivos, el repositorio Git o la documentación, agrupa todos los bloqueos en un único informe claro.

---

## 1. Objetivo del producto

Construir un portfolio personal para reclutadores, responsables técnicos, empresas y colaboradores que permita comprender con rapidez:

- quién es Daniel García Ortega;
- qué perfil profesional tiene;
- qué proyectos puede mostrar;
- qué tecnologías utiliza;
- qué experiencia y formación posee;
- cómo contactar con él;
- cómo visualizar y exportar su CV.

La web debe comunicar un perfil de **desarrollador web full-stack**, con experiencia en proyectos SaaS, frontend, integración de APIs, análisis de datos y desarrollo de productos digitales.

Las acciones de conversión principales son:

1. abrir un proyecto destacado;
2. consultar el CV;
3. copiar el correo o abrir la aplicación de correo;
4. visitar GitHub o LinkedIn.

---

## 2. Contexto de trabajo y estructura actual

El directorio de trabajo actual es el repositorio local del portfolio. Antes de modificar nada, inspecciona la estructura real con comandos del sistema y con Git.

La estructura aportada por el usuario es equivalente a:

```text
PORTFOLIO/
├── input/
│   ├── cv/
│   │   ├── index.html
│   │   ├── styles.css
│   │   ├── README.md
│   │   ├── img/
│   │   ├── output/
│   │   ├── .playwright-mcp/
│   │   ├── index.backup-before-redesign.html
│   │   ├── styles.backup-before-redesign.css
│   │   ├── 500x500.jpg
│   │   ├── al_lio_favicon_transparent_512.png
│   │   ├── al_lio_symbol_transparent.png
│   │   ├── ejemploaseguir.png
│   │   ├── feedback2action-logo.png
│   │   ├── FOTO CARNET.jpg
│   │   ├── gen-ai-arena-winner.png
│   │   ├── images.jpg
│   │   ├── nuevafoto.png
│   │   └── salunox-logo.svg
│   └── png/
│       ├── 500x500.jpg
│       ├── al_lio_favicon_transparent_512.png
│       ├── al_lio_symbol_transparent.png
│       ├── ejemploaseguir.png
│       ├── feedback2action-logo.png
│       ├── FOTO CARNET.jpg
│       ├── gen-ai-arena-winner.png
│       ├── images.jpg
│       └── profile-main.jpg
├── AGENTS.md
├── START_PROMPT.md
├── README.md
└── docs/
    ├── acceptance.md
    ├── accessibility.md
    ├── architecture.md
    ├── assets.md
    ├── brand.md
    ├── content.md
    ├── context.md
    ├── data.md
    ├── deploy.md
    ├── pending.md
    ├── product.md
    ├── sources.md
    ├── tasks.md
    ├── tests.md
    └── ux.md
```

Si `AGENTS.md`, `START_PROMPT.md` y `docs/` todavía están dentro de una carpeta llamada `portfolio-codex-pack-v1` o similar, trátala como documentación de entrada. No borres esa documentación. Para la implementación, asegúrate de que las reglas de `AGENTS.md` se leen y se respetan aunque el archivo no esté inicialmente en la raíz.

### Archivos del CV

La carpeta `input/cv/` ya es el **código fuente del CV**. No esperes un archivo `cv-source.zip` y no reconstruyas el CV a partir del PDF o de capturas.

Utiliza como fuente principal:

- `input/cv/index.html`;
- `input/cv/styles.css`;
- los recursos que el HTML y el CSS referencien realmente;
- los scripts inline o locales necesarios para la exportación PDF;
- la carpeta `input/cv/img/` cuando esté referenciada.

Los siguientes elementos son material de trabajo o histórico y no deben copiarse automáticamente a producción:

- `input/cv/.playwright-mcp/`;
- `input/cv/output/`;
- `index.backup-before-redesign.html`;
- `styles.backup-before-redesign.css`;
- capturas de iteraciones del CV;
- PDFs y renders duplicados que no sean necesarios para la funcionalidad final.

No alteres el aspecto del CV salvo los cambios mínimos necesarios para:

- corregir rutas bajo GitHub Pages;
- añadir una navegación clara para volver al portfolio;
- mantener o reparar la exportación PDF;
- eliminar recursos rotos;
- garantizar que funciona dentro de `public/cv/`.

### Activos visuales conocidos

- `input/png/profile-main.jpg`: fotografía principal prevista para el hero del portfolio.
- `input/png/ejemploaseguir.png`: referencia visual del diseño deseado; no es una captura de proyecto para producción.
- `al_lio_favicon_transparent_512.png` y `al_lio_symbol_transparent.png`: identidad visual de Al-Lío.
- `feedback2action-logo.png`: identidad visual de Feedback2Action.
- `gen-ai-arena-winner.png`: distintivo o recurso relacionado con el reconocimiento del hackathon; úsalo solo si su significado resulta inequívoco tras inspeccionarlo.
- `salunox-logo.svg`: logotipo de Salunox.
- `FOTO CARNET.jpg`, `nuevafoto.png` y `500x500.jpg`: inspecciona antes de usarlos; no sustituyas automáticamente `profile-main.jpg`.
- `images.jpg`: nombre ambiguo; inspecciónalo y no asumas qué empresa o proyecto representa.

No inventes el contenido de imágenes ambiguas. Si una imagen no puede asignarse con seguridad, déjala fuera y documenta el pendiente.

---

## 3. Orden obligatorio de lectura y precedencia

Antes de escribir código, lee completamente y en este orden:

1. `AGENTS.md`.
2. `docs/context.md`.
3. `docs/product.md`.
4. `docs/content.md`.
5. `docs/brand.md`.
6. `docs/ux.md`.
7. `docs/architecture.md`.
8. `docs/data.md`.
9. `docs/accessibility.md`.
10. `docs/tests.md`.
11. `docs/deploy.md`.
12. `docs/acceptance.md`.
13. `docs/assets.md`.
14. `docs/pending.md`.
15. `docs/tasks.md`.
16. `docs/sources.md`.
17. Este `START_PROMPT.md`.

Aplica esta precedencia cuando haya contradicciones:

1. decisiones explícitas de este prompt;
2. `AGENTS.md`;
3. datos confirmados en `docs/content.md` y `docs/data.md`;
4. especificaciones de producto, UX, arquitectura y marca;
5. activos reales del directorio `input/`;
6. información pendiente de `docs/pending.md`.

No conviertas un dato pendiente en un dato confirmado por deducción. No elijas entre dos correos distintos, dos enlaces distintos o dos fotografías ambiguas sin evidencia suficiente.

---

## 4. Auditoría inicial obligatoria

Antes de instalar dependencias o generar componentes:

1. Ejecuta `git status`, identifica la rama actual y consulta el remoto con `git remote -v`.
2. Determina si el repositorio remoto es `danicode-dev/PORTFOLIO`, otro repositorio o si todavía no existe remoto.
3. Lista los archivos de `input/` y comprueba los tipos reales de archivo.
4. Lee el HTML, CSS, scripts y README del CV.
5. Identifica todas las rutas referenciadas por el CV y confirma qué recursos son necesarios.
6. Inspecciona visualmente las fotografías, logotipos y capturas relevantes.
7. Contrasta los activos encontrados con `docs/assets.md` y `docs/pending.md`.
8. Comprueba si ya existe un proyecto Astro, un `package.json` o código previo que deba conservarse.
9. Comprueba si los valores públicos pendientes pueden resolverse mediante el remoto Git, archivos existentes o configuración real del proyecto.

### Regla para bloqueos

No detengas toda la implementación por datos opcionales como una demo inexistente, un repositorio privado o una imagen secundaria. En esos casos:

- usa `null` en los datos;
- oculta el CTA correspondiente;
- no uses enlaces falsos;
- documenta el pendiente.

Detente antes de publicar o declarar finalizada la tarea cuando falte un dato obligatorio, como:

- correo público definitivo;
- identidad de LinkedIn confirmada;
- configuración real del repositorio necesaria para `site` y `base`;
- archivos imprescindibles para que el CV funcione.

Si existen bloqueos obligatorios, crea un único archivo `AUDIT_BLOCKERS.md` que incluya todos ellos, junto con lo que sí puede implementarse sin riesgo. No preguntes los bloqueos uno por uno.

---

## 5. Decisiones de producto ya confirmadas

Estas decisiones no deben reinterpretarse:

- Framework: Astro.
- Lenguaje: TypeScript estricto.
- Estilos: Tailwind CSS 4 mediante el método oficial vigente.
- Salida: sitio estático.
- Hosting inicial: GitHub Pages.
- Repositorio público.
- Primera versión únicamente en español.
- Preparación estructural para añadir inglés en una fase posterior.
- Sin modo oscuro.
- Sin analítica.
- Sin cookies.
- Sin backend.
- Sin base de datos.
- Sin CMS.
- Sin formulario que envíe información.
- Sin blog.
- Sin páginas individuales extensas para proyectos.
- Página principal `/`.
- Página independiente `/proyectos/`.
- CV integrado en `/cv/`.
- Modal breve de “Sobre mí”.
- Modal breve de proyecto desde inicio y desde `/proyectos/`.
- Correo visible, seleccionable y copiable.
- Código del portfolio público.
- Despliegue en VPS y dominio propio quedan fuera de la primera fase.

No añadas funcionalidades “por si acaso”.

---

## 6. Contenido profesional que debe utilizarse

Centraliza todo el contenido en módulos TypeScript. Los componentes no deben repetir ni inventar datos.

### Identidad

- Nombre: `Daniel García Ortega`.
- Marca corta: `DGO.`.
- Cargo: `Desarrollador web full-stack`.
- Ubicación: `Granada, España`.
- GitHub: `https://github.com/danicode-dev`.
- Portfolio anterior: `https://danicode-dev.github.io/PORTFOLIO/`.

### Texto del hero

- Etiqueta: `DESARROLLADOR WEB FULL-STACK`.
- Título: `Daniel García Ortega`.
- Descripción: `Desarrollo aplicaciones web y productos digitales centrados en rendimiento, claridad y experiencia de usuario.`
- Estado propuesto: `Disponible para proyectos y oportunidades`.
- Acciones: `Ver proyectos`, `Contactar` y `Ver CV`.

La disponibilidad debe seguir la regla de confirmación de `docs/pending.md`. Si no puede confirmarse, no inventes otro estado.

### Sobre mí

Usa como base estos dos párrafos, sin extenderlos artificialmente:

> Soy Daniel García Ortega, desarrollador web full-stack en Granada. He trabajado en proyectos SaaS y aplicaciones web, tanto en frontend como en integración de APIs, principalmente con React, Angular, TypeScript, Python y FastAPI.

> Mi experiencia anterior en atención al cliente y ventas me ayuda a entender necesidades reales, comunicar soluciones con claridad y construir productos fáciles de utilizar.

Datos breves del modal:

- Ubicación: Granada, España.
- Enfoque: desarrollo web, productos SaaS e integración de APIs.
- Disponibilidad: solo si queda confirmada.

### Proyectos destacados

#### Al-Lío

- Tipo: proyecto personal.
- Estado: en desarrollo.
- Descripción breve: aplicación web personal para organizar tareas, calendario y oportunidades desde una única interfaz.
- Descripción modal: centraliza tareas, calendario, formación y oportunidades profesionales para reducir la fragmentación entre distintas herramientas.
- Rol: diseño de producto, arquitectura y desarrollo full-stack.
- Tecnologías confirmadas para el portfolio: Next.js, TypeScript y PostgreSQL.
- Repositorio: `https://github.com/danicode-dev/al-lio`.
- Demo: `https://al-lio.danielcode.dev`.
- No mostrar métricas.
- No añadir Supabase ni Google OAuth al resumen visible salvo que estén confirmados de acuerdo con la documentación del proyecto y no contradigan `docs/content.md`.

#### Feedback2Action

- Contexto: Granada Hackathon 2026.
- Descripción: análisis de 22.376 reseñas mediante Python y BigQuery, obteniendo 409 grupos de problemas y 108 acciones priorizadas con ayuda de Vertex AI.
- Tecnologías: Python, FastAPI, BigQuery y Vertex AI.
- Modal: explicar de forma breve que transforma feedback masivo en problemas agrupados y acciones priorizadas.
- El repositorio detectado es privado.
- No mostrar botón público de código mientras no exista una URL pública válida.
- No mostrar demo si no está confirmada.
- No inventar el rol personal de Daniel; dejarlo oculto o pendiente.

#### SIDN Cost Control

- Contexto: Granada Hackathon 2026.
- Reconocimiento: ganador de Granada Hackathon 2026.
- Descripción: aplicación desarrollada en equipo para controlar y comparar el gasto de campañas publicitarias.
- Backend: FastAPI y BigQuery.
- Panel: React y Vite.
- Tecnologías: Python, FastAPI, BigQuery, React y Vite.
- No mostrar código ni demo sin URL pública confirmada.
- No inventar el rol individual de Daniel.

### Experiencia

#### Salunox

- Periodo: 27 abril 2026 - 25 mayo 2026.
- Tipo: prácticas.
- Puesto: desarrollador web en prácticas.
- Contexto: plataforma SaaS sanitaria.
- Descripción: corrección de incidencias y validación de funcionalidades web y móviles relacionadas con pacientes, citas y notificaciones.
- Tecnologías: Angular, TypeScript, Laravel/PHP, Flutter/Dart, Firebase y REST APIs.

#### Konecta

- Periodo: 2023 - actualidad.
- Modalidad: teletrabajo.
- Función: venta telefónica y atención al cliente.
- Descripción: venta telefónica de servicios de energía, gestión de objeciones, resolución de consultas y seguimiento diario de objetivos comerciales.

#### Alcampo

- Periodo: 2017 - 2023.
- Modalidad: presencial.
- Función: atención al cliente.
- Descripción: atención al cliente en tienda, resolución de incidencias y apoyo en la operativa diaria junto al resto del equipo.

### Formación

- FP Grado Superior en Desarrollo de Aplicaciones Web, Instituto Fomento Ocupacional FOC, 2025 - actualidad.
- Técnico en Gestión Administrativa, Centro FP Jorbalán, 2015 - 2017.

### Idiomas

- Español: nativo.
- Inglés: intermedio.

### Stack confirmado

Frontend:

- React;
- Angular;
- TypeScript;
- JavaScript;
- HTML/CSS.

Backend:

- Python;
- FastAPI;
- Node.js;
- Express;
- Laravel/PHP.

Datos e integraciones:

- SQL;
- MySQL/MariaDB;
- BigQuery;
- REST APIs;
- Google OAuth.

Herramientas:

- Git/GitHub;
- Docker;
- Prisma;
- Vercel.

En la portada muestra una selección de 8 a 12 tecnologías, no toda la lista. Astro puede figurar como tecnología utilizada para construir este portfolio, pero no debe presentarse como experiencia profesional previa confirmada por el CV.

### Datos que no deben mostrarse en la web principal

No publiques en la página principal, modales ni footer:

- teléfono;
- porcentaje de discapacidad;
- carné de conducir;
- vehículo propio.

El CV original puede conservarlos si ya forman parte de su contenido y el usuario no solicita retirarlos.

---

## 7. Dirección visual y marca

La referencia visual es `input/png/ejemploaseguir.png`. Debes reproducir su lógica de composición, jerarquía, espacio en blanco y claridad, pero no copiarla píxel por píxel.

La interfaz debe combinar:

- composición editorial limpia;
- fondo cálido;
- azul marino del CV;
- detalles bronze/dorados;
- acento terracota;
- turquesa puntual;
- bordes finos;
- sombras contenidas;
- fotografía profesional;
- microinteracciones actuales y discretas.

### Tokens de color obligatorios

```css
:root {
  --color-bg: #f7f5f0;
  --color-surface: #ffffff;
  --color-surface-soft: #fcf8f0;
  --color-text: #0e172a;
  --color-text-muted: #5b6473;
  --color-border: #e4d8c5;

  --color-brand: #9a671d;
  --color-brand-hover: #7e5216;
  --color-brand-soft: #f4e7d1;

  --color-accent: #e76336;
  --color-accent-hover: #c94d27;
  --color-accent-soft: #fbe5db;

  --color-secondary: #1b8c82;
  --color-secondary-soft: #dff2ef;

  --color-success: #2fa66e;
  --color-focus: #225dc7;
}
```

### Uso del color

- Azul marino: texto principal, títulos y botones de alto contraste.
- Bronze: marca, líneas, pequeños iconos y detalles conectados con el CV.
- Terracota: CTA principal, navegación activa y microinteracciones.
- Turquesa: acento secundario puntual.
- Verde: disponibilidad y confirmaciones.
- Fondo: blanco cálido, no gris frío.

No uses grandes superficies saturadas ni degradados decorativos sin función.

### Tipografía

Usa una pila local sin dependencias remotas:

```css
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
  "Segoe UI", sans-serif;
```

No cargues Google Fonts en v1.

### Movimiento

- Duraciones aproximadas de 160 a 260 ms.
- Elevación máxima de tarjetas: 2 a 4 px.
- Sin parallax pesado.
- Sin cursor personalizado.
- Sin animaciones continuas.
- Sin rotaciones 3D.
- Respetar `prefers-reduced-motion`.

---

## 8. Arquitectura técnica obligatoria

Utiliza:

- Astro estable actual;
- TypeScript con configuración `strict`;
- Tailwind CSS 4 con el método oficial vigente para Astro;
- componentes `.astro`;
- HTML semántico;
- TypeScript o JavaScript nativo para modales, menú y portapapeles;
- Prettier con soporte para Astro;
- `astro check`;
- Playwright;
- `@axe-core/playwright`;
- GitHub Actions;
- GitHub Pages.

No añadas:

- React, Preact, Vue, Svelte, Solid o Next.js al portfolio;
- librerías de modales;
- librerías de animación;
- jQuery;
- CMS;
- SDK de analítica;
- librerías de formularios;
- Font Awesome remoto;
- dependencias sin justificación concreta.

Prioriza SVG locales o inline para iconos.

### Estructura objetivo

```text
PORTFOLIO/
├── .github/workflows/deploy.yml
├── public/
│   ├── cv/
│   ├── images/profile/
│   ├── images/projects/
│   ├── images/companies/
│   ├── favicon.svg
│   └── og-image.webp
├── src/
│   ├── components/layout/
│   ├── components/home/
│   ├── components/projects/
│   ├── components/dialogs/
│   ├── components/ui/
│   ├── data/es/
│   ├── data/links.ts
│   ├── layouts/BaseLayout.astro
│   ├── pages/index.astro
│   ├── pages/proyectos/index.astro
│   ├── pages/404.astro
│   ├── scripts/
│   ├── styles/
│   └── utils/paths.ts
├── tests/
├── AGENTS.md
├── astro.config.mjs
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

No uses Content Collections en v1. Usa módulos TypeScript tipados porque el contenido es pequeño, estructurado y no existen artículos ni páginas largas de proyecto.

### Modelo de proyecto

Implementa un tipo equivalente a:

```ts
export type ProjectStatus = 'en-desarrollo' | 'finalizado' | 'premiado';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  modalDescription: string;
  context?: string;
  role?: string | null;
  status: ProjectStatus;
  featured: boolean;
  technologies: string[];
  image: string | null;
  imageAlt: string;
  repositoryUrl: string | null;
  liveUrl: string | null;
  award?: string | null;
  metrics?: string[];
}
```

Todo CTA debe derivarse de los datos. Si una URL es `null`, el CTA no se renderiza.

---

## 9. Páginas y componentes

### Página principal `/`

Debe contener:

1. cabecera;
2. hero;
3. fotografía principal;
4. estado profesional si está confirmado;
5. presentación;
6. tres proyectos destacados;
7. tecnologías principales;
8. formación;
9. experiencia;
10. contacto;
11. redes;
12. footer;
13. diálogo “Sobre mí”;
14. diálogos de los tres proyectos.

En escritorio, utiliza una composición de tres áreas inspirada en la referencia: fotografía, presentación y proyectos. En anchos intermedios, reorganiza antes de comprimir. En móvil, prioriza título, descripción y acciones antes de la fotografía.

### Página `/proyectos/`

- Introducción breve.
- Los tres proyectos iniciales.
- Mismos datos y componentes que en inicio.
- Cada proyecto abre el mismo tipo de diálogo breve.
- No crear páginas individuales de proyecto.
- No añadir filtros mientras solo existan tres proyectos.
- Añadir CTA de contacto final.

### Ruta `/cv/`

- Copiar únicamente los archivos necesarios del CV original a `public/cv/`.
- Mantener la exportación PDF.
- Mantener el diseño original del CV.
- Añadir un enlace claro de vuelta al portfolio.
- Corregir rutas para que funcionen con el `base` de GitHub Pages.
- No duplicar decenas de capturas y PDFs históricos en producción.

### Cabecera

Escritorio:

- monograma `DGO.`;
- Inicio;
- Sobre mí;
- Proyectos;
- Tecnologías;
- Contacto;
- botón `Ver CV`.

Móvil:

- monograma;
- botón real de menú;
- panel superpuesto;
- cierre por botón, enlace y Escape;
- bloqueo de scroll del fondo;
- restauración de foco.

La cabecera puede ser sticky con fondo translúcido al hacer scroll, sin efectos pesados.

---

## 10. Diálogos e interacciones

Usa `<dialog>` nativo y `showModal()`.

### Diálogo “Sobre mí”

Debe incluir:

- título;
- dos párrafos breves;
- ubicación;
- enfoque;
- disponibilidad si está confirmada;
- enlaces reales de contacto/GitHub;
- botón de cierre visible.

### Diálogo de proyecto

Contenido máximo:

1. imagen, logo o captura válida;
2. nombre;
3. estado o contexto;
4. descripción breve;
5. problema u objetivo;
6. solución o resultado;
7. rol, solo si está confirmado;
8. tecnologías;
9. demo y código, solo si existen URLs reales.

No incluyas README completos, galerías, arquitectura extensa ni textos largos.

### Comportamiento obligatorio

- Apertura con `showModal()`.
- Cierre con botón.
- Cierre con Escape.
- Cierre al pulsar backdrop, sin cerrar al pulsar dentro del contenido.
- Restaurar el foco al disparador.
- No abrir dos diálogos simultáneamente.
- Foco inicial lógico.
- Scroll interno cuando sea necesario.
- Funcionamiento con teclado, ratón y táctil.

---

## 11. Contacto

No construyas un formulario.

Implementa:

- correo visible como texto seleccionable;
- botón `Copiar correo`;
- uso de `navigator.clipboard.writeText()` tras interacción del usuario;
- confirmación mediante `aria-live="polite"`;
- fallback que permita seleccionar el correo y muestre una instrucción útil;
- enlace secundario `Abrir aplicación de correo` mediante `mailto:`.

Existen dos correos en los materiales:

- `dangarort123@gmail.com` en el CV;
- `webdaniel2025@gmail.com` en el portfolio anterior.

No elijas uno por tu cuenta. Si no existe una confirmación adicional en el repositorio, marca este punto como bloqueo de publicación.

---

## 12. Responsive y accesibilidad

Objetivo: buenas prácticas equivalentes a WCAG 2.2 AA dentro del alcance, sin afirmar certificación formal.

Requisitos:

- HTML semántico;
- un `h1` por página;
- jerarquía correcta de encabezados;
- navegación completa por teclado;
- `focus-visible` claro;
- áreas táctiles próximas a 44 x 44 px;
- contraste suficiente;
- textos alternativos útiles;
- imágenes decorativas con `alt=""`;
- no depender únicamente del color;
- zoom al 200 % sin pérdida funcional;
- sin scroll horizontal a 320 px;
- soporte de `prefers-reduced-motion`;
- menú móvil accesible;
- diálogos accesibles;
- correo visible aunque falle JavaScript.

Valida como mínimo estas resoluciones:

- 360 x 800;
- 390 x 844;
- 430 x 932;
- 768 x 1024;
- 1024 x 768;
- 1280 x 800;
- 1440 x 900;
- 1920 x 1080.

---

## 13. GitHub Pages y rutas base

Determina primero el remoto real.

Si el remoto es un repositorio de proyecto, por ejemplo:

```text
https://github.com/danicode-dev/PORTFOLIO
```

la publicación será conceptualmente:

```text
https://danicode-dev.github.io/PORTFOLIO/
```

Configura `site` y `base` mediante la configuración oficial vigente de Astro.

No concatentes rutas internas manualmente por todo el código. Crea una utilidad central basada en `import.meta.env.BASE_URL` o en la API oficial vigente.

Comprueba:

- navegación a `/proyectos/`;
- navegación a `/cv/`;
- anclas desde otras páginas;
- imágenes;
- favicon;
- Open Graph;
- scripts;
- CSS;
- recarga directa;
- exportación del CV.

Antes de crear el workflow, consulta la documentación oficial actual enlazada en `docs/sources.md`. No copies versiones antiguas de acciones desde tutoriales.

El workflow debe:

- ejecutarse con push a `main`;
- permitir `workflow_dispatch`;
- usar permisos mínimos;
- compilar;
- subir el artefacto;
- desplegar en `github-pages`.

---

## 14. Instalación y documentación oficial

Antes de instalar o configurar versiones, verifica las fuentes oficiales indicadas en `docs/sources.md`.

En particular:

- Astro y su CLI;
- configuración TypeScript;
- Tailwind CSS 4 para Astro;
- `astro check`;
- GitHub Pages;
- GitHub Actions;
- `<dialog>`;
- Clipboard API;
- Playwright;
- axe.

No uses blogs, vídeos o tutoriales de terceros como autoridad principal cuando exista documentación oficial.

Usa versiones estables compatibles, genera el lockfile y no actualices dependencias fuera de necesidad.

---

## 15. Plan de ejecución autónoma

### Fase 0 — Auditoría

- Leer toda la documentación.
- Inspeccionar Git y activos.
- Auditar el CV.
- Resolver rutas y nombres.
- Crear `AUDIT_REPORT.md` con hallazgos, decisiones seguras y bloqueos.

### Fase 1 — Inicialización

- Inicializar Astro en el directorio actual sin borrar documentación ni `input/`.
- Configurar TypeScript estricto.
- Configurar Tailwind CSS 4 por el método oficial vigente.
- Configurar Prettier y `astro check`.
- Configurar scripts de validación.
- Ejecutar build inicial.

### Fase 2 — Sistema base

- Crear estructura de carpetas.
- Crear tokens de marca.
- Crear layout base.
- Crear metadatos.
- Crear utilidades de ruta base.
- Crear datos tipados.
- Crear componentes UI mínimos.

### Fase 3 — Navegación

- Cabecera de escritorio.
- Menú móvil.
- Estados hover, active y focus.
- Botón de CV.
- Pruebas de teclado.

### Fase 4 — Inicio

- Hero.
- Fotografía.
- Presentación.
- Proyectos destacados.
- Tecnologías.
- Formación.
- Experiencia.
- Contacto.
- Footer.

### Fase 5 — Diálogos

- Infraestructura reutilizable.
- Sobre mí.
- Proyectos.
- Gestión de foco.
- Escape, backdrop y cierre.
- Pruebas.

### Fase 6 — Proyectos

- Crear `/proyectos/`.
- Reutilizar datos y componentes.
- No crear páginas individuales.

### Fase 7 — CV

- Auditar referencias.
- Copiar solo fuentes necesarias.
- Corregir rutas.
- Mantener exportación.
- Añadir regreso al portfolio.
- Probar bajo ruta base.

### Fase 8 — Calidad

- Prettier.
- `astro check`.
- build.
- E2E.
- axe.
- navegación por teclado.
- capturas responsive.
- 404 de activos.
- revisión de contenido.

### Fase 9 — Despliegue

- Workflow.
- configuración de Pages.
- prueba de URL publicada.
- prueba de rutas directas.
- prueba de portapapeles HTTPS.
- prueba del CV.

### Fase 10 — Documentación final

- Actualizar README.
- Documentar comandos.
- Documentar estructura.
- Documentar datos pendientes.
- Añadir capturas útiles del resultado.

Después de cada fase importante, ejecuta al menos:

```bash
npm run check
npm run build
```

No continúes acumulando errores.

---

## 16. Scripts y pruebas mínimas

El `package.json` debe incluir comandos equivalentes a:

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

Prueba al menos:

- título principal;
- navegación a proyectos;
- apertura y cierre de “Sobre mí”;
- restauración de foco;
- apertura correcta de cada proyecto;
- ocultación de CTAs inexistentes;
- navegación a CV con `base`;
- correo visible;
- copia del correo;
- menú móvil;
- carga del CV;
- ausencia de 404 de sus recursos;
- accesibilidad automatizada en inicio, proyectos, modal y menú móvil.

Genera capturas de:

- inicio;
- inicio con modal;
- proyectos;
- menú móvil abierto;

en 390 x 844, 768 x 1024, 1440 x 900 y 1920 x 1080.

No actualices snapshots para ocultar regresiones.

---

## 17. Prohibiciones explícitas

No hagas ninguna de estas acciones:

- inventar contenido;
- inventar URLs;
- publicar repositorios privados como públicos;
- usar `href="#"`;
- introducir lorem ipsum;
- añadir modo oscuro;
- añadir selector de idioma;
- implementar inglés en v1;
- añadir una SPA o `ClientRouter`;
- añadir React al portfolio;
- añadir filtros para tres proyectos;
- crear páginas extensas de proyecto;
- reconstruir el CV desde PDF o captura;
- copiar todo `input/cv/output/` a producción;
- usar scripts o fuentes remotas innecesarias;
- añadir analítica;
- añadir cookies;
- añadir backend;
- añadir formulario de envío;
- cambiar el alcance sin documentarlo;
- declarar completada la tarea con errores de build, tipos, pruebas, accesibilidad automatizada o rutas.

---

## 18. Condiciones de finalización

La implementación solo puede considerarse terminada cuando:

- `npm run format:check` finaliza correctamente;
- `npm run check` finaliza correctamente;
- `npm run build` finaliza correctamente;
- `npm run test:e2e` finaliza correctamente;
- no existen valores `PENDING_*` en la versión publicada;
- no existen enlaces falsos;
- la web funciona a partir de 320 px;
- los modales funcionan con teclado;
- el menú móvil funciona;
- el correo funciona o queda documentado como bloqueo de publicación;
- `/proyectos/` funciona con la ruta base;
- `/cv/` funciona con la ruta base;
- la exportación PDF del CV está verificada;
- no hay activos 404;
- el workflow de GitHub Pages está creado y documentado;
- la documentación del repositorio refleja la implementación real.

---

## 19. Formato de entrega final

Al terminar, responde con un informe técnico conciso y verificable que incluya:

1. estado general: completado, completado con pendientes o bloqueado;
2. fases ejecutadas;
3. archivos principales creados o modificados;
4. activos utilizados y activos descartados;
5. decisiones tomadas a partir de evidencia;
6. datos que permanecen sin confirmar;
7. comandos ejecutados;
8. resultado exacto de format, check, build y tests;
9. URL de GitHub Pages, si existe;
10. comprobación de `/`, `/proyectos/` y `/cv/`;
11. limitaciones reales;
12. siguiente acción mínima necesaria del usuario.

No presentes afirmaciones vagas como “todo funciona” sin indicar qué se verificó. No incluyas ideas futuras genéricas salvo que estén dentro de la segunda fase ya documentada.

Comienza ahora con la auditoría completa. No escribas componentes antes de haber leído los documentos y comprobado los activos reales.
