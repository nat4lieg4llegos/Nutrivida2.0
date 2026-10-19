import { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import MensajeFormulario from '../atoms/MensajeFormulario'
import {
  esSoloLetras,
  esRutValido,
  calcularEdad,
  esTelefonoValido,
  esCorreoRegistroValido,
  esContrasenaSegura,
  esNumeroEnRango
} from '../../utils/validaciones'

function FormularioRegistro() {
  // Campos de la primera entrega
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [rut, setRut] = useState('')
  const [fecnac, setFecnac] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [confirmarContrasena, setConfirmarContrasena] = useState('')

  // Campos de contexto de NutriVida
  const [peso, setPeso] = useState('')
  const [estatura, setEstatura] = useState('')
  const [objetivo, setObjetivo] = useState('')

  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('error')

  const mostrarError = (texto) => {
    setTipoMensaje('error')
    setMensaje(texto)
  }

  const registrar = (e) => {
    e.preventDefault()

    if (
      nombre.trim() === '' ||
      apellido.trim() === '' ||
      rut.trim() === '' ||
      fecnac === '' ||
      telefono.trim() === '' ||
      email.trim() === '' ||
      contrasena.trim() === '' ||
      confirmarContrasena.trim() === '' ||
      peso === '' ||
      estatura === '' ||
      objetivo === ''
    ) {
      mostrarError('Debes completar todos los campos.')
      return
    }

    if (!esSoloLetras(nombre.trim())) {
      mostrarError('El nombre debe contener solo letras.')
      return
    }

    if (!esSoloLetras(apellido.trim())) {
      mostrarError('El apellido debe contener solo letras.')
      return
    }

    if (!esRutValido(rut.trim())) {
      mostrarError('El formato del RUT es: XX.XXX.XXX-X')
      return
    }

    if (calcularEdad(fecnac) < 18) {
      mostrarError('Debes ser mayor de 18 años.')
      return
    }

    if (!esTelefonoValido(telefono.trim())) {
      mostrarError('El teléfono debe tener el formato +56912345678.')
      return
    }

    if (!esCorreoRegistroValido(email.trim())) {
      mostrarError('El email debe ser: @outlook.com, @gmail.com o @duocuc.cl')
      return
    }

    if (!esContrasenaSegura(contrasena)) {
      mostrarError('La contraseña debe tener entre 8 y 15 caracteres, con una mayúscula, una minúscula, un número y un carácter especial.')
      return
    }

    if (contrasena !== confirmarContrasena) {
      mostrarError('Las contraseñas no coinciden.')
      return
    }

    if (!esNumeroEnRango(peso, 30, 300)) {
      mostrarError('El peso debe ser un número entre 30 y 300 kg.')
      return
    }

    if (!esNumeroEnRango(estatura, 100, 250)) {
      mostrarError('La estatura debe ser un número entre 100 y 250 cm.')
      return
    }

    // Se guardan los datos para poder iniciar sesión y verlos en "Mi Perfil"
    localStorage.setItem('emailUsuario', email.trim().toLowerCase())
    localStorage.setItem('contraUsuario', contrasena)
    localStorage.setItem('nombreUsuario', nombre.trim() + ' ' + apellido.trim())
    localStorage.setItem('telefonoUsuario', telefono.trim())
    localStorage.setItem('pesoUsuario', peso)
    localStorage.setItem('estaturaUsuario', estatura)
    localStorage.setItem('objetivoUsuario', objetivo)

    setNombre('')
    setApellido('')
    setRut('')
    setFecnac('')
    setTelefono('')
    setEmail('')
    setContrasena('')
    setConfirmarContrasena('')
    setPeso('')
    setEstatura('')
    setObjetivo('')

    setTipoMensaje('exito')
    setMensaje('¡Registro exitoso! Ya puedes iniciar sesión.')
  }

  return (
    <Form className="formulario" onSubmit={registrar} noValidate>
      <h2>Registrar Usuario</h2>

      <Form.Label htmlFor="nombre">Nombre:</Form.Label>
      <Form.Control type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />

      <Form.Label htmlFor="apellido">Apellido:</Form.Label>
      <Form.Control type="text" id="apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />

      <Form.Label htmlFor="rut">RUT:</Form.Label>
      <Form.Control type="text" id="rut" placeholder="XX.XXX.XXX-X" value={rut} onChange={(e) => setRut(e.target.value)} />

      <Form.Label htmlFor="fecnac">Fecha de nacimiento:</Form.Label>
      <Form.Control type="date" id="fecnac" value={fecnac} onChange={(e) => setFecnac(e.target.value)} />

      <Form.Label htmlFor="telefono">Teléfono:</Form.Label>
      <Form.Control type="tel" id="telefono" placeholder="+56912345678" value={telefono} onChange={(e) => setTelefono(e.target.value)} />

      <Form.Label htmlFor="email">Email:</Form.Label>
      <Form.Control type="email" id="email" placeholder="ejemplo@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />

      <Form.Label htmlFor="contrasena">Contraseña:</Form.Label>
      <Form.Control type="password" id="contrasena" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />

      <Form.Label htmlFor="confirmarContrasena">Confirmar contraseña:</Form.Label>
      <Form.Control type="password" id="confirmarContrasena" value={confirmarContrasena} onChange={(e) => setConfirmarContrasena(e.target.value)} />

      <p className="formulario-subtitulo">Datos para tu plan nutricional</p>

      <Form.Label htmlFor="peso">Peso (kg):</Form.Label>
      <Form.Control type="number" id="peso" placeholder="Ej: 68" value={peso} onChange={(e) => setPeso(e.target.value)} />

      <Form.Label htmlFor="estatura">Estatura (cm):</Form.Label>
      <Form.Control type="number" id="estatura" placeholder="Ej: 165" value={estatura} onChange={(e) => setEstatura(e.target.value)} />

      <Form.Label htmlFor="objetivo">Objetivo nutricional:</Form.Label>
      <Form.Select id="objetivo" value={objetivo} onChange={(e) => setObjetivo(e.target.value)}>
        <option value="">Selecciona tu objetivo</option>
        <option value="Bajar de peso">Bajar de peso</option>
        <option value="Controlar diabetes o hipertensión">Controlar diabetes o hipertensión</option>
        <option value="Mejorar rendimiento deportivo">Mejorar rendimiento deportivo</option>
        <option value="Alimentación vegana o vegetariana">Alimentación vegana o vegetariana</option>
      </Form.Select>

      <Button type="submit">Registrar</Button>

      <MensajeFormulario texto={mensaje} tipo={tipoMensaje} />

      <p className="enlace-formulario">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>

      <p className="enlace-formulario">
        <Link to="/">← Volver al inicio</Link>
      </p>
    </Form>
  )
}

export default FormularioRegistro
