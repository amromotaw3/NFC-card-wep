/**
 * NFC Card Web - Main Application Script (Simplified Static Version)
 * Scout Team Website - Main Page Logic
 * @version 3.0.0
 */

// ============================================================================
// INITIALIZATION
// ============================================================================

/** @type {string} Current language - 'ar' or 'en' */
let currentLanguage = 'ar';

/**
 * Initialize the application when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initLanguage();
    initMobileMenu();
    initScrollEffects();
    initContactForm();
    setCurrentYear();
    initThemeToggle();
    initVisitCounter();
    initSplashScreen();
});

// ============================================================================
// THEME MANAGEMENT
// ============================================================================

/**
 * Initialize theme from saved preference or system preference
 */
function initTheme() {
    try {
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            // Use saved preference
            applyTheme(savedTheme);
        } else {
            // Default to light theme
            applyTheme('light');
        }
    } catch (e) {
        console.warn('Could not read theme preference:', e);
        applyTheme('light');
    }
}

/**
 * Apply theme to document
 * @param {string} theme - 'dark' or 'light'
 */
function applyTheme(theme) {
    const body = document.body;
    const themeIconLight = document.getElementById('themeIconLight');
    const themeIconDark = document.getElementById('themeIconDark');

    if (theme === 'dark') {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        themeIconLight?.classList.add('hidden');
        themeIconDark?.classList.remove('hidden');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        themeIconLight?.classList.remove('hidden');
        themeIconDark?.classList.add('hidden');
    }

    // Save preference
    try {
        localStorage.setItem('theme', theme);
    } catch (e) {
        console.warn('Could not save theme preference:', e);
    }
}

/**
 * Toggle between light and dark theme
 */
function toggleTheme() {
    const isDark = document.body.classList.contains('dark-theme');
    applyTheme(isDark ? 'light' : 'dark');
}

/**
 * Initialize theme toggle button
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}


// ============================================================================
// LANGUAGE MANAGEMENT
// ============================================================================

/**
 * Initialize language from saved preference
 */
function initLanguage() {
    try {
        const savedLanguage = localStorage.getItem('language');
        currentLanguage = savedLanguage === 'en' ? 'en' : 'ar';
    } catch (e) {
        console.warn('Could not read language preference:', e);
        currentLanguage = 'ar';
    }
    applyLanguage();
}

/**
 * Apply current language to all translatable elements
 */
function applyLanguage() {
    const elements = document.querySelectorAll('[data-ar], [data-en]');

    elements.forEach(element => {
        const textAr = element.dataset.ar;
        const textEn = element.dataset.en;
        const targetText = currentLanguage === 'ar' ? textAr : textEn;

        if (!targetText) return;

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = targetText;
        } else {
            element.textContent = targetText;
        }
    });

    // Update document direction and language
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;

    // Save preference
    try {
        localStorage.setItem('language', currentLanguage);
    } catch (e) {
        console.warn('Could not save language preference:', e);
    }
}

/**
 * Toggle between Arabic and English
 */
function toggleLanguage() {
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    applyLanguage();
}

// Language toggle button event
const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', toggleLanguage);
}

// ============================================================================
// MOBILE NAVIGATION
// ============================================================================

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const menuLinks = document.querySelectorAll('.nav-mobile a');

    if (!menuToggle || !mobileMenu) return;

    /**
     * Open mobile menu
     */
    function openMenu() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay?.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close mobile menu
     */
    function closeMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay?.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    // Toggle menu on hamburger click
    menuToggle.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('active');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close on overlay click
    mobileMenuOverlay?.addEventListener('click', closeMenu);

    // Close on close button click
    mobileMenuClose?.addEventListener('click', closeMenu);

    // Close on link click
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });
}

// ============================================================================
// SCROLL EFFECTS
// ============================================================================

/**
 * Initialize all scroll-related effects
 */
function initScrollEffects() {
    initScrollIndicator();
    initSmoothScrolling();
    initActiveNavHighlight();
    initIntersectionObserver();
    initGlassmorphicHeader();
    initParallaxEffect();
    initCounterAnimation();
}

/**
 * Scroll indicator visibility based on hero section
 */
function initScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const heroSection = document.getElementById('home');

    if (!scrollIndicator || !heroSection) return;

    function updateIndicator() {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        if (window.scrollY > heroBottom - 100) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    }

    window.addEventListener('scroll', updateIndicator, { passive: true });
    updateIndicator();
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Highlight active navigation link based on scroll position
 */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-mobile a');

    function highlightActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
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

    window.addEventListener('scroll', highlightActiveLink, { passive: true });
    highlightActiveLink();
}

/**
 * Intersection observer for card animations
 */
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Glassmorphic header effect on scroll
 */
function initGlassmorphicHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScrollY = 0;
    let ticking = false;

    function updateHeader() {
        const scrollY = window.scrollY;
        lastScrollY = scrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });

    // Initial check
    updateHeader();
}

/**
 * Subtle parallax effect for hero background
 */
function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    if (!heroBackground) return;

    // Only enable on devices that can handle it well
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;

    function updateParallax() {
        const scrollY = window.scrollY;
        const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;

        // Only apply parallax when in hero section
        if (scrollY < heroHeight) {
            const translateY = scrollY * 0.4;
            heroBackground.style.transform = `translateY(${translateY}px) scale(1.1)`;
        }

        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Animated counter for statistics
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-value');
    if (counters.length === 0) return;

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

/**
 * Animate a counter element
 * @param {HTMLElement} element - Counter element
 */
function animateCounter(element) {
    const text = element.textContent || '';
    const hasPlus = text.includes('+');
    const numericPart = text.replace(/[^0-9]/g, '');
    const targetValue = parseInt(numericPart, 10);

    if (isNaN(targetValue)) return;

    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const startValue = 0;

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easedProgress);

        element.textContent = hasPlus ? `${currentValue}+` : currentValue.toString();

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            // Ensure final value is exact
            element.textContent = text;
        }
    }

    requestAnimationFrame(updateCounter);
}

// ============================================================================
// CONTACT FORM
// ============================================================================

/**
 * Initialize contact form handling
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', handleContactFormSubmit);
}

/**
 * Handle contact form submission
 * @param {Event} e - Submit event
 */
async function handleContactFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');

    // Get form values
    const name = document.getElementById('formName')?.value.trim();
    const email = document.getElementById('formEmail')?.value.trim();
    const message = document.getElementById('formMessage')?.value.trim();

    // Validate
    const errors = validateContactForm(name, email, message);
    if (errors.length > 0) {
        showFormErrors(errors);
        return;
    }

    // Clear previous errors
    clearFormErrors();

    // Show loading state
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.classList.add('hidden');
    if (btnLoading) btnLoading.classList.remove('hidden');

    try {
        // Submit form using FormSubmit.co (AJAX mode)
        const formData = new FormData(form);

        let response;
        try {
            response = await fetch('https://formsubmit.co/ajax/scouts.th.abdrahman.bin.qasim@gmail.com', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });
        } catch (fetchError) {
            showToast(
                currentLanguage === 'ar'
                    ? 'حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى'
                    : 'Connection error. Please try again',
                'error'
            );
            return;
        }

        if (response.ok) {
            showToast(
                currentLanguage === 'ar'
                    ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً'
                    : 'Message sent successfully! We\'ll get back to you soon',
                'success'
            );

            // Reset form
            form.reset();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Submission failed');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showToast(
            currentLanguage === 'ar'
                ? 'حدث خطأ في الإرسال. يرجى المحاولة مرة أخرى'
                : 'Error sending message. Please try again',
            'error'
        );
    } finally {
        // Restore button
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.classList.remove('hidden');
        if (btnLoading) btnLoading.classList.add('hidden');
    }
}

/**
 * Validate contact form
 * @param {string} name - Name value
 * @param {string} email - Email value
 * @param {string} message - Message value
 * @returns {Array} Array of error objects
 */
function validateContactForm(name, email, message) {
    const errors = [];

    if (!name) {
        errors.push({
            field: 'name',
            message: currentLanguage === 'ar' ? 'الاسم مطلوب' : 'Name is required'
        });
    }

    if (!email) {
        errors.push({
            field: 'email',
            message: currentLanguage === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Email is required'
        });
    } else if (!isValidEmail(email)) {
        errors.push({
            field: 'email',
            message: currentLanguage === 'ar' ? 'البريد الإلكتروني غير صحيح' : 'Invalid email address'
        });
    }

    if (!message) {
        errors.push({
            field: 'message',
            message: currentLanguage === 'ar' ? 'الرسالة مطلوبة' : 'Message is required'
        });
    }

    return errors;
}

/**
 * Check if email is valid
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show form errors
 * @param {Array} errors - Array of error objects
 */
function showFormErrors(errors) {
    clearFormErrors();

    errors.forEach(error => {
        const errorEl = document.getElementById(`${error.field}Error`);
        if (errorEl) {
            errorEl.textContent = error.message;
            errorEl.classList.add('visible');
        }

        const inputEl = document.getElementById(`form${error.field.charAt(0).toUpperCase() + error.field.slice(1)}`);
        if (inputEl) {
            inputEl.classList.add('error');
        }
    });
}

/**
 * Clear all form errors
 */
function clearFormErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
        el.classList.remove('visible');
    });

    document.querySelectorAll('.contact-form input, .contact-form textarea').forEach(el => {
        el.classList.remove('error');
    });
}

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type ('success', 'error', 'info')
 * @param {number} duration - Duration in milliseconds (default: 4000)
 */
function showToast(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    // Icon
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' :
        type === 'error' ? 'fas fa-exclamation-circle' :
            'fas fa-info-circle';
    toast.appendChild(icon);

    // Message
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    toast.appendChild(messageSpan);

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close';
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.addEventListener('click', () => removeToast(toast));
    toast.appendChild(closeBtn);

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('visible');
    });

    // Auto remove
    setTimeout(() => removeToast(toast), duration);
}

/**
 * Remove toast
 * @param {HTMLElement} toast - Toast element to remove
 */
function removeToast(toast) {
    toast.classList.remove('visible');
    toast.classList.add('hiding');

    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Set current year in footer
 */
function setCurrentYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================================================================
// VISIT COUNTER (Global via CounterAPI)
// ============================================================================

/**
 * Initialize and update global visit counter
 */
async function initVisitCounter() {
    const visitorElement = document.getElementById('visitorsCountValue');
    if (!visitorElement) return;

    try {
        // We use counterapi.dev as a reliable free alternative
        // Namespace: scout-team-abdulrahman, Key: visits
        const response = await fetch('https://api.counterapi.dev/v1/scout-team-abdulrahman/visits/up');

        if (response.ok) {
            const data = await response.json();
            const count = data.count;

            // Set value and trigger animation if needed
            visitorElement.textContent = count.toLocaleString();

            // Re-trigger counter animation for this specific element
            if (typeof animateCounter === 'function') {
                animateCounter(visitorElement);
            }
        } else {
            // Fallback to a placeholder if API fails
            visitorElement.textContent = '1,250+';
        }
    } catch (error) {
        console.warn('Visit counter error:', error);
        visitorElement.textContent = '1,250+';
    }
}

// ============================================================================
// SPLASH SCREEN LOGIC
// ============================================================================

/**
 * Initialize and handle the splash screen visibility
 */
function initSplashScreen() {
    const splash = document.getElementById('splashScreen');
    const particlesContainer = document.getElementById('splashParticles');
    const closeBtn = document.getElementById('closeSplash');

    if (!splash) return;

    // Check if user has already seen the splash screen in this session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

    if (hasSeenSplash) {
        splash.style.display = 'none';
        return;
    }

    // Create particles dynamically
    createSplashParticles(particlesContainer);

    // Sequence the animation
    document.body.style.overflow = 'hidden';

    // Step 1: Show Logo
    setTimeout(() => {
        splash.classList.add('logo-visible');
    }, 400);

    // Step 2: Move Logo Up
    setTimeout(() => {
        splash.classList.add('logo-up');
    }, 1500);

    // Step 3: Show Content
    setTimeout(() => {
        splash.classList.add('content-visible');
    }, 2000);

// Handle button click (Splash Screen)
    closeBtn?.addEventListener('click', () => {
        splash.classList.add('fade-out');
        document.body.style.overflow = '';
        sessionStorage.setItem('hasSeenSplash', 'true');

        // Remove from DOM after transition
        setTimeout(() => {
            splash.remove();
        }, 1200);
    });

    // Handle vCard and Share buttons
    document.getElementById('saveContactBtn')?.addEventListener('click', downloadVCard);
    document.getElementById('shareBtnTop')?.addEventListener('click', shareWebsite);
}

/**
 * Download vCard for the scout leader
 */
function downloadVCard() {
    const vcard = 'BEGIN:VCARD\n' +
        'VERSION:3.0\n' +
        'FN:القائد/ عبدالرحمن الرميح\n' + // Correct Name
        'ORG:فرقة عبدالرحمن بن القاسم الكشفية\n' + // Correct Organization
        'TEL;TYPE=CELL,VOICE:+966563055595\n' + // Correct Phone
        'EMAIL:scouts.th.abdrahman.bin.qasim@gmail.com\n' + // Correct Email
        'ADR;TYPE=WORK:;;المملكة العربية السعودية - المنطقة الشرقية - الخبر;;;;\n' + // Correct Address
        'END:VCARD';

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Abdulrahman_Al_Rumaih_Contact.vcf');
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }, 100);

    if (window.showToast) {
        showToast('جاري تحميل بيانات الاتصال...', 'success');
    }
}

/**
 * Share website using Web Share API
 */
async function shareWebsite() {
    const shareData = {
        title: 'فرقة كشافة نادي الخليج',
        text: 'تعرف على فرقة كشافة نادي الخليج وإنجازاتها الرائدة.',
        url: window.location.href
    };

    try {
        if (navigator.share) {
            await navigator.share(shareData);
        } else {
            // Fallback: Copy to clipboard
            await navigator.clipboard.writeText(window.location.href);
            if (window.showToast) {
                showToast('تم نسخ رابط الموقع للمشاركة', 'info');
            }
        }
    } catch (err) {
        console.error('Error sharing:', err);
    }
}

/**
 * Create random floating particles for the splash background
 * @param {HTMLElement} container 
 */
function createSplashParticles(container) {
    if (!container) return;

    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random positions
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;

        // Random movement distances
        const moveX = (Math.random() - 0.5) * 400;
        const moveY = (Math.random() - 0.5) * 400;
        particle.style.setProperty('--move-x', `${moveX}px`);
        particle.style.setProperty('--move-y', `${moveY}px`);

        // Random delays and duration
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${10 + Math.random() * 20}s`;

        container.appendChild(particle);
    }
}


// ============================================================================
// EXPOSE FOR GLOBAL ACCESS
// ============================================================================

window.showToast = showToast;
window.downloadVCard = downloadVCard;
window.shareWebsite = shareWebsite;
