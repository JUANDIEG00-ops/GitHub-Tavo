
// Estado inicial: arreglo de objetos
let tareas = [
    { id: 1, texto: "Instalar React", completada: false },
    { id: 2, texto: "Aprender Hooks", completada: false },
    { id: 3, texto: "Crear Agenda ADSO", completada: false }
];

// Función para mostrar todas las tareas
const mostrarTareas = () => {
    console.log("\n=== LISTA DE TAREAS ===");
    tareas.forEach((tarea, index) => {
        // Los caracteres unicode (✓ y ☐) representan el estado
        const estado = tarea.completada ? "✓" : "☐";
        console.log(`${estado} ${index + 1}. [ID: ${tarea.id}] ${tarea.texto}`);
    });
    console.log("=======================\n");
};

// Función para agregar una tarea
const agregarTarea = (texto) => {
    const nuevaTarea = {
        id: Date.now(), // ID único basado en el tiempo
        texto: texto,
        completada: false
    };
    // Uso del operador spread (...) para crear un nuevo array (inmutabilidad)
    tareas = [...tareas, nuevaTarea]; 
    console.log(`✓ Tarea agregada: "${texto}"`);
    return nuevaTarea;
};

// Función para marcar como completada
const completarTarea = (id) => {
    // Uso de .map() para iterar y actualizar SOLO el objeto que cumple la condición (inmutabilidad)
    tareas = tareas.map(tarea =>
        tarea.id === id
            ? { ...tarea, completada: true } // Crea una copia del objeto y cambia 'completada'
            : tarea // Mantiene las otras tareas sin cambio
    );
    console.log(`✓ Tarea con ID #${id} marcada como completada`);
};

// Función para eliminar una tarea
const eliminarTarea = (id) => {
    const tareaEliminada = tareas.find(t => t.id === id);
    // Uso de .filter() para crear un nuevo array sin la tarea a eliminar (inmutabilidad)
    tareas = tareas.filter(tarea => tarea.id !== id);
    console.log(`✗ Tarea eliminada: "${tareaEliminada.texto}"`);
};

// Función para filtrar tareas pendientes
const obtenerPendientes = () => {
    return tareas.filter(tarea => !tarea.completada);
};

// Función para obtener estadísticas
const obtenerEstadisticas = () => {
    const total = tareas.length;
    const completadas = tareas.filter(t => t.completada).length;
    const pendientes = total - completadas;
    const porcentaje = total > 0 ? ((completadas / total) * 100).toFixed(1) : 0;
    
    console.log(`\n--- ESTADÍSTICAS ---`);
    console.log(`Total: ${total} | Completadas: ${completadas} | Pendientes: ${pendientes} | Progreso: ${porcentaje}%`);
    console.log(`--------------------\n`);
};


// ===================================================
// ===== DEMOSTRACIÓN GUIADA =====
// ===================================================

console.log("--- INICIO DE DEMOSTRACIÓN ---");

// 1. Mostrar estado inicial
mostrarTareas();

// 2. Agregar una nueva tarea
const nueva = agregarTarea("Revisar Taller");

// 3. Marcar una tarea inicial como completada (ej. Tarea 1)
completarTarea(1);
obtenerEstadisticas();

// 4. Mostrar el nuevo estado
mostrarTareas();

// 5. Eliminar una de las tareas
eliminarTarea(2);
obtenerEstadisticas();

// 6. Marcar la nueva tarea como completada
completarTarea(nueva.id);

// 7. Mostrar el estado final y pendientes
mostrarTareas();

const pendientes = obtenerPendientes();
console.log(`Tareas pendientes restantes (${pendientes.length}):`);
pendientes.forEach(p => console.log(`  - ${p.texto}`));
obtenerEstadisticas();

console.log("--- FIN DE DEMOSTRACIÓN ---");