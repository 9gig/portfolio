/**
 * GlassCard Component
 * 
 * A reusable card component with glassmorphism effects, supporting
 * light and dark themes, different variants, sizes, and hover animations.
 * 
 * Requirements: 2.1, 2.2, 2.5
 */

'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getGlassVariant } from '@/styles/glassmorphism';
import { animations } from '@/styles/design-tokens';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark';
  intensity?: 'subtle' | 'medium' | 'strong';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const sizeClasses = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
} as const;

const roundedClasses = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
} as const;

export function GlassCard({
  children,
  className,
  variant = 'dark',
  intensity = 'medium',
  size = 'md',
  hover = true,
  rounded = '2xl',
  ...motionProps
}: GlassCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const glassClasses = getGlassVariant(intensity, variant);
  const sizeClass = sizeClasses[size];
  const roundedClass = roundedClasses[rounded];

  return (
    <motion.div
      className={cn(
        'glass-card',
        glassClasses,
        sizeClass,
        roundedClass,
        'transition-all duration-300',
        hover && 'hover:scale-[1.02]',
        className
      )}
      whileHover={hover && !prefersReducedMotion ? { y: -5 } : undefined}
      transition={{
        duration: animations.durations.normal / 1000,
        ease: animations.easings.easeOut,
      }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

/**
 * GlassCardHeader - Optional header section for GlassCard
 */
export interface GlassCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCardHeader({ children, className }: GlassCardHeaderProps) {
  return (
    <div className={cn('mb-4 pb-4 border-b border-white/10', className)}>
      {children}
    </div>
  );
}

/**
 * GlassCardContent - Optional content section for GlassCard
 */
export interface GlassCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCardContent({ children, className }: GlassCardContentProps) {
  return <div className={cn('space-y-2', className)}>{children}</div>;
}

/**
 * GlassCardFooter - Optional footer section for GlassCard
 */
export interface GlassCardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCardFooter({ children, className }: GlassCardFooterProps) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-white/10', className)}>
      {children}
    </div>
  );
}
