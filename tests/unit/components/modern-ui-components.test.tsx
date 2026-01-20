/**
 * Tests for Modern UI Components
 * 
 * Basic rendering tests for GlassCard, GradientButton, and ScrollReveal components
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GlassCard } from '@/components/ui/glass-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock intersection observer hook
jest.mock('@/hooks/use-intersection-observer', () => ({
  useIntersectionObserver: () => ({
    isIntersecting: true,
    hasIntersected: true,
  }),
}));

describe('GlassCard Component', () => {
  it('renders children correctly', () => {
    render(
      <GlassCard>
        <p>Test content</p>
      </GlassCard>
    );
    
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <GlassCard className="custom-class">
        <p>Test</p>
      </GlassCard>
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with different variants', () => {
    const { rerender, container } = render(
      <GlassCard variant="light">
        <p>Test</p>
      </GlassCard>
    );
    
    expect(container.firstChild).toHaveClass('glass-card');
    
    rerender(
      <GlassCard variant="dark">
        <p>Test</p>
      </GlassCard>
    );
    
    expect(container.firstChild).toHaveClass('glass-card');
  });

  it('renders with different sizes', () => {
    const { rerender, container } = render(
      <GlassCard size="sm">
        <p>Test</p>
      </GlassCard>
    );
    
    expect(container.firstChild).toHaveClass('p-3');
    
    rerender(
      <GlassCard size="lg">
        <p>Test</p>
      </GlassCard>
    );
    
    expect(container.firstChild).toHaveClass('p-6');
  });
});

describe('GradientButton Component', () => {
  it('renders children correctly', () => {
    render(<GradientButton>Click me</GradientButton>);
    
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders as a button by default', () => {
    render(<GradientButton>Click me</GradientButton>);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('applies different sizes', () => {
    const { rerender } = render(
      <GradientButton size="sm">Small</GradientButton>
    );
    
    expect(screen.getByRole('button')).toHaveClass('min-h-[44px]');
    
    rerender(<GradientButton size="lg">Large</GradientButton>);
    
    expect(screen.getByRole('button')).toHaveClass('min-h-[48px]');
  });

  it('supports fullWidth prop', () => {
    render(<GradientButton fullWidth>Full Width</GradientButton>);
    
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('can be disabled', () => {
    render(<GradientButton disabled>Disabled</GradientButton>);
    
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

describe('ScrollReveal Component', () => {
  it('renders children correctly', () => {
    render(
      <ScrollReveal>
        <p>Revealed content</p>
      </ScrollReveal>
    );
    
    expect(screen.getByText('Revealed content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ScrollReveal className="custom-reveal">
        <p>Test</p>
      </ScrollReveal>
    );
    
    expect(container.firstChild).toHaveClass('custom-reveal');
  });

  it('renders without animation when disabled', () => {
    const { container } = render(
      <ScrollReveal disabled>
        <p>No animation</p>
      </ScrollReveal>
    );
    
    // Should render as a plain div when disabled
    expect(container.firstChild).not.toHaveClass('scroll-reveal');
  });

  it('supports stagger mode', () => {
    render(
      <ScrollReveal stagger>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </ScrollReveal>
    );
    
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });
});
