import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { siteConfig } from '@/config/site';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  setResolvedTheme: (theme: 'light' | 'dark') => void;
}

/**
 * Theme store with persistence
 * 
 * Requirements:
 * - 11.5: Save theme preference to localStorage
 * - 11.6: Use system preference as default when no preference is stored
 * 
 * The store uses Zustand's persist middleware to save the theme preference
 * to localStorage. On initial load, it uses the default theme from site config,
 * which can be set to 'system' to respect user's OS preference.
 */
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      // Default theme from config (Requirement 11.6)
      // If set to 'system', will use OS preference
      theme: siteConfig.theme.defaultTheme,
      
      // Resolved theme is the actual theme being displayed
      // (either 'light' or 'dark', never 'system')
      resolvedTheme: 'light',
      
      // Update theme preference (Requirement 11.5)
      setTheme: (theme) => set({ theme }),
      
      // Update resolved theme (used internally)
      setResolvedTheme: (resolvedTheme) => set({ resolvedTheme }),
    }),
    {
      // Storage key in localStorage (Requirement 11.5)
      name: 'theme-storage',
      
      // Only persist the theme preference, not the resolved theme
      // This ensures system theme is re-evaluated on each load
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);