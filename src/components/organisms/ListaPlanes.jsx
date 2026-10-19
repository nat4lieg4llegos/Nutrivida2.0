import TarjetaPlan from '../molecules/TarjetaPlan'

function ListaPlanes({ planes, onVerDetalle }) {
  if (planes.length === 0) {
    return <p className="catalogo-vacio">No se encontraron planes con esa búsqueda.</p>
  }

  return (
    <section className="productos-grid">
      {planes.map((plan) => (
        <TarjetaPlan
          key={plan.id}
          id={plan.id}
          imagen={plan.imagen}
          icono={plan.icono}
          nombre={plan.nombre}
          resumen={plan.resumen}
          precio={plan.precio}
          onVerDetalle={onVerDetalle}
        />
      ))}
    </section>
  )
}

export default ListaPlanes
