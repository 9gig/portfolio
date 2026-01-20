/**
 * Demo page for modern skills components
 * 
 * This page demonstrates the SkillBadgeModern and SkillsGrid components
 * with glassmorphism effects and animations.
 */

import { SkillsGrid } from '@/components/skills';

export default function DemoSkillsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Modern Skills Section
          </h1>
          <p className="text-gray-300 text-lg">
            Glassmorphism badges with hover effects and proficiency indicators
          </p>
        </div>

        <SkillsGrid />
      </div>
    </main>
  );
}
