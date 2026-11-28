import { useState } from 'react'
import { agregarMovimiento } from '../data/movimientos'
import { formatearCLP } from '../utils/formato'

// mismo estilo de campo que el formulario, despues lo juntamos en un solo lugar
const estiloCampo =
    'rounded-lg p-3 bg-campo text-tinta font-semibold placeholder:font-medium placeholder:text-tinta/60 shadow-md focus:outline-none focus:ring-2 focus:ring-texto'

function PantallaSueldo() {
    const [monto, setMonto] = useState('')

    const guardarSueldo = async (e) => {
        // evita que el formulario recargue la pagina
        e.preventDefault()

        // no guarda un sueldo en cero
        if (Number(monto) <= 0) return

        // el sueldo es un ingreso con categoria sueldo, y eso inicia el ciclo
        await agregarMovimiento({
            tipo: 'ingreso',
            monto: Number(monto),
            fecha: new Date().toLocaleDateString('en-CA'),
            descripcion: 'Sueldo',
            categoria: 'sueldo',
        })

        setMonto('')
    }

    return (
        <form onSubmit={guardarSueldo} className="flex w-full max-w-md flex-col gap-4 p-4">
            <h1 className="font-titulo text-2xl font-bold">INGRESA TU SUELDO</h1>

            <input
                type="text"
                inputMode="numeric"
                placeholder="Monto"
                value={formatearCLP(monto)}
                onChange={(e) => setMonto(e.target.value.replace(/\D/g, '').replace(/^0+/, ''))}
                className={estiloCampo}
            />

            <button
                type="submit"
                className="bg-acento text-tinta font-titulo font-bold text-sm rounded-lg p-3 shadow-md hover:brightness-110 transition"
            >
                AGREGAR SUELDO
            </button>
        </form>
    )
}

export default PantallaSueldo