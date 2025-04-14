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
          }
    },
    } as ConfigForm<IFormPagoAnticipado>);
