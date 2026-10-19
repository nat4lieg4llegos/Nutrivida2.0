// Validaciones de la primera entrega (script.js), ahora como funciones reutilizables

export function esSoloLetras(texto) {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(texto)
}

export function esRutValido(rut) {
  return /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/.test(rut)
}

export function calcularEdad(fecha) {
  const nacimiento = new Date(fecha + 'T00:00:00')
  const fechaActual = new Date()

  let edad = fechaActual.getFullYear() - nacimiento.getFullYear()
  const diferenciaMes = fechaActual.getMonth() - nacimiento.getMonth()

  if (diferenciaMes < 0 || (diferenciaMes === 0 && fechaActual.getDate() < nacimiento.getDate())) {
    edad--
  }

  return edad
}

export function esTelefonoValido(telefono) {
  return /^\+569\d{8}$/.test(telefono)
}

export function esCorreoRegistroValido(correo) {
  return /^[^\s@]+@(gmail\.com|outlook\.com|duocuc\.cl)$/i.test(correo)
}

export function esCorreoValido(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)
}

export function esContrasenaSegura(contrasena) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@!%*?&()])[A-Za-z\d$@!%*?&()]{8,15}$/.test(contrasena)
}

export function esNumeroEnRango(valor, minimo, maximo) {
  const numero = Number(valor)
  return valor !== '' && !isNaN(numero) && numero >= minimo && numero <= maximo
}
