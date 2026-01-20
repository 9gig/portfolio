import React from 'react';
import { render, screen } from '@testing-library/react';
import { SkillsSection } from '@/components/skills/skills-section';

// Mock the useSiteConfig hook
jest.mock('@/hooks/use-site-config', () => ({
  useSiteConfig: jest.fn(),
}));

import { useSiteConfig } from '@/hooks/use-site-config';

const mockUseSiteConfig = useSiteConfig as jest.MockedFunction<typeof useSiteConfig>;

describe('SkillsSection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render skills section with categories', () => {
    mockUseSiteConfig.mockReturnValue({
      features: { showSkills: true },
      skills: [
        {
          name: 'Languages',
          skills: [
            { name: 'TypeScript', proficiency: 'expert' },
            { name: 'JavaScript', proficiency: 'expert' },
          ],
        },
        {
          name: 'Frameworks',
          skills: [
            { name: 'React', proficiency: 'expert' },
          ],
        },
      ],
    } as any);

    render(<SkillsSection />);
    
    expect(screen.getByText('Skills & Technologies')).toBeInTheDocument();
    expect(screen.getByText('Languages')).toBeInTheDocument();
    expect(screen.getByText('Frameworks')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('should not render when showSkills is false', () => {
    mockUseSiteConfig.mockReturnValue({
      features: { showSkills: false },
      skills: [
        {
          name: 'Languages',
          skills: [{ name: 'TypeScript' }],
        },
      ],
    } as any);

    const { container } = render(<SkillsSection />);
    
    expect(container.firstChild).toBeNull();
  });

  it('should not render when skills array is empty', () => {
    mockUseSiteConfig.mockReturnValue({
      features: { showSkills: true },
      skills: [],
    } as any);

    const { container } = render(<SkillsSection />);
    
    expect(container.firstChild).toBeNull();
  });

  it('should have proper semantic HTML structure', () => {
    mockUseSiteConfig.mockReturnValue({
      features: { showSkills: true },
      skills: [
        {
          name: 'Languages',
          skills: [{ name: 'TypeScript' }],
        },
      ],
    } as any);

    const { container } = render(<SkillsSection />);
    
    const section = container.querySelector('section#skills');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', 'skills-heading');
    
    const heading = screen.getByRole('heading', { level: 2, name: /Skills & Technologies/i });
    expect(heading).toHaveAttribute('id', 'skills-heading');
  });
});
