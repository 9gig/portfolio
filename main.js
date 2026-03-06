/* ===========================
   MAIN.JS — Interactive Portfolio v2
   Solomon Nengi Precious
   =========================== */

// ─── CUSTOM CURSOR ─────────────────────────
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
}
animateRing();

// Cursor hover state
const hoverTargets = document.querySelectorAll('a, button, .tilt-card, .magnetic-btn, .pill, .contact-card, .phone-mockup, .chat-suggestion');
hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hovering');
        cursorRing.classList.add('hovering');
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hovering');
        cursorRing.classList.remove('hovering');
    });
});


// ─── PARTICLE SYSTEM ───────────────────────
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let particleMouseX = 0, particleMouseY = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', (e) => {
    particleMouseX = e.clientX;
    particleMouseY = e.clientY;
});

class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.hue = Math.random() > 0.5 ? 243 : 187;
    }
    update() {
        const dx = this.x - particleMouseX;
        const dy = this.y - particleMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
            const force = (150 - dist) / 150;
            this.x += (dx / dist) * force * 2;
            this.y += (dy / dist) * force * 2;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.opacity})`;
        ctx.fill();
    }
}

const particleCount = Math.min(80, Math.floor(window.innerWidth / 15));
for (let i = 0; i < particleCount; i++) particles.push(new Particle());

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                const opacity = (1 - dist / 120) * 0.12;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(79, 70, 229, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animateParticles);
}
animateParticles();


// ─── PARALLAX SCROLL (marquee bands + big lines) ─────
const scrollParallaxEls = document.querySelectorAll('[data-scroll-speed]');

function updateScrollParallax() {
    const scrollY = window.scrollY;
    scrollParallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.scrollSpeed) || 0;
        el.style.transform = `translateY(${scrollY * speed * 10}px)`;
    });
}
window.addEventListener('scroll', updateScrollParallax, { passive: true });


// ─── CARD TILT EFFECT ──────────────────────
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
        card.style.boxShadow = `${-rotateY * 2}px ${rotateX * 2}px 60px rgba(79, 70, 229, 0.2)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.boxShadow = '';
    });
});

// Phone demo video play on hover
document.querySelectorAll('.phone-mockup').forEach((phone) => {
    const video = phone.querySelector('.phone-demo-video');
    if (video) {
        phone.addEventListener('mouseenter', () => {
            if (video.querySelector('source') || video.src) {
                video.play().catch(() => { });
            }
        });
        phone.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    }
});


// ─── MAGNETIC BUTTONS ──────────────────────
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});


// ─── MOUSE PARALLAX (data-parallax) ────────
const parallaxEls = document.querySelectorAll('[data-parallax]');
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    parallaxEls.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax);
        const moveX = x * speed * 100;
        const moveY = y * speed * 100;
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});


// (Hero photo removed — using big text parallax instead)


// ─── TYPEWRITER EFFECT ─────────────────────
const typewriterEl = document.getElementById('typewriter');
const titles = [
    'Senior Mobile Developer',
    'Flutter Expert',
    'Cross-Platform Architect',
    'Digital Craftsman',
    'Go Backend Engineer',
];
let titleIndex = 0, charIndex = 0, isDeleting = false, typeSpeed = 80;

function typewrite() {
    const current = titles[titleIndex];
    if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
    } else {
        typewriterEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
    }
    if (!isDeleting && charIndex === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
    }
    setTimeout(typewrite, typeSpeed);
}
setTimeout(typewrite, 1200);


// ─── SCROLL REVEAL ─────────────────────────
const scrollRevealEls = document.querySelectorAll('.scroll-reveal');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);
scrollRevealEls.forEach((el) => observer.observe(el));


// ─── STAT COUNTER ──────────────────────────
const statNumbers = document.querySelectorAll('.stat-number[data-count]');
const statObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCount(entry.target, parseInt(entry.target.dataset.count));
                statObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);
statNumbers.forEach((el) => statObserver.observe(el));

function animateCount(el, target) {
    const duration = 1500; const start = performance.now();
    function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        el.textContent = Math.round((1 - Math.pow(1 - progress, 3)) * target);
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}


// ─── SKILL BAR ANIMATION ──────────────────
const skillFills = document.querySelectorAll('.skill-fill[data-width]');
const skillObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.dataset.width + '%';
                skillObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.3 }
);
skillFills.forEach((el) => skillObserver.observe(el));


// ─── NAVBAR SCROLL ─────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});


// ─── MOBILE MENU ───────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});


// ─── SMOOTH SCROLL ─────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});


// ─── ACTIVE NAV ────────────────────────────
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-link');
const activeObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach((link) => {
                    link.style.color = link.getAttribute('href') === '#' + id ? 'var(--text-primary)' : '';
                });
            }
        });
    },
    { threshold: 0.3 }
);
sections.forEach((section) => activeObserver.observe(section));


// =============================================
// GEMINI AI CHATBOT
// =============================================
const chatFab = document.getElementById('chatFab');
const chatPanel = document.getElementById('chatPanel');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const chatApiNotice = document.getElementById('chatApiNotice');
const chatApiKey = document.getElementById('chatApiKey');
const chatApiSave = document.getElementById('chatApiSave');

let geminiApiKey = localStorage.getItem('gemini_api_key') || '';

// Show/hide API notice
if (geminiApiKey) chatApiNotice.classList.add('hidden');

// Toggle chat panel
chatFab.addEventListener('click', () => {
    chatFab.classList.toggle('active');
    chatPanel.classList.toggle('active');
});

// Save API key
chatApiSave.addEventListener('click', () => {
    const key = chatApiKey.value.trim();
    if (key) {
        geminiApiKey = key;
        localStorage.setItem('gemini_api_key', key);
        chatApiNotice.classList.add('hidden');
    }
});

// Suggestion chips
document.querySelectorAll('.chat-suggestion').forEach((btn) => {
    btn.addEventListener('click', () => {
        const prompt = btn.dataset.prompt;
        chatInput.value = prompt;
        sendMessage(prompt);
    });
});

// Send
chatSend.addEventListener('click', () => sendMessage(chatInput.value));
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(chatInput.value); }
});

// System prompt with Solomon's full profile
const SYSTEM_PROMPT = `You are Solomon Nengi Precious's AI portfolio assistant. You are embedded on his personal portfolio website. Your job is to:

1. Explain his projects, skills, and experience in rich detail when asked
2. Help potential clients understand how Solomon's skills match their project needs
3. Draft project proposals on Solomon's behalf when requested
4. Be friendly, professional, and persuasive — you represent Solomon

SOLOMON'S PROFILE:
- Name: Solomon Nengi Precious
- Title: Senior Mobile Developer / Mobile Team Lead
- Email: soloprecious65@gmail.com
- Phone: +234 808 765 6557
- GitHub: github.com/9gig
- LinkedIn: linkedin.com/in/nengi-solomon

SKILLS:
- Flutter/Dart (Expert, 95%) — Custom Painter, Rive animations, Flame engine, Clean Architecture, TDD
- Go/Golang (Advanced, 80%) — Backend services, concurrency, scalable APIs
- JavaScript (Advanced, 85%) — Node.js, Express, full-stack
- Kotlin (Intermediate, 70%) — Native Android
- PHP (Intermediate, 65%)
- Tools: Firebase, REST API, WebSocket, Git/GitFlow, CI/CD (CodeMagic), Shorebird, Figma, Adobe Illustrator
- Practices: Clean Architecture, TDD, MVVM, MVC, Performance Optimization
- Payment: Apple Pay, Google Pay, In-App Purchase

PROJECTS:
1. **3Scorers** (Mobile Team Lead, Jun 2023–Present) — Fantasy prediction app with live matches, Custom Painter + Rive animations, Flame engine for game-like elements, Clean Architecture, comprehensive TDD. Available on Play Store.
2. **Little Wheel Agent** — Empowers Nigerians to save/build wealth + earn commissions. Google ML Kit, Bloc, MVC architecture.
3. **Moremonee MFB** — Online banking app for quick payments/financial growth. Stacked Architecture, Dojah SDK for identity verification.
4. **Kampgig** — Housing/roommate finder with payment system (Kampie). Full-stack JavaScript, Node.js/Express. Open source on GitHub.
5. **Mita** — Open-source full-stack JavaScript project showcasing modern architecture.

EXPERIENCE:
- Mobile Team Lead at 3Scorers (Jun 2023–Present)
- Senior Flutter Developer at Moremonee MFB (Apr 2025)
- Senior Flutter Developer at Little Wheel (May 2025)

When drafting proposals, include: project understanding, proposed tech stack, timeline estimate, why Solomon is the right fit. Keep proposals professional but warm.

When explaining skills relevance, be specific about which of Solomon's projects demonstrate the capability the client needs.

IMPORTANT: Keep responses concise but thorough. Use bullet points and formatting. Don't use markdown headers (## etc) since this is rendered as plain text. Use bold **text** sparingly for emphasis.`;

async function sendMessage(text) {
    text = text.trim();
    if (!text) return;
    chatInput.value = '';

    // Remove suggestion chips after first message
    const suggestionsEl = chatMessages.querySelector('.chat-suggestions');
    if (suggestionsEl) suggestionsEl.remove();

    // Add user message
    appendMessage('user', text);

    // Check for API key
    if (!geminiApiKey) {
        appendMessage('bot', '⚠️ Please enter your Gemini API key below to enable AI chat. You can get one free at <a href="https://aistudio.google.com/apikey" target="_blank" style="color: var(--accent-2);">aistudio.google.com</a>');
        chatApiNotice.classList.remove('hidden');
        return;
    }

    // Show typing indicator
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot';
    typingDiv.innerHTML = '<div class="chat-typing"><span></span><span></span><span></span></div>';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                contents: [{ parts: [{ text }] }],
                generationConfig: { temperature: 0.8, maxOutputTokens: 1024 }
            })
        });

        const data = await response.json();
        typingDiv.remove();

        if (data.error) {
            appendMessage('bot', `❌ Error: ${data.error.message || 'Something went wrong. Please check your API key.'}`);
        } else {
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
            appendMessage('bot', formatBotReply(reply));
        }
    } catch (err) {
        typingDiv.remove();
        appendMessage('bot', '❌ Network error. Please check your connection and try again.');
    }
}

function appendMessage(role, html) {
    const div = document.createElement('div');
    div.className = `chat-message ${role}`;
    div.innerHTML = `<div class="chat-bubble">${html}</div>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatBotReply(text) {
    // Convert **bold** to <strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Convert bullet points
    text = text.replace(/^[-•]\s/gm, '→ ');
    // Convert newlines to <br>
    text = text.replace(/\n/g, '<br>');
    return text;
}
