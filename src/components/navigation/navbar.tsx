'use client';

import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { siteConfig } from '@/config/site';
import { handleSmoothScroll } from '@/lib/smooth-scroll';
import { NavigationItem } from '@/components/layout/mobile-nav';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface NavbarProps {
  items: NavigationItem[];
  onMobileMenuToggle: () => void;
  mobileMenuOpen: boolean;
}

export function Navbar({ items, onMobileMenuToggle, mobileMenuOpen }: NavbarProps) {
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('');
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  
  // Transform scroll position to opacity
  const navOpacity = useTransform(scrollY, [0, 50], [0.6, 0.95]);
  const navBlur = useTransform(scrollY, [0, 50], [8, 16]);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section based on scroll position
  React.useEffect(() => {
    const handleScrollSpy = () => {
      const sections = items.map(item => {
        const id = item.href.replace('#', '');
        return document.getElementById(id);
      }).filter(Boolean);

      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(`#${section.id}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    handleScrollSpy(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [items]);

  return (
    <motion.nav
      initial={prefersReducedMotion ? {} : { y: -100 }}
      animate={prefersReducedMotion ? {} : { y: 0 }}
      transition={prefersReducedMotion ? {} : { duration: 0.5, ease: [0.0, 0.0, 0.2, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'backdrop-blur-md bg-slate-900/80 dark:bg-slate-900/90 shadow-lg border-b border-white/10' 
          : 'bg-transparent'
      )}
      style={{
        backdropFilter: scrolled ? `blur(${navBlur.get()}px)` : 'none',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a
            href="/"
            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            className={cn(
              'text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500',
              'bg-clip-text text-transparent',
              'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
              'rounded-md px-2 py-1'
            )}
            aria-label="Home"
          >
            {siteConfig.author.name.split(' ').map(n => n[0]).join('')}
          </motion.a>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-8">
            {items.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                active={activeSection === link.href}
                prefersReducedMotion={prefersReducedMotion}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          
          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={onMobileMenuToggle}
              className={cn(
                'md:hidden p-2 rounded-lg',
                'focus:outline-none focus:ring-2 focus:ring-purple-500',
                'transition-colors hover:bg-white/10'
              )}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
  prefersReducedMotion: boolean;
}

function NavLink({ href, active, children, prefersReducedMotion }: NavLinkProps) {
  return (
    <motion.a
      href={href}
      onClick={handleSmoothScroll}
      className={cn(
        'relative text-sm font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2',
        'rounded-md px-3 py-2',
        active 
          ? 'text-white' 
          : 'text-gray-300 hover:text-white'
      )}
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
    >
      {children}
      
      {/* Animated underline */}
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        whileHover={prefersReducedMotion ? {} : { scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ originX: 0 }}
      />
    </motion.a>
  );
}
