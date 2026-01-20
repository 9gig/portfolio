/**
 * SkillBadgeModern Component
 * 
 * Modern skill badge with glassmorphism effects, hover animations,
 * glow effects, and proficiency indicators.
 * 
 * Requirements: 7.1, 7.2, 7.4
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Skill } from '@/types';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import { animations } from '@/styles/design-tokens';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface SkillBadgeModernProps {
  skill: Skill;
  delay?: number;
  category?: string;
}

// Proficiency level to percentage mapping
const proficiencyLevels = {
  beginner: 25,
  intermediate: 50,
  advanced: 75,
  expert: 100,
} as const;

// Proficiency gradient colors
const proficiencyGradients = {
  beginner: 'from-gray-500 to-gray-400',
  intermediate: 'from-blue-500 to-cyan-400',
  advanced: 'from-purple-500 to-pink-400',
  expert: 'from-green-500 to-emerald-400',
} as const;

export function SkillBadgeModern({ skill, delay = 0, category }: SkillBadgeModernProps) {
  const prefersReducedMotion = useReducedMotion();
  const proficiencyWidth = skill.proficiency 
    ? proficiencyLevels[skill.proficiency] 
    : 0;
  
  const proficiencyGradient = skill.proficiency
    ? proficiencyGradients[skill.proficiency]
    : 'from-gray-500 to-gray-400';

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={prefersReducedMotion ? {} : {
        delay,
        ...animations.easings.spring,
      }}
      whileHover={prefersReducedMotion ? {} : {
        scale: 1.1,
        rotate: 5,
        transition: {
          duration: animations.durations.normal / 1000,
        },
      }}
      className="relative group"
      data-testid="skill-badge-modern"
      data-skill-name={skill.name}
      data-category={category}
    >
      {/* Glow Effect */}
      <div 
        className={cn(
          'absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300',
          'bg-gradient-to-r',
          proficiencyGradient
        )}
        style={{ transform: 'scale(1.1)' }}
        aria-hidden="true"
      />
      
      <GlassCard 
        className="text-center relative z-10" 
        size="md"
        hover={false}
      >
        {/* Skill Icon */}
        {skill.icon && (
          <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center">
            <span className="text-3xl" aria-hidden="true">
              {skill.icon}
            </span>
          </div>
        )}
        
        {/* Skill Name */}
        <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
          {skill.name}
        </p>
        
        {/* Years of Experience */}
        {skill.yearsOfExperience && (
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'}
          </p>
        )}
        
        {/* Proficiency Indicator */}
        {skill.proficiency && (
          <div className="mt-3">
            <div className="h-1 bg-gray-700/30 dark:bg-gray-300/20 rounded-full overflow-hidden">
              <motion.div
                initial={prefersReducedMotion ? { width: `${proficiencyWidth}%` } : { width: 0 }}
                whileInView={prefersReducedMotion ? {} : { width: `${proficiencyWidth}%` }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? {} : {
                  delay: delay + 0.2,
                  duration: 0.8,
                  ease: animations.easings.easeOut,
                }}
                className={cn(
                  'h-full bg-gradient-to-r',
                  proficiencyGradient
                )}
              />
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">
              {skill.proficiency}
            </p>
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
}
