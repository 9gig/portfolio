import React from 'react';
import { render, screen } from '@testing-library/react';
import { SkillCategory } from '@/components/skills/skill-category';
import { SkillCategory as SkillCategoryType } from '@/types';

describe('SkillCategory', () => {
  it('should render category name', () => {
    const category: SkillCategoryType = {
      name: 'Languages',
      skills: [
        { name: 'TypeScript' },
        { name: 'JavaScript' },
      ],
    };

    render(<SkillCategory category={category} />);
    
    expect(screen.getByText('Languages')).toBeInTheDocument();
  });

  it('should render all skills in category', () => {
    const category: SkillCategoryType = {
      name: 'Frameworks',
      skills: [
        { name: 'React' },
        { name: 'Next.js' },
        { name: 'Vue' },
      ],
    };

    render(<SkillCategory category={category} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Vue')).toBeInTheDocument();
  });

  it('should have correct data attributes', () => {
    const category: SkillCategoryType = {
      name: 'Tools',
      skills: [{ name: 'Git' }],
    };

    const { container } = render(<SkillCategory category={category} />);
    
    const categoryElement = container.querySelector('[data-testid="skill-category"]');
    expect(categoryElement).toHaveAttribute('data-category-name', 'Tools');
  });

  it('should render empty category without errors', () => {
    const category: SkillCategoryType = {
      name: 'Empty Category',
      skills: [],
    };

    render(<SkillCategory category={category} />);
    
    expect(screen.getByText('Empty Category')).toBeInTheDocument();
  });
});
