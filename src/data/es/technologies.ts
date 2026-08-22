export interface TechnologyGroup {
  label: string;
  technologies: string[];
}

export const technologyGroups: TechnologyGroup[] = [
  {
    label: 'Frontend',
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'TypeScript',
      'React',
      'Next.js',
      'Astro',
      'Tailwind CSS',
      'Vite',
    ],
  },
  {
    label: 'Backend',
    technologies: ['Java', 'Python', 'FastAPI', 'Node.js', 'APIs REST'],
  },
  {
    label: 'Datos',
    technologies: ['SQL', 'PostgreSQL', 'MySQL/MariaDB', 'BigQuery'],
  },
  {
    label: 'Herramientas',
    technologies: ['Git', 'GitHub', 'Docker', 'Supabase'],
  },
];
