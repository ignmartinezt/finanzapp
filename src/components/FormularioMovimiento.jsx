import { useState } from 'react'
import { categorias } from '../data/categorias'
import { agregarMovimiento } from '../data/movimientos'

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
            <select value={tipo} onChange={cambiarTipo} className="border rounded p-2">
                <option value="gasto">Gasto</option>
                <option value="ingreso">Ingreso</option>
            </select>

            <input
                type="text"
                inputMode="numeric"
                placeholder="Monto"
                value={monto}
                onChange={(e) => setMonto(e.target.value.replace(/\D/g, ''))} // solo permite numeros
                className="border rounded p-2"
            />

            <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="border rounded p-2"
            >
                <option value="">Selecciona una categoría</option>
                {categoriasDelTipo.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.nombre}
                    </option>
                ))}
            </select>

            <input
                type="text"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="border rounded p-2"
            />

            <button type="submit" className="bg-blue-600 text-white rounded p-2">
                Guardar
            </button>
        </form>
    )
}

export default FormularioMovimiento