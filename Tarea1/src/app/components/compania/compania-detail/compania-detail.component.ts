import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Compania } from '../../../models/compania';
import { CompaniaService } from '../../../services/compania.service';

@Component({
  selector: 'app-compania-detail',
  templateUrl: './compania-detail.component.html',
  styleUrls: ['./compania-detail.component.scss']
})
export class CompaniaDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: CompaniaService) { }
  id: string | null = "";
  item: Compania = new Compania();
  totalRecords: number = 10;
  cols: any[] = [];

  loading: boolean = true;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.service.buscarCompaniaPorId(this.id).subscribe({
        next: (data: any) => {
          this.item = data;
          this.totalRecords = data.seguros.length;
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
