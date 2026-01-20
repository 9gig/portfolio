/**
 * Responsive Design Utilities
 * 
 * This module provides utilities for ensuring responsive design compliance
 * across the portfolio website, including touch target sizes, text readability,
 * and viewport-specific layouts.
 * 
 * Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6
 */

/**
 * Minimum touch target size for accessibility (44x44px)
 * Requirement 7.5
 */
export const MIN_TOUCH_TARGET_SIZE = 44;

/**
 * Minimum body text size for readability (16px)
 * Requirement 7.6
 */
export const MIN_BODY_TEXT_SIZE = 16;

/**
 * Tailwind breakpoints for reference
 */
export const BREAKPOINTS = {
  sm: 640,   // Mobile landscape / Small tablets
  md: 768,   // Tablets
  lg: 1024,  // Desktop
  xl: 1280,  // Large desktop
  '2xl': 1536, // Extra large desktop
} as const;

/**
 * Standard spacing values for consistent responsive layouts
 */
export const RESPONSIVE_SPACING = {
  section: {
    mobile: 'py-12 px-4',
    tablet: 'md:py-16 md:px-6',
    desktop: 'lg:py-24 lg:px-8',
  },
  container: {
    mobile: 'px-4',
    tablet: 'sm:px-6',
    desktop: 'lg:px-8',
  },
  gap: {
    mobile: 'gap-4',
    tablet: 'sm:gap-6',
    desktop: 'lg:gap-8',
  },
} as const;

/**
 * Typography scale with responsive sizing
 * Ensures minimum 16px body text (Requirement 7.6)
 */
export const RESPONSIVE_TEXT = {
  // Headings
  h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl',
  h2: 'text-3xl sm:text-4xl md:text-5xl',
  h3: 'text-2xl sm:text-3xl md:text-4xl',
  h4: 'text-xl sm:text-2xl md:text-3xl',
  h5: 'text-lg sm:text-xl md:text-2xl',
  h6: 'text-base sm:text-lg md:text-xl',
  
  // Body text (minimum 16px)
  body: 'text-base md:text-lg', // 16px -> 18px
  bodyLarge: 'text-lg md:text-xl', // 18px -> 20px
  bodySmall: 'text-sm md:text-base', // 14px -> 16px
  
  // UI text
  caption: 'text-xs sm:text-sm', // 12px -> 14px
  label: 'text-sm md:text-base', // 14px -> 16px
} as const;

/**
 * Touch target classes ensuring minimum 44x44px size
 * Requirement 7.5
 */
export const TOUCH_TARGET = {
  button: 'min-h-[44px] min-w-[44px] px-4 py-2',
  iconButton: 'h-11 w-11 p-2', // 44px
  link: 'inline-block min-h-[44px] py-2',
  input: 'min-h-[44px] px-3 py-2',
} as const;

/**
 * Grid layouts for different screen sizes
 */
export const RESPONSIVE_GRID = {
  // 1 column mobile, 2 tablet, 3 desktop
  cards: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  
  // 1 column mobile, 2 desktop
  twoColumn: 'grid grid-cols-1 md:grid-cols-2',
  
  // 1 column mobile, 3 desktop
  threeColumn: 'grid grid-cols-1 md:grid-cols-3',
  
  // Sidebar layout
  sidebar: 'grid grid-cols-1 lg:grid-cols-[300px_1fr]',
  
  // Auto-fit responsive grid
  autoFit: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
} as const;

/**
 * Container max-widths for different content types
 */
export const CONTAINER_WIDTHS = {
  narrow: 'max-w-2xl', // 672px - for forms, single column content
  medium: 'max-w-4xl', // 896px - for articles, about sections
  wide: 'max-w-6xl',   // 1152px - for project grids
  full: 'max-w-7xl',   // 1280px - for full-width sections
} as const;

/**
 * Utility function to combine responsive classes
 */
export function responsiveClasses(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Check if current viewport matches a breakpoint
 * (Client-side only)
 */
export function matchesBreakpoint(breakpoint: keyof typeof BREAKPOINTS): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= BREAKPOINTS[breakpoint];
}

/**
 * Get current breakpoint name
 * (Client-side only)
 */
export function getCurrentBreakpoint(): keyof typeof BREAKPOINTS | 'xs' {
  if (typeof window === 'undefined') return 'xs';
  
  const width = window.innerWidth;
  
  if (width >= BREAKPOINTS['2xl']) return '2xl';
  if (width >= BREAKPOINTS.xl) return 'xl';
  if (width >= BREAKPOINTS.lg) return 'lg';
  if (width >= BREAKPOINTS.md) return 'md';
  if (width >= BREAKPOINTS.sm) return 'sm';
  
  return 'xs';
}

/**
 * Hook to get current breakpoint (for use in React components)
 */
export function useBreakpoint() {
  if (typeof window === 'undefined') {
    return 'xs';
  }
  
  const [breakpoint, setBreakpoint] = React.useState<keyof typeof BREAKPOINTS | 'xs'>(
    getCurrentBreakpoint()
  );
  
  React.useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getCurrentBreakpoint());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return breakpoint;
}

// Import React for the hook
import * as React from 'react';
