import useSWR from 'swr';
import { GitHubService } from '@/services/github';
import { siteConfig } from '@/config/site';
import { GitHubProfile, GitHubRepository } from '@/types';

const githubService = new GitHubService(
  siteConfig.github.username,
  process.env.NEXT_PUBLIC_GITHUB_TOKEN
);

// Cache keys
const CACHE_KEYS = {
  PROFILE: 'github-profile-cache',
  REPOSITORIES: 'github-repositories-cache',
  FEATURED: 'github-featured-cache',
};

// Helper to get cached data from localStorage
function getCachedData<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    const age = Date.now() - timestamp;
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (age < maxAge) {
      return data as T;
    }
    
    // Clear expired cache
    localStorage.removeItem(key);
    return null;
  } catch {
    return null;
  }
}

// Helper to set cached data in localStorage
function setCachedData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.warn('Failed to cache data:', error);
  }
}

export function useGitHubProfile() {
  return useSWR<GitHubProfile>(
    'github-profile',
    async () => {
      try {
        const profile = await githubService.getProfile();
        setCachedData(CACHE_KEYS.PROFILE, profile);
        return profile;
      } catch (error) {
        // Try to return cached data on error
        const cached = getCachedData<GitHubProfile>(CACHE_KEYS.PROFILE);
        if (cached) {
          console.warn('Using cached profile data due to API error');
          return cached;
        }
        throw error;
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 24 * 60 * 60 * 1000, // 24 hours
      fallbackData: getCachedData<GitHubProfile>(CACHE_KEYS.PROFILE) || undefined,
      shouldRetryOnError: false,
    }
  );
}

export function useGitHubRepositories() {
  return useSWR<GitHubRepository[]>(
    'github-repositories',
    async () => {
      try {
        const repos = await githubService.getRepositories({ sort: 'updated', direction: 'desc' });
        setCachedData(CACHE_KEYS.REPOSITORIES, repos);
        return repos;
      } catch (error) {
        // Try to return cached data on error
        const cached = getCachedData<GitHubRepository[]>(CACHE_KEYS.REPOSITORIES);
        if (cached) {
          console.warn('Using cached repositories data due to API error');
          return cached;
        }
        throw error;
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 24 * 60 * 60 * 1000, // 24 hours
      fallbackData: getCachedData<GitHubRepository[]>(CACHE_KEYS.REPOSITORIES) || undefined,
      shouldRetryOnError: false,
    }
  );
}

export function useFeaturedRepositories() {
  return useSWR<GitHubRepository[]>(
    'featured-repositories',
    async () => {
      try {
        const repos = await githubService.getFeaturedRepositories(siteConfig.github.featured_repos);
        setCachedData(CACHE_KEYS.FEATURED, repos);
        return repos;
      } catch (error) {
        // Try to return cached data on error
        const cached = getCachedData<GitHubRepository[]>(CACHE_KEYS.FEATURED);
        if (cached) {
          console.warn('Using cached featured repositories data due to API error');
          return cached;
        }
        throw error;
      }
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 24 * 60 * 60 * 1000, // 24 hours
      fallbackData: getCachedData<GitHubRepository[]>(CACHE_KEYS.FEATURED) || undefined,
      shouldRetryOnError: false,
    }
  );
}
