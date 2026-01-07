/**
 * Component Loader Utility
 * Loads reusable HTML components (header, footer, etc.) into pages
 */

class ComponentLoader {
    /**
     * Get cache busting version string
     * Uses BUILD_TIME if available, otherwise generates from current date
     */
    static getCacheVersion() {
        // Check if version.js is loaded
        if (window.CACHE_VERSION) {
            return window.CACHE_VERSION;
        }
        // Fallback: Use current date as YYYYMMDD
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    }

    /**
     * Load a component from the components directory
     * @param {string} componentName - Name of the component (e.g., 'header', 'footer')
     * @param {string} targetSelector - CSS selector where to inject the component
     */
    static async loadComponent(componentName, targetSelector) {
        try {
            const version = this.getCacheVersion();
            const response = await fetch(`/components/${componentName}.html?v=${version}`);

            if (!response.ok) {
                throw new Error(`Failed to load ${componentName}: ${response.status}`);
            }

            const html = await response.text();
            const target = document.querySelector(targetSelector);

            if (target) {
                target.innerHTML = html;
            } else {
                console.error(`Target element "${targetSelector}" not found`);
            }
        } catch (error) {
            console.error(`Error loading component ${componentName}:`, error);
        }
    }

    /**
     * Initialize navigation-related functionality after header is loaded
     */
    static initializeNavigation() {
        // Mobile menu toggle
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href !== '#' && document.querySelector(href)) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    const topBar = document.querySelector('.top-bar');
                    const header = document.querySelector('.header');
                    const topBarHeight = topBar ? topBar.offsetHeight : 0;
                    const headerHeight = header ? header.offsetHeight : 0;
                    const headerOffset = topBarHeight + headerHeight;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        const icon = mobileMenuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
            });
        });

        // Initialize scroll spy for active navigation
        this.initializeScrollSpy();
    }

    /**
     * Initialize scroll spy for active navigation states
     */
    static initializeScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

        if (sections.length === 0 || navLinks.length === 0) {
            return; // Exit if no sections or nav links found
        }

        let ticking = false;

        const handleScroll = () => {
            const scrollY = window.pageYOffset || window.scrollY;
            const header = document.querySelector('.header');
            const topBar = document.querySelector('.top-bar');
            const topBarHeight = topBar ? topBar.offsetHeight : 0;
            const headerHeight = header ? header.offsetHeight : 0;
            const scrollOffset = topBarHeight + headerHeight + 50;

            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollY + scrollOffset >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            // If no section matched, find the last section we scrolled past
            if (!current) {
                for (let i = sections.length - 1; i >= 0; i--) {
                    if (scrollY + scrollOffset >= sections[i].offsetTop) {
                        current = sections[i].getAttribute('id');
                        break;
                    }
                }
            }

            // Default to home if still no match
            if (!current) {
                current = 'home';
            }

            // Update active states
            navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === `#${current}` || (href === '/#' + current)) {
                    link.classList.add('active');
                }
            });
        };

        // Use requestAnimationFrame for better performance
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Run once on load to set initial state
        handleScroll();
    }

    /**
     * Load all common components (header and footer)
     */
    static async loadAll() {
        await Promise.all([
            this.loadComponent('header', '#header-placeholder'),
            this.loadComponent('footer', '#footer-placeholder')
        ]);

        // After loading components, initialize navigation
        this.initializeNavigation();

        // Update copyright year dynamically
        const copyrightYear = document.getElementById('copyright-year');
        if (copyrightYear) {
            copyrightYear.textContent = new Date().getFullYear();
        }
    }
}

// Auto-load components when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ComponentLoader.loadAll());
} else {
    ComponentLoader.loadAll();
}
