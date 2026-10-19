// Convierte 35000 en "$35.000"
export function formatearPrecio(numero) {
  return '$' + numero.toLocaleString('es-CL')
}
