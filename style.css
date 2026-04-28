@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
body { height: 100vh; overflow: hidden; display: flex; align-items: center; justify-content: center; }

/* ТЕМЫ И ПАТТЕРНЫ */
.theme-pink { background: #ff9a9e; --accent: #ff6b6b; }
.theme-pink .bg-pattern { background-image: radial-gradient(rgba(255,255,255,0.3) 1.5px, transparent 1.5px); background-size: 24px 24px; }

.theme-blue { background: #4facfe; --accent: #007aff; }
.theme-blue .bg-pattern { background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px); }

.theme-dark { background: #1c1c1e; color: white; --accent: #0a84ff; }
.theme-dark .bg-pattern { background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20L0 40h40L20 20z' fill='%23fff' fill-opacity='0.02'/%3E%3C/svg%3E"); }

.theme-white { background: #f5f5f7; color: #1d1d1f; --accent: #007aff; }
.theme-white .bg-pattern { background-image: radial-gradient(#d2d2d7 1px, transparent 1.5px); background-size: 30px 30px; }

.bg-pattern { position: fixed; inset: 0; z-index: -1; }

/* ОКНО В СТИЛЕ MAC */
.mac-window { width: 1000px; height: 680px; background: rgba(255,255,255,0.1); backdrop-filter: blur(50px); border-radius: 20px; border: 1px solid rgba(255,255,255,0.3); position: relative; display: flex; box-shadow: 0 50px 100px rgba(0,0,0,0.4); overflow: hidden; }

.traffic-lights { position: absolute; top: 18px; left: 18px; display: flex; gap: 8px; z-index: 1001; }
.traffic-lights span { width: 12px; height: 12px; border-radius: 50%; }
.t-red { background: #ff5f56; } .t-yellow { background: #ffbd2e; } .t-green { background: #27c93f; }

.glass { background: rgba(255, 255, 255, 0.12); backdrop-filter: blur(25px); }

/* ЭКРАНЫ */
.screen { display: none; width: 100%; height: 100%; position: relative; }
.screen.active { display: flex; }

/* АВТОРИЗАЦИЯ */
.auth-box { margin: auto; width: 360px; text-align: center; }
.mac-logo { font-size: 3.5rem; font-weight: 700; color: white; margin-bottom: 30px; text-shadow: 0 10px 20px rgba(0,0,0,0.1); }
.mac-inputs input { width: 100%; padding: 14px; margin-bottom: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); color: white; outline: none; }
.mac-btn-blue { width: 100%; padding: 14px; background: var(--accent); color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 1rem; }
.mac-btn-blue:hover { opacity: 0.9; }
.mac-toggle-link { margin-top: 20px; color: white; font-size: 0.9rem; cursor: pointer; }

/* ШТОРКА (SIDEBAR) */
.mac-drawer { position: absolute; left: -380px; top: 0; width: 340px; height: 100%; z-index: 2000; transition: 0.5s cubic-bezier(0.2, 1, 0.2, 1); padding: 60px 25px 25px; color: white; border-right: 1px solid rgba(255,255,255,0.2); }
.mac-drawer.open { left: 0; }
.mac-close-btn { background: none; border: none; color: white; font-size: 1.4rem; cursor: pointer; }
.drawer-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }

/* ТЕМЫ-КРУЖОЧКИ */
.theme-row { display: flex; gap: 15px; margin: 15px 0 25px; }
.circle-theme { width: 32px; height: 32px; border-radius: 50%; border: 2px solid white; cursor: pointer; transition: 0.2s; }
.circle-theme:hover { transform: scale(1.1); }

/* ПРОФИЛЬ В ШТОРКЕ */
.mac-ava { width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 50%; margin: 0 auto 15px; display: flex; align-items: center; justify-content: center; font-size: 2rem; }
.mac-bio-box { margin: 15px 0; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 15px; }
.mac-bio-input { background: rgba(255,255,255,0.1); border: none; padding: 8px; border-radius: 6px; color: white; width: 70%; }
.mac-bio-save { padding: 8px 12px; background: var(--accent); border: none; border-radius: 6px; color: white; cursor: pointer; }

.drawer-bottom { position: absolute; bottom: 25px; left: 25px; right: 25px; display: flex; flex-direction: column; gap: 10px; }
.mac-btn-ghost { background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2); padding: 12px; border-radius: 10px; cursor: pointer; }
.mac-btn-red { background: #ff3b30; color: white; border: none; padding: 12px; border-radius: 10px; cursor: pointer; font-weight: 700; }

/* ЧАТ ИНТЕРФЕЙС */
.mac-sidebar { width: 280px; height: 100%; border-right: 1px solid rgba(255,255,255,0.1); display: flex; flex-direction: column; }
.sidebar-top { padding: 60px 20px 20px; display: flex; flex-direction: column; gap: 15px; }
.mac-search { background: rgba(255,255,255,0.1); border: none; padding: 10px; border-radius: 8px; color: white; font-size: 0.85rem; }
.chat-item { padding: 12px 15px; margin: 2px 10px; border-radius: 10px; cursor: pointer; display: flex; gap: 12px; align-items: center; }
.chat-item.active { background: rgba(255,255,255,0.2); }

.mac-chat-area { flex: 1; display: flex; flex-direction: column; position: relative; }
.chat-header { padding: 22px 30px; border-bottom: 1px solid rgba(255,255,255,0.1); }
.chat-history { flex: 1; padding: 25px; display: flex; flex-direction: column; gap: 15px; overflow-y: auto; }
.mac-input-row { margin: 20px; padding: 10px 20px; border-radius: 15px; display: flex; gap: 15px; align-items: center; }
#msg-input { flex: 1; background: none; border: none; outline: none; color: white; font-size: 1rem; }

/* ЭМОДЗИ ШТОРКА */
.emoji-popover { position: absolute; bottom: 85px; left: 20px; width: 300px; height: 350px; display: none; flex-direction: column; border-radius: 18px; z-index: 100; padding: 12px; }
.emoji-popover.active { display: flex; }
.emoji-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; font-size: 1.6rem; padding-top: 10px; }
.emoji-grid span { cursor: pointer; text-align: center; transition: 0.2s; }
.emoji-grid span:hover { transform: scale(1.3); }

/* МОДАЛКИ ЯЗЫКА */
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 3000; display: flex; align-items: center; justify-content: center; }
.modal-window { width: 350px; padding: 30px; border-radius: 20px; color: white; text-align: center; }
.mac-scroll::-webkit-scrollbar { width: 4px; }
.mac-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
.lang-item { padding: 12px; margin: 5px 0; background: rgba(255,255,255,0.05); border-radius: 8px; cursor: pointer; }
.lang-item.active { background: var(--accent); }
