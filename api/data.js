// Vercel Serverless API - GET & POST Data
import { kv } from '@vercel/kv';

// Default data structure
const defaultData = {
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
        bioAr: 'يُعدّ القائد الكشفي عبدالرحمن الرميح نموذجًا للقائد التربوي الذي يجمع بين الانضباط الكشفي، والوعي المجتمعي، والقدرة على بناء الإنسان قبل النشاط.',
        bioEn: 'Scout Leader Abdulrahman Al-Rumaih is a model of an educational leader who combines scouting discipline, community awareness, and the ability to build human beings before activities.',
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

// Default admin password - CHANGE THIS in Vercel Environment Variables
const DEFAULT_ADMIN_PASSWORD = 'admin2026';

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Use environment variable or fallback to default
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;

    try {
        if (req.method === 'GET') {
            // Get data from KV store
            let data = await kv.get('scoutData');
            
            // If no data exists, initialize with defaults
            if (!data) {
                await kv.set('scoutData', defaultData);
                data = defaultData;
            }
            
            return res.status(200).json(data);
        }

        if (req.method === 'POST') {
            const { password, data, action } = req.body;
            
            // Verify admin password
            if (password !== ADMIN_PASSWORD) {
                return res.status(401).json({ error: 'Unauthorized', message: 'Wrong password' });
            }

            // If just verifying password (login)
            if (action === 'verify') {
                return res.status(200).json({ success: true, message: 'Password verified' });
            }

            // Save data to KV store
            if (data) {
                await kv.set('scoutData', data);
                return res.status(200).json({ success: true, message: 'Data saved successfully' });
            }

            return res.status(400).json({ error: 'No data provided' });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}
