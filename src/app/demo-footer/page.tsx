'use client';

import { FooterModern } from '@/components/layout/footer-modern';

export default function FooterDemoPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Demo content to show footer at bottom */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Modern Footer Demo
          </h1>
          
          <p className="text-gray-400 text-center text-lg">
            Scroll down to see the modern footer with glassmorphism effects and animated social icons.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
              <ul className="space-y-2 text-gray-400">
                <li>✨ Glassmorphism design</li>
                <li>🎨 Gradient background</li>
                <li>🔗 Animated social icons</li>
                <li>🎯 Hover effects with scale and rotation</li>
                <li>💫 Smooth color transitions</li>
                <li>📱 Fully responsive</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Requirements</h2>
              <ul className="space-y-2 text-gray-400">
                <li>✅ Requirement 18.1: Glassmorphism footer</li>
                <li>✅ Requirement 18.2: Social icon hover effects</li>
                <li>✅ Requirement 18.3: Display social links</li>
                <li>✅ Requirement 18.4: Scale and rotation effects</li>
              </ul>
            </div>
          </div>

          {/* Spacer to push footer down */}
          <div className="h-96" />
        </div>
      </div>

      {/* Modern Footer */}
      <FooterModern />
    </div>
  );
}
