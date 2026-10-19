import { useState } from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import MensajeFormulario from '../atoms/MensajeFormulario'
import { credencialesAdmin } from '../../data/admin'
import { esCorreoValido } from '../../utils/validaciones'

function FormularioLogin({ onIniciarSesion }) {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [mensaje, setMensaje] = useState('')

  const ingresar = (e) => {
    e.preventDefault()

    // Campos vacíos
    if (usuario.trim() === '') {
      setMensaje('Debes ingresar tu usuario o correo electrónico.')
      return
    }

    if (contrasena.trim() === '') {
      setMensaje('Debes ingresar tu contraseña.')
      return
    }

    // Credenciales estáticas del administrador
    if (usuario.trim() === credencialesAdmin.usuario && contrasena === credencialesAdmin.contrasena) {
      onIniciarSesion('admin')
      return
    }

    // Si no es el administrador, se valida como paciente registrado (primera entrega)
    if (!esCorreoValido(usuario.trim())) {
      setMensaje('Debes ingresar un correo electrónico válido.')
      return
    }

    if (contrasena.length < 8 || contrasena.length > 15) {
      setMensaje('La contraseña debe tener entre 8 y 15 caracteres.')
      return
    }

    const emailRegistrado = localStorage.getItem('emailUsuario')
    const contraRegistrada = localStorage.getItem('contraUsuario')

    if (!emailRegistrado || !contraRegistrada) {
      setMensaje('No existe un usuario registrado. Primero debes registrarte.')
      return
    }

    if (usuario.trim().toLowerCase() !== emailRegistrado || contrasena !== contraRegistrada) {
      setMensaje('Correo o contraseña incorrectos.')
      return
    }

    onIniciarSesion('usuario')
  }

  return (
    <Form className="login-formulario" onSubmit={ingresar} noValidate>
      <h1>Iniciar sesión</h1>
      <p className="login-descripcion">Ingresa tus datos para acceder a tu cuenta NutriVida.</p>

      <Form.Group className="campo-login" controlId="emailSes">
        <Form.Label>Usuario o correo electrónico</Form.Label>
        <Form.Control
          type="text"
          placeholder="ejemplo@gmail.com"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="campo-login" controlId="contraSes">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ingresa tu contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
      </Form.Group>

      <Button type="submit" className="boton-login">
        Iniciar sesión
      </Button>

      <MensajeFormulario texto={mensaje} tipo="error" />

      <div className="login-enlaces">
        <p>
          ¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
        <Link to="/">← Volver al inicio</Link>
      </div>
    </Form>
  )
}

export default FormularioLogin
