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
      precio: 35000,
      complemento: {
        id: 'complemento-1',
        icono: '🍃',
        nombre: 'Endulzante de stevia en polvo (250 g)',
        descripcion: 'Endulzante natural sin calorías, para reemplazar el azúcar en bebidas y preparaciones sin dejar de disfrutar el sabor dulce.',
        precio: 5990
      }
    },
    {
      id: 2,
      imagen: imgControlMetabolico,
      icono: '💧',
      nombre: 'Plan control metabólico',
      resumen: 'Orientado a pacientes que necesitan mejorar su alimentación y controlar condiciones como diabetes o hipertensión.',
      descripcion: 'Plan orientado a mejorar la alimentación y apoyar el control de condiciones como diabetes o hipertensión mediante recomendaciones nutricionales personalizadas.',
      precio: 40000,
      complemento: {
        id: 'complemento-2',
        icono: '🥜',
        nombre: 'Mix de frutos secos sin azúcar (500 g)',
        descripcion: 'Colación de bajo índice glicémico, rica en grasas saludables y fibra, para mantener estable la energía entre comidas.',
        precio: 8990
      }
    },
    {
      id: 3,
      imagen: imgNutricionDeportiva,
      icono: '🏋️',
      nombre: 'Plan nutrición deportiva',
      resumen: 'Diseñado para mejorar el rendimiento físico, aumentar masa muscular y apoyar la recomposición corporal.',
      descripcion: 'Plan diseñado para mejorar el rendimiento físico, apoyar el aumento de masa muscular y favorecer la recomposición corporal de acuerdo con los objetivos de cada paciente.',
      precio: 45000,
      complemento: {
        id: 'complemento-3',
        icono: '💪',
        nombre: 'Proteína en polvo (1 kg)',
        descripcion: 'Proteína sabor vainilla, para apoyar la recuperación muscular después del entrenamiento.',
        precio: 29990
      }
    },
    {
      id: 4,
      imagen: imgVegano,
      icono: '🌱',
      nombre: 'Plan alimentación vegana / vegetariana',
      resumen: 'Asesoría para llevar una alimentación basada en plantas de forma equilibrada, completa y segura.',
      descripcion: 'Asesoría nutricional enfocada en llevar una alimentación basada en plantas de forma equilibrada, completa y segura, cubriendo los nutrientes necesarios para una alimentación saludable.',
      precio: 38000,
      complemento: {
        id: 'complemento-4',
        icono: '🌾',
        nombre: 'Carne de soya texturizada (500 g)',
        descripcion: 'Proteína vegetal que reemplaza la carne en preparaciones como guisos, salsas o hamburguesas caseras.',
        precio: 4990
      }
    }
  ]
