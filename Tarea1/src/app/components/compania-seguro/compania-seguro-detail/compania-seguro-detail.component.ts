import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeguroService } from '../../../services/seguro.service';
import { CompaniaSeguroService } from '../../../services/compania-seguro.service';
import { CompaniaService } from '../../../services/compania.service';
import { CompaniaSeguro } from '../../../models/compania-seguro';
import { Compania } from '../../../models/compania';


@Component({
  selector: 'app-compania-seguro-detail',
  templateUrl: './compania-seguro-detail.component.html',
  styleUrls: ['./compania-seguro-detail.component.scss']
})
export class CompaniaSeguroDetailComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private service: CompaniaSeguroService, private companiaService: CompaniaService, private seguroService: SeguroService) { }
  id: string | null = "";
  companiaSeguro: CompaniaSeguro = new CompaniaSeguro();
  seguro: any;
  compania: Compania = new Compania();

  loading: boolean = true;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.service.buscarCompaniaSeguroPorId(Number(this.id)).subscribe({
        next: (data: any) => {
          this.companiaSeguro = data;
          this.companiaService.buscarCompaniaPorId(data.nombreCompania).subscribe({
            next: (data2: any) => {
              this.compania = data2;
              this.seguroService.buscarSeguroPorPoliza(data.numeroPoliza).subscribe({
                next: (data3: any) => {
                  this.seguro = data3;
                  this.seguro.fechaInicio = data3.fechaInicio.split('T')[0];
                  this.seguro.fechaVencimiento = data3.fechaVencimiento.split('T')[0];
                }
              });
            }
          });
        }
      });
    }
  }
  back() {
    window.history.back();
  }
  view() {
    this.router.navigate(['/compania/' + this.compania.nombreCompania]);
  }
}
