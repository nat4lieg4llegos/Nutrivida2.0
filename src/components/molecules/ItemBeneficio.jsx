// children: el ícono SVG del beneficio
function ItemBeneficio({ titulo, texto, sinBorde, children }) {
  return (
    <div className={sinBorde ? 'porque-elegir__item porque-elegir__item--sin-borde' : 'porque-elegir__item'}>
      <div className="porque-elegir__icono">{children}</div>

      <div>
        <h3>{titulo}</h3>
        <p>{texto}</p>
      </div>
    </div>
  )
}

export default ItemBeneficio
