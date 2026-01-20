/**
 * Animation Variants and Utilities
 * 
 * Framer Motion animation variants and utility functions for consistent
 * animations throughout the application.
 */

import { Variants, Transition } from 'framer-motion';
import { animations } from './design-tokens';

/**
 * Base animation variants for common patterns
 */
export const animationVariants = {
  // Fade in animation
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: animations.durations.normal / 1000,
        ease: animations.easings.easeOut,
      },
    },
  } as Variants,

  // Slide up animation
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: animations.durations.normal / 1000,
        ease: animations.easings.easeOut,
      },
    },
  } as Variants,

  // Slide down animation
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: animations.durations.normal / 1000,
        ease: animations.easings.easeOut,
      },
    },
  } as Variants,

  // Slide in from left
  slideInLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: animations.durations.normal / 1000,
        ease: animations.easings.easeOut,
      },
    },
  } as Variants,

  // Slide in from right
  slideInRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: animations.durations.normal / 1000,
        ease: animations.easings.easeOut,
      },
    },
  } as Variants,

  // Scale in animation
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: animations.durations.normal / 1000,
        ease: animations.easings.easeOut,
      },
    },
  } as Variants,

  // Scale in with spring
  scaleInSpring: {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: animations.easings.spring,
    },
  } as Variants,

  // Stagger children animation
  stagger: {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as Variants,

  // Stagger children with faster timing
  staggerFast: {
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  } as Variants,

  // Stagger children with slower timing
  staggerSlow: {
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as Variants,

  // Rotate in animation
  rotateIn: {
    hidden: { opacity: 0, rotate: -180 },
    visible: { 
      opacity: 1, 
      rotate: 0,
      transition: {
        duration: animations.durations.slow / 1000,
        ease: animations.easings.easeOut,
      },
    },
  } as Variants,

  // Blur in animation
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      filter: 'blur(0px)',
      transition: {
        duration: animations.durations.normal / 1000,
        ease: animations.easings.easeOut,
      },
    },
  } as Variants,
} as const;

/**
 * Hover animation variants
 */
export const hoverVariants = {
  // Scale on hover
  scale: {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: animations.durations.fast / 1000,
        ease: animations.easings.easeOut,
      },
    },
  } as Variants,

  // Lift on hover (scale + translateY)
  lift: {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      y: -5,
      transition: {
        duration: animations.durations.normal / 1000,
        ease: animations.easings.easeOut,
      },
    },
  } as Variants,

  // Glow on hover
  glow: {
    rest: { boxShadow: '0 0 0 rgba(102, 126, 234, 0)' },
    hover: { 
      boxShadow: '0 0 20px rgba(102, 126, 234, 0.5)',
      transition: {
        duration: animations.durations.normal / 1000,
        ease: animations.easings.easeOut,
      },
    },
  } as Variants,

  // Rotate slightly on hover
  rotate: {
    rest: { rotate: 0 },
    hover: { 
      rotate: 5,
      transition: {
        duration: animations.durations.fast / 1000,
        ease: animations.easings.easeOut,
      },
    },
  } as Variants,
} as const;

/**
 * Transition presets
 */
export const transitionPresets = {
  fast: {
    duration: animations.durations.fast / 1000,
    ease: animations.easings.easeOut,
  } as Transition,

  normal: {
    duration: animations.durations.normal / 1000,
    ease: animations.easings.easeOut,
  } as Transition,

  slow: {
    duration: animations.durations.slow / 1000,
    ease: animations.easings.easeOut,
  } as Transition,

  spring: animations.easings.spring as Transition,

  springGentle: animations.easings.springGentle as Transition,

  springBouncy: animations.easings.springBouncy as Transition,
} as const;

/**
 * Create a custom stagger variant with specified delay
 */
export function createStaggerVariant(staggerDelay: number = 0.1): Variants {
  return {
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };
}

/**
 * Create a custom fade in variant with specified duration
 */
export function createFadeInVariant(duration: number = 300): Variants {
  return {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: duration / 1000,
        ease: animations.easings.easeOut,
      },
    },
  };
}

/**
 * Create a custom slide variant with specified direction and distance
 */
export function createSlideVariant(
  direction: 'up' | 'down' | 'left' | 'right',
  distance: number = 50,
  duration: number = 300
): Variants {
  const isVertical = direction === 'up' || direction === 'down';
  const value = direction === 'up' || direction === 'left' ? distance : -distance;

  if (isVertical) {
    return {
      hidden: { opacity: 0, y: value },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: duration / 1000,
          ease: animations.easings.easeOut,
        },
      },
    };
  }

  return {
    hidden: { opacity: 0, x: value },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: duration / 1000,
        ease: animations.easings.easeOut,
      },
    },
  };
}

/**
 * Page transition variants
 */
export const pageTransitionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: animations.durations.normal / 1000,
      ease: animations.easings.easeOut,
    },
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: animations.durations.fast / 1000,
      ease: animations.easings.easeOut,
    },
  },
} as const;

/**
 * Modal/Dialog animation variants
 */
export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: animations.durations.fast / 1000,
      ease: animations.easings.easeOut,
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: {
      duration: animations.durations.fast / 1000,
      ease: animations.easings.easeOut,
    },
  },
} as const;

/**
 * Backdrop animation variants
 */
export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: animations.durations.fast / 1000,
    },
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: animations.durations.fast / 1000,
    },
  },
} as const;
