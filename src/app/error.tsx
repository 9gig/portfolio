'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Global error boundary for the application
 * Catches errors that occur during rendering, in lifecycle methods, and in constructors
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error);
    }

    // In production, you would log to an error tracking service here
    // Example: logErrorToService(error);
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Something went wrong
        </h1>

        <p className="mb-6 text-gray-600 dark:text-gray-400">
          We encountered an unexpected error. Please try again.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <details className="mb-6 rounded-lg bg-red-50 dark:bg-red-900/20 p-4 text-left">
            <summary className="cursor-pointer font-semibold text-red-900 dark:text-red-200">
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 overflow-auto text-xs text-red-800 dark:text-red-300">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset} size="lg">
            Try Again
          </Button>
          <Button
            onClick={() => (window.location.href = '/')}
            variant="outline"
            size="lg"
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}
