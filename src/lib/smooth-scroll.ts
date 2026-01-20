/**
 * Smooth scroll utilities for navigation between sections
 */

/**
 * Smoothly scrolls to an element by ID
 * @param elementId - The ID of the element to scroll to (without #)
 * @param offset - Optional offset from the top (useful for fixed headers)
 */
export function scrollToElement(elementId: string, offset: number = 80): void {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.warn(`Element with id "${elementId}" not found`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  });

  // Focus the element for accessibility
  // Use a small delay to ensure scroll completes first
  setTimeout(() => {
    element.focus({ preventScroll: true });
  }, 500);
}

/**
 * Smoothly scrolls to the top of the page
 */
export function scrollToTop(): void {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

/**
 * Checks if smooth scrolling is supported
 */
export function isSmoothScrollSupported(): boolean {
  return 'scrollBehavior' in document.documentElement.style;
}

/**
 * Gets the current scroll position
 */
export function getScrollPosition(): number {
  return window.pageYOffset || document.documentElement.scrollTop;
}

/**
 * Checks if an element is in the viewport
 */
export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Hook for handling smooth scroll navigation
 */
export function handleSmoothScroll(event: React.MouseEvent<HTMLAnchorElement>): void {
  const href = event.currentTarget.getAttribute('href');
  
  if (!href || !href.startsWith('#')) {
    return;
  }

  event.preventDefault();
  const elementId = href.substring(1);
  scrollToElement(elementId);

  // Update URL without triggering navigation
  if (window.history && window.history.pushState) {
    window.history.pushState(null, '', href);
  }
}
