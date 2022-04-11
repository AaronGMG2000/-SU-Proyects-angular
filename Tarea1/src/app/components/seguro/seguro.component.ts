import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';
import { Seguro } from 'src/app/models/seguro';
import { SeguroService } from '../../services/seguro.service';

@Component({
  selector: 'app-seguro',
  templateUrl: './seguro.component.html',
  styleUrls: ['./seguro.component.scss']
})
export class SeguroComponent implements OnInit {

  constructor(private seguroService: SeguroService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }
  seguros: Seguro[] = [];
  titulo = "Crear"
  seguro: Seguro = {
    numeroPoliza: 0,
    ramo: '',
    fechaInicio: new Date(),
    fechaVencimiento: new Date(),
    condicionesParticulares: '',
    observaciones: '',
    dniCl: '',
  };
  msgs: Message[] = [];
  totalRecords: number = 10;

  cols: any[] = [];

  loading: boolean = true;

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.seguros = []
    this.cols = [
      { field: 'dniCl', header: 'DNI' },
      { field: 'numeroPoliza', header: 'Poliza' },
      { field: 'ramo', header: 'Ramo' },
      { field: 'condicionesParticulares', header: 'Condiciones Particulares' },
      { field: 'observaciones', header: 'Observaciones' },
      { field: 'fechaInicio', header: 'Inicio' },
      { field: 'fechaVencimiento', header: 'Vencimiento' },
    ];
  }

  obtenerSeguros(event: any) {
    this.loading = true;
    this.seguroService.buscarSeguro(event.first / event.rows, event.rows).subscribe({
      next: (data: any) => {
        this.seguros = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editarSeguro(seguro: Seguro) {
    this.seguro = seguro;
  }

  eliminarSeguro(seguro: Seguro) {
    this.seguroService.eliminarSeguro(seguro.numeroPoliza).subscribe({
      next: (data: any) => {
        console.log(data);
        this.obtenerSeguros({ first: 0, rows: 10 });
        this.msgs = [{ severity: 'success', summary: 'Eliminado', detail: 'El Seguro con el Numero de Poliza: ' + seguro.numeroPoliza + ' ha sido eliminado' }];
      },
      error: (err) => {
        console.log(err);
        this.msgs = [{ severity: 'error', summary: 'Error', detail: 'No se ha podido eliminar el seguro' }];
      }
    });
  }

  confirmarDelete(seguro: Seguro) {
    this.confirmationService.confirm({
      message: '¿Esta seguro de querer eliminar el seguro?',
      header: 'Eliminar seguro con Numero de Poliza: ' + seguro.numeroPoliza,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarSeguro(seguro);
      },
      reject: () => {
        this.msgs = [{ severity: 'warn', summary: 'Respuesta:', detail: 'Acción cancelada' }];
      }
    });
  }

  enviarFormulario() {
    const formulario: any = document.getElementById('formClient');
    if (formulario.checkValidity() === false) {
      this.msgs = [{ severity: 'warn', summary: 'Error:', detail: 'Complete los datos para continuar' }];
    } else {
      this.seguroService.crearSeguro(this.seguro).subscribe({
        next: (data: any) => {
          console.log(data);
          this.obtenerSeguros({ first: 0, rows: 10 });
          this.msgs = [{ severity: 'success', summary: 'Creado', detail: 'El Seguro ha sido creado con exito' }];
          formulario.reset();
        },
        error: (err) => {
          console.log(err);
          this.msgs = [{ severity: 'error', summary: 'Error', detail: 'No se ha podido crear el Seguro' }];
        }
      });
    }
  }

}
