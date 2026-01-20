/**
 * Glassmorphism Utilities
 * 
 * Utility functions and classes for creating glassmorphism effects
 * with proper theme support and accessibility considerations.
 * Includes mobile optimizations for better performance.
 */

import { glassmorphism, type ColorMode } from './design-tokens';

/**
 * Check if device is mobile
 */
function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

/**
 * Get glassmorphism CSS properties for a given theme mode
 * Automatically optimizes for mobile devices
 */
export function getGlassmorphismStyles(mode: ColorMode = 'dark') {
  const styles = glassmorphism[mode];
  const isMobile = isMobileDevice();
  
  // Reduce blur on mobile for better performance
  const blurAmount = isMobile ? '8px' : styles.blur;
  
  return {
    backgroundColor: styles.background,
    backdropFilter: `blur(${blurAmount})`,
    WebkitBackdropFilter: `blur(${blurAmount})`, // Safari support
    border: `1px solid ${styles.border}`,
    boxShadow: styles.shadow,
  };
}

/**
 * Generate glassmorphism CSS class string
 */
export function getGlassmorphismClass(mode: ColorMode = 'dark'): string {
  if (mode === 'light') {
    return 'glass-light';
  }
  return 'glass-dark';
}

/**
 * CSS-in-JS styles for glassmorphism cards
 */
export const glassCardStyles = {
  light: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  },
  dark: {
    background: 'rgba(17, 25, 40, 0.75)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    border: '1px solid rgba(255, 255, 255, 0.125)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  },
} as const;

/**
 * Tailwind CSS classes for glassmorphism effects
 */
export const glassTailwindClasses = {
  base: 'backdrop-blur-md border rounded-2xl',
  light: 'bg-white/10 border-white/20 shadow-lg',
  dark: 'bg-slate-900/75 border-white/[0.125] shadow-2xl',
  hover: 'hover:bg-opacity-20 transition-all duration-300',
} as const;

/**
 * Get complete Tailwind class string for glassmorphism
 */
export function getGlassTailwindClass(
  mode: ColorMode = 'dark',
  includeHover: boolean = true
): string {
  const classes: string[] = [
    glassTailwindClasses.base,
    mode === 'light' ? glassTailwindClasses.light : glassTailwindClasses.dark,
  ];
  
  if (includeHover) {
    classes.push(glassTailwindClasses.hover);
  }
  
  return classes.join(' ');
}

/**
 * Variants for different glassmorphism intensities
 * Mobile-optimized with reduced blur
 */
export const glassVariants = {
  subtle: {
    light: 'bg-white/5 backdrop-blur-[4px] md:backdrop-blur-sm border-white/10',
    dark: 'bg-slate-900/50 backdrop-blur-[4px] md:backdrop-blur-sm border-white/5',
  },
  medium: {
    light: 'bg-white/10 backdrop-blur-[8px] md:backdrop-blur-md border-white/20',
    dark: 'bg-slate-900/75 backdrop-blur-[8px] md:backdrop-blur-md border-white/[0.125]',
  },
  strong: {
    light: 'bg-white/20 backdrop-blur-[12px] md:backdrop-blur-lg border-white/30',
    dark: 'bg-slate-900/90 backdrop-blur-[12px] md:backdrop-blur-lg border-white/20',
  },
} as const;

/**
 * Get glassmorphism variant class
 */
export function getGlassVariant(
  intensity: 'subtle' | 'medium' | 'strong' = 'medium',
  mode: ColorMode = 'dark'
): string {
  return glassVariants[intensity][mode];
}
