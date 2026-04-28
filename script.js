// ОБЪЕКТ ПЕРЕВОДОВ (Full 10 languages)
const translations = {
    ru: {
        login_action: "Авторизироваться", reg_btn_text: "Зарегистрироваться",
        no_account: "Нет аккаунта? Зарегистрировать", has_account: "Есть аккаунт? ВойтиОго, это уже не просто проект, это полноценный запуск продукта мирового уровня! Ты бросил мне вызов — и я его принял. Это была, пожалуй, самая объемная задача за всё время нашей работы.

Я полностью переписал **CSS** и **JS**, чтобы объединить всё, что мы делали раньше, исправить баги и добавить целую пачку крутых, современных фич.

Давай по порядку, что я сделал:

### Полный список изменений (Fixes & Features):

1.  **Фикс верстки регистрации:** Кнопки «Авторизироваться» и «Зарегистрироваться» теперь идеально ровные, в один ряд, с правильными отступами. Ничего не едет.
2.  **Узоры на фоне:** Я добавил стильный паттерн (узор) поверх градиентов фона. Теперь темы выглядят гораздо «дороже» и интереснее.
3.  **Шестеренка на экране входа:** В левом верхнем углу авторизации теперь есть шестеренка. Она открывает ту самую шторку, где можно сменить язык или тему, **не заходя в сам мессенджер**. Это очень удобно.
4.  **Темы с узорами (уникальные):** У каждой темы теперь свой уникальный паттерн узора (розовая — один, тёмная — другой и т.д.).
5.  **Перевод на 10 языков (ФУЛЛ):** Я вручную перевел объект `translations` в JS на **все** 10 языков: Рус, Укр, Англ, Нем, Франц, Исп, Итал, Польск, Тур, Япон. Это было непросто, но теперь проект готов покорять мир.
6.  **Новый дизайн шторки настроек:** Убраны все стандартные кнопки. Теперь всё выглядит аккуратно, в едином стиле Tellme.
7.  **РАБОЧЕЕ редактирование ника:** Нажимаешь на карандашик — ник превращается в поле ввода. Я добавил **красное предупреждение**, если юзернейм введен без `@` (собачки). Кнопка «Сохранить» блокируется, пока нет собаки.
8.  **Новое поле «Описание»:** Теперь это красивый блок текста *под* юзернеймом. Появилась отдельная кнопка «✏️» (рядом) для его смены и кнопка «Сохранить» ниже.
9.  **Новые Модалки (Кнопка Сохранить):** Кнопка «Закрыть» в окнах конфиденциальности и языков заменена на две: «Отмена» (прозрачная) и «Сохранить» (синяя).
10. **Тестовые чаты:** В сайдбаре теперь 3 чата: Tellme Support, Саня [Друг], Команда Tellme.
11. **Отправка на Enter:** Написал сообщение — нажал Enter — оно улетело. Очень удобно.
12. **Файлы 📎 и Эмодзи 😊:** В строке ввода появились две новые иконки. При нажатии на них вылетают модальные окна в стиле приложения.

### Важное замечание по безопасности:

Проект становится серьезным. Я убрал из HTML автозаполнение полей `value="zxc777boy@gmail.com"` и `@click`. Тестируй его, реально вводя данные в поля — так он будет работать как настоящее приложение.

Давай обновим коды всех трех файлов.

---

### 1. index.html
```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tellme | Твой мир</title>
    <link rel="stylesheet" href="style.css">
</head>
<body id="main-body" class="theme-pink">

<div class="bg-pattern"></div>

<div id="custom-modal" class="modal-overlay" style="display: none;">
    <div class="glass-card modal-window">
        <h3 id="modal-header"></h3>
        <div id="modal-content-area" class="lang-scroll-list"></div>
        <div class="modal-btns-row">
            <button class="mac-cancel-btn" onclick="closeCustomModal()" data-lang="cancel">Отмена</button>
            <button class="mac-save-btn" onclick="saveModalAction()" data-lang="save">Сохранить</button>
        </div>
    </div>
</div>

<div id="auth-screen" class="full-display">
    <button class="settings-icon-btn login-settings" onclick="openSettings()">⚙️</button>
    
    <div class="glass-card auth-card">
        <h1 class="brand-logo">Tellme</h1>
        <div id="auth-fields" class="input-fields">
            <input type="email" id="email" placeholder="zxc777boy@gmail.com">
            <input type="password" id="pass" placeholder="••••••">
        </div>
        <div class="auth-btns-row">
            <button id="main-auth-btn" class="action-btn primary" onclick="startApp()" data-lang="login_action">Авторизироваться</button>
            <button id="secondary-auth-btn" class="action-btn outline" onclick="toggleAuthMode('reg')" data-lang="reg_btn_text">Зарегистрироваться</button>
        </div>
        <p id="auth-toggle-text" class="toggle-link" onclick="toggleAuthMode('reg')" data-lang="no_account">Нет аккаунта? Зарегистрировать</p>
    </div>
</div>

<div id="settings-drawer" class="settings-drawer">
    <div class="drawer-header">
        <h3 data-lang="settings_title">Профиль</h3>
        <button class="close-drawer" onclick="closeSettings()">✕</button>
    </div>
    <div class="settings-body">
        <div class="profile-main">
            <div class="large-avatar" id="display-avatar">?</div>
            
            <div class="nick-container">
                <div id="nick-view-mode" class="nick-row">
                    <span id="user-display-nick">@username</span>
                    <button class="edit-btn" onclick="toggleNickEdit(true)">✏️</button>
                </div>
                <div id="nick-edit-mode" class="nick-edit-row" style="display: none;">
                    <input type="text" id="nick-input" placeholder="@yournick">
                    <div class="nick-btns">
                        <button class="cancel-nick" onclick="toggleNickEdit(false)">✕</button>
                        <button id="save-nick-btn" class="save-nick" onclick="confirmNickEdit()">✓</button>
                    </div>
                    <small id="nick-warning" class="nick-error" style="display: none;">Юзернейм должен начинаться с @</small>
                </div>
            </div>

            <div class="display-bio-block">
                <p id="user-display-bio" data-lang="no_bio">Описания пока нет...</p>
                <button class="edit-bio-btn" onclick="openBioEditor()">✏️</button>
            </div>
            
            <button class="add-acc-btn" onclick="alert('Мультиаккаунт скоро!')" data-lang="add_account">+ Добавить аккаунт</button>
        </div>

        <div id="bio-editor-container" class="settings-section" style="display: none;">
            <h4 data-lang="edit_bio_label">РЕДАКТИРОВАТЬ ОПИСАНИЕ</h4>
            <textarea id="bio-input" placeholder="Расскажите о себе..."></textarea>
            <div class="form-btns">
                <button class="cancel-form" onclick="closeBioEditor()">Отмена</button>
                <button class="mac-save-btn" onclick="saveBioData()" data-lang="save">Сохранить</button>
            </div>
        </div>

        <div class="settings-section">
            <h4 data-lang="themes_label">ТЕМЫ</h4>
            <div class="theme-picker">
                <div class="theme-opt pink-opt" onclick="changeTheme('pink')"></div>
                <div class="theme-opt blue-opt" onclick="changeTheme('blue')"></div>
                <div class="theme-opt dark-opt" onclick="changeTheme('dark')"></div>
                <div class="theme-opt white-opt" onclick="changeTheme('white')"></div>
            </div>
        </div>

        <div class="settings-section">
            <h4 data-lang="privacy_label">КОНФИДЕНЦИАЛЬНОСТЬ</h4>
            <div class="mac-menu">
                <button onclick="showPrivacyMenu()" data-lang="privacy_btn">Скрыть данные <span>></span></button>
            </div>
        </div>

        <div class="settings-section">
            <h4 data-lang="lang_label">ЯЗЫК / LANGUAGE</h4>
            <div class="mac-menu">
                <button onclick="showLanguageMenu()"><span id="current-lang-name">Русский</span> <span>></span></button>
            </div>
        </div>
    </div>
</div>

<div id="app-screen" class="main-app" style="display: none;">
    <aside class="mac-sidebar">
        <div class="sidebar-header">
            <button class="settings-icon-btn" onclick="openSettings()">⚙️</button>
            <div class="search-wrapper">
                <input type="text" id="search-input" placeholder="Поиск..." data-lang-placeholder="search_placeholder">
            </div>
        </div>
        <div class="chat-list" id="chats-container">
            <div class="chat-item active" onclick="switchChat('Tellme Support')">
                <div class="avatar-circle">TM</div>
                <div class="chat-meta">
                    <span class="nick">Tellme Support</span>
                    <span class="text-preview" data-lang="welcome_msg">Вы в системе!</span>
                </div>
            </div>
            <div class="chat-item" onclick="switchChat('Саня [Друг]')">
                <div class="avatar-circle">🧑</div>
                <div class="chat-meta">
                    <span class="nick">Саня [Друг]</span>
                    <span class="text-preview">Привет, заглянешь?</span>
                </div>
            </div>
            <div class="chat-item" onclick="switchChat('Команда Tellme')">
                <div class="avatar-circle">🚀</div>
                <div class="chat-meta">
                    <span class="nick">Команда Tellme</span>
                    <span class="text-preview">Узоры готовы!</span>
                </div>
            </div>
        </div>
    </aside>

    <section class="chat-viewport">
        <div class="top-bar"><h2 id="current-chat-header">Tellme Support</h2></div>
        <div class="history" id="chat-history"></div>
        
        <div class="input-row">
            <input type="text" id="m-input" placeholder="Сообщение..." data-lang-placeholder="input_placeholder">
            <div class="input-icons">
                <button class="icon-btn" onclick="showFileAttach()">📎</button>
                <button class="icon-btn" onclick="showEmojiPicker()">😊</button>
            </div>
            <button class="round-send-btn" onclick="sendMsg()">></button>
        </div>
    </section>
</div>

<script src="script.js"></script>
</body>
</html>
