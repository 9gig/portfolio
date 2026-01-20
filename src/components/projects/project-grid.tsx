'use client';

import { useState, useMemo } from 'react';
import { Project, ProjectCategory } from '@/types';
import { ProjectCard } from './project-card';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectGridProps {
  projects: Project[];
  showFilters?: boolean;
  onProjectClick?: (project: Project) => void;
}

const categories: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Projects' },
  { value: 'web-app', label: 'Web Apps' },
  { value: 'mobile-app', label: 'Mobile Apps' },
  { value: 'api', label: 'APIs' },
  { value: 'library', label: 'Libraries' },
  { value: 'tool', label: 'Tools' },
  { value: 'other', label: 'Other' },
];

export function ProjectGrid({ 
  projects, 
  showFilters = true,
  onProjectClick 
}: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all');

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') {
      return projects;
    }
    return projects.filter((project) => project.category === selectedCategory);
  }, [projects, selectedCategory]);

  // Sort projects: featured first, then by start date (most recent first)
  const sortedProjects = useMemo(() => {
    return [...filteredProjects].sort((a, b) => {
      // Featured projects come first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      // Then sort by start date (most recent first)
      if (a.startDate && b.startDate) {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      }
      if (a.startDate) return -1;
      if (b.startDate) return 1;

      return 0;
    });
  }, [filteredProjects]);

  return (
    <div className="w-full">
      {/* Filters */}
      {showFilters && (
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = selectedCategory === category.value;
            return (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md dark:bg-blue-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                aria-pressed={isActive}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Project Count */}
      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        Showing {sortedProjects.length} {sortedProjects.length === 1 ? 'project' : 'projects'}
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        {sortedProjects.length > 0 ? (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ProjectCard
                  project={project}
                  featured={project.featured}
                  onCardClick={onProjectClick}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <p className="text-gray-600 dark:text-gray-400">
              No projects found in this category.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
