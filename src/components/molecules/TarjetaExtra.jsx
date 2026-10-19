// children: el ícono SVG de la tarjeta
function TarjetaExtra({ titulo, texto, children }) {
  return (
    <article className="extra-card">
      <div className="extra-card__icono">{children}</div>
      <h4>{titulo}</h4>
      <p>{texto}</p>
    </article>
  )
}

export default TarjetaExtra
