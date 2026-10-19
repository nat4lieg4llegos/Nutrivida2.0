import { Link } from 'react-router-dom'
import { datosAdmin } from '../data/admin'

function Perfil({ sesion }) {
  if (!sesion) {
    return (
      <main>
        <section className="login-formulario tarjeta-mensaje">
          <h1>Mi Perfil</h1>
          <p className="login-descripcion">Debes iniciar sesión para ver tu perfil.</p>
          <div className="login-enlaces">
            <Link to="/login">Iniciar sesión →</Link>
          </div>
        </section>
      </main>
    )
  }

  if (sesion === 'admin') {
    return (
      <main>
        <section className="login-formulario perfil-tarjeta">
          <div className="avatar perfil-avatar">A</div>
          <h1>Mi Perfil</h1>

          <dl>
            <dt>Nombre</dt>
            <dd>{datosAdmin.nombre}</dd>
            <dt>Usuario</dt>
            <dd>{datosAdmin.usuario}</dd>
            <dt>Correo</dt>
            <dd>{datosAdmin.correo}</dd>
            <dt>Rol</dt>
            <dd>{datosAdmin.rol}</dd>
            <dt>Clínica</dt>
            <dd>{datosAdmin.clinica}</dd>
          </dl>

          <div className="login-enlaces">
            <Link to="/panel">Ir al Panel de Control →</Link>
          </div>
        </section>
      </main>
    )
  }

  // Paciente registrado: sus datos quedaron guardados en localStorage al registrarse
  const nombre = localStorage.getItem('nombreUsuario')

  return (
    <main>
      <section className="login-formulario perfil-tarjeta">
        <div className="avatar perfil-avatar">{nombre ? nombre.charAt(0).toUpperCase() : 'P'}</div>
        <h1>Mi Perfil</h1>

        <dl>
          <dt>Nombre</dt>
          <dd>{nombre}</dd>
          <dt>Correo</dt>
          <dd>{localStorage.getItem('emailUsuario')}</dd>
          <dt>Teléfono</dt>
          <dd>{localStorage.getItem('telefonoUsuario')}</dd>
          <dt>Peso</dt>
          <dd>{localStorage.getItem('pesoUsuario')} kg</dd>
          <dt>Estatura</dt>
          <dd>{localStorage.getItem('estaturaUsuario')} cm</dd>
          <dt>Objetivo nutricional</dt>
          <dd>{localStorage.getItem('objetivoUsuario')}</dd>
        </dl>
      </section>
    </main>
  )
}

export default Perfil
