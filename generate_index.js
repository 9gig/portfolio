const fs = require('fs');
const pHTML = fs.readFileSync('p.html', 'utf8');

// We will modify pHTML to become index.html

// 1. Replace title
let indexHTML = pHTML.replace(
  '<title>Alex Chen | Full Stack Developer</title>',
  '<title>Solomon Nengi Precious | Senior Mobile Developer</title>'
);

// 2. Add particleCanvas to body
indexHTML = indexHTML.replace(
  '<!-- Grain Overlay -->',
  '<!-- Particles -->\n    <canvas id="particleCanvas" style="position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:0;"></canvas>\n    <!-- Grain Overlay -->'
);

// 3. Update Name and Titles
indexHTML = indexHTML.replace('ALEX', 'SOLOMON').replace('CHEN', 'NENGI');
indexHTML = indexHTML.replace('Full Stack Developer', 'Senior Mobile & Backend Developer');
indexHTML = indexHTML.replace(
  'Crafting digital experiences through code. I build scalable web applications with modern technologies and pixel-perfect design.',
  'Crafting innovative, high-performance cross-platform mobile solutions with Flutter, Dart, Go & Node.js'
);
indexHTML = indexHTML.replace(/Alex Chen/g, 'Solomon Nengi Precious');
indexHTML = indexHTML.replace(/alexchen\.dev/g, 'soloprecious65@gmail.com');

// 4. Update picture and Z-index of about cards
indexHTML = indexHTML.replace(
  'src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop"',
  'src="/assets/solomon.png"'
);
indexHTML = indexHTML.replace(
  'absolute -top-6 -right-6 glass-card p-4 rounded-xl animate-float',
  'absolute -top-6 -right-6 glass-card p-4 rounded-xl animate-float z-20'
);
indexHTML = indexHTML.replace(
  'absolute -bottom-6 -left-6 glass-card p-4 rounded-xl animate-float"',
  'absolute -bottom-6 -left-6 glass-card p-4 rounded-xl animate-float z-20"'
);

// 5. Replace Contact Form
const contactFormHTML = `
            <form action="mailto:soloprecious65@gmail.com" method="POST" enctype="text/plain" class="w-full max-w-xl mx-auto space-y-4 mb-16 contact-reveal flex flex-col items-center">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <input name="Email" type="email" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors" placeholder="Enter your Email" />
                    <input name="Company" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors" placeholder="Company" />
                </div>
                <textarea name="Message" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors resize-none h-32" placeholder="Tell me about your project..."></textarea>
                <button type="submit" class="magnetic-btn group relative px-12 py-6 bg-accent text-primary font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,136,0.4)] block mx-auto text-center w-max">
                    <span class="relative z-10 flex items-center justify-center gap-3">
                        Send Message
                        <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </span>
                    <div class="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                </button>
            </form>
`;
indexHTML = indexHTML.replace(
    /<a href="mailto:hello@[^>]+>\s*<span[^>]*>\s*Say Hello\s*<svg.*?<\/svg>\s*<\/span>\s*<div[^>]*><\/div>\s*<\/a>/s,
    contactFormHTML
);

// 6. Include original script
indexHTML = indexHTML.replace('</body>', '    <script type="module" src="/main.js"></script>\n</body>');

fs.writeFileSync('index.html', indexHTML);
