/**
 * HeroBackground Component
 * 
 * Animated gradient background with parallax effects for the hero section.
 * Includes floating gradient orbs and subtle motion effects.
 * 
 * Requirements: 1.6, 12.1, 12.2
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useDisableParallax } from '@/lib/mobile-optimization';
import { gradients } from '@/styles/design-tokens';

export function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();
  const disableParallax = useDisableParallax();

  // Disable parallax on mobile and when reduced motion is preferred
  const shouldAnimate = !prefersReducedMotion && !disableParallax;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.3) 0%, transparent 50%)',
        }}
      />

      {/* Animated gradient orbs */}
      {shouldAnimate ? (
        <>
          {/* Orb 1 - Purple */}
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background: gradients.primary,
              top: '10%',
              left: '10%',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Orb 2 - Pink */}
          <motion.div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background: gradients.secondary,
              top: '60%',
              right: '10%',
            }}
            animate={{
              x: [0, -30, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Orb 3 - Accent */}
          <motion.div
            className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
            style={{
              background: gradients.accent,
              bottom: '10%',
              left: '30%',
            }}
            animate={{
              x: [0, 40, 0],
              y: [0, -40, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </>
      ) : (
        // Static orbs for reduced motion
        <>
          <div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background: gradients.primary,
              top: '10%',
              left: '10%',
            }}
          />
          <div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{
              background: gradients.secondary,
              top: '60%',
              right: '10%',
            }}
          />
          <div
            className="absolute w-80 h-80 rounded-full blur-3xl opacity-15"
            style={{
              background: gradients.accent,
              bottom: '10%',
              left: '30%',
            }}
          />
        </>
      )}

      {/* Gradient overlay for depth */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.8) 100%)',
        }}
      />
    </div>
  );
}
