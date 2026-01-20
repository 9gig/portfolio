'use client';

import { useMemo } from 'react';
import { Project, GitHubRepository } from '@/types';
import { ProjectGrid } from './project-grid';

interface ProjectsSectionProps {
  manualProjects: Project[];
  githubRepositories?: GitHubRepository[];
  showGitHubRepos?: boolean;
  onProjectClick?: (project: Project) => void;
}

/**
 * Converts a GitHub repository to a Project format
 */
function convertGitHubRepoToProject(repo: GitHubRepository): Project {
  return {
    id: `github-${repo.id}`,
    title: repo.name,
    description: repo.description || 'No description available',
    technologies: repo.language ? [repo.language, ...repo.topics.slice(0, 4)] : repo.topics.slice(0, 5),
    githubUrl: repo.html_url,
    liveUrl: repo.homepage || undefined,
    featured: false,
    category: 'other',
  };
}

export function ProjectsSection({
  manualProjects,
  githubRepositories = [],
  showGitHubRepos = true,
  onProjectClick,
}: ProjectsSectionProps) {
  // Combine manual projects with GitHub repositories
  const allProjects = useMemo(() => {
    const projects = [...manualProjects];

    if (showGitHubRepos && githubRepositories.length > 0) {
      // Convert GitHub repos to projects
      const githubProjects = githubRepositories.map(convertGitHubRepoToProject);
      
      // Filter out GitHub repos that are already in manual projects
      const manualGitHubUrls = new Set(
        manualProjects
          .filter((p) => p.githubUrl)
          .map((p) => p.githubUrl?.toLowerCase())
      );

      const uniqueGitHubProjects = githubProjects.filter(
        (gp) => !manualGitHubUrls.has(gp.githubUrl?.toLowerCase())
      );

      projects.push(...uniqueGitHubProjects);
    }

    return projects;
  }, [manualProjects, githubRepositories, showGitHubRepos]);

  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            A collection of my work, including featured projects and open-source contributions
          </p>
        </div>

        <ProjectGrid 
          projects={allProjects} 
          showFilters={true}
          onProjectClick={onProjectClick}
        />
      </div>
    </section>
  );
}
