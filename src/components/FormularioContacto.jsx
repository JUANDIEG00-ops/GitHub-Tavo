
import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {
  const [form, setForm] = useState({
    nombre: "", 
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.telefono || !form.correo) return;
    onAgregar(form);
    setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
  };

  const inputCls =
    "w-full rounded-lg border border-gray-300 px-3 py-2 " +
    "focus:outline-none focus:ring-2 focus:ring-morado";
  const labelCls = "block text-sm font-medium text-gray-700";

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>Nombre *</label>
          <input
            className={inputCls}
            name="nombre"
            placeholder="Ej: Luis Herrera" 
            value={form.nombre}
            onChange={onChange}
          />
        </div>
        <div>
          <label className={labelCls}>Teléfono *</label>
          <input
            className={inputCls}
            name="telefono"
            placeholder="Ej: 3013250363"
            value={form.telefono}
            onChange={onChange}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Correo *</label>
          <input
            className={inputCls}
            name="correo"
            placeholder="Ej: luisdavidherreraarroyom@gmail.com"
            value={form.correo}
            onChange={onChange}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Etiqueta (opcional)</label>
          <input
            className={inputCls}
            name="etiqueta"
            placeholder="Ej: Jefe"
            value={form.etiqueta}
            onChange={onChange}
          />
        </div>
        <button
          className="md:col-span-2 bg-morado hover:bg-morado-oscuro text-white
          font-medium rounded-lg py-2.5 transition"
        >
          Agregar contacto
        </button>
      </div>
    </form>
  );
}