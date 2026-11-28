import { useState } from 'react'
import { categorias } from '../data/categorias'
import { agregarMovimiento } from '../data/movimientos'
import { formatearCLP } from '../utils/formato'

// estilo compartido por todos los campos del formulario
const estiloCampo =
    'rounded-lg p-3 bg-campo text-tinta font-semibold placeholder:font-medium placeholder:text-tinta/60 shadow-md focus:outline-none focus:ring-2 focus:ring-texto'


function FormularioMovimiento() {
    // un estado por cada campo del formulario
    const [tipo, setTipo] = useState('gasto')
    const [monto, setMonto] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [categoria, setCategoria] = useState('')

    // solo muestra las categorias que corresponden al tipo elegido
    const categoriasDelTipo = categorias.filter((c) => c.tipo === tipo)

    // al cambiar el tipo se limpia la categoria para que no quede una que no corresponde
    const cambiarTipo = (e) => {
        setTipo(e.target.value)
        setCategoria('')
    }

    const guardar = async (e) => {
        // evita que el formulario recargue la pagina
        e.preventDefault()

        // no guarda si el monto es cero o no hay categoria
        if (Number(monto) <= 0 || !categoria) return

        const movimiento = {
            tipo,
            monto: Number(monto),
            // fecha de hoy con hora local, en-CA da el formato AAAA-MM-DD
            fecha: new Date().toLocaleDateString('en-CA'),
            descripcion,
            categoria,
        }

        await agregarMovimiento(movimiento)

        // limpia el formulario despues de guardar
        setMonto('')
        setDescripcion('')
        setCategoria('')
    }


    return (
        <form onSubmit={guardar} className="flex flex-col gap-3 p-4">
            <select value={tipo} onChange={cambiarTipo} className={estiloCampo}>
                <option value="gasto">GASTO</option>
                <option value="ingreso">INGRESO</option>
            </select>

            <input
                type="text"
                inputMode="numeric"
                placeholder="MONTO"
                value={formatearCLP(monto)}
                onChange={(e) => setMonto(e.target.value.replace(/\D/g, '').replace(/^0+/, ''))} // solo permite numeros
                className={estiloCampo}
            />

            <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className={estiloCampo}            >
                <option value="">SELECCIONA UNA CATEGORÍA</option>
                {categoriasDelTipo.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.nombre}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="DESCRIPCIÓN"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className={estiloCampo}
            />

            <button
                type="submit"
                className="bg-acento text-tinta font-titulo font-bold text-sm rounded-lg p-3 shadow-md hover:brightness-110 transition"            >
                GUARDAR
            </button>
        </form>
    )
}

export default FormularioMovimiento