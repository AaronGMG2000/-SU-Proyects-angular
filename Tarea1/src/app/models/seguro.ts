export class Seguro {
    numeroPoliza: number = 0;
    ramo: string = '';
    fechaInicio: Date = new Date();
    fechaVencimiento: Date = new Date();
    condicionesParticulares: string = '';
    observaciones: string = '';
    dniCl: string = '';

    constructor(numeroPoliza: number, ramo: string, fechaInicio: Date, fechaVencimiento: Date, condicionesParticulares: string, observaciones: string, dniCl: string) {
        this.numeroPoliza = numeroPoliza;
        this.ramo = ramo;
        this.fechaInicio = fechaInicio;
        this.fechaVencimiento = fechaVencimiento;
        this.condicionesParticulares = condicionesParticulares;
        this.observaciones = observaciones;
        this.dniCl = dniCl;
    }
}