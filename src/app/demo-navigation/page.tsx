'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

export default function NavigationDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Modern Navigation
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Scroll down to see the navigation bar transform
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#about"
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Explore
            </a>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            About
          </h2>
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              This navigation bar features modern glassmorphism effects, smooth scroll behavior,
              and animated transitions. Notice how it becomes more opaque as you scroll down.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              The navigation links have animated underlines and active section highlighting.
              On mobile, the menu slides in from the right with staggered item animations.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-2xl font-bold mb-2 text-white">Project {i}</h3>
                <p className="text-gray-400">
                  A showcase of modern UI design with smooth animations and glassmorphism effects.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['React', 'TypeScript', 'Next.js', 'Tailwind', 'Framer Motion', 'Node.js', 'GraphQL', 'PostgreSQL'].map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-4 text-center"
              >
                <p className="font-semibold text-white">{skill}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl w-full"
        >
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent text-center">
            Contact
          </h2>
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
            <p className="text-lg text-gray-300 text-center mb-8">
              Try scrolling back up to see the navigation bar adapt to different sections.
              The active section is highlighted in the navigation.
            </p>
            <div className="flex justify-center">
              <a
                href="#home"
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Back to Top
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
