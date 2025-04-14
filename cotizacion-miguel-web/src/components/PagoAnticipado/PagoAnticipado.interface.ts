import { Options } from "../Form";

export interface IFormPagoAnticipado {
    precioLista: number;
    plazo: number;
    pagoInicial: number;
    mesesPagando: number;
}

export interface IOptionsFormPagoAnticipado {
    optionsPlazo: Options[]
}