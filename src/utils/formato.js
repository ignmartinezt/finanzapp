// da formato de pesos chilenos, por ejemplo 1500000 queda $1.500.000
export function formatearCLP(valor) {
  // si no hay nada escrito no muestra nada
  if (valor === '' || valor === null) return ''

  const numero = Number(valor)

  // en los negativos el signo va antes del $
  const signo = numero < 0 ? '-' : ''

  // useGrouping always pone los puntos incluso en numeros cortos
  return signo + '$' + new Intl.NumberFormat('es-CL', { useGrouping: 'always' }).format(Math.abs(numero))
}