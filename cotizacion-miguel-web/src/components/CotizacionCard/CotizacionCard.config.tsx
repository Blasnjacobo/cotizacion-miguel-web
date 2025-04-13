import { ConfigForm } from '../Form';
import { IFormCotizacion, IOptionsFormCotizacion } from './CotizacionCard.interface';

export const configFormCotizacion = ({
  optionsPlazo = [],
}: IOptionsFormCotizacion) =>
  ({
    plazo: {
      type: 'select',
      label: 'Plazo',
      name: 'plazo',
      options: optionsPlazo,
    },
    } as ConfigForm<IFormCotizacion>);
