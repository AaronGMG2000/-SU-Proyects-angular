import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { PeritoService } from '../../services/perito.service';
import { Perito } from '../../models/perito';

@Component({
  selector: 'app-perito',
  templateUrl: './perito.component.html',
  styleUrls: ['./perito.component.scss'],
  providers: [MessageService]

})
export class PeritoComponent implements OnInit {

  constructor(private service: PeritoService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig, private messageService: MessageService) { }

  items: Perito[] = [];
  item: Perito = new Perito();
  displayMaximizable: boolean = false;
  titulo = "Crear"
  state = "Creado"
  filtro: string = "dniPerito";
  sortOrder: number = 1;
  msgs: Message[] = [];
  totalRecords: number = 10;

  cols: any[] = [];

  loading: boolean = true;

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.items = []
    this.cols = [
      { field: 'dniPerito', header: 'DNI' },
      { field: 'nombrePerito', header: 'Nombre' },
      { field: 'apellidoPerito1', header: 'Primer Apellido' },
      { field: 'apellidoPerito2', header: 'Segundo Apellido' },
      { field: 'telefonoContacto', header: 'Telefono de Contacto' },
      { field: 'telefonoOficina', header: 'Telefono de Oficina' },
      { field: 'claseVia', header: 'Clase de Via' },
      { field: 'nombreVia', header: 'Nombre de Via' },
      { field: 'numeroVia', header: '# Via' },
      { field: 'codPostal', header: 'Postal' },
      { field: 'ciudad', header: 'Ciudad' },
    ];
  }
  cancelar() {
    this.item = new Perito();
    this.state = "Creado"
    this.titulo = "Crear"
    this.displayMaximizable = false;
  }
  obtener(event: any) {
    this.loading = true;
    this.filtro = event.sortField ? event.sortField : "dniPerito"
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

  editar(item: Perito) {
    this.item = item;
    this.titulo = "Editar"
    this.state = "Editado"
    this.showMaximizableDialog()
  }

  eliminar(item: Perito) {
    this.service.delete(item.dniPerito).subscribe({
      next: () => {
        this.obtener({ first: 0, rows: 10, sortField: this.filtro, sortOrder: this.sortOrder });
        this.showMessage('success', 'Eliminado', `El Perito con el nombre: ${item.dniPerito} ha sido eliminado`);
      },
      error: () => {
        this.showMessage('error', 'Error', `No se ha podido eliminar al Perito`);
      }
    });
  }

  confirmarDelete(item: Perito) {
    this.confirmationService.confirm({
      message: '¿Esta seguro de querer eliminar al Perito?',
      header: 'Eliminar Perito con id: ' + item.dniPerito,
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
          this.showMessage('success', this.state, `El Perito ha sido ${this.state} con exito`);
          formulario.reset();
          this.state = "Creado"
          this.displayMaximizable = false;
        },
        error: (err) => {
          console.log(err);
          this.showMessage('error', 'Error', 'No se ha podido crear el Perito');
        }
      });
    }
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

}


