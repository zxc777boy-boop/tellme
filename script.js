let isReg = false;
let currentLang = 'ru';
// Имя пользователя согласно вашим предпочтениям
let userData = { nick: "@Сын_Числа_Пи", bio: "Программирую на Tellme" };

const langs = {
    ru: { auth: "Авторизоваться", reg: "Создать аккаунт", noAcc: "Нет аккаунта? | <b>Зарегистрироваться</b>", hasAcc: "Есть аккаунт? | <b>Войти</b>", set: "Настройки", prof: "Мой Профиль" },
    ua: { auth: "Увійти", reg: "Реєстрація", noAcc: "Немає акаунту? | <b>Зареєструватися</b>", hasAcc: "Є акаунт? | <b>Увійти</b>", set: "Налаштування", prof: "Профіль" },
    en: { auth: "Login", reg: "Register", noAcc: "No account? | <b>Register</b>", hasAcc: "Have account? | <b>Login</b>", set: "Settings", prof: "Profile" }
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
            <input type="email" placeholder="Электронная почта">
            <input type="text" id="reg-nick" placeholder="Придумайте никнейм">
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
            <p style="opacity:0.5; font-size:0.75rem; text-transform:uppercase; letter-spacing:1px">Выберите тему</p>
            <div class="theme-circles">
                <div class="circle c-pink" onclick="setTheme('pink')"></div>
                <div class="circle c-blue" onclick="setTheme('blue')"></div>
                <div class="circle c-dark" onclick="setTheme('dark')"></div>
            </div>
            <p style="opacity:0.5; font-size:0.75rem; text-transform:uppercase; letter-spacing:1px; margin-top:30px">Интерфейс</p>
            <button class="btn-add-acc" style="width:100%; margin-top:10px" onclick="openLangModal()">Язык: ${currentLang.toUpperCase()}</button>
        `;
    } else {
        title.innerText = t.prof;
        body.innerHTML = `
            <div class="prof-ava"></div>
            <div class="prof-nick">${userData.nick}</div>
            <div id="bio-display" class="prof-bio">${userData.bio}</div>
            
            <div class="bio-input-group" style="display:flex; gap:10px; margin-bottom:30px">
                <input type="text" id="new-bio" placeholder="Изменить статус..." style="flex:1; background:rgba(255,255,255,0.1); border:none; padding:10px; border-radius:10px; color:white;">
                <button class="save-btn" onclick="saveBio()" style="background:var(--acc); border:none; color:white; padding:0 15px; border-radius:10px; cursor:pointer;">ОК</button>
            </div>

            <p style="opacity:0.5; font-size:0.75rem; text-transform:uppercase; letter-spacing:1px">Внешний вид</p>
            <div class="theme-circles">
                <div class="circle c-pink" onclick="setTheme('pink')"></div>
                <div class="circle c-blue" onclick="setTheme('blue')"></div>
                <div class="circle c-dark" onclick="setTheme('dark')"></div>
            </div>

            <div class="bottom-btns" style="margin-top:30px; display:flex; flex-direction:column; gap:10px">
                <button class="btn-add-acc" onclick="openModal('Безопасность', 'Ваши сообщения зашифрованы сквозным методом.')">Конфиденциальность</button>
                <button class="btn-add-acc">+ Добавить аккаунт</button>
                <button class="btn-exit" onclick="location.reload()">Выйти из системы</button>
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
        document.getElementById('new-bio').value = "";
    }
}

// МОДАЛКА ЯЗЫКОВ
function openLangModal() {
    let list = "";
    const names = {ru: "Русский", ua: "Українська", en: "English"};
    Object.keys(langs).forEach(l => {
        list += `<div class="modal-item ${currentLang === l ? 'active' : ''}" style="padding:15px; margin-bottom:5px; border-radius:10px; cursor:pointer; background:rgba(255,255,255,0.05)" onclick="currentLang='${l}'; openLangModal()">${names[l]}</div>`;
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
    if(document.getElementById('drawer').classList.contains('open')) {
        const type = document.getElementById('drawer-title').innerText === langs[currentLang].prof ? 'profile' : 'reg';
        openSettings(type);
    }
}
function closeModal() { document.getElementById('modal-overlay').style.display = 'none'; }

// ЧАТ И ЭМОДЗИ
function toggleEmoji() { document.getElementById('emoji-drawer').classList.toggle('open'); }
function filterEmoji(cat) {
    const list = document.getElementById('emoji-list');
    list.innerHTML = "";
    emojiData[cat].forEach(e => {
        list.innerHTML += `<span style="cursor:pointer" onclick="addEmoji('${e}')">${e}</span>`;
    });
}
function addEmoji(e) { document.getElementById('msg-input').value += e; }

function sendMsg() {
    const inp = document.getElementById('msg-input');
    if (!inp.value.trim()) return;
    const box = document.getElementById('chat-box');
    box.innerHTML += `<div style="align-self:flex-end; background:rgba(255,255,255,0.2); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.2); color:white; padding:12px 18px; border-radius:18px 18px 0 18px; font-weight:500; max-width:80%; box-shadow:0 4px 15px rgba(0,0,0,0.05)">${inp.value}</div>`;
    inp.value = "";
    box.scrollTop = box.scrollHeight;
}

const testChats = [
    { id: 1, name: "Tellme Support", last: "Вы успешно вошли!" },
    { id: 2, name: "Саня [Друг]", last: "Как там проект?" }
];

function renderChats() {
    const list = document.getElementById('chat-list');
    list.innerHTML = "";
    testChats.forEach(c => {
        list.innerHTML += `
            <div class="chat-item ${c.id === 1 ? 'active' : ''}" style="display:flex; align-items:center; gap:15px; padding:15px; border-radius:18px; cursor:pointer; margin-bottom:5px" onclick="selectChat('${c.name}', this)">
                <div style="width:45px; height:45px; background:rgba(255,255,255,0.2); border-radius:15px"></div>
                <div><b style="display:block; font-size:0.95rem">${c.name}</b><p style="font-size:0.75rem; opacity:0.5">${c.last}</p></div>
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

document.getElementById('msg-input').onkeydown = (e) => { if (e.key === 'Enter') sendMsg(); };
filterEmoji('smile');
renderAuth();
