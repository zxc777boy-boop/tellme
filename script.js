const translations = {
    ru: {
        login_btn: "Войти в мир", settings_title: "Профиль", add_account: "+ Добавить аккаунт",
        bio_label: "ОПИСАНИЕ", save_btn: "Сохранить", themes_label: "ТЕМЫ",
        privacy_label: "КОНФИДЕНЦИАЛЬНОСТЬ", privacy_btn: "Скрыть данные",
        lang_label: "ЯЗЫК / LANGUAGE", search_placeholder: "Поиск...", input_placeholder: "Сообщение...",
        welcome_msg: "Вы в системе!", close: "Закрыть",
        hide_name: "Скрыть имя", hide_use: "Скрыть юз", hide_ava: "Скрыть аватарку"
    },
    ua: {
        login_btn: "Увійти у світ", settings_title: "Профіль", add_account: "+ Додати акаунт",
        bio_label: "ОПИС", save_btn: "Зберегти", themes_label: "ТЕМИ",
        privacy_label: "КОНФІДЕНЦІЙНІСТЬ", privacy_btn: "Приховати дані",
        lang_label: "МОВА / LANGUAGE", search_placeholder: "Пошук...", input_placeholder: "Повідомлення...",
        welcome_msg: "Ви в системі!", close: "Закрити",
        hide_name: "Приховати ім'я", hide_use: "Приховати юз", hide_ava: "Приховати аватарку"
    },
    en: {
        login_btn: "Enter World", settings_title: "Profile", add_account: "+ Add Account",
        bio_label: "BIO", save_btn: "Save", themes_label: "THEMES",
        privacy_label: "PRIVACY", privacy_btn: "Hide Data",
        lang_label: "LANGUAGE", search_placeholder: "Search...", input_placeholder: "Message...",
        welcome_msg: "Logged in!", close: "Close",
        hide_name: "Hide Name", hide_use: "Hide User", hide_ava: "Hide Avatar"
    }
    // Можно добавить de, fr, es, it, pl, tr, jp по такой же схеме
};

let currentLang = 'ru';

function startApp() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
}

function openSettings() { document.getElementById('settings-drawer').classList.add('open'); }
function closeSettings() { document.getElementById('settings-drawer').classList.remove('open'); }

function changeTheme(theme) {
    document.body.className = 'theme-' + theme;
}

function openCustomModal(header, contentHTML) {
    document.getElementById('modal-header').innerText = header;
    document.getElementById('modal-content-area').innerHTML = contentHTML;
    document.getElementById('custom-modal').style.display = 'flex';
}

function closeCustomModal() { document.getElementById('custom-modal').style.display = 'none'; }

function showPrivacyMenu() {
    const lang = translations[currentLang];
    const html = `
        <button class="modal-btn" onclick="closeCustomModal()">${lang.hide_name}</button>
        <button class="modal-btn" onclick="closeCustomModal()">${lang.hide_use}</button>
        <button class="modal-btn" onclick="closeCustomModal()">${lang.hide_ava}</button>
    `;
    openCustomModal(lang.privacy_label, html);
}

function showLanguageMenu() {
    const langNames = {ru: 'Русский', ua: 'Українська', en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español', it: 'Italiano', pl: 'Polski', tr: 'Türkçe', jp: '日本語'};
    let html = '';
    Object.keys(langNames).forEach(code => {
        html += `<button class="modal-btn" onclick="setLanguage('${code}')">${langNames[code]}</button>`;
    });
    openCustomModal("Select Language", html);
}

function setLanguage(code) {
    currentLang = code;
    const data = translations[code] || translations['en'];
    
    // Обновляем тексты
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (data[key]) el.innerText = data[key];
    });

    // Обновляем плейсхолдеры
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (data[key]) el.placeholder = data[key];
    });

    const langNames = {ru: 'Русский', ua: 'Українська', en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español', it: 'Italiano', pl: 'Polski', tr: 'Türkçe', jp: '日本語'};
    document.getElementById('current-lang-name').innerText = langNames[code];
    closeCustomModal();
}

function sendMsg() {
    const inp = document.getElementById('m-input');
    if(inp.value.trim() === "") return;
    const history = document.getElementById('chat-history');
    const msg = document.createElement('div');
    msg.innerText = inp.value;
    msg.style = "background: rgba(255,255,255,0.2); padding: 10px 15px; border-radius: 15px; margin-bottom: 10px; align-self: flex-end; max-width: 70%; margin-left: auto;";
    history.appendChild(msg);
    inp.value = "";
    history.scrollTop = history.scrollHeight;
}
