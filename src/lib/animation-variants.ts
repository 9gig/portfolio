import { Variants } from 'framer-motion';

/**
 * Reusable animation variants for consistent animations across the app
 * Includes mobile-optimized variants with reduced complexity
 */

/**
 * Check if device is mobile for animation optimization
 */
function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

/**
 * Get optimized duration based on device
 */
function getOptimizedDuration(baseDuration: number): number {
  return isMobileDevice() ? baseDuration * 0.7 : baseDuration;
}

// Fade animations
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: getOptimizedDuration(0.6), ease: 'easeOut' } 
  },
};

// Slide animations
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: isMobileDevice() ? 30 : 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: getOptimizedDuration(0.6), ease: 'easeOut' } 
  },
};

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: isMobileDevice() ? -30 : -50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: getOptimizedDuration(0.6), ease: 'easeOut' } 
  },
};

export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: isMobileDevice() ? -30 : -50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: getOptimizedDuration(0.6), ease: 'easeOut' } 
  },
};

export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: isMobileDevice() ? 30 : 50 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: getOptimizedDuration(0.6), ease: 'easeOut' } 
  },
};

// Stagger animations (reduced stagger on mobile)
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: isMobileDevice() ? 0.05 : 0.1,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: getOptimizedDuration(0.5),
      ease: 'easeOut',
    },
  },
};

// Hover animations
export const hoverScaleVariants: Variants = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05, 
    transition: { duration: 0.2, ease: 'easeInOut' } 
  },
};

export const hoverLiftVariants: Variants = {
  rest: { y: 0, boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' },
  hover: { 
    y: -4, 
    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    transition: { duration: 0.2, ease: 'easeInOut' } 
  },
};

export const hoverBrightenVariants: Variants = {
  rest: { filter: 'brightness(1)' },
  hover: { 
    filter: 'brightness(1.1)', 
    transition: { duration: 0.2, ease: 'easeInOut' } 
  },
};

// Page transition animations
export const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' }
  },
};

// Scale animations
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.5, ease: 'easeOut' } 
  },
};

// Rotate animations
export const rotateInVariants: Variants = {
  hidden: { opacity: 0, rotate: -10 },
  visible: { 
    opacity: 1, 
    rotate: 0, 
    transition: { duration: 0.6, ease: 'easeOut' } 
  },
};
