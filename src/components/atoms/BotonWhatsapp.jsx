function BotonWhatsapp() {
  return (
    <div className="whatsapp-flotante">
      <span className="whatsapp-flotante__mensaje">¿Te ayudo?</span>

      <a
        href="https://wa.me/56912345678"
        target="_blank"
        rel="noreferrer"
        className="boton-whatsapp"
        aria-label="Chatear por WhatsApp"
      >
        💬
      </a>
    </div>
  )
}

export default BotonWhatsapp
