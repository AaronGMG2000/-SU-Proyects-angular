import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { SiniestroService } from '../../services/siniestro.service';
import { Siniestro } from '../../models/siniestro';
import { PeritoService } from '../../services/perito.service';
import { SeguroService } from '../../services/seguro.service';
import { Seguro } from '../../models/seguro';
import { Perito } from '../../models/perito';
import { Router } from '@angular/router';
@Component({
  selector: 'app-siniestro',
  templateUrl: './siniestro.component.html',
  styleUrls: ['./siniestro.component.scss'],
  providers: [MessageService]
})
export class SiniestroComponent implements OnInit {

  constructor(private router: Router, private service: SiniestroService, private servicePerito: PeritoService, private seguroService: SeguroService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig, private messageService: MessageService) { }

  items: Siniestro[] = [];
  item: Siniestro = new Siniestro();
  seguros: any[] = []
  peritos: any[] = []
  seguro: any;
  perito: any;
  displayMaximizable: boolean = false;
  titulo = "Crear"
  state = "Creado"
  filtro: string = "idSiniestro";
  sortOrder: number = 1;
  msgs: Message[] = [];
  totalRecords: number = 10;

  cols: any[] = [];

  loading: boolean = true;

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.items = []
    this.cols = [
      { field: 'idSiniestro', header: 'ID' },
      { field: 'fechaSiniestro', header: 'Fecha del Siniestro' },
      { field: 'causas', header: 'Causas' },
      { field: 'aceptado', header: 'Aceptado' },
      { field: 'indermizacion', header: 'Indermización' },
      { field: 'perito', header: 'DNI Perito' },
      { field: 'seguro', header: 'Numero de Poliza' },
    ];
  }
  cancelar() {
    this.item = new Siniestro();
    this.state = "Creado"
    this.titulo = "Crear"
    this.displayMaximizable = false;
  }
  obtener(event: any) {
    this.loading = true;
    this.filtro = event.sortField ? event.sortField : "idSiniestro"
    this.sortOrder = event.sortOrder
    this.service.getAll(event.first / event.rows, event.rows, this.filtro, this.sortOrder).subscribe({
      next: (data: any) => {
        this.items = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  obtenerSeguros() {
    this.seguroService.getAll().subscribe({
      next: (data: any) => {
        data.forEach((element: Seguro) => {
          this.seguros.push({ 'numeroPoliza': element.numeroPoliza });
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  obtenerPeritos() {
    this.servicePerito.getAllS().subscribe({
      next: (data: any) => {
        data.forEach((element: Perito) => {
          this.peritos.push({ dniPerito: element.dniPerito, 'detalle': `${element.dniPerito} - ${element.nombrePerito} ${element.apellidoPerito1} ${element.apellidoPerito2}` });
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editar(item: Siniestro) {
    this.item = item;
    this.titulo = "Editar"
    this.state = "Editado"
    this.item.fechaSiniestro = item.fechaSiniestro.split('T')[0];
    this.servicePerito.buscarPeritoPorId(item.perito.dniPerito).subscribe({
      next: (data: any) => {
        this.perito = { dniPerito: data.dniPerito, 'detalle': `${data.dniPerito} - ${data.nombrePerito} ${data.apellidoPerito1} ${data.apellidoPerito2}` };
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.seguroService.buscarSeguroPorPoliza(item.seguro.numeroPoliza).subscribe({
      next: (data: any) => {
        this.seguro = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.showMaximizableDialog()
  }

  eliminar(item: Siniestro) {
    this.service.delete(item.idSiniestro).subscribe({
      next: () => {
        this.obtener({ first: 0, rows: 10, sortField: this.filtro, sortOrder: this.sortOrder });
        this.showMessage('success', 'Eliminado', `El Siniestro con el nombre: ${item.idSiniestro} ha sido eliminado`);
      },
      error: () => {
        this.showMessage('error', 'Error', `No se ha podido eliminar al Siniestro`);
      }
    });
  }

  confirmarDelete(item: Siniestro) {
    this.confirmationService.confirm({
      message: '¿Esta seguro de querer eliminar al Siniestro?',
      header: 'Eliminar Siniestro con id: ' + item.idSiniestro,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminar(item);
      }
    });
  }


  showMessage(type: string, summary: string, detail: string) {
    this.messageService.add({ key: 'tc', severity: type, summary: summary, detail: detail, life: 1500 });
  }
  enviarFormulario() {
    const formulario: any = document.getElementById('formClient');
    if (formulario.checkValidity() === false) {
      this.showMessage('warn', 'Error:', 'Complete los datos para continuar');
    } else {
      this.service.create(this.item).subscribe({
        next: () => {
          this.obtener({ first: 0, rows: 10, sortField: this.filtro, sortOrder: this.sortOrder });
          this.showMessage('success', this.state, `El Siniestro ha sido ${this.state} con exito`);
          formulario.reset();
          this.state = "Creado"
          this.displayMaximizable = false;
        },
        error: (err) => {
          console.log(err);
          this.showMessage('error', 'Error', 'No se ha podido crear el Siniestro');
        }
      });
    }
  }

  showMaximizableDialog() {
    this.obtenerPeritos();
    this.obtenerSeguros();
    this.displayMaximizable = true;
  }

  select(event: any) {
    this.router.navigate(['/siniestro', event.data.idSiniestro]);
  }
  selectDataItem(event: any) {
    this.seguroService.buscarSeguroPorPoliza(event.numeroPoliza).subscribe({
      next: (data: any) => {
        this.item.seguro = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  selectDataPerito(event: any) {
    this.servicePerito.buscarPeritoPorId(event.dniPerito).subscribe({
      next: (data: any) => {
        this.item.perito = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}


