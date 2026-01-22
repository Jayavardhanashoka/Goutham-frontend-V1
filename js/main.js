/* =====================================================
   GADGETSNCONSOLES - INTERACTIVE JAVASCRIPT
   GSAP Animations & Interactions
   ===================================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // Initialize all features
    initParticles();
    initNavbar();
    initMobileMenu();
    initProductShowcase();
    initScrollAnimations();
    initProductCards();
    initContactForm();
    initSmoothScroll();
});

/* ----- Particle Background ----- */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${10 + Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
    }
}

/* ----- Navbar Scroll Effect ----- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/* ----- Mobile Menu Toggle ----- */
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Toggle icon between menu and X
        const icon = navToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

/* ----- GSAP Product Showcase ----- */
function initProductShowcase() {
    const menuItems = document.querySelectorAll('.menu-item');
    const showcaseImage = document.getElementById('showcaseImage');
    const mainGroup = document.getElementById('mainGroup');

    // Product images - using high quality gaming images
    const productImages = [
        'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&q=80', // PS Controller
        'https://images.unsplash.com/photo-1621259182181-1d8ec8484c7c?w=600&q=80', // Xbox
        'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=600&q=80', // Controllers
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80'  // Game CDs
    ];

    let currentIndex = 0;
    let masterTimeline = null;

    // Create animation loop for a specific clip path
    function createAnimationLoop(clipId, imageUrl) {
        const selector = `#${clipId} .path`;

        // Kill existing timeline
        if (masterTimeline) {
            masterTimeline.kill();
        }

        // Update image and clip-path
        showcaseImage.setAttribute('href', imageUrl);
        mainGroup.setAttribute('clip-path', `url(#${clipId})`);

        // Reset all paths
        gsap.set(selector, { scale: 0, transformOrigin: '50% 50%' });

        // Create new timeline
        masterTimeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });

        // 1. Animate IN (Expo Out)
        masterTimeline.to(selector, {
            scale: 1,
            duration: 0.8,
            stagger: {
                amount: 0.4,
                from: 'random'
            },
            ease: 'expo.out'
        });

        // 2. IDLE breathing effect (Sine In-Out)
        masterTimeline.to(selector, {
            scale: 1.05,
            duration: 1.5,
            yoyo: true,
            repeat: 1,
            ease: 'sine.inOut',
            stagger: {
                amount: 0.2,
                from: 'center'
            }
        });

        // 3. Animate OUT (Expo In)
        masterTimeline.to(selector, {
            scale: 0,
            duration: 0.6,
            stagger: {
                amount: 0.3,
                from: 'edges'
            },
            ease: 'expo.in'
        });
    }

    // Initialize with first item
    const firstItem = menuItems[0];
    if (firstItem) {
        const clipId = firstItem.dataset.clip;
        createAnimationLoop(clipId, productImages[0]);
    }

    // Handle menu item hover
    menuItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            if (index === currentIndex) return;

            // Update active state
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');

            currentIndex = index;
            const clipId = item.dataset.clip;

            // Trigger animation
            createAnimationLoop(clipId, productImages[index]);
        });
    });
}

/* ----- Scroll Reveal Animations ----- */
function initScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    gsap.from('.hero-badge', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
    });

    gsap.from('.hero-title', {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });

    gsap.from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out'
    });

    gsap.from('.hero-cta', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.hero-stats .stat', {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 1,
        stagger: 0.1,
        ease: 'power3.out'
    });

    gsap.from('.hero-visual', {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Section headers animation
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: 'power3.out'
        });
    });

    // Product cards animation
    gsap.utils.toArray('.product-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 60,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // Warranty cards animation
    gsap.utils.toArray('.warranty-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            scale: 0.95,
            duration: 0.8,
            delay: index * 0.15,
            ease: 'power3.out'
        });
    });

    // Team cards animation
    gsap.utils.toArray('.team-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 40,
            rotation: -3,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out'
        });
    });

    // Contact section animation
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.contact-form-wrapper', {
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out'
    });

    // Menu items animation - animate in once and stay visible
    gsap.set('.menu-item', { opacity: 1, x: 0 }); // Ensure visible by default
    gsap.from('.menu-item', {
        scrollTrigger: {
            trigger: '.showcase-menu',
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true
        },
        opacity: 0,
        x: -40,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
    });
}

/* ----- Product Card 3D Hover Effect ----- */
function initProductCards() {
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

/* ----- Contact Form ----- */
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Simple validation feedback
            const button = form.querySelector('button[type="submit"]');
            const originalHTML = button.innerHTML;

            // Show success state
            button.innerHTML = '<i data-lucide="check"></i> Message Sent!';
            button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            lucide.createIcons();

            // Log form data (in production, you'd send this to a server)
            console.log('Form submitted:', data);

            // Reset after 3 seconds
            setTimeout(() => {
                button.innerHTML = originalHTML;
                lucide.createIcons();
                form.reset();
            }, 3000);
        });

        // Input focus animations
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                gsap.to(input, {
                    scale: 1.02,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });

            input.addEventListener('blur', () => {
                gsap.to(input, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
        });
    }
}

/* ----- Smooth Scroll ----- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                // Use native smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ----- Bonus: Controller Parallax on Hero ----- */
document.addEventListener('mousemove', (e) => {
    const controller = document.querySelector('.controller-img');
    if (!controller) return;

    const rect = controller.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const moveX = (e.clientX - centerX) / 50;
    const moveY = (e.clientY - centerY) / 50;

    gsap.to(controller, {
        x: moveX,
        y: moveY,
        rotateY: moveX / 2,
        rotateX: -moveY / 2,
        duration: 0.5,
        ease: 'power2.out'
    });
});

/* ----- Bonus: Warranty Shield Hover Effect ----- */
document.querySelectorAll('.warranty-card').forEach(card => {
    const shield = card.querySelector('.warranty-shield');

    card.addEventListener('mouseenter', () => {
        gsap.to(shield, {
            scale: 1.1,
            rotation: 5,
            duration: 0.4,
            ease: 'back.out(1.7)'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(shield, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

/* ----- Bonus: Team Avatar Hover ----- */
document.querySelectorAll('.team-card').forEach(card => {
    const avatar = card.querySelector('.team-avatar');

    card.addEventListener('mouseenter', () => {
        gsap.to(avatar, {
            scale: 1.1,
            duration: 0.4,
            ease: 'back.out(1.7)'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(avatar, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

console.log('🎮 Gadgetsnconsoles website loaded! Game On!');
