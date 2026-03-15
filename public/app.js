const socket = io();

// === CHAT SOCKET.IO ===
socket.on('chatMessage', (payload) => {
    const div = document.createElement('div');
    div.className = `message ${payload.from === 'user' ? 'sent' : 'received'}`;
    div.innerHTML = `<div class="message-bubble">${payload.text}</div>`;
    document.getElementById('chat-messages').appendChild(div);
    document.getElementById('chat-messages').scrollTop = 9999;
});

document.getElementById('send-chat').addEventListener('click', () => {
    const msg = document.getElementById('chat-input').value.trim();
    if (!msg) return;
    socket.emit('chatMessage', msg);
    document.getElementById('chat-input').value = '';
});

document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('send-chat').click();
});
