// ===================================================
// EJERCICIO 1: Variables y Operaciones
// ===================================================
const nombre = "Carolina";
const ficha = 3223874;
const nota1 = 4.0;
const nota2 = 4.5;
const nota3 = 3.8;

const promedio = (nota1 + nota2 + nota3) / 3;
console.log(`Aprendiz: ${nombre}`);
console.log(`Ficha: ${ficha}`);
console.log(`Promedio: ${promedio.toFixed(2)}`); // toFixed(2) limita el resultado a 2 decimales
const aprobado = promedio >= 3.0;
console.log(`Estado: ${aprobado ? 'APROBADO' : 'NO APROBADO'}`);

console.log('--------------------------------------------------');

// ===================================================
// EJERCICIO 2: Funciones Avanzadas (Arrays y Objetos)
// ===================================================
const aprendices = [
{ nombre: "Ana", nota: 4.2 },
{ nombre: "Luis", nota: 2.8 },
{ nombre: "María", nota: 4.5 },
{ nombre: "Pedro", nota: 3.5 }
];

// Filtrar aprobados (uso del método .filter())
const aprobados = aprendices.filter(a => a.nota >= 3.0);
console.log("Aprobados:", aprobados.length);

// Calcular promedio general (uso del método .reduce())
const totalNotas = aprendices.reduce((sum, a) => sum + a.nota, 0);
const promedioGrupo = totalNotas / aprendices.length;
console.log("Promedio grupo:", promedioGrupo.toFixed(2));

// Generar lista de nombres (uso del método .map())
const nombres = aprendices.map(a => a.nombre);
console.log("Nombres:", nombres.join(", "));

// Creación de objetos con una función de flecha
const crearContacto = (nombre, telefono) => ({
id: Date.now(),
nombre: nombre,
telefono: telefono,
fechaCreacion: new Date().toLocaleDateString()
});

const contacto1 = crearContacto("Gustavo", "3001234567");
console.log(contacto1);

// Desestructuración de objetos
const { nombre: nombreContacto, telefono } = contacto1;
console.log(`Contacto: ${nombreContacto} - ${telefono}`);