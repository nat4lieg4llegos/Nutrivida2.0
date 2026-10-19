// Suma el subtotal (precio x cantidad) de cada plan del carrito
export function calcularTotal(carrito) {
  let total = 0

  carrito.forEach((item) => {
    total = total + item.precio * item.cantidad
  })

  return total
}
