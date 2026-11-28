import { useLiveQuery } from 'dexie-react-hooks'
import BarraSuperior from './components/BarraSuperior'
import FormularioMovimiento from './components/FormularioMovimiento'
import ListaMovimientos from './components/ListaMovimientos'
import PantallaSueldo from './components/PantallaSueldo'
import { obtenerCicloActual } from './data/movimientos'
import DonaGastos from './components/DonaGastos'

function App() {
  // movimientos desde el ultimo sueldo, se actualiza sola
  const ciclo = useLiveQuery(obtenerCicloActual)

  let contenido = null

  if (ciclo && ciclo.length === 0) {
    // todavia no hay sueldo, se pide para iniciar el ciclo
    contenido = <PantallaSueldo />
  } else if (ciclo) {
    // hay ciclo activo, se muestra el disponible y la app normal
    contenido = (
      <>
        <section className="w-full max-w-md px-4 text-center">
          <DonaGastos ciclo={ciclo} />
          <FormularioMovimiento />
          <ListaMovimientos />
        </section>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-fondo text-texto">
      <BarraSuperior />
      <main className="flex flex-col items-center gap-4 p-4">{contenido}</main>
    </div>
  )
}

export default App