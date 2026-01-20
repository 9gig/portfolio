# Hero Components

Modern hero section components with animated backgrounds, text, and interactive elements.

## Components

### HeroSection

Main hero section component that combines all hero elements into a cohesive landing section.

**Features:**
- Animated gradient background with floating orbs
- Staggered entrance animations
- Animated avatar with glow effect
- Gradient text effects
- CTA buttons with hover animations
- Scroll indicator
- Respects reduced motion preferences
- Fully responsive

**Usage:**
```tsx
import { HeroSection } from '@/components/hero';

export default function HomePage() {
  return <HeroSection />;
}
```

**Requirements:** 1.1, 1.6, 12.1, 12.2

---

### AnimatedText

Text component with staggered word animations and optional gradient effects.

**Props:**
- `text` (string, required): The text to animate
- `className` (string, optional): Additional CSS classes
- `gradient` (GradientKey, optional): Gradient to apply to text
- `delay` (number, optional): Initial delay before animation starts (default: 0)
- `staggerDelay` (number, optional): Delay between each word (default: 0.1)

**Usage:**
```tsx
import { AnimatedText } from '@/components/hero';

<AnimatedText
  text="Welcome to My Portfolio"
  className="text-6xl font-bold"
  gradient="primary"
  delay={0.2}
  staggerDelay={0.15}
/>
```

**Requirements:** 1.2, 1.3

---

### AnimatedTextLine

Character-by-character animation for typewriter effects.

**Props:**
- `text` (string, required): The text to animate
- `className` (string, optional): Additional CSS classes
- `gradient` (GradientKey, optional): Gradient to apply to text
- `delay` (number, optional): Initial delay before animation starts (default: 0)
- `charDelay` (number, optional): Delay between each character (default: 0.03)

**Usage:**
```tsx
import { AnimatedTextLine } from '@/components/hero';

<AnimatedTextLine
  text="Building amazing experiences"
  className="text-2xl"
  gradient="accent"
  charDelay={0.05}
/>
```

---

### HeroBackground

Animated gradient background with parallax effects and floating gradient orbs.

**Features:**
- Three animated gradient orbs with different colors
- Smooth parallax motion
- Automatically disabled on mobile for performance
- Respects reduced motion preferences
- Gradient overlay for depth

**Usage:**
```tsx
import { HeroBackground } from '@/components/hero';

<section className="relative min-h-screen">
  <HeroBackground />
  <div className="relative z-10">
    {/* Your content */}
  </div>
</section>
```

**Requirements:** 1.6, 12.1, 12.2

---

### ScrollIndicator

Animated scroll indicator that encourages users to scroll down.

**Features:**
- Bouncing animation
- Smooth scroll to next section on click
- Respects reduced motion preferences
- Accessible with keyboard navigation

**Usage:**
```tsx
import { ScrollIndicator } from '@/components/hero';

<section className="relative min-h-screen">
  {/* Your content */}
  <ScrollIndicator />
</section>
```

**Requirements:** 1.7

---

## Accessibility

All hero components follow accessibility best practices:

- **Reduced Motion**: Animations are disabled when `prefers-reduced-motion` is enabled
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus Indicators**: Clear focus states for interactive elements
- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **ARIA Labels**: Descriptive labels for icon-only buttons

## Performance

- **Lazy Loading**: Background animations only run on desktop
- **Hardware Acceleration**: Uses CSS transforms for smooth animations
- **Optimized Images**: Next.js Image component with priority loading
- **Reduced Complexity**: Simplified animations on mobile devices

## Customization

### Gradients

Customize gradients by modifying `src/styles/design-tokens.ts`:

```typescript
export const gradients = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  // Add your custom gradients
  custom: 'linear-gradient(135deg, #your-color 0%, #your-color 100%)',
};
```

### Animation Timing

Adjust animation timing in `src/styles/design-tokens.ts`:

```typescript
export const animations = {
  durations: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
};
```

## Examples

### Basic Hero

```tsx
import { HeroSection } from '@/components/hero';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      {/* Other sections */}
    </main>
  );
}
```

### Custom Hero with Different Text

```tsx
import { HeroBackground, AnimatedText, ScrollIndicator } from '@/components/hero';
import { GradientButton } from '@/components/ui/gradient-button';

export default function CustomHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <HeroBackground />
      
      <div className="relative z-10 text-center">
        <AnimatedText
          text="Custom Hero Title"
          className="text-7xl font-bold mb-6"
          gradient="aurora"
        />
        
        <p className="text-xl text-gray-300 mb-8">
          Your custom subtitle here
        </p>
        
        <GradientButton href="#contact" size="lg">
          Get Started
        </GradientButton>
      </div>
      
      <ScrollIndicator />
    </section>
  );
}
```

## Testing

The hero components are tested for:
- Proper rendering
- Animation behavior
- Reduced motion support
- Responsive behavior
- Accessibility compliance

Run tests with:
```bash
npm test
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

Note: Backdrop blur effects may have limited support in older browsers. The design gracefully degrades in unsupported browsers.
