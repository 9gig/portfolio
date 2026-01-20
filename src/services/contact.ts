import { ContactFormData } from '@/types';

export interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export class ContactService {
  /**
   * Validate email format using a simple regex
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate form data
   */
  validateFormData(data: ContactFormData): ValidationResult {
    const errors: Record<string, string> = {};

    // Validate name
    if (!data.name.trim()) {
      errors.name = 'Name is required';
    }

    // Validate email
    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!this.isValidEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Validate message
    if (!data.message.trim()) {
      errors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  }

  /**
   * Submit contact form data
   * This is a placeholder implementation that simulates an API call
   * In production, this would call a real backend endpoint
   */
  async submitContactForm(data: ContactFormData): Promise<ContactResponse> {
    // Validate data first
    const validation = this.validateFormData(data);
    if (!validation.valid) {
      return {
        success: false,
        message: 'Validation failed',
        error: Object.values(validation.errors).join(', '),
      };
    }

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In production, this would be a real API call:
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Failed to send message');
      // }
      // 
      // return await response.json();

      // For now, simulate success
      console.log('Contact form submitted:', data);

      return {
        success: true,
        message: 'Message sent successfully! I will get back to you soon.',
      };
    } catch (error) {
      console.error('Error submitting contact form:', error);
      return {
        success: false,
        message: 'Failed to send message',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Export a singleton instance
export const contactService = new ContactService();
