import logo from '../assets/logo.png'

function BarraSuperior() {
    return (
        // barra pegada arriba con el logo a la izquierda
        <header className="sticky top-0 z-10 flex items-center bg-acento px-4 py-2 shadow-md">
            <img src={logo} alt="Logo FinanzApp" className="h-12" />
        </header>
    )
}

export default BarraSuperior