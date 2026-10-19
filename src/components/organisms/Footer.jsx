import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer>
      <p>Clínica Nutricional NutriVida — Temuco, Región de La Araucanía.</p>

      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/login">Iniciar Sesión</Link>
        <Link to="/registro">Registrarse</Link>
      </nav>

      <p>&copy; 2026 NutriVida. Todos los derechos reservados.</p>
    </footer>
  )
}

export default Footer
