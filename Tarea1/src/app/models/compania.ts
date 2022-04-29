import { Seguro } from './seguro';
export class Compania {
    nombreCompania: string = '';
    claseVia: string = '';
    nombreVia: string = '';
    numeroVia: string = '';
    codPostal: string = '';
    telefonoContratacion: string = '';
    telefonoSiniestros: string = '';
    notas: string = '';
    seguros: Seguro[] = [];

    constructor() {
        this.nombreCompania = '';
        this.claseVia = '';
        this.nombreVia = '';
        this.numeroVia = '';
        this.codPostal = '';
        this.telefonoContratacion = '';
        this.telefonoSiniestros = '';
        this.notas = '';
        this.seguros = [];
    }
}