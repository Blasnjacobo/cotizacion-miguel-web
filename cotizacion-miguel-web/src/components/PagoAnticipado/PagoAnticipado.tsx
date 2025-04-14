import { usePagoAnticipado } from "./usePagoAnticipado"
import "./PagoAnticipado.scss";

export const PagoAnticipado = () => {

    const {
        FormPagoAnticipado,
        nuevoPrecio,
        pagoMes,
        abono,
        totalPendiente
    } = usePagoAnticipado()

    return (
        <section className="PagoAnticipado">
            <div className="PagoAnticipado__content">
                <div className="PagoAnticipado__content__container">
                    <FormPagoAnticipado.InputPrecioLista />
                    <FormPagoAnticipado.InputPagoInicial />
                    <section>
                        <p className="m-0">Nuevo Precio: </p>
                        <p className="m-0">${nuevoPrecio.toFixed(2)}</p>
                    </section>
                    <FormPagoAnticipado.InputPlazo />
                    <section>
                        <p className="m-0">Pago al Mes: </p>
                        <p className="m-0">${pagoMes.toFixed(2)}</p>
                    </section>
                    <FormPagoAnticipado.InputMesesPagando />
                    <section>
                        <p className="m-0">Abono: </p>
                        <p className="m-0">${abono.toFixed(2)}</p>
                    </section>
                </div>
                <div className="PagoAnticipado__content__total">
                    <section className="PagoAnticipado__content__total__container">
                        <h3 className="text-red-500 m-0">Total Pendiente</h3>
                        <p className="text-center">${totalPendiente.toFixed(2)}</p>
                    </section>
                </div>
            </div>
        </section>
    )
}