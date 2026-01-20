'use client';

import { useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  // Initialize theme on mount
  useEffect(() => {
    // This effect ensures theme is applied on initial load
    const root = document.documentElement;
    
    // Prevent flash of unstyled content
    root.style.setProperty('color-scheme', theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  return <>{children}</>;
}
