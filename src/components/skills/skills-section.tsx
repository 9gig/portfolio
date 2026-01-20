'use client';

import { useSiteConfig } from '@/hooks/use-site-config';
import { SkillCategory } from './skill-category';

export function SkillsSection() {
  const config = useSiteConfig();

  // Don't render if skills feature is disabled
  if (!config.features.showSkills) {
    return null;
  }

  // Don't render if no skills are configured
  if (!config.skills || config.skills.length === 0) {
    return null;
  }

  return (
    <section
      id="skills"
      className="section-spacing container-responsive"
      aria-labelledby="skills-heading"
      tabIndex={-1}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-8 md:mb-12 text-center">
          <h2
            id="skills-heading"
            className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl"
          >
            Skills & Technologies
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400">
            Technologies and tools I work with to build production-ready applications
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {config.skills.map((category, index) => (
            <SkillCategory key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
