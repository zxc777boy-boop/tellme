function handleAuth() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('pass').value;
    const confirm = document.getElementById('pass-confirm').value;

    // Проверка ника
    if (user.length < 3) {
        alert("Юзернейм должен быть от 3 символов!");
        return;
    }

    // Логика перехода
    // В реальном приложении тут был бы запрос к базе, но у нас фронтенд-симуляция
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'flex';
    
    // Передаем ник в настройки
    document.getElementById('set-nick').value = user;
    
    console.log("Вход выполнен под ником: " + user);
}

function toggleSettings(show) {
    const panel = document.getElementById('settings-panel');
    const chat = document.getElementById('chat-content');
    if (show) {
        panel.style.display = 'block';
        chat.style.display = 'none';
    } else {
        panel.style.display = 'none';
        chat.style.display = 'block';
    }
}

function saveData() {
    const newNick = document.getElementById('set-nick').value;
    if (newNick.length < 3) {
        alert("Ник слишком короткий!");
        return;
    }
    alert("Данные профиля TellMe сохранены!");
    toggleSettings(false);
}

function sendMsg() {
    const input = document.getElementById('m-input');
    const box = document.getElementById('msg-box');
    if (input.value.trim() !== "") {
        const div = document.createElement('div');
        div.className = "msg user";
        div.style.textAlign = "right";
        div.style.margin = "10px 0";
        div.innerHTML = `<span style="background:rgba(255,255,255,0.2); padding:8px 15px; border-radius:15px;">${input.value}</span>`;
        box.appendChild(div);
        input.value = "";
        box.scrollTop = box.scrollHeight;
    }
}

function searchPeople() {
    // Просто визуальный эффект поиска
    console.log("Поиск запущен...");
}
