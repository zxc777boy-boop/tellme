// ГЛАВНАЯ ФУНКЦИЯ ПЕРЕХОДА
function startApp() {
    const user = document.getElementById('username').value;
    
    if (user.length < 3) {
        alert("Ник слишком короткий!");
        return;
    }

    // Скрываем регистрацию и показываем приложение
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
    
    // Применяем ник везде
    document.getElementById('user-display-nick').innerText = user;
}

// КОПИРОВАНИЕ НИКА
function copyToClipboard() {
    const nick = document.getElementById('user-display-nick').innerText;
    navigator.clipboard.writeText(nick).then(() => {
        alert("Ник " + nick + " скопирован!");
    });
}

// УПРАВЛЕНИЕ ШТОРКОЙ
function openSettings() {
    document.getElementById('settings-drawer').classList.add('open');
}

function closeSettings() {
    document.getElementById('settings-drawer').classList.remove('open');
}

// СМЕНА ТЕМ
function changeTheme(themeName) {
    const body = document.getElementById('main-body');
    body.className = ''; 
    body.classList.add('theme-' + themeName);
}

// МОДАЛКА КОНФИДЕНЦИАЛЬНОСТИ
let currentSetting = "";
function openModal(target) {
    currentSetting = target;
    document.getElementById('modal-title').innerText = "Настройка " + target;
    document.getElementById('privacy-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('privacy-modal').style.display = 'none';
}

function setPrivacy(val) {
    alert(currentSetting + " теперь в режиме: " + (val === 'public' ? "Публичный" : "Скрытый"));
    closeModal();
}

// ОТПРАВКА СООБЩЕНИЙ
function sendMsg() {
    const inp = document.getElementById('m-input');
    const history = document.getElementById('chat-history');
    if(inp.value.trim() !== "") {
        const d = document.createElement('div');
        d.className = 'bubble';
        d.style.marginLeft = 'auto';
        d.style.background = '#fff';
        d.style.color = '#8E2DE2';
        d.innerText = inp.value;
        history.appendChild(d);
        inp.value = "";
        history.scrollTop = history.scrollHeight;
    }
}
