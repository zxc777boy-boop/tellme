let isReg = false;
let currentLang = 'ru';
let selectedTempLang = 'ru'; 
let userData = { nick: "@Сын_Числа_Пи", bio: "Программирую на Tellme" };
let activeModalType = ''; // 'lang' или 'nick'

const langs = {
    ru: { auth: "Войти", reg: "Создать аккаунт", noAcc: "Нет аккаунта? | <b>Зарегистрироваться</b>", hasAcc: "Есть аккаунт? | <b>Войти</b>", set: "Настройки", prof: "Мой Профиль", apply: "Применить", cancel: "Закрыть", exit: "Выйти", addAcc: "Добавить аккаунт", changeNick: "Изменить ник", notif: "Уведомления", priv: "Приватность" },
    ua: { auth: "Увійти", reg: "Реєстрація", noAcc: "Немає акаунту? | <b>Зареєструватися</b>", hasAcc: "Є акаунт? | <b>Увійти</b>", set: "Налаштування", prof: "Профіль", apply: "Застосувати", cancel: "Закрити", exit: "Вийти", addAcc: "Додати акаунт", changeNick: "Змінити нік", notif: "Сповіщення", priv: "Приватність" },
    en: { auth: "Login", reg: "Register", noAcc: "No account? | <b>Register</b>", hasAcc: "Have account? | <b>Login</b>", set: "Settings", prof: "Profile", apply: "Apply", cancel: "Close", exit: "Logout", addAcc: "Add account", changeNick: "Change nick", notif: "Notifications", priv: "Privacy" }
};

const emojiGroups = {
    "😊": [0x1F600, 0x1F64F], // Смайлы (полный набор)
    "🐱": [0x1F400, 0x1F4FF], // Животные, растения и природа
    "🍔": [0x1F32D, 0x1F390], // Еда и напитки
    "⚽": [0x1F3A0, 0x1F3F0], // Спорт и развлечения
    "🚗": [0x1F680, 0x1F6FF], // Транспорт и карты
    "💡": [0x2300, 0x27BF],   // Огромный блок значков, стрелок и символов
    "🇺🇦": [0x1F1E6, 0x1F1FF]  // Флаги (региональные коды)
};
function renderAllEmojis() {
    const tabsContainer = document.querySelector('.emoji-tabs');
    const list = document.getElementById('emoji-list');
    
    tabsContainer.innerHTML = ""; // Очищаем старые табы
    
    Object.keys(emojiGroups).forEach(icon => {
        const btn = document.createElement('button');
        btn.innerText = icon;
        btn.onclick = () => loadCategory(emojiGroups[icon]);
        tabsContainer.appendChild(btn);
    });

    // Загружаем первую категорию по умолчанию
    loadCategory(emojiGroups["😊"]);
}

function loadCategory(range) {
    const list = document.getElementById('emoji-list');
    list.innerHTML = ""; // Очищаем сетку перед загрузкой новой категории
    
    for (let i = range[0]; i <= range[1]; i++) {
        const span = document.createElement('span');
        // Превращаем код Unicode в реальный символ
        span.innerHTML = `&#${i};`; 
        span.className = 'emoji-item'; // Для стилей в CSS
        span.style.cursor = "pointer";
        
        // Логика клика: добавляем эмодзи в инпут
        span.onclick = () => {
            const input = document.getElementById('msg-input');
            input.value += span.innerText;
            input.focus(); // Возвращаем фокус на поле ввода
        };
        
        list.appendChild(span);
    }
}

// Запускаем при загрузке
renderAllEmojis();

// РЕНДЕР АВТОРИЗАЦИИ
function renderAuth() {
    const form = document.getElementById('auth-form');
    const toggle = document.getElementById('toggle-link');
    const btn = document.getElementById('main-auth-btn');
    const t = langs[currentLang];
    if (isReg) {
        form.innerHTML = `<input type="text" id="reg-nick" placeholder="Никнейм (с @)"><input type="email" placeholder="Email"><input type="password" placeholder="Пароль">`;
        btn.innerText = t.reg; toggle.innerHTML = t.hasAcc;
    } else {
        form.innerHTML = `<input type="email" placeholder="Email"><input type="password" placeholder="Пароль">`;
        btn.innerText = t.auth; toggle.innerHTML = t.noAcc;
    }
}
document.getElementById('toggle-link').onclick = () => { isReg = !isReg; renderAuth(); };

// МОДАЛЬНЫЕ ОКНА
function openLangModal() {
    activeModalType = 'lang';
    selectedTempLang = currentLang; 
    document.getElementById('modal-title').innerText = "Язык / Language";
    renderLangList();
    showModal();
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

function openNickModal() {
    activeModalType = 'nick';
    document.getElementById('modal-title').innerText = langs[currentLang].changeNick;
    document.getElementById('modal-content').innerHTML = `
        <input type="text" id="new-nick-input" placeholder="@nickname" value="${userData.nick}">
    `;
    showModal();
}

function showModal() {
    document.getElementById('modal-error').innerText = "";
    document.getElementById('modal-overlay').style.display = 'flex';
    document.getElementById('modal-apply').innerText = langs[currentLang].apply;
    document.getElementById('modal-cancel').innerText = langs[currentLang].cancel;
}

function applyModal() {
    if (activeModalType === 'lang') {
        currentLang = selectedTempLang;
        renderAuth(); 
        if(document.getElementById('drawer').classList.contains('open')) openSettings(document.getElementById('drawer-title').innerText === langs['ru'].set ? 'reg' : 'profile');
        closeModal();
    } else if (activeModalType === 'nick') {
        const val = document.getElementById('new-nick-input').value.trim();
        if (!val.startsWith('@')) {
            document.getElementById('modal-error').innerText = "Ник должен начинаться с @";
            return;
        }
        userData.nick = val;
        if(document.getElementById('drawer').classList.contains('open')) openSettings('profile');
        closeModal();
    }
}

function closeModal() { document.getElementById('modal-overlay').style.display = 'none'; }

// ШТОРКА И НАСТРОЙКИ
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
                <div class="circle c-white" onclick="setTheme('white')"></div>
            </div>
            <button class="btn-action" onclick="openLangModal()">🌐 ${currentLang.toUpperCase()}</button>
        `;
    } else {
        title.innerText = t.prof;
        body.innerHTML = `
            <div style="text-align:center; margin-bottom:20px">
                <div style="width:80px; height:80px; background:rgba(255,255,255,0.1); border-radius:20px; margin:0 auto 10px; display:flex; align-items:center; justify-content:center; font-size:2rem">👤</div>
                <h3 style="display:flex; align-items:center; justify-content:center; gap:10px">
                    ${userData.nick} <span onclick="openNickModal()" style="cursor:pointer; font-size:1rem; opacity:0.6">✎</span>
                </h3>
                <p style="opacity:0.5; font-size:0.8rem">${userData.bio}</p>
            </div>
            <div class="theme-circles">
                <div class="circle c-pink" onclick="setTheme('pink')"></div>
                <div class="circle c-blue" onclick="setTheme('blue')"></div>
                <div class="circle c-dark" onclick="setTheme('dark')"></div>
                <div class="circle c-white" onclick="setTheme('white')"></div>
            </div>
            <button class="btn-action" onclick="openLangModal()">🌐 Сменить язык</button>
            
            <div class="extra-item">${t.notif} <div class="switch on" onclick="this.classList.toggle('on')"></div></div>
            <div class="extra-item" style="cursor:pointer">${t.priv} <span>›</span></div>
            
            <div style="margin-top:auto; padding-top:20px">
                <button class="btn-action blue-btn" onclick="alert('Coming Soon...')">${t.addAcc}</button>
                <button class="btn-action cancel" style="color:#ff4d4d" onclick="location.reload()">${t.exit}</button>
            </div>
        `;
    }
    drawer.classList.add('open');
}

function closeDrawer() { document.getElementById('drawer').classList.remove('open'); }
function setTheme(t) { document.body.className = 'theme-' + t; }

// ЧАТ
function login() {
    const nickInp = document.getElementById('reg-nick');
    if (nickInp && nickInp.value) {
        if (!nickInp.value.startsWith('@')) { alert("Ник должен начинаться с @"); return; }
        userData.nick = nickInp.value;
    }
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

// ЭМОДЗИ
function toggleEmoji() { document.getElementById('emoji-drawer').classList.toggle('open'); }
function filterEmoji(cat) {
    const list = document.getElementById('emoji-list');
    list.innerHTML = "";
    emojiData[cat].forEach(e => {
        const s = document.createElement('span'); s.innerText = e; s.style.cursor = "pointer";
        s.onclick = () => { document.getElementById('msg-input').value += e; };
        list.appendChild(s);
    });
}

document.getElementById('msg-input').addEventListener('keypress', (e) => { if(e.key === 'Enter') sendMsg(); });
renderAuth();
filterEmoji('smile');

let mediaRecorder;
let chunks = [];
let mode = 'audio'; 
let isRecording = false;

const recordBtn = document.getElementById('record-btn');
const videoPreview = document.getElementById('video-preview');
const videoContainer = document.getElementById('video-preview-container');

// Переключение иконок
recordBtn.addEventListener('click', () => {
    if (isRecording) return;
    mode = mode === 'audio' ? 'video' : 'audio';
    recordBtn.innerText = mode === 'audio' ? '🎤' : '📷';
});

// Функции начала и конца записи
recordBtn.onmousedown = startRecording;
recordBtn.onmouseup = stopRecording;
recordBtn.onmouseleave = () => { if(isRecording) stopRecording(); };

async function startRecording() {
    isRecording = true;
    chunks = [];
    
    const constraints = {
        audio: true, // Звук записывается ВСЕГДА (и для гс, и для кружков)
        video: mode === 'video' ? { width: 400, height: 400, facingMode: "user" } : false
    };

    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (mode === 'video') {
            videoContainer.style.display = 'block';
            videoPreview.srcObject = stream;
        }

        recordBtn.classList.add('recording');
        
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = e => { if(e.data.size > 0) chunks.push(e.data); };
        mediaRecorder.onstop = processMedia;
        mediaRecorder.start();
    } catch (err) {
        console.error("Нет доступа:", err);
        isRecording = false;
    }
}

function stopRecording() {
    if (!isRecording) return;
    mediaRecorder.stop();
    mediaRecorder.stream.getTracks().forEach(t => t.stop());
    
    recordBtn.classList.remove('recording');
    videoContainer.style.display = 'none';
    isRecording = false;
}

function processMedia() {
    if (chunks.length === 0) return; // Защита от пустого сообщения
    
    const blob = new Blob(chunks, { type: mode === 'audio' ? 'audio/ogg' : 'video/webm' });
    const url = URL.createObjectURL(blob);
    const box = document.getElementById('chat-box');

    const msgWrapper = document.createElement('div');
    msgWrapper.style.alignSelf = 'flex-end';
    msgWrapper.style.marginBottom = '15px';

    if (mode === 'audio') {
        msgWrapper.innerHTML = `<audio src="${url}" controls style="height:35px"></audio>`;
    } else {
        // Создаем кружок с функцией увеличения
        const video = document.createElement('video');
        video.src = url;
        video.autoplay = true;
        video.loop = true;
        video.muted = false; // Звук теперь есть!
        video.className = 'video-msg';
        video.style.cssText = "width:150px; height:150px; border-radius:50%; object-fit:cover; border:3px solid var(--acc); cursor:pointer";
        
        // Увеличение при клике
        video.onclick = () => video.classList.toggle('expanded');
        msgWrapper.appendChild(video);
    }

    box.appendChild(msgWrapper);
    box.scrollTop = box.scrollHeight;
}

// Запуск рендера библиотеки при загрузке скрипта
renderAllEmojis();
