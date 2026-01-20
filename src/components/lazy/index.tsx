/**
 * Lazy Loaded Components
 * 
 * Dynamic imports for heavy components to optimize initial bundle size.
 * These components are loaded on-demand when they enter the viewport.
 * 
 * Requirements: 15.2
 */

import dynamic from 'next/dynamic';
import React, { ComponentType } from 'react';

// Lazy load hero section (above fold, but heavy due to animations)
export const LazyHeroSection = dynamic(
  () => import('@/components/hero/hero-section').then((mod) => ({ default: mod.HeroSection })),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    ),
    ssr: true, // Keep SSR for hero section for SEO
  }
);

// Lazy load project grid (below fold, heavy animations)
export const LazyProjectGridModern = dynamic(
  () => import('@/components/projects/project-grid-modern').then((mod) => ({ default: mod.ProjectGridModern })),
  {
    loading: () => (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-96 bg-gray-800/50 rounded-2xl animate-pulse" />
        ))}
      </div>
    ),
    ssr: false, // Disable SSR for below-fold content
  }
);

// Lazy load skills grid (below fold, many animations)
export const LazySkillsGrid = dynamic(
  () => import('@/components/skills/skills-grid').then((mod) => ({ default: mod.SkillsGrid })),
  {
    loading: () => (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-8 w-48 bg-gray-800/50 rounded mb-4 animate-pulse" />
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((j) => (
                <div key={j} className="h-24 bg-gray-800/50 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
    ssr: false,
  }
);

// Lazy load experience timeline (below fold, complex animations)
export const LazyTimeline = dynamic(
  () => import('@/components/experience/timeline').then((mod) => ({ default: mod.Timeline })),
  {
    loading: () => (
      <div className="space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-gray-800/50 rounded-2xl animate-pulse" />
        ))}
      </div>
    ),
    ssr: false,
  }
);

// Lazy load contact form (below fold, form interactions)
export const LazyContactFormModern = dynamic(
  () => import('@/components/contact/contact-form-modern').then((mod) => ({ default: mod.ContactFormModern })),
  {
    loading: () => (
      <div className="max-w-2xl mx-auto">
        <div className="h-96 bg-gray-800/50 rounded-2xl animate-pulse" />
      </div>
    ),
    ssr: false,
  }
);

// Lazy load navigation mobile menu (only loaded when needed)
export const LazyMobileMenu = dynamic(
  () => import('@/components/navigation/mobile-menu').then((mod) => ({ default: mod.MobileMenu })),
  {
    loading: () => null,
    ssr: false,
  }
);

// Preload components on idle
export function preloadBelowFoldComponents() {
  if (typeof window === 'undefined') return;

  // Use requestIdleCallback to preload during idle time
  const preload = () => {
    import('@/components/projects/project-grid-modern');
    import('@/components/skills/skills-grid');
    import('@/components/experience/timeline');
    import('@/components/contact/contact-form-modern');
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(preload);
  } else {
    setTimeout(preload, 1);
  }
}
