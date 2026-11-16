import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdornoTitulo from '../components/atoms/AdornoTitulo'
import MensajeFormulario from '../components/atoms/MensajeFormulario'
import FormularioPlan from '../components/organisms/FormularioPlan'
import TablaPlanes from '../components/organisms/TablaPlanes'

function PanelControl({ sesion, planes, errorCarga, onAgregarPlan, onEditarPlan, onEliminarPlan }) {
  const [idEditando, setIdEditando] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [mensajeError, setMensajeError] = useState('')

  // Ruta protegida: solo entra el administrador
  if (sesion !== 'admin') {
    return (
      <main>
        <section className="login-formulario tarjeta-mensaje">
          <h1>Acceso restringido</h1>
          <p className="login-descripcion">
            El Panel de Control solo está disponible para el administrador.
          </p>
          <div className="login-enlaces">
            <Link to="/login">Iniciar sesión como administrador →</Link>
          </div>
        </section>
      </main>
    )
  }

  const planEditando = planes.find((plan) => plan.id === idEditando) || null

  // Mensaje cuando el backend rechaza la operación (por ejemplo, token vencido: 401)
  const mostrarError = (error) => {
    console.log('Error en el Panel de Control:', error)
    setMensaje('')
    setMensajeError(
      'No se pudo completar la operación. Revisa que el backend esté encendido o cierra sesión y vuelve a ingresar como administrador.'
    )
  }

  const guardar = (datos) => {
    setMensajeError('')

    if (planEditando) {
      onEditarPlan(planEditando.id, datos)
        .then(() => {
          setIdEditando(null)
          setMensaje('Plan "' + datos.nombre + '" actualizado.')
        })
        .catch(mostrarError)
    } else {
      onAgregarPlan(datos)
        .then(() => {
          setMensaje('Plan "' + datos.nombre + '" agregado al catálogo.')
        })
        .catch(mostrarError)
    }
  }

  const editar = (id) => {
    setIdEditando(id)
    setMensaje('')
    setMensajeError('')
  }

  const eliminar = (id) => {
    setMensajeError('')

    onEliminarPlan(id)
      .then(() => {
        if (id === idEditando) setIdEditando(null)
        setMensaje('Plan eliminado del catálogo.')
      })
      .catch(mostrarError)
  }

  return (
    <main className="panel-control">
      <section className="catalogo-encabezado">
        <h1>Panel de Control</h1>
        <AdornoTitulo />
        <p className="catalogo-descripcion">
          Agrega, edita o elimina los planes del catálogo. Los cambios se guardan en la base de datos
          a través del backend NutriVida.
        </p>
      </section>

      <FormularioPlan
        key={idEditando ? idEditando : 'nuevo'}
        planEditando={planEditando}
        onGuardar={guardar}
        onCancelar={() => setIdEditando(null)}
      />

      <MensajeFormulario texto={mensaje} tipo="exito" />
      <MensajeFormulario texto={mensajeError || errorCarga || ''} tipo="error" />

      <h2 className="panel-subtitulo">Planes del catálogo ({planes.length})</h2>

      <TablaPlanes planes={planes} onEditar={editar} onEliminar={eliminar} />
    </main>
  )
}

export default PanelControl
