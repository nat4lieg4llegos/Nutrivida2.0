function SelectorCantidad({ cantidad, onAumentar, onDisminuir }) {
  return (
    <div className="cantidad-sesiones">
      <p>Cantidad de sesiones</p>

      <div className="selector-cantidad">
        <button type="button" onClick={onDisminuir} aria-label="Disminuir cantidad">
          −
        </button>

        <span>{cantidad}</span>

        <button type="button" onClick={onAumentar} aria-label="Aumentar cantidad">
          +
        </button>
      </div>
    </div>
  )
}

export default SelectorCantidad
