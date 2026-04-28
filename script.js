let isRegMode = false;
let user = { nick: "@username", bio: "Описания пока нет..." };

// ПЕРЕКЛЮЧЕНИЕ РЕГИСТРАЦИИ
function toggleMode(toReg) {
    isRegMode = toReg;
    const inputs = document.getElementById('auth-inputs');
    const mainBtn = document.getElementById('btn-primary');
    const toggleTxt = document.getElementById('mode-toggle');

    if(isRegMode) {
        inputs.innerHTML = `
            <input type="email" placeholder="Email">
            <input type="text" id="reg-nick" placeholder="@username">
            <input type="password" placeholder="Пароль">
        `;
        mainBtn.innerText = "Создать аккаунт";
        toggleTxt.innerText = "Есть аккаунт? Войти";
        toggleTxt.onclick = () => toggleMode(false);
    } else {
        inputs.innerHTML = `
            <input type="email" placeholder="Email">
            <input type="password" placeholder="Пароль">
        `;
        mainBtn.innerText = "Войти";
        toggleTxt.innerText = "Нет аккаунта? Зарегистрироваться";
        toggleTxt.onclick = () => toggleMode(true);
    }
}

// ВХОД
function processAuth() {
    const nickVal = document.getElementById('reg-nick')?.value;
    if(nickVal) user.nick = nickVal.startsWith('@') ? nickVal : '@' + nickVal;
    
    document.getElementById('screen-auth').classList.remove('active');
    document.getElementById('screen-app').classList.add('active');
}

// УПРАВЛЕНИЕ ШТОРКОЙ
function openDrawer(type) {
    const drawer = document.getElementById('main-drawer');
    const content = document.getElementById('drawer-content');
    const title = document.getElementById('drawer-title');

    if(type === 'settings') {
        title.innerText = "Настройки";
        content.innerHTML = `
            <p style="font-size:0.7rem; opacity:0.5; margin-bottom:10px;">ВНЕШНИЙ ВИД</p>
            <button onclick="setTheme('pink')">Розовая тема</button>
            <button onclick="setTheme('blue')">Синяя тема</button>
            <button onclick="setTheme('dark')">Темная тема</button>
            <button onclick="setTheme('white')">Светлая тема</button>
            <p style="font-size:0.7rem; opacity:0.5; margin:15px 0 10px;">ЯЗЫК</p>
            <button onclick="openModal('Языки', 'RU, UA, EN, DE, FR, ES, IT, PL, TR, JP')">Сменить язык</button>
        `;
    } else {
        title.innerText = "Профиль";
        content.innerHTML = `
            <div style="text-align:center; margin-bottom:20px;">
                <div style="width:70px; height:70px; background:#444; border-radius:50%; margin:0 auto 10px; display:flex; align-items:center; justify-content:center; font-size:1.5rem">?</div>
                <h3>${user.nick}</h3>
                <p style="font-size:0.8rem; opacity:0.7">${user.bio}</p>
            </div>
            <button onclick="user.bio=prompt('О себе:', user.bio); openDrawer('profile')">Изменить описание</button>
            <button onclick="openModal('Приватность', 'Скрыть номер: ВКЛ')">Конфиденциальность</button>
            <button onclick="location.reload()" style="color:#ff4d4d">Выйти</button>
        `;
    }
    drawer.classList.add('open');
}

function closeDrawer() { document.getElementById('main-drawer').classList.remove('open'); }

function setTheme(t) { document.body.className = 'theme-' + t; }

// ЧАТ
function sendMessage() {
    const inp = document.getElementById('msg-input');
    if(!inp.value.trim()) return;
    const box = document.getElementById('chat-box');
    box.innerHTML += `<div style="align-self:flex-end; background:white; color:#333; padding:10px 15px; border-radius:15px; font-weight:bold; max-width:80%;">${inp.value}</div>`;
    inp.value = "";
    box.scrollTop = box.scrollHeight;
}

function switchChat(chat, el) {
    document.querySelectorAll('.chat-item').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('active-chat-name').innerText = chat === 'support' ? 'Tellme Support' : 'Саня [Друг]';
}

// МОДАЛКИ
function openModal(t, b) {
    document.getElementById('modal-title').innerText = t;
    document.getElementById('modal-body').innerText = b;
    document.getElementById('modal-overlay').style.display = 'flex';
}
function closeModal() { document.getElementById('modal-overlay').style.display = 'none'; }
