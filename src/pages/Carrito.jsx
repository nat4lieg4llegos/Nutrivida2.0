import { useState } from 'react'
import { Link } from 'react-router-dom'
import AdornoTitulo from '../components/atoms/AdornoTitulo'
import MensajeFormulario from '../components/atoms/MensajeFormulario'
import TablaCarrito from '../components/organisms/TablaCarrito'
import FormularioPago from '../components/organisms/FormularioPago'
import { calcularTotal } from '../utils/carrito'
import { formatearPrecio } from '../utils/formato'

function Carrito({ carrito, onQuitar, onVaciar }) {
  const [mensajeCompra, setMensajeCompra] = useState('')

  const total = calcularTotal(carrito)

  // Compra simulada: se muestra el mensaje y se vacía el carrito
  const finalizarCompra = (texto) => {
    setMensajeCompra(texto)
    onVaciar()
  }

  return (
    <main className="pagina-carrito">
      <section className="catalogo-encabezado">
        <h1>Carrito de compras</h1>
        <AdornoTitulo />
      </section>

      <MensajeFormulario texto={mensajeCompra} tipo="exito" />

      {carrito.length === 0 ? (
        <section className="tarjeta-mensaje carrito-vacio">
          <p>Tu carrito está vacío.</p>
          <Link to="/productos" className="boton-producto">
            Ver planes disponibles
          </Link>
        </section>
      ) : (
        <section className="carrito-contenido">
          <TablaCarrito carrito={carrito} onQuitar={onQuitar} />

          <div className="total-producto">
            <span>Total:</span>
            <strong>{formatearPrecio(total)}</strong>
          </div>

          <FormularioPago total={total} onFinalizarCompra={finalizarCompra} />
        </section>
      )}
    </main>
  )
}

export default Carrito
