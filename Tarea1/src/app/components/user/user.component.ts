import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationService, Message, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }
  clients: User[] = [];
  titulo = "Crear"
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
      { field: 'claseVia', header: 'Clase de Via' },
      { field: 'nombreVia', header: 'Nombre de Via' },
      { field: 'numeroVia', header: 'Numero de Via' },
      { field: 'codPostal', header: 'Codigo Postal' },
      { field: 'ciudad', header: 'Ciudad' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'observaciones', header: 'Observaciones' }
    ];
  }

  obtenerClientes(event: any) {
    this.loading = true;
    this.userService.buscarUsuario(event.first / event.rows, event.rows).subscribe({
      next: (data: any) => {
        this.clients = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editarCliente(cliente: User) {
    this.client = cliente;
  }

  eliminarCliente(cliente: User) {
    this.userService.eliminarUsuario(cliente.dniCl).subscribe({
      next: (data: any) => {
        console.log(data);
        this.obtenerClientes({ first: 0, rows: 10 });
        this.msgs = [{ severity: 'success', summary: 'Eliminado', detail: 'El usuario con el DNI: ' + cliente.dniCl + ' ha sido eliminado' }];
      },
      error: (err) => {
        console.log(err);
        this.msgs = [{ severity: 'error', summary: 'Error', detail: 'No se ha podido eliminar el usuario' }];
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
      this.userService.crearUsuario(this.client).subscribe({
        next: (data: any) => {
          console.log(data);
          this.obtenerClientes({ first: 0, rows: 10 });
          this.msgs = [{ severity: 'success', summary: 'Creado', detail: 'El usuario ha sido creado con exito' }];
          formulario.reset();
        },
        error: (err) => {
          console.log(err);
          this.msgs = [{ severity: 'error', summary: 'Error', detail: 'No se ha podido crear el usuario' }];
        }
      });
    }
  }


}
