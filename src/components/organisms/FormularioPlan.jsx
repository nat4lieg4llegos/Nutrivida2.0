import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import MensajeFormulario from '../atoms/MensajeFormulario'
import { esNumeroEnRango } from '../../utils/validaciones'

// Sirve para crear un plan nuevo o para editar uno existente (planEditando)
function FormularioPlan({ planEditando, onGuardar, onCancelar }) {
  const [nombre, setNombre] = useState(planEditando ? planEditando.nombre : '')
  const [icono, setIcono] = useState(planEditando ? planEditando.icono : '🍃')
  const [precio, setPrecio] = useState(planEditando ? String(planEditando.precio) : '')
  const [resumen, setResumen] = useState(planEditando ? planEditando.resumen : '')
  const [descripcion, setDescripcion] = useState(planEditando ? planEditando.descripcion : '')
  const [mensaje, setMensaje] = useState('')

  const guardar = (e) => {
    e.preventDefault()

    if (nombre.trim() === '' || precio === '' || resumen.trim() === '' || descripcion.trim() === '') {
      setMensaje('Debes completar todos los campos del plan.')
      return
    }

    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s/]+$/.test(nombre.trim()) || nombre.trim().length < 5) {
      setMensaje('El nombre debe tener al menos 5 letras y no puede llevar números.')
      return
    }

    if (!esNumeroEnRango(precio, 1000, 500000)) {
      setMensaje('El precio debe ser un número entre 1.000 y 500.000.')
      return
    }

    if (resumen.trim().length < 15) {
      setMensaje('El resumen debe tener al menos 15 caracteres.')
      return
    }

    if (descripcion.trim().length < 20) {
      setMensaje('La descripción debe tener al menos 20 caracteres.')
      return
    }

    onGuardar({
      nombre: nombre.trim(),
      icono: icono,
      precio: Number(precio),
      resumen: resumen.trim(),
      descripcion: descripcion.trim()
    })

    setNombre('')
    setIcono('🍃')
    setPrecio('')
    setResumen('')
    setDescripcion('')
    setMensaje('')
  }

  return (
    <Form className="panel-formulario" onSubmit={guardar} noValidate>
      <h2>{planEditando ? 'Editar plan' : 'Registrar nuevo plan'}</h2>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="planNombre">
            <Form.Label>Nombre del plan:</Form.Label>
            <Form.Control type="text" placeholder="Ej: Plan nutrición infantil" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group className="mb-3" controlId="planPrecio">
            <Form.Label>Precio por sesión:</Form.Label>
            <Form.Control type="number" placeholder="Ej: 30000" value={precio} onChange={(e) => setPrecio(e.target.value)} />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group className="mb-3" controlId="planIcono">
            <Form.Label>Ícono:</Form.Label>
            <Form.Select value={icono} onChange={(e) => setIcono(e.target.value)}>
              <option value="🍃">🍃 Hoja</option>
              <option value="🥗">🥗 Ensalada</option>
              <option value="🍎">🍎 Manzana</option>
              <option value="💚">💚 Corazón</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3" controlId="planResumen">
        <Form.Label>Resumen (se ve en la tarjeta del catálogo):</Form.Label>
        <Form.Control type="text" value={resumen} onChange={(e) => setResumen(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="planDescripcion">
        <Form.Label>Descripción (se ve en el detalle del plan):</Form.Label>
        <Form.Control as="textarea" rows={3} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
      </Form.Group>

      {planEditando ? null : (
        <p className="panel-nota">Los planes nuevos usan una imagen genérica de NutriVida.</p>
      )}

      <MensajeFormulario texto={mensaje} tipo="error" />

      <Button type="submit" className="boton-panel me-2">
        {planEditando ? 'Guardar cambios' : 'Agregar plan'}
      </Button>

      {planEditando ? (
        <Button type="button" variant="secondary" onClick={onCancelar}>
          Cancelar
        </Button>
      ) : null}
    </Form>
  )
}

export default FormularioPlan
