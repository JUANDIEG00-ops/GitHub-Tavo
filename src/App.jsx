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

    // ✅ CLASE 10: NUEVOS ESTADOS PARA BÚSQUEDA Y ORDENAMIENTO
    const [busqueda, setBusqueda] = useState("");
    const [ordenAsc, setOrdenAsc] = useState(true); // true = A-Z (predeterminado), false = Z-A

    // Función general para mostrar el error amigable al usuario
    const mostrarErrorAmigable = (error) => {
        setError(error.message);
        console.error("Error capturado para el usuario:", error.message);
    }
    
    // 1. FUNCIÓN CARGAR CONTACTOS
    useEffect(() => {
        const cargarContactos = async () => {
            try {
                setCargando(true);
                setError("");
                
                const data = await listarContactos(); 
                setContactos(data);
            } catch (error) {
                mostrarErrorAmigable(error);
            } finally {
                setCargando(false);
            }
        };
        cargarContactos();
    }, []);

    // 2. FUNCIÓN AGREGAR CONTACTO (POST)
    const onAgregarContacto = async (nuevoContacto) => {
        try {
            setError(""); 
            setExito(""); 

            const creado = await crearContacto(nuevoContacto);

            setContactos((prev) => [...prev, creado]);
            
            setExito("✓ Contacto guardado correctamente");
            setTimeout(() => setExito(""), 3000); 

        } catch (error) {
            mostrarErrorAmigable(error);
            throw error; 
        }
    };

    // 3. FUNCIÓN ELIMINAR CONTACTO (DELETE)
    const onEliminarContacto = async (id) => {
        try {
            setError("");
            setExito(""); 

            await eliminarContactoPorId(id);

            setContactos((prev) => prev.filter((c) => c.id !== id));
            
            setExito("✓ Contacto eliminado correctamente");
            setTimeout(() => setExito(""), 3000);

        } catch (error) {
            mostrarErrorAmigable(error);
        }
    };

    /* ========================================================= */
    /* ✅ CLASE 10: LÓGICA DE FILTRADO Y ORDENAMIENTO (INMUTABLE) */
    /* ========================================================= */

    // 1. FILTRADO: Se aplica a la lista original (contactos)
    const contactosFiltrados = contactos.filter((c) => {
        // Si la búsqueda está vacía, mostramos todos los contactos
        if (busqueda.trim() === "") return true;

        const termino = busqueda.toLowerCase().trim();
        // Normalizamos campos a minúsculas
        const nombre = c.nombre.toLowerCase();
        const correo = c.correo.toLowerCase();
        const etiqueta = (c.etiqueta || "").toLowerCase();
        const telefono = c.telefono || ""; // Incluido para el Mini Reto 1

        // Retorna true si el término se encuentra en nombre, correo, etiqueta O teléfono.
        return (
            nombre.includes(termino) ||
            correo.includes(termino) ||
            etiqueta.includes(termino) ||
            telefono.includes(termino)
        );
    });

    // 2. ORDENAMIENTO: Se aplica sobre la lista filtrada
    // IMPORTANTE: Se usa [...contactosFiltrados] para copiar el array antes de sort(), 
    // garantizando la inmutabilidad.
    const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
        const nombreA = a.nombre.toLowerCase();
        const nombreB = b.nombre.toLowerCase();

        if (nombreA < nombreB) {
            return ordenAsc ? -1 : 1; // Orden A-Z: -1; Orden Z-A: 1
        }
        if (nombreA > nombreB) {
            return ordenAsc ? 1 : -1; // Orden A-Z: 1; Orden Z-A: -1
        }
        return 0; // Son iguales
    });


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

                        {/* ✅ CLASE 10: BARRA DE BÚSQUEDA Y ORDENAMIENTO (EVIDENCIA 1) */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6 p-4 border border-gray-200 bg-white rounded-xl shadow-sm">
                            {/* Input de Búsqueda Controlado */}
                            <input
                                type="text"
                                className="flex-grow w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition duration-150"
                                placeholder="Buscar por nombre, correo, teléfono o etiqueta..."
                                value={busqueda} // Valor controlado por el estado
                                onChange={(e) => setBusqueda(e.target.value)} // Función para actualizar el estado
                            />
                            {/* Botón de Ordenamiento */}
                            <button
                                type="button"
                                onClick={() => setOrdenAsc((prev) => !prev)} // Alternar la dirección del orden
                                className="shrink-0 w-full md:w-auto px-4 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition duration-150 shadow-md"
                            >
                                {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"} {/* Texto dinámico */}
                            </button>
                        </div>
                        {/* FIN: BARRA DE BÚSQUEDA Y ORDENAMIENTO */}

                        <section className="space-y-4">
                            {/* Renderizamos contactosOrdenados, que ya está filtrado y ordenado */}
                            {contactosOrdenados.length === 0 ? (
                                <p className="text-sm text-gray-500">
                                    {/* ✅ CLASE 10: Mensaje "No encontrado" (EVIDENCIA 3) */}
                                    {/* Muestra un mensaje distinto si la API está vacía, o si la búsqueda no dio resultados */}
                                    {contactos.length > 0
                                        ? "🚫 No se encontraron contactos que coincidan con la búsqueda."
                                        : "Aún no tienes contactos registrados. Agrega el primero usando el formulario superior."}
                                </p>
                            ) : (
                                // ✅ CLASE 10: Usamos contactosOrdenados.map (EVIDENCIA 2)
                                contactosOrdenados.map((c) => (
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