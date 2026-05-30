/* ============================================================
   Nova Nest Retreats — Animations & Visual Effects
   animations.js
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initParticles();
    initCounterAnimation();
    initParallax();
    initTypingEffect();
    initCursorGlow();
    initFloatingCards();
    initCardGlare();
    initAmbientOrbs();
});

/* ============================================================
   1. SCROLL REVEAL — fade-in elements on scroll
   ============================================================ */
function initScrollReveal() {
    const targets = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale, .resort-card, .card-resort, .feature-card, .stat-card, .section-title, .testimonial-card"
    );

    if (!targets.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("visible");
                    entry.target.classList.add("revealed");
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.01 });

    targets.forEach(el => {
        // Only add translate-based reveal-init if it's a standard reveal element
        if (el.classList.contains("reveal") && 
            !el.classList.contains("reveal-left") && 
            !el.classList.contains("reveal-right") && 
            !el.classList.contains("reveal-scale")) {
            el.classList.add("reveal-init");
        }
        observer.observe(el);
    });
}

/* ============================================================
   2. FLOATING PARTICLES — hero section background
   ============================================================ */
function initParticles() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const COUNT = 60;
    const particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.2,
    }));

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(52, 211, 153, ${p.alpha})`;
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;
        });

        // Draw connecting lines between close particles
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(52, 211, 153, ${0.08 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    draw();

    window.addEventListener("resize", () => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    });
}

/* ============================================================
   3. COUNTER ANIMATION — animated number count-up
   ============================================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll("[data-count]");
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const target = parseFloat(el.dataset.count);
            const isDecimal = target % 1 !== 0;
            const duration = 1800;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                const current = target * ease;

                el.innerText = isDecimal
                    ? current.toFixed(1)
                    : Math.floor(current).toLocaleString();

                if (progress < 1) requestAnimationFrame(update);
                else el.innerText = isDecimal ? target.toFixed(1) : target.toLocaleString();
            }

            requestAnimationFrame(update);
            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

/* ============================================================
   4. PARALLAX — subtle hero background movement on scroll
   ============================================================ */
function initParallax() {
    const parallaxEls = document.querySelectorAll("[data-parallax]");
    if (!parallaxEls.length) return;

    let ticking = false;

    window.addEventListener("scroll", () => {
        if (ticking) return;
        requestAnimationFrame(() => {
            const scrollY = window.scrollY;
            parallaxEls.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.3;
                el.style.transform = `translateY(${scrollY * speed}px)`;
            });
            ticking = false;
        });
        ticking = true;
    });
}

/* ============================================================
   5. TYPING EFFECT — animated hero headline typewriter
   ============================================================ */
function initTypingEffect() {
    const el = document.getElementById("typing-text");
    if (!el) return;

    const words = el.dataset.words
        ? el.dataset.words.split("|")
        : ["Luxury Escapes", "Private Villas", "Beach Retreats", "Mountain Getaways"];

    let wIdx = 0, cIdx = 0, deleting = false;

    function type() {
        const word = words[wIdx];
        el.innerText = deleting
            ? word.substring(0, cIdx--)
            : word.substring(0, cIdx++);

        let delay = deleting ? 60 : 110;

        if (!deleting && cIdx === word.length + 1) {
            delay = 1800;
            deleting = true;
        } else if (deleting && cIdx === 0) {
            deleting = false;
            wIdx = (wIdx + 1) % words.length;
            delay = 400;
        }

        setTimeout(type, delay);
    }

    type();
}

/* ============================================================
   6. CURSOR GLOW — soft radial glow following mouse
   ============================================================ */
function initCursorGlow() {
    const glow = document.getElementById("cursor-glow");
    if (!glow) return;

    let mx = -200, my = -200;
    let cx = -200, cy = -200;

    document.addEventListener("mousemove", e => {
        mx = e.clientX;
        my = e.clientY;
    });

    function animate() {
        cx += (mx - cx) * 0.1;
        cy += (my - cy) * 0.1;
        glow.style.left = `${cx}px`;
        glow.style.top = `${cy}px`;
        requestAnimationFrame(animate);
    }

    animate();
}

/* ============================================================
   7. FLOATING CARD TILT — 3D hover tilt effect on resort cards
   ============================================================ */
function initFloatingCards() {
    document.querySelectorAll(".resort-card, .card-resort, .feature-card").forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rotX = ((y - cy) / cy) * -6;
            const rotY = ((x - cx) / cx) * 6;

            card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
            card.style.transition = "transform 0.1s ease";
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale(1)";
            card.style.transition = "transform 0.5s ease";
        });
    });
}

/* ============================================================
   8. COUNTDOWN TIMER — for maintenance/sitemap page
   ============================================================ */
function initCountdown(targetDateStr, ids) {
    const target = new Date(targetDateStr).getTime();

    function tick() {
        const now = Date.now();
        const diff = Math.max(0, target - now);

        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);

        const d = document.getElementById(ids.days);
        const h = document.getElementById(ids.hours);
        const m = document.getElementById(ids.minutes);
        const s = document.getElementById(ids.seconds);

        if (d) d.innerText = String(days).padStart(2, "0");
        if (h) h.innerText = String(hours).padStart(2, "0");
        if (m) m.innerText = String(mins).padStart(2, "0");
        if (s) s.innerText = String(secs).padStart(2, "0");

        if (diff > 0) setTimeout(tick, 1000);
    }

    tick();
}

window.initCountdown = initCountdown;

/* ============================================================
   9. INTERACTIVE CARD GLARE — cursor-tracking glare overlay
   ============================================================ */
function initCardGlare() {
    const cards = document.querySelectorAll(".card-glare");
    cards.forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });
}

/* ============================================================
   10. AMBIENT ORBS — dynamic background glow injection
   ============================================================ */
function initAmbientOrbs() {
    const target = document.querySelector(".hero-home, .testimonial-section, .about-hero");
    if (!target) return;
    
    // Add relative positioning and overflow hidden
    target.classList.add("ambient-bg");
    
    // Ensure we don't double inject
    if (target.querySelector(".ambient-orb")) return;
    
    const orb1 = document.createElement("div");
    orb1.className = "ambient-orb orb-emerald orb-1";
    
    const orb2 = document.createElement("div");
    orb2.className = "ambient-orb orb-ocean orb-2";
    
    target.prepend(orb1, orb2);
}
