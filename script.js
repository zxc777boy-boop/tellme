let isReg = false;
let currentLang = 'ru';
let selectedTempLang = 'ru'; 
let userData = { nick: "@Сын_Числа_Пи", bio: "Программирую на Tellme" };
let activeModalType = ''; 

const langs = {
    ru: { auth: "Войти", reg: "Создать аккаунт", noAcc: "Нет аккаунта? | <b>Зарегистрироваться</b>", hasAcc: "Есть аккаунт? | <b>Войти</b>", set: "Настройки", prof: "Мой Профиль", apply: "Применить", cancel: "Закрыть", exit: "Выйти", addAcc: "Добавить аккаунт", changeNick: "Изменить ник", notif: "Уведомления", priv: "Приватность" },
    ua: { auth: "Увійти", reg: "Реєстрація", noAcc: "Немає акаунту? | <b>Зареєструватися</b>", hasAcc: "Є акаунт? | <b>Увійти</b>", set: "Налаштування", prof: "Профіль", apply: "Застосувати", cancel: "Закрити", exit: "Вийти", addAcc: "Додати акаунт", changeNick: "Змінити нік", notif: "Сповіщення", priv: "Приватность" },
    en: { auth: "Login", reg: "Register", noAcc: "No account? | <b>Register</b>", hasAcc: "Have account? | <b>Login</b>", set: "Settings", prof: "Profile", apply: "Apply", cancel: "Close", exit: "Logout", addAcc: "Add Account", changeNick: "Change Nick", notif: "Notifications", priv: "Privacy" }
};

const emojiData = {
    smile: ["😊", "😂", "🥰", "😎", "🤔", "🥳", "😭", "😤", "🤯", "😴", "😇", "🤡"],
    nature: ["🌲", "🌵", "🌸", "☀️", "🌙", "⭐", "🌊", "🍂"],
    food: ["🍎", "🍕", "🍔", "🍦", "🍩", "🍓", "🍣", "☕"],
    flag: ["🇺🇦", "🚩", "🏁", "🏴‍☠️", "🏳️", "🇺🇸", "🇬🇧"]
};

function init() {
    renderAuth();
    filterEmoji('smile');
}

function renderAuth() {
    const form = document.getElementById('auth-form');
    const link = document.getElementById('toggle-link');
    const L = langs[currentLang];

    if (isReg) {
        form.innerHTML = `
            <input type="text" id="reg-nick" placeholder="Ваш ник">
            <input type="password" placeholder="Пароль">
            <button class="btn-main" onclick="login()">${L.reg}</button>
        `;
        link.innerHTML = L.hasAcc;
    } else {
        form.innerHTML = `
            <input type="text" placeholder="Ник или Email">
            <input type="password" placeholder="Пароль">
            <button class="btn-main" onclick="login()">${L.auth}</button>
        `;
        link.innerHTML = L.noAcc;
    }
    link.onclick = () => { isReg = !isReg; renderAuth(); };
}

function openSettings(mode) {
    const dr = document.getElementById('drawer');
    const body = document.getElementById('drawer-body');
    const title = document.getElementById('drawer-title');
    const L = langs[currentLang];

    dr.classList.add('open');

    if (mode === 'reg') {
        title.innerText = L.set;
        body.innerHTML = `
            <div class="modal-item" onclick="openModal('lang')">🌐 Язык: ${currentLang.toUpperCase()}</div>
            <div class="modal-item">🔔 ${L.notif}</div>
            <div class="modal-item">🔒 ${L.priv}</div>
            <div class="theme-circles">
                <div class="circle c-pink" onclick="setTheme('pink')"></div>
                <div class="circle c-blue" onclick="setTheme('blue')"></div>
                <div class="circle c-dark" onclick="setTheme('dark')"></div>
            </div>
        `;
    } else {
        title.innerText = L.prof;
        body.innerHTML = `
            <div style="text-align:center; margin-bottom:20px">
                <div style="width:80px; height:80px; background:rgba(255,255,255,0.1); border-radius:20px; margin:0 auto 10px; display:flex; align-items:center; justify-content:center; font-size:2rem">👤</div>
                <h3>${userData.nick}</h3>
                <p style="opacity:0.6; font-size:0.9rem">${userData.bio}</p>
            </div>
            <button class="btn-main" style="width:100%; margin-bottom:10px" onclick="openModal('nick')">${L.changeNick}</button>
            <button class="btn-main" style="width:100%; background:rgba(255,255,255,0.1)">${L.addAcc}</button>
            <button class="btn-main" style="width:100%; background:rgba(255,79,79,0.2); color:#ff4f4f; margin-top:20px" onclick="location.reload()">${L.exit}</button>
        `;
    }
}

function openModal(type) {
    activeModalType = type;
    const modal = document.getElementById('modal-overlay');
    const content = document.getElementById('modal-content');
    const title = document.getElementById('modal-title');
    modal.style.display = 'flex';

    if (type === 'lang') {
        title.innerText = "Выберите язык";
        content.innerHTML = `
            <div class="modal-item ${selectedTempLang==='ru'?'active':''}" onclick="tempSelectLang('ru', this)">Русский</div>
            <div class="modal-item ${selectedTempLang==='ua'?'active':''}" onclick="tempSelectLang('ua', this)">Українська</div>
            <div class="modal-item ${selectedTempLang==='en'?'active':''}" onclick="tempSelectLang('en', this)">English</div>
        `;
    } else if (type === 'nick') {
        title.innerText = "Изменить ник";
        content.innerHTML = `<input type="text" id="new-nick-input" class="search-input" style="width:100%; height:50px" value="${userData.nick}">`;
    }
}

function tempSelectLang(l, el) {
    selectedTempLang = l;
    document.querySelectorAll('.modal-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
}

function applyModal() {
    if (activeModalType === 'lang') {
        currentLang = selectedTempLang;
        renderAuth();
    } else if (activeModalType === 'nick') {
        const val = document.getElementById('new-nick-input').value;
        if (val) userData.nick = val;
    }
    closeModal();
    closeDrawer();
}

function closeModal() { document.getElementById('modal-overlay').style.display = 'none'; }
function closeDrawer() { document.getElementById('drawer').classList.remove('open'); }
function setTheme(t) { document.body.className = 'theme-' + t; }

function login() {
    document.getElementById('auth-screen').classList.remove('active');
    document.getElementById('app-screen').classList.add('active');
    document.getElementById('gear-btn').style.display = 'none';
    renderChats();
}

function renderChats() {
    document.getElementById('chat-list').innerHTML = `
        <div class="chat-item active">
            <div style="width:40px; height:40px; background:rgba(255,255,255,0.1); border-radius:10px; display:flex; align-items:center; justify-content:center">🤖</div>
            <div><b>Tellme Support</b><p style="font-size:0.7rem; opacity:0.5">Система готова</p></div>
        </div>
    `;
}

function sendMsg() {
    const inp = document.getElementById('msg-input');
    if (!inp.value.trim()) return;
    const box = document.getElementById('chat-box');
    box.innerHTML += `<div style="align-self:flex-end; background:var(--acc); color:white; padding:12px 18px; border-radius:18px 18px 4px 18px; font-size:0.95rem; max-width:80%">${inp.value}</div>`;
    inp.value = ""; box.scrollTop = box.scrollHeight;
}

function toggleEmoji() { document.getElementById('emoji-drawer').classList.toggle('open'); }
function filterEmoji(cat) {
    const list = document.getElementById('emoji-list');
    list.innerHTML = "";
    emojiData[cat].forEach(e => {
        const s = document.createElement('span');
        s.innerText = e;
        s.onclick = () => { document.getElementById('msg-input').value += e; };
        list.appendChild(s);
    });
}

window.onload = init;
