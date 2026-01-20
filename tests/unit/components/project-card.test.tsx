import { render, screen } from '@testing-library/react';
import { ProjectCard } from '@/components/projects/project-card';
import { Project } from '@/types';

describe('ProjectCard', () => {
  const mockProject: Project = {
    id: '1',
    title: 'Test Project',
    description: 'A test project description',
    technologies: ['React', 'TypeScript', 'Next.js'],
    githubUrl: 'https://github.com/test/project',
    liveUrl: 'https://example.com',
    featured: false,
    category: 'web-app',
    highlights: ['Feature 1', 'Feature 2', 'Feature 3'],
  };

  it('should render project title and description', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project description')).toBeInTheDocument();
  });

  it('should render all technologies', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('should render external links with correct attributes', () => {
    render(<ProjectCard project={mockProject} />);
    
    const liveLink = screen.getByText('View Live').closest('a');
    const codeLink = screen.getByText('View Code').closest('a');
    
    expect(liveLink).toHaveAttribute('href', 'https://example.com');
    expect(liveLink).toHaveAttribute('target', '_blank');
    expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    expect(codeLink).toHaveAttribute('href', 'https://github.com/test/project');
    expect(codeLink).toHaveAttribute('target', '_blank');
    expect(codeLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should render featured badge when featured is true', () => {
    render(<ProjectCard project={mockProject} featured={true} />);
    
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('should not render featured badge when featured is false', () => {
    render(<ProjectCard project={mockProject} featured={false} />);
    
    expect(screen.queryByText('Featured')).not.toBeInTheDocument();
  });

  it('should render category badge', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('web-app')).toBeInTheDocument();
  });

  it('should render highlights', () => {
    render(<ProjectCard project={mockProject} />);
    
    expect(screen.getByText('Feature 1')).toBeInTheDocument();
    expect(screen.getByText('Feature 2')).toBeInTheDocument();
    expect(screen.getByText('Feature 3')).toBeInTheDocument();
  });

  it('should apply featured styling when featured prop is true', () => {
    const { container } = render(<ProjectCard project={mockProject} featured={true} />);
    
    const card = container.querySelector('[data-featured="true"]');
    expect(card).toBeInTheDocument();
  });

  it('should handle projects without optional fields', () => {
    const minimalProject: Project = {
      id: '2',
      title: 'Minimal Project',
      description: 'Basic description',
      technologies: ['JavaScript'],
      featured: false,
    };

    render(<ProjectCard project={minimalProject} />);
    
    expect(screen.getByText('Minimal Project')).toBeInTheDocument();
    expect(screen.queryByText('View Live')).not.toBeInTheDocument();
    expect(screen.queryByText('View Code')).not.toBeInTheDocument();
  });
});
