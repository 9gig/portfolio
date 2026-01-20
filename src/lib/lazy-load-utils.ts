/**
 * Lazy Loading Utilities
 * 
 * Utilities for lazy loading animations and heavy components
 * to optimize performance and reduce initial bundle size.
 * 
 * Requirements: 15.2
 */

import { useEffect, useState } from 'react';

/**
 * Hook to detect if an element is below the fold
 * Used to determine if animations should be lazy loaded
 */
export function useIsBelowFold(threshold = 800): boolean {
  const [isBelowFold, setIsBelowFold] = useState(false);

  useEffect(() => {
    // Check if we're below the fold on mount
    const checkPosition = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      setIsBelowFold(scrollPosition < threshold);
    };

    checkPosition();
    window.addEventListener('scroll', checkPosition, { passive: true });
    window.addEventListener('resize', checkPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
    };
  }, [threshold]);

  return isBelowFold;
}

/**
 * Hook to lazy load Framer Motion only when needed
 * Reduces initial bundle size by deferring animation library loading
 */
export function useLazyMotion() {
  const [motionLoaded, setMotionLoaded] = useState(false);

  useEffect(() => {
    // Only load motion if not already loaded
    if (!motionLoaded) {
      import('framer-motion').then(() => {
        setMotionLoaded(true);
      });
    }
  }, [motionLoaded]);

  return motionLoaded;
}

/**
 * Preload a component module
 * Useful for preloading below-the-fold components on idle
 */
export function preloadComponent(importFn: () => Promise<any>) {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    requestIdleCallback(() => {
      importFn();
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      importFn();
    }, 1);
  }
}

/**
 * Check if the device is low-end based on hardware concurrency
 * Used to reduce animation complexity on low-end devices
 */
export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check hardware concurrency (number of CPU cores)
  const cores = navigator.hardwareConcurrency || 4;
  
  // Check device memory (if available)
  const memory = (navigator as any).deviceMemory;
  
  // Consider device low-end if:
  // - Less than 4 CPU cores
  // - Less than 4GB RAM (if available)
  return cores < 4 || (memory && memory < 4);
}

/**
 * Check if animations should be reduced based on device capabilities
 */
export function shouldReduceAnimations(): boolean {
  if (typeof window === 'undefined') return false;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check if device is low-end
  const lowEndDevice = isLowEndDevice();
  
  return prefersReducedMotion || lowEndDevice;
}

/**
 * Optimize animation configuration based on device capabilities
 */
export function getOptimizedAnimationConfig() {
  const shouldReduce = shouldReduceAnimations();
  
  return {
    // Reduce animation duration on low-end devices
    duration: shouldReduce ? 0.2 : 0.5,
    // Simplify easing on low-end devices
    ease: shouldReduce ? 'linear' : [0.0, 0.0, 0.2, 1],
    // Disable spring animations on low-end devices
    type: shouldReduce ? 'tween' : 'spring',
    // Reduce stagger delay
    staggerChildren: shouldReduce ? 0.05 : 0.1,
  };
}
