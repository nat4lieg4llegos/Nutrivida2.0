import { useState } from 'react'

function BotonFavorito() {
  const [favorito, setFavorito] = useState(false)

  const alternar = () => {
    if (favorito === false) setFavorito(true)
    else setFavorito(false)
  }

  return (
    <button
      type="button"
      className="boton-favorito"
      onClick={alternar}
      style={{
        backgroundColor: favorito ? '#4a653a' : '#fffefa',
        color: favorito ? 'white' : '#4a653a'
      }}
    >
      {favorito ? '♥ En favoritos' : '♡ Agregar a favoritos'}
    </button>
  )
}

export default BotonFavorito
