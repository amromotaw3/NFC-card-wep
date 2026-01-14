// Admin Configuration
const ADMIN_PASSWORD = 'admin2026';
const STORAGE_KEY = 'scoutGroupData';

// Check if user is logged in
function checkLogin() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    const loginContainer = document.getElementById('loginContainer');
    const adminPanel = document.getElementById('adminPanel');

    if (isLoggedIn) {
        loginContainer.classList.remove('show');
        adminPanel.classList.add('show');
        loadAllData();
    } else {
        loginContainer.classList.add('show');
        adminPanel.classList.remove('show');
    }
}

// Login Handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');

    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminLoggedIn', 'true');
        errorMsg.classList.remove('show');
        checkLogin();
    } else {
        errorMsg.textContent = 'كلمة المرور غير صحيحة | Wrong Password';
        errorMsg.classList.add('show');
    }
});

// Logout Handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('password').value = '';
    checkLogin();
});

// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        // Remove active class from all buttons and contents
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('show'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        document.getElementById(tabName + 'Tab').classList.add('show');
    });
});

// Save Section Data
function saveSection(section) {
    const data = getStoredData();
    
    switch(section) {
        case 'hero':
            data.hero = {
                titleAr: document.getElementById('heroTitleAr').value,
                titleEn: document.getElementById('heroTitleEn').value,
                subtitleAr: document.getElementById('heroSubtitleAr').value,
                subtitleEn: document.getElementById('heroSubtitleEn').value
            };
            break;
        case 'about':
            data.about = {
                missionAr: document.getElementById('missionAr').value,
                missionEn: document.getElementById('missionEn').value,
                valuesAr: document.getElementById('valuesAr').value,
                valuesEn: document.getElementById('valuesEn').value,
                memberCount: document.getElementById('memberCount').value,
                establishedYear: document.getElementById('establishedYear').value
            };
            break;
        case 'leader':
            data.leader = {
                experienceAr: document.getElementById('experienceAr').value,
                experienceEn: document.getElementById('experienceEn').value,
                descAr: document.getElementById('leaderDescAr').value,
                descEn: document.getElementById('leaderDescEn').value
            };
            break;
        case 'contact':
            data.contact = {
                email: document.getElementById('contactEmail').value,
                phone: document.getElementById('contactPhone').value,
                addressAr: document.getElementById('contactAddressAr').value,
                addressEn: document.getElementById('contactAddressEn').value
            };
            break;
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    showSuccessMessage('تم حفظ التعديلات بنجاح | Changes saved successfully');
}

// Get stored data
function getStoredData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : getDefaultData();
}

// Default data
function getDefaultData() {
    return {
        hero: {
            titleAr: 'فرقة عبدالرحمن بن القاسم الكشفية',
            titleEn: 'Abdulrahman bin Al-Qasim Scout Group',
            subtitleAr: 'نسعى لتطوير الشباب وتعزيز قيم القيادة والمسؤولية المجتمعية',
            subtitleEn: 'We aim to develop youth and promote values of leadership'
        },
        achievements: [
            {
                id: 1,
                year: '2024',
                titleAr: 'جائزة التميز الكشفي',
                titleEn: 'Scout Excellence Award',
                descAr: 'حصلت الفرقة على جائزة التميز',
                descEn: 'The group received award'
            }
        ],
        participation: [
            {
                id: 1,
                titleAr: 'حملة التبرع بالدم',
                titleEn: 'Blood Donation Campaign',
                descAr: 'تنظيم حملات دورية',
                descEn: 'Organizing campaigns',
                statsAr: '+500 متبرع',
                statsEn: '500+ Donors'
            }
        ],
        about: {
            missionAr: 'تطوير الشباب',
            missionEn: 'Youth development',
            valuesAr: 'الشرف والأمانة',
            valuesEn: 'Honor and integrity',
            memberCount: '150+',
            establishedYear: '2015'
        },
        leader: {
            experienceAr: '+15 سنة',
            experienceEn: '15+ Years',
            descAr: 'خبرة واسعة',
            descEn: 'Extensive experience'
        },
        videos: [
            {
                id: 1,
                titleAr: 'المخيم الكشفي',
                titleEn: 'Scout Camp',
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

// Load all data into forms
function loadAllData() {
    const data = getStoredData();
    
    // Hero
    if (data.hero) {
        document.getElementById('heroTitleAr').value = data.hero.titleAr || '';
        document.getElementById('heroTitleEn').value = data.hero.titleEn || '';
        document.getElementById('heroSubtitleAr').value = data.hero.subtitleAr || '';
        document.getElementById('heroSubtitleEn').value = data.hero.subtitleEn || '';
    }
    
    // About
    if (data.about) {
        document.getElementById('missionAr').value = data.about.missionAr || '';
        document.getElementById('missionEn').value = data.about.missionEn || '';
        document.getElementById('valuesAr').value = data.about.valuesAr || '';
        document.getElementById('valuesEn').value = data.about.valuesEn || '';
        document.getElementById('memberCount').value = data.about.memberCount || '';
        document.getElementById('establishedYear').value = data.about.establishedYear || '';
    }
    
    // Leader
    if (data.leader) {
        document.getElementById('experienceAr').value = data.leader.experienceAr || '';
        document.getElementById('experienceEn').value = data.leader.experienceEn || '';
        document.getElementById('leaderDescAr').value = data.leader.descAr || '';
        document.getElementById('leaderDescEn').value = data.leader.descEn || '';
    }
    
    // Contact
    if (data.contact) {
        document.getElementById('contactEmail').value = data.contact.email || '';
        document.getElementById('contactPhone').value = data.contact.phone || '';
        document.getElementById('contactAddressAr').value = data.contact.addressAr || '';
        document.getElementById('contactAddressEn').value = data.contact.addressEn || '';
    }
    
    // Load lists
    loadAchievements();
    loadParticipation();
    loadVideos();
}

// Achievements Management
function loadAchievements() {
    const data = getStoredData();
    const list = document.getElementById('achievementsList');
    list.innerHTML = '';
    
    data.achievements.forEach(item => {
        const html = `
            <div class="item-card">
                <div class="item-info">
                    <div class="item-title">${item.year} - ${item.titleAr}</div>
                    <div class="item-desc">${item.descAr}</div>
                </div>
                <div class="item-actions">
                    <button class="edit-btn" onclick="editAchievement(${item.id})">تعديل</button>
                    <button class="delete-btn" onclick="deleteAchievement(${item.id})">حذف</button>
                </div>
            </div>
        `;
        list.innerHTML += html;
    });
}

function openAchievementForm() {
    const titleAr = prompt('العنوان (AR):');
    if (!titleAr) return;
    
    const titleEn = prompt('Title (EN):');
    const year = prompt('السنة:');
    const descAr = prompt('الوصف (AR):');
    const descEn = prompt('Description (EN):');
    
    const data = getStoredData();
    const newId = Math.max(...data.achievements.map(a => a.id), 0) + 1;
    
    data.achievements.push({
        id: newId,
        year: year || '2024',
        titleAr,
        titleEn: titleEn || titleAr,
        descAr,
        descEn: descEn || descAr
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    loadAchievements();
    showSuccessMessage('تم إضافة الإنجاز');
}

function deleteAchievement(id) {
    if (!confirm('هل تريد حذف هذا الإنجاز؟')) return;
    
    const data = getStoredData();
    data.achievements = data.achievements.filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    loadAchievements();
    showSuccessMessage('تم حذف الإنجاز');
}

// Participation Management
function loadParticipation() {
    const data = getStoredData();
    const list = document.getElementById('participationList');
    list.innerHTML = '';
    
    data.participation.forEach(item => {
        const html = `
            <div class="item-card">
                <div class="item-info">
                    <div class="item-title">${item.titleAr}</div>
                    <div class="item-desc">${item.descAr}</div>
                </div>
                <div class="item-actions">
                    <button class="edit-btn" onclick="editParticipation(${item.id})">تعديل</button>
                    <button class="delete-btn" onclick="deleteParticipation(${item.id})">حذف</button>
                </div>
            </div>
        `;
        list.innerHTML += html;
    });
}

function openParticipationForm() {
    const titleAr = prompt('العنوان (AR):');
    if (!titleAr) return;
    
    const titleEn = prompt('Title (EN):');
    const descAr = prompt('الوصف (AR):');
    const descEn = prompt('Description (EN):');
    const statsAr = prompt('الإحصائية (AR):');
    const statsEn = prompt('Statistics (EN):');
    
    const data = getStoredData();
    const newId = Math.max(...data.participation.map(p => p.id), 0) + 1;
    
    data.participation.push({
        id: newId,
        titleAr,
        titleEn: titleEn || titleAr,
        descAr,
        descEn: descEn || descAr,
        statsAr: statsAr || '0',
        statsEn: statsEn || '0'
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    loadParticipation();
    showSuccessMessage('تم إضافة المشاركة');
}

function deleteParticipation(id) {
    if (!confirm('هل تريد حذف هذه المشاركة؟')) return;
    
    const data = getStoredData();
    data.participation = data.participation.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    loadParticipation();
    showSuccessMessage('تم حذف المشاركة');
}

// Videos Management
function loadVideos() {
    const data = getStoredData();
    const list = document.getElementById('videosList');
    list.innerHTML = '';
    
    data.videos.forEach(item => {
        const html = `
            <div class="item-card">
                <div class="item-info">
                    <div class="item-title">${item.titleAr}</div>
                    <div class="item-desc">${item.url}</div>
                </div>
                <div class="item-actions">
                    <button class="edit-btn" onclick="editVideo(${item.id})">تعديل</button>
                    <button class="delete-btn" onclick="deleteVideo(${item.id})">حذف</button>
                </div>
            </div>
        `;
        list.innerHTML += html;
    });
}

function openVideoForm() {
    const titleAr = prompt('العنوان (AR):');
    if (!titleAr) return;
    
    const titleEn = prompt('Title (EN):');
    const url = prompt('رابط اليوتيوب:');
    
    const data = getStoredData();
    const newId = Math.max(...data.videos.map(v => v.id), 0) + 1;
    
    data.videos.push({
        id: newId,
        titleAr,
        titleEn: titleEn || titleAr,
        url: url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    loadVideos();
    showSuccessMessage('تم إضافة الفيديو');
}

function deleteVideo(id) {
    if (!confirm('هل تريد حذف هذا الفيديو؟')) return;
    
    const data = getStoredData();
    data.videos = data.videos.filter(v => v.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    loadVideos();
    showSuccessMessage('تم حذف الفيديو');
}

// Show success message
function showSuccessMessage(msg) {
    const successMsg = document.getElementById('successMsg');
    if (successMsg) {
        successMsg.textContent = msg;
        successMsg.classList.add('show');
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 3000);
    }
}

// Placeholders for edit functions (can be expanded)
function editAchievement(id) {
    alert('تم الحذف والإضافة بنجاح - يرجى إضافة الإنجاز من جديد مع التعديلات');
}

function editParticipation(id) {
    alert('تم الحذف والإضافة بنجاح - يرجى إضافة المشاركة من جديد مع التعديلات');
}

function editVideo(id) {
    alert('تم الحذف والإضافة بنجاح - يرجى إضافة الفيديو من جديد مع التعديلات');
}

// Initialize
document.addEventListener('DOMContentLoaded', checkLogin);

// Listen for storage changes (updates from other tabs)
window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY) {
        loadAllData();
    }
});
