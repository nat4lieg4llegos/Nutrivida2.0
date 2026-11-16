import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import FormularioLogin from './FormularioLogin'
import AuthService from '../../services/AuthService'

// Backend simulado: solo admin / admin recibe un token; si no, responde 401
vi.mock('../../services/AuthService', () => ({
  default: {
    login: vi.fn((usuario, password) =>
      usuario === 'admin' && password === 'admin'
        ? Promise.resolve({ data: { token: 'token-de-prueba' } })
        : Promise.reject({ response: { status: 401 } })
    )
  }
}))

describe('FormularioLogin', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('PU-009: Debe dar acceso de administrador con admin / admin y guardar el token', async () => {
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
    await waitFor(() => expect(iniciarSesionMock).toHaveBeenCalledWith('admin'))
    expect(AuthService.login).toHaveBeenCalledWith('admin', 'admin')
    expect(localStorage.getItem('token')).toBe('token-de-prueba')
  })

  it('PU-010: Debe rechazar una contraseña incorrecta del administrador', async () => {
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
    expect(await screen.findByRole('alert')).toHaveTextContent('incorrectos')
    expect(iniciarSesionMock).not.toHaveBeenCalled()
    expect(localStorage.getItem('token')).toBeNull()
  })
})
