let isReg = false;
let currentLang = 'ru';
let selectedTempLang = 'ru'; 
let userData = { nick: "@Сын_Числа_Пи", bio: "Программирую на Tellme", ava: "🍏" };

const langs = {
    ru: { auth: "Войти", reg: "Создать аккаунт", noAcc: "Нет аккаунта? | <b>Зарегистрироваться</b>", hasAcc: "Есть аккаунт? | <b>Войти</b>", set: "Настройки", prof: "Мой Профиль", apply: "Применить", cancel: "Закрыть", exit: "Выйти" },
    ua: { auth: "Увійти", reg: "Реєстрація", noAcc: "Немає акаунту? | <b>Зареєструватися</b>", hasAcc: "Є акаунт? | <b>Увійти</b>", set: "Налаштування", prof: "Мій Профіль", apply: "Застосувати", cancel: "Закрити", exit: "Вийти" },
    en: { auth: "Login", reg: "Register", noAcc: "No account? | <b>Register</b>", hasAcc: "Have account? | <b>Login</b>", set: "Settings", prof: "My Profile", apply: "Apply", cancel: "Close", exit: "Logout" }
};

const emojiData = {
    smile: ["😊", "😂", "🥰", "😎", "🤔", "🥳", "😭", "😤", "🤯", "😴", "😇", "🤡", "💀", "👻", "🔥", "✨"],
    food: ["🍎", "🍕", "🍔", "🍦", "🍩", "🍓", "🍣", "☕"],
    flag: ["🇺🇦", "🚩", "🏁", "🏴‍☠️", "🏳️", "🇺🇸", "🇬🇧"]
};

// РЕНДЕР ФОРМЫ ВХОДА
function renderAuth() {
    const form = document.getElementById('auth-form');
    const toggle = document.getElementById('toggle-link');
    const btn = document.getElementById('main-auth-btn');
    const t = langs[currentLang];

    if (isReg) {
        form.innerHTML = `
            <input type="email" placeholder="Электронная почта">
            <input type="text" id="reg-nick" placeholder="Ваш никнейм">
            <input type="password" placeholder="Пароль">
            <input type="password" placeholder="Повторите пароль">
        `;
        btn.innerText = t.reg;
        toggle.innerHTML = t.hasAcc;
    } else {
        form.innerHTML = `
            <input type="email" placeholder="Почта">
            <input type="password" placeholder="Пароль">
        `;
        btn.innerText = t.auth;
        toggle.innerHTML = t.noAcc;
    }
}

document.getElementById('toggle-link').onclick = () => { isReg = !isReg; renderAuth(); };

// ЛОГИКА ВЫБОРА ЯЗЫКА
function openLangModal() {
    selectedTempLang = currentLang; 
    renderLangList();
    document.getElementById('modal-title').innerText = "Выберите язык";
    document.getElementById('modal-overlay').style.display = 'flex';
    
    // Локализация кнопок самой модалки
    document.getElementById('modal-apply').innerText = langs[currentLang].apply;
    document.getElementById('modal-cancel').innerText = langs[currentLang].cancel;
}

function renderLangList() {
    const container = document.getElementById('modal-content');
    const names = {ru: "Русский", ua: "Українська", en: "English", de: "Deutsch", fr: "Français", pl: "Polski"};
    container.innerHTML = "";
    
    Object.keys(names).forEach(l => {
        const item = document.createElement('div');
        item.className = `modal-item ${selectedTempLang === l ? 'active' : ''}`;
        item.innerText = names[l];
        item.onclick = () => {
            selectedTempLang = l;
            renderLangList();
        };
        container.appendChild(item);
    });
}

function applyModal() { 
    currentLang = selectedTempLang;
    renderAuth(); 
    closeModal();
    if(document.getElementById('drawer').classList.contains('open')) {
        const currentTitle = document.getElementById('drawer-title').innerText;
        // Если шторка открыта, перерисовываем её контент на новом языке
        const type = (currentTitle === langs['ru'].prof || currentTitle === langs['ua'].prof || currentTitle === langs['en'].prof) ? 'profile' : 'reg';
        openSettings(type);
    }
}

function closeModal() { document.getElementById('modal-overlay').style.display = 'none'; }

// ШТОРКА (НАСТРОЙКИ / ПРОФИЛЬ)
function openSettings(type) {
    const drawer = document.getElementById('drawer');
    const body = document.getElementById('drawer-body');
    const title = document.getElementById('drawer-title');
    const t = langs[currentLang];

    if (type === 'reg') {
        title.innerText = t.set;
        body.innerHTML = `
            <p style="opacity:0.5; font-size:0.8rem; margin-bottom:10px">ВНЕШНИЙ ВИД</p>
            <div class="theme-circles">
                <div class="circle c-pink" onclick="setTheme('pink')"></div>
                <div class="circle c-blue" onclick="setTheme('blue')"></div>
                <div class="circle c-dark" onclick="setTheme('dark')"></div>
            </div>
            <p style="opacity:0.5; font-size:0.8rem; margin:20px 0 10px">ЯЗЫК ПРИЛОЖЕНИЯ</p>
            <button class="btn-action" onclick="openLangModal()">Язык: ${currentLang.toUpperCase()}</button>
        `;
    } else {
        title.innerText = t.prof;
        body.innerHTML = `
            <div style="text-align:center; margin-bottom:20px">
                <div style="width:100px; height:100px; background:rgba(255,255,255,0.1); border-radius:30px; margin:0 auto; font-size:3rem; display:flex; align-items:center; justify-content:center">${userData.ava}</div>
                <h2 style="margin-top:15px">${userData.nick}</h2>
                <p style="opacity:0.6">${userData.bio}</p>
            </div>
            <div class="theme-circles">
                <div class="circle c-pink" onclick="setTheme('pink')"></div>
                <div class="circle c-blue" onclick="setTheme('blue')"></div>
                <div class="circle c-dark" onclick="setTheme('dark')"></div>
            </div>
            <button class="btn-action" style="margin-top:10px" onclick="openLangModal()">Сменить язык</button>
            <button class="btn-action cancel" style="margin-top:10px; color:#ff4d4d" onclick="location.reload()">${t.exit}</button>
        `;
    }
    drawer.classList.add('open');
}

function closeDrawer() { document.getElementById('drawer').classList.remove('open'); }
function setTheme(t) { document.body.className = 'theme-' + t; }

// ЧАТ И СООБЩЕНИЯ
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
            <div style="width:55px; height:55px; background:rgba(255,255,255,0.1); border-radius:18px; display:flex; align-items:center; justify-content:center">🤖</div>
            <div><b>Tellme Support</b><p style="font-size:0.85rem; opacity:0.5">Добро пожаловать!</p></div>
        </div>
        <div class="chat-item">
            <div style="width:55px; height:55px; background:rgba(255,255,255,0.1); border-radius:18px; display:flex; align-items:center; justify-content:center">👨‍💻</div>
            <div><b>Саня [Друг]</b><p style="font-size:0.85rem; opacity:0.5">Стиль macOS топ!</p></div>
        </div>
    `;
}

function sendMsg() {
    const inp = document.getElementById('msg-input');
    if (!inp.value.trim()) return;
    const box = document.getElementById('chat-box');
    box.innerHTML += `
        <div style="align-self:flex-end; background:var(--acc); color:white; padding:18px 24px; border-radius:22px 22px 4px 22px; font-weight:500; max-width:75%; box-shadow:0 8px 20px rgba(0,0,0,0.15)">
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
        const span = document.createElement('span');
        span.innerText = e;
        span.style.cursor = "pointer";
        span.onclick = () => { document.getElementById('msg-input').value += e; };
        list.appendChild(span);
    });
}

// Запуск
document.getElementById('msg-input').onkeydown = (e) => { if (e.key === 'Enter') sendMsg(); };
filterEmoji('smile');
renderAuth();
