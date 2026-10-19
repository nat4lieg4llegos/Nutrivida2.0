// Muestra las estrellas llenas y vacías según la cantidad (1 a 5)
function Estrellas({ cantidad, clase }) {
  return (
    <p className={clase}>
      {'★'.repeat(cantidad) + '☆'.repeat(5 - cantidad)}
    </p>
  )
}

export default Estrellas
