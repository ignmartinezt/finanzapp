import BarraSuperior from './components/BarraSuperior'
import FormularioMovimiento from './components/FormularioMovimiento'

function App() {
  return (
    <div className="min-h-screen bg-fondo text-texto">
      <BarraSuperior />
      {/* el formulario queda centrado debajo de la barra */}
      <main className="flex items-center justify-center p-4">
        <FormularioMovimiento />
      </main>
    </div>
  )
}

export default App