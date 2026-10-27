/* ==========================================================
   planner.js — Academic Planner (interactive task manager)
   Demonstrates: arrays, functions, event handling,
   DOM manipulation and dynamic content updates.
   ========================================================== */

const STORAGE_KEY = "ayomide-planner-tasks";

// All tasks are kept in this array of objects
let tasks = loadTasks();
let currentFilter = "all";

const form = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const courseInput = document.getElementById("task-course");
const dateInput = document.getElementById("task-date");
const priorityInput = document.getElementById("task-priority");
const formError = document.getElementById("task-error");
const list = document.getElementById("task-list");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const filterSelect = document.getElementById("task-filter");
const clearBtn = document.getElementById("clear-done");

/* ---------- Load / save (keeps tasks after refresh) ---------- */
function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) { /* storage unavailable: fall back to sample tasks */ }

  return [
    { id: 1, title: "Submit COS 102 lab assessment", course: "COS 102", date: "", priority: "high", done: true },
    { id: 2, title: "Revise HTML forms and tables", course: "COS 106", date: "", priority: "medium", done: false },
    { id: 3, title: "Read chapter on network security basics", course: "CYB 101", date: "", priority: "low", done: false }
  ];
}

function saveTasks() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); } catch (e) { /* ignore */ }
}

/* ---------- Add a task ---------- */
function addTask(title, course, date, priority) {
  const task = {
    id: Date.now(),
    title: title,
    course: course,
    date: date,
    priority: priority,
    done: false
  };
  tasks.unshift(task);
  saveTasks();
  renderTasks();
}

/* ---------- Mark a task as completed / not completed ---------- */
function toggleTask(id) {
  tasks = tasks.map(function (task) {
    if (task.id === id) task.done = !task.done;
    return task;
  });
  saveTasks();
  renderTasks();
}

/* ---------- Delete a task ---------- */
function deleteTask(id) {
  tasks = tasks.filter(function (task) { return task.id !== id; });
  saveTasks();
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(function (task) { return !task.done; });
  saveTasks();
  renderTasks();
}

function formatDate(value) {
  if (!value) return "No due date";
  const d = new Date(value + "T00:00:00");
  return "Due " + d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

/* ---------- Build the list in the DOM ---------- */
function renderTasks() {
  list.innerHTML = "";

  const visible = tasks.filter(function (task) {
    if (currentFilter === "active") return !task.done;
    if (currentFilter === "completed") return task.done;
    return true;
  });

  if (visible.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = tasks.length === 0
      ? "No tasks yet. Add your first task using the form."
      : "No tasks match this filter.";
    list.appendChild(empty);
  }

  visible.forEach(function (task) {
    const li = document.createElement("li");
    li.className = "task priority-" + task.priority + (task.done ? " done" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Mark " + task.title + " as completed");
    checkbox.addEventListener("change", function () { toggleTask(task.id); });

    const info = document.createElement("div");
    info.className = "task-info";

    const title = document.createElement("div");
    title.className = "task-title";
    title.textContent = task.title;

    const meta = document.createElement("div");
    meta.className = "task-meta";
    meta.textContent = (task.course || "General") + " · " + formatDate(task.date) +
      " · " + task.priority.charAt(0).toUpperCase() + task.priority.slice(1) + " priority";

    info.appendChild(title);
    info.appendChild(meta);

    const del = document.createElement("button");
    del.className = "delete-btn";
    del.type = "button";
    del.textContent = "🗑";
    del.setAttribute("aria-label", "Delete " + task.title);
    del.addEventListener("click", function () { deleteTask(task.id); });

    li.appendChild(checkbox);
    li.appendChild(info);
    li.appendChild(del);
    list.appendChild(li);
  });

  updateProgress();
}

/* ---------- Progress summary ---------- */
function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(function (t) { return t.done; }).length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  progressBar.style.width = percent + "%";
  progressText.innerHTML = "<span>" + completed + " of " + total + " tasks completed</span><span>" + percent + "%</span>";
}

/* ---------- Event listeners ---------- */
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const title = titleInput.value.trim();

  if (title === "") {
    formError.textContent = "Please enter a task title.";
    titleInput.classList.add("invalid");
    titleInput.focus();
    return;
  }

  formError.textContent = "";
  titleInput.classList.remove("invalid");
  addTask(title, courseInput.value.trim(), dateInput.value, priorityInput.value);
  form.reset();
  titleInput.focus();
});

filterSelect.addEventListener("change", function () {
  currentFilter = filterSelect.value;
  renderTasks();
});

clearBtn.addEventListener("click", clearCompleted);

renderTasks();
