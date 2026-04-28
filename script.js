const translations = {
    ru: {
        login_action: "Авторизироваться", reg_btn_text: "Зарегистрироваться",
        no_account: "Нет аккаунта? Зарегистрировать", has_account: "Есть аккаунт? Войти",
        settings_title: "Профиль", add_account: "+ Добавить аккаунт",
        bio_label: "ОПИСАНИЕ", save_btn: "Сохранить", themes_label: "ТЕМЫ",
        privacy_label: "КОНФИДЕНЦИАЛЬНОСТЬ", privacy_btn: "Скрыть данные",
        lang_label: "ЯЗЫК / LANGUAGE", search_placeholder: "Поиск...", input_placeholder: "Сообщение...",
        welcome_msg: "Вы в системе!", close: "Закрыть",
        hide_name: "Скрыть имя", hide_use: "Скрыть юз", hide_ava: "Скрыть аватарку"
    },
    ua: {
        login_action: "Авторизуватися", reg_btn_text: "Зареєструватися",
        no_account: "Немає акаунту? Зареєструвати", has_account: "Є акаунт? Увійти",
        settings_title: "Профіль", add_account: "+ Додати акаунт",
        bio_label: "ОПИС", save_btn: "Зберегти", themes_label: "ТЕМИ",
        privacy_label: "КОНФІДЕНЦІЙНІСТЬ", privacy_btn: "Приховати дані",
        lang_label: "МОВА / LANGUAGE", search_placeholder: "Пошук...", input_placeholder: "Повідомлення...",
        welcome_msg: "Ви в системі!", close: "Закрити",
        hide_name: "Приховати ім'я", hide_use: "Приховати юз", hide_ava: "Приховати аватарку"
    },
    en: {
        login_action: "Log In", reg_btn_text: "Sign Up",
        no_account: "No account? Register", has_account: "Have an account? Login",
        settings_title: "Profile", add_account: "+ Add Account",
        bio_label: "BIO", save_btn: "Save", themes_label: "THEMES",
        privacy_label: "PRIVACY", privacy_btn: "Hide Data",
        lang_label: "LANGUAGE", search_placeholder: "Search...", input_placeholder: "Message...",
        welcome_msg: "Logged in!", close: "Close",
        hide_name: "Hide Name", hide_use: "Hide Username", hide_ava: "Hide Avatar"
    }
};

let currentLang = 'ru';
let isRegMode = false;

// ПЕРЕКЛЮЧЕНИЕ МЕЖДУ ВХОДОМ И РЕГИСТРАЦИЕЙ
function toggleAuthMode(mode) {
    const fields = document.getElementById('auth-fields');
    const mainBtn = document.getElementById('main-auth-btn');
    const secBtn = document.getElementById('secondary-auth-btn');
    const toggleLink = document.getElementById('auth-toggle-text');
    const lang = translations[currentLang];

    if (mode === 'reg') {
        isRegMode = true;
        fields.innerHTML = `
            <input type="email" id="email" placeholder="zxc777boy@gmail.com">
            <input type="text" id="username" placeholder="@click">
            <input type="password" id="pass" placeholder="••••••">
            <input type="password" id="pass-confirm" placeholder="••••••">
        `;
        mainBtn.innerText = lang.reg_btn_text;
        secBtn.innerText = lang.login_action;
        secBtn.onclick = () => toggleAuthMode('login');
        toggleLink.innerText = lang.has_account;
        toggleLink.onclick = () => toggleAuthMode('login');
    } else {
        isRegMode = false;
        fields.innerHTML = `
            <input type="email" id="email" placeholder="zxc777boy@gmail.com">
            <input type="password" id="pass" placeholder="••••••">
        `;
        mainBtn.innerText = lang.login_action;
        secBtn.innerText = lang.reg_btn_text;
        secBtn.onclick = () => toggleAuthMode('reg');
        toggleLink.innerText = lang.no_account;
        toggleLink.onclick = () => toggleAuthMode('reg');
    }
}

// ВХОД В ПРИЛОЖЕНИЕ
function startApp() {
    const userValue = document.getElementById('username')?.value || "User";
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
    document.getElementById('user-display-nick').innerText = userValue.startsWith('@') ? userValue : '@' + userValue;
}

// НАСТРОЙКИ
function openSettings() { document.getElementById('settings-drawer').classList.add('open'); }
function closeSettings() { document.getElementById('settings-drawer').classList.remove('open'); }

function changeTheme(theme) { document.body.className = 'theme-' + theme; }

// МОДАЛКИ
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
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (data[key]) el.innerText = data[key];
    });
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (data[key]) el.placeholder = data[key];
    });
    // Обновляем текущий режим авторизации текстами нового языка
    toggleAuthMode(isRegMode ? 'reg' : 'login');
    document.getElementById('current-lang-name').innerText = getLangName(code);
    closeCustomModal();
}

function getLangName(code) {
    const names = {ru: 'Русский', ua: 'Українська', en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español', it: 'Italiano', pl: 'Polski', tr: 'Türkçe', jp: '日本語'};
    return names[code];
}

// ОТПРАВКА
function sendMsg() {
    const inp = document.getElementById('m-input');
    if(!inp.value.trim()) return;
    const history = document.getElementById('chat-history');
    const msg = document.createElement('div');
    msg.className = 'bubble';
    msg.style = "align-self: flex-end; background: #fff; color: #ff8a8a; font-weight: 600;";
    msg.innerText = inp.value;
    history.appendChild(msg);
    inp.value = "";
    history.scrollTop = history.scrollHeight;
}
