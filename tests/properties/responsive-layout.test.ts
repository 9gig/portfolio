/**
 * Feature: developer-portfolio, Property 12: Responsive Layout Adaptation
 * Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5
 * 
 * Property: For any viewport size change (including device rotation), 
 * the layout should adapt appropriately while maintaining readability and usability.
 */

import * as fc from 'fast-check';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/header';
import { MobileNav } from '@/components/layout/mobile-nav';
import { Footer } from '@/components/layout/footer';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/',
  }),
  usePathname: () => '/',
}));

// Helper to simulate viewport resize
const setViewportSize = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event('resize'));
};

// Viewport size generators
const mobileViewport = fc.record({
  width: fc.integer({ min: 320, max: 767 }),
  height: fc.integer({ min: 568, max: 1024 }),
});

const tabletViewport = fc.record({
  width: fc.integer({ min: 768, max: 1023 }),
  height: fc.integer({ min: 768, max: 1366 }),
});

const desktopViewport = fc.record({
  width: fc.integer({ min: 1024, max: 2560 }),
  height: fc.integer({ min: 768, max: 1440 }),
});

const anyViewport = fc.oneof(mobileViewport, tabletViewport, desktopViewport);

describe('Responsive Layout Properties', () => {
  beforeEach(() => {
    // Reset viewport to default
    setViewportSize(1024, 768);
  });

  describe('Property 12: Responsive Layout Adaptation', () => {
    it('should adapt header navigation for mobile viewports (Requirement 7.1)', () => {
      fc.assert(
        fc.property(mobileViewport, (viewport) => {
          setViewportSize(viewport.width, viewport.height);
          
          const { container, unmount } = render(React.createElement(Header));
          
          // On mobile, desktop navigation should be hidden
          const desktopNav = container.querySelector('nav[aria-label="Main navigation"]');
          const mobileMenuButton = container.querySelector('button[aria-label*="menu"]');
          
          // Desktop nav should be hidden on mobile (has md:flex class)
          expect(desktopNav).toHaveClass('hidden');
          
          // Mobile menu button should be visible
          expect(mobileMenuButton).toBeInTheDocument();
          
          // Header should maintain structure
          const header = container.querySelector('header');
          expect(header).toBeInTheDocument();
          expect(header).toHaveClass('sticky', 'top-0', 'w-full');
          
          // Clean up after each iteration
          unmount();
        }),
        { numRuns: 100 }
      );
    });

    it('should adapt header navigation for tablet viewports (Requirement 7.2)', () => {
      fc.assert(
        fc.property(tabletViewport, (viewport) => {
          setViewportSize(viewport.width, viewport.height);
          
          const { container, unmount } = render(React.createElement(Header));
          
          // On tablet (md breakpoint), desktop navigation should be visible
          const desktopNav = container.querySelector('nav[aria-label="Main navigation"]');
          
          // Desktop nav should have md:flex class (visible on tablet+)
          expect(desktopNav).toHaveClass('md:flex');
          
          // Navigation items should be present
          const navLinks = container.querySelectorAll('nav[aria-label="Main navigation"] a');
          expect(navLinks.length).toBeGreaterThan(0);
          
          // Header should maintain structure
          const header = container.querySelector('header');
          expect(header).toBeInTheDocument();
          
          // Clean up after each iteration
          unmount();
        }),
        { numRuns: 100 }
      );
    });

    it('should adapt header navigation for desktop viewports (Requirement 7.3)', () => {
      fc.assert(
        fc.property(desktopViewport, (viewport) => {
          setViewportSize(viewport.width, viewport.height);
          
          const { container, unmount } = render(React.createElement(Header));
          
          // On desktop, navigation should be fully visible
          const desktopNav = container.querySelector('nav[aria-label="Main navigation"]');
          expect(desktopNav).toBeInTheDocument();
          expect(desktopNav).toHaveClass('md:flex');
          
          // All navigation items should be present
          const navLinks = container.querySelectorAll('nav[aria-label="Main navigation"] a');
          expect(navLinks.length).toBeGreaterThanOrEqual(5); // About, Projects, Skills, Experience, Contact
          
          // Header should utilize space effectively
          const header = container.querySelector('header');
          expect(header).toBeInTheDocument();
          expect(header?.querySelector('.container')).toBeInTheDocument();
          
          // Clean up after each iteration
          unmount();
        }),
        { numRuns: 100 }
      );
    });

    it('should maintain text readability at all viewport sizes (Requirement 7.4)', () => {
      fc.assert(
        fc.property(anyViewport, (viewport) => {
          setViewportSize(viewport.width, viewport.height);
          
          const { container, unmount } = render(React.createElement(Header));
          
          // Check that text elements have appropriate sizing classes
          const brandName = container.querySelector('.font-bold');
          expect(brandName).toBeInTheDocument();
          expect(brandName).toHaveClass('text-lg'); // Readable size
          
          // Navigation links should have readable text size
          const navLinks = container.querySelectorAll('nav[aria-label="Main navigation"] a');
          navLinks.forEach((link) => {
            const classes = link.className;
            // Navigation links should have text-sm class
            expect(classes).toMatch(/text-sm/);
          });
          
          // Container should have proper padding for readability
          const containerDiv = container.querySelector('.container');
          expect(containerDiv).toHaveClass('px-4');
          
          // Clean up after each iteration
          unmount();
        }),
        { numRuns: 100 }
      );
    });

    it('should handle viewport orientation changes (Requirement 7.5)', () => {
      fc.assert(
        fc.property(
          fc.record({
            width: fc.integer({ min: 320, max: 1024 }),
            height: fc.integer({ min: 568, max: 1366 }),
          }),
          (viewport) => {
            // Test portrait orientation
            setViewportSize(viewport.width, viewport.height);
            const { container: portraitContainer, unmount: unmount1 } = render(React.createElement(Header));
            const portraitHeader = portraitContainer.querySelector('header');
            expect(portraitHeader).toBeInTheDocument();
            
            // Test landscape orientation (swap width and height)
            setViewportSize(viewport.height, viewport.width);
            const { container: landscapeContainer, unmount: unmount2 } = render(React.createElement(Header));
            const landscapeHeader = landscapeContainer.querySelector('header');
            expect(landscapeHeader).toBeInTheDocument();
            
            // Both orientations should maintain header structure
            expect(portraitHeader?.querySelector('.container')).toBeInTheDocument();
            expect(landscapeHeader?.querySelector('.container')).toBeInTheDocument();
            
            // Clean up after each iteration
            unmount1();
            unmount2();
          }
        ),
        { numRuns: 100 }
      );
    });

    it('should maintain mobile navigation functionality across mobile viewports', () => {
      fc.assert(
        fc.property(mobileViewport, (viewport) => {
          setViewportSize(viewport.width, viewport.height);
          
          const navigationItems = [
            { id: 'about', label: 'About', href: '#about' },
            { id: 'projects', label: 'Projects', href: '#projects' },
          ];
          
          const { container, unmount } = render(
            React.createElement(MobileNav, { isOpen: true, onClose: () => {}, items: navigationItems })
          );
          
          // Mobile nav should be present when open
          const mobileNav = container.querySelector('nav[aria-label="Mobile navigation"]');
          expect(mobileNav).toBeInTheDocument();
          
          // Should have proper positioning classes
          expect(mobileNav).toHaveClass('fixed', 'top-14', 'left-0', 'right-0');
          
          // Navigation items should be present
          const navLinks = container.querySelectorAll('a');
          expect(navLinks.length).toBe(navigationItems.length);
          
          // Backdrop should be present
          const backdrop = container.querySelector('.backdrop-blur-sm');
          expect(backdrop).toBeInTheDocument();
          
          // Clean up after each iteration
          unmount();
        }),
        { numRuns: 100 }
      );
    });

    it('should maintain footer structure across all viewport sizes', () => {
      fc.assert(
        fc.property(anyViewport, (viewport) => {
          setViewportSize(viewport.width, viewport.height);
          
          const { container, unmount } = render(React.createElement(Footer));
          
          // Footer should always be present
          const footer = container.querySelector('footer');
          expect(footer).toBeInTheDocument();
          
          // Footer should have proper border and padding
          expect(footer).toHaveClass('border-t');
          
          // Container should be present
          const footerContainer = footer?.querySelector('.container');
          expect(footerContainer).toBeInTheDocument();
          
          // Clean up after each iteration
          unmount();
        }),
        { numRuns: 100 }
      );
    });

    it('should ensure consistent spacing and layout structure across viewport changes', () => {
      fc.assert(
        fc.property(
          fc.tuple(anyViewport, anyViewport),
          ([viewport1, viewport2]) => {
            // Test first viewport
            setViewportSize(viewport1.width, viewport1.height);
            const { container: container1, unmount: unmount1 } = render(React.createElement(Header));
            const header1 = container1.querySelector('header');
            
            // Test second viewport
            setViewportSize(viewport2.width, viewport2.height);
            const { container: container2, unmount: unmount2 } = render(React.createElement(Header));
            const header2 = container2.querySelector('header');
            
            // Both should maintain core structure
            expect(header1).toBeInTheDocument();
            expect(header2).toBeInTheDocument();
            
            // Both should have container with flex layout
            expect(header1?.querySelector('.container')).toHaveClass('flex');
            expect(header2?.querySelector('.container')).toHaveClass('flex');
            
            // Both should maintain sticky positioning
            expect(header1).toHaveClass('sticky', 'top-0');
            expect(header2).toHaveClass('sticky', 'top-0');
            
            // Clean up after each iteration
            unmount1();
            unmount2();
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
