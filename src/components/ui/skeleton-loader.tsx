/**
 * Skeleton Loader Components
 * 
 * Modern skeleton loaders with shimmer effects for loading states.
 * Provides visual feedback while content is being fetched.
 * 
 * Requirements: 13.1, 13.2, 13.3
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  shimmer?: boolean;
}

/**
 * Base skeleton component with shimmer effect
 */
export function Skeleton({ className, shimmer = true }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-gray-800/50',
        className
      )}
      role="status"
      aria-label="Loading"
    >
      {shimmer && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/30 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </div>
  );
}

/**
 * Project card skeleton loader
 */
export function ProjectCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/75 backdrop-blur-md p-6">
      {/* Image skeleton */}
      <Skeleton className="h-48 mb-4 rounded-lg" />
      
      {/* Title skeleton */}
      <Skeleton className="h-8 w-3/4 mb-2" />
      
      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      
      {/* Tags skeleton */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-14" />
      </div>
      
      {/* Buttons skeleton */}
      <div className="flex gap-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  );
}

/**
 * Skill badge skeleton loader
 */
export function SkillBadgeSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/75 backdrop-blur-md p-4">
      {/* Icon skeleton */}
      <Skeleton className="w-12 h-12 mx-auto mb-2 rounded-full" />
      
      {/* Name skeleton */}
      <Skeleton className="h-4 w-20 mx-auto mb-2" />
      
      {/* Proficiency bar skeleton */}
      <Skeleton className="h-1 w-full" />
    </div>
  );
}

/**
 * Experience card skeleton loader
 */
export function ExperienceCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/75 backdrop-blur-md p-6">
      {/* Company logo skeleton */}
      <Skeleton className="w-16 h-16 mb-4 rounded-lg" />
      
      {/* Title skeleton */}
      <Skeleton className="h-6 w-2/3 mb-2" />
      
      {/* Company and date skeleton */}
      <Skeleton className="h-4 w-1/2 mb-4" />
      
      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      
      {/* Technologies skeleton */}
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-14" />
      </div>
    </div>
  );
}

/**
 * Hero section skeleton loader
 */
export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto px-4">
        {/* Avatar skeleton */}
        <Skeleton className="w-32 h-32 mx-auto mb-8 rounded-full" />
        
        {/* Name skeleton */}
        <Skeleton className="h-16 w-96 mx-auto mb-4" />
        
        {/* Title skeleton */}
        <Skeleton className="h-8 w-64 mx-auto mb-6" />
        
        {/* Bio skeleton */}
        <div className="space-y-2 mb-8 max-w-2xl mx-auto">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6 mx-auto" />
        </div>
        
        {/* Buttons skeleton */}
        <div className="flex gap-4 justify-center">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-40" />
        </div>
      </div>
    </div>
  );
}

/**
 * Contact form skeleton loader
 */
export function ContactFormSkeleton() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/75 backdrop-blur-md p-8">
        {/* Form fields skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * Grid skeleton loader for multiple items
 */
interface GridSkeletonProps {
  count?: number;
  columns?: 2 | 3 | 4 | 6;
  itemComponent?: React.ComponentType;
}

export function GridSkeleton({
  count = 6,
  columns = 3,
  itemComponent: ItemComponent = ProjectCardSkeleton,
}: GridSkeletonProps) {
  const gridCols = {
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-2 lg:grid-cols-3',
    4: 'sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6',
  };

  return (
    <div className={cn('grid gap-6', gridCols[columns])}>
      {Array.from({ length: count }).map((_, i) => (
        <ItemComponent key={i} />
      ))}
    </div>
  );
}

/**
 * Section header skeleton
 */
export function SectionHeaderSkeleton() {
  return (
    <div className="text-center mb-16">
      <Skeleton className="h-12 w-96 mx-auto mb-4" />
      <Skeleton className="h-6 w-64 mx-auto" />
    </div>
  );
}
