import { Card } from "..";
import "./CotizacionCard.scss";
import { useCotizacionCard } from "./useCotizacionCard";
export const CotizacionCard = () => {

  const {
    FormCotizacion
  } = useCotizacionCard()

  return (
    <section className="CotizacionCard">
        <Card className="CotizacionCard__container">
            <FormCotizacion.InputPlazo />
        </Card>
    </section>
  )
}