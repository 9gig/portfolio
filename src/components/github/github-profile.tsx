'use client';

import { useGitHubProfile } from '@/hooks/use-github';
import { GitHubProfile } from '@/types';
import Image from 'next/image';

interface GitHubProfileCardProps {
  fallbackData?: GitHubProfile;
}

export function GitHubProfileCard({ fallbackData }: GitHubProfileCardProps) {
  const { data: profile, error, isLoading } = useGitHubProfile();

  // Use fallback data if API fails
  const displayProfile = profile || fallbackData;

  if (error && !fallbackData) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
        <p className="text-sm text-red-800 dark:text-red-200">
          Unable to load GitHub profile. Please try again later.
        </p>
      </div>
    );
  }

  if (isLoading && !displayProfile) {
    return (
      <div className="animate-pulse rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 rounded bg-gray-300 dark:bg-gray-700" />
            <div className="h-3 w-48 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>
      </div>
    );
  }

  if (!displayProfile) {
    return null;
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full">
          <Image
            src={displayProfile.avatar_url}
            alt={`${displayProfile.name || displayProfile.login}'s avatar`}
            fill
            className="object-cover"
            onError={(e) => {
              e.currentTarget.src = '/placeholder-avatar.jpg';
            }}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {displayProfile.name || displayProfile.login}
          </h3>
          
          {displayProfile.bio && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {displayProfile.bio}
            </p>
          )}
          
          <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <span className="font-medium">{displayProfile.public_repos}</span>
              <span>repositories</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{displayProfile.followers}</span>
              <span>followers</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-medium">{displayProfile.following}</span>
              <span>following</span>
            </div>
          </div>
        </div>
      </div>
      
      {error && fallbackData && (
        <div className="mt-3 text-xs text-amber-600 dark:text-amber-400">
          Showing cached data (unable to fetch latest)
        </div>
      )}
    </div>
  );
}
