import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { SeguroComponent } from './components/seguro/seguro.component';
import { PeritoComponent } from './components/perito/perito.component';
import { CompaniaSeguroComponent } from './components/compania-seguro/compania-seguro.component';
import { SiniestroComponent } from './components/siniestro/siniestro.component';
import { CompaniaComponent } from './components/compania/compania.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { CompaniaDetailComponent } from './components/compania/compania-detail/compania-detail.component';
import { SiniestroDetailComponent } from './components/siniestro/siniestro-detail/siniestro-detail.component';
import { CompaniaSeguroDetailComponent } from './components/compania-seguro/compania-seguro-detail/compania-seguro-detail.component';

const routes: Routes = [
  { path: 'client', component: UserComponent },
  { path: 'client/:id', component: UserDetailComponent },
  { path: 'seguro', component: SeguroComponent },
  { path: 'compania', component: CompaniaComponent },
  { path: 'compania/:id', component: CompaniaDetailComponent },
  { path: 'siniestro', component: SiniestroComponent },
  { path: 'siniestro/:id', component: SiniestroDetailComponent },
  { path: 'perito', component: PeritoComponent },
  { path: 'compania-seguro', component: CompaniaSeguroComponent },
  { path: 'compania-seguro/:id', component: CompaniaSeguroDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
