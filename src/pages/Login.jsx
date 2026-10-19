import { Link } from 'react-router-dom'
import FormularioLogin from '../components/organisms/FormularioLogin'

function Login({ sesion, onIniciarSesion }) {
  if (sesion) {
    return (
      <main>
        <section className="login-formulario tarjeta-mensaje">
          <h1>¡Sesión iniciada!</h1>
          <p className="login-descripcion">
            {sesion === 'admin' ? 'Ingresaste como administrador.' : 'Ingresaste como paciente NutriVida.'}
          </p>

          <div className="login-enlaces">
            {sesion === 'admin' ? <Link to="/panel">Ir al Panel de Control →</Link> : null}
            <Link to="/perfil">Ver mi perfil →</Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main>
      <FormularioLogin onIniciarSesion={onIniciarSesion} />
    </main>
  )
}

export default Login
