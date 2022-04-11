import { Seguro } from "./seguro";

export class User {
    dniCl: number = 0;
    nombreCl: string = '';
    apellido1: string = '';
    apellido2: string = '';
    claseVia: string = '';
    nombreVia: string = '';
    numeroVia: string = '';
    codPostal: string = '';
    ciudad: string = '';
    telefono: string = '';
    observaciones: string = '';
    segurosList: Seguro[] = []

    constructor(dniCL: number, nombreCL: string, apellido1: string, apellido2: string, claseVia: string, nombreVia: string, numeroVia: string, codPostal: string, ciudad: string, telefono: string, observaciones: string) {
        this.dniCl = dniCL;
        this.nombreCl = nombreCL;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.claseVia = claseVia;
        this.nombreVia = nombreVia;
        this.numeroVia = numeroVia;
        this.codPostal = codPostal;
        this.ciudad = ciudad;
        this.telefono = telefono;
        this.observaciones = observaciones;
    }
}