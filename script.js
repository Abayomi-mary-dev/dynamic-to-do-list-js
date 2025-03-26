document.addEventListener("DOMContentLoaded", function ()  {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    //Call addTask when button is clicked
    addButton.addEventListener('click', addTask);

    //Call addTask when "Enter" key is pressed
    taskInput.addEventListener('keypress',function(event){
        if (event.key === 'Enter'){
            addTask();
        }
    });

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        storedTasks.forEach(taskText => addTask(taskText, false));
    }
    function addTask() {
        // Select input field and retrieve the trimmed value
        const taskInput = document.getElementById('task-input');
        const taskList = document.getElementById('task-list');
        //Retrieve and trim input value
        const taskText = taskInput.value.trim();
    
        // Check if the taskText is empty
        if (taskText === "") {
            alert("Please enter a task before adding.");
            return;
        }
        // create list item (li)
        const taskItem =
        document.createElement('li');
        taskItem.textContent = taskText;

        //Create remove button
        const removeBtn =
        document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';
        // set up remove functionality
        removeBtn.onclick = function() {
            taskList.removeChild(taskitem);
        };
        //Append button to list item 
        taskItem.appendChild(removeBtn);

        //Append list item to task list
        taskList.appendChild(taskItem);

        // clear input field after adding task
        taskInput.value = "";
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
