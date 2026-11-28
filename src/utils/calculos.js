import { categorias } from '../data/categorias'

// suma los ingresos y resta los gastos para saber cuanto queda
export function calcularDisponible(movimientos) {
  return movimientos.reduce((total, m) => {
    return m.tipo === 'ingreso' ? total + m.monto : total - m.monto
  }, 0)
}

// arma las porciones de la dona, una por categoria de gasto y otra con el disponible
export function armarDatosDona(movimientos) {
  const gastos = movimientos.filter((m) => m.tipo === 'gasto')

  // por cada categoria de gasto suma lo gastado
  const porciones = categorias
    .filter((c) => c.tipo === 'gasto')
    .map((c) => ({
      id: c.id,
      nombre: c.nombre,
      color: c.color,
      valor: gastos
        .filter((g) => g.categoria === c.id)
        .reduce((suma, g) => suma + g.monto, 0),
    }))
    // las categorias sin gastos no se dibujan
    .filter((p) => p.valor > 0)

  // el disponible nunca es negativo en la dona
  const disponible = Math.max(calcularDisponible(movimientos), 0)
  if (disponible > 0) {
    porciones.push({ id: 'disponible', nombre: 'Disponible', color: '#facc15', valor: disponible })
  }

  return porciones
}