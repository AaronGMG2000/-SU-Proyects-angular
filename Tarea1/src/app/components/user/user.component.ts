import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService]
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private service: UserService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig, private messageService: MessageService) { }

  clients: User[] = [];
  displayMaximizable: boolean = false;

  titulo = "Crear"
  state = "Creado"
  filtro: string = "dniCl";
  sortOrder: number = 1;
  client: User = {
    dniCl: 0,
    nombreCl: '',
    apellido1: '',
    apellido2: '',
    claseVia: '',
    nombreVia: '',
    numeroVia: '',
    codPostal: '',
    ciudad: '',
    telefono: '',
    observaciones: '',
    segurosList: []
  };
  msgs: Message[] = [];
  totalRecords: number = 10;

  cols: any[] = [];

  loading: boolean = true;

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.clients = []
    this.cols = [
      { field: 'dniCl', header: 'DNI' },
      { field: 'nombreCl', header: 'Nombre' },
      { field: 'apellido1', header: 'Primer Apellido' },
      { field: 'apellido2', header: 'Segundo Apellido' },
      { field: 'claseVia', header: 'Clase' },
      { field: 'nombreVia', header: 'Via' },
      { field: 'numeroVia', header: 'No. Via' },
      { field: 'codPostal', header: 'Postal' },
      { field: 'ciudad', header: 'Ciudad' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'observaciones', header: 'Observacion' }
    ];
  }
  cancelar() {
    this.client = new User(0, '', '', '', '', '', '', '', '', '', '');
    this.state = "Creado"
    this.titulo = "Crear"
    this.displayMaximizable = false;
  }
  obtenerClientes(event: any) {
    this.loading = true;
    this.filtro = event.sortField ? event.sortField : "dniCl"
    this.sortOrder = event.sortOrder
    this.service.buscarUsuario(event.first / event.rows, event.rows, this.filtro, this.sortOrder).subscribe({
      next: (data: any) => {
        this.clients = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editarCliente(cliente: User) {
    this.client = cliente;
    this.titulo = "Editar"
    this.state = "Editado"
    this.showMaximizableDialog()
  }

  eliminarCliente(cliente: User) {
    this.service.eliminarUsuario(cliente.dniCl).subscribe({
      next: () => {
        this.obtenerClientes({ first: 0, rows: 10, sortField: this.filtro, sortOrder: this.sortOrder });
        this.showMessage('success', 'Eliminado', `El usuario con el DNI: ${cliente.dniCl} ha sido eliminado`);
      },
      error: () => {
        this.showMessage('error', 'Error', `No se ha podido eliminar el usuario`);
      }
    });
  }

  confirmarDelete(cliente: User) {
    this.confirmationService.confirm({
      message: '¿Esta seguro de querer eliminar al usuario?',
      header: 'Eliminar usuario con DNI: ' + cliente.dniCl,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminarCliente(cliente);
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
      this.service.crearUsuario(this.client).subscribe({
        next: () => {
          this.obtenerClientes({ first: 0, rows: 10, sortField: this.filtro, sortOrder: this.sortOrder });
          this.showMessage('success', this.state, `El usuario ha sido ${this.state} con exito`);
          formulario.reset();
          this.state = "Creado"
          this.displayMaximizable = false;
        },
        error: (err) => {
          console.log(err);
          this.showMessage('error', 'Error', 'No se ha podido crear el usuario');
        }
      });
    }
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  select(event: any) {
    this.router.navigate(['/client', event.data.dniCl]);
  }
}
