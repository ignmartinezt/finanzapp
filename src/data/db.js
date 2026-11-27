import Dexie from 'dexie'

// crea la bdd en el navegador con el nombre 'finanzapp'
const db = new Dexie('finanzapp')


db.version(1).stores({
    movimientos: '++id, tipo, fecha, categoria',
})