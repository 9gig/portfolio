/**
 * Timeline Component
 * 
 * Vertical timeline with gradient line displaying work experience.
 * Features alternating card layout on desktop and stacked layout on mobile.
 * 
 * Requirements: 17.1, 17.6
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSiteConfig } from '@/hooks/use-site-config';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { animations } from '@/styles/design-tokens';
import { ExperienceCard } from './experience-card';

export function Timeline() {
  const { experience } = useSiteConfig();
  const prefersReducedMotion = useReducedMotion();

  // Animation variants for the section
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animations.durations.slow / 1000,
        ease: animations.easings.easeOut,
      },
    },
  };

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Title */}
          <motion.h2
            variants={titleVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            Experience
          </motion.h2>

          {/* Timeline Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Gradient Timeline Line - Hidden on mobile, visible on md+ */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 hidden md:block" />

            {/* Experience Cards */}
            <div className="space-y-12 md:space-y-24">
              {experience.map((exp, index) => (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  index={index}
                  isLeft={index % 2 === 0}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
