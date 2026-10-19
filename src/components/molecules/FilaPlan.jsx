import Button from 'react-bootstrap/Button'
import { formatearPrecio } from '../../utils/formato'

function FilaPlan({ id, imagen, nombre, precio, onEditar, onEliminar }) {
  return (
    <tr>
      <td>
        <img src={imagen} alt={nombre} className="panel-miniatura" />
      </td>
      <td>{nombre}</td>
      <td>{formatearPrecio(precio)}</td>
      <td>
        <Button variant="outline-success" size="sm" className="me-2" onClick={() => onEditar(id)}>
          Editar
        </Button>
        <Button variant="outline-danger" size="sm" onClick={() => onEliminar(id)}>
          Eliminar
        </Button>
      </td>
    </tr>
  )
}

export default FilaPlan
