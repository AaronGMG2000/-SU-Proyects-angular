import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiniestroService } from '../../../services/siniestro.service';
import { Siniestro } from '../../../models/siniestro';
import { PeritoService } from '../../../services/perito.service';
import { SeguroService } from '../../../services/seguro.service';
import { Seguro } from '../../../models/seguro';
import { Perito } from '../../../models/perito';

@Component({
  selector: 'app-siniestro-detail',
  templateUrl: './siniestro-detail.component.html',
  styleUrls: ['./siniestro-detail.component.scss']
})
export class SiniestroDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: SiniestroService, private peritoService: PeritoService, private seguroService: SeguroService) { }
  id: string | null = "";
  siniestro: Siniestro = new Siniestro();
  seguro: any;
  perito: Perito = new Perito();

  loading: boolean = true;
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.service.buscarSiniestroPorId(Number(this.id)).subscribe({
        next: (data: any) => {
          this.siniestro = data;
          this.siniestro.fechaSiniestro = data.fechaSiniestro.split('T')[0]
          this.seguro = data.seguro;
          this.seguro.fechaInicio = data.seguro.fechaInicio.split('T')[0];
          this.seguro.fechaVencimiento = data.seguro.fechaVencimiento.split('T')[0];
          this.perito = data.perito;
        }
      });
    }
  }
  back() {
    window.history.back();
  }
}
