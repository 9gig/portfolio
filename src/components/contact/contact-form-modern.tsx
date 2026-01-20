/**
 * ContactFormModern Component
 * 
 * A modern contact form with glassmorphism design, floating labels,
 * gradient borders on focus, and smooth animations.
 * 
 * Requirements: 10.1, 10.2, 10.3, 10.4, 10.6
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactForm } from '@/hooks/use-contact-form';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { GradientButton } from '@/components/ui/gradient-button';
import { cn } from '@/lib/utils';
import { animations } from '@/styles/design-tokens';

interface ContactFormModernProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function ContactFormModern({ onSuccess, onError }: ContactFormModernProps) {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    submitMessage,
    updateField,
    handleSubmit,
  } = useContactForm();

  const prefersReducedMotion = useReducedMotion();
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Call callbacks when status changes
  React.useEffect(() => {
    if (submitStatus === 'success' && onSuccess) {
      onSuccess();
    }
    if (submitStatus === 'error' && onError && submitMessage) {
      onError(submitMessage);
    }
  }, [submitStatus, submitMessage, onSuccess, onError]);

  return (
    <GlassCard
      className="w-full max-w-2xl mx-auto"
      size="lg"
      hover={false}
    >
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name Field */}
        <FloatingLabelInput
          id="name"
          name="name"
          type="text"
          label="Your Name"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField(null)}
          isFocused={focusedField === 'name'}
          error={errors.name}
          disabled={isSubmitting}
          required
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Email Field */}
        <FloatingLabelInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          isFocused={focusedField === 'email'}
          error={errors.email}
          disabled={isSubmitting}
          required
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Subject Field (Optional) */}
        <FloatingLabelInput
          id="subject"
          name="subject"
          type="text"
          label="Subject"
          value={formData.subject}
          onChange={(e) => updateField('subject', e.target.value)}
          onFocus={() => setFocusedField('subject')}
          onBlur={() => setFocusedField(null)}
          isFocused={focusedField === 'subject'}
          disabled={isSubmitting}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Message Field */}
        <FloatingLabelTextarea
          id="message"
          name="message"
          label="Your Message"
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          onFocus={() => setFocusedField('message')}
          onBlur={() => setFocusedField(null)}
          isFocused={focusedField === 'message'}
          error={errors.message}
          disabled={isSubmitting}
          required
          rows={5}
          prefersReducedMotion={prefersReducedMotion}
        />

        {/* Submit Status Message */}
        <AnimatePresence mode="wait">
          {submitMessage && (
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
              transition={{ duration: animations.durations.normal / 1000 }}
              className={cn(
                'p-4 rounded-lg backdrop-blur-sm',
                submitStatus === 'success'
                  ? 'bg-green-500/20 border border-green-500/30 text-green-200'
                  : 'bg-red-500/20 border border-red-500/30 text-red-200'
              )}
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-center gap-2">
                {submitStatus === 'success' ? (
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
                <span>{submitMessage}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit Button */}
        <AnimatedSubmitButton
          isSubmitting={isSubmitting}
          submitStatus={submitStatus}
          prefersReducedMotion={prefersReducedMotion}
        />
      </form>
    </GlassCard>
  );
}

/**
 * FloatingLabelInput - Input field with animated floating label
 */
interface FloatingLabelInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isFocused?: boolean;
  prefersReducedMotion?: boolean;
}

function FloatingLabelInput({
  id,
  label,
  value,
  error,
  isFocused = false,
  required = false,
  prefersReducedMotion = false,
  className,
  ...props
}: FloatingLabelInputProps) {
  const hasValue = value !== undefined && value !== '';
  const isFloating = isFocused || hasValue;

  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: isFloating ? -24 : 12,
                scale: isFloating ? 0.85 : 1,
                color: isFocused
                  ? 'rgb(102, 126, 234)'
                  : error
                  ? 'rgb(239, 68, 68)'
                  : 'rgb(156, 163, 175)',
              }
        }
        transition={{
          duration: animations.durations.fast / 1000,
          ease: animations.easings.easeOut,
        }}
        className={cn(
          'absolute left-4 pointer-events-none origin-left',
          'transition-colors duration-200',
          isFloating ? 'text-xs' : 'text-base'
        )}
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </motion.label>

      <input
        id={id}
        value={value}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'w-full px-4 py-3 min-h-[44px] rounded-lg',
          'bg-transparent border-2 transition-all duration-300',
          'text-white placeholder-transparent',
          'focus:outline-none',
          error
            ? 'border-red-500/50 focus:border-red-500'
            : isFocused
            ? 'border-transparent focus:border-transparent'
            : 'border-white/20 hover:border-white/30',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        style={
          isFocused && !error
            ? {
                borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1',
              }
            : undefined
        }
        {...props}
      />

      {error && (
        <motion.p
          id={`${id}-error`}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -5 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-400"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

/**
 * FloatingLabelTextarea - Textarea field with animated floating label
 */
interface FloatingLabelTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  isFocused?: boolean;
  prefersReducedMotion?: boolean;
}

function FloatingLabelTextarea({
  id,
  label,
  value,
  error,
  isFocused = false,
  required = false,
  prefersReducedMotion = false,
  className,
  ...props
}: FloatingLabelTextareaProps) {
  const hasValue = value !== undefined && value !== '';
  const isFloating = isFocused || hasValue;

  return (
    <div className="relative">
      <motion.label
        htmlFor={id}
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: isFloating ? -24 : 12,
                scale: isFloating ? 0.85 : 1,
                color: isFocused
                  ? 'rgb(102, 126, 234)'
                  : error
                  ? 'rgb(239, 68, 68)'
                  : 'rgb(156, 163, 175)',
              }
        }
        transition={{
          duration: animations.durations.fast / 1000,
          ease: animations.easings.easeOut,
        }}
        className={cn(
          'absolute left-4 pointer-events-none origin-left',
          'transition-colors duration-200',
          isFloating ? 'text-xs' : 'text-base'
        )}
      >
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </motion.label>

      <textarea
        id={id}
        value={value}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'w-full px-4 py-3 min-h-[120px] rounded-lg',
          'bg-transparent border-2 transition-all duration-300',
          'text-white placeholder-transparent resize-vertical',
          'focus:outline-none',
          error
            ? 'border-red-500/50 focus:border-red-500'
            : isFocused
            ? 'border-transparent focus:border-transparent'
            : 'border-white/20 hover:border-white/30',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        style={
          isFocused && !error
            ? {
                borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1',
              }
            : undefined
        }
        {...props}
      />

      {error && (
        <motion.p
          id={`${id}-error`}
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -5 }}
          animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-400"
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

/**
 * AnimatedSubmitButton - Submit button with loading and success/error animations
 */
interface AnimatedSubmitButtonProps {
  isSubmitting: boolean;
  submitStatus: 'idle' | 'submitting' | 'success' | 'error';
  prefersReducedMotion?: boolean;
}

function AnimatedSubmitButton({
  isSubmitting,
  submitStatus,
  prefersReducedMotion = false,
}: AnimatedSubmitButtonProps) {
  return (
    <GradientButton
      type="submit"
      disabled={isSubmitting}
      fullWidth
      size="lg"
      gradient="primary"
      disableAnimation={prefersReducedMotion}
      className="relative overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {isSubmitting ? (
          <motion.span
            key="submitting"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={prefersReducedMotion ? {} : { opacity: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={prefersReducedMotion ? {} : { rotate: 360 }}
              transition={
                prefersReducedMotion
                  ? {}
                  : {
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }
              }
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </motion.svg>
            Sending...
          </motion.span>
        ) : submitStatus === 'success' ? (
          <motion.span
            key="success"
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
            animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Message Sent!
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={prefersReducedMotion ? {} : { opacity: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0 }}
            className="flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            Send Message
          </motion.span>
        )}
      </AnimatePresence>
    </GradientButton>
  );
}
