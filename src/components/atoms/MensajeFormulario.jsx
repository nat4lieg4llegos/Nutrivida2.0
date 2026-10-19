// Muestra un mensaje de error o de éxito debajo de un formulario
function MensajeFormulario({ texto, tipo }) {
  if (texto === '') return null

  return (
    <p className={'mensaje-formulario mensaje-formulario--' + tipo} role="alert">
      {texto}
    </p>
  )
}

export default MensajeFormulario
