import { Link } from 'react-router-dom'

function SeccionComenzar() {
  return (
    <section className="comenzar">
      <h2>Comienza tu proceso hoy</h2>
      <p>Descubre el plan nutricional que se ajusta a lo que necesitas.</p>
      <Link to="/productos">Ver planes disponibles</Link>
    </section>
  )
}

export default SeccionComenzar
