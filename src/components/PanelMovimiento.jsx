// panel que sube desde abajo, muestra lo que reciba como children
function PanelMovimiento({ abierto, onCerrar, children }) {
    return (
        <>
            {/* fondo oscuro, al tocarlo se cierra el panel */}
            <div
                onClick={onCerrar}
                className={`fixed inset-0 z-20 bg-black/60 transition-opacity ${abierto ? 'opacity-100' : 'pointer-events-none opacity-0'
                    }`}
            />

            {/* panel, cerrado queda fuera de la pantalla */}
            <div
                className={`fixed inset-x-0 bottom-0 z-30 mx-auto max-h-[90vh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-superficie p-4 shadow-2xl transition-transform duration-300 ${abierto ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                <div className="flex items-center justify-between">
                    <h2 className="font-titulo text-lg font-bold">Nuevo movimiento</h2>
                    <button
                        onClick={onCerrar}
                        aria-label="Cerrar panel"
                        className="text-2xl leading-none opacity-60 hover:opacity-100"
                    >
                        ✕
                    </button>
                </div>

                {children}
            </div>
        </>
    )
}

export default PanelMovimiento