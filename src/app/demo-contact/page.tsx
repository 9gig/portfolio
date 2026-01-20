/**
 * Demo page for Modern Contact Form
 * 
 * Showcases the ContactFormModern component with glassmorphism design,
 * floating labels, and animated interactions.
 */

'use client';

import { ContactFormModern } from '@/components/contact';

export default function DemoContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Modern Contact Form
          </h1>
          <p className="text-xl text-gray-300">
            Experience the modern contact form with glassmorphism, floating labels, and smooth animations
          </p>
        </div>

        {/* Contact Form */}
        <ContactFormModern
          onSuccess={() => console.log('Form submitted successfully!')}
          onError={(error) => console.error('Form error:', error)}
        />

        {/* Features List */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              ✨ Floating Labels
            </h3>
            <p className="text-gray-300">
              Labels animate smoothly when you focus on input fields, providing a clean and modern experience.
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              🎨 Gradient Borders
            </h3>
            <p className="text-gray-300">
              Input fields feature beautiful gradient borders on focus, adding visual interest and feedback.
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              🔄 Loading States
            </h3>
            <p className="text-gray-300">
              Animated loading spinner and success/error states provide clear feedback during form submission.
            </p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-3">
              ♿ Accessible
            </h3>
            <p className="text-gray-300">
              Fully accessible with ARIA attributes, keyboard navigation, and reduced motion support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
