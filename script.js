document.addEventListener("DOMContentLoaded", () => {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    function addTask(taskText, save = true) {
        if (!taskText.trim()) {
            alert("Please enter a valid task.");
            return;
        }

        const li = document.createElement("li");
        li.textContent = taskText;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        removeBtn.addEventListener("click", () => {
            li.remove();
            removeFromStorage(taskText);
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            saveToStorage(taskText);
        }

        taskInput.value = "";
    }

    function saveToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        storedTasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    function removeFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    addButton.addEventListener("click", () => addTask(taskInput.value));

    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask(taskInput.value);
        }
    });

    loadTasks();
});
