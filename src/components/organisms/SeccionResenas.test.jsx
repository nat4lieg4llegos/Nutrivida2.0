import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SeccionResenas from './SeccionResenas'
import { resenas } from '../../data/resenas'

describe('SeccionResenas', () => {
  it('PU-017: Debe mostrar la siguiente reseña al presionar la flecha derecha', () => {
    // 1 - Preparación (ARRANGE): pantalla de escritorio, se ven 3 reseñas
    render(<SeccionResenas resenas={resenas} />)
    const tarjetaFernanda = screen.getByText('Fernanda L.').closest('article')
    expect(tarjetaFernanda).not.toHaveClass('activa')

    // 2 - Ejecución (ACT)
    fireEvent.click(screen.getByRole('button', { name: 'Siguientes reseñas' }))

    // 3 - Verificación (ASSERT)
    expect(tarjetaFernanda).toHaveClass('activa')
    expect(screen.getByText('Camila R.').closest('article')).not.toHaveClass('activa')
  })
})
