'use client';

import { useContactForm } from '@/hooks/use-contact-form';

interface ContactFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function ContactForm({ onSuccess, onError }: ContactFormProps) {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    submitMessage,
    updateField,
    handleSubmit,
  } = useContactForm();

  // Call callbacks when status changes
  if (submitStatus === 'success' && onSuccess) {
    onSuccess();
  }
  if (submitStatus === 'error' && onError && submitMessage) {
    onError(submitMessage);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Name <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          disabled={isSubmitting}
          required
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={`
            w-full px-4 py-3 min-h-[44px] rounded-lg border text-base
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${errors.name 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-600'
            }
          `}
          placeholder="Your name"
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Email <span className="text-red-500" aria-label="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          disabled={isSubmitting}
          required
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={`
            w-full px-4 py-3 min-h-[44px] rounded-lg border text-base
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
            ${errors.email 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-600'
            }
          `}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject Field (Optional) */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={(e) => updateField('subject', e.target.value)}
          disabled={isSubmitting}
          className="
            w-full px-4 py-3 min-h-[44px] rounded-lg border text-base
            border-gray-300 dark:border-gray-600
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
          "
          placeholder="What's this about?"
        />
      </div>

      {/* Message Field */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Message <span className="text-red-500" aria-label="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          disabled={isSubmitting}
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          rows={6}
          className={`
            w-full px-4 py-3 min-h-[120px] rounded-lg border text-base
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-gray-100
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:opacity-50 disabled:cursor-not-allowed
            resize-vertical
            ${errors.message 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-gray-600'
            }
          `}
          placeholder="Your message..."
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Status Message */}
      {submitMessage && (
        <div
          className={`
            p-4 rounded-lg
            ${submitStatus === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
              : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200'
            }
          `}
          role="alert"
          aria-live="polite"
        >
          {submitMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full px-6 py-3 min-h-[48px] rounded-lg text-base
          bg-blue-600 hover:bg-blue-700
          text-white font-medium
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
        "
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
