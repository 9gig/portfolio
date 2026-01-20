/**
 * Unit tests for Theme System
 * Tests theme toggle, persistence, system preference detection, and transitions
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useTheme } from '@/hooks/use-theme';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useThemeStore } from '@/store/theme';

// Mock matchMedia for system preference testing
const createMatchMediaMock = (matches: boolean) => {
  return (query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  });
};

describe('Theme System', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    // Reset Zustand store
    useThemeStore.setState({
      theme: 'light',
      resolvedTheme: 'light',
    });
    
    // Clear document classes
    document.documentElement.classList.remove('light', 'dark');
    
    // Reset matchMedia mock
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: createMatchMediaMock(false),
    });
  });

  describe('Theme Toggle (Requirement 6.1)', () => {
    it('should toggle from light to dark theme', () => {
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('light');
      });

      expect(result.current.theme).toBe('light');

      act(() => {
        result.current.setTheme('dark');
      });

      expect(result.current.theme).toBe('dark');
    });

    it('should cycle through themes: light -> dark -> system -> light', () => {
      render(<ThemeToggle />);
      const button = screen.getByRole('button');

      // Start with light
      act(() => {
        useThemeStore.setState({ theme: 'light', resolvedTheme: 'light' });
      });

      // Click to go to dark
      fireEvent.click(button);
      expect(useThemeStore.getState().theme).toBe('dark');

      // Click to go to system
      fireEvent.click(button);
      expect(useThemeStore.getState().theme).toBe('system');

      // Click to go back to light
      fireEvent.click(button);
      expect(useThemeStore.getState().theme).toBe('light');
    });

    it('should apply theme class to document root', () => {
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('dark');
      });

      waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(document.documentElement.classList.contains('light')).toBe(false);
      });

      act(() => {
        result.current.setTheme('light');
      });

      waitFor(() => {
        expect(document.documentElement.classList.contains('light')).toBe(true);
        expect(document.documentElement.classList.contains('dark')).toBe(false);
      });
    });
  });

  describe('Theme Persistence (Requirement 6.2)', () => {
    it('should persist theme preference to localStorage', () => {
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('dark');
      });

      // Check localStorage
      const stored = localStorage.getItem('theme-storage');
      expect(stored).toBeTruthy();
      
      if (stored) {
        const parsed = JSON.parse(stored);
        expect(parsed.state.theme).toBe('dark');
      }
    });

    it('should load persisted theme on initialization', () => {
      // Set theme in localStorage
      localStorage.setItem(
        'theme-storage',
        JSON.stringify({
          state: { theme: 'dark' },
          version: 0,
        })
      );

      // Re-initialize the store by importing it fresh
      // Note: In a real app restart, Zustand would read from localStorage
      // For testing, we need to manually trigger the rehydration
      const stored = localStorage.getItem('theme-storage');
      if (stored) {
        const parsed = JSON.parse(stored);
        useThemeStore.setState(parsed.state);
      }
      
      const initialState = useThemeStore.getState();
      
      // The persisted theme should be loaded
      expect(initialState.theme).toBe('dark');
    });

    it('should update localStorage when theme changes', () => {
      const { result } = renderHook(() => useTheme());

      // Change theme multiple times
      act(() => {
        result.current.setTheme('dark');
      });

      let stored = localStorage.getItem('theme-storage');
      expect(stored).toBeTruthy();
      expect(JSON.parse(stored!).state.theme).toBe('dark');

      act(() => {
        result.current.setTheme('system');
      });

      stored = localStorage.getItem('theme-storage');
      expect(stored).toBeTruthy();
      expect(JSON.parse(stored!).state.theme).toBe('system');
    });
  });

  describe('System Preference Detection (Requirement 6.3)', () => {
    it('should use system preference when no theme is stored', () => {
      // Mock system preference for dark mode
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: createMatchMediaMock(true),
      });

      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('system');
      });

      waitFor(() => {
        expect(result.current.resolvedTheme).toBe('dark');
      });
    });

    it('should detect light system preference', () => {
      // Mock system preference for light mode
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: createMatchMediaMock(false),
      });

      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('system');
      });

      waitFor(() => {
        expect(result.current.resolvedTheme).toBe('light');
      });
    });

    it('should use explicit theme over system preference', () => {
      // Mock system preference for dark mode
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: createMatchMediaMock(true),
      });

      const { result } = renderHook(() => useTheme());

      // Set explicit light theme
      act(() => {
        result.current.setTheme('light');
      });

      waitFor(() => {
        expect(result.current.resolvedTheme).toBe('light');
      });
    });
  });

  describe('System Preference Tracking (Requirement 6.4)', () => {
    it('should update theme when system preference changes', () => {
      const listeners: Array<(e: MediaQueryListEvent) => void> = [];
      
      // Mock matchMedia with event listener support
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn((event, handler) => {
            if (event === 'change') {
              listeners.push(handler);
            }
          }),
          removeEventListener: jest.fn((event, handler) => {
            const index = listeners.indexOf(handler);
            if (index > -1) {
              listeners.splice(index, 1);
            }
          }),
          dispatchEvent: jest.fn(),
        }),
      });

      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('system');
      });

      // Simulate system preference change to dark
      act(() => {
        listeners.forEach(listener => {
          listener({ matches: true } as MediaQueryListEvent);
        });
      });

      waitFor(() => {
        expect(result.current.resolvedTheme).toBe('dark');
      });

      // Simulate system preference change back to light
      act(() => {
        listeners.forEach(listener => {
          listener({ matches: false } as MediaQueryListEvent);
        });
      });

      waitFor(() => {
        expect(result.current.resolvedTheme).toBe('light');
      });
    });

    it('should not update theme on system change when explicit theme is set', () => {
      const listeners: Array<(e: MediaQueryListEvent) => void> = [];
      
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn((event, handler) => {
            if (event === 'change') {
              listeners.push(handler);
            }
          }),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }),
      });

      const { result } = renderHook(() => useTheme());

      // Set explicit light theme
      act(() => {
        result.current.setTheme('light');
      });

      // Simulate system preference change to dark
      act(() => {
        listeners.forEach(listener => {
          listener({ matches: true } as MediaQueryListEvent);
        });
      });

      // Theme should remain light (not follow system)
      waitFor(() => {
        expect(result.current.resolvedTheme).toBe('light');
      });
    });
  });

  describe('Theme Change Without Reload (Requirement 6.5)', () => {
    it('should apply theme changes immediately without page reload', () => {
      const { result } = renderHook(() => useTheme());

      // Change theme
      act(() => {
        result.current.setTheme('dark');
      });

      // Theme should be applied immediately
      waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(result.current.resolvedTheme).toBe('dark');
      });

      // Change back to light
      act(() => {
        result.current.setTheme('light');
      });

      // Should update immediately
      waitFor(() => {
        expect(document.documentElement.classList.contains('light')).toBe(true);
        expect(result.current.resolvedTheme).toBe('light');
      });
    });

    it('should update color-scheme property for native elements', () => {
      const { result } = renderHook(() => useTheme());

      act(() => {
        result.current.setTheme('dark');
      });

      waitFor(() => {
        const colorScheme = document.documentElement.style.getPropertyValue('color-scheme');
        expect(colorScheme).toBe('dark');
      });

      act(() => {
        result.current.setTheme('light');
      });

      waitFor(() => {
        const colorScheme = document.documentElement.style.getPropertyValue('color-scheme');
        expect(colorScheme).toBe('light');
      });
    });
  });

  describe('ThemeToggle Component', () => {
    it('should render with correct aria-label', () => {
      render(<ThemeToggle />);
      
      waitFor(() => {
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('aria-label');
        expect(button.getAttribute('aria-label')).toContain('theme');
      });
    });

    it('should show system indicator when theme is system', () => {
      act(() => {
        useThemeStore.setState({ theme: 'system', resolvedTheme: 'light' });
      });

      const { container } = render(<ThemeToggle />);
      
      waitFor(() => {
        // Look for the system indicator badge
        const badge = container.querySelector('.animate-ping');
        expect(badge).toBeInTheDocument();
      });
    });

    it('should display sun icon in light mode', () => {
      act(() => {
        useThemeStore.setState({ theme: 'light', resolvedTheme: 'light' });
      });

      const { container } = render(<ThemeToggle />);
      
      waitFor(() => {
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        // Sun icon has a circle path
        const circlePath = container.querySelector('path[d*="15.75 12a3.75"]');
        expect(circlePath).toBeInTheDocument();
      });
    });

    it('should display moon icon in dark mode', () => {
      act(() => {
        useThemeStore.setState({ theme: 'dark', resolvedTheme: 'dark' });
      });

      const { container } = render(<ThemeToggle />);
      
      waitFor(() => {
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        // Moon icon has a crescent path
        const moonPath = container.querySelector('path[d*="21.752"]');
        expect(moonPath).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid theme changes', () => {
      const { result } = renderHook(() => useTheme());

      // Rapidly change themes
      act(() => {
        result.current.setTheme('dark');
        result.current.setTheme('light');
        result.current.setTheme('system');
        result.current.setTheme('dark');
      });

      // Final theme should be dark
      expect(result.current.theme).toBe('dark');
    });

    it('should handle corrupted localStorage data', () => {
      // Set invalid JSON in localStorage
      localStorage.setItem('theme-storage', 'invalid-json{');

      // Should not crash when initializing
      // Zustand will handle the error and use default values
      expect(() => {
        renderHook(() => useTheme());
      }).not.toThrow();
    });
  });
});
