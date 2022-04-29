import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { CompaniaSeguroService } from '../../services/compania-seguro.service';
import { CompaniaSeguro } from '../../models/compania-seguro';
import { SeguroService } from '../../services/seguro.service';
import { CompaniaService } from '../../services/compania.service';
import { Compania } from '../../models/compania';
import { Seguro } from '../../models/seguro';
import { Router } from '@angular/router';
@Component({
  selector: 'app-compania-seguro',
  templateUrl: './compania-seguro.component.html',
  styleUrls: ['./compania-seguro.component.scss'],
  providers: [MessageService]
})
export class CompaniaSeguroComponent implements OnInit {

  constructor(private router: Router, private service: CompaniaSeguroService, private seguroService: SeguroService, private companiaservice: CompaniaService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig, private messageService: MessageService) { }

  items: CompaniaSeguro[] = [];
  seguros: any[] = []
  companias: any[] = []
  seguro: any;
  compania: any;
  item: CompaniaSeguro = new CompaniaSeguro();
  displayMaximizable: boolean = false;
  titulo = "Crear"
  state = "Creado"
  filtro: string = "id";
  sortOrder: number = 1;
  msgs: Message[] = [];
  totalRecords: number = 10;

  cols: any[] = [];

  loading: boolean = true;

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.items = []
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'nombreCompania', header: 'Nombre de Compañia' },
      { field: 'numeroPoliza', header: 'Numero de Poliza' },
    ];
  }
  cancelar() {
    this.item = new CompaniaSeguro();
    this.state = "Creado"
    this.titulo = "Crear"
    this.displayMaximizable = false;
  }
  obtener(event: any) {
    this.loading = true;
    this.filtro = event.sortField ? event.sortField : "id"
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

  editar(item: CompaniaSeguro) {
    this.item = item;
    this.titulo = "Editar"
    this.state = "Editado"
    this.companiaservice.buscarCompaniaPorId(item.nombreCompania).subscribe({
      next: (data: any) => {
        this.compania = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.seguroService.buscarSeguroPorPoliza(item.numeroPoliza).subscribe({
      next: (data: any) => {
        this.seguro = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.showMaximizableDialog()
  }

  obtenerSeguros() {
    this.seguroService.getAll().subscribe({
      next: (data: any) => {
        data.forEach((element: Seguro) => {
          this.seguros.push({ numeroPoliza: element.numeroPoliza });
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  obtenerCompanias() {
    this.companiaservice.getAllS().subscribe({
      next: (data: any) => {
        data.forEach((element: Compania) => {
          this.companias.push({ nombreCompania: element.nombreCompania });
        });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  eliminar(item: CompaniaSeguro) {
    this.service.delete(item.id).subscribe({
      next: () => {
        this.obtener({ first: 0, rows: 10, sortField: this.filtro, sortOrder: this.sortOrder });
        this.showMessage('success', 'Eliminado', `El objeto con el nombre: ${item.id} ha sido eliminado`);
      },
      error: () => {
        this.showMessage('error', 'Error', `No se ha podido eliminar el item`);
      }
    });
  }

  confirmarDelete(item: CompaniaSeguro) {
    this.confirmationService.confirm({
      message: '¿Esta seguro de querer eliminar el objeto?',
      header: 'Eliminar item con id: ' + item.id,
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
          this.showMessage('success', this.state, `El item ha sido ${this.state} con exito`);
          formulario.reset();
          this.state = "Creado"
          this.displayMaximizable = false;
        },
        error: (err) => {
          console.log(err);
          this.showMessage('error', 'Error', 'No se ha podido crear el item');
        }
      });
    }
  }

  showMaximizableDialog() {
    this.obtenerSeguros();
    this.obtenerCompanias();
    this.displayMaximizable = true;
  }

  select(event: any) {
    this.router.navigate(['/compania-seguro', event.data.id]);
  }

  selectDataSeguro(event: any) {
    this.seguroService.buscarSeguroPorPoliza(event.numeroPoliza).subscribe({
      next: (data: any) => {
        this.item.numeroPoliza = data.numeroPoliza;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  selectDataCompania(event: any) {
    this.companiaservice.buscarCompaniaPorId(event.nombreCompania).subscribe({
      next: (data: any) => {
        this.item.nombreCompania = data.nombreCompania;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

