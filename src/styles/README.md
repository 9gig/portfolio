# Modern UI Design System

This directory contains the design system foundation for the modern UI redesign, including design tokens, glassmorphism utilities, and animation variants.

## Files

### `design-tokens.ts`
Contains all design tokens including:
- **Gradients**: Pre-defined gradient combinations (primary, secondary, accent, aurora, etc.)
- **Glassmorphism**: Styles for light and dark theme glassmorphism effects
- **Animations**: Duration and easing configurations
- **Colors**: Color palette for light and dark themes
- **Spacing**: Consistent spacing scale
- **Border Radius**: Border radius scale
- **Typography**: Font sizes, weights, and line heights
- **Shadows**: Shadow definitions including glow effects

### `glassmorphism.ts`
Utility functions for glassmorphism effects:
- `getGlassmorphismStyles()`: Get CSS properties for glassmorphism
- `getGlassmorphismClass()`: Get CSS class name for glassmorphism
- `getGlassTailwindClass()`: Get Tailwind classes for glassmorphism
- `getGlassVariant()`: Get glassmorphism variant (subtle, medium, strong)

### `animations.ts`
Framer Motion animation variants and utilities:
- **Animation Variants**: fadeIn, slideUp, slideDown, scaleIn, stagger, etc.
- **Hover Variants**: scale, lift, glow, rotate
- **Transition Presets**: fast, normal, slow, spring
- **Helper Functions**: createStaggerVariant, createFadeInVariant, createSlideVariant
- **Page Transitions**: pageTransitionVariants, modalVariants, backdropVariants

### `index.ts`
Central export point for all design system utilities.

## Usage

### Using Design Tokens

```typescript
import { gradients, colors, animations } from '@/styles';

// Use gradient in component
const MyComponent = () => (
  <div style={{ background: gradients.primary }}>
    Content
  </div>
);
```

### Using Glassmorphism

```typescript
import { getGlassTailwindClass } from '@/styles';

const GlassCard = () => (
  <div className={getGlassTailwindClass('dark', true)}>
    Glass card content
  </div>
);
```

### Using Animation Variants

```typescript
import { motion } from 'framer-motion';
import { animationVariants, hoverVariants } from '@/styles';

const AnimatedCard = () => (
  <motion.div
    variants={animationVariants.slideUp}
    initial="hidden"
    animate="visible"
    whileHover="hover"
  >
    Animated content
  </motion.div>
);
```

### Using Tailwind Classes

The design system extends Tailwind with custom utilities:

```tsx
// Glassmorphism
<div className="glass-dark glass-card">Content</div>

// Gradient text
<h1 className="gradient-text-primary">Heading</h1>

// Gradient background
<div className="gradient-bg-aurora">Content</div>

// Animated gradient
<div className="gradient-bg-primary gradient-animated">Content</div>

// Custom animations
<div className="animate-slide-up">Content</div>
<div className="animate-scale-in">Content</div>

// Glow effects
<div className="shadow-glow">Content</div>
<div className="shadow-glow-pink">Content</div>
```

## Tailwind Configuration

The design system extends Tailwind CSS with:
- Custom gradient colors (purple, pink, cyan)
- Additional border radius values (2xl, 3xl)
- New animations (slide-up, slide-down, scale-in, shimmer, gradient-shift)
- Custom shadows (glow, glow-pink, glow-cyan, glass, glass-dark)
- Backdrop blur utilities

## Global CSS Classes

Available in `src/app/globals.css`:
- `.glass-light` - Light theme glassmorphism
- `.glass-dark` - Dark theme glassmorphism
- `.glass-card` - Glassmorphism card with rounded corners
- `.gradient-text-*` - Gradient text utilities
- `.gradient-bg-*` - Gradient background utilities
- `.gradient-animated` - Animated gradient background

## Requirements Validation

This design system addresses the following requirements:
- **Requirement 3.1**: Vibrant, multi-color gradients for accent elements
- **Requirement 3.2**: Gradient text effects for headings
- **Requirement 9.1**: Large, bold headings with proper hierarchy
- **Requirement 15.2**: Lazy loading for animations and optimized bundle size

## Performance Considerations

- All animations use CSS transforms and opacity for hardware acceleration
- Glassmorphism effects use backdrop-filter with fallbacks
- Animation durations are optimized for 60fps performance
- Reduced motion preferences are respected via CSS media queries

## Accessibility

- All animations respect `prefers-reduced-motion` media query
- Color contrast ratios meet WCAG AA standards
- Focus indicators remain visible during animations
- Glassmorphism effects maintain readable text contrast
