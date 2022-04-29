import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: UserService) { }
  id: string | null = "";
  item: User = {
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
  totalRecords: number = 10;
  cols: any[] = [];

  loading: boolean = true;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.service.buscarUsuarioPorDni(Number(this.id)).subscribe({
        next: (data: any) => {
          this.item = data;
          this.totalRecords = data.segurosList.length;
          console.log(this.totalRecords);
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
      });
    }
  }
  back() {
    window.history.back();
  }
}
