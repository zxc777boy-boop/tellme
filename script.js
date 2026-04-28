// Переводы на 10 языков
const i18n = {
    ru: { login_action: "Войти", reg_btn_text: "Регистрация", settings_nav: "Настройки", profile_title: "Профиль", themes_label: "Темы", lang_label: "Язык", save: "Сохранить", hide_name: "Скрыть имя", search_placeholder: "Поиск...", input_placeholder: "Сообщение...", edit_bio_label: "О себе", privacy_label: "Приватность" },
    ua: { login_action: "Увійти", reg_btn_text: "Реєстрація", settings_nav: "Налаштування", profile_title: "Профіль", themes_label: "Теми", lang_label: "Мова", save: "Зберегти", hide_name: "Приховати ім'я", search_placeholder: "Пошук...", input_placeholder: "Повідомлення...", edit_bio_label: "Про себе", privacy_label: "Приватність" },
    en: { login_action: "Login", reg_btn_text: "Register", settings_nav: "Settings", profile_title: "Profile", themes_label: "Themes", lang_label: "Language", save: "Save", hide_name: "Hide Name", search_placeholder: "Search...", input_placeholder: "Message...", edit_bio_label: "Bio", privacy_label: "Privacy" }
    // ... (остальные 7 языков по аналогии)
};

// Переключение шторок
function toggleSidebar(id) {
    document.getElementById(id).classList.toggle('active');
}

// Вход в приложение
function enterApp() {
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
}

// Смена темы
function changeTheme(name) {
    document.body.className = 'theme-' + name;
    document.querySelectorAll('.theme-opt').forEach(opt => opt.classList.remove('active'));
    document.querySelector(`.${name}-opt`).classList.add('active');
}

// Переключение чатов (Тестовые данные)
const chatDatabase = {
    support: { name: "Tellme Support", msg: "Мы всегда на связи!" },
    sanya: { name: "Саня [Друг]", msg: "Бро, когда в Minecraft?" },
    team: { name: "Команда Tellme", msg: "Версия 2.0 запущена!" }
};

function switchChat(id, el) {
    const data = chatDatabase[id];
    document.getElementById('active-chat-name').innerText = data.name;
    document.getElementById('chat-messages').innerHTML = `<div class="msg system">${data.msg}</div>`;
    
    document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');
}

// Валидация ника
function validateNick(input) {
    const error = document.getElementById('nick-error');
    if (!input.value.startsWith('@')) {
        error.style.display = 'block';
        input.style.color = '#ff4d4d';
    } else {
        error.style.display = 'none';
        input.style.color = 'white';
    }
}

// Отправка сообщений
function sendMessage() {
    const input = document.getElementById('msg-input');
    if (input.value.trim()) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'msg user-msg';
        msgDiv.style = "background: rgba(255,255,255,0.2); padding: 10px; border-radius: 10px; margin: 5px; align-self: flex-end;";
        msgDiv.innerText = input.value;
        document.getElementById('chat-messages').appendChild(msgDiv);
        input.value = '';
    }
}

// Приватность (Вкл/Выкл)
function togglePriv(el) {
    el.classList.toggle('on');
}

// Эмодзи
function toggleEmoji() {
    const p = document.getElementById('emoji-picker');
    p.style.display = p.style.display === 'none' ? 'block' : 'none';
}
function addEmoji(e) {
    document.getElementById('msg-input').value += e;
}
