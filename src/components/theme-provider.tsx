'use client';

import { useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';

/**
 * Theme Provider Component
 * 
 * Requirements:
 * - 11.5: Load theme on mount from localStorage
 * - 11.6: Use system preference as default
 * 
 * This provider ensures the theme is properly initialized on mount
 * and prevents flash of unstyled content (FOUC).
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme();

  // Initialize theme on mount (Requirement 11.5)
  useEffect(() => {
    // This effect ensures theme is applied on initial load
    const root = document.documentElement;
    
    // Prevent flash of unstyled content
    root.style.setProperty('color-scheme', resolvedTheme);
    
    // Add a data attribute for debugging
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-resolved-theme', resolvedTheme);
  }, [theme, resolvedTheme]);

  return <>{children}</>;
}
