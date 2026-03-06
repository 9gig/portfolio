# Comprehensive AI-Native Portfolio Prompt

**Role & Objective:**
Act as an expert frontend developer and UX designer. Overhaul this portfolio into a modern, interactive, Black and White themed website that mimics an AI chat console. The goal is to tell the developer's story, prove competence instantly, and allow employers to "chat" to see if the developer fits their job requirements.

## Global Design System & Layout
* **Theme:** Strict Black and White monochrome. Deep blacks (`#000000`), stark whites (`#FFFFFF`), and slate grays for subtle depth.
* **Typography:** Use a monospaced "techy" font for code/chat elements (e.g., Fira Code, JetBrains Mono) and a clean sans-serif for readable paragraphs (e.g., Inter).
* **Section Transitions:** Instead of straight lines, use an SVG-based "rugged torn paper" edge effect separating the major sections to add a tactile, raw feel.
* **Animations:** All elements (text, chat bubbles, project cards) must use a smooth "slide-in and fade-up" transition as the user scrolls them into view.

## Section 1: Hero (The Chat Console Interface)
* **Background:** A dark, moody image of a developer workstation (keyboard/desk) that heavily fades into a pure black gradient at the top.
* **Header:** Remove giant typography. Use a sleek top bar with a small professional avatar, the name "Solomon Nengi Precious", and the title "Digital Craftsman | Mobile & Backend".
* **The Main UI:** Center an AI chat interface on the screen. 
    * The initial message should slide in: "Hi, I'm Solomon's AI proxy. I specialize in Flutter, Dart, Go, and Node.js. Describe your project or job opening, and I'll tell you if Solomon is the right fit."
    * **Action Pills:** Below the input field, display clickable, pill-shaped prompts to guide the user (e.g., "View Mobile Projects", "What is his Go experience?", "Assess my Job Description").

## Section 2: Skills & Tech Stack
* **Layout:** A clean, grid-based layout.
* **Icons:** Integrate official brand SVGs for Flutter, Dart, Go (Gopher), and Node.js.
* **Design:** Make the skill cards look like terminal windows or command-line outputs. When hovered, they should slightly elevate with a crisp white drop-shadow.

## Section 3: About & Story (The Log)
* **Narrative Style:** Present the "About Me" section not as a standard paragraph, but as a timeline or "System Log" of growth. 
* **Content:** Highlight the transition into being a robust developer, building things like the 3Scorers app and multiplayer games. 

## Section 4: Projects (Visual Proof)
* **Layout:** Staggered cards featuring high-quality screenshots of the apps.
* **Details:** Each card must prominently display the tech stack used (e.g., "Built with: Flutter & Go") using small minimalist tags.

## Technical Requirements
* Implement a connection to the Gemini API using `.env` variables (`import.meta.env.VITE_GEMINI_API_KEY`) to power the chat interface in the hero section. 
* Ensure the chat UI handles loading states gracefully with a "typing..." animation.