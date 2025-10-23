// State 
let currentUser = null;
let todos = [];

// Elements 
const loginView = document.getElementById('login-view');
const todoView = document.getElementById('todo-view');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('login-btn');
const loginError = document.getElementById('login-error');
const userLabel = document.getElementById('user-label');
const logoutBtn = document.getElementById('logout-btn');
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Helpers 
function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '{}');
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function loadTodos() {
  const users = getUsers();
  todos = users[currentUser].todos || [];
  renderTodos();
}

function saveTodos() {
  const users = getUsers();
  users[currentUser].todos = todos;
  saveUsers(users);
}

// Auth Flow 
loginBtn.addEventListener('click', () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  loginError.textContent = '';

  if (!email || !password) {
    loginError.textContent = 'Please fill both fields.';
    return;
  }

  const users = getUsers();

  if (!users[email]) {
    // register new user
    users[email] = { password, todos: [] };
    saveUsers(users);
  } else if (users[email].password !== password) {
    loginError.textContent = 'Invalid credentials.';
    return;
  }

  currentUser = email;
  localStorage.setItem('currentUser', email);
  switchToTodoView(); // redirect user to todo page
});

function switchToTodoView() {
  loginView.classList.add('hidden');
  todoView.classList.remove('hidden');
  userLabel.textContent = `Logged in as: ${currentUser}`;
  loadTodos();
}

function switchToLoginView() {
  todoView.classList.add('hidden');
  loginView.classList.remove('hidden');
  emailInput.value = '';
  passwordInput.value = '';
}

// CRUD Logic 

// CREATE
addBtn.addEventListener('click', () => {
  const text = todoInput.value.trim();
  if (!text) return;

  todos.push({ text, done: false });
  todoInput.value = '';
  saveTodos();
  renderTodos();
});

// READ, UPDATE, DELETE
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.done ? 'completed' : '';

    // Editable text or input
    const span = document.createElement('span');
    span.textContent = todo.text;

    // Mark as complete/incomplete
    span.addEventListener('click', () => {
      todos[index].done = !todos[index].done;
      saveTodos();
      renderTodos();
    });

    // Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.addEventListener('click', () => editTodo(index));

    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    li.append(span, editBtn, delBtn);
    todoList.appendChild(li);
  });
}

// UPDATE
function editTodo(index) {
  const li = todoList.children[index];
  const todo = todos[index];

  // Replace text span with input
  li.innerHTML = '';
  const input = document.createElement('input');
  input.type = 'text';
  input.value = todo.text;
  input.className = 'edit-input';

  const saveBtn = document.createElement('button');
  saveBtn.textContent = '💾';
  saveBtn.addEventListener('click', () => {
    const newText = input.value.trim();
    if (newText) {
      todos[index].text = newText;
      saveTodos();
      renderTodos();
    }
  });

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = '↩️';
  cancelBtn.addEventListener('click', renderTodos);

  li.append(input, saveBtn, cancelBtn);
}

// Logout 
logoutBtn.addEventListener('click', () => {
  currentUser = null;
  localStorage.removeItem('currentUser');
  switchToLoginView();
});

// Init 
(function init() {
  const savedUser = localStorage.getItem('currentUser');
  const users = getUsers();
  if (savedUser && users[savedUser]) {
    currentUser = savedUser;
    switchToTodoView(); // auto redirect if already logged in
  } else {
    switchToLoginView();
  }
})();
