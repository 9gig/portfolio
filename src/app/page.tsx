'use client';

import { Suspense } from 'react';
import { ProjectsSection } from '@/components/projects';
import { AboutSection } from '@/components/about';
import { SkillsSection } from '@/components/skills';
import { ContactSection } from '@/components/contact';
import { AnimatedSection } from '@/components/ui/animated-section';
import { SectionErrorBoundary } from '@/components/error-boundary';
import { SectionLoadingSkeleton } from '@/components/ui/loading-spinner';
import { siteConfig } from '@/config/site';

export default function Home() {
  const { author, features } = siteConfig;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <SectionErrorBoundary sectionName="Hero">
        <AnimatedSection animation="fade-in">
          <section 
            id="hero" 
            className="container px-4 py-24 md:py-32 scroll-mt-14"
            aria-labelledby="hero-heading"
            tabIndex={-1}
          >
            <div className="mx-auto max-w-3xl text-center">
              <h1 
                id="hero-heading"
                className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
              >
                {author.name}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                {author.bio}
              </p>
            </div>
          </section>
        </AnimatedSection>
      </SectionErrorBoundary>

      {/* About Section */}
      <SectionErrorBoundary sectionName="About">
        <Suspense fallback={<SectionLoadingSkeleton />}>
          <AnimatedSection animation="slide-up" delay={0.1}>
            <AboutSection 
              author={author} 
              social={siteConfig.social} 
              cv={siteConfig.cv} 
            />
          </AnimatedSection>
        </Suspense>
      </SectionErrorBoundary>

      {/* Projects Section */}
      {features.showProjects && (
        <SectionErrorBoundary sectionName="Projects">
          <Suspense fallback={<SectionLoadingSkeleton />}>
            <AnimatedSection animation="slide-up" delay={0.2}>
              <section 
                id="projects" 
                className="container px-4 py-16 md:py-24 scroll-mt-14 bg-muted/50"
                aria-labelledby="projects-heading"
                tabIndex={-1}
              >
                <div className="mx-auto max-w-7xl">
                  <ProjectsSection
                    manualProjects={siteConfig.projects}
                    showGitHubRepos={false}
                  />
                </div>
              </section>
            </AnimatedSection>
          </Suspense>
        </SectionErrorBoundary>
      )}

      {/* Skills Section */}
      {features.showSkills && (
        <SectionErrorBoundary sectionName="Skills">
          <Suspense fallback={<SectionLoadingSkeleton />}>
            <AnimatedSection animation="slide-up" delay={0.1}>
              <SkillsSection />
            </AnimatedSection>
          </Suspense>
        </SectionErrorBoundary>
      )}

      {/* Experience Section */}
      {features.showExperience && (
        <SectionErrorBoundary sectionName="Experience">
          <AnimatedSection animation="slide-up" delay={0.1}>
            <section 
              id="experience" 
              className="container px-4 py-16 md:py-24 scroll-mt-14 bg-muted/50"
              aria-labelledby="experience-heading"
              tabIndex={-1}
            >
              <div className="mx-auto max-w-3xl">
                <h2 
                  id="experience-heading"
                  className="text-3xl font-bold tracking-tight sm:text-4xl"
                >
                  Experience
                </h2>
                <p className="mt-6 text-lg text-muted-foreground">
                  Professional experience section - to be implemented in task 7.
                </p>
              </div>
            </section>
          </AnimatedSection>
        </SectionErrorBoundary>
      )}

      {/* Contact Section */}
      {features.showContact && (
        <SectionErrorBoundary sectionName="Contact">
          <Suspense fallback={<SectionLoadingSkeleton />}>
            <AnimatedSection animation="slide-up" delay={0.1}>
              <ContactSection />
            </AnimatedSection>
          </Suspense>
        </SectionErrorBoundary>
      )}
    </div>
  );
}
