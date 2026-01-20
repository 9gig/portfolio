/**
 * SkillsGrid Component
 * 
 * Modern skills section with responsive grid layout, category groupings,
 * and staggered badge animations.
 * 
 * Requirements: 7.3, 7.5, 7.6
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSiteConfig } from '@/hooks/use-site-config';
import { SkillBadgeModern } from './skill-badge-modern';
import { animations } from '@/styles/design-tokens';

export function SkillsGrid() {
  const { skills } = useSiteConfig();

  // Don't render if no skills are configured
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <section 
      className="py-20"
      id="skills-modern"
      aria-labelledby="skills-modern-heading"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.h2
          id="skills-modern-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: animations.durations.slow / 1000,
            ease: animations.easings.easeOut,
          }}
          className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Skills & Technologies
        </motion.h2>

        {/* Skills Categories */}
        <div className="space-y-12">
          {skills.map((category, categoryIndex) => (
            <div key={category.name} className="space-y-6">
              {/* Category Header with Gradient Separator */}
              <div className="relative">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: categoryIndex * 0.1,
                    duration: animations.durations.normal / 1000,
                  }}
                  className="text-2xl font-semibold text-gray-300 dark:text-gray-200 mb-4"
                >
                  {category.name}
                </motion.h3>
                
                {/* Gradient Separator */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: categoryIndex * 0.1 + 0.2,
                    duration: animations.durations.slow / 1000,
                  }}
                  className="h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent origin-left"
                  aria-hidden="true"
                />
              </div>

              {/* Skills Grid */}
              <div 
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
                role="list"
                aria-label={`${category.name} skills`}
              >
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} role="listitem">
                    <SkillBadgeModern
                      skill={skill}
                      category={category.name}
                      delay={categoryIndex * 0.1 + skillIndex * 0.05}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
