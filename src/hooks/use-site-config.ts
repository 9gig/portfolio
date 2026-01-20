import { siteConfig } from '@/config/site';
import { SiteConfig } from '@/types';

/**
 * Hook to access site configuration
 * This provides a consistent way to access configuration throughout the app
 */
export function useSiteConfig(): SiteConfig {
  return siteConfig;
}

/**
 * Hook to check if a feature is enabled
 */
export function useFeatureFlag(feature: keyof SiteConfig['features']): boolean {
  return siteConfig.features[feature];
}

/**
 * Hook to get theme configuration
 */
export function useThemeConfig() {
  return siteConfig.theme;
}

/**
 * Hook to get author information
 */
export function useAuthorInfo() {
  return siteConfig.author;
}

/**
 * Hook to get social links
 */
export function useSocialLinks() {
  return siteConfig.social;
}

/**
 * Hook to get CV configuration
 */
export function useCVConfig() {
  return siteConfig.cv;
}
