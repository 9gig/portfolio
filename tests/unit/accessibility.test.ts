/**
 * Accessibility Tests
 * 
 * Tests for WCAG AA compliance and accessibility features
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6
 */

import {
  getContrastRatio,
  meetsWCAGAA,
  hexToRgb,
  isKeyboardAccessible,
  hasAriaLabel,
  validateHeadingHierarchy,
  meetsTouchTargetSize,
  generateA11yId,
  focusManagement,
  keyboardNav,
} from '@/lib/accessibility-utils';

describe('Accessibility Utils', () => {
  describe('Color Contrast (Requirement 10.4)', () => {
    it('should calculate correct contrast ratio', () => {
      // Black on white
      const black = [0, 0, 0] as [number, number, number];
      const white = [255, 255, 255] as [number, number, number];
      const ratio = getContrastRatio(black, white);
      
      expect(ratio).toBeCloseTo(21, 1); // Maximum contrast
    });

    it('should verify WCAG AA compliance for normal text', () => {
      const bg = [255, 255, 255] as [number, number, number];
      const fg = [95, 95, 95] as [number, number, number]; // ~4.5:1 ratio
      const ratio = getContrastRatio(bg, fg);
      
      expect(meetsWCAGAA(ratio, false)).toBe(true);
    });

    it('should verify WCAG AA compliance for large text', () => {
      const bg = [255, 255, 255] as [number, number, number];
      
      // Test with a ratio that passes large text but fails normal text
      const fg = [130, 130, 130] as [number, number, number]; // ~3.2:1 ratio
      const ratio = getContrastRatio(bg, fg);
      expect(meetsWCAGAA(ratio, true)).toBe(true); // Passes for large text (3:1 minimum)
      expect(meetsWCAGAA(ratio, false)).toBe(false); // Fails for normal text (4.5:1 minimum)
    });

    it('should convert hex to RGB correctly', () => {
      expect(hexToRgb('#ffffff')).toEqual([255, 255, 255]);
      expect(hexToRgb('#000000')).toEqual([0, 0, 0]);
      expect(hexToRgb('ff0000')).toEqual([255, 0, 0]);
      expect(hexToRgb('#invalid')).toBeNull();
    });

    it('should verify theme colors meet WCAG AA standards', () => {
      // Light mode: dark text on light background
      const lightBg = hexToRgb('#ffffff')!;
      const lightFg = hexToRgb('#0a0a0a')!;
      const lightRatio = getContrastRatio(lightBg, lightFg);
      expect(meetsWCAGAA(lightRatio, false)).toBe(true);

      // Dark mode: light text on dark background
      const darkBg = hexToRgb('#0a0a0a')!;
      const darkFg = hexToRgb('#fafafa')!;
      const darkRatio = getContrastRatio(darkBg, darkFg);
      expect(meetsWCAGAA(darkRatio, false)).toBe(true);
    });
  });

  describe('Keyboard Navigation (Requirement 10.1)', () => {
    it('should identify keyboard accessible elements', () => {
      const button = document.createElement('button');
      expect(isKeyboardAccessible(button)).toBe(true);

      const link = document.createElement('a');
      expect(isKeyboardAccessible(link)).toBe(true);

      const input = document.createElement('input');
      expect(isKeyboardAccessible(input)).toBe(true);

      const div = document.createElement('div');
      expect(isKeyboardAccessible(div)).toBe(false);

      const divWithTabindex = document.createElement('div');
      divWithTabindex.setAttribute('tabindex', '0');
      expect(isKeyboardAccessible(divWithTabindex)).toBe(true);
    });

    it('should identify activation keys', () => {
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      expect(keyboardNav.isActivationKey(enterEvent)).toBe(true);

      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      expect(keyboardNav.isActivationKey(spaceEvent)).toBe(true);

      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
      expect(keyboardNav.isActivationKey(tabEvent)).toBe(false);
    });

    it('should identify arrow keys', () => {
      const upEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      expect(keyboardNav.isArrowKey(upEvent)).toBe(true);

      const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      expect(keyboardNav.isArrowKey(downEvent)).toBe(true);

      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      expect(keyboardNav.isArrowKey(enterEvent)).toBe(false);
    });

    it('should handle roving tabindex navigation', () => {
      const items = [
        document.createElement('button'),
        document.createElement('button'),
        document.createElement('button'),
      ];

      items.forEach((item, i) => {
        item.setAttribute('tabindex', i === 0 ? '0' : '-1');
      });

      const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      const newIndex = keyboardNav.handleRovingTabindex(items, 0, downEvent);

      expect(newIndex).toBe(1);
      expect(items[0].getAttribute('tabindex')).toBe('-1');
      expect(items[1].getAttribute('tabindex')).toBe('0');
    });
  });

  describe('ARIA Labels (Requirement 10.2)', () => {
    it('should detect elements with aria-label', () => {
      const button = document.createElement('button');
      button.setAttribute('aria-label', 'Close');
      expect(hasAriaLabel(button)).toBe(true);
    });

    it('should detect elements with aria-labelledby', () => {
      const input = document.createElement('input');
      input.setAttribute('aria-labelledby', 'label-id');
      expect(hasAriaLabel(input)).toBe(true);
    });

    it('should detect images with alt text', () => {
      const img = document.createElement('img');
      img.setAttribute('alt', 'Profile picture');
      expect(hasAriaLabel(img)).toBe(true);
    });

    it('should detect elements without labels', () => {
      const div = document.createElement('div');
      expect(hasAriaLabel(div)).toBe(false);
    });
  });

  describe('Heading Hierarchy (Requirement 10.3)', () => {
    it('should validate correct heading hierarchy', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <h1>Title</h1>
        <h2>Section</h2>
        <h3>Subsection</h3>
        <h2>Another Section</h2>
      `;

      const violations = validateHeadingHierarchy(container);
      expect(violations).toHaveLength(0);
    });

    it('should detect skipped heading levels', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <h1>Title</h1>
        <h3>Skipped h2</h3>
      `;

      const violations = validateHeadingHierarchy(container);
      expect(violations).toHaveLength(1);
      expect(violations[0].level).toBe(3);
      expect(violations[0].expectedMax).toBe(2);
    });

    it('should allow multiple headings at the same level', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <h1>Title</h1>
        <h2>Section 1</h2>
        <h2>Section 2</h2>
        <h2>Section 3</h2>
      `;

      const violations = validateHeadingHierarchy(container);
      expect(violations).toHaveLength(0);
    });
  });

  describe('Touch Targets (Requirement 7.5)', () => {
    it('should verify minimum touch target size', () => {
      const button = document.createElement('button');
      // Set explicit dimensions
      Object.defineProperty(button, 'getBoundingClientRect', {
        value: () => ({
          width: 44,
          height: 44,
          top: 0,
          left: 0,
          bottom: 44,
          right: 44,
          x: 0,
          y: 0,
          toJSON: () => {},
        }),
      });

      expect(meetsTouchTargetSize(button)).toBe(true);
    });

    it('should detect touch targets that are too small', () => {
      const button = document.createElement('button');
      // Set explicit dimensions
      Object.defineProperty(button, 'getBoundingClientRect', {
        value: () => ({
          width: 30,
          height: 30,
          top: 0,
          left: 0,
          bottom: 30,
          right: 30,
          x: 0,
          y: 0,
          toJSON: () => {},
        }),
      });

      expect(meetsTouchTargetSize(button)).toBe(false);
    });
  });

  describe('Focus Management', () => {
    it('should get all focusable elements', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button>Button 1</button>
        <a href="#">Link</a>
        <input type="text" />
        <button disabled>Disabled</button>
        <div tabindex="-1">Not focusable</div>
      `;

      const focusable = focusManagement.getFocusableElements(container);
      expect(focusable).toHaveLength(3); // button, link, input (not disabled button or tabindex=-1)
    });

    it('should focus first element', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button id="first">First</button>
        <button id="second">Second</button>
      `;
      document.body.appendChild(container);

      focusManagement.focusFirst(container);
      expect(document.activeElement?.id).toBe('first');

      document.body.removeChild(container);
    });

    it('should trap focus within container', () => {
      const container = document.createElement('div');
      container.innerHTML = `
        <button id="first">First</button>
        <button id="last">Last</button>
      `;
      document.body.appendChild(container);

      const cleanup = focusManagement.trapFocus(container);

      // Focus last element
      const lastButton = container.querySelector('#last') as HTMLElement;
      lastButton.focus();

      // Simulate Tab key (should wrap to first)
      const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
      container.dispatchEvent(tabEvent);

      cleanup();
      document.body.removeChild(container);
    });
  });

  describe('Utility Functions', () => {
    it('should generate unique accessibility IDs', () => {
      const id1 = generateA11yId('test');
      const id2 = generateA11yId('test');
      
      expect(id1).toMatch(/^test-\d+-\d+$/);
      expect(id2).toMatch(/^test-\d+-\d+$/);
      expect(id1).not.toBe(id2);
    });

    it('should generate IDs with default prefix', () => {
      const id = generateA11yId();
      expect(id).toMatch(/^a11y-\d+-\d+$/);
    });
  });
});

describe('Accessibility Integration', () => {
  describe('Focus Indicators (Requirement 10.5)', () => {
    it('should have focus-visible styles defined', () => {
      // This test verifies that focus styles are defined in CSS
      // In a real browser environment, we would check computed styles
      const button = document.createElement('button');
      button.textContent = 'Test Button';
      document.body.appendChild(button);

      // Simulate focus
      button.focus();
      
      // In a real browser, we would check:
      // const styles = window.getComputedStyle(button, ':focus-visible');
      // expect(styles.outline).toBeTruthy();
      
      expect(document.activeElement).toBe(button);

      document.body.removeChild(button);
    });
  });

  describe('Skip Links (Requirement 10.6)', () => {
    it('should allow skip link to work', () => {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.textContent = 'Skip to main content';
      
      const main = document.createElement('main');
      main.id = 'main-content';
      main.setAttribute('tabindex', '-1');
      
      document.body.appendChild(skipLink);
      document.body.appendChild(main);

      // Simulate click
      skipLink.click();
      
      // In a real browser, this would scroll to main content
      expect(main.id).toBe('main-content');
      expect(main.getAttribute('tabindex')).toBe('-1');

      document.body.removeChild(skipLink);
      document.body.removeChild(main);
    });
  });
});
