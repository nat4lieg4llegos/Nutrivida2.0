import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import FormularioRegistro from './FormularioRegistro'

describe('FormularioRegistro', () => {
  it('PU-008: Debe rechazar un correo que no sea gmail, outlook o duocuc', () => {
    // 1 - Preparación (ARRANGE)
    render(
      <MemoryRouter>
        <FormularioRegistro />
      </MemoryRouter>
    )

    fireEvent.change(screen.getByLabelText('Nombre:'), { target: { value: 'Ana' } })
    fireEvent.change(screen.getByLabelText('Apellido:'), { target: { value: 'Rojas' } })
    fireEvent.change(screen.getByLabelText('RUT:'), { target: { value: '12.345.678-9' } })
    fireEvent.change(screen.getByLabelText('Fecha de nacimiento:'), { target: { value: '1990-05-10' } })
    fireEvent.change(screen.getByLabelText('Teléfono:'), { target: { value: '+56912345678' } })
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'ana@yahoo.com' } })
    fireEvent.change(screen.getByLabelText('Contraseña:'), { target: { value: 'Clave$123' } })
    fireEvent.change(screen.getByLabelText('Confirmar contraseña:'), { target: { value: 'Clave$123' } })
    fireEvent.change(screen.getByLabelText('Peso (kg):'), { target: { value: '65' } })
    fireEvent.change(screen.getByLabelText('Estatura (cm):'), { target: { value: '162' } })
    fireEvent.change(screen.getByLabelText('Objetivo nutricional:'), { target: { value: 'Bajar de peso' } })

    // 2 - Ejecución (ACT)
    fireEvent.click(screen.getByRole('button', { name: 'Registrar' }))

    // 3 - Verificación (ASSERT)
    expect(screen.getByRole('alert').textContent).toContain('@outlook.com, @gmail.com o @duocuc.cl')
  })
})
