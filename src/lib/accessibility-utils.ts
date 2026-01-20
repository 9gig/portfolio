/**
 * Accessibility Utilities
 * 
 * Provides utilities for ensuring WCAG AA compliance and accessibility best practices
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6
 */

/**
 * Calculate relative luminance of a color
 * Used for contrast ratio calculations
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * Returns a value between 1 and 21
 * 
 * WCAG AA Requirements:
 * - Normal text: minimum 4.5:1
 * - Large text (18pt+ or 14pt+ bold): minimum 3:1
 * 
 * @param color1 - RGB color as [r, g, b]
 * @param color2 - RGB color as [r, g, b]
 * @returns Contrast ratio
 */
export function getContrastRatio(
  color1: [number, number, number],
  color2: [number, number, number]
): number {
  const lum1 = getLuminance(...color1);
  const lum2 = getLuminance(...color2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG AA standards
 * 
 * @param ratio - Contrast ratio to check
 * @param isLargeText - Whether the text is large (18pt+ or 14pt+ bold)
 * @returns Whether the contrast meets WCAG AA standards
 */
export function meetsWCAGAA(ratio: number, isLargeText: boolean = false): boolean {
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Parse hex color to RGB
 * 
 * @param hex - Hex color string (e.g., "#ffffff" or "ffffff")
 * @returns RGB color as [r, g, b]
 */
export function hexToRgb(hex: string): [number, number, number] | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : null;
}

/**
 * Check if an element is keyboard accessible
 * 
 * @param element - HTML element to check
 * @returns Whether the element is keyboard accessible
 */
export function isKeyboardAccessible(element: HTMLElement): boolean {
  const tabIndex = element.getAttribute('tabindex');
  const isInteractive =
    element.tagName === 'A' ||
    element.tagName === 'BUTTON' ||
    element.tagName === 'INPUT' ||
    element.tagName === 'SELECT' ||
    element.tagName === 'TEXTAREA';

  // Element is keyboard accessible if:
  // 1. It's an interactive element (a, button, input, etc.)
  // 2. It has a non-negative tabindex
  return isInteractive || (tabIndex !== null && parseInt(tabIndex) >= 0);
}

/**
 * Check if an element has proper ARIA labeling
 * 
 * @param element - HTML element to check
 * @returns Whether the element has proper ARIA labeling
 */
export function hasAriaLabel(element: HTMLElement): boolean {
  return !!(
    element.getAttribute('aria-label') ||
    element.getAttribute('aria-labelledby') ||
    element.getAttribute('aria-describedby') ||
    (element.tagName === 'IMG' && element.getAttribute('alt'))
  );
}

/**
 * Validate heading hierarchy in a document
 * Ensures headings don't skip levels (e.g., h1 -> h3)
 * 
 * @param container - Container element to check (defaults to document.body)
 * @returns Array of heading level violations
 */
export function validateHeadingHierarchy(
  container: HTMLElement = document.body
): Array<{ element: HTMLElement; level: number; expectedMax: number }> {
  const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const violations: Array<{ element: HTMLElement; level: number; expectedMax: number }> = [];
  let previousLevel = 0;

  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.substring(1));

    // Check if we skipped a level
    if (previousLevel > 0 && level > previousLevel + 1) {
      violations.push({
        element: heading as HTMLElement,
        level,
        expectedMax: previousLevel + 1,
      });
    }

    previousLevel = level;
  });

  return violations;
}

/**
 * Check if touch targets meet minimum size requirements
 * WCAG 2.1 Level AAA: 44x44 CSS pixels
 * 
 * @param element - HTML element to check
 * @returns Whether the element meets minimum touch target size
 */
export function meetsTouchTargetSize(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  const MIN_SIZE = 44; // pixels
  return rect.width >= MIN_SIZE && rect.height >= MIN_SIZE;
}

/**
 * Generate a unique ID for accessibility purposes
 * Useful for aria-describedby, aria-labelledby, etc.
 * 
 * @param prefix - Prefix for the ID
 * @returns Unique ID string
 */
let idCounter = 0;
export function generateA11yId(prefix: string = 'a11y'): string {
  return `${prefix}-${++idCounter}-${Date.now()}`;
}

/**
 * Announce message to screen readers
 * Creates a live region and announces the message
 * 
 * @param message - Message to announce
 * @param priority - Priority level ('polite' or 'assertive')
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Focus management utilities
 */
export const focusManagement = {
  /**
   * Trap focus within a container (useful for modals)
   */
  trapFocus(container: HTMLElement): () => void {
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  },

  /**
   * Get all focusable elements within a container
   */
  getFocusableElements(container: HTMLElement): HTMLElement[] {
    return Array.from(
      container.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    );
  },

  /**
   * Focus first element in container
   */
  focusFirst(container: HTMLElement): void {
    const focusable = this.getFocusableElements(container);
    focusable[0]?.focus();
  },
};

/**
 * Keyboard navigation helpers
 */
export const keyboardNav = {
  /**
   * Check if key is an activation key (Enter or Space)
   */
  isActivationKey(event: KeyboardEvent): boolean {
    return event.key === 'Enter' || event.key === ' ';
  },

  /**
   * Check if key is an arrow key
   */
  isArrowKey(event: KeyboardEvent): boolean {
    return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key);
  },

  /**
   * Handle roving tabindex for a list of items
   * Useful for custom components like tabs, menus, etc.
   */
  handleRovingTabindex(
    items: HTMLElement[],
    currentIndex: number,
    event: KeyboardEvent
  ): number {
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        newIndex = (currentIndex + 1) % items.length;
        event.preventDefault();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        newIndex = (currentIndex - 1 + items.length) % items.length;
        event.preventDefault();
        break;
      case 'Home':
        newIndex = 0;
        event.preventDefault();
        break;
      case 'End':
        newIndex = items.length - 1;
        event.preventDefault();
        break;
    }

    if (newIndex !== currentIndex) {
      items[currentIndex]?.setAttribute('tabindex', '-1');
      items[newIndex]?.setAttribute('tabindex', '0');
      items[newIndex]?.focus();
    }

    return newIndex;
  },
};
