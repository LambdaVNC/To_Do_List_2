const addTask = document.querySelector(".addTask");
const addBtn = document.querySelector("#ekleBtn");
const taskList = document.querySelector(".gorev-container ul");
const task = document.querySelector(".gorev-listesi");
document.addEventListener("DOMContentLoaded", getLocalStorage());

addBtn.addEventListener("click", () => {
  if (addTask.value == "") {
    alert("Lütfen eklemek istediğin görevi yaz!");
    return;
  }
  let task = addTask.value;
  let html = `
  <div class="gorev-listesi">
  <li>
      <span>${task}</span>
      <div class="list-icons">
      <i id="list-icon" class="check fa-solid fa-square-check"></i>
      <i id="list-icon" class="delete fa-solid fa-trash-can"></i>
  </div>
  </li>
</div>
    `;
  taskList.innerHTML += html;
  saveLocalStorage(task);
  addTask.value = "";
});

taskList.addEventListener("click", (e) => {
  const tiklanan = e.target;
  if (tiklanan.classList.contains("check")) {
    if( e.target.parentElement.parentElement.classList.contains("done")){
        e.target.parentElement.parentElement.classList.remove("done");
        return
    }
    e.target.parentElement.parentElement.classList.add("done");
  } else if (tiklanan.classList.contains("delete")) {
    e.target.parentElement.parentElement.parentElement.remove();
    const deletedTask =
      e.target.parentElement.parentElement.children[0].innerText;
    deleteTaskFromLocalStorage(deletedTask);
  }
});

function saveLocalStorage(newTask) {
  let tasks;

  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getLocalStorage() {
  let tasks;

  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((element) => {
    html = `
    <div class="gorev-listesi">
    <li>
    <span>${element}</span>
        <div class="list-icons">
        <i id="list-icon" class="check fa-solid fa-square-check"></i>
        <i id="list-icon" class="delete fa-solid fa-trash-can"></i>
    </div>
    </li>
  </div>
      `;
    taskList.innerHTML += html;
  });
}

function deleteTaskFromLocalStorage(task) {
  let tasks;

  if (localStorage.getItem("tasks") == null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  //   splice ile LocalStorage'daki elemanları silmeye çalışalım

  const deletedTaskIndex = tasks.indexOf(task);
  console.log(deletedTaskIndex);
  tasks.splice(deletedTaskIndex, 1);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
