import { Link } from 'react-router-dom'
import DetallePlan from '../components/organisms/DetallePlan'

function Producto({ planes, planSeleccionado, onAgregarCarrito }) {
  // Si no se eligió un plan (o fue eliminado), se muestra el primero del catálogo
  const plan = planes.find((p) => p.id === planSeleccionado) || planes[0]

  if (!plan) {
    return (
      <main className="detalle-producto">
        <section className="tarjeta-mensaje">
          <h1>No hay planes disponibles</h1>
          <Link to="/productos">← Volver a los planes</Link>
        </section>
      </main>
    )
  }

  return (
    <main className="detalle-producto">
      <DetallePlan key={plan.id} plan={plan} onAgregarCarrito={onAgregarCarrito} />
    </main>
  )
}

export default Producto
