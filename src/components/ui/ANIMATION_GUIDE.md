# Animation System Guide

This guide explains how to use the animation system in the portfolio website.

## Overview

The animation system provides scroll-triggered animations, hover effects, and respects user preferences for reduced motion. It's built on top of Framer Motion and includes custom hooks and components.

## Components

### AnimatedSection

Wraps content with scroll-triggered animations that trigger when the element enters the viewport.

**Props:**
- `children`: ReactNode - The content to animate
- `animation`: 'fade-in' | 'slide-up' | 'slide-in-left' | 'slide-in-right' - Animation type (default: 'fade-in')
- `delay`: number - Delay in seconds before animation starts (default: 0)
- `className`: string - Additional CSS classes

**Example:**
```tsx
import { AnimatedSection } from '@/components/ui/animated-section';

<AnimatedSection animation="slide-up" delay={0.2}>
  <h1>This will slide up when scrolled into view</h1>
</AnimatedSection>
```

### AnimatedStagger

Animates children with a stagger effect, where each child animates sequentially.

**Props:**
- `children`: ReactNode - The content to animate (children should use motion components)
- `staggerDelay`: number - Delay between each child animation (default: 0.1)
- `className`: string - Additional CSS classes

**Example:**
```tsx
import { AnimatedStagger, staggerItemVariants } from '@/components/ui/animated-stagger';
import { motion } from 'framer-motion';

<AnimatedStagger staggerDelay={0.15}>
  {items.map((item) => (
    <motion.div key={item.id} variants={staggerItemVariants}>
      {item.content}
    </motion.div>
  ))}
</AnimatedStagger>
```

## Hooks

### useIntersectionObserver

Detects when an element enters the viewport using the Intersection Observer API.

**Parameters:**
- `ref`: RefObject<Element> - Reference to the element to observe
- `options`: IntersectionObserverOptions - Configuration options
  - `threshold`: number - Percentage of element visibility (default: 0.1)
  - `root`: Element | null - Root element for intersection (default: null)
  - `rootMargin`: string - Margin around root (default: '0px')
  - `triggerOnce`: boolean - Only trigger once (default: true)

**Returns:**
- `isIntersecting`: boolean - Whether element is currently intersecting
- `hasIntersected`: boolean - Whether element has ever intersected

**Example:**
```tsx
import { useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const { hasIntersected } = useIntersectionObserver(ref, {
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div ref={ref}>
      {hasIntersected ? 'Visible!' : 'Not yet visible'}
    </div>
  );
}
```

### useReducedMotion

Detects if the user prefers reduced motion based on the `prefers-reduced-motion` media query.

**Returns:**
- `boolean` - True if user prefers reduced motion

**Example:**
```tsx
import { useReducedMotion } from '@/hooks/use-reduced-motion';

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className={prefersReducedMotion ? 'no-animation' : 'with-animation'}>
      Content
    </div>
  );
}
```

## Animation Variants

Pre-defined animation variants are available in `@/lib/animation-variants`:

### Fade Animations
- `fadeInVariants` - Simple fade in

### Slide Animations
- `slideUpVariants` - Slide up with fade
- `slideDownVariants` - Slide down with fade
- `slideInLeftVariants` - Slide in from left
- `slideInRightVariants` - Slide in from right

### Stagger Animations
- `staggerContainerVariants` - Container for staggered children
- `staggerItemVariants` - Individual staggered items

### Hover Animations
- `hoverScaleVariants` - Scale up on hover
- `hoverLiftVariants` - Lift up with shadow on hover
- `hoverBrightenVariants` - Brighten on hover

### Other Animations
- `scaleInVariants` - Scale in with fade
- `rotateInVariants` - Rotate in with fade
- `pageTransitionVariants` - Page transition effects

**Example:**
```tsx
import { motion } from 'framer-motion';
import { hoverScaleVariants } from '@/lib/animation-variants';

<motion.button
  variants={hoverScaleVariants}
  initial="rest"
  whileHover="hover"
>
  Hover me
</motion.button>
```

## Accessibility

The animation system automatically respects user preferences:

1. **Reduced Motion**: When a user has `prefers-reduced-motion: reduce` enabled, animations are disabled and content appears immediately.

2. **Non-Blocking**: All animations are designed to not block user interaction. Content remains accessible during animations.

3. **Keyboard Navigation**: All interactive elements remain keyboard accessible regardless of animation state.

## Best Practices

1. **Use Appropriate Delays**: Add small delays (0.1-0.3s) between sequential animations to create a smooth flow.

2. **Don't Overuse**: Not every element needs animation. Use animations to guide attention and provide feedback.

3. **Performance**: Stick to animating `transform` and `opacity` properties for best performance (GPU-accelerated).

4. **Consistent Timing**: Use consistent duration and easing across similar animations (0.2-0.6s is typical).

5. **Test with Reduced Motion**: Always test your animations with reduced motion enabled to ensure content is still accessible.

## Examples

### Hero Section with Fade In
```tsx
<AnimatedSection animation="fade-in">
  <section className="hero">
    <h1>Welcome</h1>
    <p>This fades in when scrolled into view</p>
  </section>
</AnimatedSection>
```

### Project Cards with Stagger
```tsx
<AnimatedStagger staggerDelay={0.1}>
  {projects.map((project) => (
    <motion.div key={project.id} variants={staggerItemVariants}>
      <ProjectCard project={project} />
    </motion.div>
  ))}
</AnimatedStagger>
```

### Button with Hover Animation
```tsx
import { motion } from 'framer-motion';

<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Click me
</motion.button>
```

### Card with Lift Effect
```tsx
import { motion } from 'framer-motion';
import { hoverLiftVariants } from '@/lib/animation-variants';

<motion.div
  variants={hoverLiftVariants}
  initial="rest"
  whileHover="hover"
  className="card"
>
  Card content
</motion.div>
```
