// =================================================================
// DATOS INICIALES
// =================================================================

// Datos para el Ejercicio 1: Gestión de aprendices
const aprendices = [
    { id: 1, nombre: "Ana", ficha: 3223874, nota: 4.2 },
    { id: 2, nombre: "Luis", ficha: 3223874, nota: 3.5 },
    { id: 3, nombre: "María", ficha: 3223875, nota: 4.8 }
];

// Datos para el Ejercicio 2: Filtros y transformaciones
const productos = [
    { nombre: "Laptop", precio: 1200000, stock: 5 },
    { nombre: "Mouse", precio: 35000, stock: 0 },
    { nombre: "Teclado", precio: 85000, stock: 12 }
];

// Datos para el Ejercicio 3: Manipulación de contactos
let contactos = [];


// =================================================================
// EJERCICIO 1: GESTIÓN DE APRENDICES
// =================================================================

/**
 * 1. Filtra y retorna un array con aprendices cuya nota es 3.0 o mayor.
 * @param {Array<Object>} arr - Arreglo de aprendices.
 * @returns {Array<Object>} Arreglo de aprendices aprobados.
 */
const obtenerAprobados = (arr) => {
    // Uso de .filter() para crear un nuevo array basado en una condición.
    return arr.filter(aprendiz => aprendiz.nota >= 3.0);
};

/**
 * 2. Calcula y retorna el promedio de todas las notas del grupo.
 * @param {Array<Object>} arr - Arreglo de aprendices.
 * @returns {number} Promedio de notas.
 */
const calcularPromedio = (arr) => {
    // 1. Uso de .reduce() para sumar todas las notas.
    const totalNotas = arr.reduce((suma, aprendiz) => suma + aprendiz.nota, 0);
    // 2. Cálculo del promedio.
    return totalNotas / arr.length;
};

/**
 * 3. Busca y retorna el primer aprendiz cuyo nombre coincide con el término de búsqueda.
 * @param {Array<Object>} arr - Arreglo de aprendices.
 * @param {string} nombre - Nombre a buscar.
 * @returns {Object|undefined} Aprendiz encontrado o undefined.
 */
const buscarPorNombre = (arr, nombre) => {
    // Uso de .find() para retornar el primer elemento que cumple la condición.
    // Usamos toLowerCase() para una búsqueda insensible a mayúsculas/minúsculas.
    return arr.find(aprendiz => aprendiz.nombre.toLowerCase() === nombre.toLowerCase());
};

/**
 * 4. Retorna un nuevo array que contiene solo los nombres de los aprendices.
 * @param {Array<Object>} arr - Arreglo de aprendices.
 * @returns {Array<string>} Arreglo con solo los nombres.
 */
const obtenerNombres = (arr) => {
    // Uso de .map() para transformar cada objeto en solo el valor de la propiedad 'nombre'.
    return arr.map(aprendiz => aprendiz.nombre);
};


// =================================================================
// EJERCICIO 2: FILTROS Y TRANSFORMACIONES (PRODUCTOS)
// =================================================================

/**
 * 1. Retorna productos con stock mayor a cero.
 * @param {Array<Object>} arr - Arreglo de productos.
 * @returns {Array<Object>} Productos disponibles.
 */
const obtenerDisponibles = (arr) => {
    return arr.filter(producto => producto.stock > 0);
};

/**
 * 2. Calcula el valor total de todo el inventario (precio * stock).
 * @param {Array<Object>} arr - Arreglo de productos.
 * @returns {number} Valor total del inventario.
 */
const calcularInventario = (arr) => {
    // Uso de .reduce() para sumar el valor de cada producto (precio * stock).
    return arr.reduce((total, producto) => total + (producto.precio * producto.stock), 0);
};

/**
 * 3. Aplica un descuento y retorna un nuevo array con los precios actualizados.
 * @param {Array<Object>} arr - Arreglo de productos.
 * @param {number} porcentaje - Porcentaje de descuento (ej: 0.1 para 10%).
 * @returns {Array<Object>} Array con productos y precios reducidos.
 */
const aplicarDescuento = (arr, porcentaje) => {
    // Uso de .map() para crear un nuevo array, transformando el precio de cada producto.
    return arr.map(producto => ({
        // Uso de Spread Operator (...) para copiar todas las propiedades.
        ...producto,
        // Calculamos el nuevo precio.
        precio: Math.round(producto.precio * (1 - porcentaje))
    }));
};

/**
 * 4. Retorna un nuevo array ordenado por precio de menor a mayor.
 * @param {Array<Object>} arr - Arreglo de productos.
 * @returns {Array<Object>} Array ordenado.
 */
const ordenarPorPrecio = (arr) => {
    // Uso de .slice() para crear una copia del array antes de ordenar, garantizando inmutabilidad.
    return arr.slice().sort((a, b) => a.precio - b.precio);
};


// =================================================================
// EJERCICIO 3: MANIPULACIÓN DE CONTACTOS (AGENDA ADSO)
// =================================================================

/**
 * 1. Agrega un nuevo contacto al array global 'contactos'.
 * @param {string} nombre - Nombre del contacto.
 * @param {string} tel - Teléfono.
 * @param {string} correo - Correo electrónico.
 * @returns {Object} El nuevo contacto creado.
 */
const agregarContacto = (nombre, tel, correo) => {
    const nuevoContacto = {
        id: Date.now(), // ID único
        nombre, // Shorthand de propiedad (nombre: nombre)
        telefono: tel,
        correo
    };
    // Actualiza el array 'contactos' usando Spread Operator para inmutabilidad.
    contactos = [...contactos, nuevoContacto];
    return nuevoContacto;
};

/**
 * 2. Elimina un contacto del array global 'contactos' por ID.
 * @param {number} id - ID del contacto a eliminar.
 */
const eliminarContacto = (id) => {
    // Uso de .filter() para crear un nuevo array sin el contacto con ese ID.
    contactos = contactos.filter(contacto => contacto.id !== id);
};

/**
 * 3. Busca contactos cuyo nombre o correo contenga el término.
 * @param {string} termino - Término de búsqueda.
 * @returns {Array<Object>} Contactos que coinciden.
 */
const buscarContacto = (termino) => {
    const term = termino.toLowerCase();
    return contactos.filter(contacto => 
        contacto.nombre.toLowerCase().includes(term) ||
        contacto.correo.toLowerCase().includes(term)
    );
};

/**
 * 4. Modifica un contacto existente por ID.
 * @param {number} id - ID del contacto a actualizar.
 * @param {Object} datos - Objeto con los datos a modificar (ej: { telefono: "Nuevo Tel" }).
 */
const actualizarContacto = (id, datos) => {
    // Uso de .map() para buscar y actualizar el contacto por ID.
    contactos = contactos.map(contacto => 
        contacto.id === id
            ? { ...contacto, ...datos } // Combina el contacto viejo con los nuevos datos.
            : contacto
    );
};

/**
 * 5. Convierte el array de contactos a un string JSON.
 * @param {Array<Object>} arr - Arreglo de contactos.
 * @returns {string} String JSON.
 */
const exportarJSON = (arr) => {
    // JSON.stringify() convierte un objeto JavaScript en una cadena JSON.
    return JSON.stringify(arr, null, 2); // El '2' es para indentación (formato legible).
};


// =================================================================
// PRUEBAS DE CONSOLA (Para el Paso 3)
// =================================================================

console.log("--- EJERCICIO 1: GESTIÓN DE APRENDICES ---");
console.log("1. Aprobados:", obtenerAprobados(aprendices));
console.log("2. Promedio:", calcularPromedio(aprendices).toFixed(2));
console.log("3. Búsqueda 'María':", buscarPorNombre(aprendices, "María"));
console.log("4. Solo Nombres:", obtenerNombres(aprendices));

console.log("\n--- EJERCICIO 2: FILTROS Y TRANSFORMACIONES ---");
console.log("1. Disponibles:", obtenerDisponibles(productos));
console.log("2. Inventario Total:", calcularInventario(productos));
const productosConDescuento = aplicarDescuento(productos, 0.15);
console.log("3. Precios con 15% Descuento:", productosConDescuento);
console.log("4. Ordenados por Precio:", ordenarPorPrecio(productos));

console.log("\n--- EJERCICIO 3: MANIPULACIÓN DE CONTACTOS (DEMO) ---");
const c1 = agregarContacto("Andrea Pérez", "3112223344", "andrea@sena.edu.co");
const c2 = agregarContacto("Javier Soto", "3005556677", "javiersoto@mail.com");
console.log(`Contactos después de agregar: ${contactos.length}`);
eliminarContacto(c2.id);
console.log(`Contactos después de eliminar: ${contactos.length}`);
actualizarContacto(c1.id, { telefono: "3110000000", correo: "andrea.actualizada@sena.edu.co" });
console.log("Contacto actualizado:", contactos[0]);
console.log("Búsqueda 'sena':", buscarContacto("sena"));
console.log("\n--- EXPORTAR JSON ---");
console.log(exportarJSON(contactos));