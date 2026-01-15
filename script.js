/**
 * NFC Card Web - Main Application Script
 * Scout Team Website - Main Page Logic
 * @version 2.0.0
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
    loadDynamicContent();
    setupStorageListener();
    setCurrentYear();
    initThemeToggle();
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
            // Default to light theme instead of system preference
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
    // Re-render dynamic content with new language
    loadDynamicContent();
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
            // Using window.scrollY instead of deprecated pageYOffset
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
// DYNAMIC CONTENT RENDERING
// ============================================================================

/**
 * Load and render all dynamic content from storage
 */
function loadDynamicContent() {
    const data = ScoutUtils.getStoredData();

    renderHeroSection(data.hero);
    renderAchievements(data.achievements);
    renderParticipation(data.participation);
    renderAboutSection(data.about);
    renderLeaderSection(data.leader);
    renderVideos(data.videos);
    renderContactInfo(data.contact);

    // Re-apply language after rendering
    applyLanguage();

    // Re-initialize observer for new elements
    initIntersectionObserver();
}

/**
 * Render hero section content
 * @param {Object} heroData - Hero section data
 */
function renderHeroSection(heroData) {
    if (!heroData) return;

    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    if (heroTitle) {
        heroTitle.dataset.ar = heroData.titleAr || '';
        heroTitle.dataset.en = heroData.titleEn || '';
        heroTitle.textContent = currentLanguage === 'ar' ? heroData.titleAr : heroData.titleEn;
    }

    if (heroSubtitle) {
        heroSubtitle.dataset.ar = heroData.subtitleAr || '';
        heroSubtitle.dataset.en = heroData.subtitleEn || '';
        heroSubtitle.textContent = currentLanguage === 'ar' ? heroData.subtitleAr : heroData.subtitleEn;
    }
}

/**
 * Render achievements grid
 * @param {Array} achievements - Achievements data array
 */
function renderAchievements(achievements) {
    const grid = document.getElementById('achievementsGrid');
    const emptyState = document.getElementById('achievementsEmpty');

    if (!grid) return;

    // Clear existing content
    grid.innerHTML = '';

    if (!achievements || achievements.length === 0) {
        grid.classList.add('hidden');
        emptyState?.classList.remove('hidden');
        return;
    }

    grid.classList.remove('hidden');
    emptyState?.classList.add('hidden');

    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();

    achievements.forEach((item, index) => {
        const card = createAchievementCard(item, index);
        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
}

/**
 * Create achievement card element safely
 * @param {Object} item - Achievement data
 * @param {number} index - Card index for animation delay
 * @returns {HTMLElement} Achievement card element
 */
function createAchievementCard(item, index) {
    const card = document.createElement('div');
    card.className = 'achievement-card animate-on-scroll';
    card.style.animationDelay = `${index * 0.1}s`;

    // Year
    const yearDiv = document.createElement('div');
    yearDiv.className = 'achievement-year';
    yearDiv.textContent = item.year || '';
    card.appendChild(yearDiv);

    // Icon
    const iconDiv = document.createElement('div');
    iconDiv.className = 'achievement-icon';
    const icon = document.createElement('i');
    icon.className = item.icon || 'fas fa-trophy';
    iconDiv.appendChild(icon);
    card.appendChild(iconDiv);

    // Title
    const titleH3 = document.createElement('h3');
    titleH3.className = 'achievement-title';
    titleH3.dataset.ar = item.titleAr || '';
    titleH3.dataset.en = item.titleEn || '';
    titleH3.textContent = currentLanguage === 'ar' ? (item.titleAr || '') : (item.titleEn || '');
    card.appendChild(titleH3);

    // Description
    const descP = document.createElement('p');
    descP.className = 'achievement-desc';
    descP.dataset.ar = item.descAr || '';
    descP.dataset.en = item.descEn || '';
    descP.textContent = currentLanguage === 'ar' ? (item.descAr || '') : (item.descEn || '');
    card.appendChild(descP);

    return card;
}

/**
 * Render participation grid
 * @param {Array} participation - Participation data array
 */
function renderParticipation(participation) {
    const grid = document.getElementById('participationGrid');
    const emptyState = document.getElementById('participationEmpty');

    if (!grid) return;

    grid.innerHTML = '';

    if (!participation || participation.length === 0) {
        grid.classList.add('hidden');
        emptyState?.classList.remove('hidden');
        return;
    }

    grid.classList.remove('hidden');
    emptyState?.classList.add('hidden');

    const fragment = document.createDocumentFragment();

    participation.forEach((item, index) => {
        const card = createParticipationCard(item, index);
        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
}

/**
 * Create participation card element safely
 * @param {Object} item - Participation data
 * @param {number} index - Card index for animation delay
 * @returns {HTMLElement} Participation card element
 */
function createParticipationCard(item, index) {
    const card = document.createElement('div');
    card.className = 'participation-card animate-on-scroll';
    card.style.animationDelay = `${index * 0.1}s`;

    // Icon
    const iconDiv = document.createElement('div');
    iconDiv.className = 'card-icon';
    const icon = document.createElement('i');
    icon.className = item.icon || 'fas fa-handshake';
    iconDiv.appendChild(icon);
    card.appendChild(iconDiv);

    // Title
    const titleH3 = document.createElement('h3');
    titleH3.className = 'card-title';
    titleH3.dataset.ar = item.titleAr || '';
    titleH3.dataset.en = item.titleEn || '';
    titleH3.textContent = currentLanguage === 'ar' ? (item.titleAr || '') : (item.titleEn || '');
    card.appendChild(titleH3);

    // Description
    const descP = document.createElement('p');
    descP.className = 'card-desc';
    descP.dataset.ar = item.descAr || '';
    descP.dataset.en = item.descEn || '';
    descP.textContent = currentLanguage === 'ar' ? (item.descAr || '') : (item.descEn || '');
    card.appendChild(descP);

    // Stats
    const statsDiv = document.createElement('div');
    statsDiv.className = 'card-stats';
    statsDiv.dataset.ar = item.statsAr || '';
    statsDiv.dataset.en = item.statsEn || '';
    statsDiv.textContent = currentLanguage === 'ar' ? (item.statsAr || '') : (item.statsEn || '');
    card.appendChild(statsDiv);

    return card;
}

/**
 * Render about section content
 * @param {Object} aboutData - About section data
 */
function renderAboutSection(aboutData) {
    if (!aboutData) return;

    // Mission
    const missionText = document.getElementById('missionText');
    if (missionText) {
        missionText.dataset.ar = aboutData.missionAr || '';
        missionText.dataset.en = aboutData.missionEn || '';
        missionText.textContent = currentLanguage === 'ar' ? aboutData.missionAr : aboutData.missionEn;
    }

    // Values
    const valuesText = document.getElementById('valuesText');
    if (valuesText) {
        valuesText.dataset.ar = aboutData.valuesAr || '';
        valuesText.dataset.en = aboutData.valuesEn || '';
        valuesText.textContent = currentLanguage === 'ar' ? aboutData.valuesAr : aboutData.valuesEn;
    }

    // Member count
    const memberCount = document.getElementById('memberCountValue');
    if (memberCount) {
        memberCount.textContent = aboutData.memberCount || '150+';
    }

    // Established year
    const establishedYear = document.getElementById('establishedYearValue');
    if (establishedYear) {
        establishedYear.textContent = aboutData.establishedYear || '2015';
    }
}

/**
 * Render leader section content
 * @param {Object} leaderData - Leader section data
 */
function renderLeaderSection(leaderData) {
    if (!leaderData) return;

    // Leader name
    const nameEl = document.querySelector('#leader .leader-info h3');
    if (nameEl) {
        nameEl.dataset.ar = leaderData.nameAr || 'القائد الكشفي';
        nameEl.dataset.en = leaderData.nameEn || 'Scout Leader';
        nameEl.textContent = currentLanguage === 'ar' ? (leaderData.nameAr || 'القائد الكشفي') : (leaderData.nameEn || 'Scout Leader');
    }
    
    // Leader bio
    const bioEl = document.getElementById('leaderBio');
    if (bioEl) {
        bioEl.dataset.ar = leaderData.bioAr || '';
        bioEl.dataset.en = leaderData.bioEn || '';
        bioEl.textContent = currentLanguage === 'ar' ? leaderData.bioAr : leaderData.bioEn;
    }
}

/**
 * Render videos grid
 * @param {Array} videos - Videos data array
 */
function renderVideos(videos) {
    const grid = document.getElementById('videosGrid');
    const emptyState = document.getElementById('videosEmpty');

    if (!grid) return;

    grid.innerHTML = '';

    if (!videos || videos.length === 0) {
        grid.classList.add('hidden');
        emptyState?.classList.remove('hidden');
        return;
    }

    grid.classList.remove('hidden');
    emptyState?.classList.add('hidden');

    const fragment = document.createDocumentFragment();

    videos.forEach((item, index) => {
        const card = createVideoCard(item, index);
        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
}

/**
 * Create video card element safely
 * @param {Object} item - Video data
 * @param {number} index - Card index for animation delay
 * @returns {HTMLElement} Video card element
 */
function createVideoCard(item, index) {
    const card = document.createElement('div');
    card.className = 'video-card animate-on-scroll';
    card.style.animationDelay = `${index * 0.1}s`;

    // Thumbnail - using video thumbnail from video URL
    const thumbDiv = document.createElement('div');
    thumbDiv.className = 'video-thumbnail';
    
    // Extract YouTube thumbnail from video URL
    let thumbnailUrl = '';
    if (item.url) {
        // Check if it's a YouTube URL
        const youtubeMatch = item.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
        if (youtubeMatch) {
            thumbnailUrl = `https://img.youtube.com/vi/${youtubeMatch[1]}/maxresdefault.jpg`;
        }
    }
    
    // Fallback to provided thumbnail if no YouTube URL or extraction failed
    if (!thumbnailUrl && item.thumbnail) {
        thumbnailUrl = ScoutUtils.sanitizeHTML(item.thumbnail);
    }
    
    thumbDiv.style.backgroundImage = `url('${thumbnailUrl}')`;

    // Play button
    const playLink = document.createElement('a');
    playLink.href = item.url || '#';
    playLink.target = '_blank';
    playLink.rel = 'noopener noreferrer';
    playLink.className = 'play-btn';
    playLink.setAttribute('aria-label', currentLanguage === 'ar' ? 'تشغيل الفيديو' : 'Play video');

    const playIcon = document.createElement('i');
    playIcon.className = 'fas fa-play';
    playLink.appendChild(playIcon);
    thumbDiv.appendChild(playLink);
    card.appendChild(thumbDiv);

    // Title
    const titleH3 = document.createElement('h3');
    titleH3.className = 'video-title';
    titleH3.dataset.ar = item.titleAr || '';
    titleH3.dataset.en = item.titleEn || '';
    titleH3.textContent = currentLanguage === 'ar' ? (item.titleAr || '') : (item.titleEn || '');
    card.appendChild(titleH3);

    return card;
}

/**
 * Render contact info
 * @param {Object} contactData - Contact data
 */
function renderContactInfo(contactData) {
    if (!contactData) return;

    // Email
    const emailEl = document.getElementById('contactEmail');
    if (emailEl) {
        emailEl.textContent = contactData.email || '';
        emailEl.href = `mailto:${contactData.email || ''}`;
    }

    // Phone
    const phoneEl = document.getElementById('contactPhone');
    if (phoneEl) {
        phoneEl.textContent = contactData.phone || '';
        const cleanPhone = (contactData.phone || '').replace(/\s/g, '');
        phoneEl.href = `tel:${cleanPhone}`;
    }

    // Address
    const addressEl = document.getElementById('contactAddress');
    if (addressEl) {
        addressEl.dataset.ar = contactData.addressAr || '';
        addressEl.dataset.en = contactData.addressEn || '';
        addressEl.textContent = currentLanguage === 'ar' ? contactData.addressAr : contactData.addressEn;
    }
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
        // Submit form using Formspree.io
        const formData = new FormData(form);
        
        // Submit using fetch to Formspree endpoint
        // First try the fetch API approach
        let response;
        try {
            response = await fetch('https://formspree.io/f/xojjvknq', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });
        } catch (fetchError) {
            // If fetch fails, show error message
            showToast(
                currentLanguage === 'ar'
                    ? 'حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى'
                    : 'Connection error. Please try again',
                'error'
            );
            return; // Exit since submission failed
        }
        
        if (response.ok) {
            // Show success message
            showToast(
                currentLanguage === 'ar'
                    ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً'
                    : 'Message sent successfully! We\'ll get back to you soon',
                'success'
            );

            // Reset form
            form.reset();
        } else {
            // Handle error response
            const errorData = await response.json();
            throw new Error(errorData.error || 'Submission failed');
        }
    } catch (error) {
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

/**
 * Listen for storage changes from admin panel
 */
function setupStorageListener() {
    window.addEventListener('storage', (e) => {
        if (e.key === ScoutUtils.STORAGE_KEY) {
            loadDynamicContent();
        }
    });
}

// ============================================================================
// EXPOSE FOR GLOBAL ACCESS
// ============================================================================

window.showToast = showToast;
window.loadDynamicContent = loadDynamicContent;
