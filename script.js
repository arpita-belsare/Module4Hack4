document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.querySelector("input[type='text']");
    const addButton = document.querySelector(".button-sub");
    const resetButton = document.querySelector(".button-reset");
    const taskList = document.querySelector(".task-list");

    // Get tasks from local storage and display them on the UI
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    // Save tasks to local storage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll(".list-item span").forEach(item => {
            tasks.push(item.textContent);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        console.log("Tasks saved to local storage:", tasks);
    };

    // Add task to DOM
    const addTaskToDOM = (task) => {
        const li = document.createElement("li");
        li.classList.add("list-item");
        
        const span = document.createElement("span");
        span.textContent = task;
        li.appendChild(span);
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.classList.add("remove-button");
        li.appendChild(removeButton);

        taskList.appendChild(li);

        // Add event listener for remove button
        removeButton.addEventListener("click", () => {
            taskList.removeChild(li);
            saveTasks();
        });
    };

    // Add task
    const addTask = () => {
        const task = taskInput.value.trim();
        if (task) {
            addTaskToDOM(task);
            saveTasks();
            taskInput.value = "";
        } else {
            alert("Please enter a task");
        }
    };

    // Reset tasks
    const resetTasks = () => {
        // Remove all tasks from the DOM
        taskList.innerHTML = "";
        // Clear tasks from local storage
        localStorage.removeItem("tasks");
        alert("All tasks have been cleared");
    };

    // Event listener for add button
    addButton.addEventListener("click", addTask);

    // Event listener for reset button
    resetButton.addEventListener("click", resetTasks);

    // Load tasks when the page loads
    loadTasks();
});
