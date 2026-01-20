import { create } from 'zustand';
import { ContactFormData } from '@/types';
import { contactService } from '@/services/contact';

export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormState {
  formData: ContactFormData;
  isSubmitting: boolean;
  submitStatus: SubmitStatus;
  submitMessage: string;
  errors: Record<string, string>;

  updateField: (field: keyof ContactFormData, value: string) => void;
  setErrors: (errors: Record<string, string>) => void;
  submitForm: () => Promise<void>;
  resetForm: () => void;
}

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export const useContactFormStore = create<ContactFormState>((set, get) => ({
  formData: initialFormData,
  isSubmitting: false,
  submitStatus: 'idle',
  submitMessage: '',
  errors: {},

  updateField: (field, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: value,
      },
      // Clear error for this field when user starts typing
      errors: {
        ...state.errors,
        [field]: '',
      },
    }));
  },

  setErrors: (errors) => {
    set({ errors });
  },

  submitForm: async () => {
    const { formData } = get();

    // Validate form data
    const validation = contactService.validateFormData(formData);
    if (!validation.valid) {
      set({
        errors: validation.errors,
        submitStatus: 'error',
        submitMessage: 'Please fix the errors before submitting',
      });
      return;
    }

    // Submit form
    set({ isSubmitting: true, submitStatus: 'submitting', errors: {} });

    try {
      const response = await contactService.submitContactForm(formData);

      if (response.success) {
        set({
          isSubmitting: false,
          submitStatus: 'success',
          submitMessage: response.message,
          formData: initialFormData, // Reset form on success
        });
      } else {
        set({
          isSubmitting: false,
          submitStatus: 'error',
          submitMessage: response.error || response.message,
        });
      }
    } catch (error) {
      set({
        isSubmitting: false,
        submitStatus: 'error',
        submitMessage: 'An unexpected error occurred. Please try again.',
      });
    }
  },

  resetForm: () => {
    set({
      formData: initialFormData,
      isSubmitting: false,
      submitStatus: 'idle',
      submitMessage: '',
      errors: {},
    });
  },
}));
