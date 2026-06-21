// Slectors
const todoInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addTaskBtn");
const todoList = document.querySelector("#taskList");
const taskCountElement = document.querySelector("#taskCount");

// Vars
let todos = JSON.parse(localStorage.getItem("myTodos")) || [];
let editIndex = null;
const originalBtnText = addBtn.innerText.trim();

// Functions
function displayTodos() {
  clearTodos();
  todos.forEach((todo, index) => {
    const isEditingMode = editIndex !== null;
    const isDisabled = isEditingMode ? "disabled" : "";

    todoList.innerHTML += `<li
                class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-2 task-item"
              >
                <div class="d-flex align-items-center me-3">
                  <span class="task-text"
                    >${todo}</span
                  >
                </div>

                <div class="d-flex gap-2">
                  <button
                    class="btn btn-link text-warning-emphasis p-0 btn-action"
                    onclick="editTodos(${index})"
                    title="تعديل"
                    ${isDisabled}
                  >
                    <i class="bi bi-pencil-square"></i> تعديل
                  </button>
                  <button
                    class="btn btn-link text-danger p-0 btn-action"
                    onclick="deleteTodos(${index})"
                    title="حذف"
                    ${isDisabled}
                  >
                    <i class="bi bi-trash3"></i> حذف
                  </button>
                </div>
              </li>`;
  });

  if (taskCountElement) {
    taskCountElement.innerText = `عدد المهام : ${todos.length}`;
  }
  // دا عشان لما نعمل ريفرش المهام متتمسحش ..
  localStorage.setItem("myTodos", JSON.stringify(todos));
}

// add todos
function addTodos() {
  if (todoInput.value.trim() === "") return;

  if (editIndex !== null) {
    todos[editIndex] = todoInput.value;
    editIndex = null;
    addBtn.innerHTML = `<i class="bi bi-plus-lg"></i>`;
  } else {
    todos.push(todoInput.value);
  }
  displayTodos();
}

// clear the todo list
function clearTodos() {
  todoList.innerHTML = "";
}

// cleer the todoInput value
function clearInput() {
  todoInput.value = "";
}

// for delete just 1 todo
function deleteTodos(index) {
  if (editIndex !== null) {
    alert("برجاء إنهاء التعديل الحالي أولاً (Update) قبل حذف أي مهمة!");
    return;
  }

  todos.splice(index, 1);
  displayTodos();
}

// for delete all todos
function deleteAllTodos() {
  if (editIndex !== null) {
    alert("برجاء إنهاء التعديل الحالي أولاً (Update) قبل حذف أي مهمة!");
    return;
  }
  const confirmDelete = confirm("هل أنت متأكد من مسح جميع المهام؟");
  if (confirmDelete) {
    todos = [];
    displayTodos();
    taskCountElement.innerText = `عدد المهام : 0`;
  }
}

// For edit todo
function editTodos(index) {
  editIndex = index;
  todoInput.value = todos[index];
  todoInput.focus();
  addBtn.textContent = "Update";
  displayTodos();
}

// events
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTodos();
  clearInput();
  displayTodos();
});

displayTodos();
