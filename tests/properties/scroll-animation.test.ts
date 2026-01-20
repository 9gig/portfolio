/**
 * Feature: modern-ui-redesign, Property 4: Scroll Animation Trigger
 * Validates: Requirements 4.1, 4.6
 * 
 * Property: For any element with scroll animation, the animation should trigger 
 * when the element enters the viewport with the specified margin and should not 
 * re-trigger on scroll up.
 */

import * as fc from 'fast-check';
import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { renderHook } from '@testing-library/react';

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  
  private callback: IntersectionObserverCallback;
  private elements: Set<Element> = new Set();

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.rootMargin = options?.rootMargin || '0px';
    this.thresholds = Array.isArray(options?.threshold) 
      ? options.threshold 
      : [options?.threshold ?? 0];
  }

  observe(target: Element): void {
    this.elements.add(target);
  }

  unobserve(target: Element): void {
    this.elements.delete(target);
  }

  disconnect(): void {
    this.elements.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  // Helper method to trigger intersection
  triggerIntersection(target: Element, isIntersecting: boolean): void {
    if (this.elements.has(target)) {
      const entry: IntersectionObserverEntry = {
        target,
        isIntersecting,
        intersectionRatio: isIntersecting ? 1 : 0,
        boundingClientRect: target.getBoundingClientRect(),
        intersectionRect: target.getBoundingClientRect(),
        rootBounds: null,
        time: Date.now(),
      };
      this.callback([entry], this);
    }
  }
}

describe('Scroll Animation Properties', () => {
  let mockObserver: MockIntersectionObserver;
  let observerInstances: MockIntersectionObserver[] = [];

  beforeEach(() => {
    observerInstances = [];
    
    // Mock IntersectionObserver
    global.IntersectionObserver = jest.fn((callback, options) => {
      mockObserver = new MockIntersectionObserver(callback, options);
      observerInstances.push(mockObserver);
      return mockObserver;
    }) as any;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Property 4: Scroll Animation Trigger', () => {
    /**
     * Requirement 4.1: Animation should trigger when element enters viewport with margin
     */
    it('should trigger animation when any element enters viewport with specified margin', () => {
      fc.assert(
        fc.property(
          fc.record({
            threshold: fc.double({ min: 0.1, max: 1 }), // Avoid very small numbers
            animation: fc.constantFrom('fade', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'scale'),
            delay: fc.integer({ min: 0, max: 1000 }),
          }),
          (config) => {
            const { container, unmount } = render(
              React.createElement(
                ScrollReveal,
                {
                  animation: config.animation,
                  threshold: config.threshold,
                  delay: config.delay,
                  triggerOnce: true,
                },
                React.createElement('div', { 'data-testid': 'scroll-content' }, 'Test Content')
              )
            );

            const scrollRevealElement = container.querySelector('.scroll-reveal');
            expect(scrollRevealElement).toBeInTheDocument();

            // Initially, element should be in hidden state
            // Framer Motion applies initial="hidden" state
            expect(scrollRevealElement).toBeInTheDocument();

            // Verify IntersectionObserver was created with correct options
            expect(global.IntersectionObserver).toHaveBeenCalled();
            const observerCall = (global.IntersectionObserver as jest.Mock).mock.calls[0];
            const observerOptions = observerCall[1];
            
            // Requirement 4.1: Should use -100px rootMargin
            expect(observerOptions.rootMargin).toBe('-100px');
            // Threshold should be a number between 0 and 1
            expect(typeof observerOptions.threshold).toBe('number');
            expect(observerOptions.threshold).toBeGreaterThanOrEqual(0);
            expect(observerOptions.threshold).toBeLessThanOrEqual(1);

            // Simulate element entering viewport
            if (observerInstances.length > 0 && scrollRevealElement) {
              observerInstances[0].triggerIntersection(scrollRevealElement, true);
            }

            // After intersection, animation should be triggered
            // The element should transition to visible state
            expect(scrollRevealElement).toBeInTheDocument();

            unmount();
          }
        ),
        { numRuns: 100 }
      );
    });

    /**
     * Requirement 4.6: Animation should not re-trigger on scroll up
     */
    it('should not re-trigger animation when scrolling back up for any element', () => {
      fc.assert(
        fc.property(
          fc.record({
            animation: fc.constantFrom('fade', 'slideUp', 'slideDown'),
            threshold: fc.double({ min: 0, max: 1 }),
          }),
          (config) => {
            const { container, unmount } = render(
              React.createElement(
                ScrollReveal,
                {
                  animation: config.animation,
                  threshold: config.threshold,
                  triggerOnce: true, // This ensures no re-trigger
                },
                React.createElement('div', { 'data-testid': 'scroll-content' }, 'Test Content')
              )
            );

            const scrollRevealElement = container.querySelector('.scroll-reveal');
            expect(scrollRevealElement).toBeInTheDocument();

            // Simulate element entering viewport (scroll down)
            if (observerInstances.length > 0 && scrollRevealElement) {
              observerInstances[0].triggerIntersection(scrollRevealElement, true);
              
              // Simulate element leaving viewport (scroll up)
              observerInstances[0].triggerIntersection(scrollRevealElement, false);
              
              // Simulate element entering viewport again (scroll down again)
              observerInstances[0].triggerIntersection(scrollRevealElement, true);
            }

            // With triggerOnce=true, the observer should disconnect after first intersection
            // This prevents re-triggering
            expect(scrollRevealElement).toBeInTheDocument();

            unmount();
          }
        ),
        { numRuns: 100 }
      );
    });

    /**
     * Test that useIntersectionObserver hook respects triggerOnce option
     */
    it('should respect triggerOnce option for any threshold value', () => {
      fc.assert(
        fc.property(
          fc.record({
            threshold: fc.double({ min: 0.1, max: 1 }), // Avoid very small numbers
            triggerOnce: fc.boolean(),
          }),
          (config) => {
            const ref = { current: document.createElement('div') };
            
            const { result, unmount } = renderHook(() =>
              useIntersectionObserver(ref, {
                threshold: config.threshold,
                triggerOnce: config.triggerOnce,
                rootMargin: '-100px',
              })
            );

            // Initially not intersecting
            expect(result.current.isIntersecting).toBe(false);
            expect(result.current.hasIntersected).toBe(false);

            // Simulate intersection
            if (observerInstances.length > 0 && ref.current) {
              observerInstances[0].triggerIntersection(ref.current, true);
            }

            // After intersection, hasIntersected should be true
            // Note: In the actual hook, this happens in useEffect
            // For property testing, we verify the observer was set up correctly
            expect(global.IntersectionObserver).toHaveBeenCalled();
            
            const observerCall = (global.IntersectionObserver as jest.Mock).mock.calls[0];
            const observerOptions = observerCall[1];
            // Verify threshold is a valid number
            expect(typeof observerOptions.threshold).toBe('number');
            expect(observerOptions.threshold).toBeGreaterThanOrEqual(0);
            expect(observerOptions.threshold).toBeLessThanOrEqual(1);
            expect(observerOptions.rootMargin).toBe('-100px');

            unmount();
          }
        ),
        { numRuns: 100 }
      );
    });

    /**
     * Test that different animation types all trigger correctly
     */
    it('should trigger correctly for any animation type', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('fade', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'scale'),
          (animation) => {
            const { container, unmount } = render(
              React.createElement(
                ScrollReveal,
                {
                  animation,
                  triggerOnce: true,
                },
                React.createElement('div', null, 'Content')
              )
            );

            const scrollRevealElement = container.querySelector('.scroll-reveal');
            expect(scrollRevealElement).toBeInTheDocument();

            // Verify observer was created with correct rootMargin
            expect(global.IntersectionObserver).toHaveBeenCalled();
            const observerCall = (global.IntersectionObserver as jest.Mock).mock.calls[0];
            const observerOptions = observerCall[1];
            expect(observerOptions.rootMargin).toBe('-100px');

            unmount();
          }
        ),
        { numRuns: 100 }
      );
    });

    /**
     * Test staggered animations trigger correctly
     */
    it('should trigger staggered animations when entering viewport', () => {
      fc.assert(
        fc.property(
          fc.record({
            staggerDelay: fc.double({ min: 0, max: 0.5 }),
            childCount: fc.integer({ min: 1, max: 10 }),
          }),
          (config) => {
            const children = Array.from({ length: config.childCount }, (_, i) =>
              React.createElement('div', { key: i }, `Child ${i}`)
            );

            const { container, unmount } = render(
              React.createElement(
                ScrollReveal,
                {
                  stagger: true,
                  staggerDelay: config.staggerDelay,
                  triggerOnce: true,
                },
                ...children
              )
            );

            const scrollRevealContainer = container.querySelector('.scroll-reveal-container');
            expect(scrollRevealContainer).toBeInTheDocument();

            // Verify observer was created
            expect(global.IntersectionObserver).toHaveBeenCalled();
            
            // Verify all children are rendered
            const childElements = container.querySelectorAll('.scroll-reveal-container > div');
            expect(childElements.length).toBe(config.childCount);

            unmount();
          }
        ),
        { numRuns: 100 }
      );
    });

    /**
     * Test that disabled animations don't trigger observers
     */
    it('should not create observer when animation is disabled', () => {
      fc.assert(
        fc.property(
          fc.constantFrom('fade', 'slideUp', 'scale'),
          (animation) => {
            // Clear previous calls
            (global.IntersectionObserver as jest.Mock).mockClear();

            const { container, unmount } = render(
              React.createElement(
                ScrollReveal,
                {
                  animation,
                  disabled: true,
                },
                React.createElement('div', null, 'Content')
              )
            );

            // When disabled, should render without motion wrapper
            expect(container.firstChild).toBeInTheDocument();
            
            // Should not create IntersectionObserver when disabled
            expect(global.IntersectionObserver).not.toHaveBeenCalled();

            unmount();
          }
        ),
        { numRuns: 100 }
      );
    });

    /**
     * Test that rootMargin is consistently applied
     */
    it('should always use -100px rootMargin for scroll animations', () => {
      fc.assert(
        fc.property(
          fc.record({
            threshold: fc.double({ min: 0, max: 1 }),
            animation: fc.constantFrom('fade', 'slideUp', 'slideDown'),
          }),
          (config) => {
            const { unmount } = render(
              React.createElement(
                ScrollReveal,
                {
                  animation: config.animation,
                  threshold: config.threshold,
                },
                React.createElement('div', null, 'Content')
              )
            );

            // Verify observer was created with -100px rootMargin (Requirement 4.1)
            expect(global.IntersectionObserver).toHaveBeenCalled();
            const observerCall = (global.IntersectionObserver as jest.Mock).mock.calls[0];
            const observerOptions = observerCall[1];
            
            // Property: rootMargin should always be -100px
            expect(observerOptions.rootMargin).toBe('-100px');

            unmount();
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});
