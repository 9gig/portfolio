'use client';

import { SkillCategory as SkillCategoryType } from '@/types';
import { SkillBadge } from './skill-badge';
import { motion } from 'framer-motion';

interface SkillCategoryProps {
  category: SkillCategoryType;
  index?: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export function SkillCategory({ category, index = 0 }: SkillCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
      data-testid="skill-category"
      data-category-name={category.name}
    >
      {/* Category Title */}
      <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
        {category.name}
      </h3>

      {/* Skills Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap gap-2"
      >
        {category.skills.map((skill) => (
          <motion.div key={skill.name} variants={itemVariants}>
            <SkillBadge skill={skill} category={category.name} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
