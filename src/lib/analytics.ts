/**
 * Analytics tracking utilities
 * 
 * This module provides functions for tracking user interactions and events.
 * Currently implements a simple console-based tracker for development.
 * In production, this can be extended to integrate with services like
 * Google Analytics, Plausible, or custom analytics solutions.
 */

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

/**
 * Track a custom event
 * 
 * @param event - The event to track
 */
export function trackEvent(event: AnalyticsEvent): void {
  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event);
  }

  // In production, send to analytics service
  // Example: Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
    });
  }

  // Example: Plausible Analytics
  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(event.action, {
      props: {
        category: event.category,
        label: event.label,
        value: event.value,
      },
    });
  }
}

/**
 * Track CV download event
 * 
 * @param filename - The name of the CV file being downloaded
 */
export function trackCVDownload(filename: string): void {
  trackEvent({
    category: 'Engagement',
    action: 'CV Download',
    label: filename,
  });
}

/**
 * Track contact form submission
 */
export function trackContactFormSubmission(): void {
  trackEvent({
    category: 'Engagement',
    action: 'Contact Form Submit',
  });
}

/**
 * Track external link click
 * 
 * @param url - The URL being clicked
 * @param label - Optional label for the link
 */
export function trackExternalLink(url: string, label?: string): void {
  trackEvent({
    category: 'Navigation',
    action: 'External Link Click',
    label: label || url,
  });
}

/**
 * Track page view
 * 
 * @param path - The page path
 */
export function trackPageView(path: string): void {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: path,
    });
  }

  if (typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible('pageview');
  }
}
