export class Seguro {
    numeroPoliza: number = 0;
    ramo: string = '';
    fechaInicio: string = "";
    fechaVencimiento: string = "";
    condicionesParticulares: string = '';
    observaciones: string = '';
    dniCl: number = 0;

    constructor(numeroPoliza: number, ramo: string, fechaInicio: string, fechaVencimiento: string, condicionesParticulares: string, observaciones: string, dniCl: number) {
        this.numeroPoliza = numeroPoliza;
        this.ramo = ramo;
        this.fechaInicio = fechaInicio;
        this.fechaVencimiento = fechaVencimiento;
        this.condicionesParticulares = condicionesParticulares;
        this.observaciones = observaciones;
        this.dniCl = dniCl;
    }
}