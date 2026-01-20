/**
 * ProjectGridModern Component
 * 
 * Modern project grid with responsive layout, staggered card entrance animations,
 * and scroll-triggered reveals.
 * 
 * Requirements: 6.6
 */

'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectCategory } from '@/types';
import { ProjectCardModern } from './project-card-modern';
import { animations } from '@/styles/design-tokens';

interface ProjectGridModernProps {
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

export function ProjectGridModern({
  projects,
  showFilters = true,
  onProjectClick,
}: ProjectGridModernProps) {
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
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: animations.durations.slow / 1000 }}
          className="mb-8 flex flex-wrap gap-3"
        >
          {categories.map((category, index) => {
            const isActive = selectedCategory === category.value;
            return (
              <motion.button
                key={category.value}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.value)}
                className={`
                  relative px-6 py-2.5 rounded-full text-sm font-medium 
                  transition-all duration-300 overflow-hidden
                  ${isActive
                    ? 'text-white shadow-lg'
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-white/20'
                  }
                `}
                aria-pressed={isActive}
              >
                {/* Active background gradient */}
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category.label}</span>
              </motion.button>
            );
          })}
        </motion.div>
      )}

      {/* Project Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6 text-sm text-gray-400"
      >
        Showing {sortedProjects.length} {sortedProjects.length === 1 ? 'project' : 'projects'}
      </motion.div>

      {/* Projects Grid with Stagger Animation */}
      <AnimatePresence mode="wait">
        {sortedProjects.length > 0 ? (
          <motion.div
            key={selectedCategory}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
              exit: {
                opacity: 0,
                transition: {
                  staggerChildren: 0.05,
                  staggerDirection: -1,
                },
              },
            }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {sortedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 50,
                    scale: 0.9,
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    scale: 1,
                    transition: {
                      type: 'spring',
                      stiffness: 200,
                      damping: 20,
                    },
                  },
                  exit: {
                    opacity: 0,
                    y: -20,
                    scale: 0.9,
                    transition: {
                      duration: 0.2,
                    },
                  },
                }}
              >
                <ProjectCardModern
                  project={project}
                  index={index}
                  onCardClick={onProjectClick}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="py-20 text-center"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl font-semibold text-gray-300 mb-2">
                No projects found
              </p>
              <p className="text-gray-500">
                Try selecting a different category
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
