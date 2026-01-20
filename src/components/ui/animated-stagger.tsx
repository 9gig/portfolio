'use client';

import { useRef, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/lib/utils';

interface AnimatedStaggerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

// Stagger container variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Child item variants
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * AnimatedStagger component
 * Animates children with a stagger effect
 * Children should be wrapped with motion components using staggerItemVariants
 */
export function AnimatedStagger({
  children,
  staggerDelay = 0.1,
  className,
}: AnimatedStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { hasIntersected } = useIntersectionObserver(ref, {
    threshold: 0.1,
    triggerOnce: true,
  });
  const prefersReducedMotion = useReducedMotion();

  // If user prefers reduced motion, show content immediately without animation
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  // Custom variants with configurable stagger delay
  const customContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={hasIntersected ? 'visible' : 'hidden'}
      variants={customContainerVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
