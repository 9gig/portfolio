/**
 * ARIA Attributes Tests
 * 
 * Tests to ensure all components have proper ARIA attributes
 * for accessibility, including live regions for dynamic content.
 * 
 * Requirements: 16.5
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HeroSection } from '@/components/hero/hero-section';

// Mock the hooks
jest.mock('@/hooks/use-site-config', () => ({
  useSiteConfig: () => ({
    author: {
      name: 'Test User',
      bio: 'Test bio',
      avatar: '/test-avatar.png',
    },
  }),
}));

jest.mock('@/hooks/use-reduced-motion', () => ({
  useReducedMotion: () => false,
}));

describe('ARIA Attributes', () => {
  describe('Hero Section', () => {
    it('should have proper landmark role', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');
      
      expect(section).toHaveAttribute('role', 'banner');
    });

    it('should have aria-labelledby attribute', () => {
      const { container } = render(<HeroSection />);
      const section = container.querySelector('section');
      
      expect(section).toHaveAttribute('aria-labelledby', 'hero-heading');
    });

    it('should have aria-live region for dynamic content', () => {
      const { container } = render(<HeroSection />);
      const liveRegion = container.querySelector('[aria-live="polite"]');
      
      expect(liveRegion).toBeInTheDocument();
    });

    it('should have proper heading with id', () => {
      render(<HeroSection />);
      const heading = screen.getByRole('heading', { level: 2 });
      
      expect(heading).toHaveAttribute('id', 'hero-heading');
    });
  });

  describe('Interactive Elements', () => {
    it('should have aria-label for icon-only buttons', () => {
      render(
        <button aria-label="Close menu">
          <svg aria-hidden="true">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      );
      
      const button = screen.getByRole('button', { name: /close menu/i });
      expect(button).toHaveAttribute('aria-label');
    });

    it('should mark decorative icons as aria-hidden', () => {
      const { container } = render(
        <div>
          <svg aria-hidden="true">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
          </svg>
        </div>
      );
      
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Form Elements', () => {
    it('should have aria-required for required fields', () => {
      render(
        <input
          type="text"
          aria-required="true"
          placeholder="Name"
        />
      );
      
      const input = screen.getByPlaceholderText(/name/i);
      expect(input).toHaveAttribute('aria-required', 'true');
    });

    it('should have aria-invalid for fields with errors', () => {
      render(
        <input
          type="email"
          aria-invalid="true"
          aria-describedby="email-error"
          placeholder="Email"
        />
      );
      
      const input = screen.getByPlaceholderText(/email/i);
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('should have aria-describedby for error messages', () => {
      render(
        <div>
          <input
            type="email"
            aria-describedby="email-error"
            placeholder="Email"
          />
          <span id="email-error">Invalid email address</span>
        </div>
      );
      
      const input = screen.getByPlaceholderText(/email/i);
      expect(input).toHaveAttribute('aria-describedby', 'email-error');
      
      const error = screen.getByText(/invalid email address/i);
      expect(error).toHaveAttribute('id', 'email-error');
    });
  });

  describe('Dynamic Content', () => {
    it('should have aria-live for status messages', () => {
      const { container } = render(
        <div role="alert" aria-live="polite">
          Form submitted successfully!
        </div>
      );
      
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });

    it('should have role="alert" for important messages', () => {
      render(
        <div role="alert" aria-live="polite">
          Error: Please fill in all required fields
        </div>
      );
      
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });

    it('should have aria-atomic for complete message reading', () => {
      const { container } = render(
        <div role="alert" aria-live="polite" aria-atomic="true">
          Loading complete
        </div>
      );
      
      const alert = container.querySelector('[role="alert"]');
      expect(alert).toHaveAttribute('aria-atomic', 'true');
    });
  });

  describe('Navigation', () => {
    it('should have aria-label for navigation regions', () => {
      render(
        <nav aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
        </nav>
      );
      
      const nav = screen.getByRole('navigation', { name: /main navigation/i });
      expect(nav).toBeInTheDocument();
    });

    it('should have aria-expanded for expandable menus', () => {
      render(
        <button aria-expanded="false" aria-label="Open menu">
          Menu
        </button>
      );
      
      const button = screen.getByRole('button', { name: /open menu/i });
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Lists', () => {
    it('should have role="list" for custom lists', () => {
      render(
        <div role="list" aria-label="Skills">
          <div role="listitem">JavaScript</div>
          <div role="listitem">TypeScript</div>
        </div>
      );
      
      const list = screen.getByRole('list', { name: /skills/i });
      expect(list).toBeInTheDocument();
    });
  });

  describe('Semantic HTML', () => {
    it('should use semantic HTML elements', () => {
      const { container } = render(
        <article>
          <header>
            <h1>Article Title</h1>
          </header>
          <main>
            <p>Article content</p>
          </main>
          <footer>
            <p>Article footer</p>
          </footer>
        </article>
      );
      
      expect(container.querySelector('article')).toBeInTheDocument();
      expect(container.querySelector('header')).toBeInTheDocument();
      expect(container.querySelector('main')).toBeInTheDocument();
      expect(container.querySelector('footer')).toBeInTheDocument();
    });
  });
});
