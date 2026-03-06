# Portfolio Website Prompt for Antigravity AI

**Role & Objective:**
Act as an expert frontend developer and web designer. Build a modern, single-page, dark-themed portfolio website based on a provided UI structure. The site must feature high-end, smooth animations and a deep parallax scrolling effect. 

## Global Design System & Layout
* **Theme:** Deep dark mode. Background should be a very dark, subtle abstract texture (like dark bokeh or smooth smoke). 
* **Typography:** Use clean, modern, bold sans-serif fonts (like Montserrat or Poppins for headings, Inter for body text). High contrast with pure white (`#FFFFFF`) or light gray (`#CCCCCC`) text on a near-black (`#0A0A0A`) background.
* **Navigation:** A fixed, minimalist top navigation bar (Projects, Artists, Contact). Highlight the active section link as the user scrolls. Include a minimalist logo top-left and vertical social media icons fixed to the bottom-right.
* **Structure:** Create 4 distinct full-screen sections (each taking up `100vh`). Use CSS scroll-snap or smooth continuous scrolling.

## Section 1: Hero (Home)
* **Content:** Massive, bold central typography for the main title, with a smaller subtitle directly below it. 
* **Elements:** Include a vertical "Scroll" text indicator on the middle-left edge.

## Sections 2 & 3: Projects / Artists (Gallery Sections)
* **Layout:** A horizontal, 3-column flex or grid layout for displaying covers/images.
* **Visual Hierarchy:** The center image should be slightly larger and more prominent (100% opacity), while the side images are slightly scaled down and dimmed (70% opacity). 
* **Content:** Below the images, center-align a section title, a brief descriptive paragraph (max 3 lines, smaller font), and a minimalist, pill-shaped outline button.

## Section 4: Contact / About
* **Layout:** Split vertically. Top half: A bold title with a short bio/about paragraph underneath. Bottom half: A contact section.
* **Form:** A single-line email input field paired with a "Connect" outline button next to it.
* **Footer Info:** Stacked, center-aligned text for Address, Email, and Phone.

## Animations & Parallax Effects (Crucial)
* **Parallax Background:** The abstract dark background should scroll at a significantly slower rate than the foreground content, creating a deep 3D illusion.
* **Scroll-Triggered Reveals:** As the user scrolls into a new section, the text and images should fade in and gently slide up from the bottom (staggered delay: title first, then text, then button/images).
* **Hover Interactions:** * When hovering over gallery images, they should smoothly scale up (zoom-in effect) by 5%, and dimmed side images should brighten to 100% opacity.
  * Buttons should fill with white (and text turns black) on hover.
  * Navigation links should have a subtle underline or fade effect on hover.

---

### 💡 Tips for the Best Result
* **Asset Prep:** Make sure your portfolio images are high-quality and cropped to squares (1:1 ratio) to perfectly match the gallery layout in the design.
* **Background Setup:** If Antigravity struggles to generate the exact background texture, instruct it to use a dark radial gradient overlay over a pure black background to simulate that depth.