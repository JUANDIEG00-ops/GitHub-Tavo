
// PROGRAMA: CÁLCULO DE NOTAS DE APRENDIZ SENA
// 01. Datos del Aprendiz
const NOMBRE_APRENDIZ = "Luis Herrera"; // Reemplazar con tu nombre
const NUMERO_FICHA = "3169901"; // Reemplazar con tu número de ficha

// 02. Registro de Notas
// Array con tres calificaciones
const NOTAS = [4.0, 4.5, 3.8];
const NOTA_MINIMA_APROBACION = 3.0; // Criterio de aprobación


// 03. Cálculo de Promedio
// Usamos el método .reduce() para sumar los elementos del array y luego dividimos por la cantidad de elementos.
const sumaNotas = NOTAS.reduce((acumulador, notaActual) => acumulador + notaActual, 0);
const promedioFinal = sumaNotas / NOTAS.length;

// 04. Determinación de Estado
// Usamos un operador ternario para definir el mensaje.
const estadoAprobacion = promedioFinal >= NOTA_MINIMA_APROBACION ? "APROBADO" : "NO APROBADO";


// 05. Presentación de Resultados (Salida formateada en consola)
console.log("\n==================");
console.log("SISTEMA DE NOTAS SENA");
console.log("==================");
console.log(`Aprendiz: ${NOMBRE_APRENDIZ}`);
console.log(`Ficha: ${NUMERO_FICHA}`);
// Usamos .join(', ') para mostrar el array de notas como una cadena separada por comas
console.log(`Notas: ${NOTAS.join(', ')}`); 
console.log("==================");
// Usamos .toFixed(2) para mostrar el promedio con dos decimales
console.log(`Promedio: ${promedioFinal.toFixed(2)}`); 
console.log(`Estado: ${estadoAprobacion}`);
console.log("==================\n");