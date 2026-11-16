import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import ProductoService from './services/ProductoService'

// Base de datos simulada: reemplaza al backend Spring Boot durante las pruebas
const bd = vi.hoisted(() => ({ productos: [], fallar: false }))

vi.mock('./services/ProductoService', () => ({
  default: {
    getAllProductos: vi.fn(() =>
      bd.fallar ? Promise.reject(new Error('Network Error')) : Promise.resolve({ data: [...bd.productos] })
    ),
    createProducto: vi.fn((producto) => {
      const nuevo = { ...producto, id: Math.max(...bd.productos.map((p) => p.id)) + 1 }
      bd.productos.push(nuevo)
      return Promise.resolve({ data: nuevo })
    }),
    updateProducto: vi.fn((id, producto) => {
      bd.productos = bd.productos.map((p) => (p.id === id ? { ...producto, id: id } : p))
      return Promise.resolve({ data: { ...producto, id: id } })
    }),
    deleteProducto: vi.fn((id) => {
      bd.productos = bd.productos.filter((p) => p.id !== id)
      return Promise.resolve({ data: null })
    })
  }
}))

// Mismos 4 planes que inserta Flyway (V2__inserta_productos.sql)
const productosIniciales = [
  { id: 1, nombre: 'Plan de pérdida de peso', icono: '🌿', resumen: 'Enfocado en reducir grasa corporal.', descripcion: 'Programa nutricional para reducir grasa corporal.', precio: 35000, imagen: 'plan-perdida-peso.png' },
  { id: 2, nombre: 'Plan control metabólico', icono: '💧', resumen: 'Orientado a controlar condiciones metabólicas.', descripcion: 'Plan para apoyar el control de diabetes o hipertensión.', precio: 40000, imagen: 'plan-control-metabolico.png' },
  { id: 3, nombre: 'Plan nutrición deportiva', icono: '🏋️', resumen: 'Diseñado para mejorar el rendimiento físico.', descripcion: 'Plan para apoyar el aumento de masa muscular.', precio: 45000, imagen: 'plan-nutricion-deportiva.png' },
  { id: 4, nombre: 'Plan alimentación vegana / vegetariana', icono: '🌱', resumen: 'Alimentación basada en plantas.', descripcion: 'Asesoría para una alimentación basada en plantas.', precio: 38000, imagen: 'plan-vegano-vegetariano.png' }
]

// Abre la aplicación directamente en una ruta
function renderizarEn(ruta) {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>
  )
}

describe('App (rutas, acceso privado y CRUD con el backend)', () => {
  beforeEach(() => {
    localStorage.clear()
    bd.productos = productosIniciales.map((p) => ({ ...p }))
    bd.fallar = false
    vi.clearAllMocks()
  })

  it('PU-011: Debe bloquear el Panel de Control si no hay sesión', () => {
    // 1 - Preparación (ARRANGE): sin sesión en localStorage
    // 2 - Ejecución (ACT)
    renderizarEn('/panel')

    // 3 - Verificación (ASSERT)
    expect(screen.getByText('Acceso restringido')).toBeInTheDocument()
  })

  it('PU-012: Debe crear un plan nuevo desde el Panel de Control (POST al backend)', async () => {
    // 1 - Preparación (ARRANGE)
    localStorage.setItem('sesion', 'admin')
    renderizarEn('/panel')
    await screen.findByText('Planes del catálogo (4)')

    // 2 - Ejecución (ACT)
    fireEvent.change(screen.getByLabelText('Nombre del plan:'), { target: { value: 'Plan nutrición infantil' } })
    fireEvent.change(screen.getByLabelText('Precio por sesión:'), { target: { value: '30000' } })
    fireEvent.change(screen.getByLabelText(/Resumen/), { target: { value: 'Alimentación sana para niños y niñas.' } })
    fireEvent.change(screen.getByLabelText(/Descripción/), { target: { value: 'Plan pensado para mejorar los hábitos de alimentación en la infancia.' } })
    fireEvent.click(screen.getByRole('button', { name: 'Agregar plan' }))

    // 3 - Verificación (ASSERT)
    expect(await screen.findByText('Planes del catálogo (5)')).toBeInTheDocument()
    expect(screen.getByText('Plan nutrición infantil')).toBeInTheDocument()
    expect(ProductoService.createProducto).toHaveBeenCalledTimes(1)
  })

  it('PU-013: Debe eliminar un plan desde el Panel de Control (DELETE al backend)', async () => {
    // 1 - Preparación (ARRANGE)
    localStorage.setItem('sesion', 'admin')
    renderizarEn('/panel')
    await screen.findByText('Planes del catálogo (4)')

    // 2 - Ejecución (ACT)
    fireEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0])

    // 3 - Verificación (ASSERT)
    expect(await screen.findByText('Planes del catálogo (3)')).toBeInTheDocument()
    expect(screen.queryByText('Plan de pérdida de peso')).toBeNull()
    expect(ProductoService.deleteProducto).toHaveBeenCalledWith(1)
  })

  it('PU-014: Debe editar el precio de un plan desde el Panel de Control (PUT al backend)', async () => {
    // 1 - Preparación (ARRANGE)
    localStorage.setItem('sesion', 'admin')
    renderizarEn('/panel')
    await screen.findByText('Planes del catálogo (4)')

    // 2 - Ejecución (ACT)
    fireEvent.click(screen.getAllByRole('button', { name: 'Editar' })[0])
    fireEvent.change(screen.getByLabelText('Precio por sesión:'), { target: { value: '39990' } })
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))

    // 3 - Verificación (ASSERT)
    expect(await screen.findByText('$39.990')).toBeInTheDocument()
    expect(ProductoService.updateProducto).toHaveBeenCalledWith(1, expect.objectContaining({ precio: 39990 }))
  })

  it('PU-015: Debe mostrar la página 404 en una ruta que no existe', () => {
    // 1 - Preparación (ARRANGE) + 2 - Ejecución (ACT)
    renderizarEn('/ruta-que-no-existe')

    // 3 - Verificación (ASSERT)
    expect(screen.getByText('Página no encontrada')).toBeInTheDocument()
  })

  it('PU-016: Debe agregar un plan al carrito y mostrar el total', async () => {
    // 1 - Preparación (ARRANGE)
    renderizarEn('/producto')

    // 2 - Ejecución (ACT)
    fireEvent.click(await screen.findByRole('button', { name: 'Agregar al carrito' }))
    fireEvent.click(screen.getByText('Carrito (1)'))

    // 3 - Verificación (ASSERT)
    expect(screen.getByText('Carrito de compras')).toBeInTheDocument()
    expect(screen.getAllByText('$35.000').length).toBeGreaterThan(0)
  })

  it('PU-021: Debe cargar los planes del catálogo desde el backend (GET)', async () => {
    // 1 - Preparación (ARRANGE): la base de datos simulada tiene 4 planes
    // 2 - Ejecución (ACT)
    renderizarEn('/productos')

    // 3 - Verificación (ASSERT)
    expect(await screen.findByText('Plan nutrición deportiva')).toBeInTheDocument()
    expect(screen.getAllByText('Ver detalles').length).toBe(4)
    expect(ProductoService.getAllProductos).toHaveBeenCalled()
  })

  it('PU-022: Debe mostrar un mensaje si el backend no responde', async () => {
    // 1 - Preparación (ARRANGE): el backend está apagado
    bd.fallar = true

    // 2 - Ejecución (ACT)
    renderizarEn('/productos')

    // 3 - Verificación (ASSERT)
    expect(await screen.findByText(/No se pudieron cargar los planes/)).toBeInTheDocument()
    await waitFor(() => expect(screen.queryByText('Ver detalles')).toBeNull())
  })
})
