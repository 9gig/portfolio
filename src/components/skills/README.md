# Skills Components

This directory contains components for displaying the developer's skills and technical expertise.

## Components

### SkillBadge

Displays an individual skill with optional proficiency indicator and hover tooltip.

**Props:**
- `skill: Skill` - The skill data including name, proficiency, and years of experience
- `category: string` - The category this skill belongs to

**Features:**
- Visual proficiency indicators (color-coded by level)
- Hover tooltip showing proficiency level and years of experience
- Smooth hover animations
- Icon support (optional)
- Accessible with ARIA labels

**Proficiency Levels:**
- Beginner (gray)
- Intermediate (blue)
- Advanced (violet)
- Expert (green)

### SkillCategory

Groups related skills together under a category heading.

**Props:**
- `category: SkillCategoryType` - The category data including name and skills array
- `index?: number` - Optional index for staggered animations

**Features:**
- Staggered animations for skill badges
- Responsive grid layout
- Category title with clear visual hierarchy

### SkillsSection

Main section component that displays all skill categories.

**Features:**
- Reads configuration from site config
- Respects `features.showSkills` flag
- Responsive grid layout (1 column on mobile, 2 columns on desktop)
- Section heading with description
- Proper semantic HTML with ARIA labels

## Usage

```tsx
import { SkillsSection } from '@/components/skills';

export default function HomePage() {
  return (
    <main>
      <SkillsSection />
    </main>
  );
}
```

## Configuration

Skills are configured in `src/config/site.ts`:

```typescript
skills: [
  {
    name: 'Languages',
    skills: [
      { 
        name: 'TypeScript', 
        proficiency: 'expert', 
        yearsOfExperience: 5,
        icon: '📘' // Optional
      },
      // ... more skills
    ],
  },
  // ... more categories
]
```

## Accessibility

- Semantic HTML with proper heading hierarchy
- ARIA labels for proficiency indicators
- Keyboard navigation support
- Screen reader friendly tooltips
- High contrast color schemes for proficiency levels

## Animations

- Hover scale effect on skill badges
- Staggered entrance animations for skills
- Smooth tooltip transitions
- Respects `prefers-reduced-motion` preference (via Framer Motion)

## Requirements Validation

This implementation satisfies:
- **Requirement 11.1**: Skills section loads and displays technology categories
- **Requirement 11.2**: Skills are grouped by category
- **Requirement 11.3**: Visual representation with badges
- **Requirement 11.4**: Proficiency level indicators (when configured)
- **Requirement 11.5**: Hover interactions show additional information
