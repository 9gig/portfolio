'use client';

import * as React from 'react';
import { NavigationItem } from '@/components/layout/mobile-nav';
import { Navbar } from '@/components/navigation/navbar';
import { MobileMenu } from '@/components/navigation/mobile-menu';
import { siteConfig } from '@/config/site';

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
    <>
      <Navbar
        items={navigationItems}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        mobileMenuOpen={mobileMenuOpen}
      />
      
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={navigationItems}
      />
    </>
  );
}