// document.getElementById("to-do-input-id")
//     .addEventListener("keyup", function(event) {
//     event.preventDefault();
//     if (event.keyCode === 13) 
//     {
//         // document.getElementById("myButton").click();
//         // var names = ['John', 'Jane']

//         // for (var i = 0; i < names.length; i++) {
//         //     var name = names[i];
//         //     var ul = document.getElementById("done-list");
//         //     var li = document.createElement('li');
//         //     li.appendChild(document.createTextNode(name));
//         //     ul.appendChild(li);
//         // }
//     }
// });

// function buttonCode()
// {
//   alert("Button code executed.");
// }

const todoTemplate = (id, name, completed = false) => `
<div class="card-item ${completed ? "completed" : ""}" data-id="${id}">
<div class = "card-item_text">${name}</div>
<div class = "card-actions-area">
    <button id = "change_state_btn" class = "card-item_buttom">Завершено!</button>
    <button id = "arch_btn" class = "card-item_buttom">Архивировать</button>
</div>
</div>
`;

let todoStore = [{ name: "super_test", completed: false }];
const todosListRoot = document.querySelector(".to-do-list");




const form = document.querySelector("form[name=todo]");
const todosListRoot = document.querySelector(".todos");

const deleteAction = index => event => {
  todoStore.splice(index, 1);
  renderTodos();
};
const loadAction = () => {
  const data = JSON.parse(localStorage.getItem("storage"));
  todoStore = (data && [...data]) || [];
  renderTodos();
};
const completeAction = index => event => {
  todoStore[index].completed = !todoStore[index].completed;
  todoStore[index].completed
    ? (todoStore[index].checked = true)
    : (todoStore[index].checked = false);
  renderTodos();
};
const submitAction = event => {
  event.preventDefault();
  const todoName = form.querySelector("input[name=todo-name]");
  todoStore = [...todoStore, { name: todoName.value, checked: false }];
  todoName.value = "";
  todoName.focus();
  renderTodos();
};
const saveAction = () => {
  localStorage.setItem("storage", JSON.stringify(todoStore));
};

const attachListeniers = () => {
  const todos = todosListRoot.querySelectorAll(".todo-item");

  for (let todo of todos) {
    const id = todo.getAttribute("data-id");
    todo
      .querySelector(".todo-trash")
      .addEventListener("click", deleteAction(id));
    todo
      .querySelector("input[type=checkbox]")
      .addEventListener("click", completeAction(id));
    todo
      .querySelector(".todo-text")
      .addEventListener("click", completeAction(id));
  }
  form.addEventListener("submit", submitAction);
};
const renderTodos = () => {
  const todosHtml = todoStore
    .map((todo, index) =>
      todoTemplate(index, todo.name, todo.checked, todo.completed)
    )
    .join("")
    .trim();
  todosListRoot.innerHTML = todosHtml;
  attachListeniers();
  saveAction();
};
loadAction();





















var change_state_btn = document.getElementById("change_state_btn");

change_state_btn.addEventListener("click", function() {
    alert("Blah blah...");
}, false);

change_state_btn.addEventListener('click', myFunctionReference , false);

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    // event.preventDefault();
    // Trigger the button element with a click
    // document.getElementById("done-list");

    var ul = document.getElementById("done-list");
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
  }
});
