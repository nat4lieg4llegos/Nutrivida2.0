import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import App from './App'

// Abre la aplicación directamente en una ruta
function renderizarEn(ruta) {
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <App />
    </MemoryRouter>
  )
}

describe('App (rutas, acceso privado y CRUD)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('PU-011: Debe bloquear el Panel de Control si no hay sesión', () => {
    // 1 - Preparación (ARRANGE): sin sesión en localStorage
    // 2 - Ejecución (ACT)
    renderizarEn('/panel')

    // 3 - Verificación (ASSERT)
    expect(screen.getByText('Acceso restringido')).toBeInTheDocument()
  })

  it('PU-012: Debe crear un plan nuevo desde el Panel de Control', () => {
    // 1 - Preparación (ARRANGE)
    localStorage.setItem('sesion', 'admin')
    renderizarEn('/panel')

    // 2 - Ejecución (ACT)
    fireEvent.change(screen.getByLabelText('Nombre del plan:'), { target: { value: 'Plan nutrición infantil' } })
    fireEvent.change(screen.getByLabelText('Precio por sesión:'), { target: { value: '30000' } })
    fireEvent.change(screen.getByLabelText(/Resumen/), { target: { value: 'Alimentación sana para niños y niñas.' } })
    fireEvent.change(screen.getByLabelText(/Descripción/), { target: { value: 'Plan pensado para mejorar los hábitos de alimentación en la infancia.' } })
    fireEvent.click(screen.getByRole('button', { name: 'Agregar plan' }))

    // 3 - Verificación (ASSERT)
    expect(screen.getByText('Plan nutrición infantil')).toBeInTheDocument()
    expect(screen.getByText('Planes del catálogo (5)')).toBeInTheDocument()
  })

  it('PU-013: Debe eliminar un plan desde el Panel de Control', () => {
    // 1 - Preparación (ARRANGE)
    localStorage.setItem('sesion', 'admin')
    renderizarEn('/panel')

    // 2 - Ejecución (ACT)
    fireEvent.click(screen.getAllByRole('button', { name: 'Eliminar' })[0])

    // 3 - Verificación (ASSERT)
    expect(screen.queryByText('Plan de pérdida de peso')).toBeNull()
    expect(screen.getByText('Planes del catálogo (3)')).toBeInTheDocument()
  })

  it('PU-014: Debe editar el precio de un plan desde el Panel de Control', () => {
    // 1 - Preparación (ARRANGE)
    localStorage.setItem('sesion', 'admin')
    renderizarEn('/panel')

    // 2 - Ejecución (ACT)
    fireEvent.click(screen.getAllByRole('button', { name: 'Editar' })[0])
    fireEvent.change(screen.getByLabelText('Precio por sesión:'), { target: { value: '39990' } })
    fireEvent.click(screen.getByRole('button', { name: 'Guardar cambios' }))

    // 3 - Verificación (ASSERT)
    expect(screen.getByText('$39.990')).toBeInTheDocument()
  })

  it('PU-015: Debe mostrar la página 404 en una ruta que no existe', () => {
    // 1 - Preparación (ARRANGE) + 2 - Ejecución (ACT)
    renderizarEn('/ruta-que-no-existe')

    // 3 - Verificación (ASSERT)
    expect(screen.getByText('Página no encontrada')).toBeInTheDocument()
  })

  it('PU-016: Debe agregar un plan al carrito y mostrar el total', () => {
    // 1 - Preparación (ARRANGE)
    renderizarEn('/producto')

    // 2 - Ejecución (ACT)
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }))
    fireEvent.click(screen.getByText('Carrito (1)'))

    // 3 - Verificación (ASSERT)
    expect(screen.getByText('Carrito de compras')).toBeInTheDocument()
    expect(screen.getAllByText('$35.000').length).toBeGreaterThan(0)
  })
})
