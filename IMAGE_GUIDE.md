# Image Guide - Adding Images to Your Portfolio

## 🎨 Current Status

Your portfolio now has **beautiful gradient fallbacks** for all images, so it looks great even without photos! The design uses:

- ✅ Gradient avatar with initials
- ✅ Gradient project cards with project initials
- ✅ Professional color scheme
- ✅ Smooth animations

## 📸 Adding Your Images (Optional)

When you're ready to add real images, follow this guide:

### 1. Profile Photo

**Location:** `public/images/avatar.jpg`

**Requirements:**
- Format: JPG, PNG, or WebP
- Size: 512x512px or larger (square)
- File size: Under 500KB

**How to add:**
1. Prepare your photo (square crop, professional look)
2. Save as `avatar.jpg` in `public/images/`
3. Uncomment the Image component in `src/components/about/about-section.tsx` (lines 60-67)

**Code to uncomment:**
```tsx
<Image
  src={author.avatar}
  alt={`${author.name} profile picture`}
  fill
  className="object-cover"
  priority
  sizes="(max-width: 768px) 256px, 300px"
/>
```

### 2. Project Screenshots

**Location:** `public/images/projects/`

**Requirements:**
- Format: JPG, PNG, or WebP
- Size: 1200x630px (recommended for social sharing)
- File size: Under 1MB each

**How to add:**
1. Create folder: `public/images/projects/`
2. Add your project screenshots:
   - `ecommerce.jpg`
   - `fitness-app.jpg`
   - `api-gateway.jpg`
   - etc.

3. Update `src/config/site.ts`:
```typescript
projects: [
  {
    id: '1',
    title: 'Your Project',
    imageUrl: '/images/projects/your-project.jpg', // Add this line
    // ... rest of config
  },
]
```

### 3. Company Logos

**Location:** `public/images/companies/`

**Requirements:**
- Format: PNG with transparency (preferred) or JPG
- Size: 200x200px or larger (square)
- File size: Under 200KB each

**How to add:**
1. Create folder: `public/images/companies/`
2. Add company logos:
   - `company-name.png`
   - `another-company.png`

3. Update `src/config/site.ts`:
```typescript
experience: [
  {
    id: '1',
    company: 'Company Name',
    logo: '/images/companies/company-name.png', // Add this line
    // ... rest of config
  },
]
```

### 4. Resume/CV

**Location:** `public/resume.pdf`

**Requirements:**
- Format: PDF
- File size: Under 5MB
- Name: `resume.pdf` or update config

**How to add:**
1. Save your resume as PDF
2. Place in `public/resume.pdf`
3. Update filename in `src/config/site.ts` if different:
```typescript
cv: {
  filename: 'Your_Name_Resume.pdf',
  path: '/resume.pdf',
}
```

## 🎨 Image Optimization Tips

### For Profile Photos:
1. Use a professional headshot
2. Ensure good lighting
3. Neutral or professional background
4. Square crop (1:1 ratio)
5. Compress using [TinyPNG](https://tinypng.com/)

### For Project Screenshots:
1. Capture full-page screenshots
2. Use browser dev tools for consistent sizing
3. Show the most impressive features
4. Add subtle shadows or borders in editing
5. Compress using [Squoosh](https://squoosh.app/)

### For Company Logos:
1. Use official logos from company websites
2. Prefer PNG with transparency
3. Ensure logos are high resolution
4. Keep consistent sizing
5. Use SVG format if available

## 🖼️ Free Image Resources

If you need placeholder images:

### Stock Photos:
- [Unsplash](https://unsplash.com/) - Free high-quality photos
- [Pexels](https://pexels.com/) - Free stock photos
- [Pixabay](https://pixabay.com/) - Free images and videos

### Icons & Illustrations:
- [Heroicons](https://heroicons.com/) - Beautiful SVG icons
- [Lucide](https://lucide.dev/) - Icon library
- [unDraw](https://undraw.co/) - Free illustrations

### Image Editing:
- [Photopea](https://www.photopea.com/) - Free online Photoshop alternative
- [Remove.bg](https://www.remove.bg/) - Remove image backgrounds
- [Squoosh](https://squoosh.app/) - Image compression

## 📁 Folder Structure

```
public/
├── images/
│   ├── avatar.jpg              # Your profile photo
│   ├── projects/               # Project screenshots
│   │   ├── project-1.jpg
│   │   ├── project-2.jpg
│   │   └── project-3.jpg
│   └── companies/              # Company logos
│       ├── company-1.png
│       └── company-2.png
└── resume.pdf                  # Your CV/Resume
```

## 🚀 Quick Start (No Images Needed!)

Your portfolio looks great without images thanks to:

1. **Gradient Avatar** - Shows your initials in a colorful circle
2. **Project Initials** - Each project card has a unique gradient
3. **Professional Design** - Clean, modern, and impressive
4. **Fast Loading** - No large images to slow down your site

**You can deploy right now and add images later!**

## 🎯 Recommended Workflow

### Phase 1: Deploy Without Images (Now)
1. Deploy to Vercel (5 minutes)
2. Share your portfolio
3. Get feedback

### Phase 2: Add Profile Photo (Later)
1. Take/find a professional photo
2. Add to `public/images/avatar.jpg`
3. Uncomment Image component
4. Push to GitHub (auto-deploys)

### Phase 3: Add Project Screenshots (When Ready)
1. Capture project screenshots
2. Add to `public/images/projects/`
3. Update `src/config/site.ts`
4. Push to GitHub (auto-deploys)

### Phase 4: Polish (Optional)
1. Add company logos
2. Update resume
3. Fine-tune images
4. Optimize file sizes

## 🔧 Troubleshooting

### Image Not Showing?

**Check:**
1. File exists in correct location
2. File name matches exactly (case-sensitive)
3. Path starts with `/` (e.g., `/images/avatar.jpg`)
4. File format is supported (JPG, PNG, WebP)
5. Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)

### Image Too Large?

**Solutions:**
1. Compress using [TinyPNG](https://tinypng.com/)
2. Resize to recommended dimensions
3. Convert to WebP format
4. Use Next.js Image component (automatic optimization)

### Image Looks Blurry?

**Solutions:**
1. Use higher resolution source image
2. Ensure image is at least 2x display size
3. Save at higher quality setting
4. Use PNG for graphics/logos

## 📊 Image Size Guidelines

| Image Type | Recommended Size | Max File Size |
|------------|------------------|---------------|
| Profile Photo | 512x512px | 500KB |
| Project Screenshot | 1200x630px | 1MB |
| Company Logo | 200x200px | 200KB |
| Resume PDF | N/A | 5MB |

## ✨ Pro Tips

1. **Use WebP format** - Smaller file sizes, better quality
2. **Lazy load images** - Already implemented with Next.js Image
3. **Add alt text** - Already implemented for accessibility
4. **Optimize before upload** - Use compression tools
5. **Test on mobile** - Ensure images look good on all devices

## 🎉 Remember

**Your portfolio looks amazing without images!** The gradient fallbacks are:
- Professional
- Fast-loading
- Unique to you
- Mobile-friendly
- Accessible

Add images when you're ready, but don't let it stop you from deploying now!

---

**Need help?** Check the other guides:
- [QUICK_DEPLOY.md](QUICK_DEPLOY.md) - Deploy in 5 minutes
- [DEPLOYMENT_READY.md](DEPLOYMENT_READY.md) - Complete checklist
- [README.md](README.md) - Full documentation
