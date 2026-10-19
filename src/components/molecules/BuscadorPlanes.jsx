import Form from 'react-bootstrap/Form'

function BuscadorPlanes({ busqueda, onCambiarBusqueda }) {
  return (
    <Form.Group className="buscador-planes" controlId="buscadorPlanes">
      <Form.Label>Buscar plan:</Form.Label>
      <Form.Control
        type="text"
        placeholder="Ej: deportiva, vegana, peso..."
        value={busqueda}
        onChange={(e) => onCambiarBusqueda(e.target.value)}
      />
    </Form.Group>
  )
}

export default BuscadorPlanes
