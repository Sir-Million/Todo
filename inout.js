const exportButton = document.getElementById('exportButton');

exportButton.addEventListener('click', function() {
    const tasks = localStorage.getItem('tasks'); // Leer las tareas de LocalStorage
    const todoName = localStorage.getItem('todoName'); // Leer el nombre de la lista de LocalStorage

    const data = {
        todoName: todoName ? todoName : 'Sin nombre', // Asegurarse de que haya un nombre
        tasks: tasks ? JSON.parse(tasks) : [] // Convertir las tareas en un array
    };

    const dataStr = JSON.stringify(data, null, 2); // Formatear datos para JSON
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Generar nombre del archivo con fecha
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
    const fileName = `ToDo!_${formattedDate}.json`;

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName; // Usar el nombre con fecha de creación
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

const importButton = document.getElementById('importButton');
const importInput = document.getElementById('importInput');

importButton.addEventListener('click', function() {
    importInput.click(); // Abrir el selector de archivos
});



importInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            try {
                const parsedData = JSON.parse(content); // Parsear el contenido JSON
                
                // Guardar nombre de la lista y tareas en LocalStorage
                if (parsedData.todoName) {
                    localStorage.setItem('todoName', parsedData.todoName);
                }
                if (parsedData.tasks) {
                    localStorage.setItem('tasks', JSON.stringify(parsedData.tasks));
                }

                alert('Datos importados correctamente.');
                location.reload(); // Recargar la página para reflejar los datos importados
            } catch (err) {
                alert('Error al leer el archivo. Asegúrate de que sea un archivo JSON válido.');
            }
        };
        reader.readAsText(file);
    }
});



// Selecciona el botón de borrar por su ID
const clearButton = document.getElementById('clearButton');

// Añadir evento de clic al botón de borrar
clearButton.addEventListener('click', function() {
    // Mostrar un popup de confirmación
    const confirmation = confirm('¿Estás seguro de que quieres borrar todos los datos?');

    if (confirmation) {
        // Borrar los datos de LocalStorage
        localStorage.clear();
        alert('Todos los datos han sido borrados.');
        location.reload(); // Recargar la página para reflejar los cambios
    }
});