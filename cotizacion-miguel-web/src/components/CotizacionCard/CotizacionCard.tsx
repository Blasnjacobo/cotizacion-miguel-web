import { Divider } from "primereact/divider";
import "./CotizacionCard.scss";
import { useCotizacionCard } from "./useCotizacionCard";
export const CotizacionCard = () => {

  const {
    FormCotizacion,
    pagoInicial,
    pagoEquipo,
    mensualidad,
    portabilidad
  } = useCotizacionCard()

  return (
    <section className="CotizacionCard">
        <div className="CotizacionCard__container">
          <section className="CotizacionCard__container__content">
            <FormCotizacion.InputPlan />
            <FormCotizacion.InputPlazo />
            <FormCotizacion.InputPrecio />
            <FormCotizacion.InputPorcentajeInicial />
            <div className="CotizacionCard__container__content__pagoInicial">
              <p className="m-0 font-bold underline">Pago Inicial: </p>
              <p className="m-0">${(pagoInicial).toFixed(2)}</p>
            </div>
          </section>
          <Divider layout="horizontal" />
          <section className="CotizacionCard__container__calculations">
            <div className="CotizacionCard__container__calculations__pagoEquipo">
              <p className="m-0 font-bold">PAGO DEL EQUIPO: </p>
              <p className="m-0">${(pagoEquipo).toFixed(2)}</p>
            </div>
            <FormCotizacion.InputControl />
            <div className="CotizacionCard__container__calculations__mensualidad">
              <p className="m-0 font-bold text-blue-500">Mensualidad: </p>
              <p className="m-0">${(mensualidad).toFixed(2)}</p>
            </div>
            <div className="CotizacionCard__container__calculations__portabilidad">
              <p className="m-0 font-bold text-green-500">Con Portabilidad:</p>
              <p className="m-0">${(portabilidad).toFixed(2)}</p>
            </div>
          </section>
        </div>
    </section>
  )
}