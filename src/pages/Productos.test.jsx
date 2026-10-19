import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Productos from './Productos'
import { planes } from '../data/planes'

describe('Productos', () => {
  it('PU-004: Debe filtrar los planes según el texto de búsqueda', () => {
    // 1 - Preparación (ARRANGE)
    render(
      <MemoryRouter>
        <Productos planes={planes} onVerDetalle={() => {}} />
      </MemoryRouter>
    )
    const buscador = screen.getByLabelText(/Buscar plan:/i)

    // 2 - Ejecución (ACT)
    fireEvent.change(buscador, { target: { value: 'deportiva' } })

    // 3 - Verificación (ASSERT)
    expect(screen.getByText('Plan nutrición deportiva')).toBeInTheDocument()
    expect(screen.queryByText('Plan de pérdida de peso')).toBeNull()
  })
})
