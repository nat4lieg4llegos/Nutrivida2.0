import DecoracionTitulo from '../atoms/DecoracionTitulo'
import IconoSvg from '../atoms/IconoSvg'
import ItemBeneficio from '../molecules/ItemBeneficio'
import TarjetaExtra from '../molecules/TarjetaExtra'
import imgPresentacion from '../../assets/img/hero-presentacion.png'

function SeccionPorQueElegir() {
  return (
    <section className="porque-elegir">
      <h2>¿Por qué elegir NutriVida?</h2>

      <DecoracionTitulo />

      <div className="porque-elegir__contenido">
        <div className="porque-elegir__lista">
          <ItemBeneficio
            titulo="Atención personalizada"
            texto="Cada plan se diseña según los objetivos, el historial y los indicadores de salud del paciente."
          >
            <IconoSvg>
              <circle cx="25" cy="17" r="8" />
              <path d="M9 48 C9 38 16 31 25 31 C34 31 41 38 41 48" />
              <path d="M45 35 C48 30 56 32 56 38 C56 44 45 51 45 51 C45 51 34 44 34 38 C34 32 42 30 45 35Z" />
            </IconoSvg>
          </ItemBeneficio>

          <ItemBeneficio
            titulo="Seguimiento continuo"
            texto="Sesiones periódicas para revisar el progreso real de cada paciente."
          >
            <IconoSvg>
              <rect x="15" y="14" width="34" height="42" rx="3" />
              <rect x="24" y="8" width="16" height="10" rx="2" />
              <path d="M22 29 L26 33 L33 25" />
              <path d="M22 42 L26 46 L33 38" />
              <line x1="37" y1="29" x2="43" y2="29" />
              <line x1="37" y1="42" x2="43" y2="42" />
            </IconoSvg>
          </ItemBeneficio>

          <ItemBeneficio
            titulo="Equipo profesional"
            texto="Nutricionistas especializados en distintas áreas de la salud y el rendimiento."
            sinBorde={true}
          >
            <IconoSvg>
              <circle cx="32" cy="17" r="7" />
              <circle cx="15" cy="24" r="6" />
              <circle cx="49" cy="24" r="6" />
              <path d="M22 52 V45 C22 35 26 29 32 29 C38 29 42 35 42 45 V52" />
              <path d="M6 52 V46 C6 37 10 32 16 32 C19 32 21 33 23 35" />
              <path d="M58 52 V46 C58 37 54 32 48 32 C45 32 43 33 41 35" />
            </IconoSvg>
          </ItemBeneficio>
        </div>

        <div className="porque-elegir__imagen-wrap">
          <img src={imgPresentacion} alt="Alimentación saludable NutriVida" />
        </div>
      </div>

      <p className="extra-titulo">Además en NutriVida te ofrecemos:</p>

      <div className="extra-ofrecemos">
        <TarjetaExtra titulo="Planes flexibles" texto="Opciones adaptadas a tu estilo de vida y necesidades.">
          <IconoSvg>
            <path d="M31 53 C31 34 40 19 56 12 C55 30 47 43 31 53Z" />
            <path d="M30 53 C29 39 21 29 9 24 C10 38 17 47 30 53Z" />
            <path d="M31 53 V28" />
          </IconoSvg>
        </TarjetaExtra>

        <TarjetaExtra titulo="Alimentación equilibrada" texto="Promovemos hábitos sostenibles y nutrición consciente.">
          <IconoSvg>
            <path d="M32 24 C22 18 12 24 12 37 C12 50 20 57 27 54 C30 53 34 53 37 54 C44 57 52 50 52 37 C52 24 42 18 32 24Z" />
            <path d="M32 23 V12" />
            <path d="M32 15 C37 8 45 8 49 10 C46 17 40 20 32 19" />
          </IconoSvg>
        </TarjetaExtra>

        <TarjetaExtra titulo="Bienestar integral" texto="Cuidamos tu cuerpo, mente y emociones.">
          <IconoSvg>
            <path d="M32 13 C39 22 39 31 32 39 C25 31 25 22 32 13Z" />
            <path d="M29 38 C18 38 10 32 7 22 C18 22 27 27 29 38Z" />
            <path d="M35 38 C46 38 54 32 57 22 C46 22 37 27 35 38Z" />
            <path d="M31 42 C21 42 14 47 11 54 C20 56 27 52 32 47" />
            <path d="M33 42 C43 42 50 47 53 54 C44 56 37 52 32 47" />
          </IconoSvg>
        </TarjetaExtra>

        <TarjetaExtra titulo="Compromiso contigo" texto="Estamos contigo en cada paso de tu transformación.">
          <IconoSvg>
            <path d="M32 53 C32 53 8 39 8 23 C8 12 22 8 32 20 C42 8 56 12 56 23 C56 39 32 53 32 53Z" />
          </IconoSvg>
        </TarjetaExtra>
      </div>

      <div className="cita-banner">
        <p>“Tu salud es tu mejor inversión, en NutriVida te ayudamos a lograrla.” ♡</p>
      </div>
    </section>
  )
}

export default SeccionPorQueElegir
