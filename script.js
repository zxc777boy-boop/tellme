let isRegMode = false;
let currentLang = 'ru';

// ОБЪЕКТ ПЕРЕВОДОВ (Full 10 Languages)
const translations = {
    ru: { login_action: "Авторизироваться", reg_btn_text: "Зарегистрироваться", no_account: "Нет аккаунта? Зарегистрировать", has_account: "Есть аккаунт? Войти", settings_title: "Профиль", save: "Сохранить", cancel: "Отмена", no_bio: "Описания пока нет...", themes_label: "ТЕМЫ", lang_label: "ЯЗЫК / LANGUAGE", search_placeholder: "Поиск...", input_placeholder: "Сообщение...", privacy_label: "Конфиденциальность", privacy_btn: "Скрыть данные", edit_bio_label: "ОПИСАНИЕ", close: "Закрыть", welcome_msg: "Вы в системе!", hide_name: "Скрыть имя", hide_use: "Скрыть юз", hide_ava: "Скрыть аватарку" },
    ua: { login_action: "Авторизуватися", reg_btn_text: "Зареєструватися", no_account: "Немає акаунту? Зареєструвати", has_account: "Є акаунт? Увійти", settings_title: "Профіль", save: "Зберегти", cancel: "Відміна", no_bio: "Опису поки немає...", themes_label: "ТЕМИ", lang_label: "МОВА / LANGUAGE", search_placeholder: "Пошук...", input_placeholder: "Повідомлення...", privacy_label: "Конфіденційність", privacy_btn: "Приховати дані", edit_bio_label: "ОПИС", close: "Закрити", welcome_msg: "Ви в системі!", hide_name: "Приховати ім'я", hide_use: "Приховати юз", hide_ava: "Приховати аватарку" },
    en: { login_action: "Login", reg_btn_text: "Register", no_account: "No account? Sign up", has_account: "Have account? Login", settings_title: "Profile", save: "Save", cancel: "Cancel", no_bio: "No bio yet...", themes_label: "THEMES", lang_label: "LANGUAGE", search_placeholder: "Search...", input_placeholder: "Message...", privacy_label: "Privacy", privacy_btn: "Hide Data", edit_bio_label: "BIO", close: "Close", welcome_msg: "Logged in!", hide_name: "Hide Name", hide_use: "Hide User", hide_ava: "Hide Avatar" },
    de: { login_action: "Anmelden", reg_btn_text: "Registrieren", no_account: "Kein Konto? Registrieren", has_account: "Konto? Anmelden", settings_title: "Profil", save: "Speichern", cancel: "Abbrechen", no_bio: "Noch keine Bio...", themes_label: "THEMEN", lang_label: "SPRACHE", search_placeholder: "Suche...", input_placeholder: "Nachricht...", privacy_label: "Privatsphäre", privacy_btn: "Daten verbergen", edit_bio_label: "BIO", close: "Schließen", welcome_msg: "Eingeloggt!", hide_name: "Namen verbergen", hide_use: "User verbergen", hide_ava: "Avatar verbergen" },
    fr: { login_action: "Connexion", reg_btn_text: "S'inscrire", no_account: "Pas de compte? S'inscrire", has_account: "Compte? Connexion", settings_title: "Profil", save: "Enregistrer", cancel: "Annuler", no_bio: "Pas de bio...", themes_label: "THÈMES", lang_label: "LANGUE", search_placeholder: "Chercher...", input_placeholder: "Message...", privacy_label: "Confidentialité", privacy_btn: "Masquer les données", edit_bio_label: "BIO", close: "Fermer", welcome_msg: "Connecté!", hide_name: "Masquer le nom", hide_use: "Masquer l'user", hide_ava: "Masquer l'avatar" },
    es: { login_action: "Entrar", reg_btn_text: "Registro", no_account: "¿Sin cuenta? Crea una", has_account: "¿Tienes cuenta? Entra", settings_title: "Perfil", save: "Guardar", cancel: "Cancelar", no_bio: "Sin bio...", themes_label: "TEMAS", lang_label: "IDIOMA", search_placeholder: "Buscar...", input_placeholder: "Mensaje...", privacy_label: "Privacidad", privacy_btn: "Datos", edit_bio_label: "BIO", close: "Cerrar", welcome_msg: "Conectado!", hide_name: "Ocultar nombre", hide_use: "Ocultar user", hide_ava: "Ocultar avatar" },
    it: { login_action: "Accedi", reg_btn_text: "Registrati", no_account: "No account? Registrati", has_account: "Hai un account? Accedi", settings_title: "Profilo", save: "Salva", cancel: "Annulla", no_bio: "No bio...", themes_label: "TEMI", lang_label: "LINGUA", search_placeholder: "Cerca...", input_placeholder: "Messaggio...", privacy_label: "Privacy", privacy_btn: "Dati", edit_bio_label: "BIO", close: "Chiudi", welcome_msg: "Connesso!", hide_name: "Nascondi nome", hide_use: "Nascondi user", hide_ava: "Nascondi avatar" },
    pl: { login_action: "Zaloguj", reg_btn_text: "Zarejestruj", no_account: "Brak konta? Zarejestruj", has_account: "Masz konto? Zaloguj", settings_title: "Profil", save: "Zapisz", cancel: "Anuluj", no_bio: "Brak opisu...", themes_label: "TEMATY", lang_label: "JĘZYK", search_placeholder: "Szukaj...", input_placeholder: "Wiadomość...", privacy_label: "Prywatność", privacy_btn: "Dane", edit_bio_label: "BIO", close: "Zamknij", welcome_msg: "Zalogowano!", hide_name: "Ukryj imię", hide_use: "Ukryj user", hide_ava: "Ukryj awatar" },
    tr: { login_action: "Giriş", reg_btn_text: "Kayıt Ol", no_account: "Hesap yok mu? Kayıt ol", has_account: "Hesabın var mı? Giriş yap", settings_title: "Profil", save: "Kaydet", cancel: "İptal", no_bio: "Bio yok...", themes_label: "TEMALAR", lang_label: "DİL", search_placeholder: "Ara...", input_placeholder: "Mesaj...", privacy_label: "Gizlilik", privacy_btn: "Veri Ayarları", edit_bio_label: "BIO", close: "Kapat", welcome_msg: "Giriş yapıldı!", hide_name: "İsmi Gizle", hide_use: "User Gizle", hide_ava: "Avatarı Gizle" },
    jp: { login_action: "ログイン", reg_btn_text: "登録", no_account: "アカウントがありませんか？", has_account: "アカウントをお持ちですか？", settings_title: "プロフィール", save: "保存", cancel: "キャンセル", no_bio: "自己紹介なし", themes_label: "テーマ", lang_label: "言語", search_placeholder: "検索...", input_placeholder: "メッセージ...", privacy_label: "プライバシー", privacy_btn: "データ設定", edit_bio_label: "BIO", close: "閉じる", welcome_msg: "ログインしました！", hide_name: "名前を非表示", hide_use: "ユーザー名非表示", hide_ava: "アバター非表示" }
};

// ПЕРЕКЛЮЧЕНИЕ РЕГИСТРАЦИИ (Фикс)
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

// ВХОД В ПРИЛОЖЕНИЕ
function startApp() {
    const userValue = document.getElementById('username-reg')?.value || "@username";
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
    
    // Применяем ник в настройки
    document.getElementById('user-display-nick').innerText = userValue.startsWith('@') ? userValue : '@' + userValue;
    
    console.log("Tellme успешно загружен.");
}

// НАСТРОЙКИ
function openSettings() {
    closeSettings(); // Сначала закроем старую, если открыта
    document.getElementById('settings-drawer').classList.add('open');
}

function closeSettings() {
    document.getElementById('settings-drawer').classList.remove('open');
}

// РЕДАКТИРОВАНИЕ НИКА С ПРОВЕРКОЙ (собачка)
function toggleNickEdit(show) {
    document.getElementById('nick-view-mode').style.display = show ? 'none' : 'flex';
    document.getElementById('nick-edit-mode').style.display = show ? 'flex' : 'none';
    if(show) {
        const currentNick = document.getElementById('user-display-nick').innerText;
        document.getElementById('nick-input').value = currentNick;
    }
}

function confirmNickEdit() {
    const val = document.getElementById('nick-input').value;
    if (val.startsWith('@')) {
        document.getElementById('user-display-nick').innerText = val;
        toggleNickEdit(false);
    }
}

// Навешиваем проверку ника на ввод
document.addEventListener('input', (e) => {
    if (e.target.id === 'nick-input') {
        const val = e.target.value;
        const warning = document.getElementById('nick-warning');
        const saveBtn = document.getElementById('save-nick-btn');
        if (!val.startsWith('@')) {
            warning.style.display = 'block';
            e.target.classList.add('error');
            saveBtn.disabled = true;
        } else {
            warning.style.display = 'none';
            e.target.classList.remove('error');
            saveBtn.disabled = false;
        }
    }
});

// ОПИСАНИЕ (Оно теперь работает)
function openBioEditor() {
    document.getElementById('display-bio-block').style.display = 'none';
    document.getElementById('bio-editor-container').style.display = 'block';
    const currentBio = document.getElementById('user-display-bio').innerText;
    document.getElementById('bio-input').value = (currentBio === translations[currentLang].no_bio) ? '' : currentBio;
}

function closeBioEditor() {
    document.getElementById('display-bio-block').style.display = 'block';
    document.getElementById('bio-editor-container').style.display = 'none';
}

function saveBioData() {
    const newBio = document.getElementById('bio-input').value.trim();
    const displayBio = document.getElementById('user-display-bio');
    if (newBio === '') {
        displayBio.innerText = translations[currentLang].no_bio;
    } else {
        displayBio.innerText = newBio;
    }
    closeBioEditor();
}

// МОДАЛКИ (Языки/Приватность - Mac-стиль)
function openCustomModal(header, contentHTML) {
    document.getElementById('modal-header').innerText = header;
    document.getElementById('modal-content-area').innerHTML = contentHTML;
    document.getElementById('custom-modal').style.display = 'flex';
}

function closeCustomModal() {
    document.getElementById('custom-modal').style.display = 'none';
}

function saveModalAction() {
    alert("Настройки сохранены!");
    closeCustomModal();
}

function showLanguageMenu() {
    let html = '';
    const codes = ['ru', 'ua', 'en', 'de', 'fr', 'es', 'it', 'pl', 'tr', 'jp'];
    codes.forEach(code => {
        html += `<button class="modal-btn" onclick="setLang('${code}')">${getLangName(code)}</button>`;
    });
    openCustomModal("Выберите язык", html);
}

function setLang(code) {
    currentLang = code;
    const lang = translations[code] || translations['en'];
    
    // Обновляем тексты
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (lang[key]) el.innerText = lang[key];
    });

    // Обновляем плейсхолдеры
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (lang[key]) el.placeholder = lang[key];
    });

    document.getElementById('current-lang-name').innerText = getLangName(code);
    
    // Обновляем текущий режим авторизации, чтобы кнопки сменили язык
    toggleAuthMode(isRegMode ? 'reg' : 'login');
    
    closeCustomModal();
}

function getLangName(code) {
    const names = {ru: 'Русский', ua: 'Українська', en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español', it: 'Italiano', pl: 'Polski', tr: 'Türkçe', jp: '日本語'};
    return names[code];
}

function showPrivacyMenu() {
    const html = `
        <button class="mac-menu" style="width:100%; margin-bottom:10px; padding:15px; text-align:left;" onclick="togglePrivStatus('name')">Скрыть имя: <span id="status-name" style="color:#28a745;">Выкл</span></button>
        <button class="mac-menu" style="width:100%; margin-bottom:10px; padding:15px; text-align:left;" onclick="togglePrivStatus('use')">Скрыть юз: <span id="status-use" style="color:#ff4d4d;">Вкл</span></button>
        <button class="mac-menu" style="width:100%; margin-bottom:10px; padding:15px; text-align:left;" onclick="togglePrivStatus('ava')">Скрыть аватарку: <span id="status-ava" style="color:#28a745;">Выкл</span></button>
    `;
    openCustomModal("Приватность", html);
}

// Тестовая логика Вкл/Выкл
function togglePrivStatus(target) {
    const span = document.getElementById('status-' + target);
    if(span.innerText === "Выкл") {
        span.innerText = "Вкл"; span.style.color = "#ff4d4d";
    } else {
        span.innerText = "Выкл"; span.style.color = "#28a745";
    }
}

// ТЕМЫ
function changeTheme(theme) {
    document.body.className = 'theme-' + theme;
    // Обновляем активный кружок
    const opts = document.querySelectorAll('.theme-opt');
    opts.forEach(opt => opt.classList.remove('active'));
    document.querySelector('.' + theme + '-opt').classList.add('active');
}

// ОТПРАВКА
function sendMsg() {
    const inp = document.getElementById('m-input');
    if (inp.value.trim() !== "") {
        const history = document.getElementById('chat-history');
        const msg = document.createElement('div');
        msg.className = 'bubble';
        msg.style = "align-self: flex-end; background: #fff; color: #ff8a8a; font-weight: 600; padding:10px; border-radius:15px; margin-bottom: 5px;";
        msg.innerText = inp.value;
        history.appendChild(msg);
        inp.value = "";
        history.scrollTop = history.scrollHeight;
    }
}

// Отправка на Enter
msgInput = document.getElementById('m-input');
msgInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMsg();
});
