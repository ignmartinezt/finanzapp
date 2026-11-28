export function formatearCLP(valor) {
    // si no hay nada escrito no muestra nada
    if (valor === '' || valor === null) return ''

    // useGrouping always pone los puntos de miles 
    return '$' + new Intl.NumberFormat('es-CL', { useGrouping: 'always'}).format(Number(valor))
}