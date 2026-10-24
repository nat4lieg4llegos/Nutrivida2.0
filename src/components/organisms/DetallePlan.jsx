import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import SelectorCantidad from '../molecules/SelectorCantidad'
import MensajeFormulario from '../atoms/MensajeFormulario'
import TarjetaComplemento from '../molecules/TarjetaComplemento'
import { formatearPrecio } from '../../utils/formato'

function DetallePlan({ plan, onAgregarCarrito }) {
  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')

  const aumentar = () => {
    setCantidad(cantidad + 1)
  }

  const disminuir = () => {
    if (cantidad > 1) setCantidad(cantidad - 1)
  }

  const agregar = () => {
    onAgregarCarrito(plan, cantidad)
    setMensaje('Agregaste ' + cantidad + ' sesión(es) de "' + plan.nombre + '" al carrito.')
    setCantidad(1)
  }

  // El complemento se agrega como un producto aparte del carrito (1 unidad por clic)
  const agregarComplemento = () => {
    onAgregarCarrito(plan.complemento, 1)
    setMensaje('Agregaste "' + plan.complemento.nombre + '" al carrito.')
  }

  return (
    <section className="detalle-contenedor">
      <div className="detalle-imagen">
        <img src={plan.imagen} alt={plan.nombre} />
      </div>

      <div className="detalle-informacion">
        <p className="detalle-categoria">PLAN NUTRICIONAL</p>
        <h1>{plan.nombre}</h1>
        <p className="detalle-precio">{formatearPrecio(plan.precio)}</p>
        <p className="detalle-descripcion">{plan.descripcion}</p>

        <div className="detalle-incluye">
          <h2>¿Qué incluye?</h2>
          <ul>
            <li>Evaluación nutricional inicial.</li>
            <li>Plan alimenticio personalizado.</li>
            <li>Recomendaciones según tus objetivos.</li>
            <li>Seguimiento del progreso.</li>
          </ul>
        </div>

        <SelectorCantidad cantidad={cantidad} onAumentar={aumentar} onDisminuir={disminuir} />

        <div className="total-producto">
          <span>Total:</span>
          <strong>{formatearPrecio(plan.precio * cantidad)}</strong>
        </div>

        <Button type="button" className="boton-agendar" onClick={agregar}>
          Agregar al carrito
        </Button>

        {/* Los planes creados desde el Panel de Control no tienen complemento */}
        {plan.complemento ? (
          <TarjetaComplemento complemento={plan.complemento} onAgregar={agregarComplemento} />
        ) : null}

        <MensajeFormulario texto={mensaje} tipo="exito" />

        {mensaje !== '' ? (
          <Link to="/carrito" className="ir-carrito">
            Ir al carrito para finalizar la compra →
          </Link>
        ) : null}

        <Link to="/productos" className="volver-catalogo">
          ← Volver a los planes disponibles
        </Link>
      </div>
    </section>
  )
}

export default DetallePlan
