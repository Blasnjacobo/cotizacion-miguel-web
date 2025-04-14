import { ConfigForm } from '../Form';
import { IFormCotizacion, IOptionsFormCotizacion } from './CotizacionCard.interface';

export const configFormCotizacion = ({
  optionsPlazo = [],
}: IOptionsFormCotizacion) =>
  ({
    plan: {
        type: 'number',
        label: 'Plan',
        name: 'plan',
        props: {
            placeholder: 'Insertar cantidad',
            mode: "currency",
            currency: "USD" ,
            min: 0
          }
    },
    precio: {
        type: 'number',
        label: 'Precio',
        name: 'precio',
        props: {
            placeholder: 'Insertar cantidad',
            mode: "currency",
            currency: "USD" ,
            min:0
          }
    },
    porcentajeInicial: {
        type: 'number',
        label: 'Porcentaje inicial de pago',
        name: 'porcentajeInicial',
        props: {
            placeholder: 'Insertar cantidad a iniciar',
            suffix:" %",
            max: 100,
            min: 0
          }
    },
    plazo: {
      type: 'select',
      label: 'Plazo',
      name: 'plazo',
      options: optionsPlazo,
    },
    control: {
        type: 'number',
        label: 'Control',
        name: 'control',
        props: {
            placeholder: 'Insertar cantidad',
            mode: "currency",
            currency: "USD" ,
            classNameRoot: "Cotizacion__control",
            min:0
          }
    },
    } as ConfigForm<IFormCotizacion>);
