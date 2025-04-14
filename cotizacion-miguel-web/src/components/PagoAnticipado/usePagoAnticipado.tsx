import { useEffect, useMemo, useState } from "react";
import { IFormPagoAnticipado, IOptionsFormPagoAnticipado } from "./PagoAnticipado.interface";
import { configFormPagoAnticipado } from "./PagoAnticipado.config";
import { useFormBuilder } from "./../Form";

export const usePagoAnticipado = () => {
    const [optionsFormPagoAnticipado, setOptionsFormPagoAnticipado] = useState<Omit<IOptionsFormPagoAnticipado, 'isReadOnly'>>({
    optionsPlazo: [],
    });

    useEffect(() => {
    setTimeout(() => {
        setOptionsFormPagoAnticipado({
        ...optionsFormPagoAnticipado,
        optionsPlazo: [
            { name: '24 Pagos', value: 24 },
            { name: '30 Pagos', value: 30 },
            { name: '36 Pagos', value: 36 }
        ],
        });
    }, 1000);
    }, []);

      const configFormPagoAnticipadoWithOptions = useMemo(
        () =>
          configFormPagoAnticipado({
            ...optionsFormPagoAnticipado,
          }),
        [optionsFormPagoAnticipado]
      );

        const {
          Form: FormPagoAnticipado,
          setAllValues: setAllValuesPagoAnticipado,
          hookForm: hookPagoAnticipado,
        } = useFormBuilder<IFormPagoAnticipado>({
          configForm: configFormPagoAnticipadoWithOptions,
          isReadOnly: false,
        });

        useEffect(() => {
            setTimeout(() => {
              setAllValuesPagoAnticipado({
                plazo: 24,
              });
            }, 1000);
          }, []);

          const precioLista = Number(hookPagoAnticipado.getValues("precioLista") ?? 0);
          const pagoInicial = Number(hookPagoAnticipado.getValues("pagoInicial") ?? 0);
          const plazo = Number(hookPagoAnticipado.getValues("plazo") ?? 1);
          const mesesPagando = Number(hookPagoAnticipado.getValues("mesesPagando") ?? 0);

          const nuevoPrecio = precioLista - pagoInicial;
          const pagoMes = nuevoPrecio / plazo;
          const abono = pagoMes * mesesPagando;
          const totalPendiente = precioLista - abono - pagoInicial;

        return {
            FormPagoAnticipado,
            nuevoPrecio,
            pagoMes,
            abono,
            totalPendiente
        }
}