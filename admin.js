/**
 * NFC Card Web - Admin Panel Script
 * Scout Team Website - Admin Dashboard Logic
 * @version 4.0.0 - With API Sync
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

const ADMIN_PASSWORD = 'admin2026';

// ============================================================================
// STATE
// ============================================================================

/** @type {number|null} Currently editing item ID */
let editingItemId = null;

/** @type {string|null} Currently editing item type */
let editingItemType = null;

/** @type {string|null} Stored admin password for API */
let storedPassword = null;

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    checkLogin();
    initEventListeners();
});

/**
 * Initialize all event listeners
 */
function initEventListeners() {
    // Login form
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);

    // Logout button
    document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Save buttons
    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', () => saveSection(btn.dataset.section));
    });

    // Add buttons
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', () => openAddModal(btn.dataset.type));
    });

    // Modal close
    document.getElementById('modalClose')?.addEventListener('click', closeModal);
    document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
        if (e.target.id === 'modalOverlay') closeModal();
    });

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Listen for storage changes
    window.addEventListener('storage', (e) => {
        if (e.key === ScoutUtils.STORAGE_KEY) {
            loadAllData();
        }
    });
}

// ============================================================================
// AUTHENTICATION
// ============================================================================

/**
 * Check if user is logged in and show appropriate view
 */
function checkLogin() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    storedPassword = sessionStorage.getItem('adminPassword');
    const loginContainer = document.getElementById('loginContainer');
    const adminPanel = document.getElementById('adminPanel');

    if (isLoggedIn && storedPassword) {
        loginContainer?.classList.remove('show');
        adminPanel?.classList.add('show');
        loadAllData();
    } else {
        loginContainer?.classList.add('show');
        adminPanel?.classList.remove('show');
    }
}

/**
 * Handle login form submission
 * @param {Event} e - Submit event
 */
async function handleLogin(e) {
    e.preventDefault();

    const password = document.getElementById('password')?.value;
    const errorMsg = document.getElementById('errorMsg');

    if (password === ADMIN_PASSWORD) {
        storedPassword = password;
        sessionStorage.setItem('adminLoggedIn', 'true');
        sessionStorage.setItem('adminPassword', password);
        errorMsg?.classList.remove('show');
        checkLogin();
    } else {
        if (errorMsg) {
            errorMsg.textContent = 'كلمة المرور غير صحيحة | Wrong Password';
            errorMsg.classList.add('show');
        }
    }
}

/**
 * Handle logout
 */
function handleLogout() {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminPassword');
    storedPassword = null;
    const passwordInput = document.getElementById('password');
    if (passwordInput) passwordInput.value = '';
    checkLogin();
}

// ============================================================================
// TAB MANAGEMENT
// ============================================================================

/**
 * Switch to specified tab
 * @param {string} tabName - Name of tab to switch to
 */
function switchTab(tabName) {
    // Update button states
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tab === tabName);
        btn.setAttribute('aria-selected', btn.dataset.tab === tabName);
    });

    // Update content visibility
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('show');
    });

    const targetTab = document.getElementById(`${tabName}Tab`);
    targetTab?.classList.add('show');
}

// ============================================================================
// DATA LOADING
// ============================================================================

/**
 * Load all data into form fields
 */
async function loadAllData() {
    let data;
    try {
        data = await ScoutUtils.fetchDataFromAPI();
    } catch (e) {
        data = ScoutUtils.getStoredData();
    }

    // Hero
    loadHeroData(data.hero);

    // About
    loadAboutData(data.about);

    // Leader
    loadLeaderData(data.leader);

    // Contact
    loadContactData(data.contact);

    // Lists
    renderAchievementsList(data.achievements);
    renderParticipationList(data.participation);
    renderVideosList(data.videos);
}

/**
 * Load hero section data
 * @param {Object} hero - Hero data
 */
function loadHeroData(hero) {
    if (!hero) return;
    setValue('heroTitleAr', hero.titleAr);
    setValue('heroTitleEn', hero.titleEn);
    setValue('heroSubtitleAr', hero.subtitleAr);
    setValue('heroSubtitleEn', hero.subtitleEn);
}

/**
 * Load about section data
 * @param {Object} about - About data
 */
function loadAboutData(about) {
    if (!about) return;
    setValue('missionAr', about.missionAr);
    setValue('missionEn', about.missionEn);
    setValue('valuesAr', about.valuesAr);
    setValue('valuesEn', about.valuesEn);
    setValue('memberCount', about.memberCount);
    setValue('establishedYear', about.establishedYear);
}

/**
 * Load leader section data
 * @param {Object} leader - Leader data
 */
function loadLeaderData(leader) {
    if (!leader) return;
    setValue('experienceAr', leader.experienceAr);
    setValue('experienceEn', leader.experienceEn);
    setValue('leaderDescAr', leader.descAr);
    setValue('leaderDescEn', leader.descEn);
}

/**
 * Load contact section data
 * @param {Object} contact - Contact data
 */
function loadContactData(contact) {
    if (!contact) return;
    setValue('contactEmail', contact.email);
    setValue('contactPhone', contact.phone);
    setValue('contactAddressAr', contact.addressAr);
    setValue('contactAddressEn', contact.addressEn);
}

/**
 * Helper to set input value safely
 * @param {string} id - Element ID
 * @param {string} value - Value to set
 */
function setValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value || '';
}

/**
 * Helper to get input value safely
 * @param {string} id - Element ID
 * @returns {string} Input value
 */
function getValue(id) {
    return document.getElementById(id)?.value?.trim() || '';
}

// ============================================================================
// SECTION SAVING
// ============================================================================

/**
 * Save section data
 * @param {string} section - Section name to save
 */
async function saveSection(section) {
    const data = ScoutUtils.getStoredData();

    switch (section) {
        case 'hero':
            data.hero = {
                titleAr: getValue('heroTitleAr'),
                titleEn: getValue('heroTitleEn'),
                subtitleAr: getValue('heroSubtitleAr'),
                subtitleEn: getValue('heroSubtitleEn')
            };
            break;

        case 'about':
            data.about = {
                missionAr: getValue('missionAr'),
                missionEn: getValue('missionEn'),
                valuesAr: getValue('valuesAr'),
                valuesEn: getValue('valuesEn'),
                memberCount: getValue('memberCount'),
                establishedYear: getValue('establishedYear')
            };
            break;

        case 'leader':
            data.leader = {
                ...data.leader,
                experienceAr: getValue('experienceAr'),
                experienceEn: getValue('experienceEn'),
                descAr: getValue('leaderDescAr'),
                descEn: getValue('leaderDescEn')
            };
            break;

        case 'contact':
            data.contact = {
                email: getValue('contactEmail'),
                phone: getValue('contactPhone'),
                addressAr: getValue('contactAddressAr'),
                addressEn: getValue('contactAddressEn')
            };
            break;
    }

    // Save to API (syncs across all devices)
    const result = await ScoutUtils.saveDataToAPI(data, storedPassword);

    if (result.success) {
        showToast('تم حفظ التعديلات بنجاح | Changes saved successfully', 'success');
    } else {
        showToast(result.error, 'error');
    }
}

// ============================================================================
// LIST RENDERING
// ============================================================================

/**
 * Render achievements list safely (no innerHTML with user data)
 * @param {Array} achievements - Achievements array
 */
function renderAchievementsList(achievements) {
    const list = document.getElementById('achievementsList');
    if (!list) return;

    list.innerHTML = '';

    if (!achievements || achievements.length === 0) {
        list.innerHTML = '<div class="empty-list"><i class="fas fa-trophy"></i><p>لا توجد إنجازات</p></div>';
        return;
    }

    const fragment = document.createDocumentFragment();

    achievements.forEach(item => {
        const card = createItemCard(item, 'achievement', `${item.year} - ${item.titleAr}`, item.descAr);
        fragment.appendChild(card);
    });

    list.appendChild(fragment);
}

/**
 * Render participation list safely
 * @param {Array} participation - Participation array
 */
function renderParticipationList(participation) {
    const list = document.getElementById('participationList');
    if (!list) return;

    list.innerHTML = '';

    if (!participation || participation.length === 0) {
        list.innerHTML = '<div class="empty-list"><i class="fas fa-handshake"></i><p>لا توجد مشاركات</p></div>';
        return;
    }

    const fragment = document.createDocumentFragment();

    participation.forEach(item => {
        const card = createItemCard(item, 'participation', item.titleAr, item.descAr);
        fragment.appendChild(card);
    });

    list.appendChild(fragment);
}

/**
 * Render videos list safely
 * @param {Array} videos - Videos array
 */
function renderVideosList(videos) {
    const list = document.getElementById('videosList');
    if (!list) return;

    list.innerHTML = '';

    if (!videos || videos.length === 0) {
        list.innerHTML = '<div class="empty-list"><i class="fas fa-video"></i><p>لا توجد فيديوهات</p></div>';
        return;
    }

    const fragment = document.createDocumentFragment();

    videos.forEach(item => {
        const card = createItemCard(item, 'video', item.titleAr, item.url);
        fragment.appendChild(card);
    });

    list.appendChild(fragment);
}

/**
 * Create item card element safely (no XSS)
 * @param {Object} item - Item data
 * @param {string} type - Item type
 * @param {string} title - Display title
 * @param {string} desc - Display description
 * @returns {HTMLElement} Card element
 */
function createItemCard(item, type, title, desc) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.dataset.id = item.id;

    // Info section
    const info = document.createElement('div');
    info.className = 'item-info';

    const titleEl = document.createElement('div');
    titleEl.className = 'item-title';
    titleEl.textContent = title; // Safe - uses textContent
    info.appendChild(titleEl);

    const descEl = document.createElement('div');
    descEl.className = 'item-desc';
    descEl.textContent = desc; // Safe - uses textContent
    info.appendChild(descEl);

    card.appendChild(info);

    // Actions section
    const actions = document.createElement('div');
    actions.className = 'item-actions';

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerHTML = '<i class="fas fa-edit"></i> تعديل';
    editBtn.addEventListener('click', () => openEditModal(type, item.id));
    actions.appendChild(editBtn);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i> حذف';
    deleteBtn.addEventListener('click', () => openDeleteModal(type, item.id));
    actions.appendChild(deleteBtn);

    card.appendChild(actions);

    return card;
}

// ============================================================================
// MODAL SYSTEM
// ============================================================================

/**
 * Open modal for adding new item
 * @param {string} type - Item type
 */
function openAddModal(type) {
    editingItemId = null;
    editingItemType = type;

    const titles = {
        achievement: 'إضافة إنجاز جديد',
        participation: 'إضافة مشاركة جديدة',
        video: 'إضافة فيديو جديد'
    };

    showFormModal(titles[type] || 'إضافة', type, null);
}

/**
 * Open modal for editing item
 * @param {string} type - Item type
 * @param {number} id - Item ID
 */
function openEditModal(type, id) {
    editingItemId = id;
    editingItemType = type;

    const data = ScoutUtils.getStoredData();
    let item = null;

    switch (type) {
        case 'achievement':
            item = data.achievements?.find(a => a.id === id);
            break;
        case 'participation':
            item = data.participation?.find(p => p.id === id);
            break;
        case 'video':
            item = data.videos?.find(v => v.id === id);
            break;
    }

    if (!item) {
        showToast('لم يتم العثور على العنصر | Item not found', 'error');
        return;
    }

    const titles = {
        achievement: 'تعديل الإنجاز',
        participation: 'تعديل المشاركة',
        video: 'تعديل الفيديو'
    };

    showFormModal(titles[type] || 'تعديل', type, item);
}

/**
 * Show form modal with fields
 * @param {string} title - Modal title
 * @param {string} type - Item type
 * @param {Object|null} item - Item data for editing (null for new)
 */
function showFormModal(title, type, item) {
    const overlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalFooter = document.getElementById('modalFooter');

    if (!overlay || !modalTitle || !modalBody || !modalFooter) return;

    modalTitle.textContent = title;
    modalBody.innerHTML = '';
    modalFooter.innerHTML = '';

    // Build form based on type
    const form = buildFormForType(type, item);
    modalBody.appendChild(form);

    // Footer buttons
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'modal-cancel-btn';
    cancelBtn.textContent = 'إلغاء';
    cancelBtn.addEventListener('click', closeModal);
    modalFooter.appendChild(cancelBtn);

    const saveBtn = document.createElement('button');
    saveBtn.className = 'modal-save-btn';
    saveBtn.innerHTML = '<i class="fas fa-check"></i> حفظ';
    saveBtn.addEventListener('click', () => saveModalItem(type));
    modalFooter.appendChild(saveBtn);

    overlay.classList.add('show');

    // Focus first input
    const firstInput = form.querySelector('input, textarea');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
}

/**
 * Build form fields for item type
 * @param {string} type - Item type
 * @param {Object|null} item - Item data
 * @returns {HTMLElement} Form element
 */
function buildFormForType(type, item) {
    const form = document.createElement('div');
    form.className = 'modal-form';

    switch (type) {
        case 'achievement':
            form.appendChild(createFormField('modal-year', 'السنة', 'text', item?.year || new Date().getFullYear().toString()));
            form.appendChild(createFormField('modal-titleAr', 'العنوان (AR)', 'text', item?.titleAr || ''));
            form.appendChild(createFormField('modal-titleEn', 'Title (EN)', 'text', item?.titleEn || ''));
            form.appendChild(createFormField('modal-descAr', 'الوصف (AR)', 'textarea', item?.descAr || ''));
            form.appendChild(createFormField('modal-descEn', 'Description (EN)', 'textarea', item?.descEn || ''));
            form.appendChild(createIconSelect('modal-icon', item?.icon || 'fas fa-trophy'));
            break;

        case 'participation':
            form.appendChild(createFormField('modal-titleAr', 'العنوان (AR)', 'text', item?.titleAr || ''));
            form.appendChild(createFormField('modal-titleEn', 'Title (EN)', 'text', item?.titleEn || ''));
            form.appendChild(createFormField('modal-descAr', 'الوصف (AR)', 'textarea', item?.descAr || ''));
            form.appendChild(createFormField('modal-descEn', 'Description (EN)', 'textarea', item?.descEn || ''));
            form.appendChild(createFormField('modal-statsAr', 'الإحصائية (AR)', 'text', item?.statsAr || ''));
            form.appendChild(createFormField('modal-statsEn', 'Statistics (EN)', 'text', item?.statsEn || ''));
            form.appendChild(createIconSelect('modal-icon', item?.icon || 'fas fa-handshake'));
            break;

        case 'video':
            form.appendChild(createFormField('modal-titleAr', 'العنوان (AR)', 'text', item?.titleAr || ''));
            form.appendChild(createFormField('modal-titleEn', 'Title (EN)', 'text', item?.titleEn || ''));
            form.appendChild(createFormField('modal-url', 'رابط الفيديو (YouTube)', 'text', item?.url || ''));
            form.appendChild(createFormField('modal-thumbnail', 'رابط الصورة المصغرة', 'text', item?.thumbnail || ''));
            break;
    }

    return form;
}

/**
 * Create form field
 * @param {string} id - Field ID
 * @param {string} label - Field label
 * @param {string} type - Input type
 * @param {string} value - Initial value
 * @returns {HTMLElement} Form group element
 */
function createFormField(id, label, type, value) {
    const group = document.createElement('div');
    group.className = 'form-group';

    const labelEl = document.createElement('label');
    labelEl.htmlFor = id;
    labelEl.textContent = label;
    group.appendChild(labelEl);

    if (type === 'textarea') {
        const textarea = document.createElement('textarea');
        textarea.id = id;
        textarea.value = value;
        textarea.rows = 3;
        group.appendChild(textarea);
    } else {
        const input = document.createElement('input');
        input.type = type;
        input.id = id;
        input.value = value;
        group.appendChild(input);
    }

    return group;
}

/**
 * Create icon select field
 * @param {string} id - Field ID
 * @param {string} currentValue - Current icon class
 * @returns {HTMLElement} Form group element
 */
function createIconSelect(id, currentValue) {
    const group = document.createElement('div');
    group.className = 'form-group';

    const label = document.createElement('label');
    label.htmlFor = id;
    label.textContent = 'الأيقونة';
    group.appendChild(label);

    const select = document.createElement('select');
    select.id = id;

    ScoutUtils.ICON_OPTIONS.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option.value;
        opt.textContent = option.label;
        opt.selected = option.value === currentValue;
        select.appendChild(opt);
    });

    group.appendChild(select);

    return group;
}

/**
 * Save item from modal
 * @param {string} type - Item type
 */
async function saveModalItem(type) {
    const data = ScoutUtils.getStoredData();

    // Validate required fields
    const titleAr = getValue('modal-titleAr');
    if (!titleAr) {
        showToast('العنوان بالعربية مطلوب | Arabic title is required', 'error');
        return;
    }

    let newItem;

    switch (type) {
        case 'achievement':
            newItem = {
                id: editingItemId || ScoutUtils.generateId(data.achievements),
                year: getValue('modal-year') || new Date().getFullYear().toString(),
                icon: getValue('modal-icon') || 'fas fa-trophy',
                titleAr: titleAr,
                titleEn: getValue('modal-titleEn') || titleAr,
                descAr: getValue('modal-descAr') || '',
                descEn: getValue('modal-descEn') || getValue('modal-descAr') || ''
            };

            if (editingItemId) {
                const index = data.achievements.findIndex(a => a.id === editingItemId);
                if (index !== -1) data.achievements[index] = newItem;
            } else {
                data.achievements.push(newItem);
            }
            break;

        case 'participation':
            newItem = {
                id: editingItemId || ScoutUtils.generateId(data.participation),
                icon: getValue('modal-icon') || 'fas fa-handshake',
                titleAr: titleAr,
                titleEn: getValue('modal-titleEn') || titleAr,
                descAr: getValue('modal-descAr') || '',
                descEn: getValue('modal-descEn') || getValue('modal-descAr') || '',
                statsAr: getValue('modal-statsAr') || '0',
                statsEn: getValue('modal-statsEn') || getValue('modal-statsAr') || '0'
            };

            if (editingItemId) {
                const index = data.participation.findIndex(p => p.id === editingItemId);
                if (index !== -1) data.participation[index] = newItem;
            } else {
                data.participation.push(newItem);
            }
            break;

        case 'video':
            newItem = {
                id: editingItemId || ScoutUtils.generateId(data.videos),
                titleAr: titleAr,
                titleEn: getValue('modal-titleEn') || titleAr,
                url: getValue('modal-url') || '',
                thumbnail: getValue('modal-thumbnail') || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&h=340&fit=crop'
            };

            if (editingItemId) {
                const index = data.videos.findIndex(v => v.id === editingItemId);
                if (index !== -1) data.videos[index] = newItem;
            } else {
                data.videos.push(newItem);
            }
            break;
    }

    // Save to API (syncs across all devices)
    const result = await ScoutUtils.saveDataToAPI(data, storedPassword);

    if (result.success) {
        showToast(editingItemId ? 'تم تعديل العنصر بنجاح' : 'تم إضافة العنصر بنجاح', 'success');
        closeModal();
        loadAllData();
    } else {
        showToast(result.error, 'error');
    }
}

/**
 * Open delete confirmation modal
 * @param {string} type - Item type
 * @param {number} id - Item ID
 */
function openDeleteModal(type, id) {
    const overlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const modalFooter = document.getElementById('modalFooter');

    if (!overlay || !modalTitle || !modalBody || !modalFooter) return;

    modalTitle.textContent = 'تأكيد الحذف';
    modalBody.innerHTML = '<p style="text-align: center; font-size: 16px; padding: 20px 0;">هل أنت متأكد من حذف هذا العنصر؟<br><small style="color: #888;">هذا الإجراء لا يمكن التراجع عنه</small></p>';
    modalFooter.innerHTML = '';

    // Cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'modal-cancel-btn';
    cancelBtn.textContent = 'إلغاء';
    cancelBtn.addEventListener('click', closeModal);
    modalFooter.appendChild(cancelBtn);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'modal-delete-btn';
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i> حذف';
    deleteBtn.addEventListener('click', () => deleteItem(type, id));
    modalFooter.appendChild(deleteBtn);

    overlay.classList.add('show');
}

/**
 * Delete item
 * @param {string} type - Item type
 * @param {number} id - Item ID
 */
async function deleteItem(type, id) {
    const data = ScoutUtils.getStoredData();

    switch (type) {
        case 'achievement':
            data.achievements = data.achievements.filter(a => a.id !== id);
            break;
        case 'participation':
            data.participation = data.participation.filter(p => p.id !== id);
            break;
        case 'video':
            data.videos = data.videos.filter(v => v.id !== id);
            break;
    }

    // Save to API (syncs across all devices)
    const result = await ScoutUtils.saveDataToAPI(data, storedPassword);

    if (result.success) {
        showToast('تم حذف العنصر بنجاح', 'success');
        closeModal();
        loadAllData();
    } else {
        showToast(result.error, 'error');
    }
}

/**
 * Close modal
 */
function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay?.classList.remove('show');
    editingItemId = null;
    editingItemType = null;
}

// ============================================================================
// TOAST NOTIFICATIONS
// ============================================================================

/**
 * Show toast notification
 * @param {string} message - Toast message
 * @param {string} type - Toast type ('success', 'error', 'info')
 * @param {number} duration - Duration in ms
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
 * @param {HTMLElement} toast - Toast element
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
