import { Perito } from './perito';
import { Seguro } from './seguro';
export class Siniestro {
    idSiniestro: number = 0;
    fechaSiniestro: string = '';
    causas: string = '';
    aceptado: string = '';
    indermizacion: string = '';
    perito: Perito;
    seguro: Seguro;

    constructor() {
        this.idSiniestro = 0;
        this.fechaSiniestro = '';
        this.causas = '';
        this.aceptado = '';
        this.indermizacion = '';
        this.perito = new Perito();
        this.seguro = new Seguro(0, '', '', '', '', '', 0);
    }
}