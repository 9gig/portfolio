'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { trackCVDownload } from '@/lib/analytics';

interface CVDownloadButtonProps {
  filename: string;
  path: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

/**
 * CV Download Button Component
 * 
 * Provides a button to download the developer's CV/resume with:
 * - Error handling for missing files
 * - Analytics tracking
 * - Loading states
 * - Accessible markup
 * 
 * @param filename - The display name of the CV file
 * @param path - The path to the CV file in the public directory
 * @param variant - Button style variant
 * @param size - Button size
 * @param className - Additional CSS classes
 */
export function CVDownloadButton({
  filename,
  path,
  variant = 'default',
  size = 'default',
  className,
}: CVDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setError(null);

      // Check if file exists by attempting to fetch it
      const response = await fetch(path, { method: 'HEAD' });

      if (!response.ok) {
        throw new Error('CV file not found');
      }

      // Track the download event
      trackCVDownload(filename);

      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = path;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('CV download error:', err);
      setError(
        'Unable to download CV. The file may not be available. Please try again later or contact me directly.'
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleDownload}
        disabled={isDownloading}
        variant={variant}
        size={size}
        className={className}
        aria-label={`Download ${filename}`}
      >
        {isDownloading ? (
          <>
            <svg
              className="mr-2 h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Downloading...
          </>
        ) : (
          <>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download CV
          </>
        )}
      </Button>

      {error && (
        <div
          className="text-sm text-destructive"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
    </div>
  );
}
