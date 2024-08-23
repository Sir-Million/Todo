// Selecciona el input por su clase
const todoInput = document.querySelector('.todoName');

// Cargar el valor guardado al cargar la página
window.addEventListener('load', function() {
    const savedValue = localStorage.getItem('todoName');
    if (savedValue) {
        todoInput.value = savedValue;
    }
});

// Guardar el valor en localStorage cada vez que cambie
todoInput.addEventListener('input', function() {
    localStorage.setItem('todoName', todoInput.value);
});

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function añadirTask(taskName, taskStatus, taskId) {
    // Obtener las tareas almacenadas
    const storedTasks = localStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];

    // Añadir la nueva tarea
    tasks.push({ name: taskName, status: taskStatus, id: taskId });

    // Guardar las tareas actualizadas
    saveTasks(tasks);
}

function updateTaskStatus(taskId, newStatus) {
    // Obtener las tareas almacenadas
    const storedTasks = localStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];

    // Encontrar la tarea y actualizar su estado
    const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, status: newStatus };
        }
        return task;
    });

    // Guardar las tareas actualizadas
    saveTasks(updatedTasks);
}


function getTasks() {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Limpiar lista actual
    const tasks = getTasks();
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.textContent = `Tarea: ${task.name}, Estado: ${task.status}`;
        taskList.appendChild(taskItem);
    });
}

function removeTask(taskId) {
    // Obtener las tareas almacenadas
    const storedTasks = localStorage.getItem('tasks');
    const tasks = storedTasks ? JSON.parse(storedTasks) : [];

    // Filtrar las tareas para eliminar la que tiene el ID especificado
    const updatedTasks = tasks.filter(task => task.id !== taskId);

    // Guardar las tareas actualizadas
    saveTasks(updatedTasks);
}