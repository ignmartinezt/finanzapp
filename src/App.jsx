import BarraSuperior from './components/BarraSuperior'
import FormularioMovimiento from './components/FormularioMovimiento'
import ListaMovimientos from './components/ListaMovimientos'

function App() {
  return (
    <div className="min-h-screen bg-fondo text-texto">
      <BarraSuperior />
      {/* el formulario queda centrado debajo de la barra */}
      <main className="flex flex-col items-center gap-4 p-4">
        <FormularioMovimiento />
        <ListaMovimientos />
      </main>
    </div>
  )
}

export default App