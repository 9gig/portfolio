# UI Components

This directory contains reusable UI components used throughout the portfolio website.

## Components

### Button

A versatile button component with multiple variants and sizes.

**Variants:**
- `default` - Primary button with filled background
- `outline` - Button with border and transparent background
- `ghost` - Button with no border or background

**Sizes:**
- `default` - Standard button size (h-10)
- `sm` - Small button (h-9)
- `lg` - Large button (h-11)

**Usage:**
```tsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg">
  Click Me
</Button>
```

### CVDownloadButton

A specialized button component for downloading the developer's CV/resume.

**Features:**
- Automatic file existence checking
- Loading states during download
- Error handling with user-friendly messages
- Analytics tracking integration
- Accessible markup with ARIA labels

**Props:**
- `filename` (string, required) - The display name of the CV file
- `path` (string, required) - The path to the CV file in the public directory
- `variant` (string, optional) - Button style variant (default, outline, ghost)
- `size` (string, optional) - Button size (default, sm, lg)
- `className` (string, optional) - Additional CSS classes

**Usage:**
```tsx
import { CVDownloadButton } from '@/components/ui/cv-download-button';

<CVDownloadButton
  filename="John_Doe_Resume.pdf"
  path="/resume.pdf"
  variant="outline"
  size="lg"
/>
```

**Error Handling:**
The component handles several error scenarios:
- File not found (404)
- Network errors
- Server errors

When an error occurs, a user-friendly message is displayed below the button, and the user can retry the download.

**Analytics:**
The component automatically tracks CV download events using the analytics utility. This allows you to monitor how many visitors download your CV.

**Accessibility:**
- Proper ARIA labels for screen readers
- Keyboard accessible
- Loading state communicated to assistive technologies
- Error messages announced via `aria-live` regions

### ThemeToggle

A button component for toggling between light and dark themes.

**Usage:**
```tsx
import { ThemeToggle } from '@/components/ui/theme-toggle';

<ThemeToggle />
```

## Configuration

To configure the CV download feature, update the `cv` section in your site configuration:

```typescript
// src/config/site.ts
export const siteConfig: SiteConfig = {
  // ... other config
  cv: {
    filename: 'Your_Name_Resume.pdf',
    path: '/resume.pdf',
  },
};
```

Make sure to place your actual CV file in the `public` directory at the specified path.

## Testing

All UI components have comprehensive test coverage including:
- Unit tests for component rendering and behavior
- Accessibility tests
- Error handling tests
- User interaction tests

Run tests with:
```bash
npm test
```

## Analytics Integration

The CV download button integrates with the analytics system to track downloads. The analytics module supports:
- Google Analytics
- Plausible Analytics
- Custom analytics solutions

Configure your analytics provider in the `src/lib/analytics.ts` file.
