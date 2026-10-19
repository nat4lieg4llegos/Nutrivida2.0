import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from './components/organisms/Header'
import Footer from './components/organisms/Footer'

import Home from './pages/Home'
import Productos from './pages/Productos'
import Producto from './pages/Producto'
import Login from './pages/Login'
import Registro from './pages/Registro'
import PanelControl from './pages/PanelControl'
import Carrito from './pages/Carrito'
import Perfil from './pages/Perfil'
import Error404 from './pages/Error404'

import { planes as planesIniciales, imagenGenerica } from './data/planes'

function App() {
  // Estados compartidos entre varias páginas
  const [planes, setPlanes] = useState(planesIniciales)
  const [planSeleccionado, setPlanSeleccionado] = useState(1)
  const [carrito, setCarrito] = useState([])
  const [sesion, setSesion] = useState(localStorage.getItem('sesion'))

  // ---------- Sesión (localStorage) ----------
  const iniciarSesion = (tipo) => {
    localStorage.setItem('sesion', tipo)
    setSesion(tipo)
  }

  const cerrarSesion = () => {
    localStorage.removeItem('sesion')
    setSesion(null)
  }

  // ---------- Carrito ----------
  const agregarAlCarrito = (plan, cantidad) => {
    const existe = carrito.find((item) => item.id === plan.id)

    if (existe) {
      setCarrito(carrito.map((item) =>
        item.id === plan.id ? { ...item, cantidad: item.cantidad + cantidad } : item
      ))
    } else {
      setCarrito([...carrito, { id: plan.id, nombre: plan.nombre, precio: plan.precio, cantidad: cantidad }])
    }
  }

  const quitarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id))
  }

  const vaciarCarrito = () => {
    setCarrito([])
  }

  // ---------- CRUD de planes (en memoria) ----------
  const agregarPlan = (datos) => {
    setPlanes([...planes, { ...datos, id: Date.now(), imagen: imagenGenerica }])
  }

  const editarPlan = (id, datos) => {
    setPlanes(planes.map((plan) => (plan.id === id ? { ...plan, ...datos } : plan)))
  }

  const eliminarPlan = (id) => {
    setPlanes(planes.filter((plan) => plan.id !== id))
  }

  return (
    <>
      <Header sesion={sesion} cantidadCarrito={carrito.length} onCerrarSesion={cerrarSesion} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos planes={planes} onVerDetalle={setPlanSeleccionado} />} />
        <Route path="/producto" element={<Producto planes={planes} planSeleccionado={planSeleccionado} onAgregarCarrito={agregarAlCarrito} />} />
        <Route path="/login" element={<Login sesion={sesion} onIniciarSesion={iniciarSesion} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/panel" element={<PanelControl sesion={sesion} planes={planes} onAgregarPlan={agregarPlan} onEditarPlan={editarPlan} onEliminarPlan={eliminarPlan} />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} onQuitar={quitarDelCarrito} onVaciar={vaciarCarrito} />} />
        <Route path="/perfil" element={<Perfil sesion={sesion} />} />
        <Route path="*" element={<Error404 />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
