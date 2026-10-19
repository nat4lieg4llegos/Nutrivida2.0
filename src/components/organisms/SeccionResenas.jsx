import { useState } from 'react'
import DecoracionTitulo from '../atoms/DecoracionTitulo'
import TarjetaResena from '../molecules/TarjetaResena'

// Cuántas tarjetas caben según el ancho de la pantalla (igual que en script.js)
function obtenerCantidadVisible() {
  if (window.innerWidth <= 600) return 1
  if (window.innerWidth <= 900) return 2
  return 3
}

function SeccionResenas({ resenas }) {
  const [inicio, setInicio] = useState(0)

  const cantidadVisible = obtenerCantidadVisible()
  const ultimoInicio = resenas.length - cantidadVisible

  const verAnteriores = () => {
    if (inicio > 0) setInicio(inicio - 1)
  }

  const verSiguientes = () => {
    if (inicio < ultimoInicio) setInicio(inicio + 1)
  }

  return (
    <section className="seccion-resenas">
      <video controls width="640">
        <source src="/video/presentacion.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>

      <h2>Lo que dicen nuestros pacientes</h2>

      <DecoracionTitulo />

      <div className="resumen-resenas">
        <p className="resumen-resenas__titulo">Excelente</p>
        <p className="resumen-resenas__estrellas">★★★★★</p>
        <p className="resumen-resenas__base">Basado en las reseñas de nuestros pacientes</p>
      </div>

      <div className="carrusel-resenas">
        <button
          type="button"
          className="flecha"
          onClick={verAnteriores}
          disabled={inicio === 0}
          aria-label="Reseñas anteriores"
        >
          ❮
        </button>

        <div className="tarjetas-resenas">
          {resenas.map((resena, indice) => (
            <TarjetaResena
              key={resena.id}
              inicial={resena.inicial}
              nombre={resena.nombre}
              tiempo={resena.tiempo}
              estrellas={resena.estrellas}
              texto={resena.texto}
              plan={resena.plan}
              activa={indice >= inicio && indice < inicio + cantidadVisible}
            />
          ))}
        </div>

        <button
          type="button"
          className="flecha"
          onClick={verSiguientes}
          disabled={inicio >= ultimoInicio}
          aria-label="Siguientes reseñas"
        >
          ❯
        </button>
      </div>
    </section>
  )
}

export default SeccionResenas
