import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { armarDatosDona, calcularDisponible } from '../utils/calculos'
import { formatearCLP } from '../utils/formato'

// recibe el ciclo desde App y dibuja la dona
function DonaGastos({ ciclo }) {
    const datos = armarDatosDona(ciclo)
    const disponible = calcularDisponible(ciclo)

    // true cuando se gasto mas de lo que habia
    const sobregirado = disponible < 0

    return (
        <>
            <section className="relative h-64 w-full max-w-md">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={datos}
                            dataKey="valor"
                            nameKey="nombre"
                            innerRadius="65%"
                            outerRadius="90%"
                            paddingAngle={2}
                            stroke="none"
                        >
                            {/* una celda por porcion para darle su color */}
                            {datos.map((d) => (
                                <Cell key={d.id} fill={d.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                {/* texto del centro, encima de la dona */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-sm opacity-70">Disponible</p>
                    <p
                        className={`font-titulo text-xl font-bold ${sobregirado ? 'text-red-400' : ''}`}
                    >
                        {formatearCLP(disponible)}
                    </p>
                </div>
            </section>

            {/* aviso solo cuando se gasta mas de lo que hay */}
            {sobregirado && (
                <p className="text-center font-semibold text-red-400">
                    Te pasaste por {formatearCLP(Math.abs(disponible))}
                </p>
            )}
        </>
    )
}

export default DonaGastos