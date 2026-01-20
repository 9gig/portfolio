'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { handleSmoothScroll } from '@/lib/smooth-scroll';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavigationItem[];
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

export function MobileNav({ isOpen, onClose, items }: MobileNavProps) {
  const firstLinkRef = React.useRef<HTMLAnchorElement>(null);
  const lastLinkRef = React.useRef<HTMLAnchorElement>(null);

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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile menu */}
      <nav
        id="mobile-navigation"
        className="fixed top-14 left-0 right-0 bottom-0 z-50 flex flex-col bg-background p-6 shadow-lg md:hidden"
        aria-label="Mobile navigation"
        role="navigation"
      >
        <div className="flex flex-col space-y-4">
          {items.map((item, index) => (
            <a
              key={item.id}
              ref={index === 0 ? firstLinkRef : index === items.length - 1 ? lastLinkRef : null}
              href={item.href}
              onClick={handleNavClick}
              className="text-lg font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-3 py-2"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
