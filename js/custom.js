// Navbar scroll effect
const navbar = document.getElementById('navbar');
const navCta = document.getElementById('navCta');
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
const themeToggles = [themeToggle, themeToggleMobile].filter(Boolean);
const themePreferenceKey = 'auliasoft-theme';
const sections = document.querySelectorAll('section[id]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateThemeToggleState(isDark) {
    themeToggles.forEach(toggle => {
        const icon = toggle.querySelector('i');
        const label = toggle.querySelector('span');

        toggle.setAttribute('aria-pressed', String(isDark));
        toggle.setAttribute('aria-label', isDark ? 'Aktifkan light mode' : 'Aktifkan dark mode');

        if (icon) {
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }

        if (label) {
            label.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        }
    });
}

function applyTheme(theme) {
    const isDark = theme === 'dark';

    document.body.classList.toggle('theme-dark', isDark);
    updateThemeToggleState(isDark);
}

const savedTheme = localStorage.getItem(themePreferenceKey);
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

applyTheme(initialTheme);

themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';

        applyTheme(nextTheme);
        localStorage.setItem(themePreferenceKey, nextTheme);
    });
});

if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
}

const lenis = !prefersReducedMotion && window.Lenis
    ? new Lenis({
        duration: 1.15,
        smoothWheel: true,
        smoothTouch: false
    })
    : null;

if (lenis) {
    if (window.ScrollTrigger) {
        lenis.on('scroll', ScrollTrigger.update);
    }

    if (window.gsap) {
        gsap.ticker.add(time => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);
    } else {
        const raf = time => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);
    }
}

function scrollToTarget(targetSelector) {
    const target = document.querySelector(targetSelector);

    if (!target) {
        return;
    }

    const offset = 88;

    if (lenis) {
        lenis.scrollTo(target, { offset: -offset });
    } else {
        window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset,
            behavior: 'smooth'
        });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
        const targetSelector = link.getAttribute('href');

        if (!targetSelector || targetSelector === '#') {
            return;
        }

        const target = document.querySelector(targetSelector);

        if (!target) {
            return;
        }

        event.preventDefault();
        scrollToTarget(targetSelector);

        if (link.classList.contains('mobile-link')) {
            closeMenu();
        }
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navCta.style.display = 'inline-flex';
    } else {
        navbar.classList.remove('scrolled');
        navCta.style.display = 'none';
    }
});

// Mobile menu
const mobileToggle = document.getElementById('mobileToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileClose = document.getElementById('mobileClose');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu() {
    mobileMenu.classList.add('open');
    mobileOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    mobileMenu.classList.remove('open');
    mobileOverlay.style.display = 'none';
    document.body.style.overflow = '';
}

mobileToggle.addEventListener('click', openMenu);
mobileClose.addEventListener('click', closeMenu);
mobileOverlay.addEventListener('click', closeMenu);

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const wasActive = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

        if (!wasActive) {
            item.classList.add('active');
        }
    });
});

if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
    gsap.set('.animate-on-scroll', { autoAlpha: 0, y: 48 });

    document.querySelectorAll('.animate-on-scroll').forEach((element, index) => {
        gsap.to(element, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: Math.min(index * 0.04, 0.2),
            scrollTrigger: {
                trigger: element,
                start: 'top 82%'
            }
        });
    });

    gsap.from('.hero-content > *', {
        autoAlpha: 0,
        y: 32,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12
    });

    gsap.from('.hero-card', {
        autoAlpha: 0,
        x: 36,
        scale: 0.96,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });

    gsap.from('.hero-badge', {
        autoAlpha: 0,
        y: 16,
        duration: 0.55,
        ease: 'power2.out',
        stagger: 0.08,
        delay: 0.35
    });

    gsap.from('.hero-stat', {
        autoAlpha: 0,
        y: 20,
        scale: 0.94,
        duration: 0.6,
        ease: 'back.out(1.4)',
        stagger: 0.1,
        delay: 0.45
    });

    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header.children, {
            autoAlpha: 0,
            y: 22,
            duration: 0.7,
            ease: 'power2.out',
            stagger: 0.08,
            scrollTrigger: {
                trigger: header,
                start: 'top 82%'
            }
        });
    });

    gsap.utils.toArray('.showcase-block').forEach((block, index) => {
        const text = block.querySelector('.showcase-text');
        const visual = block.querySelector('.showcase-phone');
        const direction = block.classList.contains('reverse') ? -1 : 1;

        if (text) {
            gsap.from(text.children, {
                autoAlpha: 0,
                x: 28 * direction,
                duration: 0.75,
                ease: 'power3.out',
                stagger: 0.08,
                scrollTrigger: {
                    trigger: block,
                    start: 'top 76%'
                }
            });
        }

        if (visual) {
            gsap.from(visual, {
                autoAlpha: 0,
                x: -22 * direction,
                y: 28,
                scale: 0.96,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: block,
                    start: 'top 76%'
                },
                delay: Math.min(index * 0.04, 0.12)
            });
        }
    });

    gsap.utils.toArray('.roadmap-grid > div').forEach((card, index) => {
        gsap.from(card, {
            autoAlpha: 0,
            y: 36,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.roadmap-grid',
                start: 'top 80%'
            },
            delay: index * 0.08
        });
    });

    gsap.utils.toArray('.faq-item').forEach((item, index) => {
        gsap.from(item, {
            autoAlpha: 0,
            x: index % 2 === 0 ? -18 : 18,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 88%'
            }
        });
    });

    gsap.from('.contact-info > *', {
        autoAlpha: 0,
        y: 26,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 78%'
        }
    });

    gsap.from('.contact-form-wrapper', {
        autoAlpha: 0,
        x: 24,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact-grid',
            start: 'top 78%'
        }
    });

    ['.services-grid', '.features-grid', '.products-grid', '.pricing-grid', '.testimonials-grid'].forEach(selector => {
        const grid = document.querySelector(selector);

        if (!grid) {
            return;
        }

        gsap.from(grid.children, {
            autoAlpha: 0,
            y: 40,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
                trigger: grid,
                start: 'top 78%'
            }
        });
    });

    gsap.utils.toArray('.showcase-phone, .about-visual .about-img-wrapper, .why-image-stack').forEach(element => {
        gsap.to(element, {
            yPercent: -8,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.1
            }
        });
    });

    gsap.to('.hero-content', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.hero-card', {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2
        }
    });
} else {
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        element.style.opacity = '1';
        element.style.transform = 'none';
    });
}

// Counter animation
function animateCounters() {
    document.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = target;
            }
        }

        requestAnimationFrame(update);
    });
}

// Trigger counters when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateCounters();
        heroObserver.disconnect();
    }
});
heroObserver.observe(document.querySelector('.hero'));

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    if (lenis) {
        lenis.scrollTo(0);
        return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Active nav link highlighting
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);

        if (link) {
            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-links a').forEach(a => a.style.color = '');
                link.style.color = 'var(--primary)';
            }
        }
    });
});
