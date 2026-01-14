// Admin Data Management
const STORAGE_KEY = 'scoutGroupData';

function getStoredData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return getDefaultData();
        }
    }
    return getDefaultData();
}

function getDefaultData() {
    return {
        hero: {
            titleAr: 'فرقة عبدالرحمن بن القاسم الكشفية',
            titleEn: 'Abdulrahman bin Al-Qasim Scout Group',
            subtitleAr: 'نسعى لتطوير الشباب وتعزيز قيم القيادة والمسؤولية المجتمعية من خلال برامج كشفية متميزة',
            subtitleEn: 'We aim to develop youth and promote values of leadership and community responsibility'
        },
        achievements: [
            {
                id: 1,
                year: '2024',
                titleAr: 'جائزة التميز الكشفي',
                titleEn: 'Scout Excellence Award',
                descAr: 'حصلت الفرقة على جائزة التميز الكشفي على مستوى المملكة',
                descEn: 'The group received the Scout Excellence Award at the national level'
            },
            {
                id: 2,
                year: '2023',
                titleAr: 'المركز الأول في المسابقات الكشفية',
                titleEn: 'First Place in Scout Competitions',
                descAr: 'تحقيق المركز الأول في المسابقات الكشفية الإقليمية',
                descEn: 'Achieved first place in regional scout competitions'
            }
        ],
        participation: [
            {
                id: 1,
                titleAr: 'حملة التبرع بالدم',
                titleEn: 'Blood Donation Campaign',
                descAr: 'تنظيم حملات دورية للتبرع بالدم بالتعاون مع المستشفيات',
                descEn: 'Organizing regular blood donation campaigns',
                statsAr: '+500 متبرع',
                statsEn: '500+ Donors'
            }
        ],
        about: {
            missionAr: 'تطوير الشباب من خلال برامج كشفية متميزة وتعزيز قيم القيادة والمسؤولية المجتمعية',
            missionEn: 'Developing youth through outstanding scout programs',
            valuesAr: 'الشرف والأمانة والشجاعة والتعاون والعطاء والمسؤولية',
            valuesEn: 'Honor, integrity, courage, cooperation',
            memberCount: '150+',
            establishedYear: '2015'
        },
        leader: {
            experienceAr: '+15 سنة',
            experienceEn: '15+ Years',
            descAr: 'خبرة واسعة في القيادة الكشفية وتطوير البرامج الشبابية',
            descEn: 'Extensive experience in scout leadership'
        },
        videos: [
            {
                id: 1,
                titleAr: 'المخيم الكشفي السنوي',
                titleEn: 'Annual Scout Camp',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            }
        ],
        contact: {
            email: 'scout@example.com',
            phone: '+966 XX XXX XXXX',
            addressAr: 'المملكة العربية السعودية',
            addressEn: 'Saudi Arabia'
        }
    };
}

// Language Management
let currentLanguage = 'ar';

// Get saved language or default to Arabic
function initLanguage() {
    const savedLanguage = localStorage.getItem('language') || 'ar';
    currentLanguage = savedLanguage;
    applyLanguage();
    loadDynamicContent();
}

// Apply language to all elements with data-ar and data-en
function applyLanguage() {
    const elements = document.querySelectorAll('[data-ar], [data-en]');
    
    elements.forEach(element => {
        if (currentLanguage === 'ar') {
            if (element.dataset.ar) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = element.dataset.ar;
                } else {
                    element.textContent = element.dataset.ar;
                }
            }
        } else {
            if (element.dataset.en) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = element.dataset.en;
                } else {
                    element.textContent = element.dataset.en;
                }
            }
        }
    });
    
    // Update document direction
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
    
    // Save preference
    localStorage.setItem('language', currentLanguage);
}

// Language Toggle
const langToggle = document.getElementById('langToggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        applyLanguage();
    });
}

// Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking a link
const navMobileLinks = document.querySelectorAll('.nav-mobile a');
navMobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert(currentLanguage === 'ar' ? 'الرجاء ملء جميع الحقول' : 'Please fill in all fields');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = currentLanguage === 'ar' ? 'جاري الإرسال...' : 'Sending...';
        
        try {
            // Simulate sending (replace with actual API call if needed)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            alert(currentLanguage === 'ar' ? 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً' : 'Message sent successfully! We\'ll get back to you soon');
            
            // Reset form
            contactForm.reset();
        } catch (error) {
            alert(currentLanguage === 'ar' ? 'حدث خطأ في الإرسال' : 'Error sending message');
        } finally {
            // Restore button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Set current year in footer
const yearElement = document.getElementById('year');
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-desktop a, .nav-mobile a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    
    // Listen for storage changes from admin panel
    window.addEventListener('storage', (e) => {
        if (e.key === 'scoutGroupData') {
            loadDynamicContent();
            applyLanguage();
        }
    });
});

// Load dynamic content from storage
function loadDynamicContent() {
    const data = getStoredData();
    
    // Update Hero Section
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroTitle) {
        heroTitle.dataset.ar = data.hero.titleAr;
        heroTitle.dataset.en = data.hero.titleEn;
        heroTitle.textContent = currentLanguage === 'ar' ? data.hero.titleAr : data.hero.titleEn;
    }
    if (heroSubtitle) {
        heroSubtitle.dataset.ar = data.hero.subtitleAr;
        heroSubtitle.dataset.en = data.hero.subtitleEn;
        heroSubtitle.textContent = currentLanguage === 'ar' ? data.hero.subtitleAr : data.hero.subtitleEn;
    }
    
    // Update About stats
    const memberCountEl = document.querySelector('[data-stat="members"]');
    const yearEl = document.querySelector('[data-stat="year"]');
    if (memberCountEl) memberCountEl.textContent = data.about.memberCount;
    if (yearEl) yearEl.textContent = data.about.establishedYear;
    
    // Update About section cards
    const missionCards = document.querySelectorAll('[data-mission]');
    const valuesCards = document.querySelectorAll('[data-values]');
    missionCards.forEach(card => {
        card.dataset.ar = data.about.missionAr;
        card.dataset.en = data.about.missionEn;
        card.textContent = currentLanguage === 'ar' ? data.about.missionAr : data.about.missionEn;
    });
    valuesCards.forEach(card => {
        card.dataset.ar = data.about.valuesAr;
        card.dataset.en = data.about.valuesEn;
        card.textContent = currentLanguage === 'ar' ? data.about.valuesAr : data.about.valuesEn;
    });
    
    // Update contact info
    const emailEl = document.querySelector('.contact-item a[href^="mailto"]');
    const phoneEl = document.querySelector('.contact-item a[href^="tel"]');
    if (emailEl) {
        emailEl.textContent = data.contact.email;
        emailEl.href = `mailto:${data.contact.email}`;
    }
    if (phoneEl) {
        phoneEl.textContent = data.contact.phone;
        phoneEl.href = `tel:${data.contact.phone}`;
    }
    
    // Update leader info
    const experienceEl = document.querySelector('[data-experience]');
    if (experienceEl) {
        experienceEl.dataset.ar = data.leader.experienceAr;
        experienceEl.dataset.en = data.leader.experienceEn;
        experienceEl.textContent = currentLanguage === 'ar' ? data.leader.experienceAr : data.leader.experienceEn;
    }
}

// Sticky header on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.borderBottomColor = '#d4a574';
    } else {
        header.style.borderBottomColor = '#e5e5e5';
    }
});
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.achievement-card, .participation-card, .video-card, .about-card, .detail-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});
