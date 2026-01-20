/**
 * ProjectCardModern Component
 * 
 * Modern project card with glassmorphism effects, gradient border animations,
 * scale and lift effects, and animated technology tags.
 * 
 * Requirements: 6.1, 6.2, 6.3, 6.4
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';
import { GlassCard } from '@/components/ui/glass-card';
import { gradients, animations } from '@/styles/design-tokens';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
// Icon components
const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

interface ProjectCardModernProps {
  project: Project;
  index?: number;
  onCardClick?: (project: Project) => void;
}

export function ProjectCardModern({ 
  project, 
  index = 0,
  onCardClick 
}: ProjectCardModernProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleClick = (e: React.MouseEvent) => {
    if (onCardClick) {
      e.preventDefault();
      onCardClick(project);
    }
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 50 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={prefersReducedMotion ? {} : { 
        delay: index * 0.1,
        duration: animations.durations.slow / 1000,
        ease: animations.easings.easeOut,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <div className="group relative">
        {/* Animated Gradient Border */}
        <motion.div
          className="absolute -inset-[2px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: gradients.primary,
          }}
          animate={isHovered && !prefersReducedMotion ? { 
            background: [
              gradients.primary,
              gradients.accent,
              gradients.secondary,
              gradients.primary,
            ],
          } : {}}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: 'linear' 
          }}
        />

        {/* Card Content */}
        <GlassCard 
          hover={true}
          className="relative overflow-hidden"
          intensity="strong"
        >
          {/* Project Image with Overlay */}
          <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
            {project.imageUrl ? (
              <>
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              </>
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{
                  background: gradients.aurora,
                }}
              >
                <div className="text-center">
                  <div className="text-6xl font-bold text-white/90">
                    {project.title.substring(0, 2).toUpperCase()}
                  </div>
                </div>
              </div>
            )}

            {/* Featured Badge */}
            {project.featured && (
              <motion.div
                initial={prefersReducedMotion ? {} : { scale: 0, rotate: -45 }}
                animate={prefersReducedMotion ? {} : { scale: 1, rotate: 0 }}
                transition={prefersReducedMotion ? {} : animations.easings.springBouncy}
                className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg"
                style={{
                  background: gradients.warm,
                }}
              >
                Featured
              </motion.div>
            )}
          </div>

          {/* Project Info */}
          <div className="space-y-4">
            {/* Title */}
            <h3 
              className="text-2xl font-bold bg-clip-text text-transparent"
              style={{
                backgroundImage: gradients.primary,
              }}
            >
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-gray-300 text-sm line-clamp-3">
              {project.description}
            </p>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0 }}
                  animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                  transition={prefersReducedMotion ? {} : { 
                    delay: 0.5 + i * 0.05,
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                  }}
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-colors cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3 pt-2">
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1"
                >
                  <motion.button
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white/10 border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <GithubIcon />
                    Code
                  </motion.button>
                </Link>
              )}
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1"
                >
                  <motion.button
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
                    style={{
                      background: gradients.accent,
                    }}
                  >
                    <ExternalLinkIcon />
                    Live Demo
                  </motion.button>
                </Link>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
}
