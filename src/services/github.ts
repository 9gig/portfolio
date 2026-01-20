import { GitHubProfile, GitHubRepository } from '@/types';

export interface RepositoryOptions {
  sort?: 'created' | 'updated' | 'pushed' | 'full_name';
  direction?: 'asc' | 'desc';
  per_page?: number;
  page?: number;
}

interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
}

interface FetchOptions {
  maxRetries?: number;
  initialDelay?: number;
}

export class GitHubService {
  private baseUrl = 'https://api.github.com';
  private username: string;
  private token?: string;
  private rateLimitInfo: RateLimitInfo | null = null;

  constructor(username: string, token?: string) {
    this.username = username;
    this.token = token;
  }

  /**
   * Fetch with exponential backoff and rate limiting
   */
  private async fetchWithRetry(
    url: string,
    options: FetchOptions = {}
  ): Promise<Response> {
    const { maxRetries = 3, initialDelay = 1000 } = options;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        // Check if we're rate limited
        if (this.rateLimitInfo && this.rateLimitInfo.remaining === 0) {
          const now = Date.now();
          const resetTime = this.rateLimitInfo.reset * 1000;
          
          if (now < resetTime) {
            const waitTime = resetTime - now;
            console.warn(`Rate limited. Waiting ${waitTime}ms until reset.`);
            await this.sleep(waitTime);
          }
        }

        const headers: HeadersInit = {
          'Accept': 'application/vnd.github.v3+json',
        };

        if (this.token) {
          headers['Authorization'] = `Bearer ${this.token}`;
        }

        const response = await fetch(url, { headers });

        // Update rate limit info from response headers
        this.updateRateLimitInfo(response);

        // Handle rate limiting
        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          const delay = retryAfter 
            ? parseInt(retryAfter) * 1000 
            : initialDelay * Math.pow(2, attempt);
          
          console.warn(`Rate limited (429). Retrying after ${delay}ms`);
          await this.sleep(delay);
          continue;
        }

        // Handle other errors with exponential backoff
        if (!response.ok && response.status >= 500) {
          const delay = initialDelay * Math.pow(2, attempt) * (1 + Math.random() * 0.1); // Add jitter
          console.warn(`Server error (${response.status}). Retrying after ${delay}ms`);
          await this.sleep(delay);
          continue;
        }

        return response;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        if (attempt < maxRetries - 1) {
          const delay = initialDelay * Math.pow(2, attempt) * (1 + Math.random() * 0.1); // Add jitter
          console.warn(`Request failed. Retrying after ${delay}ms`, error);
          await this.sleep(delay);
        }
      }
    }

    throw lastError || new Error('Max retries exceeded');
  }

  private updateRateLimitInfo(response: Response): void {
    const limit = response.headers.get('X-RateLimit-Limit');
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const reset = response.headers.get('X-RateLimit-Reset');

    if (limit && remaining && reset) {
      this.rateLimitInfo = {
        limit: parseInt(limit),
        remaining: parseInt(remaining),
        reset: parseInt(reset),
      };
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Fetch user profile with retry logic
   */
  async getProfile(): Promise<GitHubProfile> {
    const url = `${this.baseUrl}/users/${this.username}`;
    
    try {
      const response = await this.fetchWithRetry(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`GitHub user '${this.username}' not found`);
        }
        throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data as GitHubProfile;
    } catch (error) {
      console.error('Error fetching GitHub profile:', error);
      throw error;
    }
  }

  /**
   * Fetch all repositories with pagination
   */
  async getRepositories(options: RepositoryOptions = {}): Promise<GitHubRepository[]> {
    const {
      sort = 'updated',
      direction = 'desc',
      per_page = 100,
      page = 1,
    } = options;

    const params = new URLSearchParams({
      sort,
      direction,
      per_page: per_page.toString(),
      page: page.toString(),
    });

    const url = `${this.baseUrl}/users/${this.username}/repos?${params}`;

    try {
      const response = await this.fetchWithRetry(url);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`GitHub user '${this.username}' not found`);
        }
        throw new Error(`Failed to fetch repositories: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data as GitHubRepository[];
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      throw error;
    }
  }

  /**
   * Fetch specific featured repositories
   */
  async getFeaturedRepositories(repoNames: string[]): Promise<GitHubRepository[]> {
    if (!repoNames || repoNames.length === 0) {
      return [];
    }

    try {
      const promises = repoNames.map(async (repoName) => {
        const url = `${this.baseUrl}/repos/${this.username}/${repoName}`;
        
        try {
          const response = await this.fetchWithRetry(url);
          
          if (!response.ok) {
            console.warn(`Failed to fetch repository '${repoName}': ${response.status}`);
            return null;
          }

          const data = await response.json();
          return data as GitHubRepository;
        } catch (error) {
          console.warn(`Error fetching repository '${repoName}':`, error);
          return null;
        }
      });

      const results = await Promise.all(promises);
      return results.filter((repo): repo is GitHubRepository => repo !== null);
    } catch (error) {
      console.error('Error fetching featured repositories:', error);
      throw error;
    }
  }
}