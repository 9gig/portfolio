import { SiteConfig } from '@/types';

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Validates the site configuration to ensure all required fields are present
 * and properly formatted.
 */
export function validateSiteConfig(config: SiteConfig): ValidationResult {
  const errors: ValidationError[] = [];

  // Validate basic site info
  if (!config.name || config.name.trim() === '') {
    errors.push({ field: 'name', message: 'Site name is required' });
  }

  if (!config.title || config.title.trim() === '') {
    errors.push({ field: 'title', message: 'Site title is required' });
  }

  if (!config.description || config.description.trim() === '') {
    errors.push({ field: 'description', message: 'Site description is required' });
  }

  if (!config.url || !isValidUrl(config.url)) {
    errors.push({ field: 'url', message: 'Valid site URL is required' });
  }

  // Validate author info
  if (!config.author.name || config.author.name.trim() === '') {
    errors.push({ field: 'author.name', message: 'Author name is required' });
  }

  if (!config.author.email || !isValidEmail(config.author.email)) {
    errors.push({ field: 'author.email', message: 'Valid author email is required' });
  }

  if (!config.author.bio || config.author.bio.trim() === '') {
    errors.push({ field: 'author.bio', message: 'Author bio is required' });
  }

  if (!config.author.avatar || config.author.avatar.trim() === '') {
    errors.push({ field: 'author.avatar', message: 'Author avatar path is required' });
  }

  // Validate GitHub config
  if (!config.github.username || config.github.username.trim() === '') {
    errors.push({ field: 'github.username', message: 'GitHub username is required' });
  }

  if (!Array.isArray(config.github.featured_repos)) {
    errors.push({ field: 'github.featured_repos', message: 'Featured repos must be an array' });
  }

  // Validate social links (optional but must be valid URLs if provided)
  if (config.social.github && !isValidUrl(config.social.github)) {
    errors.push({ field: 'social.github', message: 'GitHub URL must be valid' });
  }

  if (config.social.linkedin && !isValidUrl(config.social.linkedin)) {
    errors.push({ field: 'social.linkedin', message: 'LinkedIn URL must be valid' });
  }

  if (config.social.twitter && !isValidUrl(config.social.twitter)) {
    errors.push({ field: 'social.twitter', message: 'Twitter URL must be valid' });
  }

  if (config.social.email && !isValidEmail(config.social.email)) {
    errors.push({ field: 'social.email', message: 'Social email must be valid' });
  }

  // Validate skills
  if (!Array.isArray(config.skills)) {
    errors.push({ field: 'skills', message: 'Skills must be an array' });
  } else {
    config.skills.forEach((category, index) => {
      if (!category.name || category.name.trim() === '') {
        errors.push({ 
          field: `skills[${index}].name`, 
          message: 'Skill category name is required' 
        });
      }
      if (!Array.isArray(category.skills)) {
        errors.push({ 
          field: `skills[${index}].skills`, 
          message: 'Skills must be an array' 
        });
      } else {
        category.skills.forEach((skill, skillIndex) => {
          if (!skill.name || skill.name.trim() === '') {
            errors.push({ 
              field: `skills[${index}].skills[${skillIndex}].name`, 
              message: 'Skill name is required' 
            });
          }
          if (skill.proficiency && !['beginner', 'intermediate', 'advanced', 'expert'].includes(skill.proficiency)) {
            errors.push({ 
              field: `skills[${index}].skills[${skillIndex}].proficiency`, 
              message: 'Proficiency must be beginner, intermediate, advanced, or expert' 
            });
          }
        });
      }
    });
  }

  // Validate experience
  if (!Array.isArray(config.experience)) {
    errors.push({ field: 'experience', message: 'Experience must be an array' });
  } else {
    config.experience.forEach((exp, index) => {
      if (!exp.id || exp.id.trim() === '') {
        errors.push({ field: `experience[${index}].id`, message: 'Experience ID is required' });
      }
      if (!exp.company || exp.company.trim() === '') {
        errors.push({ field: `experience[${index}].company`, message: 'Company name is required' });
      }
      if (!exp.role || exp.role.trim() === '') {
        errors.push({ field: `experience[${index}].role`, message: 'Role is required' });
      }
      if (!exp.startDate || exp.startDate.trim() === '') {
        errors.push({ field: `experience[${index}].startDate`, message: 'Start date is required' });
      }
      if (!Array.isArray(exp.achievements)) {
        errors.push({ field: `experience[${index}].achievements`, message: 'Achievements must be an array' });
      }
      if (!Array.isArray(exp.technologies)) {
        errors.push({ field: `experience[${index}].technologies`, message: 'Technologies must be an array' });
      }
      if (exp.companyUrl && !isValidUrl(exp.companyUrl)) {
        errors.push({ field: `experience[${index}].companyUrl`, message: 'Company URL must be valid' });
      }
    });
  }

  // Validate projects
  if (!Array.isArray(config.projects)) {
    errors.push({ field: 'projects', message: 'Projects must be an array' });
  } else {
    config.projects.forEach((project, index) => {
      if (!project.id || project.id.trim() === '') {
        errors.push({ field: `projects[${index}].id`, message: 'Project ID is required' });
      }
      if (!project.title || project.title.trim() === '') {
        errors.push({ field: `projects[${index}].title`, message: 'Project title is required' });
      }
      if (!project.description || project.description.trim() === '') {
        errors.push({ field: `projects[${index}].description`, message: 'Project description is required' });
      }
      if (!Array.isArray(project.technologies)) {
        errors.push({ field: `projects[${index}].technologies`, message: 'Technologies must be an array' });
      }
      if (project.liveUrl && !isValidUrl(project.liveUrl)) {
        errors.push({ field: `projects[${index}].liveUrl`, message: 'Live URL must be valid' });
      }
      if (project.githubUrl && !isValidUrl(project.githubUrl)) {
        errors.push({ field: `projects[${index}].githubUrl`, message: 'GitHub URL must be valid' });
      }
      if (typeof project.featured !== 'boolean') {
        errors.push({ field: `projects[${index}].featured`, message: 'Featured must be a boolean' });
      }
    });
  }

  // Validate theme
  if (!config.theme.defaultTheme || !['light', 'dark', 'system'].includes(config.theme.defaultTheme)) {
    errors.push({ 
      field: 'theme.defaultTheme', 
      message: 'Default theme must be light, dark, or system' 
    });
  }

  // Validate features
  const featureKeys = ['showGitHubStats', 'showExperience', 'showSkills', 'showProjects', 'showContact', 'enableAnimations'];
  featureKeys.forEach(key => {
    if (typeof config.features[key as keyof typeof config.features] !== 'boolean') {
      errors.push({ field: `features.${key}`, message: `${key} must be a boolean` });
    }
  });

  // Validate CV config
  if (!config.cv.filename || config.cv.filename.trim() === '') {
    errors.push({ field: 'cv.filename', message: 'CV filename is required' });
  }

  if (!config.cv.path || config.cv.path.trim() === '') {
    errors.push({ field: 'cv.path', message: 'CV path is required' });
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validates an email address format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a URL format
 */
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Throws an error if the configuration is invalid
 */
export function assertValidConfig(config: SiteConfig): void {
  const result = validateSiteConfig(config);
  if (!result.valid) {
    const errorMessages = result.errors.map(e => `${e.field}: ${e.message}`).join('\n');
    throw new Error(`Invalid site configuration:\n${errorMessages}`);
  }
}
