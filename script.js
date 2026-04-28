let isRegMode = false;
let currentLang = 'ru';

const translations = {
    ru: { login_action: "Войти", reg_btn_text: "Регистрация", no_account: "Нет аккаунта? Зарегистрировать", has_account: "Есть аккаунт? Войти", settings_title: "Профиль", save: "Сохранить", cancel: "Отмена", no_bio: "Описания пока нет...", themes_label: "ТЕМЫ", lang_label: "ЯЗЫК", search_placeholder: "Поиск...", input_placeholder: "Сообщение...", privacy_label: "Приватность", privacy_btn: "Настройки данных", edit_bio_label: "Описание" },
    ua: { login_action: "Увійти", reg_btn_text: "Реєстрація", no_account: "Немає акаунту? Створити", has_account: "Є акаунт? Увійти", settings_title: "Профіль", save: "Зберегти", cancel: "Відміна", no_bio: "Опису немає...", themes_label: "ТЕМИ", lang_label: "МОВА", search_placeholder: "Пошук...", input_placeholder: "Повідомлення...", privacy_label: "Приватність", privacy_btn: "Налаштування даних", edit_bio_label: "Опис" },
    en: { login_action: "Login", reg_btn_text: "Register", no_account: "No account? Sign up", has_account: "Have account? Login", settings_title: "Profile", save: "Save", cancel: "Cancel", no_bio: "No bio yet...", themes_label: "THEMES", lang_label: "LANGUAGE", search_placeholder: "Search...", input_placeholder: "Message...", privacy_label: "Privacy", privacy_btn: "Data Settings", edit_bio_label: "Bio" },
    de: { login_action: "Anmelden", reg_btn_text: "Registrieren", no_account: "Kein Konto? Registrieren", has_account: "Konto? Anmelden", settings_title: "Profil", save: "Speichern", cancel: "Abbrechen", no_bio: "Keine Bio...", themes_label: "THEMEN", lang_label: "SPRACHE", search_placeholder: "Suche...", input_placeholder: "Nachricht...", privacy_label: "Privatsphäre", privacy_btn: "Daten-Einstellungen", edit_bio_label: "Bio" },
    fr: { login_action: "Connexion", reg_btn_text: "S'inscrire", no_account: "Pas de compte? S'inscrire", has_account: "Compte? Connexion", settings_title: "Profil", save: "Enregistrer", cancel: "Annuler", no_bio: "Pas de bio...", themes_label: "THÈMES", lang_label: "LANGUE", search_placeholder: "Chercher...", input_placeholder: "Message...", privacy_label: "Confidentialité", privacy_btn: "Paramètres", edit_bio_label: "Bio" },
    es: { login_action: "Entrar", reg_btn_text: "Registro", no_account: "¿Sin cuenta? Crea una", has_account: "¿Tienes cuenta? Entra", settings_title: "Perfil", save: "Guardar", cancel: "Cancelar", no_bio: "Sin bio...", themes_label: "TEMAS", lang_label: "IDIOMA", search_placeholder: "Buscar...", input_placeholder: "Mensaje...", privacy_label: "Privacidad", privacy_btn: "Datos", edit_bio_label: "Bio" },
    it: { login_action: "Accedi", reg_btn_text: "Registrati", no_account: "No account? Registrati", has_account: "Hai un account? Accedi", settings_title: "Profilo", save: "Salva", cancel: "Annulla", no_bio: "No bio...", themes_label: "TEMI", lang_label: "LINGUA", search_placeholder: "Cerca...", input_placeholder: "Messaggio...", privacy_label: "Privacy", privacy_btn: "Dati", edit_bio_label: "Bio" },
    pl: { login_action: "Zaloguj", reg_btn_text: "Zarejestruj", no_account: "Brak konta? Zarejestruj", has_account: "Masz konto? Zaloguj", settings_title: "Profil", save: "Zapisz", cancel: "Anuluj", no_bio: "Brak opisu...", themes_label: "TEMATY", lang_label: "JĘZYK", search_placeholder: "Szukaj...", input_placeholder: "Wiadomość...", privacy_label: "Prywatność", privacy_btn: "Dane", edit_bio_label: "Opis" },
    tr: { login_action: "Giriş", reg_btn_text: "Kayıt Ol", no_account: "Hesap yok mu? Kayıt ol", has_account: "Hesabın var mı? Giriş yap", settings_title: "Profil", save: "Kaydet", cancel: "İptal", no_bio: "Bio yok...", themes_label: "TEMALAR", lang_label: "DİL", search_placeholder: "Ara...", input_placeholder: "Mesaj...", privacy_label: "Gizlilik", privacy_btn: "Veri Ayarları", edit_bio_label: "Bio" },
    jp: { login_action: "ログイン", reg_btn_text: "登録", no_account: "アカウントがありませんか？", has_account: "アカウントをお持ちですか？", settings_title: "プロフィール", save: "保存", cancel: "キャンセル", no_bio: "自己紹介なし", themes_label: "テーマ", lang_label: "言語", search_placeholder: "検索...", input_placeholder: "メッセージ...", privacy_label: "プライバシー", privacy_btn: "データ設定", edit_bio_label: "自己紹介" }
};

// РАБОЧЕЕ ПЕРЕКЛЮЧЕНИЕ РЕГИСТРАЦИИ
function toggleAuthMode(toReg) {
    isRegMode = toReg;
    const fields = document.getElementById('auth-fields');
    const mainBtn = document.getElementById('main-auth-btn');
    const secBtn = document.getElementById('secondary-auth-btn');
    const toggleLink = document.getElementById('auth-toggle-text');
    const lang = translations[currentLang];

    if (isRegMode) {
        fields.innerHTML = `
            <input type="email" id="email" placeholder="Email">
            <input type="text" id="username-reg" placeholder="@yournick">
            <input type="password" id="pass" placeholder="Пароль">
            <input type="password" id="pass-confirm" placeholder="Повторите пароль">
        `;
        mainBtn.innerText = lang.reg_btn_text;
        secBtn.innerText = lang.login_action;
        secBtn.onclick = () => toggleAuthMode(false);
        toggleLink.innerText = lang.has_account;
        toggleLink.onclick = () => toggleAuthMode(false);
    } else {
        fields.innerHTML = `
            <input type="email" id="email" placeholder="Email">
            <input type="password" id="pass" placeholder="Пароль">
        `;
        mainBtn.innerText = lang.login_action;
        secBtn.innerText = lang.reg_btn_text;
        secBtn.onclick = () => toggleAuthMode(true);
        toggleLink.innerText = lang.no_account;
        toggleLink.onclick = () => toggleAuthMode(true);
    }
}

function startApp() {
    const nick = document.getElementById('username-reg')?.value || "@user123";
    document.getElementById('user-display-nick').innerText = nick;
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
}

// НАСТРОЙКИ
function openSettings() { document.getElementById('settings-drawer').classList.add('open'); }
function closeSettings() { document.getElementById('settings-drawer').classList.remove('open'); }

// НИК С ПРОВЕРКОЙ
function toggleNickEdit(show) {
    document.getElementById('nick-view-mode').style.display = show ? 'none' : 'flex';
    document.getElementById('nick-edit-mode').style.display = show ? 'flex' : 'none';
    if(show) document.getElementById('nick-input').value = document.getElementById('user-display-nick').innerText;
}

function confirmNickEdit() {
    const val = document.getElementById('nick-input').value;
    if (val.startsWith('@')) {
        document.getElementById('user-display-nick').innerText = val;
        toggleNickEdit(false);
    }
}

document.addEventListener('input', (e) => {
    if (e.target.id === 'nick-input') {
        const warn = document.getElementById('nick-warning');
        const btn = document.getElementById('save-nick-btn');
        if (!e.target.value.startsWith('@')) {
            warn.style.display = 'block'; e.target.classList.add('error'); btn.disabled = true;
        } else {
            warn.style.display = 'none'; e.target.classList.remove('error'); btn.disabled = false;
        }
    }
});

// ОПИСАНИЕ
function openBioEditor() {
    document.getElementById('bio-display-group').style.display = 'none';
    document.getElementById('bio-editor-container').style.display = 'block';
    document.getElementById('bio-input').value = document.getElementById('user-display-bio').innerText;
}
function closeBioEditor() {
    document.getElementById('bio-display-group').style.display = 'block';
    document.getElementById('bio-editor-container').style.display = 'none';
}
function saveBioData() {
    document.getElementById('user-display-bio').innerText = document.getElementById('bio-input').value;
    closeBioEditor();
}

// ТЕМЫ
function changeTheme(theme) {
    document.body.className = 'theme-' + theme;
    document.querySelectorAll('.theme-opt').forEach(opt => opt.classList.remove('active'));
    document.querySelector('.' + theme + '-opt').classList.add('active');
}

// МОДАЛКИ (ЯЗЫКИ И ПРИВАТНОСТЬ)
function openCustomModal(header, html) {
    document.getElementById('modal-header').innerText = header;
    document.getElementById('modal-content-area').innerHTML = html;
    document.getElementById('custom-modal').style.display = 'flex';
}
function closeCustomModal() { document.getElementById('custom-modal').style.display = 'none'; }
function saveModalAction() { alert("Сохранено!"); closeCustomModal(); }

function showLanguageMenu() {
    let html = '';
    const names = {ru: 'Русский', ua: 'Українська', en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español', it: 'Italiano', pl: 'Polski', tr: 'Türkçe', jp: '日本語'};
    Object.keys(translations).forEach(code => {
        html += `<button class="mac-menu" style="width:100%; margin-bottom:5px; padding:10px;" onclick="setLang('${code}')">${names[code]}</button>`;
    });
    openCustomModal("Выберите язык", html);
}

function setLang(code) {
    currentLang = code;
    const lang = translations[code];
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (lang[key]) el.innerText = lang[key];
    });
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (lang[key]) el.placeholder = lang[key];
    });
    document.getElementById('current-lang-name').innerText = code.toUpperCase();
    toggleAuthMode(isRegMode);
    closeCustomModal();
}

function showPrivacyMenu() {
    openCustomModal("Приватность", "<p>Скрыть номер: [Вкл]</p><p>Скрыть фото: [Выкл]</p>");
}

// ЧАТ
function sendMsg() {
    const inp = document.getElementById('m-input');
    if (!inp.value.trim()) return;
    const history = document.getElementById('chat-history');
    const msg = document.createElement('div');
    msg.style = "align-self: flex-end; background: #fff; color: #ff8a8a; padding: 10px; border-radius: 15px; margin-bottom: 5px; font-weight: bold;";
    msg.innerText = inp.value;
    history.appendChild(msg);
    inp.value = "";
    history.scrollTop = history.scrollHeight;
}

document.getElementById('m-input').addEventListener('keypress', (e) => { if(e.key === 'Enter') sendMsg(); });
