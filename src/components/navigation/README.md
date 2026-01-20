# Modern Navigation Components

This directory contains the modern navigation bar implementation with glassmorphism effects, smooth animations, and responsive mobile menu.

## Components

### Navbar

The main navigation bar component with scroll-triggered effects and active section highlighting.

**Features:**
- Fixed positioning with glassmorphism background
- Scroll-triggered opacity and blur changes
- Active section highlighting based on scroll position
- Animated underlines on navigation links
- Smooth scroll-to-section functionality
- Gradient logo with hover animation
- Integrated theme toggle

**Props:**
```typescript
interface NavbarProps {
  items: NavigationItem[];
  onMobileMenuToggle: () => void;
  mobileMenuOpen: boolean;
}
```

**Usage:**
```tsx
import { Navbar } from '@/components/navigation/navbar';

<Navbar
  items={navigationItems}
  onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
  mobileMenuOpen={mobileMenuOpen}
/>
```

### MobileMenu

Animated mobile menu drawer with slide-in animation and staggered item animations.

**Features:**
- Slide-in animation from the right
- Backdrop blur overlay
- Staggered menu item animations
- Gradient hover effects on items
- Animated indicator on hover
- Keyboard navigation support (Escape to close)
- Focus management
- Body scroll lock when open

**Props:**
```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavigationItem[];
}
```

**Usage:**
```tsx
import { MobileMenu } from '@/components/navigation/mobile-menu';

<MobileMenu
  isOpen={mobileMenuOpen}
  onClose={() => setMobileMenuOpen(false)}
  items={navigationItems}
/>
```

## Requirements Validation

### Requirement 5.1: Fixed Navigation with Glassmorphism
✅ Navbar displays with transparent background initially
✅ Glassmorphism effect applied with backdrop blur
✅ Fixed positioning maintained during scroll

### Requirement 5.2: Scroll-Triggered Opacity Changes
✅ Navigation becomes more opaque when scrolling down
✅ Smooth transitions between states
✅ Shadow added on scroll for depth

### Requirement 5.3: Hover Underline Animations
✅ Animated underlines on navigation links
✅ Gradient underline effect (purple to pink)
✅ Smooth scale animation on hover

### Requirement 5.4: Active Section Highlighting
✅ Active section tracked based on scroll position
✅ Active link highlighted with white text
✅ Underline visible for active section

### Requirement 5.5: Smooth Scroll-to-Section
✅ Smooth scroll functionality implemented
✅ Uses existing handleSmoothScroll utility
✅ Works for all navigation links

### Requirement 5.6: Mobile Hamburger Menu
✅ Hamburger button on mobile devices
✅ Animated drawer slides in from right
✅ Menu items have staggered entrance animations

### Requirement 14.5: Mobile Menu Animation
✅ Spring animation for drawer
✅ Backdrop fade animation
✅ Staggered item animations (0.1s delay per item)

## Animations

### Navbar Animations
- **Initial Load**: Slides down from top (y: -100 to 0)
- **Logo Hover**: Scale 1.05
- **Link Hover**: Scale 1.05, underline expands
- **Scroll Effect**: Opacity and blur transform based on scroll position

### Mobile Menu Animations
- **Drawer**: Spring animation (stiffness: 300, damping: 30)
- **Backdrop**: Fade in/out (0.3s duration)
- **Menu Items**: Staggered fade and slide (0.1s delay per item)
- **Hover Effects**: Gradient background and left indicator

## Accessibility

- ✅ Keyboard navigation support
- ✅ Focus indicators on all interactive elements
- ✅ ARIA labels for buttons and navigation
- ✅ Escape key closes mobile menu
- ✅ Focus management (first link focused on open)
- ✅ Body scroll lock when mobile menu open
- ✅ Semantic HTML (nav, button elements)

## Performance

- Uses Framer Motion for hardware-accelerated animations
- CSS transforms for smooth performance
- Intersection observer for scroll tracking
- Efficient re-renders with React hooks
- Lazy animation triggers

## Browser Support

- Modern browsers with backdrop-filter support
- Fallback for browsers without backdrop-filter
- Responsive design for all screen sizes
- Touch-friendly mobile interactions

## Demo

Visit `/demo-navigation` to see the navigation in action with multiple sections to scroll through.

## Integration

The navigation is integrated into the main layout via the Header component:

```tsx
// src/components/layout/header.tsx
import { Navbar } from '@/components/navigation/navbar';
import { MobileMenu } from '@/components/navigation/mobile-menu';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigationItems = getNavigationItems();

  return (
    <>
      <Navbar
        items={navigationItems}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        mobileMenuOpen={mobileMenuOpen}
      />
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={navigationItems}
      />
    </>
  );
}
```

## Customization

### Colors
Modify gradient colors in `src/styles/design-tokens.ts`:
```typescript
export const gradients = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  // ... other gradients
};
```

### Animation Timing
Adjust animation durations in component props or design tokens:
```typescript
export const animations = {
  durations: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
};
```

### Glassmorphism Intensity
Modify glassmorphism settings in `src/styles/glassmorphism.ts`:
```typescript
export const glassmorphism = {
  dark: {
    background: 'rgba(17, 25, 40, 0.75)',
    blur: '16px',
    // ... other properties
  },
};
```
