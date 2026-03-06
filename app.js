// Données tâches (mock, remplacez par fetch API vers Node/Express/MongoDB)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Fonctions CRUD Tâches
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const card = document.createElement('div');
        card.className = `card task-card ${task.completed ? 'completed' : ''}`;
        card.innerHTML = `
            <div class="card-body d-flex justify-content-between align-items-center">
                <div class="flex-grow-1">
                    <h6 class="task-title mb-0" ondblclick="editTask(${index})">${task.title}</h6>
                </div>
                <div>
                    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                    <button class="btn btn-sm btn-danger ms-1" onclick="deleteTask(${index})">Supprimer</button>
                </div>
            </div>
        `;
        taskList.appendChild(card);
    });
}

function addTask() {
    const title = document.getElementById('task-title').value.trim();
    if (title) {
        tasks.push({ title, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        document.getElementById('task-title').value = '';
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function editTask(index) {
    const newTitle = prompt('Nouveau titre:', tasks[index].title);
    if (newTitle) {
        tasks[index].title = newTitle;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
}

// Chat basique (mock, remplacez par WebSocket/SSE)
function renderChat() {
    // Mock messages, remplacez par fetch
    const messages = ['Salut !', 'Comment ça va ?', 'Bien et toi ?'];
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = messages.map(msg => `
        <div class="message sent">
            <div class="message-bubble">${msg}</div>
        </div>
    `).join('');
}

// Événements
document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('send-chat').addEventListener('click', () => {
    const input = document.getElementById('chat-input');
    if (input.value.trim()) {
        // Ajoutez à messages et fetch vers backend
        input.value = '';
    }
});

// Init
renderTasks();
renderChat();
