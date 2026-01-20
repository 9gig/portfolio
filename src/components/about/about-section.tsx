'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CVDownloadButton } from '@/components/ui/cv-download-button';
import { SiteConfig } from '@/types';
import { handleSmoothScroll } from '@/lib/smooth-scroll';

interface AboutSectionProps {
  author: SiteConfig['author'];
  social: SiteConfig['social'];
  cv: SiteConfig['cv'];
}

export function AboutSection({ author, social, cv }: AboutSectionProps) {
  // Extract specializations from bio (technologies mentioned)
  const specializations = [
    'Flutter',
    'Dart',
    'Kotlin',
    'Go',
    'TypeScript',
    'Node.js',
  ];

  // Filter social links that are configured
  const socialLinks = [
    { name: 'GitHub', url: social.github, icon: 'github' },
    { name: 'LinkedIn', url: social.linkedin, icon: 'linkedin' },
    { name: 'Twitter', url: social.twitter, icon: 'twitter' },
    { name: 'Email', url: social.email ? `mailto:${social.email}` : undefined, icon: 'email' },
  ].filter(link => link.url);

  return (
    <section
      id="about"
      className="section-spacing container-responsive scroll-mt-14"
      tabIndex={-1}
    >
      <div className="mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-8 md:mb-12">
          About Me
        </h2>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] lg:gap-12">
          {/* Profile Image */}
          <div className="flex justify-center md:justify-start">
            <div className="relative h-64 w-64 md:h-72 md:w-72 overflow-hidden rounded-lg shadow-lg">
              <Image
                src={author.avatar}
                alt={`${author.name} profile picture`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 256px, 300px"
              />
            </div>
          </div>

          {/* Bio and Details */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Bio */}
            <div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {author.bio}
              </p>
            </div>

            {/* Specializations */}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                Specializations
              </h3>
              <div className="flex flex-wrap gap-2">
                {specializations.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20"
                    data-specialization={tech}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Location */}
            {author.location && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{author.location}</span>
              </div>
            )}

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                  Connect
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target={link.icon !== 'email' ? '_blank' : undefined}
                      rel={link.icon !== 'email' ? 'noopener noreferrer' : undefined}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      aria-label={`Visit ${link.name}`}
                      data-social-link={link.icon}
                    >
                      <SocialIcon icon={link.icon} />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a href="#contact" onClick={handleSmoothScroll}>
                <Button size="lg">Get in Touch</Button>
              </a>
              <CVDownloadButton
                filename={cv.filename}
                path={cv.path}
                variant="outline"
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Social Icon Component
function SocialIcon({ icon }: { icon: string }) {
  const iconClass = 'h-6 w-6';

  switch (icon) {
    case 'github':
      return (
        <svg
          className={iconClass}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'linkedin':
      return (
        <svg
          className={iconClass}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'twitter':
      return (
        <svg
          className={iconClass}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'email':
      return (
        <svg
          className={iconClass}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      );
    default:
      return null;
  }
}
