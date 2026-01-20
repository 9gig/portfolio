/**
 * ScrollReveal Component
 * 
 * A wrapper component that reveals its children with animations when they
 * enter the viewport. Supports fade-in, slide-up animations, and staggered
 * children animations.
 * 
 * Requirements: 4.1, 4.2, 4.3
 */

'use client';

import React, { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';
import { animations } from '@/styles/design-tokens';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  duration?: number;
  threshold?: number;
  triggerOnce?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
  disabled?: boolean;
}

// Animation variants for different reveal types
const revealVariants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
};

export function ScrollReveal({
  children,
  className,
  animation = 'slideUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  triggerOnce = true,
  stagger = false,
  staggerDelay = 0.1,
  disabled = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { hasIntersected } = useIntersectionObserver(ref, {
    threshold,
    triggerOnce,
    rootMargin: '-100px', // Requirement 4.1: trigger with margin
  });

  // If disabled or reduced motion preferred, render children without animation
  if (disabled || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = revealVariants[animation];

  // Stagger container variants
  const staggerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  // Stagger item variants
  const staggerItemVariants: Variants = {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        duration,
        ease: animations.easings.easeOut,
      },
    },
  };

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        className={cn('scroll-reveal-container', className)}
        initial="hidden"
        animate={hasIntersected ? 'visible' : 'hidden'}
        variants={staggerContainerVariants}
      >
        {React.Children.map(children, (child, index) => (
          <motion.div key={index} variants={staggerItemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn('scroll-reveal', className)}
      initial="hidden"
      animate={hasIntersected ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        duration,
        delay,
        ease: animations.easings.easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollRevealItem - Individual item for staggered animations
 * Use this when you need more control over individual items
 */
export interface ScrollRevealItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollRevealItem({
  children,
  className,
  delay = 0,
}: ScrollRevealItemProps) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: animations.easings.easeOut,
      },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/**
 * useScrollReveal - Hook for custom scroll reveal implementations
 */
export function useScrollReveal(options?: {
  threshold?: number;
  triggerOnce?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting, hasIntersected } = useIntersectionObserver(ref, {
    threshold: options?.threshold ?? 0.1,
    triggerOnce: options?.triggerOnce ?? true,
    rootMargin: '-100px',
  });

  return {
    ref,
    isIntersecting,
    hasIntersected,
    isVisible: hasIntersected,
  };
}
