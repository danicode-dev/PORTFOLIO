# Modelo de datos y valores iniciales

## Enlaces globales

```ts
export const links = {
  githubProfile: 'https://github.com/danicode-dev',
  linkedin: 'PENDING_LINKEDIN_CONFIRMATION',
  email: 'PENDING_PUBLIC_EMAIL',
  currentPortfolio: 'https://danicode-dev.github.io/PORTFOLIO/',
};
```

Los valores `PENDING_*` no deben llegar a producción. Deben resolverse antes de implementar.

## Perfil

```ts
export const profile = {
  fullName: 'Daniel García Ortega',
  shortBrand: 'DGO.',
  role: 'Desarrollador web full-stack',
  location: 'Granada, España',
  availability: 'Disponible para proyectos y oportunidades',
  heroDescription:
    'Desarrollo aplicaciones web y productos digitales centrados en rendimiento, claridad y experiencia de usuario.',
  about: [
    'Soy Daniel García Ortega, desarrollador web full-stack en Granada. He trabajado en proyectos SaaS y aplicaciones web, tanto en frontend como en integración de APIs, principalmente con React, Angular, TypeScript, Python y FastAPI.',
    'Mi experiencia anterior en atención al cliente y ventas me ayuda a entender necesidades reales, comunicar soluciones con claridad y construir productos fáciles de utilizar.',
  ],
};
```

La disponibilidad pública debe confirmarse antes de publicar.

## Proyectos iniciales

```ts
export const projects = [
  {
    id: 'al-lio',
    title: 'Al-Lío',
    shortDescription:
      'Aplicación web personal para organizar tareas, calendario y oportunidades desde una única interfaz.',
    modalDescription:
      'Al-Lío centraliza tareas, calendario, formación y oportunidades profesionales para reducir la fragmentación entre distintas herramientas.',
    context: 'Proyecto personal en desarrollo',
    role: 'Diseño de producto, arquitectura y desarrollo full-stack.',
    status: 'en-desarrollo',
    featured: true,
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
    image: '/images/projects/al-lio.webp',
    imageAlt: 'Captura de la interfaz de Al-Lío',
    repositoryUrl: 'https://github.com/danicode-dev/al-lio',
    liveUrl: 'https://al-lio.danielcode.dev',
    award: null,
    metrics: [],
  },
  {
    id: 'feedback2action',
    title: 'Feedback2Action',
    shortDescription:
      'Análisis de reseñas para agrupar problemas y priorizar acciones mediante datos e inteligencia artificial.',
    modalDescription:
      'El proyecto analizó 22.376 reseñas, obtuvo 409 grupos de problemas y generó 108 acciones priorizadas con ayuda de Vertex AI.',
    context: 'Granada Hackathon 2026',
    role: 'PENDING_PROJECT_ROLE',
    status: 'finalizado',
    featured: true,
    technologies: ['Python', 'FastAPI', 'BigQuery', 'Vertex AI'],
    image: '/images/projects/feedback2action.webp',
    imageAlt: 'Captura o identidad visual de Feedback2Action',
    repositoryUrl: null,
    liveUrl: null,
    award: null,
    metrics: [
      '22.376 reseñas analizadas',
      '409 grupos de problemas',
      '108 acciones priorizadas',
    ],
  },
  {
    id: 'sidn-cost-control',
    title: 'SIDN Cost Control',
    shortDescription:
      'Aplicación para controlar y comparar el gasto de campañas publicitarias.',
    modalDescription:
      'Solución desarrollada en equipo con backend FastAPI y BigQuery y un panel de gestión construido con React y Vite.',
    context: 'Granada Hackathon 2026',
    role: 'PENDING_PROJECT_ROLE',
    status: 'premiado',
    featured: true,
    technologies: ['Python', 'FastAPI', 'BigQuery', 'React', 'Vite'],
    image: '/images/projects/sidn-cost-control.webp',
    imageAlt: 'Captura o identidad visual de SIDN Cost Control',
    repositoryUrl: null,
    liveUrl: null,
    award: 'Ganador de Granada Hackathon 2026',
    metrics: [],
  },
];
```

## Tecnologías

Mostrar en inicio una selección, no toda la lista del CV.

Selección propuesta:

```ts
export const primaryTechnologies = [
  'TypeScript',
  'React',
  'Angular',
  'Astro',
  'Python',
  'FastAPI',
  'Node.js',
  'PostgreSQL',
  'BigQuery',
  'Docker',
  'Git/GitHub',
  'REST APIs',
];
```

`Astro` no aparece en el CV aportado. Solo mostrarlo si el usuario quiere que el nuevo portfolio cuente como evidencia de uso. Hasta entonces, puede aparecer en “Tecnologías utilizadas en este portfolio” pero no necesariamente en el resumen profesional.

## Experiencia

```ts
export const experience = [
  {
    company: 'Salunox',
    role: 'Desarrollador web en prácticas',
    period: 'Abr 2026 - May 2026',
    description:
      'Corrección de incidencias y validación de funcionalidades web y móviles relacionadas con pacientes, citas y notificaciones.',
    technologies: [
      'Angular',
      'TypeScript',
      'Laravel/PHP',
      'Flutter/Dart',
      'Firebase',
      'REST APIs',
    ],
    logo: '/images/companies/salunox.svg',
  },
  {
    company: 'Konecta',
    role: 'Venta telefónica y atención al cliente',
    period: '2023 - Actualidad',
    description:
      'Venta telefónica de servicios de energía, gestión de objeciones, resolución de consultas y seguimiento diario de objetivos comerciales.',
    technologies: [],
    logo: '/images/companies/konecta.webp',
  },
  {
    company: 'Alcampo',
    role: 'Atención al cliente',
    period: '2017 - 2023',
    description:
      'Atención al cliente en tienda, resolución de incidencias y apoyo en la operativa diaria junto al resto del equipo.',
    technologies: [],
    logo: '/images/companies/alcampo.webp',
  },
];
```

## Formación

```ts
export const education = [
  {
    title: 'FP Grado Superior en Desarrollo de Aplicaciones Web',
    institution: 'Instituto Fomento Ocupacional FOC',
    period: '2025 - Actualidad',
  },
  {
    title: 'Técnico en Gestión Administrativa',
    institution: 'Centro FP Jorbalán',
    period: '2015 - 2017',
  },
];
```

## Regla de datos pendientes

No sustituir `PENDING_*` por suposiciones. Resolverlos mediante los activos o respuestas del usuario. Si un campo opcional permanece `null`, ocultar su interfaz correspondiente.
