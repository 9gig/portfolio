# Public Assets

This directory contains static assets that are served directly by Next.js.

## Required Social Media Images

For optimal SEO and social media sharing, you need to create the following images:

### 1. Open Graph Image (`og-image.jpg`)
- **Dimensions:** 1200 x 630 pixels
- **Format:** JPG or PNG
- **Purpose:** Used when sharing on Facebook, LinkedIn, and other platforms
- **Content Suggestions:**
  - Your name and title
  - Key technologies (Flutter, Dart, Kotlin, Go, TypeScript, Node.js)
  - Professional photo or branding
  - Clean, readable design

### 2. Twitter Card Image (`twitter-image.jpg`)
- **Dimensions:** 1200 x 630 pixels
- **Format:** JPG or PNG
- **Purpose:** Used when sharing on Twitter/X
- **Content Suggestions:**
  - Can be the same as og-image.jpg
  - Or create a Twitter-optimized variant
  - Ensure text is readable at smaller sizes

## Current Assets

### Images
- `images/avatar.jpg` - Profile picture used in the About section

### Documents
- `resume.pdf` - CV/Resume file for download

## Creating Social Media Images

You can use these tools to create professional social media images:

1. **Canva** (https://canva.com)
   - Free templates for social media images
   - Easy drag-and-drop interface
   - Export as JPG or PNG

2. **Figma** (https://figma.com)
   - Professional design tool
   - Free for personal use
   - Precise control over design

3. **Adobe Express** (https://express.adobe.com)
   - Quick social media graphics
   - Templates available
   - Free tier available

## Design Tips

1. **Keep it Simple:** Don't overcrowd the image
2. **High Contrast:** Ensure text is readable
3. **Brand Consistency:** Use colors from your theme
4. **Professional Photo:** Use a high-quality headshot
5. **Test Preview:** Use social media debuggers to test how it looks

## Testing Your Images

After adding the images, test them with these tools:

- **Facebook:** https://developers.facebook.com/tools/debug/
- **Twitter:** https://cards-dev.twitter.com/validator
- **LinkedIn:** https://www.linkedin.com/post-inspector/

## File Structure

```
public/
├── images/
│   └── avatar.jpg          # Profile picture
├── og-image.jpg            # Open Graph image (1200x630)
├── twitter-image.jpg       # Twitter card image (1200x630)
├── resume.pdf              # CV/Resume
└── README.md               # This file
```

## Notes

- Images in the `public` directory are served from the root URL
- For example, `public/og-image.jpg` is accessible at `https://yourdomain.com/og-image.jpg`
- Optimize images for web (compress without losing quality)
- Use descriptive filenames for better SEO
