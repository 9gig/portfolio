import React from 'react';
import { render, screen } from '@testing-library/react';
import { SkillBadge } from '@/components/skills/skill-badge';
import { Skill } from '@/types';

describe('SkillBadge', () => {
  it('should render skill name', () => {
    const skill: Skill = {
      name: 'TypeScript',
    };

    render(<SkillBadge skill={skill} category="Languages" />);
    
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('should render skill with proficiency indicator', () => {
    const skill: Skill = {
      name: 'React',
      proficiency: 'expert',
    };

    const { container } = render(<SkillBadge skill={skill} category="Frameworks" />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(container.querySelector('[aria-label*="Proficiency"]')).toBeInTheDocument();
  });

  it('should render skill with icon', () => {
    const skill: Skill = {
      name: 'JavaScript',
      icon: '📘',
    };

    render(<SkillBadge skill={skill} category="Languages" />);
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('📘')).toBeInTheDocument();
  });

  it('should have correct data attributes', () => {
    const skill: Skill = {
      name: 'Python',
      proficiency: 'intermediate',
    };

    const { container } = render(<SkillBadge skill={skill} category="Languages" />);
    
    const badge = container.querySelector('[data-testid="skill-badge"]');
    expect(badge).toHaveAttribute('data-skill-name', 'Python');
    expect(badge).toHaveAttribute('data-category', 'Languages');
  });

  it('should apply correct proficiency color classes', () => {
    const expertSkill: Skill = {
      name: 'Expert Skill',
      proficiency: 'expert',
    };

    const { container: expertContainer } = render(
      <SkillBadge skill={expertSkill} category="Test" />
    );
    
    const expertBadge = expertContainer.querySelector('.bg-green-100');
    expect(expertBadge).toBeInTheDocument();
  });
});
