// Contenedor común de los íconos de línea verde de la página de inicio
function IconoSvg({ children }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="#4a653a"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

export default IconoSvg
