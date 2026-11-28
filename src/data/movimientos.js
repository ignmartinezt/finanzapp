import {db} from './db'


// guarda un mov nuevo y devuelve el id q le asigno la base

export async function agregarMovimiento(movimiento) {
    return await db.movimientos.add(movimiento)
}


// trae todos los movimientos de la base de datos, mas recientes primero

export async function obtenerMovimientos() {
    return await db.movimientos.orderBy('fecha').reverse().toArray()
}

// borra un movimiento segun su id
export async function eliminarMovimiento(id) {
    await db.movimientos.delete(id)
}

// trae los movimientos desde el ultimo sueldo hasta hoy
// si todavia no hay ningun sueldo devuelve una lista vacia
export async function obtenerCicloActual() {
  // orderBy id deja los movimientos en el orden en que se registraron
    const todos = await db.movimientos.orderBy('id').toArray()

  // posicion del ultimo sueldo, -1 si no hay ninguno
    const indice = todos.findLastIndex((m) => m.categoria === 'sueldo')
    if (indice === -1) return []

  // desde el sueldo hasta el final
    return todos.slice(indice)
}