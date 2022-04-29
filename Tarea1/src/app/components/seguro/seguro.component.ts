import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, PrimeNGConfig, MessageService } from 'primeng/api';
import { Seguro } from 'src/app/models/seguro';
import { SeguroService } from '../../services/seguro.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-seguro',
  templateUrl: './seguro.component.html',
  styleUrls: ['./seguro.component.scss'],
  providers: [MessageService]
})
export class SeguroComponent implements OnInit {

  constructor(private service: UserService, private seguroService: SeguroService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig, private messageService: MessageService) { }
  clientes: any[] = [];
  seguros: Seguro[] = [];
  selectData: any;
  filtro: string = "numeroPoliza";
  displayMaximizable: boolean = false;
  sortOrder: number = 1;
  titulo = "Crear"
  state = "Creado"
  seguro: Seguro = {
    numeroPoliza: 0,
    ramo: '',
    fechaInicio: Date.now().toString().split('T')[0],
    fechaVencimiento: Date.now().toString().split('T')[0],
    condicionesParticulares: '',
    observaciones: '',
    dniCl: 0,
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
  cancelar() {
    this.seguro = new Seguro(0, '', Date.now().toString().split('T')[0], Date.now().toString().split('T')[0], '', '', 0);
    this.state = "Creado"
    this.titulo = "Crear"
    this.displayMaximizable = false;
    this.selectData = {};
  }
  obtenerSeguros(event: any) {
    this.loading = true;
    this.filtro = event.sortField ? event.sortField : "numeroPoliza"
    this.sortOrder = event.sortOrder
    this.seguroService.buscarSeguro(event.first / event.rows, event.rows, this.filtro, this.sortOrder).subscribe({
      next: (data: any) => {
        this.seguros = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editarSeguro(seguro: Seguro) {
    this.seguro = seguro;
    this.seguro.fechaInicio = seguro.fechaInicio.split('T')[0];
    this.seguro.fechaVencimiento = seguro.fechaVencimiento.split('T')[0];
    this.titulo = "Editar"
    this.state = "Editado"
    this.service.buscarUsuarioPorDni(seguro.dniCl).subscribe({
      next: (data: any) => {
        this.selectData = { dni: data.dniCl, detalle: `${data.dniCl} - ${data.nombreCl} ${data.apellido1} ${data.apellido2}` };
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.showMaximizableDialog()
  }

  obtenerClientes() {
    this.service.getAll().subscribe({
      next: (data: any) => {
        data.forEach((element: { dniCl: any; nombreCl: any; apellido1: any; apellido2: any; }) => {
          this.clientes.push({ dni: element.dniCl, detalle: `${element.dniCl} - ${element.nombreCl} ${element.apellido1} ${element.apellido2}` });
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  eliminarSeguro(seguro: Seguro) {
    this.seguroService.eliminarSeguro(seguro.numeroPoliza).subscribe({
      next: () => {
        this.obtenerSeguros({ first: 0, rows: 10, sortField: this.filtro, sortOrder: this.sortOrder });
        this.showMessage('success', 'Eliminado', `El Seguro con el Numero de Poliza: ${seguro.numeroPoliza} ha sido eliminado`);
      },
      error: (err) => {
        console.log(err);
        this.showMessage('error', 'Error', `No se ha podido eliminar el seguro`);
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
    });
  }

  enviarFormulario() {
    const formulario: any = document.getElementById('formClient');
    if (formulario.checkValidity() === false) {
      this.msgs = [{ severity: 'warn', summary: 'Error:', detail: 'Complete los datos para continuar' }];
    } else {
      this.seguroService.crearSeguro(this.seguro).subscribe({
        next: () => {
          this.obtenerSeguros({ first: 0, rows: 10, sortField: this.filtro, sortOrder: this.sortOrder });
          this.showMessage('success', this.state, `El Seguro ha sido ${this.state} con exito`);
          formulario.reset();
          this.state = "Creado"
          this.displayMaximizable = false;
        },
        error: () => {
          this.showMessage('error', 'Error', 'No se ha podido crear el Seguro');
        }
      });
    }
  }
  showMaximizableDialog() {
    this.obtenerClientes();
    this.displayMaximizable = true;
  }

  showMessage(type: string, summary: string, detail: string) {
    this.messageService.add({ key: 'tc', severity: type, summary: summary, detail: detail, life: 1500 });
  }

  selectDataItem(event: any) {
    this.seguro.dniCl = event.dni
  }
}
