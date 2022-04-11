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
        icon: 'pi pi-fw pi-users',
        routerLink: ['seguro'],
        routerLinkActiveOptions: "{exact:true}",
      }
    ];
  }
}
