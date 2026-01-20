# Design Document: Portfolio Website

## Overview

The portfolio website is a modern, performant Next.js 15 application that showcases a software developer's work, skills, and experience. The architecture follows a component-based approach with clear separation of concerns between data fetching, state management, UI rendering, and business logic.

The system integrates with the GitHub API to dynamically display repositories and profile information, provides theme customization, includes interactive animations, and offers multiple ways for visitors to engage with the developer (contact form, CV download, social links).

Key design principles:
- **Performance First**: Optimize for fast load times through code splitting, lazy loading, and efficient caching
- **Accessibility**: WCAG AA compliance with keyboard navigation and screen reader support
- **Responsive**: Mobile-first design that scales elegantly to all screen sizes
- **Maintainable**: Configuration-driven content with clear component boundaries
- **Progressive Enhancement**: Core content accessible without JavaScript, enhanced with interactivity

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Next.js App                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │   Pages/     │  │  Components  │  │   Layouts    │    │
│  │   Routes     │  │              │  │              │    │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘    │
│         │                  │                  │             │
│         └──────────────────┼──────────────────┘             │
│                            │                                │
│  ┌─────────────────────────┴─────────────────────────┐    │
│  │              Custom Hooks Layer                    │    │
│  │  (useGitHub, useTheme, useContactForm, etc.)      │    │
│  └─────────────────────────┬─────────────────────────┘    │
│                            │                                │
│  ┌────────────┬────────────┴────────────┬──────────────┐  │
│  │  Services  │   State Management      │   Utils      │  │
│  │  (GitHub,  │   (Zustand stores)      │   (helpers)  │  │
│  │  Contact)  │                         │              │  │
│  └────────────┴─────────────────────────┴──────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                │                       │
         ┌──────▼──────┐        ┌──────▼──────┐
         │  GitHub API │        │  Local      │
         │             │        │  Storage    │
         └─────────────┘        └─────────────┘
```

### Component Hierarchy

```
App Layout
├── ThemeProvider (Context)
├── SkipLink
├── Header
│   ├── Logo
│   ├── Navigation
│   │   ├── DesktopNav
│   │   └── MobileNav
│   └── ThemeToggle
├── Main Content
│   ├── HeroSection
│   │   ├── ProfileImage
│   │   ├── Headline
│   │   └── CTAButtons
│   ├── AboutSection
│   │   ├── Bio
│   │   ├── Specializations
│   │   └── SocialLinks
│   ├── ProjectsSection
│   │   ├── ProjectFilters
│   │   └── ProjectGrid
│   │       └── ProjectCard[]
│   ├── SkillsSection
│   │   └── SkillCategory[]
│   │       └── SkillBadge[]
│   ├── ExperienceSection
│   │   └── Timeline
│   │       └── ExperienceEntry[]
│   └── ContactSection
│       ├── ContactForm
│       │   ├── FormField[]
│       │   └── SubmitButton
│       └── ContactInfo
└── Footer
    ├── Copyright
    └── SocialLinks
```

## Components and Interfaces

### Core Services

#### GitHubService

The GitHub service handles all interactions with the GitHub API, including rate limiting, retries, and error handling.

```typescript
interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  email: string | null;
  blog: string;
  twitter_username: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

class GitHubService {
  constructor(username: string, token?: string);
  
  // Fetch user profile with retry logic
  async getProfile(): Promise<GitHubProfile>;
  
  // Fetch all repositories with pagination
  async getRepositories(options?: RepositoryOptions): Promise<GitHubRepository[]>;
  
  // Fetch specific featured repositories
  async getFeaturedRepositories(repoNames: string[]): Promise<GitHubRepository[]>;
  
  // Internal: Handle rate limiting and retries
  private async fetchWithRetry(url: string, options?: FetchOptions): Promise<Response>;
  
  // Internal: Update rate limit tracking
  private updateRateLimitInfo(response: Response): void;
}
```

#### ContactService

Handles contact form submissions. Implementation can use various backends (email service, serverless function, etc.).

```typescript
interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

class ContactService {
  // Submit contact form data
  async submitContactForm(data: ContactFormData): Promise<ContactResponse>;
  
  // Validate form data
  validateFormData(data: ContactFormData): ValidationResult;
}

interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}
```

### State Management

#### Theme Store (Zustand)

```typescript
interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  effectiveTheme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
}

// Store persisted to localStorage
const useThemeStore = create<ThemeState>(
  persist(
    (set, get) => ({
      theme: 'system',
      effectiveTheme: 'light',
      setTheme: (theme) => { /* implementation */ },
      toggleTheme: () => { /* implementation */ },
    }),
    { name: 'theme-storage' }
  )
);
```

#### Contact Form Store (Zustand)

```typescript
interface ContactFormState {
  formData: ContactFormData;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  errors: Record<string, string>;
  
  updateField: (field: keyof ContactFormData, value: string) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;
}
```

### Custom Hooks

#### useGitHub Hooks

```typescript
// Fetch GitHub profile with SWR caching
function useGitHubProfile(): {
  data: GitHubProfile | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

// Fetch all repositories
function useGitHubRepositories(): {
  data: GitHubRepository[] | undefined;
  error: Error | undefined;
  isLoading: boolean;
}

// Fetch featured repositories
function useFeaturedRepositories(): {
  data: GitHubRepository[] | undefined;
  error: Error | undefined;
  isLoading: boolean;
}
```

#### useContactForm Hook

```typescript
function useContactForm(): {
  formData: ContactFormData;
  errors: Record<string, string>;
  isSubmitting: boolean;
  submitStatus: 'idle' | 'success' | 'error';
  
  updateField: (field: keyof ContactFormData, value: string) => void;
  handleSubmit: (e: FormEvent) => Promise<void>;
  resetForm: () => void;
}
```

#### useIntersectionObserver Hook

For scroll-triggered animations:

```typescript
function useIntersectionObserver(
  ref: RefObject<Element>,
  options?: IntersectionObserverInit
): {
  isIntersecting: boolean;
  hasIntersected: boolean;
}
```

#### useReducedMotion Hook

Respects user's motion preferences:

```typescript
function useReducedMotion(): boolean;
```

### UI Components

#### ProjectCard Component

```typescript
interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  onCardClick?: (project: Project) => void;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
}

function ProjectCard({ project, featured, onCardClick }: ProjectCardProps): JSX.Element;
```

#### SkillBadge Component

```typescript
interface SkillBadgeProps {
  name: string;
  icon?: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

function SkillBadge({ name, icon, proficiency, category }: SkillBadgeProps): JSX.Element;
```

#### ContactForm Component

```typescript
interface ContactFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

function ContactForm({ onSuccess, onError }: ContactFormProps): JSX.Element;
```

#### ExperienceEntry Component

```typescript
interface ExperienceEntryProps {
  company: string;
  role: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
}

function ExperienceEntry(props: ExperienceEntryProps): JSX.Element;
```

#### AnimatedSection Component

Wrapper for scroll-triggered animations:

```typescript
interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fade-in' | 'slide-up' | 'slide-in-left' | 'slide-in-right';
  delay?: number;
  className?: string;
}

function AnimatedSection({
  children,
  animation = 'fade-in',
  delay = 0,
  className
}: AnimatedSectionProps): JSX.Element;
```

## Data Models

### Configuration Model

The site configuration is centralized in a single file for easy customization:

```typescript
interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  
  author: {
    name: string;
    email: string;
    bio: string;
    avatar: string;
    location: string;
  };
  
  github: {
    username: string;
    token?: string;
    featured_repos: string[];
  };
  
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    email?: string;
  };
  
  skills: SkillCategory[];
  
  experience: ExperienceEntry[];
  
  projects: Project[];
  
  theme: {
    defaultTheme: 'light' | 'dark' | 'system';
    colors?: {
      primary?: string;
      secondary?: string;
    };
  };
  
  features: {
    showGitHubStats: boolean;
    showExperience: boolean;
    showSkills: boolean;
    showProjects: boolean;
    showContact: boolean;
    enableAnimations: boolean;
  };
  
  cv: {
    filename: string;
    path: string;
  };
}
```

### Project Model

```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured: boolean;
  category?: string;
  startDate?: string;
  endDate?: string;
  highlights?: string[];
}
```

### Skill Model

```typescript
interface Skill {
  name: string;
  icon?: string;
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
}

interface SkillCategory {
  name: string;
  skills: Skill[];
}
```

### Experience Model

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

### Form Validation Models

```typescript
interface FormField {
  name: string;
  value: string;
  error?: string;
  touched: boolean;
  required: boolean;
}

interface ValidationRule {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern';
  value?: any;
  message: string;
}
```

## Animation Strategy

### Framer Motion Integration

All animations use Framer Motion for consistency and performance:

```typescript
// Reusable animation variants
const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

### Animation Principles

1. **Respect User Preferences**: Check `prefers-reduced-motion` and disable animations if requested
2. **Performance**: Use `transform` and `opacity` for animations (GPU-accelerated)
3. **Purposeful**: Animations should guide attention and provide feedback, not distract
4. **Consistent Timing**: Use consistent duration and easing across similar animations
5. **Non-Blocking**: Animations should never prevent user interaction

### Scroll-Triggered Animations

Use Intersection Observer to trigger animations when sections enter viewport:

```typescript
function AnimatedSection({ children, animation }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting, hasIntersected } = useIntersectionObserver(ref, {
    threshold: 0.1,
    triggerOnce: true
  });
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? 'visible' : 'hidden'}
      animate={hasIntersected ? 'visible' : 'hidden'}
      variants={animationVariants[animation]}
    >
      {children}
    </motion.div>
  );
}
```

## Caching Strategy

### GitHub Data Caching

- **SWR Configuration**: 24-hour cache for GitHub data (profile, repositories)
- **Stale-While-Revalidate**: Show cached data immediately, revalidate in background
- **Local Storage**: Persist last successful fetch for offline access
- **Cache Keys**: Use descriptive keys (`github-profile`, `github-repositories`, `featured-repositories`)

### Image Optimization

- **Next.js Image Component**: Automatic optimization and lazy loading
- **Responsive Images**: Serve appropriate sizes based on viewport
- **Modern Formats**: WebP with fallback to JPEG/PNG
- **Blur Placeholders**: Low-quality image placeholders during load

### Static Generation

- **Static Pages**: Generate static HTML at build time for all pages
- **Incremental Static Regeneration**: Revalidate GitHub data periodically (e.g., every hour)
- **Client-Side Hydration**: Enhance with interactivity after initial load

## Error Handling

### GitHub API Errors

```typescript
interface GitHubError {
  type: 'rate_limit' | 'not_found' | 'network' | 'server_error';
  message: string;
  retryAfter?: number;
}

function handleGitHubError(error: Error): GitHubError {
  // Classify error and provide appropriate user message
  // Implement retry logic for transient errors
  // Cache last successful response for graceful degradation
}
```

### Form Submission Errors

```typescript
interface FormError {
  field?: string;
  message: string;
  type: 'validation' | 'network' | 'server';
}

function handleFormError(error: Error): FormError[] {
  // Parse error response
  // Map to user-friendly messages
  // Preserve form data for retry
}
```

### Error Boundaries

```typescript
class ErrorBoundary extends React.Component {
  // Catch rendering errors
  // Display fallback UI
  // Log errors for monitoring
}
```

### Graceful Degradation

- **GitHub API Unavailable**: Show cached data or placeholder content
- **Images Fail to Load**: Show fallback avatar/placeholder
- **JavaScript Disabled**: Core content still accessible
- **Network Offline**: Show cached content with offline indicator

## Performance Optimization

### Code Splitting

```typescript
// Lazy load heavy components
const ContactForm = dynamic(() => import('@/components/contact-form'), {
  loading: () => <FormSkeleton />,
  ssr: false
});

const AnimatedSection = dynamic(() => import('@/components/animated-section'), {
  ssr: true
});
```

### Bundle Optimization

- **Tree Shaking**: Remove unused code
- **Minification**: Compress JavaScript and CSS
- **Compression**: Enable gzip/brotli compression
- **Critical CSS**: Inline critical styles, defer non-critical

### Loading Strategy

1. **Critical Path**: HTML, critical CSS, fonts
2. **Above-the-Fold**: Hero section, navigation
3. **Below-the-Fold**: Lazy load remaining sections
4. **Deferred**: Analytics, non-essential scripts

### Metrics Targets

- **First Contentful Paint (FCP)**: < 1.5s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

## Accessibility Implementation

### Keyboard Navigation

- **Tab Order**: Logical tab order through all interactive elements
- **Focus Management**: Visible focus indicators, focus trapping in modals
- **Keyboard Shortcuts**: Skip links, section navigation
- **Focus Restoration**: Return focus after modal close

### Screen Reader Support

- **ARIA Labels**: Descriptive labels for all interactive elements
- **ARIA Live Regions**: Announce dynamic content changes
- **Semantic HTML**: Use appropriate HTML5 elements
- **Alt Text**: Descriptive alt text for all images

### Color and Contrast

- **Contrast Ratios**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Color Independence**: Don't rely solely on color to convey information
- **Focus Indicators**: High-contrast focus outlines

### Form Accessibility

- **Labels**: Associated labels for all form inputs
- **Error Messages**: Clear, descriptive error messages
- **Required Fields**: Clearly marked required fields
- **Validation**: Real-time validation with accessible feedback

## SEO Implementation

### Meta Tags

```typescript
export const metadata: Metadata = {
  title: 'Developer Name | Software Developer & Shopify Apps Specialist',
  description: 'Portfolio of a software developer specializing in Flutter, Dart, Kotlin, Go, TypeScript, and Node.js',
  keywords: ['software developer', 'flutter', 'shopify apps', 'typescript', 'portfolio'],
  authors: [{ name: 'Developer Name' }],
  openGraph: {
    title: 'Developer Name | Software Developer',
    description: 'Portfolio showcasing production-ready apps and projects',
    url: 'https://example.com',
    siteName: 'Developer Portfolio',
    images: [
      {
        url: 'https://example.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Name | Software Developer',
    description: 'Portfolio showcasing production-ready apps and projects',
    images: ['https://example.com/twitter-image.jpg'],
  },
};
```

### Structured Data

```typescript
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Developer Name',
  jobTitle: 'Software Developer',
  url: 'https://example.com',
  sameAs: [
    'https://github.com/username',
    'https://linkedin.com/in/username',
    'https://twitter.com/username',
  ],
  knowsAbout: ['Flutter', 'Dart', 'Kotlin', 'Go', 'TypeScript', 'Node.js'],
};
```

### Sitemap Generation

```typescript
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Additional pages
  ];
}
```


## Correctness Properties

A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.

### Property 1: GitHub Profile Data Completeness

*For any* GitHub profile data received from the API, when rendered in the UI, all required fields (avatar, bio, location, follower count) should be present in the rendered output.

**Validates: Requirements 1.2**

### Property 2: Repository Data Completeness

*For any* GitHub repository data, when displayed in the projects section, all required fields (name, description, star count, fork count, primary language) should be present in the rendered output.

**Validates: Requirements 2.2**

### Property 3: Repository Sorting Order

*For any* list of repositories with different update timestamps, when sorted by default, the repositories should be ordered from most recently updated to least recently updated.

**Validates: Requirements 2.5**

### Property 4: Featured Repository Styling

*For any* repository marked as featured, when rendered, it should have enhanced styling attributes (specific CSS classes or data attributes) that distinguish it from non-featured repositories.

**Validates: Requirements 2.3**

### Property 5: Project Data Completeness

*For any* project (whether from GitHub or manual configuration), when displayed, all required fields (title, description, technologies, links) should be present in the rendered output.

**Validates: Requirements 3.1, 3.2**

### Property 6: External Link Target Attribute

*For any* project with a live demo URL, when rendered, the link element should have the target="_blank" and rel="noopener noreferrer" attributes for security and UX.

**Validates: Requirements 3.3**

### Property 7: Mixed Project Source Support

*For any* combination of GitHub-sourced and manually-configured projects, the system should render both types correctly with all required fields present.

**Validates: Requirements 3.5**

### Property 8: Contact Form Validation - Required Fields

*For any* contact form submission attempt with one or more missing required fields (name, email, message), the form should prevent submission and display validation errors for each missing field.

**Validates: Requirements 5.3, 5.7**

### Property 9: Contact Form Validation - Email Format

*For any* string submitted as an email address, the validation should correctly identify whether it matches valid email format patterns (contains @, has domain, etc.).

**Validates: Requirements 5.4**

### Property 10: Contact Form Validation - Invalid Data

*For any* contact form submission with invalid data (invalid email, empty required fields, etc.), the form should display specific validation errors for each invalid field without submitting.

**Validates: Requirements 5.2**

### Property 11: Contact Form Valid Submission

*For any* contact form submission with valid data (non-empty name, valid email format, non-empty message), the form should successfully submit the data to the backend service.

**Validates: Requirements 5.1**

### Property 12: Theme Persistence

*For any* theme selection (light, dark, or system), when the theme is changed, the preference should be persisted to localStorage and retrievable on subsequent page loads.

**Validates: Requirements 6.2**

### Property 13: Touch Target Accessibility

*For any* interactive element on mobile viewports, the touch target size should meet minimum accessibility requirements (at least 44x44 pixels).

**Validates: Requirements 7.5**

### Property 14: Text Readability Across Viewports

*For any* text content, when viewed at any supported viewport size (mobile, tablet, desktop), the font size should meet minimum readability requirements (at least 16px for body text).

**Validates: Requirements 7.6**

### Property 15: Reduced Motion Preference

*For any* animation in the system, when the user has enabled reduced motion preference (prefers-reduced-motion: reduce), the animation should be disabled or replaced with an instant transition.

**Validates: Requirements 8.4, 8.5**

### Property 16: Non-Blocking Animations

*For any* animated element, during the animation, the element and surrounding interactive elements should remain accessible and responsive to user interaction.

**Validates: Requirements 8.6**

### Property 17: Lazy Loading Images

*For any* image that is below the fold (not in initial viewport), the image element should have the loading="lazy" attribute to enable browser-native lazy loading.

**Validates: Requirements 9.2**

### Property 18: Keyboard Navigation Completeness

*For any* interactive element (buttons, links, form inputs, etc.), the element should be reachable and operable using only keyboard navigation (Tab, Enter, Space, Arrow keys).

**Validates: Requirements 10.1**

### Property 19: ARIA Labels for Non-Text Content

*For any* non-text content (icons, images, interactive elements without visible text), the element should have an appropriate ARIA label (aria-label, aria-labelledby, or alt attribute).

**Validates: Requirements 10.2**

### Property 20: Heading Hierarchy

*For any* page in the application, the heading elements should follow a logical hierarchy without skipping levels (h1 → h2 → h3, never h1 → h3).

**Validates: Requirements 10.3**

### Property 21: Color Contrast Ratios

*For any* text content, the color contrast ratio between text and background should meet WCAG AA standards (at least 4.5:1 for normal text, 3:1 for large text).

**Validates: Requirements 10.4**

### Property 22: Focus Indicators

*For any* interactive element, when focused via keyboard navigation, the element should have a visible focus indicator (outline or custom focus styling) with sufficient contrast.

**Validates: Requirements 10.5**

### Property 23: Skills Grouping by Category

*For any* set of skills with assigned categories, when rendered, the skills should be grouped together by their category (Languages, Frameworks, Tools, Platforms).

**Validates: Requirements 11.2**

### Property 24: Skill Visual Representation

*For any* skill in the skills section, the rendered output should include either an icon or a badge for visual recognition.

**Validates: Requirements 11.3**

### Property 25: Conditional Proficiency Display

*For any* skill with a configured proficiency level, when rendered, the skill should display a visual indicator of the proficiency level (beginner, intermediate, advanced, expert).

**Validates: Requirements 11.4**

### Property 26: Technology Highlighting

*For any* list of specialization technologies (Flutter, Dart, Kotlin, Go, TypeScript, Node.js), when rendered in the about section, each technology should be visually highlighted or emphasized.

**Validates: Requirements 12.2**

### Property 27: Conditional Social Links Display

*For any* configured social media link (Twitter, LinkedIn, GitHub, email), when the link is present in configuration, it should be rendered as a clickable icon in the UI.

**Validates: Requirements 12.4**

### Property 28: Experience Data Completeness

*For any* experience entry, when displayed, all required fields (company name, role, duration, key achievements) should be present in the rendered output.

**Validates: Requirements 13.2**

### Property 29: Experience Chronological Ordering

*For any* list of experience entries with different start dates, when rendered, the entries should be ordered from most recent to oldest based on start date.

**Validates: Requirements 13.3**

### Property 30: Conditional Company Logo Display

*For any* experience entry with an available company logo URL, when rendered, the logo image should be displayed alongside the experience entry.

**Validates: Requirements 13.4**

### Property 31: Semantic HTML Usage

*For any* page section, the HTML structure should use appropriate semantic elements (header, nav, main, section, article, footer, aside) rather than generic div elements for structural markup.

**Validates: Requirements 14.5**

### Property 32: Configuration-Driven Customization

*For any* customizable theme property (colors, fonts, spacing), when the value is changed in the configuration file, the rendered UI should reflect the updated value.

**Validates: Requirements 15.2**

### Property 33: Configuration-Driven Section Visibility

*For any* optional section (GitHub stats, experience, skills, projects, contact), when the feature flag is set to false in configuration, the section should not be rendered in the UI.

**Validates: Requirements 15.5**

### Property 34: API Error Graceful Degradation

*For any* GitHub API error (rate limit, network failure, 404, 500), the system should either display cached data or show a user-friendly error message without crashing.

**Validates: Requirements 1.3**

## Error Handling

### GitHub API Error Handling

The system implements comprehensive error handling for GitHub API interactions:

1. **Rate Limiting**: When rate limit is reached, the service waits until reset time before retrying
2. **Network Errors**: Exponential backoff with jitter for transient network failures (max 3 retries)
3. **Server Errors (5xx)**: Retry with exponential backoff
4. **Client Errors (4xx)**: No retry, display appropriate error message
5. **Cached Fallback**: Display last successful response when API is unavailable

```typescript
try {
  const profile = await githubService.getProfile();
  return profile;
} catch (error) {
  // Try to load from cache
  const cached = getCachedProfile();
  if (cached) {
    return cached;
  }
  // Display user-friendly error
  throw new UserFacingError('Unable to load GitHub profile. Please try again later.');
}
```

### Form Validation Error Handling

Contact form implements client-side validation with clear error messages:

1. **Required Field Validation**: Check all required fields before submission
2. **Format Validation**: Validate email format, message length, etc.
3. **Server-Side Errors**: Display server error messages and preserve form data
4. **Network Errors**: Allow retry without losing form data

```typescript
const validateForm = (data: ContactFormData): ValidationResult => {
  const errors: Record<string, string> = {};
  
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
};
```

### Component Error Boundaries

React Error Boundaries catch rendering errors and display fallback UI:

```typescript
class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to error tracking service
    console.error('Component error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

### Image Loading Errors

Handle image loading failures gracefully:

```typescript
<Image
  src={imageUrl}
  alt={altText}
  onError={(e) => {
    e.currentTarget.src = '/placeholder-image.jpg';
  }}
/>
```

## Testing Strategy

The portfolio website will employ a comprehensive testing strategy combining unit tests and property-based tests to ensure correctness, reliability, and maintainability.

### Dual Testing Approach

**Unit Tests**: Verify specific examples, edge cases, and error conditions
- Specific user interactions (button clicks, form submissions)
- Edge cases (empty data, missing fields, error states)
- Integration points between components
- Specific error scenarios

**Property-Based Tests**: Verify universal properties across all inputs
- Data rendering completeness (all required fields present)
- Validation logic (email format, required fields)
- Sorting and ordering algorithms
- Accessibility requirements (contrast ratios, keyboard navigation)
- Configuration-driven behavior

Both testing approaches are complementary and necessary for comprehensive coverage. Unit tests catch concrete bugs in specific scenarios, while property-based tests verify general correctness across a wide range of inputs.

### Property-Based Testing Configuration

**Library**: fast-check (already installed in the project)

**Configuration**:
- Minimum 100 iterations per property test (due to randomization)
- Each property test must reference its design document property
- Tag format: `// Feature: portfolio-website, Property {number}: {property_text}`

**Example Property Test**:

```typescript
import fc from 'fast-check';

// Feature: portfolio-website, Property 2: Repository Data Completeness
describe('Repository Data Completeness', () => {
  it('should render all required fields for any repository', () => {
    fc.assert(
      fc.property(
        fc.record({
          id: fc.integer(),
          name: fc.string({ minLength: 1 }),
          description: fc.option(fc.string()),
          html_url: fc.webUrl(),
          stargazers_count: fc.nat(),
          forks_count: fc.nat(),
          language: fc.option(fc.string()),
        }),
        (repository) => {
          const { container } = render(<RepositoryCard repository={repository} />);
          
          // Verify all required fields are present
          expect(container).toHaveTextContent(repository.name);
          expect(container.querySelector('[data-testid="stars"]')).toHaveTextContent(
            repository.stargazers_count.toString()
          );
          expect(container.querySelector('[data-testid="forks"]')).toHaveTextContent(
            repository.forks_count.toString()
          );
          
          if (repository.description) {
            expect(container).toHaveTextContent(repository.description);
          }
          
          if (repository.language) {
            expect(container).toHaveTextContent(repository.language);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
```

### Unit Test Examples

**Component Rendering**:
```typescript
describe('ProjectCard', () => {
  it('should render project with all fields', () => {
    const project = {
      id: '1',
      title: 'Test Project',
      description: 'A test project',
      technologies: ['React', 'TypeScript'],
      githubUrl: 'https://github.com/user/repo',
      featured: false,
    };
    
    const { container } = render(<ProjectCard project={project} />);
    
    expect(container).toHaveTextContent('Test Project');
    expect(container).toHaveTextContent('A test project');
    expect(container).toHaveTextContent('React');
    expect(container).toHaveTextContent('TypeScript');
  });
  
  it('should open external links in new tab', () => {
    const project = {
      id: '1',
      title: 'Test',
      description: 'Test',
      technologies: [],
      liveUrl: 'https://example.com',
      featured: false,
    };
    
    const { getByRole } = render(<ProjectCard project={project} />);
    const link = getByRole('link', { name: /view live/i });
    
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
```

**Form Validation**:
```typescript
describe('ContactForm Validation', () => {
  it('should show error for empty required fields', async () => {
    const { getByRole, getByText } = render(<ContactForm />);
    const submitButton = getByRole('button', { name: /send/i });
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(getByText('Name is required')).toBeInTheDocument();
      expect(getByText('Email is required')).toBeInTheDocument();
      expect(getByText('Message is required')).toBeInTheDocument();
    });
  });
  
  it('should show error for invalid email format', async () => {
    const { getByLabelText, getByRole, getByText } = render(<ContactForm />);
    
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: 'invalid-email' },
    });
    fireEvent.click(getByRole('button', { name: /send/i }));
    
    await waitFor(() => {
      expect(getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });
});
```

**Theme Functionality**:
```typescript
describe('Theme Toggle', () => {
  it('should toggle between light and dark themes', () => {
    const { getByRole } = render(<ThemeToggle />);
    const toggle = getByRole('button', { name: /toggle theme/i });
    
    // Initial theme
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    
    // Toggle to dark
    fireEvent.click(toggle);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    
    // Toggle back to light
    fireEvent.click(toggle);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
  
  it('should persist theme preference to localStorage', () => {
    const { getByRole } = render(<ThemeToggle />);
    const toggle = getByRole('button', { name: /toggle theme/i });
    
    fireEvent.click(toggle);
    
    const stored = localStorage.getItem('theme-storage');
    expect(stored).toBeTruthy();
    const parsed = JSON.parse(stored!);
    expect(parsed.state.theme).toBe('dark');
  });
});
```

### Test Organization

```
tests/
├── unit/
│   ├── components/
│   │   ├── project-card.test.tsx
│   │   ├── contact-form.test.tsx
│   │   ├── skill-badge.test.tsx
│   │   └── theme-toggle.test.tsx
│   ├── services/
│   │   ├── github.test.ts
│   │   └── contact.test.ts
│   ├── hooks/
│   │   ├── use-github.test.ts
│   │   └── use-contact-form.test.ts
│   └── utils/
│       └── validation.test.ts
├── properties/
│   ├── data-completeness.test.ts
│   ├── validation.test.ts
│   ├── accessibility.test.ts
│   ├── sorting.test.ts
│   └── configuration.test.ts
└── fixtures/
    ├── github-data.ts
    ├── project-data.ts
    └── form-data.ts
```

### Testing Best Practices

1. **Avoid Over-Testing**: Focus on core functionality and important edge cases, not exhaustive coverage of every possible input
2. **Use Real Data**: Avoid mocks where possible; test with real implementations
3. **Property Test Generators**: Write smart generators that constrain to valid input space
4. **Test Behavior, Not Implementation**: Test what the component does, not how it does it
5. **Accessibility Testing**: Include accessibility checks in component tests
6. **Performance Testing**: Monitor test execution time; optimize slow tests

### Continuous Integration

Tests run automatically on:
- Every commit (pre-commit hook)
- Pull requests (CI pipeline)
- Before deployment (pre-deploy check)

**CI Configuration**:
```yaml
test:
  script:
    - npm run test
    - npm run test:coverage
  coverage: '/Statements\s+:\s+(\d+\.\d+)%/'
  artifacts:
    reports:
      coverage_report:
        coverage_format: cobertura
        path: coverage/cobertura-coverage.xml
```

### Coverage Goals

- **Unit Test Coverage**: Minimum 80% line coverage
- **Property Test Coverage**: All correctness properties implemented
- **Critical Path Coverage**: 100% coverage for critical user flows (contact form, GitHub integration, theme toggle)
