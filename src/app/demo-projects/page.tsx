/**
 * Demo Page for Modern Project Cards
 * 
 * Showcases the ProjectCardModern and ProjectGridModern components
 * with sample project data.
 */

'use client';

import React from 'react';
import { ProjectGridModern } from '@/components/projects/project-grid-modern';
import { Project } from '@/types';

// Sample project data for demonstration
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with real-time inventory management, payment processing, and order tracking.',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/example/ecommerce',
    liveUrl: 'https://ecommerce-demo.vercel.app',
    featured: true,
    category: 'web-app',
    startDate: '2024-01-01',
  },
  {
    id: '2',
    title: 'Task Management API',
    description: 'RESTful API for task management with authentication, real-time updates, and team collaboration features.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT'],
    githubUrl: 'https://github.com/example/task-api',
    liveUrl: 'https://api.tasks-demo.com',
    featured: false,
    category: 'api',
    startDate: '2023-11-15',
  },
  {
    id: '3',
    title: 'Mobile Fitness Tracker',
    description: 'Cross-platform mobile app for tracking workouts, nutrition, and health metrics with AI-powered insights.',
    technologies: ['React Native', 'TypeScript', 'Firebase', 'TensorFlow'],
    githubUrl: 'https://github.com/example/fitness-tracker',
    featured: true,
    category: 'mobile-app',
    startDate: '2024-02-10',
  },
  {
    id: '4',
    title: 'UI Component Library',
    description: 'Comprehensive React component library with accessibility features, dark mode support, and extensive documentation.',
    technologies: ['React', 'TypeScript', 'Storybook', 'Tailwind CSS'],
    githubUrl: 'https://github.com/example/ui-library',
    liveUrl: 'https://ui-library-demo.vercel.app',
    featured: false,
    category: 'library',
    startDate: '2023-09-20',
  },
  {
    id: '5',
    title: 'Code Snippet Manager',
    description: 'Desktop application for organizing and searching code snippets with syntax highlighting and tagging.',
    technologies: ['Electron', 'React', 'SQLite', 'Monaco Editor'],
    githubUrl: 'https://github.com/example/snippet-manager',
    featured: false,
    category: 'tool',
    startDate: '2023-12-05',
  },
  {
    id: '6',
    title: 'Real-Time Chat Application',
    description: 'Scalable chat application with end-to-end encryption, file sharing, and video calling capabilities.',
    technologies: ['Next.js', 'WebRTC', 'Socket.io', 'Redis', 'PostgreSQL'],
    githubUrl: 'https://github.com/example/chat-app',
    liveUrl: 'https://chat-demo.vercel.app',
    featured: true,
    category: 'web-app',
    startDate: '2024-03-01',
  },
];

export default function DemoProjectsPage() {
  const handleProjectClick = (project: Project) => {
    console.log('Project clicked:', project.title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 
            className="text-6xl font-bold mb-4 bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            Modern Project Cards
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcasing animated project cards with glassmorphism effects, 
            gradient borders, and smooth transitions.
          </p>
        </div>

        {/* Project Grid */}
        <ProjectGridModern
          projects={sampleProjects}
          showFilters={true}
          onProjectClick={handleProjectClick}
        />
      </div>
    </div>
  );
}
