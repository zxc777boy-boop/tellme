let isReg = false;
let currentLang = 'ru';
let selectedTempLang = 'ru'; 
let userData = { nick: "@Сын_Числа_Пи", bio: "Программирую на Tellme" };

const langs = {
    ru: { auth: "Войти", reg: "Создать аккаунт", noAcc: "Нет аккаунта? | <b>Зарегистрироваться</b>", hasAcc: "Есть аккаунт? | <b>Войти</b>", set: "Настройки", prof: "Мой Профиль", apply: "Применить", cancel: "Закрыть", exit: "Выйти" },
    ua: { auth: "Увійти", reg: "Реєстрація", noAcc: "Немає акаунту? | <b>Зареєструватися</b>", hasAcc: "Є акаунт? | <b>Увійти</b>", set: "Налаштування", prof: "Профіль", apply: "Застосувати", cancel: "Закрити", exit: "Вийти" },
    en: { auth: "Login", reg: "Register", noAcc: "No account? | <b>Register</b>", hasAcc: "Have account? | <b>Login</b>", set: "Settings", prof: "Profile", apply: "Apply", cancel: "Close", exit: "Logout" }
};

const emojiData = {
    smile: ["😊", "😂", "🥰", "😎", "🤔", "🥳", "😭", "😤", "🤯", "😴", "😇", "🤡"],
    food: ["🍎", "🍕", "🍔", "🍦", "🍩"],
    flag: ["🇺🇦", "🚩", "🏁", "🏴‍☠️"]
};

// ИНИЦИАЛИЗАЦИЯ
function renderAuth() {
    const form = document.getElementById('auth-form');
    const toggle = document.getElementById('toggle-link');
    const btn = document.getElementById('main-auth-btn');
    const t = langs[currentLang];

    if (isReg) {
        form.innerHTML = `
            <input type="text" id="reg-nick" placeholder="Никнейм">
            <input type="email" placeholder="Email">
            <input type="password" placeholder="Пароль">
        `;
        btn.innerText = t.reg;
        toggle.innerHTML = t.hasAcc;
    } else {
        form.innerHTML = `
            <input type="email" placeholder="Email">
            <input type="password" placeholder="Пароль">
        `;
        btn.innerText = t.auth;
        toggle.innerHTML = t.noAcc;
    }
}

document.getElementById('toggle-link').onclick = () => { isReg = !isReg; renderAuth(); };

// ЛОГИКА ЯЗЫКА
function openLangModal() {
    selectedTempLang = currentLang; 
    renderLangList();
    document.getElementById('modal-title').innerText = "Язык / Мова / Language";
    document.getElementById('modal-overlay').style.display = 'flex';
    document.getElementById('modal-apply').innerText = langs[currentLang].apply;
    document.getElementById('modal-cancel').innerText = langs[currentLang].cancel;
}

function renderLangList() {
    const container = document.getElementById('modal-content');
    const names = {ru: "Русский", ua: "Українська", en: "English"};
    container.innerHTML = "";
    
    Object.keys(names).forEach(l => {
        const item = document.createElement('div');
        item.className = `modal-item ${selectedTempLang === l ? 'active' : ''}`;
        item.innerText = names[l];
        item.onclick = () => { selectedTempLang = l; renderLangList(); };
        container.appendChild(item);
    });
}

function applyModal() { 
    currentLang = selectedTempLang;
    renderAuth(); 
    closeModal();
    if(document.getElementById('drawer').classList.contains('open')) {
        const type = document.getElementById('drawer-title').innerText === langs['ru'].prof ? 'profile' : 'reg';
        openSettings(type);
    }
}

function closeModal() { document.getElementById('modal-overlay').style.display = 'none'; }

// НАСТРОЙКИ И ПРОФИЛЬ
function openSettings(type) {
    const drawer = document.getElementById('drawer');
    const body = document.getElementById('drawer-body');
    const title = document.getElementById('drawer-title');
    const t = langs[currentLang];

    if (type === 'reg') {
        title.innerText = t.set;
        body.innerHTML = `
            <div class="theme-circles">
                <div class="circle c-pink" onclick="setTheme('pink')"></div>
                <div class="circle c-blue" onclick="setTheme('blue')"></div>
                <div class="circle c-dark" onclick="setTheme('dark')"></div>
            </div>
            <button class="btn-action" onclick="openLangModal()">Сменить язык</button>
        `;
    } else {
        title.innerText = t.prof;
        body.innerHTML = `
            <div style="text-align:center; margin-bottom:20px">
                <div style="width:80px; height:80px; background:rgba(255,255,255,0.1); border-radius:20px; margin:0 auto 10px; display:flex; align-items:center; justify-content:center; font-size:2rem">👤</div>
                <h3>${userData.nick}</h3>
                <p style="opacity:0.5; font-size:0.8rem">${userData.bio}</p>
            </div>
            <button class="btn-action" onclick="openLangModal()">Язык системы</button>
            <button class="btn-action" style="background:rgba(255,77,77,0.2); color:#ff4d4d; margin-top:20px" onclick="location.reload()">${t.exit}</button>
        `;
    }
    drawer.classList.add('open');
}

function closeDrawer() { document.getElementById('drawer').classList.remove('open'); }
function setTheme(t) { document.body.className = 'theme-' + t; }

// ЧАТ
function login() {
    const nickInp = document.getElementById('reg-nick');
    if (nickInp && nickInp.value) userData.nick = nickInp.value.startsWith('@') ? nickInp.value : '@' + nickInp.value;
    
    document.getElementById('auth-screen').classList.remove('active');
    document.getElementById('app-screen').classList.add('active');
    document.getElementById('gear-btn').style.display = 'none';
    renderChats();
}

function renderChats() {
    const list = document.getElementById('chat-list');
    list.innerHTML = `
        <div class="chat-item active">
            <div style="width:40px; height:40px; background:rgba(255,255,255,0.1); border-radius:10px"></div>
            <div><b>Tellme Support</b><p style="font-size:0.7rem; opacity:0.5">Система активна</p></div>
        </div>
    `;
}

function sendMsg() {
    const inp = document.getElementById('msg-input');
    if (!inp.value.trim()) return;
    const box = document.getElementById('chat-box');
    box.innerHTML += `
        <div style="align-self:flex-end; background:var(--acc); color:white; padding:12px 18px; border-radius:18px 18px 4px 18px; font-size:0.95rem; max-width:80%">
            ${inp.value}
        </div>
    `;
    inp.value = "";
    box.scrollTop = box.scrollHeight;
}

// ЭМОДЗИ
function toggleEmoji() { document.getElementById('emoji-drawer').classList.toggle('open'); }
function filterEmoji(cat) {
    const list = document.getElementById('emoji-list');
    list.innerHTML = "";
    emojiData[cat].forEach(e => {
        const s = document.createElement('span');
        s.innerText = e;
        s.style.cursor = "pointer";
        s.onclick = () => { document.getElementById('msg-input').value += e; };
        list.appendChild(s);
    });
}

// Слушатель Enter
document.getElementById('msg-input').addEventListener('keypress', (e) => { if(e.key === 'Enter') sendMsg(); });

renderAuth();
filterEmoji('smile');
