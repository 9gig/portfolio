'use client';

import { ThemeToggle } from '@/components/ui/theme-toggle';
import { GlassCard } from '@/components/ui/glass-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { useTheme } from '@/hooks/use-theme';

/**
 * Demo page for theme system
 * Tests Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6
 */
export default function ThemeDemoPage() {
  const { theme, resolvedTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-2 gradient-text-primary">
              Theme System Demo
            </h1>
            <p className="text-muted-foreground">
              Current: {theme} (Resolved: {resolvedTheme})
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Demo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Glass Card Demo */}
          <GlassCard>
            <h3 className="text-xl font-semibold mb-2">Glassmorphism</h3>
            <p className="text-sm text-muted-foreground">
              This card uses glassmorphism effects that adapt to the current theme.
            </p>
          </GlassCard>

          {/* Gradient Text Demo */}
          <GlassCard>
            <h3 className="text-xl font-semibold mb-2 gradient-text-primary">
              Primary Gradient
            </h3>
            <p className="text-sm text-muted-foreground">
              Gradient colors change based on theme.
            </p>
          </GlassCard>

          {/* Gradient Button Demo */}
          <GlassCard>
            <h3 className="text-xl font-semibold mb-2">Gradient Buttons</h3>
            <div className="space-y-2">
              <GradientButton className="w-full">Filled</GradientButton>
              <GradientButton variant="outline" className="w-full">
                Outline
              </GradientButton>
              <GradientButton variant="ghost" className="w-full">
                Ghost
              </GradientButton>
            </div>
          </GlassCard>

          {/* Color Palette Demo */}
          <GlassCard>
            <h3 className="text-xl font-semibold mb-4">Color Palette</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-primary" />
                <span className="text-sm">Primary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-secondary" />
                <span className="text-sm">Secondary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded bg-accent" />
                <span className="text-sm">Accent</span>
              </div>
            </div>
          </GlassCard>

          {/* Gradient Backgrounds Demo */}
          <GlassCard>
            <h3 className="text-xl font-semibold mb-4">Gradient Backgrounds</h3>
            <div className="space-y-2">
              <div className="h-12 rounded gradient-bg-primary" />
              <div className="h-12 rounded gradient-bg-secondary" />
              <div className="h-12 rounded gradient-bg-accent" />
            </div>
          </GlassCard>

          {/* Theme Info */}
          <GlassCard>
            <h3 className="text-xl font-semibold mb-4">Theme Info</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Selected:</span> {theme}
              </div>
              <div>
                <span className="font-medium">Resolved:</span> {resolvedTheme}
              </div>
              <div>
                <span className="font-medium">Persisted:</span> localStorage
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Instructions */}
        <GlassCard className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Testing Instructions</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Click the theme toggle to cycle through themes</li>
            <li>✓ Observe smooth color transitions (300ms)</li>
            <li>✓ Glassmorphism effects adapt to each theme</li>
            <li>✓ Gradient colors change based on theme</li>
            <li>✓ Theme preference is saved to localStorage</li>
            <li>✓ System theme is respected when selected</li>
            <li>✓ Refresh the page - theme persists</li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
