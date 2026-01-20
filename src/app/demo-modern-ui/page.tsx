/**
 * Demo page for Modern UI Components
 * 
 * This page demonstrates the new GlassCard, GradientButton, and ScrollReveal components
 */

'use client';

import React from 'react';
import { GlassCard, GlassCardHeader, GlassCardContent, GlassCardFooter } from '@/components/ui/glass-card';
import { GradientButton, GradientButtonGroup } from '@/components/ui/gradient-button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { HeroSection } from '@/components/hero';

export default function ModernUIDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Demo Content */}
      <div className="py-20 px-4">
        <div className="container mx-auto max-w-6xl space-y-20">
        {/* Header */}
        <ScrollReveal animation="slideDown">
          <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Modern UI Components Demo
          </h1>
          <p className="text-center text-gray-300 mt-4 text-lg">
            Showcasing GlassCard, GradientButton, and ScrollReveal components
          </p>
        </ScrollReveal>

        {/* GlassCard Examples */}
        <ScrollReveal animation="slideUp">
          <h2 className="text-3xl font-bold text-white mb-8">GlassCard Component</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dark variant */}
            <GlassCard variant="dark" intensity="medium">
              <GlassCardHeader>
                <h3 className="text-xl font-semibold text-white">Dark Glass</h3>
              </GlassCardHeader>
              <GlassCardContent>
                <p className="text-gray-300">
                  This is a glassmorphism card with dark theme and medium intensity.
                </p>
              </GlassCardContent>
            </GlassCard>

            {/* Light variant */}
            <GlassCard variant="light" intensity="medium">
              <GlassCardHeader>
                <h3 className="text-xl font-semibold text-white">Light Glass</h3>
              </GlassCardHeader>
              <GlassCardContent>
                <p className="text-gray-200">
                  This is a glassmorphism card with light theme and medium intensity.
                </p>
              </GlassCardContent>
            </GlassCard>

            {/* Strong intensity */}
            <GlassCard variant="dark" intensity="strong">
              <GlassCardHeader>
                <h3 className="text-xl font-semibold text-white">Strong Glass</h3>
              </GlassCardHeader>
              <GlassCardContent>
                <p className="text-gray-300">
                  This card has strong intensity for more opacity.
                </p>
              </GlassCardContent>
            </GlassCard>
          </div>
        </ScrollReveal>

        {/* GradientButton Examples */}
        <ScrollReveal animation="slideUp" delay={0.2}>
          <h2 className="text-3xl font-bold text-white mb-8">GradientButton Component</h2>
          
          <div className="space-y-8">
            {/* Filled buttons */}
            <div>
              <h3 className="text-xl font-semibold text-gray-300 mb-4">Filled Variants</h3>
              <GradientButtonGroup spacing="md">
                <GradientButton variant="filled" gradient="primary">
                  Primary
                </GradientButton>
                <GradientButton variant="filled" gradient="secondary">
                  Secondary
                </GradientButton>
                <GradientButton variant="filled" gradient="accent">
                  Accent
                </GradientButton>
                <GradientButton variant="filled" gradient="success">
                  Success
                </GradientButton>
              </GradientButtonGroup>
            </div>

            {/* Outline buttons */}
            <div>
              <h3 className="text-xl font-semibold text-gray-300 mb-4">Outline Variants</h3>
              <GradientButtonGroup spacing="md">
                <GradientButton variant="outline" gradient="primary">
                  Primary
                </GradientButton>
                <GradientButton variant="outline" gradient="warm">
                  Warm
                </GradientButton>
                <GradientButton variant="outline" gradient="cool">
                  Cool
                </GradientButton>
              </GradientButtonGroup>
            </div>

            {/* Different sizes */}
            <div>
              <h3 className="text-xl font-semibold text-gray-300 mb-4">Button Sizes</h3>
              <GradientButtonGroup spacing="md">
                <GradientButton size="sm" gradient="aurora">
                  Small
                </GradientButton>
                <GradientButton size="md" gradient="aurora">
                  Medium
                </GradientButton>
                <GradientButton size="lg" gradient="aurora">
                  Large
                </GradientButton>
                <GradientButton size="xl" gradient="aurora">
                  Extra Large
                </GradientButton>
              </GradientButtonGroup>
            </div>
          </div>
        </ScrollReveal>

        {/* ScrollReveal Examples */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">ScrollReveal Component</h2>
          
          {/* Different animation types */}
          <div className="space-y-6">
            <ScrollReveal animation="fade">
              <GlassCard>
                <p className="text-gray-300">This card fades in when scrolled into view</p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal animation="slideUp">
              <GlassCard>
                <p className="text-gray-300">This card slides up when scrolled into view</p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal animation="slideLeft">
              <GlassCard>
                <p className="text-gray-300">This card slides from the left</p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal animation="slideRight">
              <GlassCard>
                <p className="text-gray-300">This card slides from the right</p>
              </GlassCard>
            </ScrollReveal>

            <ScrollReveal animation="scale">
              <GlassCard>
                <p className="text-gray-300">This card scales in when scrolled into view</p>
              </GlassCard>
            </ScrollReveal>
          </div>

          {/* Staggered children */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Staggered Animation</h3>
            <ScrollReveal stagger staggerDelay={0.15}>
              <GlassCard size="sm">
                <p className="text-gray-300">Item 1</p>
              </GlassCard>
              <GlassCard size="sm">
                <p className="text-gray-300">Item 2</p>
              </GlassCard>
              <GlassCard size="sm">
                <p className="text-gray-300">Item 3</p>
              </GlassCard>
              <GlassCard size="sm">
                <p className="text-gray-300">Item 4</p>
              </GlassCard>
            </ScrollReveal>
          </div>
        </div>

        {/* Combined Example */}
        <ScrollReveal animation="slideUp" delay={0.3}>
          <h2 className="text-3xl font-bold text-white mb-8">Combined Example</h2>
          
          <GlassCard variant="dark" intensity="medium" size="lg">
            <GlassCardHeader>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Modern Portfolio Card
              </h3>
            </GlassCardHeader>
            <GlassCardContent>
              <p className="text-gray-300 mb-4">
                This card combines glassmorphism effects with gradient text and buttons.
                It demonstrates how these components work together to create a modern UI.
              </p>
              <p className="text-gray-400 text-sm mb-6">
                Hover over the buttons to see the gradient shift and scale animations.
              </p>
            </GlassCardContent>
            <GlassCardFooter>
              <GradientButtonGroup spacing="md">
                <GradientButton variant="filled" gradient="primary">
                  Learn More
                </GradientButton>
                <GradientButton variant="outline" gradient="accent">
                  View Demo
                </GradientButton>
              </GradientButtonGroup>
            </GlassCardFooter>
          </GlassCard>
        </ScrollReveal>

        {/* Spacer for scroll */}
        <div className="h-20" />
        </div>
      </div>
    </div>
  );
}
