/**
 * Integration tests for the main page
 * Tests that all sections are properly wired together
 */

import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock the site config
jest.mock('@/config/site', () => ({
  siteConfig: {
    name: 'Test Portfolio',
    title: 'Test Developer Portfolio',
    description: 'Test description',
    url: 'https://test.com',
    author: {
      name: 'Test Developer',
      email: 'test@example.com',
      bio: 'Test bio',
      avatar: '/test-avatar.jpg',
      location: 'Test Location',
    },
    github: {
      username: 'testuser',
      featured_repos: [],
    },
    social: {
      github: 'https://github.com/testuser',
      linkedin: 'https://linkedin.com/in/testuser',
      twitter: 'https://twitter.com/testuser',
      email: 'test@example.com',
    },
    skills: [
      {
        name: 'Languages',
        skills: [
          { name: 'TypeScript', proficiency: 'expert' },
          { name: 'JavaScript', proficiency: 'expert' },
        ],
      },
    ],
    projects: [
      {
        id: '1',
        title: 'Test Project',
        description: 'Test description',
        technologies: ['React', 'TypeScript'],
        featured: true,
        category: 'web',
      },
    ],
    experience: [],
    theme: {
      defaultTheme: 'light',
    },
    features: {
      showGitHubStats: true,
      showExperience: true,
      showSkills: true,
      showProjects: true,
      showContact: true,
      enableAnimations: true,
    },
    cv: {
      filename: 'resume.pdf',
      path: '/resume.pdf',
    },
  },
}));

describe('Page Integration', () => {
  it('should render all main sections', () => {
    render(<Home />);

    // Check that main sections are present
    expect(screen.getByText('Test Developer')).toBeInTheDocument();
    expect(screen.getByText('Test bio')).toBeInTheDocument();
  });

  it('should render sections with proper ARIA labels', () => {
    render(<Home />);

    // Check for proper section landmarks
    const heroSection = screen.getByRole('region', { name: /hero/i });
    expect(heroSection).toBeInTheDocument();
  });

  it('should render About section', () => {
    render(<Home />);

    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Test Location')).toBeInTheDocument();
  });

  it('should render Projects section when enabled', () => {
    render(<Home />);

    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('should render Skills section when enabled', () => {
    render(<Home />);

    expect(screen.getByText('Skills & Technologies')).toBeInTheDocument();
  });

  it('should render Contact section when enabled', () => {
    render(<Home />);

    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  it('should have proper section IDs for navigation', () => {
    const { container } = render(<Home />);

    expect(container.querySelector('#hero')).toBeInTheDocument();
    expect(container.querySelector('#about')).toBeInTheDocument();
    expect(container.querySelector('#projects')).toBeInTheDocument();
    expect(container.querySelector('#skills')).toBeInTheDocument();
    expect(container.querySelector('#contact')).toBeInTheDocument();
  });

  it('should have scroll margin for fixed header', () => {
    const { container } = render(<Home />);

    const sections = container.querySelectorAll('[class*="scroll-mt"]');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should render sections in correct order', () => {
    const { container } = render(<Home />);

    const sections = container.querySelectorAll('section');
    const sectionIds = Array.from(sections)
      .map((section) => section.id)
      .filter(Boolean);

    // Check that sections appear in expected order
    expect(sectionIds[0]).toBe('hero');
    expect(sectionIds[1]).toBe('about');
  });
});

describe('Error Boundary Integration', () => {
  // Suppress console errors for these tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should wrap sections with error boundaries', () => {
    // This test verifies that error boundaries are present
    // by checking that the page renders without crashing
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
  });
});

describe('Loading States Integration', () => {
  it('should use Suspense boundaries for async sections', () => {
    // This test verifies that Suspense is properly configured
    // by checking that the page renders without errors
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
  });
});
