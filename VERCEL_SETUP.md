# Vercel Deployment Setup Guide

## 🚀 Automatic Deployment on Every Push

Follow these steps to set up automatic deployment to Vercel whenever you push to GitHub.

## Step 1: Connect to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. **Go to [vercel.com](https://vercel.com)**

2. **Sign in with GitHub**
   - Click "Continue with GitHub"
   - Authorize Vercel to access your repositories

3. **Import Your Repository**
   - Click "Add New..." → "Project"
   - Find and select `9gig/portfolio`
   - Click "Import"

4. **Configure Project**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

5. **Environment Variables (Optional)**
   - Click "Environment Variables"
   - Add `GITHUB_TOKEN` if you want higher GitHub API rate limits
   - Value: Your GitHub Personal Access Token

6. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes for the first build
   - Your site will be live! 🎉

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? portfolio (or your choice)
# - Directory? ./
# - Override settings? No

# For production deployment
vercel --prod
```

## Step 2: Verify Automatic Deployment

Once connected, Vercel will automatically:

✅ **Deploy on every push to `main` branch**
✅ **Create preview deployments for pull requests**
✅ **Run builds and show deployment status**
✅ **Provide unique URLs for each deployment**

### Test It:

1. Make a small change locally:
```bash
# Edit any file, for example:
echo "# Updated" >> README.md
```

2. Commit and push:
```bash
git add .
git commit -m "Test automatic deployment"
git push origin main
```

3. Watch the magic happen:
   - Go to your Vercel dashboard
   - You'll see a new deployment starting
   - GitHub will show deployment status
   - You'll get a notification when it's live

## Step 3: Get Your Live URL

After deployment, you'll get:

- **Production URL:** `https://portfolio-9gig.vercel.app` (or similar)
- **Custom Domain:** You can add your own domain in settings

### Add Custom Domain:

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Add your domain (e.g., `yourname.com`)
4. Follow DNS configuration instructions
5. Done! Your site will be live on your custom domain

## Step 4: Configure Deployment Settings

### Build & Development Settings

In Vercel Dashboard → Project Settings → General:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Development Command:** `npm run dev`

### Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

Add these if needed:

| Variable | Value | Environment |
|----------|-------|-------------|
| `GITHUB_TOKEN` | Your GitHub token | Production, Preview |
| `NODE_ENV` | `production` | Production |

### Deployment Protection (Optional)

In Vercel Dashboard → Project Settings → Deployment Protection:

- **Vercel Authentication:** Protect preview deployments
- **Password Protection:** Add password for staging
- **Trusted IPs:** Restrict access by IP

## Step 5: GitHub Integration Features

Vercel automatically adds:

### ✅ Deployment Status Checks
- Shows build status on pull requests
- Prevents merging if build fails

### ✅ Preview Deployments
- Every PR gets a unique preview URL
- Test changes before merging

### ✅ Comments on PRs
- Vercel bot comments with deployment URLs
- Easy access to preview deployments

### ✅ Deployment Notifications
- Email notifications on deployment status
- Slack/Discord integration available

## Deployment Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  1. You push code to GitHub                                 │
│     git push origin main                                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  2. GitHub triggers Vercel webhook                          │
│     Vercel receives notification                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  3. Vercel starts build                                     │
│     - Installs dependencies (npm install)                   │
│     - Runs build command (npm run build)                    │
│     - Optimizes assets                                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  4. Vercel deploys to CDN                                   │
│     - Distributes to edge network                           │
│     - Updates production URL                                │
│     - Sends notification                                    │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  5. Your site is live! 🎉                                   │
│     https://your-site.vercel.app                            │
└─────────────────────────────────────────────────────────────┘
```

## Monitoring & Analytics

### Vercel Analytics (Free)

1. Go to your project → Analytics
2. Enable Web Analytics
3. View:
   - Page views
   - Unique visitors
   - Top pages
   - Referrers
   - Devices & browsers

### Deployment Logs

1. Go to your project → Deployments
2. Click any deployment
3. View:
   - Build logs
   - Function logs
   - Runtime logs
   - Error tracking

## Troubleshooting

### Build Fails

**Check build logs:**
1. Go to Vercel Dashboard → Deployments
2. Click the failed deployment
3. View "Building" logs
4. Fix errors and push again

**Common issues:**
- Missing dependencies: Check `package.json`
- TypeScript errors: Run `npm run build` locally
- Environment variables: Add in Vercel settings

### Site Not Updating

**Clear cache:**
1. Go to Vercel Dashboard → Project
2. Click "..." → "Redeploy"
3. Check "Use existing Build Cache" is OFF
4. Click "Redeploy"

**Check deployment status:**
- Verify push reached GitHub
- Check Vercel dashboard for new deployment
- Look for build errors

### Performance Issues

**Enable optimizations:**
1. Image Optimization: Enabled by default
2. Edge Caching: Automatic
3. Compression: Automatic (Brotli/Gzip)

**Check performance:**
- Use Vercel Analytics
- Run Lighthouse audit
- Check Web Vitals

## Advanced Configuration

### Custom Build Command

Edit `vercel.json`:
```json
{
  "buildCommand": "npm run build && npm run postbuild"
}
```

### Redirects & Rewrites

Add to `vercel.json`:
```json
{
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ]
}
```

### Headers

Add to `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        }
      ]
    }
  ]
}
```

## Useful Commands

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# View deployment logs
vercel logs [deployment-url]

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]

# Open project in browser
vercel open

# View project info
vercel inspect
```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Deployment Configuration](https://vercel.com/docs/projects/project-configuration)

## Support

- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Vercel Support](https://vercel.com/support)
- [Status Page](https://www.vercel-status.com/)

## 🎉 You're All Set!

Your portfolio will now automatically deploy to Vercel every time you push to GitHub!

**Next steps:**
1. Connect your repository to Vercel (5 minutes)
2. Wait for first deployment
3. Share your live URL!
4. Add custom domain (optional)

Happy deploying! 🚀
