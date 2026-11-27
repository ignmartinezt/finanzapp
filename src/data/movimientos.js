import {db} from './db'


// guarda un mov nuevo y devuelve el id q le asigno la base

export async function agregarMovimiento(movimiento) {
    return await db.movimientos.add(movimiento)
}


// trae todos los movimientos de la base de datos, mas recientes primero

export async function obtenerMovimientos() {
    return await db.movimientos.orderBy('fecha').reverse().toArray()
}