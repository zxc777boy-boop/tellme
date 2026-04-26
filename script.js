// Функция входа
function startApp() {
    const user = document.getElementById('username').value;
    
    if (user.length < 3) {
        alert("Ник Tellme должен быть не короче 3 символов!");
        return;
    }

    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
    document.getElementById('user-display-nick').innerText = user;

    console.log("Tellme успешно загружен.");
}

// Управление шторкой настроек
function openSettings() {
    document.getElementById('settings-drawer').classList.add('open');
}

function closeSettings() {
    document.getElementById('settings-drawer').classList.remove('open');
}

// Смена тем
function changeTheme(themeName) {
    const body = document.getElementById('main-body');
    body.className = ''; 
    body.classList.add('theme-' + themeName);
    
    // Снимаем класс 'active' с предыдущего кружка и добавляем на текущий
    const opts = document.querySelectorAll('.theme-opt');
    opts.forEach(opt => opt.classList.remove('active'));
    
    const currentOpt = document.querySelector('.' + themeName + '-opt');
    if (currentOpt) currentOpt.classList.add('active');
}

// Редактирование юзернейма
function editUsername() {
    const newNick = prompt("Введите новый юзернейм:");
    if (newNick && newNick.length >= 3) {
        document.getElementById('user-display-nick').innerText = newNick;
    } else if (newNick) {
        alert("Юзернейм слишком короткий!");
    }
}

// Модальное окно конфиденциальности
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

// Отправка сообщений
function sendMsg() {
    const inp = document.getElementById('m-input');
    const box = document.getElementById('chat-history');
    if (inp.value.trim() !== "") {
        const d = document.createElement('div');
        d.className = 'bubble sent'; // Sent
        d.style.marginLeft = 'auto';
        d.style.background = '#fff';
        d.style.color = '#8E2DE2';
        d.textContent = inp.value;
        box.appendChild(d);
        inp.value = "";
        box.scrollTop = box.scrollHeight;
    }
}
