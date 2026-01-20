/**
 * AnimatedText Component
 * 
 * Text component with staggered word animations and gradient effects.
 * Each word animates in sequence for a dynamic entrance effect.
 * 
 * Requirements: 1.2, 1.3
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { gradients, type GradientKey, animations } from '@/styles/design-tokens';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export interface AnimatedTextProps {
  text: string;
  className?: string;
  gradient?: GradientKey;
  delay?: number;
  staggerDelay?: number;
}

export function AnimatedText({
  text,
  className,
  gradient,
  delay = 0,
  staggerDelay = 0.1,
}: AnimatedTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(' ');

  // Gradient text styles
  const gradientStyle = gradient
    ? {
        backgroundImage: gradients[gradient],
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }
    : {};

  return (
    <h1 className={cn('overflow-hidden', className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={
            prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { y: 100, opacity: 0 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : { y: 0, opacity: 1 }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  delay: delay + i * staggerDelay,
                  duration: animations.durations.slow / 1000,
                  ease: animations.easings.easeOut,
                }
          }
          className="inline-block mr-3 last:mr-0"
          style={gradientStyle}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}

/**
 * AnimatedTextLine Component
 * 
 * Similar to AnimatedText but animates character by character for a typewriter effect.
 */
export interface AnimatedTextLineProps {
  text: string;
  className?: string;
  gradient?: GradientKey;
  delay?: number;
  charDelay?: number;
}

export function AnimatedTextLine({
  text,
  className,
  gradient,
  delay = 0,
  charDelay = 0.03,
}: AnimatedTextLineProps) {
  const prefersReducedMotion = useReducedMotion();
  const characters = text.split('');

  // Gradient text styles
  const gradientStyle = gradient
    ? {
        backgroundImage: gradients[gradient],
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        color: 'transparent',
      }
    : {};

  return (
    <span className={cn('inline-block', className)}>
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 0 }
          }
          animate={{ opacity: 1 }}
          transition={
            prefersReducedMotion
              ? {}
              : {
                  delay: delay + i * charDelay,
                  duration: 0.1,
                }
          }
          className="inline-block"
          style={gradientStyle}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
