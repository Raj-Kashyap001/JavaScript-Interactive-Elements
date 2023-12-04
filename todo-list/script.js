const todoList = document.querySelector("#todo-list");
const inputEl = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add-todo");

inputEl.value = "";
let tasks = [];

loadTODO();

function addTodoList(userInput) {
  if (userInput === "") return;

  const li = document.createElement("li");
  li.className =
    "relative select-none bg-white border-2 border-dark-600 p-2 mt-2 hover:bg-cyan-50";

  const trashIcon = document.createElement("i");
  trashIcon.className =
    "fa-solid fa-trash absolute right-1 text-xl text-red-500";
  trashIcon.id = "delete-todo";

  li.textContent = userInput;
  li.appendChild(trashIcon);
  todoList.appendChild(li);

  tasks.push(userInput);
  saveTODO();
  inputEl.value = "";
}

addBtn.addEventListener("click", () => {
  const userInput = inputEl.value;
  addTodoList(userInput);
});

todoList.addEventListener("click", (e) => {
  if (e.target.id === "delete-todo") {
    e.target.parentElement.remove();

    const taskText = e.target.parentElement.textContent.trim();
    const taskIndex = tasks.indexOf(taskText);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1);
      saveTODO();
    }
  } else if (e.target.tagName === "LI") {
    e.target.classList.toggle("line-through");
  }
});

function saveTODO() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTODO() {
  const data = localStorage.getItem("tasks");
  if (data) {
    const parsedData = JSON.parse(data);
    parsedData.forEach((text) => {
      addTodoList(text);
    });
    tasks = parsedData;
  }
}
