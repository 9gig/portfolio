import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProjectGrid } from '@/components/projects/project-grid';
import { Project } from '@/types';

describe('ProjectGrid', () => {
  const mockProjects: Project[] = [
    {
      id: '1',
      title: 'Web App Project',
      description: 'A web application',
      technologies: ['React', 'TypeScript'],
      featured: true,
      category: 'web-app',
      startDate: '2023-01-01',
    },
    {
      id: '2',
      title: 'Mobile App Project',
      description: 'A mobile application',
      technologies: ['Flutter', 'Dart'],
      featured: false,
      category: 'mobile-app',
      startDate: '2023-06-01',
    },
    {
      id: '3',
      title: 'API Project',
      description: 'An API service',
      technologies: ['Node.js', 'Express'],
      featured: false,
      category: 'api',
      startDate: '2022-12-01',
    },
  ];

  it('should render all projects', () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    expect(screen.getByText('Web App Project')).toBeInTheDocument();
    expect(screen.getByText('Mobile App Project')).toBeInTheDocument();
    expect(screen.getByText('API Project')).toBeInTheDocument();
  });

  it('should show project count', () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    expect(screen.getByText('Showing 3 projects')).toBeInTheDocument();
  });

  it('should render category filters when showFilters is true', () => {
    render(<ProjectGrid projects={mockProjects} showFilters={true} />);
    
    expect(screen.getByText('All Projects')).toBeInTheDocument();
    expect(screen.getByText('Web Apps')).toBeInTheDocument();
    expect(screen.getByText('Mobile Apps')).toBeInTheDocument();
    expect(screen.getByText('APIs')).toBeInTheDocument();
  });

  it('should not render filters when showFilters is false', () => {
    render(<ProjectGrid projects={mockProjects} showFilters={false} />);
    
    expect(screen.queryByText('All Projects')).not.toBeInTheDocument();
  });

  it('should filter projects by category', async () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    // Click on Web Apps filter
    const webAppsButton = screen.getByText('Web Apps');
    fireEvent.click(webAppsButton);
    
    // Wait for animation and filtering
    await waitFor(() => {
      expect(screen.getByText('Showing 1 project')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Web App Project')).toBeInTheDocument();
  });

  it('should show all projects when "All Projects" filter is selected', async () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    // First filter to a specific category
    fireEvent.click(screen.getByText('Mobile Apps'));
    await waitFor(() => {
      expect(screen.getByText('Showing 1 project')).toBeInTheDocument();
    });
    
    // Then click "All Projects"
    fireEvent.click(screen.getByText('All Projects'));
    await waitFor(() => {
      expect(screen.getByText('Showing 3 projects')).toBeInTheDocument();
    });
  });

  it('should show empty state when no projects match filter', async () => {
    const projectsWithoutLibraries = mockProjects.filter(p => p.category !== 'library');
    render(<ProjectGrid projects={projectsWithoutLibraries} />);
    
    // Click on Libraries filter
    fireEvent.click(screen.getByText('Libraries'));
    
    // Wait for animation
    await waitFor(() => {
      expect(screen.getByText('Showing 0 projects')).toBeInTheDocument();
    });
  });

  it('should apply active styling to selected filter', () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    const webAppsButton = screen.getByText('Web Apps');
    fireEvent.click(webAppsButton);
    
    expect(webAppsButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('should sort featured projects first', () => {
    const { container } = render(<ProjectGrid projects={mockProjects} showFilters={false} />);
    
    const projectTitles = Array.from(container.querySelectorAll('h3')).map(
      (h3) => h3.textContent
    );
    
    // Featured project should be first
    expect(projectTitles[0]).toBe('Web App Project');
  });
});
