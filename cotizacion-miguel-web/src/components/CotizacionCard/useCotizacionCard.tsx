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
        plan: 0
      });
    }, 1000);
  }, []);

  const precio = Number(hookCotizacion.getValues("precio") ?? 0);
  const porcentajeInicial = Number(hookCotizacion.getValues("porcentajeInicial") ?? 0);
  const plazo = Number(hookCotizacion.getValues("plazo") ?? 1); // default to 1 to avoid division by zero
  const plan = Number(hookCotizacion.getValues("plan") ?? 0);
  const control = Number(hookCotizacion.getValues("control") ?? 0);
  
  const pagoInicial = precio * 0.01 * porcentajeInicial;
  const pagoEquipo = (precio - pagoInicial) / plazo;
  const mensualidad = plan + pagoEquipo + control;
  const portabilidad = (plan * 0.8) + pagoEquipo + control;

  return {
    FormCotizacion,
    hookCotizacion,
    pagoInicial,
    pagoEquipo,
    mensualidad,
    portabilidad
  }
}