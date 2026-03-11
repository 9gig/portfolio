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
if (typewriterEl) {
    const titles = [
        'Senior Software Developer',
        'Full-Stack Engineer',
        'Mobile Architect',
        'Digital Craftsman',
        'Backend Specialist',
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
}


// ─── SCROLL REVEAL ─────────────────────────
// Handled by GSAP ScrollTrigger in index.html


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
const mobileMenuOld = document.getElementById('mobileMenu');
if (hamburger && mobileMenuOld) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenuOld.classList.toggle('active');
        document.body.style.overflow = mobileMenuOld.classList.contains('active') ? 'hidden' : '';
    });
    document.querySelectorAll('.mobile-link').forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenuOld.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}


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
// CONTACT FORM AJAX SUBMISSION
// =============================================
const contactForm = document.getElementById('contactForm');
const thankYouModal = document.getElementById('thankYouModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalContent = document.getElementById('modalContent');
const submitBtn = contactForm ? contactForm.querySelector('.contact-submit') : null;

if (contactForm && thankYouModal) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent default redirection
        
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch("https://formsubmit.co/ajax/soloprecious65@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show Success Modal
                contactForm.reset();
                thankYouModal.classList.remove('pointer-events-none');
                thankYouModal.classList.remove('opacity-0');
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            } else {
                alert("Oops! There was a problem sending your message.");
            }
        } catch (error) {
            alert("Oops! There was a network error. Please try again.");
        } finally {
            submitBtn.innerHTML = originalBtnHtml;
            submitBtn.disabled = false;
        }
    });

    const closeModal = () => {
        thankYouModal.classList.add('pointer-events-none');
        thankYouModal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
    };

    closeModalBtn.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
}
