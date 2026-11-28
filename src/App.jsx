import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import BarraSuperior from './components/BarraSuperior'
import DonaGastos from './components/DonaGastos'
import FormularioMovimiento from './components/FormularioMovimiento'
import ListaMovimientos from './components/ListaMovimientos'
import PanelMovimiento from './components/PanelMovimiento'
import PantallaSueldo from './components/PantallaSueldo'
import { obtenerCicloActual } from './data/movimientos'

function App() {
  // movimientos desde el ultimo sueldo, se actualiza sola
  const ciclo = useLiveQuery(obtenerCicloActual)

  // guarda si el panel de movimientos esta abierto
  const [panelAbierto, setPanelAbierto] = useState(false)

  let contenido = null

  if (ciclo && ciclo.length === 0) {
    // todavia no hay sueldo, se pide para iniciar el ciclo
    contenido = <PantallaSueldo />
  } else if (ciclo) {
    // hay ciclo activo, se muestra la dona, la lista y el boton para agregar
    contenido = (
      <>
        <DonaGastos ciclo={ciclo} />
        <ListaMovimientos />

        {/* boton flotante abajo a la derecha */}
        <button
          onClick={() => setPanelAbierto(true)}
          aria-label="Agregar movimiento"
          className="fixed bottom-6 right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-acento text-3xl font-bold text-tinta shadow-lg transition hover:brightness-110"
        >
          +
        </button>

        {/* el formulario ahora vive dentro del panel */}
        <PanelMovimiento abierto={panelAbierto} onCerrar={() => setPanelAbierto(false)}>
          <FormularioMovimiento />
        </PanelMovimiento>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-fondo text-texto">
      <BarraSuperior />
      <main className="flex flex-col items-center gap-4 p-4 pb-24">{contenido}</main>
    </div>
  )
}

export default App