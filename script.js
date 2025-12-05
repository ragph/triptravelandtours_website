// ========================================
// MOBILE MENU TOGGLE
// ========================================

const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
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

// ========================================
// SMOOTH SCROLLING FOR NAVIGATION LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            // Calculate header height dynamically (top bar + header)
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
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
});

// ========================================
// COUNTDOWN TIMER
// ========================================

function updateCountdown() {
    // Set target date (8 days from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 8);
    targetDate.setHours(14, 35, 42);

    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownItems = document.querySelectorAll('.countdown-item');
    if (countdownItems.length > 0) {
        countdownItems[0].querySelector('.count-number').textContent = String(days).padStart(2, '0');
        countdownItems[1].querySelector('.count-number').textContent = String(hours).padStart(2, '0');
        countdownItems[2].querySelector('.count-number').textContent = String(minutes).padStart(2, '0');
        countdownItems[3].querySelector('.count-number').textContent = String(seconds).padStart(2, '0');
    }
}

// Update countdown every second
if (document.querySelector('.countdown')) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ========================================
// SWIPER SLIDER FOR EXPLORE SECTION
// ========================================

if (document.querySelector('.explore-slider')) {
    const exploreSwiper = new Swiper('.explore-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 25,
                centeredSlides: true,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30,
                centeredSlides: true,
            },
        },
    });
}

// ========================================
// SWIPER SLIDER FOR TESTIMONIALS SECTION
// ========================================

if (document.querySelector('.testimonials-slider')) {
    const testimonialsSwiper = new Swiper('.testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
    });
}

// ========================================
// SEARCH BOX TAB SWITCHING
// ========================================

const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// ========================================
// FORM VALIDATION FOR NEWSLETTER
// ========================================

const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('.newsletter-input');
        const email = emailInput.value.trim();

        if (validateEmail(email)) {
            // Show success message
            alert('Thank you for subscribing! Check your email for exclusive travel deals.');
            emailInput.value = '';
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========================================
// CONTACT FORM VALIDATION & SUBMISSION
// ========================================

const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const firstName = contactForm.querySelector('#firstName').value.trim();
        const lastName = contactForm.querySelector('#lastName').value.trim();
        const email = contactForm.querySelector('#email').value.trim();
        const phone = contactForm.querySelector('#phone').value.trim();
        const subject = contactForm.querySelector('#subject').value;
        const message = contactForm.querySelector('#message').value.trim();

        // Validate email
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Validate required fields
        if (!firstName || !lastName || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Show success message
        alert(`Thank you for contacting us, ${firstName}! We'll get back to you within 24 hours at ${email}.`);

        // Reset form
        contactForm.reset();
    });
}

// ========================================
// PLAY VIDEO BUTTON
// ========================================

const playBtn = document.querySelector('.play-btn');
if (playBtn) {
    playBtn.addEventListener('click', () => {
        // In a real implementation, this would open a video modal
        alert('Video player would open here! This is a demo landing page.');
    });
}

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
const animateElements = document.querySelectorAll('.feature-card, .deal-card, .blog-card');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// ACTIVE NAVIGATION HIGHLIGHT ON SCROLL
// ========================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

// Combine scroll handlers for better performance
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

function handleScroll() {
    const scrollY = window.pageYOffset || window.scrollY;

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        if (scrollY === 0) {
            header.classList.remove('scrolled');
        } else {
            header.classList.add('scrolled');
        }
    }

    // Active navigation highlighting
    const topBar = document.querySelector('.top-bar');
    const topBarHeight = topBar ? topBar.offsetHeight : 0;
    const headerHeight = header ? header.offsetHeight : 0;
    const scrollOffset = topBarHeight + headerHeight + 50;

    // Find which section is currently in view
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Check if this section is in the viewport
        if (scrollY + scrollOffset >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    // If no section matched (we're in a section without ID), keep the previous active one
    // or default to the last section we scrolled past
    if (!current) {
        for (let i = sections.length - 1; i >= 0; i--) {
            if (scrollY + scrollOffset >= sections[i].offsetTop) {
                current = sections[i].getAttribute('id');
                break;
            }
        }
    }

    // If still no match, default to home
    if (!current) {
        current = 'home';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ========================================
// SWAP BUTTON ANIMATION
// ========================================

const swapBtn = document.querySelector('.swap-btn');
if (swapBtn) {
    swapBtn.addEventListener('click', () => {
        const fromInput = document.querySelector('.search-form .form-group:nth-child(1) input');
        const toInput = document.querySelector('.search-form .form-group:nth-child(3) input');

        if (fromInput && toInput) {
            const temp = fromInput.value;
            fromInput.value = toInput.value;
            toInput.value = temp;
        }
    });
}

// ========================================
// PRELOAD IMAGES
// ========================================

window.addEventListener('load', () => {
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.addEventListener('load', () => {
                img.style.transition = 'opacity 0.3s ease';
                img.style.opacity = '1';
            });
        }
    });
});

// ========================================
// LAZY LOADING FOR IMAGES
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// SCROLL TO TOP BUTTON (Optional Enhancement)
// ========================================

const createScrollToTop = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #1D4E9B;
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

createScrollToTop();

// ========================================
// INSTAGRAM MARQUEE SLIDER
// ========================================

const instagramWrapper = document.querySelector(".marquee-wrapper");
if (instagramWrapper) {
    const container = instagramWrapper.querySelector(".marquee-inner");

    // Clone all children of the gallery for seamless loop
    const items = Array.from(container.querySelectorAll('.insta-item'));
    items.forEach(item => {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
    });

    let scrollAmount = 0;
    let isPaused = false;
    const scrollSpeed = 1;

    function marqueeScroll() {
        if (!isPaused) {
            scrollAmount += scrollSpeed;
            container.style.transform = `translateX(-${scrollAmount}px)`;

            // Reset when we've scrolled through half (original items width)
            const itemWidth = items[0].offsetWidth + 30; // width + gap
            const totalOriginalWidth = itemWidth * items.length;

            if (scrollAmount >= totalOriginalWidth) {
                scrollAmount = 0;
            }
        }
        requestAnimationFrame(marqueeScroll);
    }
    marqueeScroll();

    // Pause on hover
    instagramWrapper.addEventListener("mouseenter", () => isPaused = true);
    instagramWrapper.addEventListener("mouseleave", () => isPaused = false);
}


// ========================================
// CONSOLE MESSAGE
// ========================================