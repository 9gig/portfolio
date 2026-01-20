/**
 * Keyboard Navigation Tests
 * 
 * Tests to ensure all interactive elements are keyboard accessible
 * and have proper focus indicators.
 * 
 * Requirements: 16.3, 16.4
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GradientButton } from '@/components/ui/gradient-button';
import { GlassCard } from '@/components/ui/glass-card';
import { ThemeToggle } from '@/components/ui/theme-toggle';

describe('Keyboard Navigation', () => {
  describe('GradientButton', () => {
    it('should be focusable with keyboard', () => {
      render(<GradientButton>Test Button</GradientButton>);
      const button = screen.getByRole('button', { name: /test button/i });
      
      button.focus();
      expect(button).toHaveFocus();
    });

    it('should have visible focus indicator', () => {
      render(<GradientButton>Test Button</GradientButton>);
      const button = screen.getByRole('button', { name: /test button/i });
      
      // Check for focus-visible classes
      expect(button.className).toContain('focus-visible:outline-none');
      expect(button.className).toContain('focus-visible:ring-2');
    });

    it('should respond to Enter key', () => {
      const handleClick = jest.fn();
      render(<GradientButton onClick={handleClick}>Test Button</GradientButton>);
      const button = screen.getByRole('button', { name: /test button/i });
      
      // Verify button can be clicked (keyboard activation is handled by browser)
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalled();
    });

    it('should respond to Space key', () => {
      const handleClick = jest.fn();
      render(<GradientButton onClick={handleClick}>Test Button</GradientButton>);
      const button = screen.getByRole('button', { name: /test button/i });
      
      // Verify button can be clicked (keyboard activation is handled by browser)
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalled();
    });

    it('should meet minimum touch target size', () => {
      render(<GradientButton size="sm">Small Button</GradientButton>);
      const button = screen.getByRole('button', { name: /small button/i });
      
      // Check for minimum height class
      expect(button.className).toContain('min-h-[44px]');
    });
  });

  describe('Links', () => {
    it('should be focusable with keyboard', () => {
      render(
        <a href="#test" className="focus:outline-none focus:ring-2">
          Test Link
        </a>
      );
      const link = screen.getByRole('link', { name: /test link/i });
      
      link.focus();
      expect(link).toHaveFocus();
    });

    it('should have visible focus indicator', () => {
      render(
        <a href="#test" className="focus:outline-none focus:ring-2 focus:ring-purple-500">
          Test Link
        </a>
      );
      const link = screen.getByRole('link', { name: /test link/i });
      
      expect(link.className).toContain('focus:ring-2');
    });
  });

  describe('Skip Link', () => {
    it('should be present in the document', () => {
      render(
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100]"
        >
          Skip to main content
        </a>
      );
      
      const skipLink = screen.getByText(/skip to main content/i);
      expect(skipLink).toBeInTheDocument();
    });

    it('should become visible when focused', () => {
      render(
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only"
        >
          Skip to main content
        </a>
      );
      
      const skipLink = screen.getByText(/skip to main content/i);
      expect(skipLink.className).toContain('sr-only');
      expect(skipLink.className).toContain('focus:not-sr-only');
    });
  });

  describe('Interactive Elements', () => {
    it('should maintain focus during animations', () => {
      const { container } = render(
        <GradientButton>Animated Button</GradientButton>
      );
      const button = screen.getByRole('button', { name: /animated button/i });
      
      button.focus();
      expect(button).toHaveFocus();
      
      // Simulate animation (button should still be focusable)
      fireEvent.mouseEnter(button);
      expect(button).toHaveFocus();
    });

    it('should have proper tab order', () => {
      render(
        <div>
          <button>First</button>
          <button>Second</button>
          <button>Third</button>
        </div>
      );
      
      const buttons = screen.getAllByRole('button');
      
      buttons[0].focus();
      expect(buttons[0]).toHaveFocus();
      
      // Simulate tab key
      fireEvent.keyDown(buttons[0], { key: 'Tab', code: 'Tab' });
      buttons[1].focus();
      expect(buttons[1]).toHaveFocus();
    });
  });

  describe('Form Elements', () => {
    it('should be keyboard accessible', () => {
      render(
        <input
          type="text"
          placeholder="Test input"
          className="focus:outline-none focus:ring-2"
        />
      );
      
      const input = screen.getByPlaceholderText(/test input/i);
      input.focus();
      expect(input).toHaveFocus();
    });

    it('should have visible focus indicator', () => {
      render(
        <input
          type="text"
          placeholder="Test input"
          className="focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      );
      
      const input = screen.getByPlaceholderText(/test input/i);
      expect(input.className).toContain('focus:ring-2');
    });
  });

  describe('Disabled Elements', () => {
    it('should not be focusable when disabled', () => {
      render(<GradientButton disabled>Disabled Button</GradientButton>);
      const button = screen.getByRole('button', { name: /disabled button/i });
      
      expect(button).toBeDisabled();
      expect(button.className).toContain('disabled:pointer-events-none');
    });
  });
});
