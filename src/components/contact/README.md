# Contact Components

This directory contains components for the contact form functionality.

## Components

### ContactForm

The main contact form component with client-side validation and state management.

**Features:**
- Required field validation (name, email, message)
- Email format validation
- Real-time error display
- Success/error state handling
- Accessible form with ARIA labels
- Disabled state during submission

**Props:**
- `onSuccess?: () => void` - Callback when form is successfully submitted
- `onError?: (error: string) => void` - Callback when form submission fails

**Usage:**
```tsx
import { ContactForm } from '@/components/contact';

<ContactForm 
  onSuccess={() => console.log('Message sent!')}
  onError={(error) => console.error(error)}
/>
```

### ContactSection

A complete contact section that includes the contact form and contact information display.

**Features:**
- Contact form
- Email and location display
- Social media links
- Responsive layout

**Usage:**
```tsx
import { ContactSection } from '@/components/contact';

<ContactSection />
```

## State Management

The contact form uses Zustand for state management. The store is located at `src/store/contact.ts`.

**Store Features:**
- Form data management
- Validation error tracking
- Submission status tracking
- Form reset functionality

## Service

The contact service (`src/services/contact.ts`) handles:
- Form validation
- Form submission (currently simulated, ready for backend integration)
- Error handling

## Hook

The `useContactForm` hook (`src/hooks/use-contact-form.ts`) provides a convenient interface to the contact form store.

## Backend Integration

To integrate with a real backend:

1. Update `src/services/contact.ts` in the `submitContactForm` method
2. Replace the simulated API call with a real fetch to your backend endpoint
3. Handle the response appropriately

Example:
```typescript
async submitContactForm(data: ContactFormData): Promise<ContactResponse> {
  const validation = this.validateFormData(data);
  if (!validation.valid) {
    return {
      success: false,
      message: 'Validation failed',
      error: Object.values(validation.errors).join(', '),
    };
  }

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: 'Failed to send message',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
```

## Validation Rules

- **Name**: Required, cannot be empty
- **Email**: Required, must be valid email format
- **Subject**: Optional
- **Message**: Required, minimum 10 characters

## Accessibility

The contact form is fully accessible:
- All form fields have associated labels
- Required fields are marked with asterisks and aria-required
- Error messages are announced to screen readers with aria-live
- Form validation errors are associated with fields using aria-describedby
- Focus management during submission
- Keyboard navigation support
