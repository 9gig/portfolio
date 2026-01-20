/**
 * GradientButton Component
 * 
 * A modern button component with gradient backgrounds, hover effects,
 * scale animations, and shadow effects. Supports different sizes and variants.
 * 
 * Requirements: 8.1, 8.2
 */

'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { gradients, type GradientKey, animations } from '@/styles/design-tokens';

export interface GradientButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  children: React.ReactNode;
  className?: string;
  variant?: 'filled' | 'outline' | 'ghost';
  gradient?: GradientKey;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  href?: string;
  disableAnimation?: boolean;
  fullWidth?: boolean;
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm min-h-[44px]',
  md: 'px-6 py-3 text-base min-h-[44px]',
  lg: 'px-8 py-4 text-lg min-h-[48px]',
  xl: 'px-10 py-5 text-xl min-h-[52px]',
} as const;

export function GradientButton({
  children,
  className,
  variant = 'filled',
  gradient = 'primary',
  size = 'md',
  href,
  disableAnimation = false,
  fullWidth = false,
  ...props
}: GradientButtonProps) {
  const gradientStyle = gradients[gradient];
  const sizeClass = sizeClasses[size];

  const baseClasses = cn(
    'inline-flex items-center justify-center',
    'rounded-lg font-medium',
    'transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    'min-w-[44px]', // Ensure minimum touch target
    sizeClass,
    fullWidth && 'w-full',
    className
  );

  const variantClasses = {
    filled: cn(
      'text-white shadow-lg',
      'hover:shadow-xl hover:shadow-purple-500/50'
    ),
    outline: cn(
      'bg-transparent border-2',
      'hover:bg-white/5'
    ),
    ghost: cn(
      'bg-transparent',
      'hover:bg-white/10'
    ),
  };

  const buttonContent = (
    <motion.button
      className={cn(baseClasses, variantClasses[variant])}
      style={
        variant === 'filled'
          ? { background: gradientStyle }
          : variant === 'outline'
          ? {
              borderImage: `${gradientStyle} 1`,
              backgroundImage: gradientStyle,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }
          : {
              backgroundImage: gradientStyle,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }
      }
      whileHover={
        !disableAnimation
          ? {
              scale: 1.05,
              boxShadow:
                variant === 'filled'
                  ? '0 20px 40px rgba(102, 126, 234, 0.4)'
                  : undefined,
            }
          : undefined
      }
      whileTap={!disableAnimation ? { scale: 0.95 } : undefined}
      transition={{
        duration: animations.durations.fast / 1000,
        ease: animations.easings.easeOut,
      }}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );

  // If href is provided, wrap in Link
  if (href) {
    return (
      <Link href={href} className="inline-block">
        {buttonContent}
      </Link>
    );
  }

  return buttonContent;
}

/**
 * GradientButtonGroup - Group multiple gradient buttons
 */
export interface GradientButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'sm' | 'md' | 'lg';
}

const spacingClasses = {
  horizontal: {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  },
  vertical: {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  },
};

export function GradientButtonGroup({
  children,
  className,
  orientation = 'horizontal',
  spacing = 'md',
}: GradientButtonGroupProps) {
  return (
    <div
      className={cn(
        'flex',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        spacingClasses[orientation][spacing],
        className
      )}
    >
      {children}
    </div>
  );
}
