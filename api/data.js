// Vercel Serverless API with KV Storage
import { kv } from '@vercel/kv';

// Admin password
const ADMIN_PASSWORD = 'admin2026';

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
        }
    ],
    videos: [
        {
            id: 1,
            titleAr: 'معسكر الكشافة 2024',
            titleEn: 'Scout Camp 2024',
            thumbnail: '',
            url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        }
    ],
    about: {
        missionAr: 'تنمية الشباب',
        missionEn: 'Youth Development',
        valuesAr: 'القيادة، الشجاعة، الأمانة',
        valuesEn: 'Leadership, Courage, Integrity',
        memberCount: '150',
        establishedYear: '2010'
    },
    leader: {
        experienceAr: '15 سنة',
        experienceEn: '15 Years',
        descAr: 'قائد كشفي متميز',
        descEn: 'Distinguished Scout Leader'
    },
    contact: {
        email: 'scout@example.com',
        phone: '+966 XX XXX XXXX',
        addressAr: 'المملكة العربية السعودية',
        addressEn: 'Saudi Arabia'
    }
};

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // GET - Fetch data
        if (req.method === 'GET') {
            let data = await kv.get('scoutData');
            
            if (!data) {
                await kv.set('scoutData', defaultData);
                data = defaultData;
            }
            
            return res.status(200).json(data);
        }

        // POST - Save data
        if (req.method === 'POST') {
            const { password, data } = req.body;
            
            // Check password
            if (password !== ADMIN_PASSWORD) {
                return res.status(401).json({ error: 'Wrong password' });
            }

            // Save data
            if (data) {
                await kv.set('scoutData', data);
                return res.status(200).json({ success: true });
            }

            return res.status(400).json({ error: 'No data provided' });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
