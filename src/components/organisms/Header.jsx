import { Link } from 'react-router-dom'
import Logo from '../atoms/Logo'
import { itemsMenu, itemsMenuSesion, itemMenuAdmin } from '../../data/itemsMenu'

function Header({ sesion, cantidadCarrito, onCerrarSesion }) {
  // Si hay sesión se muestra el menú privado, si no, el menú público
  const items = sesion ? itemsMenuSesion : itemsMenu

  return (
    <header>
      <Logo />

      <nav>
        <ul>
          {items.map((item) => (
            <li key={item.href}>
              <Link to={item.href}>
                {item.href === '/carrito' ? item.label + ' (' + cantidadCarrito + ')' : item.label}
              </Link>
            </li>
          ))}

          {sesion === 'admin' ? (
            <li>
              <Link to={itemMenuAdmin.href}>{itemMenuAdmin.label}</Link>
            </li>
          ) : null}

          {sesion ? (
            <li>
              <button type="button" className="boton-cerrar-sesion" onClick={onCerrarSesion}>
                Cerrar sesión
              </button>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  )
}

export default Header
