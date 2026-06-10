// Функция переключения окон (Авторизация <-> Регистрация)
function switchWindow(currentId, targetId) {
    const currentWindow = document.getElementById(currentId);
    const targetWindow = document.getElementById(targetId);
    
    if (currentWindow && targetWindow) {
        currentWindow.classList.add('hidden');
        targetWindow.classList.remove('hidden');
    }
}

// Показать окно настроек
function showSettings() {
    document.getElementById('settings-window').classList.remove('hidden');
}

// Скрыть окно настроек
function hideSettings() {
    document.getElementById('settings-window').classList.add('hidden');
}

// Переключение табов внутри настроек (Профиль / Приватность / Внешний вид)
function switchTab(tabId) {
    // Скрываем все вкладки контента
    const tabs = document.querySelectorAll('.settings-tab');
    tabs.forEach(tab => tab.classList.add('hidden'));
    
    // Снимаем активный класс со всех элементов сайдбара
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => item.classList.remove('active'));
    
    // Показываем нужный таб
    document.getElementById(tabId).classList.remove('hidden');
    
    // Ищем нажатый элемент сайдбара через событие и подсвечиваем его
    const clickedItem = event.currentTarget;
    clickedItem.classList.add('active');
}

// Управление Тёмной Темой (macOS Dark Mode)
function toggleDarkTheme() {
    const isChecked = document.getElementById('theme-toggle').checked;
    if (isChecked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}
