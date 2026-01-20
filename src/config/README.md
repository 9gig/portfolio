# Site Configuration

This directory contains the centralized configuration for the portfolio website. All customizable options are defined in `site.ts`.

## Configuration Structure

The site configuration follows the `SiteConfig` interface defined in `src/types/index.ts`. It includes:

### Basic Site Information
- `name`: Site name
- `title`: Full page title (used in metadata)
- `description`: Site description (used in metadata and SEO)
- `url`: Site URL

### Author Information
- `author.name`: Your full name
- `author.email`: Your email address
- `author.bio`: Your bio/description
- `author.avatar`: Path to your avatar image
- `author.location`: Your location

### GitHub Integration
- `github.username`: Your GitHub username (required)
- `github.token`: Optional GitHub personal access token for higher rate limits
- `github.featured_repos`: Array of repository names to feature prominently

### Social Links
All social links are optional. Include only the ones you want to display:
- `social.github`: GitHub profile URL
- `social.linkedin`: LinkedIn profile URL
- `social.twitter`: Twitter profile URL
- `social.email`: Contact email

### Skills
Array of skill categories, each containing:
- `name`: Category name (e.g., "Languages", "Frameworks")
- `skills`: Array of skills with:
  - `name`: Skill name (required)
  - `icon`: Optional icon identifier
  - `proficiency`: Optional proficiency level (beginner, intermediate, advanced, expert)
  - `yearsOfExperience`: Optional years of experience

### Experience
Array of work experience entries:
- `id`: Unique identifier
- `company`: Company name
- `role`: Your role/position
- `startDate`: Start date (YYYY-MM format)
- `endDate`: End date (YYYY-MM format, or undefined for current position)
- `location`: Job location
- `description`: Brief description
- `achievements`: Array of key achievements
- `technologies`: Array of technologies used
- `logo`: Optional company logo path
- `companyUrl`: Optional company website URL

### Projects
Array of project entries:
- `id`: Unique identifier
- `title`: Project title
- `description`: Short description
- `longDescription`: Optional detailed description
- `technologies`: Array of technologies used
- `githubUrl`: Optional GitHub repository URL
- `liveUrl`: Optional live demo URL
- `imageUrl`: Optional project image
- `featured`: Boolean indicating if project should be featured
- `category`: Optional category
- `startDate`: Optional start date
- `endDate`: Optional end date
- `highlights`: Optional array of key highlights

### Theme Configuration
- `theme.defaultTheme`: Default theme ('light', 'dark', or 'system')
- `theme.colors.primary`: Optional primary color override
- `theme.colors.secondary`: Optional secondary color override

### Feature Flags
Control which sections are displayed:
- `features.showGitHubStats`: Show GitHub profile and repositories
- `features.showExperience`: Show experience section
- `features.showSkills`: Show skills section
- `features.showProjects`: Show projects section
- `features.showContact`: Show contact section
- `features.enableAnimations`: Enable animations throughout the site

### CV Configuration
- `cv.filename`: CV filename for download
- `cv.path`: Path to CV file in public directory

## Configuration Validation

The configuration is automatically validated in development mode. If there are any errors, they will be displayed in the console at startup.

Validation checks:
- Required fields are present
- Email addresses are valid
- URLs are properly formatted
- Arrays contain valid data
- Proficiency levels are valid values
- Feature flags are booleans

## Using Configuration in Components

### Direct Import
```typescript
import { siteConfig } from '@/config/site';

// Access configuration
const authorName = siteConfig.author.name;
const showProjects = siteConfig.features.showProjects;
```

### Using Hooks
```typescript
import { useSiteConfig, useFeatureFlag, useAuthorInfo } from '@/hooks/use-site-config';

function MyComponent() {
  const config = useSiteConfig();
  const showProjects = useFeatureFlag('showProjects');
  const author = useAuthorInfo();
  
  return <div>{author.name}</div>;
}
```

## Customization Guide

1. **Update Basic Information**: Edit `name`, `title`, `description`, and `url`
2. **Update Author Details**: Edit all fields under `author`
3. **Configure GitHub**: Set your `github.username` and optionally add `featured_repos`
4. **Add Social Links**: Add URLs for the social platforms you use
5. **Add Skills**: Organize your skills into categories
6. **Add Experience**: List your work history with achievements
7. **Add Projects**: Showcase your projects (both GitHub and custom)
8. **Configure Theme**: Set default theme and optional color overrides
9. **Toggle Features**: Enable/disable sections using feature flags
10. **Set CV Path**: Point to your CV file in the public directory

## Environment Variables

You can optionally set a GitHub token for higher API rate limits:

```env
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
```

This is used in `src/hooks/use-github.ts` when initializing the GitHub service.

## Best Practices

1. **Keep it Updated**: Regularly update your experience, projects, and skills
2. **Use Feature Flags**: Disable sections you're not ready to show yet
3. **Validate URLs**: Ensure all URLs are complete and correct
4. **Optimize Images**: Use optimized images for avatars, logos, and project screenshots
5. **Test Changes**: Run `npm run build` after making configuration changes to catch errors early
