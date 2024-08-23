function addTask() {
    const taskTypeElement = document.getElementById('taskType');
    const taskNameElement = document.getElementById('taskName');
    const itemsListElement = document.getElementById('itemslist');

    const taskType = taskTypeElement.options[taskTypeElement.selectedIndex].value;
    const taskName = taskNameElement.value;

    if (taskName.trim() === "") {
        alert("Por favor, escribe el nombre de la tarea.");
        return;
    }

    // Generar un ID único para la tarea
    const taskId = Date.now(); // Usa el timestamp como ID único
    const initialStatus = 1; // Estado inicial

    // Crear un nuevo div con una clase
    const taskContainer = document.createElement('div');
    taskContainer.className = 'task-container';
    taskContainer.dataset.id = taskId; // Asignar el ID al contenedor

    // Crear tres divs internos sin clase
    const taskDiv1 = document.createElement('div');
    const taskDiv2 = document.createElement('div');
    const taskDiv3 = document.createElement('div');

    // Asignar contenido a los divs internos
    taskDiv1.innerHTML = `<p>${taskName}</p>`;
    taskDiv1.className = 'TaskDisplay';
    taskDiv1.dataset.status = initialStatus; // Asignar estado inicial al div

    taskDiv2.innerHTML = '<ion-icon name="swap"></ion-icon>';
    taskDiv3.innerHTML = '<ion-icon name="trash"></ion-icon>';

    // Añadir un manejador de eventos para cambiar el estado
    taskDiv2.addEventListener('click', function() {
        const currentStatus = parseInt(taskDiv1.dataset.status);
        const newStatus = (currentStatus % 4) + 1; // Cambiar el estado y reiniciar en 1 si supera 4
        taskDiv1.dataset.status = newStatus; // Actualizar el estado en el div
        taskDiv1.textContent = `${taskName}`; // Actualizar el contenido visual

        // Actualizar el estado en localStorage
        updateTaskStatus(taskId, newStatus);
    });

    // Añadir un manejador de eventos para eliminar el contenedor
    taskDiv3.addEventListener('click', function() {
        removeTask(taskId); // Llamar a la función para eliminar la tarea
        taskContainer.remove();
    });

    // Añadir los tres divs internos al contenedor
    taskContainer.appendChild(taskDiv1);
    taskContainer.appendChild(taskDiv2);
    taskContainer.appendChild(taskDiv3);

    // Agregar el contenedor al itemslist
    itemsListElement.appendChild(taskContainer);

    // Añadir la nueva tarea
    añadirTask(taskName, initialStatus, taskId);

    // Limpiar el input de la tarea después de agregarla
    taskNameElement.value = "";
}

// Función para cargar y mostrar tareas desde localStorage
function loadTasks() {
    const itemsListElement = document.getElementById('itemslist');
    const tasks = getTasks();

    tasks.forEach(task => {
        // Crear un nuevo div con una clase
        const taskContainer = document.createElement('div');
        taskContainer.className = 'task-container';
        taskContainer.dataset.id = task.id; // Asignar el ID al contenedor

        // Crear tres divs internos sin clase
        const taskDiv1 = document.createElement('div');
        const taskDiv2 = document.createElement('div');
        const taskDiv3 = document.createElement('div');

        // Asignar contenido a los divs internos
        taskDiv1.innerHTML = `<p>${task.name}</p>`;
        taskDiv1.className = 'TaskDisplay';
        taskDiv1.dataset.status = task.status; // Asignar estado al div

        taskDiv2.innerHTML = '<ion-icon name="swap"></ion-icon>';
        taskDiv3.innerHTML = '<ion-icon name="trash"></ion-icon>';

        // Añadir un manejador de eventos para cambiar el estado
        taskDiv2.addEventListener('click', function() {
            const currentStatus = parseInt(taskDiv1.dataset.status);
            const newStatus = (currentStatus % 4) + 1; // Cambiar el estado y reiniciar en 1 si supera 4
            taskDiv1.dataset.status = newStatus; // Actualizar el estado en el div
            taskDiv1.textContent = `${task.name}`; // Actualizar el contenido visual

            // Actualizar el estado en localStorage
            updateTaskStatus(task.id, newStatus);
        });

        // Añadir un manejador de eventos para eliminar el contenedor
        taskDiv3.addEventListener('click', function() {
            removeTask(task.id); // Llamar a la función para eliminar la tarea
            taskContainer.remove();
        });

        // Añadir los tres divs internos al contenedor
        taskContainer.appendChild(taskDiv1);
        taskContainer.appendChild(taskDiv2);
        taskContainer.appendChild(taskDiv3);

        // Agregar el contenedor al itemslist
        itemsListElement.appendChild(taskContainer);
    });
}

// Llamar a loadTasks cuando la página se carga
window.addEventListener('load', function() {
    loadTasks();
});
