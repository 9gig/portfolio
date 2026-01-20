# Experience Components

Modern experience timeline components with glassmorphism design, staggered animations, and responsive layout.

## Components

### Timeline

Main timeline component that displays work experience in a vertical timeline format.

**Features:**
- Vertical timeline with gradient line
- Alternating card layout on desktop
- Stacked layout on mobile
- Staggered entrance animations
- Scroll-triggered animations

**Requirements:** 17.1, 17.6

**Usage:**
```tsx
import { Timeline } from '@/components/experience';

export default function ExperiencePage() {
  return <Timeline />;
}
```

### ExperienceCard

Individual experience card component with glassmorphism design.

**Features:**
- Glassmorphism card design
- Hover effects with gradient glow
- Staggered entrance animations
- Company info and role display
- Achievements list with animations
- Technology tags with staggered animations
- Timeline dot indicator
- Responsive layout

**Requirements:** 17.2, 17.3, 17.4

**Props:**
- `experience`: Experience object with company, role, dates, etc.
- `index`: Card index for staggered animations
- `isLeft`: Boolean for alternating layout (desktop only)

## Design Features

### Desktop Layout
- Alternating left/right card layout
- Gradient timeline line in the center
- Animated timeline dots
- Cards positioned at 50% width with spacing

### Mobile Layout
- Stacked vertical layout
- Full-width cards
- Timeline line hidden
- Timeline dots hidden

### Animations
- Fade and slide entrance animations
- Staggered achievement list animations
- Technology tag scale-in animations
- Hover glow effects
- Pulse animation on timeline dots

### Glassmorphism
- Semi-transparent background with backdrop blur
- Gradient border glow on hover
- Subtle shadows and borders

## Accessibility

- Respects `prefers-reduced-motion`
- Semantic HTML structure
- Proper heading hierarchy
- Icon labels for screen readers
- Keyboard navigation support

## Demo

View the demo at `/demo-experience` to see the timeline in action.

## Integration

To integrate into the main page:

```tsx
import { Timeline } from '@/components/experience';

export default function HomePage() {
  return (
    <main>
      {/* Other sections */}
      <Timeline />
      {/* Other sections */}
    </main>
  );
}
```

## Data Structure

The Timeline component reads experience data from the site configuration:

```typescript
interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string; // undefined means current
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
  companyUrl?: string;
}
```

## Customization

### Colors
Gradient colors can be customized in `src/styles/design-tokens.ts`:
- Timeline line: `from-purple-500 via-pink-500 to-purple-500`
- Card title: `from-purple-400 to-pink-400`
- Timeline dots: `from-purple-500 to-pink-500`

### Animation Timing
Animation durations can be adjusted in the component:
- Card entrance delay: `index * 0.2`
- Achievement stagger: `i * 0.1`
- Technology tag stagger: `i * 0.05`

### Layout
Breakpoints for responsive layout:
- Mobile: `< md` (< 768px)
- Desktop: `>= md` (>= 768px)
