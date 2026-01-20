'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  disableAnimation?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', disableAnimation = false, ...props }, ref) => {
    const buttonClasses = cn(
      // Base styles with touch target compliance (min 44x44px - Requirement 7.5)
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
      // Ensure minimum touch target size
      'min-h-[44px] min-w-[44px]',
      {
        'bg-primary text-primary-foreground hover:bg-primary/90':
          variant === 'default',
        'border border-input hover:bg-accent hover:text-accent-foreground':
          variant === 'outline',
        'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
      },
      {
        'h-11 py-2 px-4': size === 'default', // 44px height
        'h-11 px-3 rounded-md': size === 'sm', // Still 44px for touch
        'h-12 px-8 rounded-md': size === 'lg', // 48px height
      },
      className
    );

    if (disableAnimation) {
      return (
        <button
          className={buttonClasses}
          ref={ref}
          {...props}
        />
      );
    }

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className={buttonClasses}
        ref={ref}
        {...(props as any)}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };