'use client';

import { useGitHubRepositories, useFeaturedRepositories } from '@/hooks/use-github';
import { GitHubRepository } from '@/types';
import { RepositoryCard } from './repository-card';

interface RepositoryListProps {
  showFeaturedOnly?: boolean;
  fallbackData?: GitHubRepository[];
}

export function RepositoryList({ showFeaturedOnly = false, fallbackData }: RepositoryListProps) {
  const { data: allRepos, error: allError, isLoading: allLoading } = useGitHubRepositories();
  const { data: featuredRepos, error: featuredError, isLoading: featuredLoading } = useFeaturedRepositories();

  const isLoading = showFeaturedOnly ? featuredLoading : allLoading;
  const error = showFeaturedOnly ? featuredError : allError;
  const repositories = showFeaturedOnly ? featuredRepos : allRepos;

  // Use fallback data if API fails
  const displayRepos = repositories || fallbackData;

  if (error && !fallbackData) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
        <p className="text-sm text-red-800 dark:text-red-200">
          Unable to load repositories. Please try again later.
        </p>
      </div>
    );
  }

  if (isLoading && !displayRepos) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="h-5 w-3/4 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="mt-2 h-4 w-full rounded bg-gray-300 dark:bg-gray-700" />
            <div className="mt-1 h-4 w-5/6 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="mt-4 flex gap-4">
              <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-700" />
              <div className="h-4 w-16 rounded bg-gray-300 dark:bg-gray-700" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!displayRepos || displayRepos.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-800 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400">
          No repositories found.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {displayRepos.map((repo) => (
          <RepositoryCard
            key={repo.id}
            repository={repo}
            featured={showFeaturedOnly}
          />
        ))}
      </div>
      
      {error && fallbackData && (
        <div className="mt-4 text-center text-xs text-amber-600 dark:text-amber-400">
          Showing cached data (unable to fetch latest)
        </div>
      )}
    </div>
  );
}
