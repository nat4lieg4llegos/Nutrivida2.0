import Table from 'react-bootstrap/Table'
import FilaCarrito from '../molecules/FilaCarrito'

function TablaCarrito({ carrito, onQuitar }) {
  return (
    <Table responsive className="tabla-nutrivida">
      <thead>
        <tr>
          <th>Producto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {carrito.map((item) => (
          <FilaCarrito
            key={item.id}
            id={item.id}
            nombre={item.nombre}
            precio={item.precio}
            cantidad={item.cantidad}
            onQuitar={onQuitar}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default TablaCarrito
