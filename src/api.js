// src/api.js
// Archivo de servicios encargado de toda la comunicación con JSON Server.

// Importamos la URL base desde el nuevo archivo de configuración
import { API_BASE_URL } from "./config";

// Usamos la URL base importada
const API = API_BASE_URL;

// ==========================================================
// FUNCIÓN CENTRALIZADA PARA MANEJAR RESPUESTAS Y ERRORES
// ==========================================================

// Esta función se encarga de:
// 1. Verificar si la respuesta HTTP es exitosa (código 200-299).
// 2. Si no es exitosa, lanzar un error.
// 3. Capturar errores de red (ej: servidor apagado).
async function manejarRespuesta(promesaRespuesta, mensajeFalloConexion) {
    try {
        const response = await promesaRespuesta;

        // 1. Verificación del estado HTTP (ej: 404, 500, etc.)
        if (!response.ok) {
            // Si la respuesta no es 200-299, lanzamos un error para que App.jsx lo capture.
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        // Si la respuesta es exitosa, intentamos devolverla como JSON.
        // Usamos un try/catch interno para manejar el caso de respuesta vacía (DELETE)
        try {
             return await response.json();
        } catch {
            // Manejar caso de respuesta vacía (ej: DELETE devuelve 204 No Content)
            return null;
        }

    } catch (error) {
        // 2. Captura de errores de conexión/red (ej: Servidor JSON apagado)
        if (error.message.includes("Failed to fetch") || error.message.includes("NetworkError")) {
            // Si es un error de conexión, lanzamos nuestro mensaje amigable
            throw new Error(mensajeFalloConexion);
        }
        // Si es otro tipo de error (ej: el lanzado por !response.ok), lo relanzamos
        throw error;
    }
}

// ==========================================================
// 1. LISTAR TODOS LOS CONTACTOS (GET)
// ==========================================================
/** * Documentación: Obtiene la lista completa de contactos del servidor.
 * Retorna: Array de contactos.
 */
export const listarContactos = async () => {
    return manejarRespuesta(
        fetch(API),
        "No se pudo conectar al servidor de contactos. Asegúrese de que json-server esté iniciado en el puerto 3002."
    );
};

// ==========================================================
// 2. CREAR UN NUEVO CONTACTO (POST)
// ==========================================================
/**
 * Documentación: Envía un nuevo objeto de contacto al servidor.
 * Retorna: El objeto de contacto creado por el servidor (con ID).
 */
export const crearContacto = async (nuevoContacto) => {
    const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoContacto),
    };
    
    return manejarRespuesta(
        fetch(API, opciones),
        "Fallo la conexión. No se pudo guardar el contacto. Verifique su servidor."
    );
};

// ==========================================================
// 3. ELIMINAR CONTACTO POR ID (DELETE)
// ==========================================================
/**
 * Documentación: Elimina un contacto específico usando su ID.
 * Retorna: null si es exitoso.
 */
export const eliminarContactoPorId = async (id) => {
    const url = `${API}/${id}`;
    const opciones = {
        method: 'DELETE',
    };

    return manejarRespuesta(
        fetch(url, opciones),
        "Fallo la conexión. No se pudo eliminar el contacto. Verifique su servidor."
    );
};