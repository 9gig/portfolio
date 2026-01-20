'use client';

import { useRef, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'slide-in-left' | 'slide-in-right';
  delay?: number;
  className?: string;
}

// Animation variants for different animation types
const animationVariants: Record<string, Variants> = {
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.6,
        ease: 'easeOut'
      } 
    },
  },
  'slide-up': {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: 'easeOut'
      } 
    },
  },
  'slide-in-left': {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.6,
        ease: 'easeOut'
      } 
    },
  },
  'slide-in-right': {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.6,
        ease: 'easeOut'
      } 
    },
  },
};

/**
 * AnimatedSection component
 * Wraps content with scroll-triggered animations
 * Respects user's reduced motion preference
 */
export function AnimatedSection({
  children,
  animation = 'fade-in',
  delay = 0,
  className,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { hasIntersected } = useIntersectionObserver(ref, {
    threshold: 0.1,
    triggerOnce: true,
  });
  const prefersReducedMotion = useReducedMotion();

  // Get the animation variants for the selected animation type
  const variants = animationVariants[animation] || animationVariants['fade-in'];

  // If user prefers reduced motion, show content immediately without animation
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  // Apply delay to the transition if specified
  const variantsWithDelay = delay > 0 ? {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        ...(variants.visible as any).transition,
        delay,
      },
    },
  } : variants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={hasIntersected ? 'visible' : 'hidden'}
      variants={variantsWithDelay}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
