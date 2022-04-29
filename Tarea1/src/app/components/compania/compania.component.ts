import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Compania } from '../../models/compania';
import { CompaniaService } from '../../services/compania.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compania',
  templateUrl: './compania.component.html',
  styleUrls: ['./compania.component.scss'],
  providers: [MessageService]
})
export class CompaniaComponent implements OnInit {

  constructor(private router: Router, private service: CompaniaService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig, private messageService: MessageService) { }


  items: Compania[] = [];
  item: Compania = new Compania();
  displayMaximizable: boolean = false;
  titulo = "Crear"
  state = "Creado"
  filtro: string = "nombreCompania";
  sortOrder: number = 1;
  msgs: Message[] = [];
  totalRecords: number = 10;

  cols: any[] = [];

  loading: boolean = true;

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.items = []
    this.cols = [
      { field: 'nombreCompania', header: 'Nombre' },
      { field: 'claseVia', header: 'Clase Via' },
      { field: 'nombreVia', header: 'Nombre Via' },
      { field: 'numeroVia', header: '# Via' },
      { field: 'codPostal', header: 'Postal' },
      { field: 'telefonoContratacion', header: 'Tel. Contratación' },
      { field: 'telefonoSiniestros', header: 'Tel. Siniestros' },
      { field: 'notas', header: 'Notas' },
    ];
  }
  cancelar() {
    this.item = new Compania();
    this.state = "Creado"
    this.titulo = "Crear"
    this.displayMaximizable = false;
  }
  obtener(event: any) {
    this.loading = true;
    this.filtro = event.sortField ? event.sortField : "nombreCompania"
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

  editar(compania: Compania) {
    this.item = compania;
    this.titulo = "Editar"
    this.state = "Editado"
    this.showMaximizableDialog()
  }

  eliminar(compania: Compania) {
    this.service.delete(compania.nombreCompania).subscribe({
      next: () => {
        this.obtener({ first: 0, rows: 10, sortField: this.filtro, sortOrder: this.sortOrder });
        this.showMessage('success', 'Eliminado', `La compania con el nombre: ${compania.nombreCompania} ha sido eliminado`);
      },
      error: () => {
        this.showMessage('error', 'Error', `No se ha podido eliminar la Compañia`);
      }
    });
  }

  confirmarDelete(compania: Compania) {
    this.confirmationService.confirm({
      message: '¿Esta seguro de querer eliminar la Compañia?',
      header: 'Eliminar Compañia con nombre: ' + compania.nombreCompania,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eliminar(compania);
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
          this.showMessage('success', this.state, `La Compañia ha sido ${this.state} con exito`);
          formulario.reset();
          this.state = "Creado"
          this.displayMaximizable = false;
        },
        error: (err) => {
          console.log(err);
          this.showMessage('error', 'Error', 'No se ha podido crear la Compañia');
        }
      });
    }
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  select(event: any) {
    this.router.navigate(['/compania', event.data.nombreCompania]);
  }
}


