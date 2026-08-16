// NAVEGAÇÃO ENTRE PÁGINAS
function navigateTo(pageId) {
    // Remove 'active' de todas as páginas
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    // Adiciona 'active' à página desejada
    document.getElementById(pageId).classList.add('active');
}

// SIDEBAR COLLAPSE
const collapseBtn = document.getElementById('collapse-sidebar');
const sidebar = document.getElementById('sidebar');

collapseBtn.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    const icon = collapseBtn.querySelector('i');
    if (sidebar.classList.contains('collapsed')) {
        icon.classList.replace('fa-chevron-left', 'fa-chevron-right');
    } else {
        icon.classList.replace('fa-chevron-right', 'fa-chevron-left');
    }
});

// TROCA DE TEMA
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    
    // Atualiza ícone e texto
    const icon = themeToggle.querySelector('i');
    const text = themeToggle.querySelector('.sidebar-text');
    if (newTheme === 'light') {
        icon.classList.replace('fa-moon', 'fa-sun');
        text.innerText = 'Modo Claro';
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        text.innerText = 'Modo Escuro';
    }
});

// SIMULAÇÃO DE CHAT
const chatInput = document.getElementById('chat-input');
const btnSendChat = document.getElementById('btn-send-chat');
const messagesContainer = document.getElementById('messages-container');

function addMessage(text, role) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgDiv = document.createElement('div');
    msgDiv.className = role === 'user' ? 'msg-user' : 'msg-ai';
    
    const avatarIcon = role === 'user' ? 'fa-user' : 'fa-microchip';
    const avatarClass = role === 'user' ? 'avatar-user' : 'avatar-ai';

    msgDiv.innerHTML = `
        <div class="${avatarClass}"><i class="fa-solid ${avatarIcon}"></i></div>
        <div class="msg-content">
            <p>${text}</p>
            <span class="msg-time">${time}</span>
        </div>
    `;
    
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function simulateAIResponse(userText) {
    // Mostra indicador de "digitando"
    const typingDiv = document.createElement('div');
    typingDiv.className = 'msg-ai';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="avatar-ai"><i class="fa-solid fa-microchip"></i></div>
        <div class="msg-content">
            <p><i>Digitando...</i></p>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    setTimeout(() => {
        document.getElementById('typing-indicator').remove();
        addMessage(`Você disse: "${userText}". Esta é uma resposta simulada da Nexus AI para demonstrar a interface.`, 'ai');
    }, 1500);
}

function handleChatSend() {
    const text = chatInput.value.trim();
    if (text !== "") {
        addMessage(text, 'user');
        chatInput.value = "";
        simulateAIResponse(text);
    }
}

btnSendChat.addEventListener('click', handleChatSend);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleChatSend();
    }
});

// FUNCIONALIDADES DA HOME
function sendHomeMessage() {
    const input = document.getElementById('home-input');
    const text = input.value.trim();
    if (text !== "") {
        navigateTo('page-chat');
        setTimeout(() => {
            addMessage(text, 'user');
            simulateAIResponse(text);
        }, 300);
    }
}

function suggestPrompt(text) {
    navigateTo('page-chat');
    setTimeout(() => {
        addMessage(text, 'user');
        simulateAIResponse(text);
    }, 300);
}

// SELEÇÃO DE CHAT NA SIDEBAR
function selectChat(element, title) {
    document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
    document.getElementById('chat-title-display').innerText = title;
    navigateTo('page-chat');
    
    // Limpa mensagens e coloca uma de boas vindas ao chat específico
    messagesContainer.innerHTML = '';
    addMessage(`Bem-vindo de volta à conversa: ${title}`, 'ai');
}

// CONFIGURAÇÕES - TABS
function showSettingsTab(tabId) {
    document.querySelectorAll('.settings-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.settings-nav-item').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}
