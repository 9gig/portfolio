/**
 * Animated Image Component
 * 
 * Image component with fade-in animation on load.
 * Provides smooth loading experience with placeholder.
 * 
 * Requirements: 13.2
 */

'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedImageProps extends Omit<ImageProps, 'onLoad'> {
  showPlaceholder?: boolean;
  placeholderClassName?: string;
  animationDuration?: number;
}

/**
 * Image component with fade-in animation
 */
export function AnimatedImage({
  showPlaceholder = true,
  placeholderClassName,
  animationDuration = 0.5,
  className,
  alt,
  ...props
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Placeholder shimmer effect */}
        {showPlaceholder && !isLoaded && !hasError && (
          <motion.div
            key="placeholder"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: animationDuration }}
            className={cn(
              'absolute inset-0 bg-gray-800/50',
              placeholderClassName
            )}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/30 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.div>
        )}

        {/* Error state */}
        {hasError && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-800/50"
          >
            <div className="text-center text-gray-400">
              <svg
                className="w-12 h-12 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-sm">Failed to load image</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual image with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: animationDuration }}
      >
        <Image
          {...props}
          alt={alt}
          className={cn(className)}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setHasError(true);
            setIsLoaded(false);
          }}
        />
      </motion.div>
    </div>
  );
}

/**
 * Background image with fade-in animation
 */
interface AnimatedBackgroundImageProps {
  src: string;
  alt: string;
  className?: string;
  overlayClassName?: string;
  showOverlay?: boolean;
}

export function AnimatedBackgroundImage({
  src,
  alt,
  className,
  overlayClassName,
  showOverlay = true,
}: AnimatedBackgroundImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Placeholder */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="bg-placeholder"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gray-800/50"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-700/30 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>

      {/* Gradient overlay */}
      {showOverlay && (
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60',
            overlayClassName
          )}
        />
      )}
    </div>
  );
}
