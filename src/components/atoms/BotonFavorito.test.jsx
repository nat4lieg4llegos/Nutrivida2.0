import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import BotonFavorito from './BotonFavorito'

describe('BotonFavorito', () => {
  it('PU-002: Debe cambiar el texto a "En favoritos" al hacer clic', () => {
    // 1 - Preparación (ARRANGE)
    render(<BotonFavorito />)
    const boton = screen.getByRole('button')

    // 2 - Ejecución (ACT)
    fireEvent.click(boton)

    // 3 - Verificación (ASSERT)
    expect(boton.textContent).toContain('En favoritos')
  })

  it('PU-003: Debe volver a "Agregar a favoritos" al hacer clic dos veces', () => {
    // 1 - Preparación (ARRANGE)
    render(<BotonFavorito />)
    const boton = screen.getByRole('button')

    // 2 - Ejecución (ACT)
    fireEvent.click(boton)
    fireEvent.click(boton)

    // 3 - Verificación (ASSERT)
    expect(boton.textContent).toContain('Agregar a favoritos')
  })
})
