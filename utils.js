/**
 * NFC Card Web - Shared Utilities Module
 * Common functions for Scout Team Website
 * @version 1.0.0
 */

// ============================================================================
// CONSTANTS
// ============================================================================

const STORAGE_KEY = 'scoutGroupData';

// ============================================================================
// DATA MANAGEMENT
// ============================================================================

/**
 * Default data structure for the application
 * Single source of truth for initial/fallback data
 * @returns {Object} Default application data
 */
function getDefaultData() {
    return {
        hero: {
            titleAr: 'فرقة عبدالرحمن بن القاسم الكشفية',
            titleEn: 'Abdulrahman bin Al-Qasim Scout Group',
            subtitleAr: 'نسعى لتطوير الشباب وتعزيز قيم القيادة والمسؤولية المجتمعية من خلال برامج كشفية متميزة',
            subtitleEn: 'We aim to develop youth and promote values of leadership and community responsibility through outstanding scout programs'
        },
        achievements: [
            {
                id: 1,
                year: '2024',
                icon: 'fas fa-trophy',
                titleAr: 'جائزة التميز الكشفي',
                titleEn: 'Scout Excellence Award',
                descAr: 'حصلت الفرقة على جائزة التميز الكشفي على مستوى المملكة',
                descEn: 'The group received the Scout Excellence Award at the national level'
            },
            {
                id: 2,
                year: '2023',
                icon: 'fas fa-medal',
                titleAr: 'المركز الأول في المسابقات',
                titleEn: 'First Place in Competitions',
                descAr: 'تحقيق المركز الأول في المسابقات الكشفية الإقليمية',
                descEn: 'Achieved first place in regional scout competitions'
            },
            {
                id: 3,
                year: '2022',
                icon: 'fas fa-award',
                titleAr: 'شهادة التميز المجتمعي',
                titleEn: 'Community Excellence Certificate',
                descAr: 'تكريم الفرقة لدورها البارز في خدمة المجتمع',
                descEn: 'Recognition for outstanding community service'
            },
            {
                id: 4,
                year: '2021',
                icon: 'fas fa-star',
                titleAr: 'جائزة القيادة الشبابية',
                titleEn: 'Youth Leadership Award',
                descAr: 'تكريم قائد الفرقة لجهوده في تطوير الشباب',
                descEn: 'Leader honored for youth development efforts'
            }
        ],
        participation: [
            {
                id: 1,
                icon: 'fas fa-heart',
                titleAr: 'حملة التبرع بالدم',
                titleEn: 'Blood Donation Campaign',
                descAr: 'تنظيم حملات دورية للتبرع بالدم بالتعاون مع المستشفيات',
                descEn: 'Organizing regular blood donation campaigns with hospitals',
                statsAr: '+500 متبرع',
                statsEn: '500+ Donors'
            },
            {
                id: 2,
                icon: 'fas fa-users',
                titleAr: 'خدمة الحجاج والمعتمرين',
                titleEn: 'Pilgrims Service',
                descAr: 'المشاركة في خدمة ضيوف الرحمن',
                descEn: 'Serving pilgrims and visitors',
                statsAr: '3 مواسم',
                statsEn: '3 Seasons'
            },
            {
                id: 3,
                icon: 'fas fa-tree',
                titleAr: 'حملة التشجير',
                titleEn: 'Tree Planting Campaign',
                descAr: 'غرس الأشجار والمحافظة على البيئة',
                descEn: 'Planting trees and environmental conservation',
                statsAr: '+1000 شجرة',
                statsEn: '1000+ Trees'
            },
            {
                id: 4,
                icon: 'fas fa-handshake',
                titleAr: 'مساعدة المحتاجين',
                titleEn: 'Helping Those in Need',
                descAr: 'توزيع المساعدات على الأسر المحتاجة',
                descEn: 'Distributing aid to families in need',
                statsAr: '+200 أسرة',
                statsEn: '200+ Families'
            }
        ],
        about: {
            missionAr: 'تطوير الشباب من خلال برامج كشفية متميزة وتعزيز قيم القيادة والمسؤولية المجتمعية',
            missionEn: 'Developing youth through outstanding scout programs and promoting leadership values and community responsibility',
            valuesAr: 'الشرف والأمانة والشجاعة والتعاون والعطاء والمسؤولية',
            valuesEn: 'Honor, integrity, courage, cooperation, generosity, and responsibility',
            memberCount: '150+',
            establishedYear: '2015'
        },
        leader: {
            experienceAr: '+15 سنة من القيادة الكشفية والتطوير',
            experienceEn: '15+ Years of scout leadership and development',
            descAr: 'خبرة واسعة في القيادة الكشفية وتطوير البرامج الشبابية',
            descEn: 'Extensive experience in scout leadership and youth program development',
            achievementsAr: [
                'قائد كشفي معتمد',
                'مدرب في القيادة الشبابية',
                'عضو الجمعية الكشفية السعودية'
            ],
            achievementsEn: [
                'Certified Scout Leader',
                'Youth Leadership Trainer',
                'Member of Saudi Scout Association'
            ]
        },
        videos: [
            {
                id: 1,
                titleAr: 'المخيم الكشفي السنوي',
                titleEn: 'Annual Scout Camp',
                thumbnail: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=340&fit=crop',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            },
            {
                id: 2,
                titleAr: 'فعاليات اليوم الوطني',
                titleEn: 'National Day Events',
                thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=340&fit=crop',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            },
            {
                id: 3,
                titleAr: 'رحلة الكشافة البيئية',
                titleEn: 'Environmental Scout Trip',
                thumbnail: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&h=340&fit=crop',
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

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is available
 */
function isStorageAvailable() {
    try {
        const test = '__storage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Get stored data from localStorage with error handling
 * Falls back to default data if storage fails or data is corrupted
 * @returns {Object} Application data
 */
function getStoredData() {
    if (!isStorageAvailable()) {
        console.warn('localStorage is not available, using default data');
        return getDefaultData();
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            return getDefaultData();
        }

        const parsed = JSON.parse(stored);
        
        // Validate data structure - merge with defaults to ensure all fields exist
        return mergeWithDefaults(parsed, getDefaultData());
    } catch (e) {
        console.error('Error parsing stored data:', e);
        return getDefaultData();
    }
}

/**
 * Save data to localStorage with error handling
 * @param {Object} data - Data to save
 * @returns {{success: boolean, error?: string}} Result of save operation
 */
function saveData(data) {
    if (!isStorageAvailable()) {
        return { 
            success: false, 
            error: 'localStorage غير متاح | localStorage is not available' 
        };
    }

    try {
        const serialized = JSON.stringify(data);
        localStorage.setItem(STORAGE_KEY, serialized);
        return { success: true };
    } catch (e) {
        console.error('Error saving data:', e);
        
        // Check if it's a quota exceeded error
        if (e.name === 'QuotaExceededError' || e.code === 22) {
            return { 
                success: false, 
                error: 'مساحة التخزين ممتلئة | Storage quota exceeded' 
            };
        }
        
        return { 
            success: false, 
            error: 'حدث خطأ في الحفظ | Error saving data' 
        };
    }
}

/**
 * Merge user data with defaults to ensure all required fields exist
 * @param {Object} userData - User's stored data
 * @param {Object} defaults - Default data structure
 * @returns {Object} Merged data
 */
function mergeWithDefaults(userData, defaults) {
    const result = { ...defaults };
    
    for (const key in userData) {
        if (userData.hasOwnProperty(key)) {
            if (Array.isArray(userData[key])) {
                // For arrays, use user data if it exists
                result[key] = userData[key];
            } else if (typeof userData[key] === 'object' && userData[key] !== null) {
                // For objects, merge recursively
                result[key] = { ...defaults[key], ...userData[key] };
            } else {
                // For primitives, use user data
                result[key] = userData[key];
            }
        }
    }
    
    return result;
}

// ============================================================================
// SECURITY UTILITIES
// ============================================================================

/**
 * Sanitize string to prevent XSS attacks
 * Escapes HTML special characters
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
function sanitizeHTML(str) {
    if (typeof str !== 'string') {
        return '';
    }
    
    const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    
    return str.replace(/[&<>"'`=/]/g, char => escapeMap[char]);
}

/**
 * Create a DOM element safely from a template
 * Uses textContent for user data to prevent XSS
 * @param {string} tag - HTML tag name
 * @param {Object} options - Element options
 * @param {string} options.className - CSS class names
 * @param {string} options.textContent - Text content (safe)
 * @param {Object} options.attributes - Element attributes
 * @param {Array} options.children - Child elements
 * @returns {HTMLElement} Created element
 */
function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    
    if (options.className) {
        element.className = options.className;
    }
    
    if (options.textContent !== undefined) {
        element.textContent = options.textContent;
    }
    
    if (options.attributes) {
        for (const [key, value] of Object.entries(options.attributes)) {
            element.setAttribute(key, value);
        }
    }
    
    if (options.children) {
        options.children.forEach(child => {
            if (child instanceof HTMLElement) {
                element.appendChild(child);
            }
        });
    }
    
    if (options.dataset) {
        for (const [key, value] of Object.entries(options.dataset)) {
            element.dataset[key] = value;
        }
    }
    
    return element;
}

// ============================================================================
// UI UTILITIES
// ============================================================================

/**
 * Generate unique ID for new items
 * @param {Array} items - Existing items array
 * @returns {number} New unique ID
 */
function generateId(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return 1;
    }
    return Math.max(...items.map(item => item.id || 0)) + 1;
}

/**
 * Debounce function to limit rapid calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Available icon options for forms
 */
const ICON_OPTIONS = [
    { value: 'fas fa-trophy', label: '🏆 كأس | Trophy' },
    { value: 'fas fa-medal', label: '🥇 ميدالية | Medal' },
    { value: 'fas fa-award', label: '🎖️ جائزة | Award' },
    { value: 'fas fa-star', label: '⭐ نجمة | Star' },
    { value: 'fas fa-heart', label: '❤️ قلب | Heart' },
    { value: 'fas fa-users', label: '👥 مجموعة | Group' },
    { value: 'fas fa-tree', label: '🌳 شجرة | Tree' },
    { value: 'fas fa-handshake', label: '🤝 مصافحة | Handshake' },
    { value: 'fas fa-hands-helping', label: '🙌 مساعدة | Helping' },
    { value: 'fas fa-globe', label: '🌍 كوكب | Globe' }
];

// ============================================================================
// EXPORTS (for ES6 modules - future use)
// ============================================================================

// Make functions available globally for current usage
window.ScoutUtils = {
    STORAGE_KEY,
    getDefaultData,
    getStoredData,
    saveData,
    isStorageAvailable,
    sanitizeHTML,
    createElement,
    generateId,
    debounce,
    ICON_OPTIONS
};
