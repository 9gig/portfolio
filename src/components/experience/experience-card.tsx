/**
 * ExperienceCard Component
 * 
 * Displays a single work experience entry with glassmorphism design,
 * staggered entrance animations, and hover effects.
 * 
 * Requirements: 17.2, 17.3, 17.4
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '@/types';
import { GlassCard } from '@/components/ui/glass-card';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { animations } from '@/styles/design-tokens';
import { cn } from '@/lib/utils';

// Icon components
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  isLeft: boolean;
}

export function ExperienceCard({ experience, index, isLeft }: ExperienceCardProps) {
  const prefersReducedMotion = useReducedMotion();

  // Format date range
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const startDate = formatDate(experience.startDate);
  const endDate = experience.endDate ? formatDate(experience.endDate) : 'Present';
  const dateRange = `${startDate} - ${endDate}`;

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : isLeft ? -50 : 50,
      y: prefersReducedMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: animations.durations.slow / 1000,
        delay: index * 0.2,
        ease: animations.easings.easeOut,
      },
    },
  };

  const achievementVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.2 + 0.3 + i * 0.1,
        duration: animations.durations.normal / 1000,
      },
    }),
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={cn(
        'relative',
        // Desktop: alternating layout
        'md:w-[calc(50%-2rem)]',
        isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8',
        // Mobile: full width
        'w-full'
      )}
    >
      {/* Timeline Dot - Hidden on mobile, visible on md+ */}
      <div
        className={cn(
          'hidden md:block absolute top-8 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500',
          'shadow-lg shadow-purple-500/50',
          isLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
        )}
      >
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-75" />
      </div>

      {/* Experience Card */}
      <GlassCard
        className="group relative overflow-hidden"
        hover={!prefersReducedMotion}
        size="lg"
      >
        {/* Gradient border glow on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl" />
        </div>

        <div className="relative">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {experience.role}
              </h3>
              {experience.logo && (
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                  {/* Logo placeholder - can be replaced with actual logo */}
                  <BriefcaseIcon className="w-6 h-6 text-purple-400" />
                </div>
              )}
            </div>

            <h4 className="text-xl font-semibold text-gray-300 mb-3">
              {experience.company}
            </h4>

            {/* Meta information */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" />
                <span>{dateRange}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="w-4 h-4" />
                <span>{experience.location}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 mb-4 leading-relaxed">
            {experience.description}
          </p>

          {/* Achievements */}
          {experience.achievements && experience.achievements.length > 0 && (
            <div className="mb-4">
              <h5 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                Key Achievements
              </h5>
              <ul className="space-y-2">
                {experience.achievements.map((achievement, i) => (
                  <motion.li
                    key={i}
                    custom={i}
                    variants={achievementVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-start gap-2 text-gray-400 text-sm"
                  >
                    <span className="text-purple-400 mt-1">•</span>
                    <span>{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          {experience.technologies && experience.technologies.length > 0 && (
            <div>
              <h5 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wide">
                Technologies
              </h5>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0 }}
                    whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.2 + 0.5 + i * 0.05,
                      duration: animations.durations.normal / 1000,
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-purple-500/50 transition-colors"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}
