import Button from 'react-bootstrap/Button'
import { formatearPrecio } from '../../utils/formato'

// Producto complementario que se vende junto a cada plan (ej: proteína en polvo en el plan deportivo)
function TarjetaComplemento({ complemento, onAgregar }) {
  return (
    <article className="complemento-card">
      <p className="complemento-etiqueta">COMPLEMENTO RECOMENDADO</p>

      <div className="complemento-cuerpo">
        <span className="complemento-icono">{complemento.icono}</span>

        <div className="complemento-texto">
          <h3>{complemento.nombre}</h3>
          <p>{complemento.descripcion}</p>
        </div>
      </div>

      <div className="complemento-pie">
        <strong>{formatearPrecio(complemento.precio)}</strong>
        <Button type="button" className="boton-complemento" onClick={onAgregar}>
          Agregar complemento
        </Button>
      </div>
    </article>
  )
}

export default TarjetaComplemento
