import { FormEvent } from 'react';
import { useContactFormStore } from '@/store/contact';

export function useContactForm() {
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    submitMessage,
    updateField,
    submitForm,
    resetForm,
  } = useContactFormStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    submitMessage,
    updateField,
    handleSubmit,
    resetForm,
  };
}
