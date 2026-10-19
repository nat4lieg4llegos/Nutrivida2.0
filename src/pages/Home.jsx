import { useState } from 'react'
import SeccionPorQueElegir from '../components/organisms/SeccionPorQueElegir'
import SeccionResenas from '../components/organisms/SeccionResenas'
import SeccionComenzar from '../components/organisms/SeccionComenzar'
import SeccionPresentacion from '../components/organisms/SeccionPresentacion'
import FormularioResena from '../components/organisms/FormularioResena'
import BotonWhatsapp from '../components/atoms/BotonWhatsapp'
import { resenas as resenasIniciales } from '../data/resenas'

function Home() {
  const [resenas, setResenas] = useState(resenasIniciales)

  // La reseña nueva se agrega al comienzo del carrusel
  const publicarResena = (nuevaResena) => {
    setResenas([nuevaResena, ...resenas])
  }

  return (
    <>
      <main>
        <SeccionPorQueElegir />
        <SeccionResenas resenas={resenas} />
        <SeccionComenzar />
        <SeccionPresentacion />
        <FormularioResena onPublicar={publicarResena} />
      </main>

      <BotonWhatsapp />
    </>
  )
}

export default Home
