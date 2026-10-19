import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import MensajeFormulario from '../atoms/MensajeFormulario'
import { esSoloLetras } from '../../utils/validaciones'

function FormularioResena({ onPublicar }) {
  const [nombre, setNombre] = useState('')
  const [estrellas, setEstrellas] = useState('5')
  const [texto, setTexto] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('error')

  const publicar = (e) => {
    e.preventDefault()

    if (nombre.trim() === '' || texto.trim() === '') {
      setTipoMensaje('error')
      setMensaje('Debes escribir tu nombre y tu opinión.')
      return
    }

    if (!esSoloLetras(nombre.trim())) {
      setTipoMensaje('error')
      setMensaje('El nombre debe contener solo letras.')
      return
    }

    if (texto.trim().length < 10) {
      setTipoMensaje('error')
      setMensaje('Tu opinión debe tener al menos 10 caracteres.')
      return
    }

    onPublicar({
      id: Date.now(),
      inicial: nombre.trim().charAt(0).toUpperCase(),
      nombre: nombre.trim(),
      tiempo: 'recién publicada',
      estrellas: Number(estrellas),
      texto: texto.trim(),
      plan: 'Paciente NutriVida'
    })

    setNombre('')
    setEstrellas('5')
    setTexto('')
    setTipoMensaje('exito')
    setMensaje('¡Gracias! Tu reseña se agregó al comienzo del carrusel.')
  }

  return (
    <Form className="formulario-reseña" onSubmit={publicar} noValidate>
      <h3>Deja tu reseña ✨</h3>

      <Form.Control
        type="text"
        id="nombre-reseña"
        placeholder="Tu nombre"
        aria-label="Tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />

      <Form.Select
        id="estrellas-reseña"
        aria-label="Cantidad de estrellas"
        value={estrellas}
        onChange={(e) => setEstrellas(e.target.value)}
      >
        <option value="5">★★★★★</option>
        <option value="4">★★★★☆</option>
        <option value="3">★★★☆☆</option>
        <option value="2">★★☆☆☆</option>
        <option value="1">★☆☆☆☆</option>
      </Form.Select>

      <Form.Control
        as="textarea"
        id="texto-reseña"
        placeholder="Escribe tu opinión"
        aria-label="Tu opinión"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />

      <button type="submit" id="publicar-reseña">
        Publicar reseña
      </button>

      <MensajeFormulario texto={mensaje} tipo={tipoMensaje} />
    </Form>
  )
}

export default FormularioResena
