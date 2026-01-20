import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { SkipLink } from '@/components/layout/skip-link'
import { BackToTop } from '@/components/ui/back-to-top'
import { ThemeProvider } from '@/components/theme-provider'
import { siteConfig } from '@/config/site'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author.name, url: siteConfig.url }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  keywords: [
    'software developer',
    'portfolio',
    'flutter',
    'dart',
    'kotlin',
    'go',
    'typescript',
    'nodejs',
    'shopify',
    'full stack developer',
    'web development',
    'mobile development',
    'react',
    'next.js',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${siteConfig.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: `${siteConfig.author.name} - Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.social.twitter ? `@${siteConfig.social.twitter.split('/').pop()}` : undefined,
    images: [`${siteConfig.url}/twitter-image.jpg`],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Structured data for person schema
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author.name,
    email: siteConfig.author.email,
    url: siteConfig.url,
    image: `${siteConfig.url}${siteConfig.author.avatar}`,
    jobTitle: 'Software Developer',
    description: siteConfig.author.bio,
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.author.location,
    },
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.twitter,
    ].filter(Boolean),
    knowsAbout: [
      'Flutter',
      'Dart',
      'Kotlin',
      'Go',
      'TypeScript',
      'Node.js',
      'React',
      'Next.js',
      'Shopify',
      'Web Development',
      'Mobile Development',
      'Full Stack Development',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme-storage');
                  if (theme) {
                    const { state } = JSON.parse(theme);
                    const selectedTheme = state?.theme || 'system';
                    let effectiveTheme = selectedTheme;
                    
                    if (selectedTheme === 'system') {
                      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    }
                    
                    document.documentElement.classList.add(effectiveTheme);
                    document.documentElement.style.colorScheme = effectiveTheme;
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <SkipLink />
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main id="main-content" className="flex-1" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}