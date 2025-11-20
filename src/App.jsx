// src/App.jsx

import { useEffect, useState } from "react";
import {
    listarContactos,
    crearContacto,
    eliminarContactoPorId,
} from "./api";

// Importamos los componentes
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

// Importamos la información de la aplicación desde el archivo de configuración
import { APP_INFO } from "./config";

// Componente principal de la aplicación
function App() {
    const [contactos, setContactos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    const [exito, setExito] = useState(""); 

    // Función general para mostrar el error amigable al usuario
    const mostrarErrorAmigable = (error) => {
        // En esta nueva versión, el servicio (api.js) ya nos lanza un mensaje útil
        // cuando hay un error de conexión o un error HTTP.
        setError(error.message);
        console.error("Error capturado para el usuario:", error.message);
    }
    
    // ------------------------------------------------------------------
    // 1. FUNCIÓN CARGAR CONTACTOS
    // ------------------------------------------------------------------
    useEffect(() => {
        const cargarContactos = async () => {
            try {
                setCargando(true);
                setError("");
                
                // api.js ya maneja la verificación de respuesta
                const data = await listarContactos(); 
                setContactos(data);
            } catch (error) {
                // El catch es ahora muy limpio
                mostrarErrorAmigable(error);
            } finally {
                setCargando(false);
            }
        };
        cargarContactos();
    }, []);

    // ------------------------------------------------------------------
    // 2. FUNCIÓN AGREGAR CONTACTO (POST)
    // ------------------------------------------------------------------
    const onAgregarContacto = async (nuevoContacto) => {
        try {
            setError(""); 
            setExito(""); 

            const creado = await crearContacto(nuevoContacto);

            setContactos((prev) => [...prev, creado]);
            
            setExito("✓ Contacto guardado correctamente");
            setTimeout(() => setExito(""), 3000); 

        } catch (error) {
            // El catch es ahora muy limpio
            mostrarErrorAmigable(error);
            throw error; 
        }
    };

    // ------------------------------------------------------------------
    // 3. FUNCIÓN ELIMINAR CONTACTO (DELETE)
    // ------------------------------------------------------------------
    const onEliminarContacto = async (id) => {
        try {
            setError("");
            setExito(""); 

            await eliminarContactoPorId(id);

            setContactos((prev) => prev.filter((c) => c.id !== id));
            
            setExito("✓ Contacto eliminado correctamente");
            setTimeout(() => setExito(""), 3000);

        } catch (error) {
            // El catch es ahora muy limpio
            mostrarErrorAmigable(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Encabezado usando APP_INFO */}
                <header className="mb-8">
                    <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
                        Desarrollo Web ReactJS
                    </p>
                    <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
                        Agenda ADSO {APP_INFO.version}
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">
                        {APP_INFO.subtitle}
                    </p>
                </header>

                {/* Mensajes de Éxito y Error */}
                {exito && (
                    <div className="mb-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3">
                        <p className="text-sm font-medium text-green-700">{exito}</p>
                    </div>
                )}

                {error && (
                    <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
                        <p className="text-sm font-medium text-red-700">{error}</p>
                    </div>
                )}

                {/* Contenido principal */}
                {cargando ? (
                    <div className="rounded-xl bg-purple-50 border border-purple-200 px-4 py-3 text-sm text-purple-700">
                        Cargando contactos desde la API...
                    </div>
                ) : (
                    <>
                        <FormularioContacto onAgregar={onAgregarContacto} />

                        <section className="space-y-4">
                            {contactos.length === 0 ? (
                                <p className="text-sm text-gray-500">
                                    Aún no tienes contactos registrados. Agrega el primero usando
                                    el formulario superior.
                                </p>
                            ) : (
                                contactos.map((c) => (
                                    <ContactoCard
                                        key={c.id} 
                                        nombre={c.nombre}
                                        telefono={c.telefono}
                                        correo={c.correo}
                                        etiqueta={c.etiqueta}
                                        onEliminar={() => onEliminarContacto(c.id)}
                                    />
                                ))
                            )}
                        </section>
                    </>
                )}
                
                <footer className="mt-8 text-xs text-gray-400">
                    <p>Desarrollo Web – ReactJS | Proyecto Agenda ADSO</p>
                    <p>{APP_INFO.developer}</p> 
                </footer>
            </div>
        </div>
    );
}

export default App;