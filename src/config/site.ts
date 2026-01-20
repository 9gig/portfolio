import { SiteConfig } from '@/types';
import { assertValidConfig } from '@/lib/config-validator';

export const siteConfig: SiteConfig = {
  name: 'John Doe Portfolio',
  title: 'John Doe | Full Stack Developer & Shopify Apps Specialist',
  description: 'Portfolio of a software developer specializing in Flutter, Dart, Kotlin, Go, TypeScript, and Node.js. Building production-ready applications and Shopify apps.',
  url: 'https://johndoe.dev',
  
  author: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate software developer specializing in building production-ready applications using Flutter, Dart, Kotlin, Go, TypeScript, and Node.js. Experienced in developing Shopify apps and modern web applications.',
    avatar: '/images/avatar.jpg',
    location: 'San Francisco, CA',
  },
  
  github: {
    username: '9gig',
    // token: process.env.GITHUB_TOKEN, // Optional: for higher rate limits
    featured_repos: [], // Will show all your repos, or add specific repo names here
  },
  
  social: {
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    email: 'john.doe@example.com',
  },
  
  skills: [
    {
      name: 'Languages',
      skills: [
        { name: 'TypeScript', proficiency: 'expert', yearsOfExperience: 5 },
        { name: 'JavaScript', proficiency: 'expert', yearsOfExperience: 7 },
        { name: 'Dart', proficiency: 'advanced', yearsOfExperience: 3 },
        { name: 'Kotlin', proficiency: 'advanced', yearsOfExperience: 3 },
        { name: 'Go', proficiency: 'intermediate', yearsOfExperience: 2 },
        { name: 'Python', proficiency: 'intermediate', yearsOfExperience: 4 },
      ],
    },
    {
      name: 'Frameworks & Libraries',
      skills: [
        { name: 'React', proficiency: 'expert', yearsOfExperience: 5 },
        { name: 'Next.js', proficiency: 'expert', yearsOfExperience: 4 },
        { name: 'Flutter', proficiency: 'advanced', yearsOfExperience: 3 },
        { name: 'Node.js', proficiency: 'expert', yearsOfExperience: 6 },
        { name: 'Express', proficiency: 'advanced', yearsOfExperience: 5 },
      ],
    },
    {
      name: 'Tools & Platforms',
      skills: [
        { name: 'Git', proficiency: 'expert' },
        { name: 'Docker', proficiency: 'advanced' },
        { name: 'AWS', proficiency: 'intermediate' },
        { name: 'Shopify', proficiency: 'advanced', yearsOfExperience: 3 },
        { name: 'PostgreSQL', proficiency: 'advanced' },
        { name: 'MongoDB', proficiency: 'intermediate' },
      ],
    },
  ],
  
  experience: [
    {
      id: '1',
      company: 'Tech Innovations Inc',
      role: 'Senior Full Stack Developer',
      startDate: '2022-01',
      endDate: undefined, // Current position
      location: 'San Francisco, CA',
      description: 'Leading development of modern web applications and Shopify integrations',
      achievements: [
        'Architected and built 5+ production Shopify apps serving 10,000+ merchants',
        'Reduced application load time by 60% through performance optimizations',
        'Mentored team of 4 junior developers',
        'Implemented CI/CD pipeline reducing deployment time by 80%',
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Shopify', 'PostgreSQL'],
      logo: '/images/companies/tech-innovations.png',
      companyUrl: 'https://techinnovations.example.com',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      role: 'Full Stack Developer',
      startDate: '2020-03',
      endDate: '2021-12',
      location: 'Remote',
      description: 'Developed mobile and web applications using Flutter and React',
      achievements: [
        'Built cross-platform mobile app with 50,000+ downloads',
        'Implemented real-time features using WebSockets',
        'Reduced API response time by 40%',
      ],
      technologies: ['Flutter', 'Dart', 'React', 'Node.js', 'MongoDB'],
      logo: '/images/companies/startupxyz.png',
      companyUrl: 'https://startupxyz.example.com',
    },
  ],
  
  projects: [
    {
      id: '1',
      title: 'E-commerce Platform',
      description: 'A modern e-commerce platform built with Next.js and Shopify',
      longDescription: 'Full-featured e-commerce platform with custom Shopify integration, real-time inventory management, and advanced analytics dashboard.',
      technologies: ['Next.js', 'TypeScript', 'Shopify', 'Tailwind CSS', 'PostgreSQL'],
      liveUrl: 'https://example-store.com',
      githubUrl: 'https://github.com/johndoe/ecommerce-platform',
      imageUrl: '/images/projects/ecommerce.jpg',
      featured: true,
      category: 'web-app',
      startDate: '2023-01',
      highlights: [
        'Handles 10,000+ daily transactions',
        'Real-time inventory synchronization',
        'Advanced analytics dashboard',
      ],
    },
    {
      id: '2',
      title: 'Flutter Fitness Tracker',
      description: 'Cross-platform fitness tracking app with workout plans and progress analytics',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Provider'],
      githubUrl: 'https://github.com/johndoe/fitness-tracker',
      imageUrl: '/images/projects/fitness.jpg',
      featured: true,
      category: 'mobile-app',
      startDate: '2022-06',
      endDate: '2023-03',
      highlights: [
        '50,000+ downloads',
        'Offline-first architecture',
        'Custom workout builder',
      ],
    },
    {
      id: '3',
      title: 'API Gateway Service',
      description: 'High-performance API gateway built with Go for microservices architecture',
      technologies: ['Go', 'Redis', 'Docker', 'Kubernetes'],
      githubUrl: 'https://github.com/johndoe/api-gateway',
      featured: false,
      category: 'api',
      startDate: '2023-06',
      highlights: [
        'Handles 1M+ requests per day',
        'Sub-10ms latency',
        'Built-in rate limiting and caching',
      ],
    },
  ],
  
  theme: {
    defaultTheme: 'system',
    colors: {
      primary: '#3b82f6', // blue-500
      secondary: '#8b5cf6', // violet-500
    },
  },
  
  features: {
    showGitHubStats: true,
    showExperience: true,
    showSkills: true,
    showProjects: true,
    showContact: true,
    enableAnimations: true,
  },
  
  cv: {
    filename: 'John_Doe_Resume.pdf',
    path: '/resume.pdf',
  },
};


// Validate configuration at module load time
// This ensures any configuration errors are caught early during development
if (process.env.NODE_ENV === 'development') {
  assertValidConfig(siteConfig);
}
