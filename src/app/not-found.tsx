import Link from 'next/link';
import { Button } from '@/components/ui/button';

/**
 * 404 Not Found page
 * Displayed when a user navigates to a non-existent route
 */
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6">
          <h1 className="text-9xl font-bold text-primary">404</h1>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-gray-100">
          Page Not Found
        </h2>

        <p className="mb-6 text-gray-600 dark:text-gray-400">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button size="lg">Go Home</Button>
          </Link>
          <Link href="#contact">
            <Button variant="outline" size="lg">
              Contact Me
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
