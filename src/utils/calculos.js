// suma los ingresos y resta los gastos para saber cuanto queda
export function calcularDisponible(movimientos) {
  return movimientos.reduce((total, m) => {
    return m.tipo === 'ingreso' ? total + m.monto : total - m.monto
  }, 0)
}