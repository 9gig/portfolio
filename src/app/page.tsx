'use client';

import { Suspense } from 'react';
import { SectionErrorBoundary } from '@/components/error-boundary';
import { SectionLoadingSkeleton } from '@/components/ui/loading-spinner';
import { siteConfig } from '@/config/site';

// Modern UI Components
import { HeroSection } from '@/components/hero/hero-section';
import { ProjectGridModern } from '@/components/projects/project-grid-modern';
import { SkillsGrid } from '@/components/skills/skills-grid';
import { Timeline } from '@/components/experience/timeline';
import { ContactFormModern } from '@/components/contact/contact-form-modern';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export default function Home() {
  const { features } = siteConfig;

  return (
    <div className="flex flex-col">
      {/* Modern Hero Section */}
      <SectionErrorBoundary sectionName="Hero">
        <HeroSection />
      </SectionErrorBoundary>

      {/* Projects Section with Modern Cards */}
      {features.showProjects && (
        <SectionErrorBoundary sectionName="Projects">
          <Suspense fallback={<SectionLoadingSkeleton />}>
            <ScrollReveal>
              <section 
                id="projects" 
                className="py-20 scroll-mt-14"
                aria-labelledby="projects-heading"
                tabIndex={-1}
              >
                <div className="container mx-auto px-4">
                  <h2 
                    id="projects-heading"
                    className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  >
                    Featured Projects
                  </h2>
                  <ProjectGridModern projects={siteConfig.projects} />
                </div>
              </section>
            </ScrollReveal>
          </Suspense>
        </SectionErrorBoundary>
      )}

      {/* Skills Section with Modern Grid */}
      {features.showSkills && (
        <SectionErrorBoundary sectionName="Skills">
          <Suspense fallback={<SectionLoadingSkeleton />}>
            <ScrollReveal>
              <SkillsGrid />
            </ScrollReveal>
          </Suspense>
        </SectionErrorBoundary>
      )}

      {/* Experience Timeline */}
      {features.showExperience && (
        <SectionErrorBoundary sectionName="Experience">
          <Suspense fallback={<SectionLoadingSkeleton />}>
            <ScrollReveal>
              <Timeline />
            </ScrollReveal>
          </Suspense>
        </SectionErrorBoundary>
      )}

      {/* Modern Contact Form */}
      {features.showContact && (
        <SectionErrorBoundary sectionName="Contact">
          <Suspense fallback={<SectionLoadingSkeleton />}>
            <ScrollReveal>
              <section 
                id="contact" 
                className="py-20 scroll-mt-14"
                aria-labelledby="contact-heading"
                tabIndex={-1}
              >
                <div className="container mx-auto px-4">
                  <h2 
                    id="contact-heading"
                    className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                  >
                    Get In Touch
                  </h2>
                  <ContactFormModern />
                </div>
              </section>
            </ScrollReveal>
          </Suspense>
        </SectionErrorBoundary>
      )}
    </div>
  );
}
