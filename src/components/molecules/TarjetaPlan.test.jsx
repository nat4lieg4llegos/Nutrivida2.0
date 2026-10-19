import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import TarjetaPlan from './TarjetaPlan'
import imgPerdidaPeso from '../../assets/img/plan-perdida-peso.png'

describe('TarjetaPlan', () => {
  it('PU-001: Debe mostrar el nombre y el precio formateado del plan', () => {
    // 1 - Preparación (ARRANGE)
    const planMock = {
      id: 1,
      imagen: imgPerdidaPeso,
      icono: '🌿',
      nombre: 'Plan de pérdida de peso',
      resumen: 'Enfocado en reducir grasa corporal.',
      precio: 35000
    }

    // 2 - Ejecución (ACT)
    render(
      <MemoryRouter>
        <TarjetaPlan {...planMock} onVerDetalle={() => {}} />
      </MemoryRouter>
    )

    // 3 - Verificación (ASSERT)
    expect(screen.getByText('Plan de pérdida de peso')).toBeInTheDocument()
    expect(screen.getByText('$35.000')).toBeInTheDocument()
  })
})
