import { Options } from "../Form";

export interface IFormCotizacion {
    plan: number;
    plazo: number;
    precio: number;
    porcentajeInicial: number;
    control: number;
}

export interface IOptionsFormCotizacion {
    optionsPlazo: Options[]
}