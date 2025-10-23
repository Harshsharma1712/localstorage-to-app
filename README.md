
# LocalStorage To-Do App

A simple **front-end-only To-Do application** built using **pure HTML, CSS, and JavaScript**.
It supports **user login**, **per-user to-do lists**, and **persistent data** using the browser’s **localStorage** — no backend or frameworks required.

---

## Features

**Login / Register system** – Users can sign up or log in using email & password
**Per-user todo lists** – Each user’s tasks are isolated
**Persistent data** – Stored in localStorage, survives page reloads
**Full CRUD** – Create, Read, Update, Delete todos
**Auto redirect** – Keeps user logged in on page refresh
**Logout** – Clears session safely
**Responsive and minimal design**

---

## Folder Structure

```
/todo-app
  ├── index.html       # Main UI
  ├── style.css        # Styling
  └── app.js           # Logic and interactivity
```

---

## How It Works

### 1. Login / Register

* Enter your email and password.
* If your account doesn’t exist, it’s automatically created and stored in localStorage.
* On success, the app redirects you to your personal To-Do dashboard.

### 2. Manage To-Dos

* Add tasks using the input box.
* Click a task to mark it as complete/incomplete.
* Click ✏️ to edit a task.
* Click ❌ to delete a task.
* All updates are instantly saved to localStorage.

### 3. Persistence

* The app saves:

  ```js
  {
    [email]: { password: "userpass", todos: [ { text, done } ] }
  }
  ```
* It automatically restores your login and todos after refreshing the page.

### 4. Logout

* Click **Logout** to return to the login screen.
* Session clears, but user data stays in localStorage.

---

## How to Run

1. **Download or clone this repository**

   ```bash
   git clone https://github.com/<your-username>/localstorage-todo.git
   ```

2. **Open the folder**

   ```bash
   cd localstorage-todo
   ```

3. **Run the app**

   * Just open `index.html` in any browser (Chrome, Edge, Firefox, etc.)
   * No server or dependencies needed.

---

## Built With

* **HTML5** – Structure
* **CSS3** – Styling
* **JavaScript (ES6)** – Logic, DOM, localStorage

No external libraries or frameworks — demonstrating pure front-end fundamentals.

---