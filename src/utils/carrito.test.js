import { describe, it, expect } from 'vitest'
import { calcularTotal } from './carrito'

describe('calcularTotal', () => {
  it('PU-006: Debe sumar precio por cantidad de cada plan del carrito', () => {
    // 1 - Preparación (ARRANGE)
    const carritoMock = [
      { id: 1, nombre: 'Plan de pérdida de peso', precio: 35000, cantidad: 2 },
      { id: 3, nombre: 'Plan nutrición deportiva', precio: 45000, cantidad: 1 }
    ]

    // 2 - Ejecución (ACT)
    const total = calcularTotal(carritoMock)

    // 3 - Verificación (ASSERT)
    expect(total).toBe(115000)
  })
})
