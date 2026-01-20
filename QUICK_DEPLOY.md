# 🚀 Quick Deploy to Vercel - 5 Minutes

## Step-by-Step Visual Guide

### 1️⃣ Go to Vercel
Open: **https://vercel.com**

### 2️⃣ Sign In with GitHub
```
┌─────────────────────────────────────┐
│                                     │
│   [Continue with GitHub]            │
│                                     │
└─────────────────────────────────────┘
```
Click the GitHub button to sign in

### 3️⃣ Import Your Repository
```
┌─────────────────────────────────────┐
│  Add New...                    ▼    │
└─────────────────────────────────────┘
         │
         ├─→ Project
         └─→ Import from GitHub
```

### 4️⃣ Select Your Repo
```
┌─────────────────────────────────────┐
│  Search: 9gig/portfolio             │
│                                     │
│  ✓ 9gig/portfolio                   │
│    [Import]                         │
└─────────────────────────────────────┘
```

### 5️⃣ Configure (Auto-Detected)
```
┌─────────────────────────────────────┐
│  Framework: Next.js          ✓      │
│  Root Directory: ./          ✓      │
│  Build Command: npm run build ✓     │
│  Output Directory: .next     ✓      │
│                                     │
│  [Deploy] ←── Click this!           │
└─────────────────────────────────────┘
```

### 6️⃣ Wait for Build (2-3 minutes)
```
Building...  ████████████░░░░  75%

✓ Installing dependencies
✓ Building application  
✓ Optimizing assets
→ Deploying to edge network...
```

### 7️⃣ Success! 🎉
```
┌─────────────────────────────────────┐
│  🎉 Deployment Ready                │
│                                     │
│  https://portfolio-xxx.vercel.app   │
│                                     │
│  [Visit] [Share]                    │
└─────────────────────────────────────┘
```

## ✅ That's It!

Now every time you push to GitHub:
```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build your site
3. Deploy to production
4. Send you a notification

## 🔗 Your URLs

After deployment, you'll have:

- **Production:** `https://portfolio-9gig.vercel.app`
- **Dashboard:** `https://vercel.com/9gig/portfolio`
- **GitHub:** `https://github.com/9gig/portfolio`

## 📱 Share Your Portfolio

Once live, share your portfolio:
- Add to LinkedIn profile
- Add to GitHub profile README
- Share on Twitter/X
- Add to resume
- Send to potential employers

## 🎨 Optional: Add Custom Domain

Want `yourname.com` instead of `.vercel.app`?

1. Go to Vercel Dashboard
2. Click your project
3. Settings → Domains
4. Add your domain
5. Update DNS records (Vercel provides instructions)
6. Done! Your site is on your custom domain

## 🆘 Need Help?

Check `VERCEL_SETUP.md` for:
- Detailed instructions
- Troubleshooting guide
- Advanced configuration
- Environment variables setup

## 🎯 Next Steps

1. **Deploy now** (5 minutes)
2. **Customize content** in `src/config/site.ts`
3. **Add your images** to `public/images/`
4. **Push changes** - auto-deploys!
5. **Share your portfolio** with the world!

---

**Ready?** Go to https://vercel.com and click "Continue with GitHub"! 🚀
