/* ========================================
   Nova Nest Retreats — Main JS
   Core logic, component injection, & interactivity
   ======================================== */

(function () {
    'use strict';

    /* ---- Theme & Direction Immediate Init ---- */
    function initThemeAndDir() {
        const savedTheme = localStorage.getItem('novanest_theme');
        const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        
        if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
            document.documentElement.classList.add('light-theme');
        } else {
            document.documentElement.classList.remove('light-theme');
        }
        
        const savedDir = localStorage.getItem('novanest_direction');
        if (savedDir === 'rtl') {
            document.documentElement.setAttribute('dir', 'rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
        }
    }
    initThemeAndDir();

    /* ---- Path Detection ---- */
    const isSubPage = window.location.pathname.includes('/pages/');
    const BASE   = isSubPage ? '../' : '';
    const PAGES  = isSubPage ? ''    : 'pages/';

    /* ---- SVG Icon Library ---- */
    const ICONS = {
        logo: `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="logoGrad" x1="4" y1="2" x2="36" y2="38" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stop-color="#10b981"/>
                    <stop offset="100%" stop-color="#0ea5e9"/>
                </linearGradient>
            </defs>
            <path d="M20 1 L23.5 15 L38 20 L23.5 25 L20 39 L16.5 25 L2 20 L16.5 15 Z" fill="url(#logoGrad)" opacity="0.9"/>
            <path d="M20 8 L22 16 L30 20 L22 24 L20 32 L18 24 L10 20 L18 16 Z" fill="url(#logoGrad)" opacity="0.5"/>
            <circle cx="20" cy="20" r="3.5" fill="url(#logoGrad)"/>
        </svg>`,

        user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
        </svg>`,

        userLogin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
        </svg>`,

        admin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/>
        </svg>`,

        chevronUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"/>
        </svg>`,

        facebook: `<svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,

        twitter: `<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,

        instagram: `<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,

        linkedin: `<svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,

        youtube: `<svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>`,

        mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,

        whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.444 5.703 1.445h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,

        arrowRight: `<span class="footer-link-icon">›</span>`,

        theme: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>`,
        
        sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>`,

        close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>`
    };


    /* ============================================
       HEADER COMPONENT
       ============================================ */
    function createHeader() {
        const header = document.getElementById('main-header');
        if (!header) return;

        // Determine current page for active link
        const path = window.location.pathname.toLowerCase();
        const getActive = (page) => {
            if (page === 'index' && (path.endsWith('index.html') || path.endsWith('/') || path === '')) return 'active';
            if (page !== 'index' && path.includes(page)) return 'active';
            return '';
        };

        header.innerHTML = `
        <nav class="navbar" id="navbar">
            <div class="nav-container">

                <!-- Logo -->
                <a href="${BASE}index.html" class="nav-logo" aria-label="Nova Nest Retreats — Home">
                    <div class="logo-icon">${ICONS.logo}</div>
                    <div class="logo-text">
                        <span class="logo-primary">NOVA</span>
                        <span class="logo-secondary">NEST RETREATS</span>
                    </div>
                </a>

                <!-- Navigation Links -->
                <div class="nav-menu" id="nav-menu">
                    <ul class="nav-list">
                        <li class="nav-item">
                            <a href="${BASE}index.html" class="nav-link ${getActive('index')}">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="${PAGES}resorts.html" class="nav-link ${getActive('resorts')}">Resorts</a>
                        </li>
                        <li class="nav-item">
                            <a href="${PAGES}packages.html" class="nav-link ${getActive('packages')}">Packages</a>
                        </li>
                        <li class="nav-item">
                            <a href="${PAGES}offers.html" class="nav-link ${getActive('offers')}">Offers</a>
                        </li>
                        <li class="nav-item">
                            <a href="${PAGES}about.html" class="nav-link ${getActive('about')}">About</a>
                        </li>
                        <li class="nav-item">
                            <a href="${PAGES}contact.html" class="nav-link ${getActive('contact')}">Contact</a>
                        </li>
                        <li class="nav-item">
                            <a href="${PAGES}faq.html" class="nav-link ${getActive('faq')}">FAQ</a>
                        </li>
                        <li class="nav-item mobile-only-nav-item">
                            <div style="height: 1px; background: rgba(255, 255, 255, 0.08); margin: 0.75rem 0.5rem;"></div>
                        </li>
                        <li class="nav-item mobile-only-nav-item">
                            <a href="${PAGES}admin-dashboard.html" class="nav-link ${getActive('admin-dashboard')}">
                                ${ICONS.admin} <span>Admin Dashboard</span>
                            </a>
                        </li>
                        <li class="nav-item mobile-only-nav-item">
                            <a href="${PAGES}user-dashboard.html" class="nav-link ${getActive('user-dashboard')}">
                                ${ICONS.user} <span>User Dashboard</span>
                            </a>
                        </li>
                        <li class="nav-item mobile-only-nav-item">
                            <a href="${PAGES}login.html" class="nav-link ${getActive('login')}">
                                ${ICONS.userLogin} <span>Login / Sign Up</span>
                            </a>
                        </li>
                    </ul>
                    <div class="mobile-close-container">
                        <button class="mobile-close-btn" id="mobile-close-btn" aria-label="Close menu">${ICONS.close}</button>
                    </div>
                </div>

                <!-- Actions -->
                <div class="nav-actions">
                    <!-- Theme Toggle -->
                    <button class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Toggle light and dark theme">
                        ${ICONS.theme}
                    </button>

                    <!-- Direction Toggle -->
                    <button class="dir-toggle-btn" id="dir-toggle-btn" aria-label="Toggle LTR and RTL layouts" style="font-size: 11px; font-weight: 600; font-family: inherit;">
                        RTL
                    </button>

                    <!-- Profile Dropdown -->
                    <div class="profile-dropdown" id="profile-dropdown">
                        <button class="profile-btn" id="profile-btn" aria-haspopup="true" aria-expanded="false" aria-label="Login options">
                            ${ICONS.user}
                            <span class="dropdown-arrow">▾</span>
                        </button>
                        <div class="dropdown-menu" id="dropdown-menu" role="menu">
                            <a href="${PAGES}admin-dashboard.html" class="dropdown-item" role="menuitem">
                                ${ICONS.admin}
                                <span>Admin Dashboard</span>
                            </a>
                            <div class="dropdown-divider"></div>
                            <a href="${PAGES}user-dashboard.html" class="dropdown-item" role="menuitem">
                                ${ICONS.user}
                                <span>User Dashboard</span>
                            </a>
                            <div class="dropdown-divider"></div>
                            <a href="${PAGES}login.html" class="dropdown-item" role="menuitem">
                                ${ICONS.userLogin}
                                <span>Login / Sign Up</span>
                            </a>
                        </div>
                    </div>

                    <!-- Hamburger -->
                    <button class="hamburger" id="hamburger" aria-label="Toggle navigation menu" aria-expanded="false">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

            </div>
        </nav>
        <div class="nav-overlay" id="nav-overlay"></div>
        `;
    }


    /* ============================================
       FOOTER COMPONENT
       ============================================ */
    function createFooter() {
        const footer = document.getElementById('main-footer');
        if (!footer) return;

        footer.innerHTML = `
        <footer class="site-footer">
            <div class="container footer-main">
                <div class="footer-grid">

                    <!-- Brand Column -->
                    <div class="footer-col footer-brand">
                        <a href="${BASE}index.html" class="footer-logo" aria-label="Nova Nest Retreats">
                            <div class="logo-icon">${ICONS.logo}</div>
                            <div class="logo-text">
                                <span class="logo-primary">NOVA</span>
                                <span class="logo-secondary">NEST RETREATS</span>
                            </div>
                        </a>
                        <p class="footer-brand-text">
                            Curating unforgettable luxury resort experiences across the world's most stunning destinations. Your dream escape starts here.
                        </p>
                        <div class="social-links">
                            <a href="https://facebook.com/novanest" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Facebook">${ICONS.facebook}</a>
                            <a href="https://x.com/novanest" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="X / Twitter">${ICONS.twitter}</a>
                            <a href="mailto:concierge@novanest.com" class="social-link" aria-label="Email">${ICONS.mail}</a>
                            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="WhatsApp">${ICONS.whatsapp}</a>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div class="footer-col">
                        <h4 class="footer-heading">Quick Links</h4>
                        <ul class="footer-links">
                            <li><a href="${BASE}index.html" class="footer-link">${ICONS.arrowRight} Home</a></li>
                            <li><a href="${PAGES}resorts.html" class="footer-link">${ICONS.arrowRight} Resorts</a></li>
                            <li><a href="${PAGES}packages.html" class="footer-link">${ICONS.arrowRight} Packages</a></li>
                            <li><a href="${PAGES}offers.html" class="footer-link">${ICONS.arrowRight} Special Offers</a></li>
                            <li><a href="${PAGES}about.html" class="footer-link">${ICONS.arrowRight} About Us</a></li>
                            <li><a href="${PAGES}contact.html" class="footer-link">${ICONS.arrowRight} Contact</a></li>
                        </ul>
                    </div>

                    <!-- Support -->
                    <div class="footer-col">
                        <h4 class="footer-heading">Support</h4>
                        <ul class="footer-links">
                            <li><a href="${PAGES}faq.html" class="footer-link">${ICONS.arrowRight} FAQ</a></li>
                            <li><a href="${PAGES}privacy-policy.html" class="footer-link">${ICONS.arrowRight} Privacy Policy</a></li>
                            <li><a href="${PAGES}terms-and-conditions.html" class="footer-link">${ICONS.arrowRight} Terms &amp; Conditions</a></li>
                            <li><a href="${PAGES}sitemap.html" class="footer-link">${ICONS.arrowRight} Sitemap</a></li>
                            <li><a href="${PAGES}bookings.html" class="footer-link">${ICONS.arrowRight} My Bookings</a></li>
                        </ul>
                    </div>

                    <!-- Newsletter -->
                    <div class="footer-col">
                        <h4 class="footer-heading">Newsletter</h4>
                        <div class="footer-newsletter">
                            <p class="newsletter-text">
                                Subscribe to get exclusive deals, travel tips, and early access to new resort launches.
                            </p>
                            <form class="newsletter-form" id="footer-newsletter-form" novalidate>
                                <input
                                    type="email"
                                    class="newsletter-input"
                                    id="footer-newsletter-email"
                                    placeholder="Enter your email"
                                    aria-label="Email address for newsletter"
                                    required
                                />
                                <button type="submit" class="newsletter-btn">Subscribe</button>
                            </form>
                            <div class="newsletter-success" id="footer-newsletter-success">
                                <span>✓</span> Thanks for subscribing!
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="container">
                <div class="footer-bottom">
                    <p class="footer-copyright">
                        © ${new Date().getFullYear()} <a href="${BASE}index.html">Nova Nest Retreats</a>. All rights reserved.
                    </p>
                    <button class="back-to-top" id="back-to-top" aria-label="Back to top">
                        Back to top ${ICONS.chevronUp}
                    </button>
                </div>
            </div>
        </footer>
        `;
    }


    /* ============================================
       INTERACTIVITY
       ============================================ */

    function initNavbar() {
        const navbar    = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu   = document.getElementById('nav-menu');
        const overlay   = document.getElementById('nav-overlay');
        const profileDropdown = document.getElementById('profile-dropdown');
        const profileBtn = document.getElementById('profile-btn');

        if (!navbar) return;

        /* -- Scroll: add .scrolled class -- */
        let lastScroll = 0;
        const onScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            lastScroll = scrollY;
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // Run once on init

        /* -- Hamburger toggle -- */
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                const isOpen = navMenu.classList.contains('active');
                toggleMobileMenu(!isOpen);
            });
        }

        /* -- Mobile close button click handler -- */
        const mobileCloseBtn = document.getElementById('mobile-close-btn');
        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', () => {
                toggleMobileMenu(false);
            });
        }

        /* -- Overlay click closes menu -- */
        if (overlay) {
            overlay.addEventListener('click', () => {
                toggleMobileMenu(false);
            });
        }

        /* -- Close mobile menu on nav link click -- */
        const navLinks = navMenu ? navMenu.querySelectorAll('.nav-link') : [];
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 1024) {
                    toggleMobileMenu(false);
                }
            });
        });

        /* -- Profile dropdown toggle -- */
        if (profileBtn && profileDropdown) {
            profileBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = profileDropdown.classList.contains('open');
                profileDropdown.classList.toggle('open', !isOpen);
                profileBtn.setAttribute('aria-expanded', !isOpen);
            });

            // Close dropdown on outside click
            document.addEventListener('click', (e) => {
                if (!profileDropdown.contains(e.target)) {
                    profileDropdown.classList.remove('open');
                    profileBtn.setAttribute('aria-expanded', 'false');
                }
            });

            // Close on Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    profileDropdown.classList.remove('open');
                    profileBtn.setAttribute('aria-expanded', 'false');
                    toggleMobileMenu(false);
                }
            });
        }

        /* -- Theme & Direction Toggle handlers -- */
        const themeBtn = document.getElementById('theme-toggle-btn');
        const dirBtn = document.getElementById('dir-toggle-btn');
        
        if (themeBtn) {
            updateThemeUI();
            themeBtn.addEventListener('click', () => {
                const isLight = document.documentElement.classList.contains('light-theme');
                if (isLight) {
                    document.documentElement.classList.remove('light-theme');
                    localStorage.setItem('novanest_theme', 'dark');
                } else {
                    document.documentElement.classList.add('light-theme');
                    localStorage.setItem('novanest_theme', 'light');
                }
                updateThemeUI();
            });
        }
        
        if (dirBtn) {
            updateDirUI();
            dirBtn.addEventListener('click', () => {
                const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
                if (isRtl) {
                    document.documentElement.setAttribute('dir', 'ltr');
                    localStorage.setItem('novanest_direction', 'ltr');
                } else {
                    document.documentElement.setAttribute('dir', 'rtl');
                    localStorage.setItem('novanest_direction', 'rtl');
                }
                updateDirUI();
                
                // Dispatch a custom event to notify slider
                window.dispatchEvent(new CustomEvent('directionchanged'));
            });
        }

        /* -- Resize handler: reset menu on desktop -- */
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 1024) {
                    toggleMobileMenu(false);
                }
            }, 100);
        });
    }

    function updateThemeUI() {
        const isLight = document.documentElement.classList.contains('light-theme');
        const btn = document.getElementById('theme-toggle-btn');
        if (btn) {
            btn.innerHTML = isLight ? ICONS.sun : ICONS.theme;
            btn.setAttribute('aria-label', isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme');
        }
    }
    
    function updateDirUI() {
        const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
        const btn = document.getElementById('dir-toggle-btn');
        if (btn) {
            btn.innerHTML = isRtl ? 'LTR' : 'RTL';
            btn.setAttribute('aria-label', isRtl ? 'Switch to LTR Layout' : 'Switch to RTL Layout');
        }
    }

    function toggleMobileMenu(open) {
        const hamburger = document.getElementById('hamburger');
        const navMenu   = document.getElementById('nav-menu');
        const overlay   = document.getElementById('nav-overlay');

        if (!hamburger || !navMenu) return;

        hamburger.classList.toggle('active', open);
        navMenu.classList.toggle('active', open);
        hamburger.setAttribute('aria-expanded', open);

        if (overlay) {
            overlay.classList.toggle('active', open);
        }

        document.body.classList.toggle('menu-open', open);
    }


    /* ---- Newsletter Form ---- */
    function initNewsletter() {
        const form    = document.getElementById('footer-newsletter-form');

        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('footer-newsletter-email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email && emailRegex.test(email.value.trim())) {
                showToast('Subscribed successfully!', 'success');
                email.value = '';
            } else if (email) {
                // Shake animation on invalid
                email.style.outline = '2px solid #f43f5e';
                email.style.outlineOffset = '0';
                showToast('Please enter a valid email address.', 'error');
                setTimeout(() => {
                    email.style.outline = '';
                    email.style.outlineOffset = '';
                }, 1500);
            }
        });
    }

    // Expose showToast globally
    function showToast(msg, type = 'success') {
        let t = document.getElementById('toast-notification');
        if (!t) {
            t = document.createElement('div');
            t.id = 'toast-notification';
            t.className = 'toast';
            document.body.appendChild(t);
        }
        
        if (type === 'error') {
            t.style.border = '1px solid #f43f5e';
            t.style.borderLeft = '4px solid #f43f5e';
            t.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#f43f5e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg><span id="toast-text"></span>`;
        } else {
            t.style.border = '';
            t.style.borderLeft = '';
            t.innerHTML = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg><span id="toast-text"></span>`;
        }
        
        document.getElementById('toast-text').innerText = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 3500);
    }
    window.showToast = showToast;


    /* ---- Back to Top ---- */
    function initBackToTop() {
        const btn = document.getElementById('back-to-top');
        if (!btn) return;

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    /* ---- Footer Reveal Animation ---- */
    function initFooterReveal() {
        const cols = document.querySelectorAll('.footer-col');
        if (!cols.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        cols.forEach(col => observer.observe(col));
    }


    /* ---- Scroll Reveal for general elements ---- */
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        if (!revealElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }


    /* ---- Load Google Fonts ---- */
    function loadFonts() {
        // Preconnect
        const preconnect1 = document.createElement('link');
        preconnect1.rel = 'preconnect';
        preconnect1.href = 'https://fonts.googleapis.com';
        document.head.appendChild(preconnect1);

        const preconnect2 = document.createElement('link');
        preconnect2.rel = 'preconnect';
        preconnect2.href = 'https://fonts.gstatic.com';
        preconnect2.crossOrigin = 'anonymous';
        document.head.appendChild(preconnect2);

        // Font stylesheet
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800;900&display=swap';
        document.head.appendChild(fontLink);
    }


    /* ---- Dashboard Sidebar Mobile Drawer ---- */
    function initDashboardDrawer() {
        const sidebar = document.querySelector('.dash-sidebar');
        const layout  = document.querySelector('.dash-layout');
        if (!sidebar || !layout) return;

        // Create overlay backdrop if it doesn't exist
        let overlay = document.querySelector('.dash-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'dash-overlay';
            document.body.appendChild(overlay);
        }

        // Find or create dashboard mobile bar wrapper
        const mainContent = sidebar.nextElementSibling || document.querySelector('.dash-layout > div');
        if (!mainContent) return;

        let mobileBar = mainContent.querySelector('.dash-mobile-bar');
        if (!mobileBar) {
            mobileBar = document.createElement('div');
            mobileBar.className = 'dash-mobile-bar';
            mobileBar.innerHTML = `
                <div class="dash-mobile-toggle-btn" id="dash-toggle-btn" role="button" aria-label="Toggle Dashboard Menu">
                    <svg viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                    <span>Dashboard Menu</span>
                </div>
            `;
            mainContent.insertBefore(mobileBar, mainContent.firstChild);
        }

        const toggleBtn = document.getElementById('dash-toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = sidebar.classList.contains('active');
                toggleSidebarDrawer(!isActive);
            });
        }

        if (overlay) {
            overlay.addEventListener('click', () => {
                toggleSidebarDrawer(false);
            });
        }

        function toggleSidebarDrawer(open) {
            if (open) {
                sidebar.classList.add('active');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }

        // Handle window resizing
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                toggleSidebarDrawer(false);
            }
        });
    }


    /* ============================================
       INITIALIZATION
       ============================================ */
    function init() {
        loadFonts();
        createHeader();
        createFooter();

        // Wait a tick for DOM to be ready after injection
        requestAnimationFrame(() => {
            initNavbar();
            initNewsletter();
            initBackToTop();
            initFooterReveal();
            initScrollReveal();
            initDashboardDrawer();
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
