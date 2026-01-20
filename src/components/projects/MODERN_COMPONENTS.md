# Modern Project Components

This document describes the modern project card components with glassmorphism effects and animations.

## Components

### ProjectCardModern

A modern project card component with the following features:

- **Glassmorphism Effects**: Semi-transparent background with backdrop blur
- **Gradient Border Animation**: Animated gradient border that cycles through colors on hover
- **Scale and Lift Effects**: Card scales and lifts on hover for depth
- **Image with Overlay**: Project images with gradient overlays that animate on hover
- **Animated Technology Tags**: Pill-shaped badges with staggered entrance animations and hover effects
- **Action Buttons**: Gradient buttons for GitHub and live demo links

#### Props

```typescript
interface ProjectCardModernProps {
  project: Project;           // Project data
  index?: number;            // Index for stagger animation delay
  onCardClick?: (project: Project) => void; // Optional click handler
}
```

#### Usage

```tsx
import { ProjectCardModern } from '@/components/projects';

<ProjectCardModern
  project={myProject}
  index={0}
  onCardClick={(project) => console.log('Clicked:', project.title)}
/>
```

### ProjectGridModern

A responsive grid layout for displaying multiple project cards with animations:

- **Responsive Grid**: Adapts from 1 column (mobile) to 3 columns (desktop)
- **Category Filters**: Animated filter buttons with smooth transitions
- **Staggered Entrance**: Cards animate in with staggered timing
- **Scroll-Triggered Reveals**: Cards animate when they enter the viewport
- **Empty State**: Friendly empty state when no projects match filters

#### Props

```typescript
interface ProjectGridModernProps {
  projects: Project[];       // Array of projects to display
  showFilters?: boolean;     // Show/hide category filters (default: true)
  onProjectClick?: (project: Project) => void; // Optional click handler
}
```

#### Usage

```tsx
import { ProjectGridModern } from '@/components/projects';

<ProjectGridModern
  projects={myProjects}
  showFilters={true}
  onProjectClick={(project) => console.log('Clicked:', project.title)}
/>
```

## Demo Page

Visit `/demo-projects` to see the modern project cards in action with sample data.

## Requirements Validated

- **6.1**: Glassmorphism card with image ✓
- **6.2**: Gradient border animation on hover ✓
- **6.3**: Scale and lift effects ✓
- **6.4**: Technology tags with animations ✓
- **6.6**: Responsive grid with stagger animations ✓

## Animation Details

### Card Entrance
- Initial state: opacity 0, y offset 50px, scale 0.9
- Animated to: opacity 1, y 0, scale 1
- Duration: 500ms with spring easing
- Stagger delay: 100ms between cards

### Hover Effects
- Card lifts 5px on hover
- Image scales to 110%
- Gradient border animates through color cycle
- Technology tags scale to 110%

### Filter Transitions
- Active filter has animated gradient background
- Smooth layout transitions using Framer Motion's layoutId
- Filter buttons scale on hover and tap

## Performance Considerations

- Uses `whileInView` for scroll-triggered animations
- `viewport={{ once: true }}` prevents re-animation on scroll up
- Hardware-accelerated transforms (translateY, scale)
- Optimized image loading with Next.js Image component
- Stagger delays prevent animation overload

## Accessibility

- Semantic HTML structure
- ARIA attributes for interactive elements
- Keyboard navigation support
- Focus indicators on interactive elements
- Alt text for images
- Proper heading hierarchy

## Browser Support

- Modern browsers with CSS backdrop-filter support
- Graceful degradation for older browsers
- Tested in Chrome, Firefox, Safari, and Edge
