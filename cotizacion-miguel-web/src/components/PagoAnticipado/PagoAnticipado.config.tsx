import { ConfigForm } from '../Form';
import { IFormPagoAnticipado, IOptionsFormPagoAnticipado } from './PagoAnticipado.interface';

export const configFormPagoAnticipado = ({
  optionsPlazo = [],
}: IOptionsFormPagoAnticipado) =>
  ({
    precioLista: {
        type: 'number',
        label: 'Precio lista',
        name: 'precioLista',
        props: {
            placeholder: 'Insertar cantidad',
            mode: "currency",
            currency: "USD" ,
            min: 0
          }
    },
    pagoInicial: {
        type: 'number',
        label: 'Pago Inicial',
        name: 'pagoInicial',
        props: {
            placeholder: 'Insertar cantidad',
            mode: "currency",
            currency: "USD" ,
            min: 0
          }
    },
    plazo: {
      type: 'select',
      label: 'Plazo',
      name: 'plazo',
      options: optionsPlazo,
    },
    mesesPagando: {
        type: 'number',
        label: 'Meses Pagando',
        name: 'mesesPagando',
        props: {
            placeholder: 'Insertar cantidad',
            min: 0
          }
    },
    } as ConfigForm<IFormPagoAnticipado>);
