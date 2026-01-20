import { useEffect } from 'react';
import { useThemeStore } from '@/store/theme';

export function useTheme() {
  const { theme, setTheme, resolvedTheme, setResolvedTheme } = useThemeStore();

  // Detect system theme preference
  const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    
    let effectiveTheme: 'light' | 'dark';
    
    if (theme === 'system') {
      effectiveTheme = getSystemTheme();
    } else {
      effectiveTheme = theme;
    }
    
    // Apply theme class (CSS handles transitions)
    root.classList.add(effectiveTheme);
    
    // Update color-scheme for native browser elements
    root.style.setProperty('color-scheme', effectiveTheme);
    
    // Update resolved theme in store
    if (effectiveTheme !== resolvedTheme) {
      setResolvedTheme(effectiveTheme);
    }
  }, [theme, resolvedTheme, setResolvedTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
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