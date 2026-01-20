# About Components

This directory contains components for the About section of the portfolio website.

## Components

### AboutSection

The main About section component that displays the developer's bio, profile image, specializations, social links, and a call-to-action button.

**Props:**
- `author`: Author information from site configuration (name, bio, avatar, location)
- `social`: Social media links from site configuration

**Features:**
- Profile image with Next.js Image optimization
- Bio text display
- Technology specialization badges (Flutter, Dart, Kotlin, Go, TypeScript, Node.js)
- Location display with icon
- Social media links with icons (GitHub, LinkedIn, Twitter, Email)
- Call-to-action button linking to contact section
- Fully responsive layout
- Accessible with proper ARIA labels

**Usage:**
```tsx
import { AboutSection } from '@/components/about';
import { siteConfig } from '@/config/site';

<AboutSection 
  author={siteConfig.author} 
  social={siteConfig.social} 
/>
```

## Styling

The components use Tailwind CSS with the project's design system:
- Primary color for specialization badges
- Muted foreground for secondary text
- Responsive grid layout
- Hover effects on social links
- Shadow effects on profile image

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- ARIA labels for social links
- Alt text for profile image
- Keyboard navigation support
- Focus indicators on interactive elements
