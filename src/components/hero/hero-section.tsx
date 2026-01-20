/**
 * HeroSection Component
 * 
 * Modern hero section with animated background, text, avatar, and CTA buttons.
 * Features staggered animations and gradient effects.
 * 
 * Requirements: 1.1, 1.6, 12.1, 12.2
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSiteConfig } from '@/hooks/use-site-config';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { GradientButton } from '@/components/ui/gradient-button';
import { animations } from '@/styles/design-tokens';
import { HeroBackground } from './hero-background';
import { ScrollIndicator } from './scroll-indicator';
import { AnimatedText } from './animated-text';

export function HeroSection() {
  const { author } = useSiteConfig();
  const prefersReducedMotion = useReducedMotion();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: animations.durations.slow / 1000,
        ease: animations.easings.easeOut,
      },
    },
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
      role="banner"
    >
      {/* Animated Background */}
      <HeroBackground />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto"
          aria-live="polite"
        >
          {/* Animated Avatar */}
          <motion.div
            variants={itemVariants}
            className="mb-8"
            role="img"
            aria-label={`${author.name}'s profile picture`}
          >
            <motion.div
              initial={prefersReducedMotion ? {} : { scale: 0 }}
              animate={prefersReducedMotion ? {} : { scale: 1 }}
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2,
                    }
              }
              className="relative w-32 h-32 mx-auto"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50" />
              
              {/* Avatar image */}
              <div className="relative w-full h-full">
                <Image
                  src={author.avatar || '/images/avatar.png'}
                  alt={author.name}
                  width={128}
                  height={128}
                  className="relative rounded-full border-4 border-white/20 object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Animated Name with Gradient */}
          <motion.div variants={itemVariants}>
            <AnimatedText
              text={author.name}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
              gradient="primary"
            />
          </motion.div>

          {/* Animated Title */}
          <motion.h2
            id="hero-heading"
            variants={itemVariants}
            className="text-xl md:text-2xl lg:text-4xl text-gray-300 mb-6 font-medium"
          >
            Mobile & Full Stack Developer
          </motion.h2>

          {/* Animated Bio */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {author.bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <GradientButton
              href="#projects"
              size="lg"
              gradient="primary"
              disableAnimation={prefersReducedMotion}
            >
              View Projects
            </GradientButton>
            <GradientButton
              href="#contact"
              size="lg"
              variant="outline"
              gradient="secondary"
              disableAnimation={prefersReducedMotion}
            >
              Get in Touch
            </GradientButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
