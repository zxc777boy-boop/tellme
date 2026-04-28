let isRegMode = false;
let currentLanguage = 'ru';
let userProfile = { nick: "@Сын_Числа_Пи", bio: "Программирую на Tellme", ava: "🍏" };

const dict = {
    ru: { login: "Войти", reg: "Регистрация", noAcc: "Нет аккаунта? | <b>Зарегистрироваться</b>", hasAcc: "Есть аккаунт? | <b>Войти</b>", settings: "Настройки", profile: "Профиль", save: "Сохранить", exit: "Выйти" },
    ua: { login: "Увійти", reg: "Реєстрація", noAcc: "Немає акаунту? | <b>Зареєструватися</b>", hasAcc: "Є акаунт? | <b>Увійти</b>", settings: "Налаштування", profile: "Профіль", save: "Зберегти", exit: "Вийти" },
    en: { login: "Login", reg: "Register", noAcc: "No account? | <b>Register</b>", hasAcc: "Have account? | <b>Login</b>", settings: "Settings", profile: "Profile", save: "Save", exit: "Logout" }
};

const emojis = {
    smiles: ["😊","😂","🥰","😎","🤔","🥳","😭","😤","🤯","😴","😇","🤡"],
    food: ["🍎","🍔","🍕","🍦","🍩","🍣","🍓","☕"],
    flags: ["🇺🇦","🏳️","🏴‍☠️","🏁","🚩","🇺🇸","🇬🇧"]
};

// ИНИЦИАЛИЗАЦИЯ ВХОДА
function renderAuth() {
    const fields = document.getElementById('auth-fields');
    const toggle = document.getElementById('auth-toggle');
    const btn = document.getElementById('main-auth-btn');
    const t = dict[currentLanguage];

    if (isRegMode) {
        fields.innerHTML = `
            <input type="email" placeholder="Email">
            <input type="text" id="reg-nick" placeholder="Юзернейм">
            <input type="password" placeholder="Пароль">
            <input type="password" placeholder="Повторите пароль">
        `;
        btn.innerText = t.reg;
        toggle.innerHTML = t.noAcc;
        toggle.onclick = () => { isRegMode = false; renderAuth(); };
    } else {
        fields.innerHTML = `
            <input type="email" placeholder="Email">
            <input type="password" placeholder="Пароль">
        `;
        btn.innerText = t.login;
        toggle.innerHTML = t.hasAcc;
        toggle.onclick = () => { isRegMode = true; renderAuth(); };
    }
}

// ОТКРЫТИЕ ШТОРКИ
function openDrawer(type) {
    const dr = document.getElementById('drawer');
    const title = document.getElementById('drawer-header-title');
    const body = document.getElementById('drawer-content');
    const t = dict[currentLanguage];

    if (type === 'settings') {
        title.innerText = t.settings;
        body.innerHTML = `
            <p style="opacity:0.6; font-size:0.8rem">ВЫБЕРИТЕ ТЕМУ</p>
            <div class="theme-row">
                <div class="circle-theme" style="background:#ff9a9e" onclick="setTheme('pink')"></div>
                <div class="circle-theme" style="background:#4facfe" onclick="setTheme('blue')"></div>
                <div class="circle-theme" style="background:#333" onclick="setTheme('dark')"></div>
                <div class="circle-theme" style="background:#eee" onclick="setTheme('white')"></div>
            </div>
            <p style="opacity:0.6; font-size:0.8rem">ЯЗЫК СИСТЕМЫ</p>
            <button class="mac-btn-ghost" style="width:100%; margin-top:10px" onclick="openLangModal()">Язык: ${currentLanguage.toUpperCase()}</button>
        `;
    } else {
        title.innerText = t.profile;
        body.innerHTML = `
            <div class="mac-ava">${userProfile.ava}</div>
            <h3 style="text-align:center">${userProfile.nick}</h3>
            <p id="bio-text" style="text-align:center; opacity:0.7; margin:10px 0">${userProfile.bio}</p>
            <div class="mac-bio-box" style="text-align:center">
                <input type="text" id="bio-inp" placeholder="О себе..." class="mac-bio-input">
                <button class="mac-bio-save" onclick="saveBio()">ОК</button>
            </div>
            <p style="opacity:0.6; font-size:0.8rem">СМЕНИТЬ ТЕМУ</p>
            <div class="theme-row">
                <div class="circle-theme" style="background:#ff9a9e" onclick="setTheme('pink')"></div>
                <div class="circle-theme" style="background:#4facfe" onclick="setTheme('blue')"></div>
                <div class="circle-theme" style="background:#333" onclick="setTheme('dark')"></div>
                <div class="circle-theme" style="background:#eee" onclick="setTheme('white')"></div>
            </div>
            <div class="drawer-bottom">
                <button class="mac-btn-ghost" onclick="openModal('Конфиденциальность', 'Ваши данные зашифрованы сквозным методом.')">Конфиденциальность</button>
                <button class="mac-btn-ghost">+ Добавить аккаунт</button>
                <button class="mac-btn-red" onclick="location.reload()">${t.exit}</button>
            </div>
        `;
    }
    dr.classList.add('open');
}

function closeDrawer() { document.getElementById('drawer').classList.remove('open'); }
function setTheme(t) { document.body.className = 'theme-' + t; }

function saveBio() {
    const val = document.getElementById('bio-inp').value;
    if(val) { userProfile.bio = val; document.getElementById('bio-text').innerText = val; }
}

// ЯЗЫКИ И МОДАЛКИ
function openLangModal() {
    const list = ['ru', 'ua', 'en', 'de', 'fr', 'es', 'it', 'pl', 'tr', 'ja'];
    let html = list.map(l => `<div class="lang-item ${currentLanguage===l?'active':''}" onclick="currentLanguage='${l}'; openLangModal()">${l.toUpperCase()}</div>`).join('');
    openModal("Выберите язык", `<div style="max-height:200px; overflow-y:auto">${html}</div>`);
}

function openModal(title, content) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-body').innerHTML = content;
    document.getElementById('modal-overlay').style.display = 'flex';
}
function applyModal() { renderAuth(); closeModal(); }
function closeModal() { document.getElementById('modal-overlay').style.display = 'none'; }

// ЧАТ И ЭМОДЗИ
function toggleEmoji() { document.getElementById('emoji-drawer').classList.toggle('active'); }
function filterEmoji(cat) {
    const grid = document.getElementById('emoji-grid');
    grid.innerHTML = emojis[cat].map(e => `<span onclick="addEmoji('${e}')">${e}</span>`).join('');
}
function addEmoji(e) { document.getElementById('msg-input').value += e; }

function handleAuth() {
    const nick = document.getElementById('reg-nick')?.value;
    if(nick) userProfile.nick = nick.startsWith('@') ? nick : '@' + nick;
    document.getElementById('screen-auth').classList.remove('active');
    document.getElementById('screen-app').classList.add('active');
    renderChatList();
}

function renderChatList() {
    const list = document.getElementById('chat-list');
    const testData = [{n:"Tellme Support", m:"Добро пожаловать!"}, {n:"Саня [Друг]", m:"Стиль macOS просто пушка!"}];
    list.innerHTML = testData.map((c, i) => `
        <div class="chat-item ${i===0?'active':''}" onclick="selectChat('${c.n}', this)">
            <div style="width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:50%"></div>
            <div><b>${c.n}</b><p style="font-size:0.7rem; opacity:0.5">${c.m}</p></div>
        </div>
    `).join('');
}

function selectChat(name, el) {
    document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('active-chat-name').innerText = name;
}

function sendMsg() {
    const inp = document.getElementById('msg-input');
    if(!inp.value.trim()) return;
    const box = document.getElementById('chat-box');
    box.innerHTML += `<div style="align-self:flex-end; background:var(--accent); color:white; padding:10px 14px; border-radius:15px 15px 2px 15px; font-size:0.9rem; max-width:75%">${inp.value}</div>`;
    inp.value = "";
    box.scrollTop = box.scrollHeight;
}

// Запуск
filterEmoji('smiles');
renderAuth();
