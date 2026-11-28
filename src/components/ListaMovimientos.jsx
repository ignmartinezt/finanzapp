import { useLiveQuery } from 'dexie-react-hooks'
import { categorias } from '../data/categorias'
import { formatearCLP } from '../utils/formato'
import { obtenerMovimientos, eliminarMovimiento } from '../data/movimientos'

function ListaMovimientos() {
    // se actualiza sola cada vez que cambia la tabla movimientos
    const movimientos = useLiveQuery(obtenerMovimientos)

    // pide confirmacion antes de borrar
    const eliminar = async (id) => {
        if (!window.confirm('¿Eliminar este movimiento?')) return
        await eliminarMovimiento(id)
    }

    // mientras carga, movimientos es undefined
    if (!movimientos) return null

    if (movimientos.length === 0) {
        return <p className="p-4 text-center opacity-70">TODAVIA NO HAY MOVIMIENTOS</p>
    }

    return (
        <ul className="flex w-full max-w-md flex-col gap-2 p-4">
            {movimientos.map((m) => {
                // busca el nombre de la categoria a partir de su id
                const categoria = categorias.find((c) => c.id === m.categoria)

                return (
                    <li
                        key={m.id}
                        className="flex items-center justify-between gap-3 rounded-lg bg-superficie p-3 shadow-md"
                    >
                        <div>
                            <p className="font-semibold">{categoria?.nombre}</p>
                            <p className="text-sm opacity-70">
                                {m.descripcion} · {m.fecha}
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <p
                                className={`font-bold ${m.tipo === 'ingreso' ? 'text-emerald-400' : 'text-red-400'
                                    }`}
                            >
                                {/* signo mas para ingresos y menos para gastos */}
                                {m.tipo === 'ingreso' ? '+' : '-'}
                                {formatearCLP(m.monto)}
                            </p>

                            <button
                                onClick={() => eliminar(m.id)}
                                aria-label="Eliminar movimiento"
                                className="text-xl leading-none opacity-60 hover:opacity-100"
                            >
                                ✕
                            </button>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default ListaMovimientos