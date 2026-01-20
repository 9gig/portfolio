'use client';

import * as React from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { MobileNav, NavigationItem } from '@/components/layout/mobile-nav';
import { siteConfig } from '@/config/site';
import { Button } from '@/components/ui/button';
import { handleSmoothScroll } from '@/lib/smooth-scroll';

// Build navigation items based on feature flags
const getNavigationItems = (): NavigationItem[] => {
  const items: NavigationItem[] = [
    { id: 'about', label: 'About', href: '#about' },
  ];

  if (siteConfig.features.showProjects) {
    items.push({ id: 'projects', label: 'Projects', href: '#projects' });
  }

  if (siteConfig.features.showSkills) {
    items.push({ id: 'skills', label: 'Skills', href: '#skills' });
  }

  if (siteConfig.features.showExperience) {
    items.push({ id: 'experience', label: 'Experience', href: '#experience' });
  }

  if (siteConfig.features.showContact) {
    items.push({ id: 'contact', label: 'Contact', href: '#contact' });
  }

  return items;
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigationItems = getNavigationItems();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4">
        <div className="mr-4 flex">
          <a 
            className="mr-6 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md" 
            href="/"
            aria-label="Home"
          >
            <span className="font-bold text-lg">{siteConfig.author.name}</span>
          </a>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <a
                key={item.id}
                className="text-sm font-medium transition-colors hover:text-primary focus:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md px-2 py-1"
                href={item.href}
                onClick={handleSmoothScroll}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={navigationItems}
      />
    </header>
  );
}