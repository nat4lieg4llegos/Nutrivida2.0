import DecoracionTitulo from '../atoms/DecoracionTitulo'

function SeccionPresentacion() {
  return (
    <section className="presentacion">
      <h2>Vida sana, cuerpo sano, mente plena 💚</h2>

      <p>
        NutriVida es una clínica de nutrición y dietética fundada el año 2016 en Temuco.
        Contamos con un equipo de nutricionistas especializados que acompañan a cada paciente
        en su proceso: pérdida de peso, control de enfermedades metabólicas, nutrición deportiva
        y alimentación vegetariana o vegana.
      </p>

      <p>
        No se trata solo de comer distinto, sino de construir hábitos que se mantengan en el tiempo,
        con seguimiento profesional real y un plan hecho a la medida de cada paciente.
      </p>

      <DecoracionTitulo />
    </section>
  )
}

export default SeccionPresentacion
