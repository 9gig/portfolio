'use client';

import { GitHubRepository } from '@/types';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface RepositoryCardProps {
  repository: GitHubRepository;
  featured?: boolean;
}

export function RepositoryCard({ repository, featured = false }: RepositoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Link
        href={repository.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group block rounded-lg border p-4 transition-all hover:shadow-md ${
          featured
            ? 'border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950'
            : 'border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900'
        }`}
        data-featured={featured}
      >
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {repository.name}
          </h3>
          
          {featured && (
            <span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white dark:bg-blue-500">
              Featured
            </span>
          )}
        </div>

        {repository.description && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {repository.description}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
          {repository.language && (
            <div className="flex items-center gap-1">
              <span className="h-3 w-3 rounded-full bg-blue-500" />
              <span>{repository.language}</span>
            </div>
          )}

          <div className="flex items-center gap-1" data-testid="stars">
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{repository.stargazers_count}</span>
          </div>

          <div className="flex items-center gap-1" data-testid="forks">
            <svg
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>{repository.forks_count}</span>
          </div>
        </div>

        {repository.topics && repository.topics.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {repository.topics.slice(0, 5).map((topic) => (
              <span
                key={topic}
                className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </Link>
    </motion.div>
  );
}
