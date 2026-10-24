import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import DetallePlan from './DetallePlan'
import { planes } from '../../data/planes'

describe('DetallePlan', () => {
  it('PU-005: Debe actualizar el total al aumentar la cantidad de sesiones', () => {
    // 1 - Preparación (ARRANGE)
    render(
      <MemoryRouter>
        <DetallePlan plan={planes[0]} onAgregarCarrito={() => {}} />
      </MemoryRouter>
    )

    // 2 - Ejecución (ACT)
    fireEvent.click(screen.getByRole('button', { name: 'Aumentar cantidad' }))

    // 3 - Verificación (ASSERT)
    expect(screen.getByText('$70.000')).toBeInTheDocument()
  })

  it('PU-007: Debe enviar el plan y la cantidad al carrito', () => {
    // 1 - Preparación (ARRANGE)
    const agregarMock = vi.fn()
    render(
      <MemoryRouter>
        <DetallePlan plan={planes[1]} onAgregarCarrito={agregarMock} />
      </MemoryRouter>
    )

    // 2 - Ejecución (ACT)
    fireEvent.click(screen.getByRole('button', { name: 'Aumentar cantidad' }))
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }))

    // 3 - Verificación (ASSERT)
    expect(agregarMock).toHaveBeenCalledWith(planes[1], 2)
  })

  it('PU-018: Debe mostrar la proteína en polvo como complemento del plan deportivo', () => {
    // 1 - Preparación (ARRANGE)
    const planDeportivo = planes[2]

    // 2 - Ejecución (ACT)
    render(
      <MemoryRouter>
        <DetallePlan plan={planDeportivo} onAgregarCarrito={() => {}} />
      </MemoryRouter>
    )

    // 3 - Verificación (ASSERT)
    expect(screen.getByText('Proteína en polvo (1 kg)')).toBeInTheDocument()
    expect(screen.getByText('$29.990')).toBeInTheDocument()
  })

  it('PU-019: Debe enviar el complemento al carrito con cantidad 1', () => {
    // 1 - Preparación (ARRANGE)
    const agregarMock = vi.fn()
    render(
      <MemoryRouter>
        <DetallePlan plan={planes[2]} onAgregarCarrito={agregarMock} />
      </MemoryRouter>
    )

    // 2 - Ejecución (ACT)
    fireEvent.click(screen.getByRole('button', { name: 'Agregar complemento' }))

    // 3 - Verificación (ASSERT)
    expect(agregarMock).toHaveBeenCalledWith(planes[2].complemento, 1)
  })

  it('PU-020: No debe mostrar complemento en un plan creado desde el Panel de Control', () => {
    // 1 - Preparación (ARRANGE)
    const planNuevo = { id: 99, nombre: 'Plan nuevo', descripcion: 'Plan de prueba', precio: 30000, imagen: '' }

    // 2 - Ejecución (ACT)
    render(
      <MemoryRouter>
        <DetallePlan plan={planNuevo} onAgregarCarrito={() => {}} />
      </MemoryRouter>
    )

    // 3 - Verificación (ASSERT)
    expect(screen.queryByRole('button', { name: 'Agregar complemento' })).not.toBeInTheDocument()
  })
})
