
// ContactoCard.jsx
// Este componente muestra UN contacto de la agenda
// Recibe datos (props):nombre,telefono,correo,etiqueta

export default function ContactoCard({
  nombre,
  telefono,
  correo,
  etiqueta,
  onEliminar,
}) {
  return (
    <div className="card">
      <h3>{nombre}</h3>
      <p>📱 {telefono}</p>
      <p>✉️ {correo}</p>
      {etiqueta && <span className="tag">{etiqueta}</span>}
      <button className="btn-eliminar" onClick={() => onEliminar(correo)}>
        Eliminar
      </button>
    </div>
  );
}