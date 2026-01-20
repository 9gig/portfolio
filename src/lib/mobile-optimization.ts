/**
 * Mobile Optimization Utilities
 * 
 * Utilities for optimizing animations and effects on mobile devices.
 * Reduces complexity and improves performance on mobile.
 * 
 * Requirements: 14.2, 14.3, 15.5
 */

import { useEffect, useState } from 'react';

/**
 * Detect if the user is on a mobile device
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check on mount
    checkMobile();

    // Listen for resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Detect if the user is on a touch device
 */
export function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    );
  }, []);

  return isTouch;
}

/**
 * Get optimized animation configuration for mobile
 */
export function getMobileAnimationConfig(isMobile: boolean) {
  if (!isMobile) {
    return {
      duration: 0.5,
      ease: [0.0, 0.0, 0.2, 1],
      type: 'spring',
      stiffness: 300,
      damping: 30,
    };
  }

  // Simplified animations for mobile
  return {
    duration: 0.3,
    ease: 'easeOut',
    type: 'tween',
  };
}

/**
 * Get optimized glassmorphism styles for mobile
 */
export function getMobileGlassmorphismStyles(isMobile: boolean) {
  if (!isMobile) {
    return {
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      background: 'rgba(17, 25, 40, 0.75)',
    };
  }

  // Simplified glassmorphism for mobile (less blur)
  return {
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    background: 'rgba(17, 25, 40, 0.85)',
  };
}

/**
 * Check if parallax should be disabled
 */
export function shouldDisableParallax(): boolean {
  if (typeof window === 'undefined') return true;

  // Disable on mobile devices
  const isMobile = window.innerWidth < 768;
  
  // Disable on touch devices
  const isTouch = 'ontouchstart' in window;
  
  // Disable on low-end devices
  const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false;

  return isMobile || isTouch || isLowEnd;
}

/**
 * Hook to disable parallax on mobile
 */
export function useDisableParallax(): boolean {
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(shouldDisableParallax());

    const handleResize = () => {
      setDisabled(shouldDisableParallax());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return disabled;
}

/**
 * Get optimized stagger delay for mobile
 */
export function getMobileStaggerDelay(isMobile: boolean, baseDelay = 0.1): number {
  return isMobile ? baseDelay * 0.5 : baseDelay;
}

/**
 * Check if complex animations should be disabled
 */
export function shouldSimplifyAnimations(): boolean {
  if (typeof window === 'undefined') return true;

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Check if mobile
  const isMobile = window.innerWidth < 768;
  
  // Check if low-end device
  const isLowEnd = navigator.hardwareConcurrency ? navigator.hardwareConcurrency < 4 : false;

  return prefersReducedMotion || (isMobile && isLowEnd);
}

/**
 * Hook to simplify animations on mobile
 */
export function useSimplifyAnimations(): boolean {
  const [simplify, setSimplify] = useState(false);

  useEffect(() => {
    setSimplify(shouldSimplifyAnimations());

    const handleResize = () => {
      setSimplify(shouldSimplifyAnimations());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return simplify;
}

/**
 * Get optimized gradient configuration for mobile
 */
export function getMobileGradientConfig(isMobile: boolean) {
  if (!isMobile) {
    return {
      animate: true,
      complexity: 'high',
      steps: 100,
    };
  }

  // Simplified gradients for mobile
  return {
    animate: false,
    complexity: 'low',
    steps: 50,
  };
}

/**
 * Optimize image quality for mobile
 */
export function getMobileImageQuality(isMobile: boolean): number {
  return isMobile ? 75 : 90;
}

/**
 * Get optimized blur amount for mobile
 */
export function getMobileBlurAmount(isMobile: boolean, baseBlur = 16): number {
  return isMobile ? Math.max(baseBlur / 2, 8) : baseBlur;
}

/**
 * Check if device supports backdrop-filter
 */
export function supportsBackdropFilter(): boolean {
  if (typeof window === 'undefined') return false;
  
  return CSS.supports('backdrop-filter', 'blur(1px)') || 
         CSS.supports('-webkit-backdrop-filter', 'blur(1px)');
}

/**
 * Get fallback styles if backdrop-filter is not supported
 */
export function getBackdropFilterFallback() {
  if (supportsBackdropFilter()) {
    return {};
  }

  // Fallback to solid background
  return {
    background: 'rgba(17, 25, 40, 0.95)',
  };
}
