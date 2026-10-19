import Button from 'react-bootstrap/Button'
import { formatearPrecio } from '../../utils/formato'

function FilaCarrito({ id, nombre, precio, cantidad, onQuitar }) {
  return (
    <tr>
      <td>{nombre}</td>
      <td>{formatearPrecio(precio)}</td>
      <td>{cantidad}</td>
      <td>{formatearPrecio(precio * cantidad)}</td>
      <td>
        <Button variant="outline-danger" size="sm" onClick={() => onQuitar(id)}>
          Quitar
        </Button>
      </td>
    </tr>
  )
}

export default FilaCarrito
