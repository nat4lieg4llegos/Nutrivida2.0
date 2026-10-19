import imgPerdidaPeso from '../assets/img/plan-perdida-peso.png'
import imgControlMetabolico from '../assets/img/plan-control-metabolico.png'
import imgNutricionDeportiva from '../assets/img/plan-nutricion-deportiva.png'
import imgVegano from '../assets/img/plan-vegano-vegetariano.png'
import imgGenerica from '../assets/img/plan-generico.png'

// Imagen que se usa para los planes creados desde el Panel de Control
export const imagenGenerica = imgGenerica

export const planes = [
    {
      id: 1,
      imagen: imgPerdidaPeso,
      icono: '🌿',
      nombre: 'Plan de pérdida de peso',
      resumen: 'Enfocado en reducir grasa corporal de manera saludable y sostenible, sin dietas extremas.',
      descripcion: 'Programa nutricional enfocado en reducir grasa corporal de manera saludable y sostenible, evitando dietas extremas y adaptándose a las necesidades y estilo de vida de cada paciente.',
      precio: 35000
    },
    {
      id: 2,
      imagen: imgControlMetabolico,
      icono: '💧',
      nombre: 'Plan control metabólico',
      resumen: 'Orientado a pacientes que necesitan mejorar su alimentación y controlar condiciones como diabetes o hipertensión.',
      descripcion: 'Plan orientado a mejorar la alimentación y apoyar el control de condiciones como diabetes o hipertensión mediante recomendaciones nutricionales personalizadas.',
      precio: 40000
    },
    {
      id: 3,
      imagen: imgNutricionDeportiva,
      icono: '🏋️',
      nombre: 'Plan nutrición deportiva',
      resumen: 'Diseñado para mejorar el rendimiento físico, aumentar masa muscular y apoyar la recomposición corporal.',
      descripcion: 'Plan diseñado para mejorar el rendimiento físico, apoyar el aumento de masa muscular y favorecer la recomposición corporal de acuerdo con los objetivos de cada paciente.',
      precio: 45000
    },
    {
      id: 4,
      imagen: imgVegano,
      icono: '🌱',
      nombre: 'Plan alimentación vegana / vegetariana',
      resumen: 'Asesoría para llevar una alimentación basada en plantas de forma equilibrada, completa y segura.',
      descripcion: 'Asesoría nutricional enfocada en llevar una alimentación basada en plantas de forma equilibrada, completa y segura, cubriendo los nutrientes necesarios para una alimentación saludable.',
      precio: 38000
    }
  ]
