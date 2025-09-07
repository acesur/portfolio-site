document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for navbar height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Also handle CTA button smooth scrolling
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active nav link highlighting
    const sections = document.querySelectorAll('section');
    
    function highlightNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // Animate elements on scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay for staggered animation
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.experience-item, .project-card, .contact-item, .education-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Typing effect for hero tagline
    const tagline = document.querySelector('.hero-tagline');
    if (tagline) {
        const originalText = tagline.textContent;
        
        function typeWriter() {
            tagline.textContent = '';
            tagline.style.borderRight = '2px solid rgba(255, 255, 255, 0.7)';
            
            let i = 0;
            const timer = setInterval(() => {
                if (i < originalText.length) {
                    tagline.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    setTimeout(() => {
                        tagline.style.borderRight = 'none';
                    }, 500);
                }
            }, 100);
        }

        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Add scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add loading animation
    function addLoadingAnimation() {
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');
        
        if (heroText && heroImage) {
            heroText.style.opacity = '0';
            heroText.style.transform = 'translateY(30px)';
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'translateX(30px)';
            
            setTimeout(() => {
                heroText.style.transition = 'all 0.8s ease';
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateY(0)';
            }, 300);
            
            setTimeout(() => {
                heroImage.style.transition = 'all 0.8s ease';
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateX(0)';
            }, 600);
        }
    }

    // Initialize loading animation
    addLoadingAnimation();

    // Add interactive hover effects for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add particle effect to hero section (optional enhancement)
    function createParticles() {
        const hero = document.querySelector('.hero');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            hero.style.position = 'relative';
            hero.appendChild(particle);
        }
        
        // Add CSS animation for particles
        if (!document.querySelector('#particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
                    50% { transform: translateY(-20px) rotate(180deg); opacity: 0.8; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize particles
    createParticles();

    // Email validation function (for future contact form)
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Add click tracking for project links (analytics ready)
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Analytics tracking can be added here
            console.log('Project link clicked:', this.textContent);
        });
    });

    // Add performance optimization: lazy load images when added
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    }

    // Error handling for missing elements
    function handleMissingElements() {
        const requiredElements = ['.navbar', '.hero', '.about', '.projects', '.contact'];
        requiredElements.forEach(selector => {
            if (!document.querySelector(selector)) {
                console.warn(`Required element ${selector} not found`);
            }
        });
    }

    handleMissingElements();

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Intersection observer for counting animations (when needed)
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            let count = 0;
            const increment = target / 100;
            
            const timer = setInterval(() => {
                count += increment;
                if (count >= target) {
                    count = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(count);
            }, 20);
        });
    }

    // Initialize everything
    console.log('Portfolio website loaded successfully');
});