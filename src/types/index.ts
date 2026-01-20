// Core type definitions for the portfolio website

export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

export interface GitHubProfile {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  repositoryUrl?: string;
  imageUrl?: string;
  featured: boolean;
  category?: string;
  startDate?: string;
  endDate?: string;
  highlights?: string[];
}

export type ProjectCategory = 
  | 'web-app' 
  | 'mobile-app' 
  | 'api' 
  | 'library' 
  | 'tool' 
  | 'other';

export interface ThemeConfig {
  defaultTheme: 'light' | 'dark' | 'system';
  colors?: {
    primary?: string;
    secondary?: string;
  };
}

export interface Skill {
  name: string;
  icon?: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string; // undefined means current
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
  companyUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  
  author: {
    name: string;
    email: string;
    bio: string;
    avatar: string;
    location: string;
  };
  
  github: {
    username: string;
    token?: string;
    featured_repos: string[];
  };
  
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    email?: string;
  };
  
  skills: SkillCategory[];
  
  experience: Experience[];
  
  projects: Project[];
  
  theme: ThemeConfig;
  
  features: {
    showGitHubStats: boolean;
    showExperience: boolean;
    showSkills: boolean;
    showProjects: boolean;
    showContact: boolean;
    enableAnimations: boolean;
  };
  
  cv: {
    filename: string;
    path: string;
  };
}