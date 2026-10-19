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
})
