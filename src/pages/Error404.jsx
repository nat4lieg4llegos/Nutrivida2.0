import { Link } from 'react-router-dom'
import DecoracionTitulo from '../components/atoms/DecoracionTitulo'

function Error404() {
  return (
    <main className="pagina-error">
      <p className="pagina-error__codigo">404</p>
      <h1>Página no encontrada</h1>
      <DecoracionTitulo />
      <p>La página que buscas no existe o fue movida.</p>
      <Link to="/" className="boton-producto">
        Volver al inicio
      </Link>
    </main>
  )
}

export default Error404
