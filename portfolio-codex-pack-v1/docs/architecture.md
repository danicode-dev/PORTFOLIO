# Arquitectura técnica

## Stack

- Astro estable actual.
- TypeScript con plantilla `astro/tsconfigs/strict`.
- Tailwind CSS 4 mediante el plugin oficial de Vite.
- HTML semántico.
- TypeScript/JavaScript nativo para menú, modales y portapapeles.
- Prettier con `prettier-plugin-astro`.
- `astro check` para diagnóstico y tipos.
- Playwright para flujos críticos y capturas.
- `@axe-core/playwright` para comprobaciones automatizadas de accesibilidad.
- GitHub Actions y GitHub Pages.

## Dependencias que no deben añadirse

- React, Preact, Vue, Svelte, Solid.
- Librerías de modales.
- Librerías de animación.
- Librerías de formularios.
- CMS.
- SDK de analítica.
- jQuery.
- Font Awesome remoto.

Los iconos pueden implementarse como SVG locales simples o con una librería pequeña solo si ya está justificada y no añade runtime. Priorizar SVG inline reutilizable.

## Estructura propuesta

```text
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── public/
│   ├── cv/
│   │   └── ...código original completo del CV
│   ├── images/
│   │   ├── profile/
│   │   ├── projects/
│   │   └── companies/
│   ├── favicon.svg
│   └── og-image.webp
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── MobileMenu.astro
│   │   │   └── Footer.astro
│   │   ├── home/
│   │   │   ├── Hero.astro
│   │   │   ├── FeaturedProjects.astro
│   │   │   ├── Technologies.astro
│   │   │   ├── Education.astro
│   │   │   ├── Experience.astro
│   │   │   └── Contact.astro
│   │   ├── projects/
│   │   │   ├── ProjectCard.astro
│   │   │   ├── ProjectGrid.astro
│   │   │   └── ProjectDialog.astro
│   │   ├── dialogs/
│   │   │   └── AboutDialog.astro
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── Badge.astro
│   │       ├── Icon.astro
│   │       └── SectionHeading.astro
│   ├── data/
│   │   ├── links.ts
│   │   └── es/
│   │       ├── profile.ts
│   │       ├── projects.ts
│   │       ├── technologies.ts
│   │       ├── experience.ts
│   │       └── education.ts
│   ├── i18n/
│   │   └── es.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── proyectos/
│   │   │   └── index.astro
│   │   └── 404.astro
│   ├── scripts/
│   │   ├── dialogs.ts
│   │   ├── mobile-menu.ts
│   │   └── clipboard.ts
│   ├── styles/
│   │   ├── global.css
│   │   └── tokens.css
│   └── utils/
│       └── paths.ts
├── tests/
│   ├── portfolio.spec.ts
│   └── accessibility.spec.ts
├── AGENTS.md
├── astro.config.mjs
├── package.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Datos

No usar Content Collections en v1. No existen artículos ni páginas de detalle largas, y el contenido es pequeño y altamente estructurado. Usar módulos TypeScript tipados reduce complejidad y facilita cambios.

## Tipos mínimos

```ts
export type ProjectStatus = 'en-desarrollo' | 'finalizado' | 'premiado';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  modalDescription: string;
  context?: string;
  role?: string;
  status: ProjectStatus;
  featured: boolean;
  technologies: string[];
  image: string;
  imageAlt: string;
  repositoryUrl: string | null;
  liveUrl: string | null;
  award?: string | null;
  metrics?: string[];
}
```

## Ruta base de GitHub Pages

- Configurar `site` y, cuando el repositorio no sea `danicode-dev.github.io`, configurar `base` con el nombre del repositorio.
- Crear una función auxiliar para enlaces internos basada en `import.meta.env.BASE_URL`.
- No concatenar barras de forma inconsistente.
- Todos los enlaces internos, activos de `public` y enlace al CV deben probarse con la ruta base real.

Ejemplo conceptual:

```ts
export function withBase(path = ''): string {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return `${base}${path.replace(/^\//, '')}`;
}
```

No copiar este código sin probarlo con la configuración final de `trailingSlash`.

## Integración del CV

### Estrategia v1

- El usuario aportará el código fuente completo del CV.
- Copiarlo como aplicación estática autocontenida dentro de `public/cv/`.
- Mantener sus rutas de imágenes, CSS y scripts relativas a esa carpeta.
- No reescribirlo dentro de componentes Astro en la primera entrega.
- Añadir un enlace de vuelta al portfolio solo si puede hacerse sin romper la maquetación o la exportación.
- Probar el botón de exportación PDF desde la URL final de GitHub Pages.

Esta estrategia minimiza riesgo y permite una futura migración a componentes Astro de forma independiente.

## Scripts del cliente

- Deben ser pequeños, independientes e idempotentes.
- Usar `addEventListener`, no atributos `onclick`.
- No exponer datos sensibles.
- No depender del orden accidental del DOM.
- Usar selectores `data-*` estables.
- Limpiar listeners solo si el ciclo de vida lo requiere.

## SEO básico

- Un único `h1` por página.
- `title` y `meta description` únicos.
- URL canónica basada en `site`.
- Open Graph básico.
- Imagen OG local.
- `lang="es"`.
- `robots` indexable.
- `sitemap` solo si se añade mediante la integración oficial de Astro; no es bloqueante para v1.
- JSON-LD de `Person` puede añadirse solo con datos públicos confirmados.

## Rendimiento

- Imágenes WebP/AVIF cuando proceda.
- Dimensiones explícitas para evitar layout shift.
- `loading="lazy"` fuera del hero.
- La imagen principal puede usar prioridad alta.
- No cargar scripts de terceros.
- No cargar fuentes externas.
- No usar vídeo de fondo ni WebGL.
