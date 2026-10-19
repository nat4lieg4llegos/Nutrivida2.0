import Avatar from '../atoms/Avatar'
import Estrellas from '../atoms/Estrellas'

function TarjetaResena({ inicial, nombre, tiempo, estrellas, texto, plan, activa }) {
  return (
    <article className={activa ? 'tarjeta-resena activa' : 'tarjeta-resena'}>
      <div className="tarjeta-resena__encabezado">
        <Avatar inicial={inicial} />

        <div>
          <h4>{nombre}</h4>
          <p className="tarjeta-resena__tiempo">{tiempo}</p>
        </div>
      </div>

      <Estrellas cantidad={estrellas} clase="estrellas" />

      <p>"{texto}"</p>

      <p className="tarjeta-resena__plan">{plan}</p>
    </article>
  )
}

export default TarjetaResena
