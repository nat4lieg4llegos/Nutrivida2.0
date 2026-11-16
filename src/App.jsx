import { useState, useEffect } from 'react'
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

import ProductoService from './services/ProductoService'
import { adaptarPlan, archivoImagenGenerica } from './utils/adaptarPlan'

function App() {
  // Estados compartidos entre varias páginas
  const [planes, setPlanes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState('')
  const [planSeleccionado, setPlanSeleccionado] = useState(1)
  const [carrito, setCarrito] = useState([])
  const [sesion, setSesion] = useState(localStorage.getItem('sesion'))

  // ---------- Planes desde el backend (GET /api/v1/productos) ----------
  useEffect(() => {
    cargarPlanes()
  }, [])

  const cargarPlanes = () => {
    return ProductoService.getAllProductos()
      .then((response) => {
        // Si no hay productos el backend responde 204 sin contenido
        const lista = response.data ? response.data : []
        setPlanes(lista.map(adaptarPlan))
        setErrorCarga('')
      })
      .catch((error) => {
        console.log('Error al cargar los planes:', error)
        setErrorCarga('No se pudieron cargar los planes. Revisa que el backend esté encendido.')
      })
      .finally(() => {
        setCargando(false)
      })
  }

  // ---------- Sesión (localStorage) ----------
  const iniciarSesion = (tipo) => {
    localStorage.setItem('sesion', tipo)
    setSesion(tipo)
  }

  const cerrarSesion = () => {
    localStorage.removeItem('sesion')
    localStorage.removeItem('token')
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

  // ---------- CRUD de planes contra el backend (POST, PUT, DELETE) ----------
  // Cada operación vuelve a pedir la lista para mostrar lo que quedó en la base de datos
  const agregarPlan = (datos) => {
    return ProductoService.createProducto({ ...datos, imagen: archivoImagenGenerica })
      .then(() => cargarPlanes())
  }

  const editarPlan = (id, datos) => {
    const plan = planes.find((p) => p.id === id)
    return ProductoService.updateProducto(id, { ...datos, imagen: plan.archivoImagen })
      .then(() => cargarPlanes())
  }

  const eliminarPlan = (id) => {
    return ProductoService.deleteProducto(id)
      .then(() => cargarPlanes())
  }

  return (
    <>
      <Header sesion={sesion} cantidadCarrito={carrito.length} onCerrarSesion={cerrarSesion} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos planes={planes} cargando={cargando} errorCarga={errorCarga} onVerDetalle={setPlanSeleccionado} />} />
        <Route path="/producto" element={<Producto planes={planes} cargando={cargando} planSeleccionado={planSeleccionado} onAgregarCarrito={agregarAlCarrito} />} />
        <Route path="/login" element={<Login sesion={sesion} onIniciarSesion={iniciarSesion} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/panel" element={<PanelControl sesion={sesion} planes={planes} errorCarga={errorCarga} onAgregarPlan={agregarPlan} onEditarPlan={editarPlan} onEliminarPlan={eliminarPlan} />} />
        <Route path="/carrito" element={<Carrito carrito={carrito} onQuitar={quitarDelCarrito} onVaciar={vaciarCarrito} />} />
        <Route path="/perfil" element={<Perfil sesion={sesion} />} />
        <Route path="*" element={<Error404 />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
