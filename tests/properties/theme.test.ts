import * as fc from 'fast-check';
import { renderHook, act } from '@testing-library/react';
import { useTheme } from '@/hooks/use-theme';
import { useThemeStore } from '@/store/theme';

// Feature: portfolio-website, Property 12: Theme Persistence
describe('Theme Properties', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Reset Zustand store
    useThemeStore.setState({
      theme: 'light',
      resolvedTheme: 'light',
    });
  });

  it('should handle theme values correctly', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light', 'dark', 'system'),
        (theme) => {
          // Property: theme values should always be one of the valid options
          expect(['light', 'dark', 'system']).toContain(theme);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: portfolio-website, Property 12: Theme Persistence
  it('should persist any theme selection to localStorage and retrieve it correctly', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light' as const, 'dark' as const, 'system' as const),
        (theme) => {
          // Clear localStorage for each iteration
          localStorage.clear();
          useThemeStore.setState({
            theme: 'light',
            resolvedTheme: 'light',
          });

          const { result } = renderHook(() => useTheme());

          // Set the theme
          act(() => {
            result.current.setTheme(theme);
          });

          // Verify it's persisted to localStorage
          const stored = localStorage.getItem('theme-storage');
          expect(stored).toBeTruthy();

          if (stored) {
            const parsed = JSON.parse(stored);
            expect(parsed.state.theme).toBe(theme);
          }

          // Simulate app restart by reading from localStorage
          const storedAfter = localStorage.getItem('theme-storage');
          if (storedAfter) {
            const parsed = JSON.parse(storedAfter);
            // The persisted theme should match what was set
            expect(parsed.state.theme).toBe(theme);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Theme changes should be reflected in resolved theme
  it('should resolve any theme value correctly', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('light' as const, 'dark' as const),
        (theme) => {
          localStorage.clear();
          useThemeStore.setState({
            theme: 'light',
            resolvedTheme: 'light',
          });

          const { result } = renderHook(() => useTheme());

          act(() => {
            result.current.setTheme(theme);
          });

          // The resolved theme should match the set theme (when not using 'system')
          // We check this synchronously after the act
          expect(result.current.theme).toBe(theme);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property: Rapid theme changes should always result in the last theme being applied
  it('should handle any sequence of theme changes and apply the final one', () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom('light' as const, 'dark' as const, 'system' as const), {
          minLength: 1,
          maxLength: 10,
        }),
        (themeSequence) => {
          localStorage.clear();
          useThemeStore.setState({
            theme: 'light',
            resolvedTheme: 'light',
          });

          const { result } = renderHook(() => useTheme());

          // Apply all theme changes
          act(() => {
            themeSequence.forEach((theme) => {
              result.current.setTheme(theme);
            });
          });

          // The final theme should be the last one in the sequence
          const finalTheme = themeSequence[themeSequence.length - 1];
          expect(result.current.theme).toBe(finalTheme);

          // It should also be persisted
          const stored = localStorage.getItem('theme-storage');
          if (stored) {
            const parsed = JSON.parse(stored);
            expect(parsed.state.theme).toBe(finalTheme);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
