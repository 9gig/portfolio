/**
 * Design Tokens for Modern UI Redesign
 * 
 * This file contains all design tokens including gradients, colors,
 * glassmorphism styles, and animation configurations.
 * 
 * Requirements: 11.2, 11.3, 11.4 - Theme-aware gradients and glassmorphism
 */

// Gradient definitions for modern UI (light theme)
export const gradients = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  accent: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  success: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  warm: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  cool: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  aurora: 'linear-gradient(135deg, #13FFAA 0%, #7e22ce 50%, #020617 100%)',
  sunset: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
  ocean: 'linear-gradient(135deg, #667eea 0%, #00f2fe 100%)',
  forest: 'linear-gradient(135deg, #56ab2f 0%, #a8e063 100%)',
} as const;

// Dark theme gradient variations (Requirement 11.2)
export const gradientsDark = {
  primary: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
  secondary: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
  accent: 'linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)',
  success: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
  warm: 'linear-gradient(135deg, #f97316 0%, #fbbf24 100%)',
  cool: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
  aurora: 'linear-gradient(135deg, #13FFAA 0%, #a855f7 50%, #0f172a 100%)',
  sunset: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
  ocean: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
  forest: 'linear-gradient(135deg, #22c55e 0%, #84cc16 100%)',
} as const;

/**
 * Get theme-aware gradient (Requirement 11.2)
 * Returns appropriate gradient based on current theme
 */
export function getGradient(key: GradientKey, isDark: boolean): string {
  return isDark ? gradientsDark[key] : gradients[key];
}

// Glassmorphism styles for light and dark themes (Requirements 11.3, 11.4)
export const glassmorphism = {
  light: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.2)',
    blur: '10px',
    shadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  },
  dark: {
    background: 'rgba(17, 25, 40, 0.75)',
    border: 'rgba(255, 255, 255, 0.125)',
    blur: '16px',
    shadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  },
} as const;

/**
 * Get glassmorphism styles for current theme (Requirements 11.3, 11.4)
 */
export function getGlassmorphism(isDark: boolean) {
  return isDark ? glassmorphism.dark : glassmorphism.light;
}

// Animation duration constants (Requirement 11.1)
export const animations = {
  durations: {
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 800,
  },
  easings: {
    easeOut: [0.0, 0.0, 0.2, 1] as const,
    easeInOut: [0.4, 0.0, 0.2, 1] as const,
    spring: { type: 'spring' as const, stiffness: 300, damping: 30 },
    springGentle: { type: 'spring' as const, stiffness: 200, damping: 25 },
    springBouncy: { type: 'spring' as const, stiffness: 400, damping: 20 },
  },
} as const;

// Color palette for modern UI (Requirement 11.2)
export const colors = {
  light: {
    primary: '#667eea',
    secondary: '#764ba2',
    accent: '#4facfe',
    background: '#ffffff',
    foreground: '#1a202c',
    muted: '#f7fafc',
    mutedForeground: '#718096',
  },
  dark: {
    primary: '#7c3aed',
    secondary: '#a855f7',
    accent: '#06b6d4',
    background: '#0f172a',
    foreground: '#f8fafc',
    muted: '#1e293b',
    mutedForeground: '#94a3b8',
  },
} as const;

// Spacing scale
export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '3rem',   // 48px
  '3xl': '4rem',   // 64px
  '4xl': '6rem',   // 96px
} as const;

// Border radius scale
export const borderRadius = {
  sm: '0.25rem',   // 4px
  md: '0.5rem',    // 8px
  lg: '0.75rem',   // 12px
  xl: '1rem',      // 16px
  '2xl': '1.5rem', // 24px
  full: '9999px',
} as const;

// Typography scale
export const typography = {
  fontSizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem',// 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Shadow definitions
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  glow: '0 0 20px rgba(102, 126, 234, 0.5)',
  glowPink: '0 0 20px rgba(245, 87, 108, 0.5)',
} as const;

// Export types for TypeScript
export type GradientKey = keyof typeof gradients;
export type ColorMode = 'light' | 'dark';
export type AnimationDuration = keyof typeof animations.durations;
export type AnimationEasing = keyof typeof animations.easings;
