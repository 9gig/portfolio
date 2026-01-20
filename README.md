# Developer Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/9gig/portfolio)

## 🚀 Live Demo

**Coming Soon** - Deploy to Vercel in 5 minutes! See [QUICK_DEPLOY.md](QUICK_DEPLOY.md)

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

1. Clone the repository:
   ```bash
   git clone https://github.com/9gig/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your portfolio:
   - Edit `src/config/site.ts` with your information
   - Add your profile photo to `public/images/avatar.jpg`
   - Add your resume to `public/resume.pdf`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🚀 Deploy to Vercel

This portfolio is configured for automatic deployment to Vercel:

1. **Quick Deploy** (5 minutes):
   - See [QUICK_DEPLOY.md](QUICK_DEPLOY.md) for step-by-step guide
   - Or click: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/9gig/portfolio)

2. **Automatic Deployments**:
   - Every push to `main` automatically deploys
   - Pull requests get preview deployments
   - See [VERCEL_SETUP.md](VERCEL_SETUP.md) for details

## 📝 Customization

### Update Your Information

Edit `src/config/site.ts`:
```typescript
export const siteConfig = {
  name: 'Your Name',
  title: 'Your Title',
  author: {
    name: 'Your Name',
    email: 'your.email@example.com',
    bio: 'Your bio...',
    // ... more settings
  },
  github: {
    username: '9gig', // Your GitHub username
  },
  // ... more configuration
};
```

### Add Your Content

1. **Profile Photo**: `public/images/avatar.jpg`
2. **Resume/CV**: `public/resume.pdf`
3. **Project Images**: `public/images/projects/`
4. **Company Logos**: `public/images/companies/`

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
- **Testing**: Jest, React Testing Library, Fast-check (122 tests, 100% passing)
- **Linting**: ESLint, Prettier
- **Deployment**: Vercel (automatic on push)

## 📚 Documentation

- [Quick Deploy Guide](QUICK_DEPLOY.md) - Deploy to Vercel in 5 minutes
- [Vercel Setup](VERCEL_SETUP.md) - Detailed deployment configuration
- [Deployment Guide](DEPLOYMENT_GUIDE.md) - General deployment options
- [Test Report](COMPREHENSIVE_TEST_REPORT.md) - Testing coverage and results

## ✨ Features Implemented

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark/Light theme with persistence
- ✅ GitHub integration (profile & repositories)
- ✅ Project showcase with filtering
- ✅ Skills section with categories
- ✅ About section with bio
- ✅ Contact form with validation
- ✅ CV/Resume download
- ✅ SEO optimized (meta tags, sitemap, robots.txt)
- ✅ Accessibility compliant (WCAG AA)
- ✅ Smooth animations (respects reduced motion)
- ✅ Comprehensive testing (122 tests)

## 🧪 Testing

Run the test suite:
```bash
npm test                 # Run all tests
npm run test:coverage    # Run with coverage report
```

**Test Results:**
- 122 tests passing (100%)
- 42.6% code coverage
- Property-based tests (400+ test cases)
- Integration tests for user flows

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**9gig**
- GitHub: [@9gig](https://github.com/9gig)
- Portfolio: [Coming Soon]

---

Built with ❤️ using Next.js and TypeScript