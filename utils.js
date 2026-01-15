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
            nameAr: 'عبدالرحمن الرميح',
            nameEn: 'Abdulrahman Al-Rumaih',
            bioAr: 'يُعدّ القائد الكشفي عبدالرحمن الرميح نموذجًا للقائد التربوي الذي يجمع بين الانضباط الكشفي، والوعي المجتمعي، والقدرة على بناء الإنسان قبل النشاط. لا يقتصر دوره على إدارة الفرق أو تنظيم البرامج، بل يمتد إلى تشكيل القيم، وصقل الشخصية، وغرس روح المسؤولية والعمل الجماعي في أفراد فرقته.\n\nينطلق عبدالرحمن في قيادته من جوهر الحركة الكشفية: التربية بالممارسة. فهو يؤمن بأن القيادة لا تُمارَس بالأوامر، بل بالقدوة، وبأن القائد الحقيقي هو من يصنع قادة آخرين، لا تابعين. يظهر ذلك في حرصه على إشراك الكشافين في اتخاذ القرار، وتحميلهم مسؤوليات حقيقية تتناسب مع أعمارهم وقدراتهم، مما يعزز الثقة بالنفس ويُنمّي مهارات القيادة المبكرة.\n\nعلى المستوى التنظيمي، يتميز بأسلوب عمل يعتمد على التخطيط المسبق، وضبط التفاصيل، وربط الأنشطة الكشفية بأهداف تربوية واضحة، سواء في المعسكرات، أو المشاركات المجتمعية، أو البرامج التدريبية. وهو يدرك أن النشاط الكشفي لا يُقاس بعدد الفعاليات، بل بأثرها المستدام على سلوك الفرد وعلاقته بمجتمعه.\n\nأما في خدمة المجتمع، فينظر عبدالرحمن إلى الكشافة كقوة تطوعية فاعلة، لا كأنشطة موسمية. لذلك يركّز على المبادرات التي تعزز الانتماء الوطني، وتدعم القيم الإنسانية، وتربط الكشاف ببيئته ومجتمعه المحلي، بما ينسجم مع رسالة الحركة الكشفية عالميًا ومحليًا.\n\nشخصيته القيادية تتسم بالهدوء والحزم في آنٍ واحد؛ يستمع قبل أن يقرّر، ويُقيّم قبل أن يُحاسب، ويعالج الأخطاء باعتبارها فرصًا للتعلّم لا أدوات للعقاب. هذا التوازن هو ما يمنحه احترام أفراد فرقته وثقتهم، ويجعله مرجعًا تربويًا قبل أن يكون قائدًا إداريًا.\n\nباختصار، يمثل القائد الكشفي عبدالرحمن الرميح قيادة واعية تؤمن بأن بناء الإنسان هو أعظم إنجاز كشفي، وأن أثر القائد الحقيقي لا يُقاس بما ينجزه بنفسه، بل بما يتركه في نفوس من قادهم.',
            bioEn: 'Scout Leader Abdulrahman Al-Rumaih is a model of an educational leader who combines scouting discipline, community awareness, and the ability to build human beings before activities. His role is not limited to managing teams or organizing programs, but extends to shaping values, refining personality, and instilling a sense of responsibility and teamwork among his team members.\n\nAbdulrahman launches his leadership from the essence of the scouting movement: education through practice. He believes that leadership is not practiced through orders but through example, and that the true leader is one who creates other leaders, not followers. This is evident in his commitment to involving scouts in decision-making and entrusting them with real responsibilities that match their ages and abilities, enhancing self-confidence and developing early leadership skills.\n\nAt the organizational level, he is characterized by a work approach based on advance planning, attention to detail, and linking scouting activities to clear educational goals, whether in camps, community participation, or training programs. He understands that scouting activity is not measured by the number of events, but by their lasting impact on individual behavior and their relationship with society.\n\nAs for community service, Abdulrahman sees scouting as an effective volunteer force, not seasonal activities. Therefore, he focuses on initiatives that strengthen national belonging, support humanitarian values, and connect scouts to their environment and local community, in line with the global and local scouting movement mission.\n\nHis leadership personality is characterized by calmness and firmness at the same time; he listens before deciding, evaluates before judging, and treats mistakes as learning opportunities rather than punishment tools. This balance is what grants him the respect and confidence of his team members, making him an educational reference before being an administrative leader.\n\nIn short, Scout Leader Abdulrahman Al-Rumaih represents an aware leadership that believes human building is the greatest scouting achievement, and the impact of a true leader is not measured by what he accomplishes himself, but by what he leaves in the souls of those he led.',
            descAr: 'خبرة واسعة في القيادة الكشفية وتطوير البرامج الشبابية',
            descEn: 'Extensive experience in scout leadership and youth program development'
        },
        videos: [
            {
                id: 1,
                titleAr: 'المخيم الكشفي السنوي',
                titleEn: 'Annual Scout Camp',
                thumbnail: '',
                url: 'https://www.youtube.com/watch?v=GuJLfqTFfIw'
            },
            {
                id: 2,
                titleAr: 'فعاليات اليوم الوطني',
                titleEn: 'National Day Events',
                thumbnail: '',
                url: 'https://www.youtube.com/watch?v=H-uYcDbFFE0'
            },
            {
                id: 3,
                titleAr: 'رحلة الكشافة البيئية',
                titleEn: 'Environmental Scout Trip',
                thumbnail: '',
                url: 'https://www.youtube.com/watch?v=J4pFd1F_R8o'
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
    { value: 'fas fa-globe', label: '🌍 كوكب | Globe' },
    { value: 'fas fa-crown', label: '👑 تاج | Crown' },
    { value: 'fas fa-flag', label: '🏁 علم | Flag' },
    { value: 'fas fa-shield-alt', label: '🛡️ درع | Shield' },
    { value: 'fas fa-bolt', label: '⚡ برق | Lightning' },
    { value: 'fas fa-fire', label: '🔥 نار | Fire' },
    { value: 'fas fa-diamond', label: '💎 ماسة | Diamond' },
    { value: 'fas fa-leaf', label: '🍃 ورقة | Leaf' },
    { value: 'fas fa-mountain', label: '⛰️ جبل | Mountain' },
    { value: 'fas fa-water', label: '💧 ماء | Water' },
    { value: 'fas fa-sun', label: '☀️ شمس | Sun' },
    { value: 'fas fa-moon', label: '🌙 قمر | Moon' },
    { value: 'fas fa-cloud', label: '☁️ سحابة | Cloud' },
    { value: 'fas fa-bell', label: '🔔 جرس | Bell' },
    { value: 'fas fa-lightbulb', label: '💡 لمبة | Lightbulb' },
    { value: 'fas fa-book', label: '📚 كتاب | Book' },
    { value: 'fas fa-graduation-cap', label: '🎓 تخرج | Graduation' },
    { value: 'fas fa-tools', label: '🛠️ أدوات | Tools' },
    { value: 'fas fa-rocket', label: '🚀 صاروخ | Rocket' },
    { value: 'fas fa-umbrella', label: '☂️ مظلة | Umbrella' },
    { value: 'fas fa-feather', label: '🪶 ريشة | Feather' }
];

// ============================================================================
// EXPORTS (for ES6 modules - future use)
// ============================================================================

// Configuration for remote data storage
const REMOTE_API_URL = null; // Set to your backend API URL when available

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
    ICON_OPTIONS,
    REMOTE_API_URL
};
