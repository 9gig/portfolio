# GitHub Components

This directory contains components for displaying GitHub profile and repository data.

## Components

### GitHubProfileCard

Displays a GitHub user's profile information including avatar, bio, and stats.

**Features:**
- Automatic data fetching with SWR
- Loading states with skeleton UI
- Error handling with graceful degradation
- Cached data fallback when API is unavailable
- Responsive design

**Usage:**
```tsx
import { GitHubProfileCard } from '@/components/github';

<GitHubProfileCard />
```

**Props:**
- `fallbackData?: GitHubProfile` - Optional fallback data to display if API fails

### RepositoryCard

Displays a single GitHub repository with its details.

**Features:**
- Repository name, description, and stats (stars, forks)
- Language indicator
- Topics/tags display
- Featured repository styling
- External link with proper security attributes

**Usage:**
```tsx
import { RepositoryCard } from '@/components/github';

<RepositoryCard repository={repo} featured={true} />
```

**Props:**
- `repository: GitHubRepository` - Repository data to display
- `featured?: boolean` - Whether to apply featured styling (default: false)

### RepositoryList

Displays a grid of GitHub repositories.

**Features:**
- Automatic data fetching with SWR
- Loading states with skeleton UI
- Error handling with graceful degradation
- Cached data fallback when API is unavailable
- Responsive grid layout
- Support for showing all repos or featured only

**Usage:**
```tsx
import { RepositoryList } from '@/components/github';

// Show all repositories
<RepositoryList />

// Show only featured repositories
<RepositoryList showFeaturedOnly={true} />
```

**Props:**
- `showFeaturedOnly?: boolean` - Show only featured repos (default: false)
- `fallbackData?: GitHubRepository[]` - Optional fallback data to display if API fails

## Data Fetching

All components use SWR for data fetching with the following configuration:
- 24-hour cache duration
- Automatic localStorage caching for offline support
- Graceful error handling with cached data fallback
- No revalidation on focus (to reduce API calls)

## Error Handling

Components implement comprehensive error handling:
1. **API Errors**: Display user-friendly error messages
2. **Rate Limiting**: Automatic retry with exponential backoff
3. **Network Failures**: Fall back to cached data when available
4. **Missing Data**: Show appropriate empty states

## Caching Strategy

The GitHub service implements a multi-layer caching strategy:
1. **SWR Cache**: In-memory cache for the current session
2. **localStorage Cache**: Persistent cache across sessions (24-hour TTL)
3. **Fallback Data**: Components accept fallback data as props

## Configuration

Configure GitHub integration in `src/config/site.ts`:

```typescript
github: {
  username: 'your-github-username',
  featured_repos: ['repo1', 'repo2'],
  exclude_repos: ['private-repo'],
}
```

Optionally set a GitHub token as an environment variable to increase rate limits:
```
NEXT_PUBLIC_GITHUB_TOKEN=your_token_here
```
