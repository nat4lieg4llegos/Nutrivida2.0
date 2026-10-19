import { useState } from 'react'
import AdornoTitulo from '../components/atoms/AdornoTitulo'
import BuscadorPlanes from '../components/molecules/BuscadorPlanes'
import ListaPlanes from '../components/organisms/ListaPlanes'

function Productos({ planes, onVerDetalle }) {
  const [busqueda, setBusqueda] = useState('')

  // Filtrado dinámico: se muestran los planes cuyo nombre o resumen contiene lo buscado
  const planesFiltrados = planes.filter((plan) =>
    plan.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    plan.resumen.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <main className="catalogo">
      <section className="catalogo-encabezado">
        <h1>Planes nutricionales</h1>
        <AdornoTitulo />
        <p className="catalogo-descripcion">
          Encuentra el plan que mejor se adapte a tus objetivos y comienza tu proceso junto a nuestro
          equipo de nutricionistas.
        </p>
      </section>

      <BuscadorPlanes busqueda={busqueda} onCambiarBusqueda={setBusqueda} />

      <ListaPlanes planes={planesFiltrados} onVerDetalle={onVerDetalle} />
    </main>
  )
}

export default Productos
