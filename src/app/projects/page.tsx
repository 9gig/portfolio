import { ProjectsSection } from '@/components/projects';
import { siteConfig } from '@/config/site';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <ProjectsSection
        manualProjects={siteConfig.projects}
        showGitHubRepos={false}
      />
    </main>
  );
}
