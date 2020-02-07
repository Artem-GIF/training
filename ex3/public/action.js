const form = document.querySelector("form[name=todo]");
const toDoTasksListRoot = document.querySelector(".todos");
const doneTasksListRoot = document.querySelector(".todos-done");
const archivedTasksListRoot = document.querySelector(".todos-archived");

function deleteAction(array, index) {
  array.splice(index, 1);
  renderTodos();
}

const loadAction = () => {
  var data = JSON.parse(localStorage.getItem("storage_todo"));
  toDoTasks = (data && [...data]) || [];

  data = JSON.parse(localStorage.getItem("storage_done"));
  doneTasks = (data && [...data]) || [];

  data = JSON.parse(localStorage.getItem("storage_archived"));
  archivedTasks = (data && [...data]) || [];

  renderTodos();
};

const submitAction = event => {
  event.preventDefault();
  const todoName = form.querySelector("input[name=todo-name]");
  if (todoName.value)
  {
    toDoTasks = [...toDoTasks, { name: todoName.value}];
    todoName.value = "";
    todoName.focus();
    renderTodos();
  }
};

function moveAction(array_src, array_dst, index) {
  event.preventDefault();
  var t = array_src[index];
  array_dst.push(t);
  array_src.splice(index, 1);
  renderTodos();
}

const saveAction = () => {
  localStorage.setItem("storage_todo", JSON.stringify(toDoTasks));
  localStorage.setItem("storage_done", JSON.stringify(doneTasks));
  localStorage.setItem("storage_archived", JSON.stringify(archivedTasks));
};

const attachListeniers = () => {
  const todos = toDoTasksListRoot.querySelectorAll(".todo-item");
  const todosDone = doneTasksListRoot.querySelectorAll(".todo-item");
  const todosArchived = archivedTasksListRoot.querySelectorAll(".todo-item");

  for (let todo of todos) {
    const id = todo.getAttribute("data-id");
    todo.querySelector(".action").textContent = "Завершить";
    todo
      .querySelector(".action")
      .addEventListener("click", () => {moveAction(toDoTasks, doneTasks, id)});
  }

  for (let todo of todosDone) {
    const id = todo.getAttribute("data-id");
    todo.querySelector(".action").textContent = "Архивировать";
    todo
      .querySelector(".action")
      .addEventListener("click", () => {moveAction(doneTasks, archivedTasks, id)});
  }

  for (let todo of todosArchived) {
    const id = todo.getAttribute("data-id");
    todo.querySelector(".action").textContent = "Удалить";
    todo.querySelector(".action").style.background="red";
    todo
      .querySelector(".action")
      .addEventListener("click", () => {deleteAction(archivedTasks, id)});
  }

  form.addEventListener("submit", submitAction);
};
const renderTodos = () => {
  const todosHtml = toDoTasks
    .map((todo, index) =>
      todoTemplate(index, todo.name)
    )
    .join("")
    .trim();
  toDoTasksListRoot.innerHTML = todosHtml;

  const todosDoneHtml = doneTasks
  .map((todo, index) =>
    todoTemplate(index, todo.name)
  )
  .join("")
  .trim();
  doneTasksListRoot.innerHTML = todosDoneHtml;

  const todosArchivedHtml = archivedTasks
  .map((todo, index) =>
    todoTemplate(index, todo.name)
  )
  .join("")
  .trim();
  archivedTasksListRoot.innerHTML = todosArchivedHtml;

  attachListeniers();
  saveAction();
};
loadAction();
