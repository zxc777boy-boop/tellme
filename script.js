let isReg = false;
let currentLang = 'ru';
let userData = { nick: "@Сын_Числа_Пи", bio: "Программирую на Tellme" };

const langs = {
    ru: { auth: "Войти", reg: "Регистрация", noAcc: "Нет аккаунта? | <b>Зарегистрироваться</b>", hasAcc: "Есть аккаунт? | <b>Войти</b>", set: "Настройки", prof: "Профиль" },
    ua: { auth: "Увійти", reg: "Реєстрація", noAcc: "Немає акаунту? | <b>Зареєструватися</b>", hasAcc: "Є акаунт? | <b>Увійти</b>", set: "Налаштування", prof: "Профіль" },
    en: { auth: "Login", reg: "Register", noAcc: "No account? | <b>Register</b>", hasAcc: "Have account? | <b>Login</b>", set: "Settings", prof: "Profile" }
    // ... можно добавить еще 7 языков аналогично
};

const emojiData = {
    smile: ["😊", "😂", "🥰", "😎", "🤔", "🥳", "😭", "😤", "🤯", "😴", "😇", "🤡", "💀", "👻", "🔥", "✨"],
    food: ["🍎", "🍕", "🍔", "🍦", "🍩", "🍓", "🍣", "☕"],
    flag: ["🇺🇦", "🚩", "🏁", "🏴‍☠️", "🏳️", "🇺🇸", "🇬🇧"]
};

// ИНИЦИАЛИЗАЦИЯ ФОРМЫ
function renderAuth() {
    const form = document.getElementById('auth-form');
    const toggle = document.getElementById('toggle-link');
    const btn = document.getElementById('main-auth-btn');
    const t = langs[currentLang];

    if (isReg) {
        form.innerHTML = `
            <input type="email" placeholder="Почта">
            <input type="text" id="reg-nick" placeholder="Юзернейм">
            <input type="password" placeholder="Пароль">
            <input type="password" placeholder="Повторите пароль">
        `;
        btn.innerText = t.reg;
        toggle.innerHTML = t.hasAcc;
        toggle.onclick = () => { isReg = false; renderAuth(); };
    } else {
        form.innerHTML = `
            <input type="email" placeholder="Почта">
            <input type="password" placeholder="Пароль">
        `;
        btn.innerText = t.auth;
        toggle.innerHTML = t.noAcc;
        toggle.onclick = () => { isReg = true; renderAuth(); };
    }
}

// ШТОРКА
function openSettings(type) {
    const drawer = document.getElementById('drawer');
    const body = document.getElementById('drawer-body');
    const title = document.getElementById('drawer-title');
    const t = langs[currentLang];

    if (type === 'reg') {
        title.innerText = t.set;
        body.innerHTML = `
            <p style="opacity:0.6; font-size:0.8rem">ТЕМЫ</p>
            <div class="theme-circles">
                <div class="circle c-pink" onclick="setTheme('pink')"></div>
                <div class="circle c-blue" onclick="setTheme('blue')"></div>
                <div class="circle c-dark" onclick="setTheme('dark')"></div>
            </div>
            <p style="opacity:0.6; font-size:0.8rem; margin-top:20px">ЯЗЫК</p>
            <button class="btn-add-acc" style="width:100%; margin-top:10px" onclick="openLangModal()">Выбрать язык (${currentLang.toUpperCase()})</button>
        `;
    } else {
        title.innerText = t.prof;
        body.innerHTML = `
            <div class="prof-ava"></div>
            <div class="prof-nick">${userData.nick}</div>
            <div id="bio-display" class="prof-bio">${userData.bio}</div>
            <div class="bio-input-group">
                <input type="text" id="new-bio" placeholder="Новое описание...">
                <button class="save-btn" onclick="saveBio()">ОК</button>
            </div>
            <p style="opacity:0.6; font-size:0.8rem">ТЕМЫ</p>
            <div class="theme-circles">
                <div class="circle c-pink" onclick="setTheme('pink')"></div>
                <div class="circle c-blue" onclick="setTheme('blue')"></div>
                <div class="circle c-dark" onclick="setTheme('dark')"></div>
            </div>
            <button class="btn-add-acc" style="width:100%; margin-bottom:10px" onclick="openModal('Конфиденциальность', 'Все данные защищены')">Конфиденциальность</button>
            <div class="bottom-btns">
                <button class="btn-add-acc">+ Добавить аккаунт</button>
                <button class="btn-exit" onclick="location.reload()">Выйти</button>
            </div>
        `;
    }
    drawer.classList.add('open');
}

function closeDrawer() { document.getElementById('drawer').classList.remove('open'); }

function setTheme(t) { document.body.className = 'theme-' + t; }

function saveBio() {
    const val = document.getElementById('new-bio').value;
    if (val) {
        userData.bio = val;
        document.getElementById('bio-display').innerText = val;
    }
}

// МОДАЛКА ЯЗЫКОВ
function openLangModal() {
    let list = "";
    Object.keys(langs).forEach(l => {
        list += `<div class="modal-item ${currentLang === l ? 'active' : ''}" onclick="currentLang='${l}'; openLangModal()">${l.toUpperCase()}</div>`;
    });
    openModal("Выберите язык", list);
}

function openModal(title, content) {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('modal-content').innerHTML = content;
    document.getElementById('modal-overlay').style.display = 'flex';
}

function applyModal() { 
    renderAuth(); 
    closeModal(); 
    if(document.getElementById('drawer').classList.contains('open')) openSettings('reg');
}
function closeModal() { document.getElementById('modal-overlay').style.display = 'none'; }

// ЧАТ И ЭМОДЗИ
function toggleEmoji() { document.getElementById('emoji-drawer').classList.toggle('open'); }

function filterEmoji(cat) {
    const list = document.getElementById('emoji-list');
    list.innerHTML = "";
    emojiData[cat].forEach(e => {
        list.innerHTML += `<span onclick="addEmoji('${e}')">${e}</span>`;
    });
}

function addEmoji(e) { document.getElementById('msg-input').value += e; }

function sendMsg() {
    const inp = document.getElementById('msg-input');
    if (!inp.value.trim()) return;
    const box = document.getElementById('chat-box');
    box.innerHTML += `<div style="align-self:flex-end; background:white; color:#333; padding:12px; border-radius:15px; font-weight:600; max-width:80%">${inp.value}</div>`;
    inp.value = "";
    box.scrollTop = box.scrollHeight;
}

// Переключение чатов
const testChats = [
    { id: 1, name: "Tellme Support", last: "Вы в системе!" },
    { id: 2, name: "Саня [Друг]", last: "Придешь сегодня?" }
];

function renderChats() {
    const list = document.getElementById('chat-list');
    list.innerHTML = "";
    testChats.forEach(c => {
        list.innerHTML += `
            <div class="chat-item ${c.id === 1 ? 'active' : ''}" onclick="selectChat('${c.name}', this)">
                <div style="width:40px; height:40px; background:#fff; border-radius:50%"></div>
                <div><b>${c.name}</b><p style="font-size:0.7rem; opacity:0.6">${c.last}</p></div>
            </div>
        `;
    });
}

function selectChat(name, el) {
    document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('active-chat-name').innerText = name;
}

function login() {
    const nick = document.getElementById('reg-nick')?.value;
    if (nick) userData.nick = nick.startsWith('@') ? nick : '@' + nick;
    document.getElementById('auth-screen').classList.remove('active');
    document.getElementById('app-screen').classList.add('active');
    renderChats();
}

// События
document.getElementById('msg-input').onkeydown = (e) => { if (e.key === 'Enter') sendMsg(); };
filterEmoji('smile');
renderAuth();
