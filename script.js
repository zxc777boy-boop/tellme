// ГАРАНТИРОВАННОЕ ПЕРЕКЛЮЧЕНИЕ
function startApp() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('pass').value;

    // Проверка на длину ника
    if (user.length < 3) {
        alert("Ник Tellme должен быть не короче 3 символов!");
        return;
    }

    // Скрываем регистрацию
    document.getElementById('auth-screen').style.display = 'none';
    
    // Показываем соцсеть
    document.getElementById('app-screen').style.display = 'flex';
    
    // Переносим данные в настройки
    document.getElementById('u-change').value = user;

    console.log("Tellme успешно загружен. Приятного общения!");
}

function openSettings() {
    document.getElementById('messages-view').style.display = 'none';
    document.getElementById('settings-view').style.display = 'block';
}

function closeSettings() {
    document.getElementById('settings-view').style.display = 'none';
    document.getElementById('messages-view').style.display = 'block';
}

function sendMsg() {
    const input = document.getElementById('m-input');
    const history = document.getElementById('chat-history');
    if (input.value.trim() !== "") {
        const msg = document.createElement('div');
        msg.className = "bubble";
        msg.style.marginLeft = "auto";
        msg.style.background = "#fff";
        msg.style.color = "#8E2DE2";
        msg.style.marginTop = "10px";
        msg.textContent = input.value;
        history.appendChild(msg);
        input.value = "";
        history.scrollTop = history.scrollHeight;
    }
}

function saveData() {
    const checkNick = document.getElementById('u-change').value;
    if(checkNick.length < 3) {
        alert("Слишком короткий ник!");
    } else {
        alert("Ваш профиль в Tellme обновлен!");
        closeSettings();
    }
}
