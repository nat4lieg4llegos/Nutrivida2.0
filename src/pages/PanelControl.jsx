import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdornoTitulo from '../components/atoms/AdornoTitulo'
import MensajeFormulario from '../components/atoms/MensajeFormulario'
import FormularioPlan from '../components/organisms/FormularioPlan'
import TablaPlanes from '../components/organisms/TablaPlanes'

function PanelControl({ sesion, planes, onAgregarPlan, onEditarPlan, onEliminarPlan }) {
  const [idEditando, setIdEditando] = useState(null)
  const [mensaje, setMensaje] = useState('')

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

  const guardar = (datos) => {
    if (planEditando) {
      onEditarPlan(planEditando.id, datos)
      setIdEditando(null)
      setMensaje('Plan "' + datos.nombre + '" actualizado.')
    } else {
      onAgregarPlan(datos)
      setMensaje('Plan "' + datos.nombre + '" agregado al catálogo.')
    }
  }

  const editar = (id) => {
    setIdEditando(id)
    setMensaje('')
  }

  const eliminar = (id) => {
    onEliminarPlan(id)
    if (id === idEditando) setIdEditando(null)
    setMensaje('Plan eliminado del catálogo.')
  }

  return (
    <main className="panel-control">
      <section className="catalogo-encabezado">
        <h1>Panel de Control</h1>
        <AdornoTitulo />
        <p className="catalogo-descripcion">
          Agrega, edita o elimina los planes del catálogo. Los cambios se guardan en memoria mientras la
          página esté abierta.
        </p>
      </section>

      <FormularioPlan
        key={idEditando ? idEditando : 'nuevo'}
        planEditando={planEditando}
        onGuardar={guardar}
        onCancelar={() => setIdEditando(null)}
      />

      <MensajeFormulario texto={mensaje} tipo="exito" />

      <h2 className="panel-subtitulo">Planes del catálogo ({planes.length})</h2>

      <TablaPlanes planes={planes} onEditar={editar} onEliminar={eliminar} />
    </main>
  )
}

export default PanelControl
