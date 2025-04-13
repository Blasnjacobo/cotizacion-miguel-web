import { useEffect, useMemo, useState } from "react";
import { IFormCotizacion, IOptionsFormCotizacion } from "./CotizacionCard.interface";
import { configFormCotizacion } from "./CotizacionCard.config";
import { useFormBuilder } from "../Form";

export const useCotizacionCard = () => {
  const [optionsFormCotizacion, setOptionsFormCotizacion] = useState<Omit<IOptionsFormCotizacion, 'isReadOnly'>>({
    optionsPlazo: [],
  });

  useEffect(() => {
    setTimeout(() => {
      setOptionsFormCotizacion({
        ...optionsFormCotizacion,
        optionsPlazo: [
          { name: '24 Pagos', value: 24 },
          { name: '30 Pagos', value: 30 },
          { name: '36 Pagos', value: 36 }
        ],
      });
    }, 1000);
  }, []);

  const configFormCotizacionWithOptions = useMemo(
    () =>
      configFormCotizacion({
        ...optionsFormCotizacion,
      }),
    [optionsFormCotizacion]
  );

  const {
    Form: FormCotizacion,
    setAllValues: setAllValuesCotizacion,
    hookForm: hookCotizacion,
  } = useFormBuilder<IFormCotizacion>({
    configForm: configFormCotizacionWithOptions,
    isReadOnly: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setAllValuesCotizacion({
        plazo: 24,
      });
    }, 1000);
  }, []);

  console.log(hookCotizacion)
  return {
    FormCotizacion
  }
}