
import { useState, useEffect } from "react";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const contactosGuardados =
    JSON.parse(localStorage.getItem("contactos")) || [];
  const [contactos, setContactos] = useState(contactosGuardados);

  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  const agregarContacto = (nuevo) => {
    setContactos((prev) => [...prev, nuevo]);
  };

  const eliminarContacto = (correo) => {
    setContactos((prev) => prev.filter((c) => c.correo !== correo));
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-center text-3xl font-bold text-morado"> {/* Usando el color personalizado */}
        Agenda ADSO v4
      </h1>
      {/* Implementación del Mini Reto */}
      <div className="flex justify-center -mt-4"> 
          <p className="bg-morado text-white text-xs rounded px-2 py-1 w-fit">
              ADSO
          </p>
      </div>
      {/* Fin Mini Reto */}
      <FormularioContacto onAgregar={agregarContacto} />
      <section className="space-y-4">
        {contactos.map((c) => (
          <ContactoCard
            key={c.correo}
            {...c}
            onEliminar={eliminarContacto}
          />
        ))}
      </section>
    </main>
  );
}