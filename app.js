"use strict";
const tasks = [];
let currentFilter = "all";
let nextTaskId = 1;
let editingTaskId = null;

const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const message = document.querySelector("#form-message");
const emptyMessage = document.querySelector("#empty-message");
const itemsLeft = document.querySelector("#items-left");
const clearButton = document.querySelector("#clear-completed");
const filters = document.querySelectorAll(".filter-button");

function addTask(value) {
  const text = value.trim();
  if (!text) {
    message.textContent = "Please enter a task.";
    input.focus();
    return false;
  }
  tasks.push({ id: nextTaskId++, text, completed: false });
  message.textContent = "";
  renderTasks();
  return true;
}

function getVisibleTasks() {
  if (currentFilter === "active") return tasks.filter(task => !task.completed);
  if (currentFilter === "completed") return tasks.filter(task => task.completed);
  return tasks;
}

function makeTaskElement(task) {
  const li = document.createElement("li");
  li.classList.add("task-item");
  li.dataset.taskId = String(task.id);
  if (task.completed) li.classList.add("completed");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-toggle");
  checkbox.checked = task.completed;
  checkbox.setAttribute("aria-label", `Toggle ${task.text}`);

  const text = document.createElement("span");
  text.classList.add("task-text");
  text.textContent = task.text;

  const actions = document.createElement("div");
  actions.classList.add("task-actions");

  const edit = document.createElement("button");
  edit.type = "button";
  edit.classList.add("edit-button");
  edit.textContent = "Edit";

  const remove = document.createElement("button");
  remove.type = "button";
  remove.classList.add("delete-button");
  remove.textContent = "Delete";

  actions.append(edit, remove);
  li.append(checkbox, text, actions);
  return li;
}

function renderTasks() {
  list.replaceChildren();
  const visible = getVisibleTasks();
  visible.forEach(task => list.appendChild(makeTaskElement(task)));
  emptyMessage.hidden = visible.length > 0;
  emptyMessage.textContent = tasks.length === 0 ? "No tasks yet. Add your first task above!" : "No tasks match this filter.";
  const remaining = tasks.filter(task => !task.completed).length;
  itemsLeft.textContent = `${remaining} ${remaining === 1 ? "item" : "items"} left`;
}

function findTask(id) {
  return tasks.find(task => task.id === Number(id));
}

function toggleTask(id) {
  const task = findTask(id);
  if (!task) return;
  task.completed = !task.completed;
  renderTasks();
}

function deleteTask(id) {
  const index = tasks.findIndex(task => task.id === Number(id));
  if (index < 0) return;
  if (editingTaskId === Number(id)) editingTaskId = null;
  tasks.splice(index, 1);
  renderTasks();
}

function startEditing(id) {
  const task = findTask(id);
  if (!task) return;
  editingTaskId = task.id;
  renderTasks();
  const li = list.querySelector(`[data-task-id="${task.id}"]`);
  if (!li) return;
  const oldText = li.querySelector(".task-text");
  const editor = document.createElement("input");
  editor.type = "text";
  editor.maxLength = 200;
  editor.classList.add("edit-input");
  editor.value = task.text;
  editor.setAttribute("aria-label", "Edit task text");
  oldText.replaceWith(editor);
  editor.focus();
  editor.select();
}

function saveEdit(id, value) {
  const task = findTask(id);
  if (!task) return;
  const text = value.trim();
  if (!text) {
    message.textContent = "A task cannot be empty. The original text was kept.";
    editingTaskId = null;
    renderTasks();
    return;
  }
  task.text = text;
  editingTaskId = null;
  message.textContent = "";
  renderTasks();
}

function cancelEdit() {
  editingTaskId = null;
  renderTasks();
}

form.addEventListener("submit", event => {
  event.preventDefault();
  if (addTask(input.value)) {
    input.value = "";
    input.focus();
  }
});

/* One click listener on the task list: event delegation. */
list.addEventListener("click", event => {
  const li = event.target.closest(".task-item");
  if (!li || !list.contains(li) || event.target.closest(".edit-input")) return;
  const id = li.dataset.taskId;
  if (event.target.closest(".delete-button")) return deleteTask(id);
  if (event.target.closest(".edit-button")) return startEditing(id);
  if (event.target.closest(".task-toggle") || event.target.closest(".task-text")) return toggleTask(id);
});

list.addEventListener("dblclick", event => {
  const text = event.target.closest(".task-text");
  if (!text || !list.contains(text)) return;
  const li = text.closest(".task-item");
  if (li) startEditing(li.dataset.taskId);
});

list.addEventListener("keydown", event => {
  if (!event.target.matches(".edit-input")) return;
  const li = event.target.closest(".task-item");
  if (!li) return;
  if (event.key === "Enter") {
    event.preventDefault();
    saveEdit(li.dataset.taskId, event.target.value);
  } else if (event.key === "Escape") {
    event.preventDefault();
    cancelEdit();
  }
});

filters.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filters.forEach(item => {
      const active = item.dataset.filter === currentFilter;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    renderTasks();
  });
});

clearButton.addEventListener("click", () => {
  for (let i = tasks.length - 1; i >= 0; i -= 1) {
    if (tasks[i].completed) tasks.splice(i, 1);
  }
  editingTaskId = null;
  renderTasks();
});

renderTasks();
