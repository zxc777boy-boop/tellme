// ОБЪЕКТ ПЕРЕВОДОВ
const translations = {
    ru: {
        login_btn: "Войти в мир", settings_title: "Настройки", add_account: "+ Добавить аккаунт",
        bio_label: "Описание", save_btn: "Сохранить", themes_label: "Темы",
        privacy_label: "Конфиденциальность", privacy_btn: "Настроить скрытие",
        lang_label: "Язык", search_placeholder: "Поиск...", input_placeholder: "Сообщение...",
        welcome_msg: "Вы в системе!", chat_hint: "Визуал обновлен!", close: "Закрыть",
        hide_name: "Скрыть имя", hide_use: "Скрыть юз", hide_ava: "Скрыть аватарку"
    },
    ua: {
        login_btn: "Увійти у світ", settings_title: "Налаштування", add_account: "+ Додати акаунт",
        bio_label: "Опис", save_btn: "Зберегти", themes_label: "Теми",
        privacy_label: "Конфіденційність", privacy_btn: "Налаштувати приховування",
        lang_label: "Мова", search_placeholder: "Пошук...", input_placeholder: "Повідомлення...",
        welcome_msg: "Ви в системі!", chat_hint: "Візуал оновлено!", close: "Закрити",
        hide_name: "Приховати ім'я", hide_use: "Приховати юз", hide_ava: "Приховати аватарку"
    },
    en: {
        login_btn: "Enter the world", settings_title: "Settings", add_account: "+ Add Account",
        bio_label: "Bio", save_btn: "Save", themes_label: "Themes",
        privacy_label: "Privacy", privacy_btn: "Configure visibility",
        lang_label: "Language", search_placeholder: "Search...", input_placeholder: "Message...",
        welcome_msg: "You are online!", chat_hint: "Visuals updated!", close: "Close",
        hide_name: "Hide name", hide_use: "Hide username", hide_ava: "Hide avatar"
    },
    // Добавь аналогично: de (немецкий), fr (французский), es (испанский), it (итальянский), pl (польский), tr (турецкий), jp (японский)
};

let currentLang = 'ru';

// СМЕНА ЯЗЫКА
function setLanguage(langCode) {
    currentLang = langCode;
    const langData = translations[langCode] || translations['en'];
    
    // Переводим текст в элементах с [data-lang]
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (langData[key]) el.innerText = langData[key];
    });

    // Переводим плейсхолдеры
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (langData[key]) el.placeholder = langData[key];
    });

    document.getElementById('current-lang-name').innerText = getLangName(langCode);
    closeCustomModal();
}

function getLangName(code) {
    const names = {ru: 'Русский', ua: 'Українська', en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español', it: 'Italiano', pl: 'Polski', tr: 'Türkçe', jp: '日本語'};
    return names[code];
}

// УПРАВЛЕНИЕ УНИВЕРСАЛЬНОЙ МОДАЛКОЙ
function openCustomModal(header, contentHTML) {
    document.getElementById('modal-header').innerText = header;
    document.getElementById('modal-content-area').innerHTML = contentHTML;
    document.getElementById('custom-modal').style.display = 'flex';
}

function closeCustomModal() {
    document.getElementById('custom-modal').style.display = 'none';
}

// ОКНО КОНФИДЕНЦИАЛЬНОСТИ
function showPrivacyMenu() {
    const lang = translations[currentLang];
    const html = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
            <button class="modal-btn" onclick="alert('Hidden')">${lang.hide_name}</button>
            <button class="modal-btn" onclick="alert('Hidden')">${lang.hide_use}</button>
            <button class="modal-btn" onclick="alert('Hidden')">${lang.hide_ava}</button>
        </div>
    `;
    openCustomModal(lang.privacy_label, html);
}

// ОКНО ЯЗЫКОВ
function showLanguageMenu() {
    const codes = ['ru', 'ua', 'en', 'de', 'fr', 'es', 'it', 'pl', 'tr', 'jp'];
    let html = '<div class="lang-scroll-list">';
    codes.forEach(code => {
        html += `<button class="modal-btn" onclick="setLanguage('${code}')">${getLangName(code)}</button>`;
    });
    html += '</div>';
    openCustomModal('Select Language', html);
}

// ДОБАВИТЬ АККАУНТ
function showAddAccount() {
    openCustomModal("Account", "<p>Функция мультиаккаунта будет доступна в следующем обновлении!</p>");
}

// (Все остальные функции: startApp, openSettings, sendMsg и т.д. остаются без изменений)
