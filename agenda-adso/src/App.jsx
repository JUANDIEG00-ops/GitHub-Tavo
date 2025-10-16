// src/App.jsx

// Importamos los estilos del componente.
import './App.css'; 

// Definición del Componente Funcional App
function App() {

  // La lógica del componente va aquí.
  // Aquí es donde en la Semana 2 empezarás a usar let, const, arrow functions, etc.

  // Usamos el hook useState original de Vite como ejemplo para mostrar cómo se vería la lógica
  // Si no planeas usar el contador, puedes ELIMINAR la línea de 'useState'
  // const [count, setCount] = useState(0); 
  
  // Obtenemos la fecha actual para el footer
  const fechaActual = new Date().toLocaleDateString();

  return (
    // Reemplazamos el div por <main> y agregamos una clase para los estilos
    <main className="agenda-adso-app">
      
      {/* 1. Mensaje Personalizado */}
      <h1>Hola SENA, soy Luis David Herrera - Aprendiz ADSO</h1>

      {/* 2. Expectativas del Curso */}
      <section className="expectativas">
        <p>
          ¡Mi primer componente React ha sido configurado con éxito!
        </p>
        <p>
          En este curso de **Desarrollo Front-End con ReactJS** espero dominar 
          los fundamentos esenciales de JavaScript moderno (ES6+), aprender a construir 
          componentes funcionales robustos y, finalmente, aplicar estos conocimientos 
          para desarrollar la **Agenda ADSO** de forma profesional y eficiente.
        </p>
      </section>

      {/* 3. Footer simple para cumplir el requisito de agregar información */}
      <footer>
        <small>Proyecto Agenda ADSO | Semana 1 | Fecha: {fechaActual}</small>
      </footer>
    </main>
  );
}

// Exportamos el componente para que pueda ser renderizado en main.jsx
export default App;