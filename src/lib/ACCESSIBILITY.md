# Accessibility Implementation Guide

This document outlines the accessibility features implemented in the portfolio website to ensure WCAG AA compliance.

## Requirements Coverage

This implementation addresses Requirements 10.1-10.6:
- 10.1: Keyboard navigation for all interactive elements
- 10.2: ARIA labels for all non-text content
- 10.3: Logical heading hierarchy
- 10.4: Color contrast ratios meeting WCAG AA standards
- 10.5: Visible focus indicators
- 10.6: Skip links functionality

## Keyboard Navigation (Requirement 10.1)

### Implementation

All interactive elements are keyboard accessible:

1. **Native Elements**: Buttons, links, and form inputs are naturally keyboard accessible
2. **Tab Order**: Logical tab order follows visual layout
3. **Focus Management**: Focus is properly managed in modals and dynamic content
4. **Keyboard Shortcuts**: Skip links allow quick navigation to main content

### Testing

```typescript
// Test keyboard navigation
const button = screen.getByRole('button', { name: /submit/i });
button.focus();
expect(document.activeElement).toBe(button);

// Test Enter key activation
fireEvent.keyDown(button, { key: 'Enter' });
expect(handleClick).toHaveBeenCalled();

// Test Space key activation
fireEvent.keyDown(button, { key: ' ' });
expect(handleClick).toHaveBeenCalled();
```

### Utilities

Use `accessibility-utils.ts` for keyboard navigation helpers:

```typescript
import { keyboardNav } from '@/lib/accessibility-utils';

// Check if key is activation key
if (keyboardNav.isActivationKey(event)) {
  handleActivation();
}

// Handle roving tabindex for custom components
const newIndex = keyboardNav.handleRovingTabindex(items, currentIndex, event);
```

## ARIA Labels (Requirement 10.2)

### Implementation

All non-text content has appropriate ARIA labels:

1. **Icons**: Use `aria-hidden="true"` for decorative icons
2. **Interactive Icons**: Use `aria-label` for icon buttons
3. **Images**: Use descriptive `alt` text
4. **Form Fields**: Use `aria-label`, `aria-labelledby`, or `aria-describedby`
5. **Live Regions**: Use `aria-live` for dynamic content updates

### Examples

```tsx
// Decorative icon
<svg aria-hidden="true">...</svg>

// Interactive icon button
<button aria-label="Toggle theme">
  <svg aria-hidden="true">...</svg>
</button>

// Form field with error
<input
  aria-label="Email address"
  aria-invalid={!!error}
  aria-describedby={error ? 'email-error' : undefined}
/>
{error && <span id="email-error">{error}</span>}

// Live region for announcements
<div role="status" aria-live="polite" aria-atomic="true">
  {message}
</div>
```

### Utilities

```typescript
import { hasAriaLabel, announceToScreenReader } from '@/lib/accessibility-utils';

// Check if element has proper labeling
if (!hasAriaLabel(element)) {
  console.warn('Element missing ARIA label');
}

// Announce to screen readers
announceToScreenReader('Form submitted successfully', 'polite');
```

## Heading Hierarchy (Requirement 10.3)

### Implementation

Headings follow a logical hierarchy without skipping levels:

```
h1: Page title (one per page)
├── h2: Major sections (About, Projects, Skills, etc.)
│   ├── h3: Subsections (Specializations, Connect, etc.)
│   │   └── h4: Sub-subsections (if needed)
```

### Page Structure

```tsx
// src/app/page.tsx
<h1>Developer Name</h1>

// src/components/about/about-section.tsx
<h2>About Me</h2>
<h3>Specializations</h3>
<h3>Connect</h3>

// src/components/projects/projects-section.tsx
<h2>Projects</h2>

// src/components/skills/skills-section.tsx
<h2>Skills & Technologies</h2>
<h3>Category Name</h3>
```

### Validation

```typescript
import { validateHeadingHierarchy } from '@/lib/accessibility-utils';

// Validate heading hierarchy
const violations = validateHeadingHierarchy(document.body);
if (violations.length > 0) {
  console.error('Heading hierarchy violations:', violations);
}
```

## Color Contrast (Requirement 10.4)

### Implementation

All text meets WCAG AA contrast requirements:

- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18pt+ or 14pt+ bold): Minimum 3:1 contrast ratio

### Theme Colors

Our theme colors are designed to meet WCAG AA standards:

**Light Mode:**
- Background: `hsl(0 0% 100%)` - White
- Foreground: `hsl(222.2 84% 4.9%)` - Very dark blue
- Primary: `hsl(221.2 83.2% 53.3%)` - Blue
- Muted: `hsl(215.4 16.3% 46.9%)` - Gray

**Dark Mode:**
- Background: `hsl(222.2 84% 4.9%)` - Very dark blue
- Foreground: `hsl(210 40% 98%)` - Off-white
- Primary: `hsl(217.2 91.2% 59.8%)` - Light blue
- Muted: `hsl(215 20.2% 65.1%)` - Light gray

### Testing

```typescript
import { getContrastRatio, meetsWCAGAA, hexToRgb } from '@/lib/accessibility-utils';

// Check contrast ratio
const bg = hexToRgb('#ffffff');
const fg = hexToRgb('#1a1a1a');
const ratio = getContrastRatio(bg, fg);

// Verify WCAG AA compliance
const isCompliant = meetsWCAGAA(ratio, false); // false = normal text
console.log(`Contrast ratio: ${ratio.toFixed(2)}:1, Compliant: ${isCompliant}`);
```

## Focus Indicators (Requirement 10.5)

### Implementation

All interactive elements have visible focus indicators:

```css
/* Global focus styles in globals.css */
*:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Enhanced focus for interactive elements */
a:focus-visible,
button:focus-visible,
input:focus-visible,
textarea:focus-visible,
select:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
  box-shadow: 0 0 0 4px hsl(var(--ring) / 0.1);
}
```

### Focus Management

```typescript
import { focusManagement } from '@/lib/accessibility-utils';

// Trap focus in modal
const cleanup = focusManagement.trapFocus(modalElement);

// Focus first element
focusManagement.focusFirst(containerElement);

// Get all focusable elements
const focusable = focusManagement.getFocusableElements(containerElement);

// Cleanup when modal closes
cleanup();
```

## Skip Links (Requirement 10.6)

### Implementation

Skip links allow keyboard users to jump to main content:

```tsx
// src/components/layout/skip-link.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
    >
      Skip to main content
    </a>
  );
}

// src/app/layout.tsx
<SkipLink />
<main id="main-content" tabIndex={-1}>
  {children}
</main>
```

### Testing

```typescript
// Test skip link functionality
const skipLink = screen.getByText('Skip to main content');
skipLink.focus();
expect(document.activeElement).toBe(skipLink);

fireEvent.click(skipLink);
const mainContent = document.getElementById('main-content');
expect(document.activeElement).toBe(mainContent);
```

## Touch Targets (Requirement 7.5)

All interactive elements meet minimum touch target size of 44x44 pixels:

```css
/* Global utility classes */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

.touch-target-icon {
  height: 44px;
  width: 44px;
}
```

### Testing

```typescript
import { meetsTouchTargetSize } from '@/lib/accessibility-utils';

const button = screen.getByRole('button');
expect(meetsTouchTargetSize(button)).toBe(true);
```

## Screen Reader Support

### Best Practices

1. **Use semantic HTML**: `<button>`, `<nav>`, `<main>`, `<article>`, etc.
2. **Provide text alternatives**: Alt text for images, ARIA labels for icons
3. **Use ARIA landmarks**: `role="navigation"`, `role="main"`, etc.
4. **Announce dynamic changes**: Use `aria-live` regions
5. **Hide decorative content**: Use `aria-hidden="true"` for decorative elements

### Live Regions

```tsx
// Success message
<div role="status" aria-live="polite" aria-atomic="true">
  {successMessage}
</div>

// Error message
<div role="alert" aria-live="assertive" aria-atomic="true">
  {errorMessage}
</div>
```

## Testing Checklist

### Manual Testing

- [ ] Tab through all interactive elements
- [ ] Verify focus indicators are visible
- [ ] Test skip links functionality
- [ ] Use screen reader (NVDA, JAWS, VoiceOver)
- [ ] Test with keyboard only (no mouse)
- [ ] Verify color contrast in both themes
- [ ] Check heading hierarchy with browser tools

### Automated Testing

- [ ] Run axe-core accessibility tests
- [ ] Validate ARIA attributes
- [ ] Check color contrast ratios
- [ ] Verify touch target sizes
- [ ] Test keyboard navigation programmatically

### Tools

- **Browser Extensions**: axe DevTools, WAVE, Lighthouse
- **Screen Readers**: NVDA (Windows), JAWS (Windows), VoiceOver (macOS/iOS)
- **Testing Libraries**: @testing-library/react, jest-axe
- **Contrast Checkers**: WebAIM Contrast Checker, Colour Contrast Analyser

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Resources](https://webaim.org/resources/)
- [A11y Project](https://www.a11yproject.com/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
