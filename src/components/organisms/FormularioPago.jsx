import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import MensajeFormulario from '../atoms/MensajeFormulario'
import { esSoloLetras } from '../../utils/validaciones'
import { formatearPrecio } from '../../utils/formato'

// Pago simulado: mismas validaciones de tarjeta de la primera entrega
function FormularioPago({ total, onFinalizarCompra }) {
  const [formaPago, setFormaPago] = useState('')
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false)
  const [numero, setNumero] = useState('')
  const [titular, setTitular] = useState('')
  const [vencimiento, setVencimiento] = useState('')
  const [cvv, setCvv] = useState('')
  const [mensaje, setMensaje] = useState('')

  const continuar = () => {
    if (formaPago === '') {
      setMensaje('Selecciona una forma de pago para continuar.')
      return
    }

    setMensaje('')

    if (formaPago === 'efectivo') {
      setMostrarTarjeta(false)
      onFinalizarCompra('✅ Compra registrada. Pagarás ' + formatearPrecio(total) + ' en efectivo al asistir a tu primera sesión.')
    } else {
      setMostrarTarjeta(true)
    }
  }

  const pagar = () => {
    if (numero === '' || titular === '' || vencimiento === '' || cvv === '') {
      setMensaje('⚠️ Completa todos los datos de la tarjeta.')
      return
    }

    if (!/^\d{16}$/.test(numero.replace(/\s/g, ''))) {
      setMensaje('⚠️ Ingresa un número de tarjeta válido de 16 dígitos.')
      return
    }

    if (!esSoloLetras(titular)) {
      setMensaje('⚠️ El nombre del titular debe contener solo letras.')
      return
    }

    if (!/^\d{2}\/\d{2}$/.test(vencimiento)) {
      setMensaje('⚠️ Ingresa el vencimiento en formato MM/AA.')
      return
    }

    const mes = Number(vencimiento.substring(0, 2))

    if (mes < 1 || mes > 12) {
      setMensaje('⚠️ Ingresa un mes de vencimiento válido.')
      return
    }

    if (!/^\d{3}$/.test(cvv)) {
      setMensaje('⚠️ El CVV debe contener 3 números.')
      return
    }

    onFinalizarCompra('✅ Pago aprobado. Total pagado: ' + formatearPrecio(total) + '. El comprobante fue enviado a tu correo (compra simulada, sin cobro real).')
  }

  return (
    <div className="carrito-pago">
      <div className="forma-pago">
        <h3>Selecciona tu forma de pago</h3>

        <Form.Check inline type="radio" name="formaPago" id="pagoDebito" label="Débito" value="debito" checked={formaPago === 'debito'} onChange={(e) => setFormaPago(e.target.value)} />
        <Form.Check inline type="radio" name="formaPago" id="pagoCredito" label="Crédito" value="credito" checked={formaPago === 'credito'} onChange={(e) => setFormaPago(e.target.value)} />
        <Form.Check inline type="radio" name="formaPago" id="pagoEfectivo" label="Efectivo" value="efectivo" checked={formaPago === 'efectivo'} onChange={(e) => setFormaPago(e.target.value)} />
      </div>

      <Button type="button" className="boton-agendar" onClick={continuar}>
        Continuar con el pago
      </Button>

      {mostrarTarjeta ? (
        <div className="datos-tarjeta">
          <h3>Datos de la tarjeta</h3>

          <Form.Label htmlFor="numeroTarjeta">Número de tarjeta</Form.Label>
          <Form.Control type="text" id="numeroTarjeta" maxLength={19} placeholder="1234 5678 9012 3456" value={numero} onChange={(e) => setNumero(e.target.value)} />

          <Form.Label htmlFor="titularTarjeta">Nombre del titular</Form.Label>
          <Form.Control type="text" id="titularTarjeta" placeholder="Nombre y apellido" value={titular} onChange={(e) => setTitular(e.target.value)} />

          <div className="datos-tarjeta-fila">
            <div>
              <Form.Label htmlFor="vencimientoTarjeta">Vencimiento</Form.Label>
              <Form.Control type="text" id="vencimientoTarjeta" maxLength={5} placeholder="MM/AA" value={vencimiento} onChange={(e) => setVencimiento(e.target.value)} />
            </div>

            <div>
              <Form.Label htmlFor="cvvTarjeta">CVV</Form.Label>
              <Form.Control type="password" id="cvvTarjeta" maxLength={3} placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
            </div>
          </div>

          <Button type="button" id="botonPagar" onClick={pagar}>
            Pagar {formatearPrecio(total)}
          </Button>
        </div>
      ) : null}

      <MensajeFormulario texto={mensaje} tipo="error" />
    </div>
  )
}

export default FormularioPago
