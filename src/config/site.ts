import { SiteConfig } from '@/types';
import { assertValidConfig } from '@/lib/config-validator';

export const siteConfig: SiteConfig = {
  name: '9gig',
  title: 'Solomon Nengi | Mobile & Full Stack Developer',
  description: 'Portfolio of Solomon Nengi, a software developer specializing in Flutter, Dart, Kotlin, Go, TypeScript, and Node.js. Building production-ready mobile and web applications with 100K+ downloads.',
  url: 'https://solomonnengi.dev',
  
  author: {
    name: 'Solomon Nengi',
    email: 'soloprecious65@gmail.com',
    bio: 'Passionate software developer with 5+ years of experience building production-ready mobile and web applications. Specialized in Flutter, Dart, Kotlin, and modern backend technologies. Built apps with 100K+ downloads.',
    avatar: '/images/avatar.png',
    location: 'Luton, ENG',
  },
  
  github: {
    username: '9gig',
    // token: process.env.GITHUB_TOKEN, // Optional: for higher rate limits
    featured_repos: [], // Will show all your repos, or add specific repo names here
  },
  
  social: {
    github: 'https://github.com/9gig',
    linkedin: 'https://www.linkedin.com/in/nengi-solomon-5a1bb7125',
    email: 'soloprecious65@gmail.com',
  },
  
  skills: [
    {
      name: 'Languages',
      skills: [
        { name: 'Dart', proficiency: 'expert', yearsOfExperience: 5 },
        { name: 'Kotlin', proficiency: 'expert', yearsOfExperience: 5 },
        { name: 'JavaScript', proficiency: 'expert', yearsOfExperience: 6 },
        { name: 'TypeScript', proficiency: 'expert', yearsOfExperience: 5 },
        { name: 'Go', proficiency: 'advanced', yearsOfExperience: 3 },
        { name: 'Python', proficiency: 'intermediate', yearsOfExperience: 3 },
      ],
    },
    {
      name: 'Frameworks & Libraries',
      skills: [
        { name: 'Flutter', proficiency: 'expert', yearsOfExperience: 5 },
        { name: 'Node.js', proficiency: 'expert', yearsOfExperience: 6 },
        { name: 'React', proficiency: 'advanced', yearsOfExperience: 4 },
        { name: 'Next.js', proficiency: 'advanced', yearsOfExperience: 3 },
        { name: 'Express', proficiency: 'advanced', yearsOfExperience: 5 },
      ],
    },
    {
      name: 'Tools & Platforms',
      skills: [
        { name: 'Firebase', proficiency: 'expert', yearsOfExperience: 5 },
        { name: 'Git', proficiency: 'expert' },
        { name: 'PostgreSQL', proficiency: 'advanced' },
        { name: 'MongoDB', proficiency: 'advanced' },
        { name: 'Docker', proficiency: 'intermediate' },
        { name: 'AWS', proficiency: 'intermediate' },
      ],
    },
  ],
  
  experience: [
    {
      id: '1',
      company: 'Stemos Innovations Inc',
      role: 'Mobile & Full Stack Developer',
      startDate: '2021-01',
      endDate: '2024-12',
      location: 'Remote',
      description: 'Led development of multiple production mobile and web applications serving 100K+ users',
      achievements: [
        'Built 3Scorers app - a comprehensive sports platform with 100K+ downloads',
        'Developed Agent app for field operations and data collection',
        'Created More Monee Bank app with secure financial features',
        'Implemented real-time features and offline-first architecture',
        'Integrated Firebase for authentication, database, and cloud functions',
      ],
      technologies: ['Flutter', 'Dart', 'Kotlin', 'Firebase', 'Node.js', 'TypeScript', 'PostgreSQL'],
    },
    {
      id: '2',
      company: 'Freelance',
      role: 'Software Developer',
      startDate: '2019-01',
      endDate: '2021-01',
      location: 'Remote',
      description: 'Developed custom mobile and web solutions for various clients',
      achievements: [
        'Built cross-platform mobile applications using Flutter',
        'Developed backend APIs with Node.js and Express',
        'Implemented database solutions with PostgreSQL and MongoDB',
        'Delivered projects on time with high client satisfaction',
      ],
      technologies: ['Flutter', 'Dart', 'JavaScript', 'Node.js', 'MongoDB', 'PostgreSQL'],
    },
  ],
  
  projects: [
    {
      id: '1',
      title: '3Scorers',
      description: 'Comprehensive sports platform for live scores, news, and statistics',
      longDescription: 'A feature-rich mobile application providing real-time sports scores, news updates, team statistics, and player information. Built with Flutter for cross-platform compatibility and Firebase for real-time data synchronization.',
      technologies: ['Flutter', 'Dart', 'Firebase', 'REST API', 'Provider'],
      imageUrl: '/images/projects/3scorers.jpg',
      featured: true,
      category: 'mobile-app',
      startDate: '2021-06',
      endDate: '2024-12',
      highlights: [
        '100K+ downloads on app stores',
        'Real-time score updates',
        'Offline-first architecture',
        'Multi-sport coverage',
      ],
    },
    {
      id: '2',
      title: 'Agent App',
      description: 'Field operations and data collection application for agents',
      longDescription: 'Mobile application designed for field agents to collect data, manage tasks, and sync information in real-time. Features offline capabilities and secure data handling.',
      technologies: ['Flutter', 'Dart', 'Firebase', 'SQLite', 'BLoC'],
      imageUrl: '/images/projects/agent-app.jpg',
      featured: true,
      category: 'mobile-app',
      startDate: '2022-03',
      endDate: '2024-06',
      highlights: [
        'Offline-first data collection',
        'Real-time synchronization',
        'Secure authentication',
        'Task management system',
      ],
    },
    {
      id: '3',
      title: 'More Monee Bank App',
      description: 'Mobile banking application with secure financial features',
      longDescription: 'Full-featured mobile banking application providing secure account management, transactions, and financial services. Built with emphasis on security and user experience.',
      technologies: ['Flutter', 'Dart', 'Firebase', 'Node.js', 'PostgreSQL'],
      imageUrl: '/images/projects/more-monee.jpg',
      featured: true,
      category: 'mobile-app',
      startDate: '2023-01',
      endDate: '2024-09',
      highlights: [
        'Secure authentication and encryption',
        'Real-time transaction processing',
        'Account management features',
        'Push notifications',
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
    filename: 'Solomon_Nengi_CV.pdf',
    path: '/resume.pdf',
  },
};


// Validate configuration at module load time
// This ensures any configuration errors are caught early during development
if (process.env.NODE_ENV === 'development') {
  assertValidConfig(siteConfig);
}
