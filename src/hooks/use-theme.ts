import { useEffect } from 'react';
import { useThemeStore } from '@/store/theme';

/**
 * Theme hook with system preference support
 * 
 * Requirements:
 * - 11.1: Implement theme switching logic
 * - 11.5: Load theme from localStorage on mount
 * - 11.6: Use system preference as default when theme is 'system'
 * 
 * This hook manages theme state and applies it to the document.
 * It automatically detects system theme preference and listens for changes.
 */
export function useTheme() {
  const { theme, setTheme, resolvedTheme, setResolvedTheme } = useThemeStore();

  // Detect system theme preference (Requirement 11.6)
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Apply theme to document (Requirement 11.1)
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    let effectiveTheme: 'light' | 'dark';
    
    // Resolve 'system' theme to actual light/dark (Requirement 11.6)
    if (theme === 'system') {
      effectiveTheme = getSystemTheme();
    } else {
      effectiveTheme = theme;
    }
    
    // Apply theme class (CSS handles transitions via globals.css)
    root.classList.add(effectiveTheme);
    
    // Update color-scheme for native browser elements
    root.style.setProperty('color-scheme', effectiveTheme);
    
    // Update resolved theme in store
    if (effectiveTheme !== resolvedTheme) {
      setResolvedTheme(effectiveTheme);
    }
  }, [theme, resolvedTheme, setResolvedTheme]);

  // Listen for system theme changes (Requirement 11.6)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if user has selected 'system' theme
      if (theme === 'system') {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        const newTheme = e.matches ? 'dark' : 'light';
        root.classList.add(newTheme);
        setResolvedTheme(newTheme);
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Legacy browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme, setResolvedTheme]);

  return {
    theme,
    setTheme,
    resolvedTheme,
  };
}