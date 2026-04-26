function startApp() {
    const user = document.getElementById('username').value;
    if (user.length < 3) return alert("Ник слишком короткий!");

    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
    
    // Обновляем ник в шторке
    document.getElementById('user-display-nick').innerText = user;
}

// ФУНКЦИЯ КОПИРОВАНИЯ
function copyToClipboard() {
    const nick = document.getElementById('user-display-nick').innerText;
    navigator.clipboard.writeText(nick).then(() => {
        alert("Юзернейм " + nick + " скопирован!");
    });
}

// УПРАВЛЕНИЕ ТЕМАМИ
function changeTheme(themeName) {
    const body = document.getElementById('main-body');
    body.className = ''; // Сброс всех классов
    body.classList.add('theme-' + themeName);
}

// МОДАЛЬНЫЕ ОКНА КОНФИДЕНЦИАЛЬНОСТИ
let currentTarget = '';
function openModal(target) {
    currentTarget = target;
    document.getElementById('modal-title').innerText = 'Настройка ' + target;
    document.getElementById('privacy-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('privacy-modal').style.display = 'none';
}

function setPrivacy(type) {
    alert('Статус ' + currentTarget + ' изменен на: ' + (type === 'public' ? 'Публичный' : 'Скрытый'));
    closeModal();
}

// ОТКРЫТИЕ ШТОРКИ
function openSettings() {
    document.getElementById('settings-drawer').classList.add('open');
}

function closeSettings() {
    document.getElementById('settings-drawer').classList.remove('remove'); // Ошибка в твоем старом коде
    document.getElementById('settings-drawer').classList.remove('open');
}

function sendMsg() {
    const inp = document.getElementById('m-input');
    const box = document.getElementById('chat-history');
    if(inp.value.trim() !== "") {
        const d = document.createElement('div');
        d.className = 'bubble';
        d.style.marginLeft = 'auto';
        d.style.background = '#fff';
        d.style.color = '#8E2DE2';
        d.innerText = inp.value;
        box.appendChild(d);
        inp.value = "";
        box.scrollTop = box.scrollHeight;
    }
}
