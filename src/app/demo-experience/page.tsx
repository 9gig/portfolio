/**
 * Experience Timeline Demo Page
 * 
 * Demonstrates the Timeline and ExperienceCard components
 */

import { Timeline } from '@/components/experience';

export default function ExperienceDemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Experience Timeline Demo
        </h1>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          This page demonstrates the modern experience timeline with glassmorphism cards,
          staggered animations, and alternating layout.
        </p>
        
        <Timeline />
      </div>
    </main>
  );
}
