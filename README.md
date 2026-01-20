# Developer Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🚀 Next.js 15 with App Router
- 🎨 Tailwind CSS for styling
- 🌙 Dark/Light theme support
- 📱 Fully responsive design
- ⚡ Framer Motion animations
- 🔄 GitHub API integration
- 📧 Contact form functionality
- 🧪 Comprehensive testing with Jest and Fast-check

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── layout/         # Layout components
├── services/           # API clients and external services
├── hooks/              # Custom React hooks
├── store/              # Zustand state management
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── config/             # Configuration files

tests/
├── unit/               # Unit tests
├── properties/         # Property-based tests
└── fixtures/           # Test data and mocks
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## Technologies

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: SWR
- **Testing**: Jest, React Testing Library, Fast-check
- **Linting**: ESLint, Prettier