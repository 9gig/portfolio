import { siteConfig } from './site';
import { validateSiteConfig } from '@/lib/config-validator';

describe('Site Configuration', () => {
  it('should have valid configuration', () => {
    const result = validateSiteConfig(siteConfig);
    
    if (!result.valid) {
      console.error('Configuration errors:', result.errors);
    }
    
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should have required basic fields', () => {
    expect(siteConfig.name).toBeTruthy();
    expect(siteConfig.title).toBeTruthy();
    expect(siteConfig.description).toBeTruthy();
    expect(siteConfig.url).toBeTruthy();
  });

  it('should have valid author information', () => {
    expect(siteConfig.author.name).toBeTruthy();
    expect(siteConfig.author.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(siteConfig.author.bio).toBeTruthy();
    expect(siteConfig.author.avatar).toBeTruthy();
    expect(siteConfig.author.location).toBeTruthy();
  });

  it('should have valid GitHub configuration', () => {
    expect(siteConfig.github.username).toBeTruthy();
    expect(Array.isArray(siteConfig.github.featured_repos)).toBe(true);
  });

  it('should have valid theme configuration', () => {
    expect(['light', 'dark', 'system']).toContain(siteConfig.theme.defaultTheme);
  });

  it('should have valid feature flags', () => {
    expect(typeof siteConfig.features.showGitHubStats).toBe('boolean');
    expect(typeof siteConfig.features.showExperience).toBe('boolean');
    expect(typeof siteConfig.features.showSkills).toBe('boolean');
    expect(typeof siteConfig.features.showProjects).toBe('boolean');
    expect(typeof siteConfig.features.showContact).toBe('boolean');
    expect(typeof siteConfig.features.enableAnimations).toBe('boolean');
  });

  it('should have valid skills structure', () => {
    expect(Array.isArray(siteConfig.skills)).toBe(true);
    
    siteConfig.skills.forEach(category => {
      expect(category.name).toBeTruthy();
      expect(Array.isArray(category.skills)).toBe(true);
      
      category.skills.forEach(skill => {
        expect(skill.name).toBeTruthy();
        
        if (skill.proficiency) {
          expect(['beginner', 'intermediate', 'advanced', 'expert']).toContain(skill.proficiency);
        }
      });
    });
  });

  it('should have valid experience structure', () => {
    expect(Array.isArray(siteConfig.experience)).toBe(true);
    
    siteConfig.experience.forEach(exp => {
      expect(exp.id).toBeTruthy();
      expect(exp.company).toBeTruthy();
      expect(exp.role).toBeTruthy();
      expect(exp.startDate).toBeTruthy();
      expect(exp.location).toBeTruthy();
      expect(exp.description).toBeTruthy();
      expect(Array.isArray(exp.achievements)).toBe(true);
      expect(Array.isArray(exp.technologies)).toBe(true);
    });
  });

  it('should have valid projects structure', () => {
    expect(Array.isArray(siteConfig.projects)).toBe(true);
    
    siteConfig.projects.forEach(project => {
      expect(project.id).toBeTruthy();
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(Array.isArray(project.technologies)).toBe(true);
      expect(typeof project.featured).toBe('boolean');
    });
  });

  it('should have valid CV configuration', () => {
    expect(siteConfig.cv.filename).toBeTruthy();
    expect(siteConfig.cv.path).toBeTruthy();
  });
});
