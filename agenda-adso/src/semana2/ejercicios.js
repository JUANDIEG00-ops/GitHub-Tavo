/*
  ===================================================================
  04 DOCUMENTAR CÓDIGO: EJERCICIOS JAVASCRIPT MODERNO (ES6+) - SEMANA 2
  Objetivo: Demostrar el uso de Arrow Functions, Destructuring, Spread
  Operator y métodos de Arreglos (map, filter, reduce) en Node.js.
  ===================================================================
*/

// =============================================================
// EJERCICIO 1: Variables Modernas y Arrow Function
// =============================================================

// Uso de 'const' para valores que no cambian (buena práctica ES6+).
const nombreAprendiz = "Luis Sánchez";
const ficha = 3223874;

// Arrow function (ES6+) para calcular el promedio con retorno implícito.
const calcularPromedio = (n1, n2, n3) => (n1 + n2 + n3) / 3;

const nota1 = 4.0;
const nota2 = 4.5;
const nota3 = 3.8;

const promedio = calcularPromedio(nota1, nota2, nota3);
// Uso de Operador Ternario para determinar el estado
const estado = promedio >= 3.0 ? 'APROBADO' : 'NO APROBADO';

console.log("--- Prueba Ejercicio 1: Promedio ---");
// Uso de Template Literals (acento grave) para mostrar variables.
console.log(`Aprendiz: ${nombreAprendiz}`);
console.log(`Ficha: ${ficha}`);
console.log(`Promedio Final: ${promedio.toFixed(2)}`);
console.log(`Estado: ${estado}`);
console.log("-----------------------------------\n");


// =============================================================
// EJERCICIO 2: Arreglos y Métodos (map, filter, reduce)
// =============================================================

const aprendices = [
  { nombre: "Ana", nota: 4.2 },
  { nombre: "Luis", nota: 2.8 },
  { nombre: "María", nota: 4.5 },
  { nombre: "Pedro", nota: 3.5 }
];

console.log("--- Prueba Ejercicio 2: Métodos de Arreglo ---");

// 1. filter(): Crea un nuevo arreglo con los que cumplen la condición.
const aprobados = aprendices.filter(a => a.nota >= 3.0);
console.log("Total Aprobados:", aprobados.length);

// 2. map(): Transforma cada objeto a un string para listar solo los nombres.
const nombres = aprendices.map(a => a.nombre);
console.log("Lista de Nombres:", nombres.join(", "));

// 3. reduce(): Acumula valores para obtener un total (sumatoria de notas).
const totalNotas = aprendices.reduce((acumulador, aprendiz) => {
  return acumulador + aprendiz.nota;
}, 0); 
const promedioGrupo = totalNotas / aprendices.length;
console.log(`Promedio Grupo: ${promedioGrupo.toFixed(2)}`);
console.log("-------------------------------------------\n");


// =============================================================
// EJERCICIO 3: Spread Operator y Destructuring
// =============================================================

// Arrow function para crear un objeto Tarea
const crearTarea = (texto) => ({
    id: Date.now(),
    texto: texto,
    completada: false
});

let listaTareas = [
    crearTarea("Instalar React"),
    crearTarea("Aprender ES6+")
];

// Uso del Spread Operator (...) para añadir un elemento sin mutar el array original.
const nuevaTarea = crearTarea("Crear Componentes");
listaTareas = [...listaTareas, nuevaTarea]; 

console.log("--- Prueba Ejercicio 3: Spread y Destructuring ---");
console.log("Lista con Spread Operator:", listaTareas);

// Destructuring de Array: Extrae elementos por posición
const [primeraTarea, segundaTarea] = listaTareas;
console.log(`\nPrimera Tarea (Destructuring): ${primeraTarea.texto}`);
console.log(`Segunda Tarea (Destructuring): ${segundaTarea.texto}`);

// Destructuring de Objeto: Extrae propiedades específicas de un objeto
const { texto, completada } = listaTareas[2]; 
console.log(`Tercera Tarea Desestructurada: ${texto} (Completada: ${completada})`);
console.log("---------------------------------------------------\n");