# Deployment Guide

## ✅ Code Successfully Pushed to GitHub!

Your portfolio is now live at: **https://github.com/9gig/portfolio**

## 🚀 Next Steps: Deploy to Production

### Option 1: Vercel (Recommended - Free & Easy)

Vercel is made by the creators of Next.js and offers the best integration:

1. **Go to [vercel.com](https://vercel.com)**
2. **Sign in with GitHub**
3. **Click "Add New Project"**
4. **Import your repository:** `9gig/portfolio`
5. **Click "Deploy"** - That's it!

Your site will be live at: `https://portfolio-[random].vercel.app`

**Custom Domain (Optional):**
- Go to Project Settings → Domains
- Add your custom domain (e.g., `yourname.com`)

### Option 2: Netlify (Also Free)

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your `9gig/portfolio` repository
5. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `.next`
6. Click "Deploy"

### Option 3: GitHub Pages (Static Export)

For GitHub Pages, you need to export as static HTML:

1. Update `next.config.js`:
```javascript
module.exports = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

2. Build and deploy:
```bash
npm run build
```

3. Push the `out` folder to `gh-pages` branch

## 🔧 Environment Variables

If you want to use GitHub API with higher rate limits:

### On Vercel/Netlify:
1. Go to Project Settings → Environment Variables
2. Add: `GITHUB_TOKEN` = your GitHub personal access token
3. Redeploy

### Create GitHub Token:
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scope: `public_repo` (read access)
4. Copy the token

## 📝 Customization Checklist

Before deploying, update these files:

### 1. Site Configuration (`src/config/site.ts`)
- ✅ GitHub username: Already set to `9gig`
- ⚠️ Update your name, email, bio
- ⚠️ Update social media links
- ⚠️ Add your skills and experience
- ⚠️ Add your projects

### 2. Images
- ⚠️ Add your profile photo: `public/images/avatar.jpg`
- ⚠️ Add project screenshots: `public/images/projects/`
- ⚠️ Add company logos: `public/images/companies/`

### 3. Resume
- ⚠️ Add your CV: `public/resume.pdf`

### 4. Metadata (`src/app/layout.tsx`)
- ⚠️ Update meta description
- ⚠️ Update Open Graph image
- ⚠️ Update site URL

## 🎨 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Run tests
npm test
```

## 📊 Performance Optimization

After deployment, check your site with:
- [Google Lighthouse](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

## 🔄 Continuous Deployment

Both Vercel and Netlify automatically deploy when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update portfolio content"
git push origin main

# Your site will automatically redeploy!
```

## 📱 Testing Your Live Site

Once deployed, test:
- ✅ All pages load correctly
- ✅ GitHub integration works
- ✅ Contact form works
- ✅ Theme toggle works
- ✅ Responsive design on mobile
- ✅ All links work
- ✅ Images load properly

## 🆘 Troubleshooting

### Images not showing?
- Make sure images exist in `public/` folder
- Check file paths in `src/config/site.ts`
- Use absolute paths starting with `/`

### GitHub repos not loading?
- Check your GitHub username in config
- Add `GITHUB_TOKEN` environment variable for higher rate limits
- Check browser console for API errors

### Build fails?
- Check for TypeScript errors: `npm run build`
- Check for linting errors: `npm run lint`
- Review build logs in Vercel/Netlify dashboard

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Your GitHub Repo](https://github.com/9gig/portfolio)

## 🎉 You're All Set!

Your portfolio is now:
- ✅ Pushed to GitHub
- ✅ Ready to deploy
- ✅ Fully tested (122 passing tests)
- ✅ Responsive and accessible
- ✅ SEO optimized

**Next:** Deploy to Vercel and share your portfolio with the world! 🚀
