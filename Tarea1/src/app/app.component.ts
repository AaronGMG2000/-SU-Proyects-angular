import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Tarea1';
  items: MenuItem[];
  constructor() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['home'],
        routerLinkActiveOptions: "{exact:true}"
      },
      {
        label: 'Clients',
        icon: 'pi pi-fw pi-users',
        routerLink: ['client'],
        routerLinkActiveOptions: "{exact:true}",
      },
      {
        label: 'Seguros',
        icon: 'pi pi-fw pi-shield',
        routerLink: ['seguro'],
        routerLinkActiveOptions: "{exact:true}",
      },
      {
        label: 'Compañias',
        icon: 'pi pi-fw pi-globe',
        routerLink: ['compania'],
        routerLinkActiveOptions: "{exact:true}",
      },
      {
        label: 'Peritos',
        icon: 'pi pi-fw pi-id-card',
        routerLink: ['perito'],
        routerLinkActiveOptions: "{exact:true}",
      },
      {
        label: 'Siniestros',
        icon: 'pi pi-fw pi-exclamation-triangle',
        routerLink: ['siniestro'],
        routerLinkActiveOptions: "{exact:true}",
      },
      {
        label: 'Compania-Seguro',
        icon: 'pi pi-fw pi-globe',
        routerLink: ['compania-seguro'],
        routerLinkActiveOptions: "{exact:true}",
      }
    ];
  }
}
