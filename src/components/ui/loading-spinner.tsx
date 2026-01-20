import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

/**
 * Loading spinner component for async operations
 * Provides visual feedback while content is loading
 */
export function LoadingSpinner({
  size = 'md',
  className,
  label = 'Loading...',
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };

  return (
    <div className="flex items-center justify-center" role="status" aria-live="polite">
      <div
        className={cn(
          'animate-spin rounded-full border-gray-300 border-t-primary dark:border-gray-600 dark:border-t-primary',
          sizeClasses[size],
          className
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

/**
 * Section loading skeleton for content sections
 */
export function SectionLoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-48 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-4/6 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

/**
 * Card loading skeleton for project/repository cards
 */
export function CardLoadingSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-4 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
      <div className="mb-4 space-y-2">
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-16 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-6 w-16 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-6 w-16 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

/**
 * Full page loading component
 */
export function PageLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Loading content...
        </p>
      </div>
    </div>
  );
}
