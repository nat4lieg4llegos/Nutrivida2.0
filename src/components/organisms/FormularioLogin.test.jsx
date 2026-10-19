import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import FormularioLogin from './FormularioLogin'

describe('FormularioLogin', () => {
  it('PU-009: Debe dar acceso de administrador con admin / admin', () => {
    // 1 - Preparación (ARRANGE)
    const iniciarSesionMock = vi.fn()
    render(
      <MemoryRouter>
        <FormularioLogin onIniciarSesion={iniciarSesionMock} />
      </MemoryRouter>
    )

    // 2 - Ejecución (ACT)
    fireEvent.change(screen.getByLabelText(/Usuario o correo/i), { target: { value: 'admin' } })
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'admin' } })
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    // 3 - Verificación (ASSERT)
    expect(iniciarSesionMock).toHaveBeenCalledWith('admin')
  })

  it('PU-010: Debe rechazar una contraseña incorrecta del administrador', () => {
    // 1 - Preparación (ARRANGE)
    const iniciarSesionMock = vi.fn()
    render(
      <MemoryRouter>
        <FormularioLogin onIniciarSesion={iniciarSesionMock} />
      </MemoryRouter>
    )

    // 2 - Ejecución (ACT)
    fireEvent.change(screen.getByLabelText(/Usuario o correo/i), { target: { value: 'admin' } })
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '1234' } })
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }))

    // 3 - Verificación (ASSERT)
    expect(iniciarSesionMock).not.toHaveBeenCalled()
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
