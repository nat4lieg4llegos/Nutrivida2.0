import Table from 'react-bootstrap/Table'
import FilaPlan from '../molecules/FilaPlan'

function TablaPlanes({ planes, onEditar, onEliminar }) {
  if (planes.length === 0) {
    return <p className="panel-vacio">No hay planes en el catálogo.</p>
  }

  return (
    <Table responsive hover className="tabla-nutrivida">
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Plan</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {planes.map((plan) => (
          <FilaPlan
            key={plan.id}
            id={plan.id}
            imagen={plan.imagen}
            nombre={plan.nombre}
            precio={plan.precio}
            onEditar={onEditar}
            onEliminar={onEliminar}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default TablaPlanes
