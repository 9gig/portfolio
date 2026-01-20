/**
 * Loading Indicator Components
 * 
 * Modern loading indicators with gradient effects and animations.
 * Provides visual feedback for async operations.
 * 
 * Requirements: 13.1, 13.4
 */

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LoadingIndicatorProps {
  visible?: boolean;
  delay?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'dots' | 'pulse' | 'gradient';
}

/**
 * Modern loading indicator with multiple variants
 */
export function LoadingIndicator({
  visible = true,
  delay = 100,
  className,
  size = 'md',
  variant = 'gradient',
}: LoadingIndicatorProps) {
  const [shouldShow, setShouldShow] = useState(false);

  // Delay showing the indicator to avoid flash for quick operations
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => setShouldShow(true), delay);
      return () => clearTimeout(timer);
    } else {
      setShouldShow(false);
    }
  }, [visible, delay]);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn('flex items-center justify-center', className)}
          role="status"
          aria-live="polite"
          aria-label="Loading"
        >
          {variant === 'spinner' && (
            <div
              className={cn(
                'animate-spin rounded-full border-2 border-gray-700 border-t-purple-500',
                sizeClasses[size]
              )}
            />
          )}

          {variant === 'dots' && (
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className={cn(
                    'rounded-full bg-gradient-to-r from-purple-500 to-pink-500',
                    size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
                  )}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          )}

          {variant === 'pulse' && (
            <motion.div
              className={cn(
                'rounded-full bg-gradient-to-r from-purple-500 to-pink-500',
                sizeClasses[size]
              )}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            />
          )}

          {variant === 'gradient' && (
            <div className={cn('relative', sizeClasses[size])}>
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                style={{
                  background: 'conic-gradient(from 0deg, #667eea, #764ba2, #667eea)',
                }}
              />
              <div className="absolute inset-1 rounded-full bg-slate-900" />
            </div>
          )}

          <span className="sr-only">Loading...</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Inline loading indicator for buttons
 */
interface ButtonLoadingProps {
  loading: boolean;
  children: React.ReactNode;
  loadingText?: string;
}

export function ButtonLoading({
  loading,
  children,
  loadingText = 'Loading...',
}: ButtonLoadingProps) {
  return (
    <span className="flex items-center justify-center gap-2">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <LoadingIndicator size="sm" variant="spinner" delay={0} />
            {loadingText}
          </motion.span>
        ) : (
          <motion.span
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/**
 * Progress bar loading indicator
 */
interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
}

export function ProgressBar({
  progress,
  className,
  showPercentage = false,
}: ProgressBarProps) {
  return (
    <div className={cn('w-full', className)}>
      {showPercentage && (
        <div className="flex justify-between mb-2 text-sm text-gray-400">
          <span>Loading</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

/**
 * Full page loading overlay
 */
interface LoadingOverlayProps {
  visible: boolean;
  message?: string;
}

export function LoadingOverlay({ visible, message }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm"
        >
          <div className="text-center">
            <LoadingIndicator size="lg" variant="gradient" delay={0} />
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-4 text-gray-300"
              >
                {message}
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
