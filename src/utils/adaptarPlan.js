import imgPerdidaPeso from '../assets/img/plan-perdida-peso.png'
import imgControlMetabolico from '../assets/img/plan-control-metabolico.png'
import imgNutricionDeportiva from '../assets/img/plan-nutricion-deportiva.png'
import imgVegano from '../assets/img/plan-vegano-vegetariano.png'
import { planes as planesLocales, imagenGenerica } from '../data/planes'

// El backend guarda solo el nombre del archivo de la imagen (ej: "plan-perdida-peso.png")
const imagenes = {
  'plan-perdida-peso.png': imgPerdidaPeso,
  'plan-control-metabolico.png': imgControlMetabolico,
  'plan-nutricion-deportiva.png': imgNutricionDeportiva,
  'plan-vegano-vegetariano.png': imgVegano
}

// Nombre de archivo que se envía al backend para los planes nuevos
export const archivoImagenGenerica = 'plan-generico.png'

// Convierte un producto del backend en un plan listo para mostrar en React
export function adaptarPlan(producto) {
  const planLocal = planesLocales.find((plan) => plan.id === producto.id)

  return {
    ...producto,
    archivoImagen: producto.imagen,
    imagen: imagenes[producto.imagen] || imagenGenerica,
    complemento: planLocal ? planLocal.complemento : null
  }
}
