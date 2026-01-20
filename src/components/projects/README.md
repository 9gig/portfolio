# Project Showcase Components

This directory contains components for displaying projects in the portfolio website.

## Components

### ProjectCard

Displays an individual project with all its details including title, description, technologies, links, and highlights.

**Features:**
- Hover animations for interactive feedback
- Featured project styling with gradient background
- Support for project images
- Technology tags
- Highlight bullets with checkmarks
- External links (live demo and GitHub) with proper security attributes
- Category badges

**Props:**
- `project: Project` - The project data to display
- `featured?: boolean` - Whether to apply featured styling (default: false)
- `onCardClick?: (project: Project) => void` - Optional click handler

**Usage:**
```tsx
import { ProjectCard } from '@/components/projects';

<ProjectCard 
  project={project} 
  featured={project.featured}
  onCardClick={(p) => console.log('Clicked:', p.title)}
/>
```

### ProjectGrid

Displays a grid of projects with filtering capabilities.

**Features:**
- Category filtering (All, Web Apps, Mobile Apps, APIs, Libraries, Tools, Other)
- Automatic sorting (featured first, then by date)
- Responsive grid layout (1 column mobile, 2 tablet, 3 desktop)
- Smooth animations when filtering
- Project count display
- Empty state handling

**Props:**
- `projects: Project[]` - Array of projects to display
- `showFilters?: boolean` - Whether to show category filters (default: true)
- `onProjectClick?: (project: Project) => void` - Optional click handler for project cards

**Usage:**
```tsx
import { ProjectGrid } from '@/components/projects';

<ProjectGrid 
  projects={projects}
  showFilters={true}
  onProjectClick={(p) => router.push(`/projects/${p.id}`)}
/>
```

### ProjectsSection

A complete section that combines manual projects with GitHub repositories.

**Features:**
- Integrates manual projects from configuration
- Optionally includes GitHub repositories
- Converts GitHub repos to project format
- Deduplicates projects (manual projects take precedence)
- Includes section heading and description
- Full-width responsive container

**Props:**
- `manualProjects: Project[]` - Projects from site configuration
- `githubRepositories?: GitHubRepository[]` - Optional GitHub repos to include
- `showGitHubRepos?: boolean` - Whether to include GitHub repos (default: true)
- `onProjectClick?: (project: Project) => void` - Optional click handler

**Usage:**
```tsx
import { ProjectsSection } from '@/components/projects';
import { siteConfig } from '@/config/site';
import { useGitHubRepositories } from '@/hooks/use-github';

function ProjectsPage() {
  const { data: repos } = useGitHubRepositories();
  
  return (
    <ProjectsSection
      manualProjects={siteConfig.projects}
      githubRepositories={repos}
      showGitHubRepos={siteConfig.features.showGitHubStats}
    />
  );
}
```

## Data Flow

1. **Manual Projects**: Defined in `src/config/site.ts` with full control over all fields
2. **GitHub Repositories**: Fetched via GitHub API and converted to project format
3. **Deduplication**: If a manual project has the same GitHub URL as a repo, the manual project is used
4. **Filtering**: Projects can be filtered by category
5. **Sorting**: Featured projects appear first, then sorted by start date (most recent first)

## Styling

All components use Tailwind CSS with:
- Dark mode support via `dark:` variants
- Responsive breakpoints (`sm:`, `lg:`)
- Hover states for interactivity
- Framer Motion for smooth animations
- Consistent color scheme (blue primary, violet secondary)

## Accessibility

- Semantic HTML elements
- Proper ARIA attributes (`aria-pressed` for filter buttons)
- External links have `target="_blank"` and `rel="noopener noreferrer"`
- Keyboard navigation support
- Screen reader friendly text and labels
- Sufficient color contrast ratios

## Requirements Validation

These components satisfy the following requirements:

- **3.1**: Display featured projects with descriptions and technology stacks ✓
- **3.2**: Show project title, description, technologies, and links ✓
- **3.3**: External links open in new tab with security attributes ✓
- **3.4**: Hover animations on project cards ✓
- **3.5**: Support for both GitHub and manual projects ✓
