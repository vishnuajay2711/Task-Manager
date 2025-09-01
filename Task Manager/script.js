const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function updateCounters() {
  const completedTasks = document.querySelectorAll(".completed").length;
  const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}

function addTask() {
  const task = inputBox.value.trim();

  if (!task) {
    alert("Please enter a task to proceed");
    return;
  }

  // Create new <li>
  const li = document.createElement("li");
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
  `;

  // Add <li> to list
  listContainer.appendChild(li);
  inputBox.value = "";

  // Select elements inside this li
  const checkBox = li.querySelector("input");
  const taskSpan = li.querySelector("label span");
  const editBtn = li.querySelector(".edit-btn");
  const deleteBtn = li.querySelector(".delete-btn");

  // Checkbox toggle
  checkBox.addEventListener("click", function () {
    li.classList.toggle("completed", checkBox.checked);
    updateCounters();
  });

  // Edit button
  editBtn.addEventListener("click", function () {
    const update = prompt("Edit your task:", taskSpan.textContent);
    if (update !== null && update.trim() !== "") {
      taskSpan.textContent = update.trim();
      li.classList.remove("completed");
      checkBox.checked = false;
      updateCounters();
    }
  });

  // Delete button
  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure of deleting this task?")) {
      li.remove();
      updateCounters();
    }
  });

  // Update counters after adding
  updateCounters();
}
