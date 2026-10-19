import { Link } from 'react-router-dom'
import BotonFavorito from '../atoms/BotonFavorito'
import { formatearPrecio } from '../../utils/formato'

function TarjetaPlan({ id, imagen, icono, nombre, resumen, precio, onVerDetalle }) {
  return (
    <article className="producto-card">
      <div className="producto-imagen">
        <img src={imagen} alt={nombre} />
      </div>

      <div className="producto-icono">{icono}</div>

      <h2>{nombre}</h2>
      <p>{resumen}</p>

      <div className="linea-producto"></div>

      <p className="precio">{formatearPrecio(precio)}</p>

      <Link to="/producto" className="boton-producto" onClick={() => onVerDetalle(id)}>
        Ver detalles
      </Link>

      <BotonFavorito />
    </article>
  )
}

export default TarjetaPlan
