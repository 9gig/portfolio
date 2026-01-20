'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { handleSmoothScroll } from '@/lib/smooth-scroll';
import { NavigationItem } from '@/components/layout/mobile-nav';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavigationItem[];
}

export function MobileMenu({ isOpen, onClose, items }: MobileMenuProps) {
  const firstLinkRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    // Prevent body scroll when menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus first link when menu opens
      setTimeout(() => firstLinkRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle keyboard navigation
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleSmoothScroll(e);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with fade animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Mobile menu drawer with slide-in animation */}
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            id="mobile-navigation"
            className={cn(
              'fixed top-16 right-0 bottom-0 z-50 w-[80%] max-w-sm',
              'flex flex-col p-6 md:hidden',
              'bg-slate-900/95 backdrop-blur-md',
              'border-l border-white/10 shadow-2xl'
            )}
            aria-label="Mobile navigation"
            role="navigation"
          >
            {/* Menu items with stagger animation */}
            <div className="flex flex-col space-y-2">
              {items.map((item, index) => (
                <motion.a
                  key={item.id}
                  ref={index === 0 ? firstLinkRef : null}
                  href={item.href}
                  onClick={handleNavClick}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.3,
                  }}
                  className={cn(
                    'relative group px-4 py-3 rounded-lg',
                    'text-lg font-medium text-gray-300',
                    'transition-all duration-300',
                    'hover:text-white hover:bg-white/5',
                    'focus:outline-none focus:ring-2 focus:ring-purple-500',
                    'focus:text-white'
                  )}
                >
                  {/* Gradient border on hover */}
                  <span className="relative z-10">{item.label}</span>
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Animated indicator */}
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-full"
                    whileHover={{ height: '60%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              ))}
            </div>

            {/* Decorative gradient at bottom */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: items.length * 0.1 + 0.2 }}
              className="mt-auto pt-6"
            >
              <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full" />
            </motion.div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
