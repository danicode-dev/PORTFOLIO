export type ProjectStatus = 'en-desarrollo' | 'finalizado' | 'premiado';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  modalDescription: string;
  objective: string;
  solution: string;
  context?: string;
  role: string | null;
  status: ProjectStatus;
  featured: boolean;
  technologies: string[];
  image: string | null;
  imageAlt: string;
  repositoryUrl: string | null;
  liveUrl: string | null;
  eventUrl: string | null;
  award: string | null;
  metrics: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  mode?: string;
  context?: string;
  description: string;
  technologies: string[];
  logo: string | null;
}

export interface Education {
  title: string;
  shortTitle?: string;
  institution: string;
  period: string;
  logo: string | null;
  logoAlt: string;
}
