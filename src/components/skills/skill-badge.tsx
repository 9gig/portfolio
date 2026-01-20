'use client';

import { Skill } from '@/types';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface SkillBadgeProps {
  skill: Skill;
  category: string;
}

const proficiencyColors = {
  beginner: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  advanced: 'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
  expert: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
};

const proficiencyLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
};

export function SkillBadge({ skill, category }: SkillBadgeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const proficiencyColor = skill.proficiency
    ? proficiencyColors[skill.proficiency]
    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';

  return (
    <motion.div
      whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      data-testid="skill-badge"
      data-skill-name={skill.name}
      data-category={category}
    >
      <div
        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${proficiencyColor}`}
      >
        {/* Icon placeholder - can be enhanced with actual icons */}
        {skill.icon && (
          <span className="text-base" aria-hidden="true">
            {skill.icon}
          </span>
        )}
        <span>{skill.name}</span>
        
        {/* Proficiency indicator */}
        {skill.proficiency && (
          <span
            className="ml-1 flex h-2 w-2 rounded-full"
            style={{
              backgroundColor: 'currentColor',
              opacity: 0.6,
            }}
            aria-label={`Proficiency: ${proficiencyLabels[skill.proficiency]}`}
          />
        )}
      </div>

      {/* Tooltip with additional information */}
      {showTooltip && (skill.proficiency || skill.yearsOfExperience) && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-xs text-white shadow-lg dark:bg-gray-700"
          role="tooltip"
        >
          {skill.proficiency && (
            <div className="font-medium">
              {proficiencyLabels[skill.proficiency]}
            </div>
          )}
          {skill.yearsOfExperience && (
            <div className="text-gray-300 dark:text-gray-400">
              {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'} of experience
            </div>
          )}
          {/* Tooltip arrow */}
          <div className="absolute left-1/2 top-full -translate-x-1/2">
            <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-700" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
