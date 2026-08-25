import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'al-lio',
    title: 'AL-LÍO',
    shortDescription:
      'AL-LÍO centraliza tareas, calendario, formación y oportunidades profesionales para reducir la fragmentación entre distintas herramientas.',
    modalDescription:
      'AL-LÍO centraliza tareas, calendario, formación y oportunidades profesionales para reducir la fragmentación entre distintas herramientas.',
    objective:
      'Reducir la fragmentación entre gestores de tareas, calendarios y portales de oportunidades profesionales.',
    solution:
      'Una única interfaz para organizar tareas, calendario, formación y seguimiento de oportunidades.',
    context: 'Aircury Summer of Code 2026',
    role: 'Diseño de producto, arquitectura y desarrollo full-stack.',
    status: 'en-desarrollo',
    featured: true,
    technologies: [
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'Supabase',
      'Google OAuth',
      'Docker',
    ],
    image: 'images/projects/al-lio.webp',
    imageAlt: 'Símbolo de identidad de AL-LÍO',
    repositoryUrl: 'https://github.com/danielgarciaortega-dev/al-lio',
    liveUrl: 'https://al-lio.danielcode.dev',
    eventUrl: null,
    award: null,
    metrics: [],
  },
  {
    id: 'sidn-cost-control',
    title: 'SIDN Cost Control',
    shortDescription:
      'Aplicación desarrollada en equipo para controlar y comparar el gasto de campañas publicitarias.',
    modalDescription:
      'SIDN Cost Control permite consultar y comparar el gasto de campañas publicitarias desde un panel de gestión.',
    objective:
      'Facilitar el control y la comparación del gasto de campañas publicitarias.',
    solution:
      'Aplicación en equipo con backend FastAPI y BigQuery y un panel de gestión construido con React y Vite.',
    context: 'I Edición GEN AI ARENA',
    role: null,
    status: 'premiado',
    featured: true,
    technologies: ['Python', 'FastAPI', 'BigQuery', 'React', 'Vite'],
    image: 'images/projects/sidn-cost-control.webp',
    imageAlt: 'Insignia de ganador de Gen AI Arena',
    repositoryUrl: null,
    liveUrl: null,
    eventUrl: 'https://www.arenasidn.com/edicion-1',
    award: 'Ganador de la I Edición GEN AI ARENA',
    metrics: [],
  },
  {
    id: 'feedback2action',
    title: 'Feedback2Action',
    shortDescription:
      'Análisis de reseñas para agrupar problemas y priorizar acciones mediante datos e inteligencia artificial.',
    modalDescription:
      'Feedback2Action transforma grandes volúmenes de reseñas en grupos de problemas y acciones priorizadas.',
    objective:
      'Convertir feedback masivo y disperso en problemas agrupados y decisiones accionables.',
    solution:
      'Análisis de 22.376 reseñas con Python y BigQuery, obteniendo 409 grupos de problemas y 108 acciones priorizadas con Vertex AI.',
    context: 'I Edición GEN AI ARENA',
    role: null,
    status: 'finalizado',
    featured: true,
    technologies: ['Python', 'FastAPI', 'BigQuery', 'Vertex AI'],
    image: 'images/projects/feedback2action.webp',
    imageAlt: 'Identidad visual de Feedback2Action',
    repositoryUrl: null,
    liveUrl: null,
    eventUrl: 'https://www.arenasidn.com/edicion-1',
    award: null,
    metrics: [
      '22.376 reseñas analizadas',
      '409 grupos de problemas',
      '108 acciones priorizadas',
    ],
  },
];
