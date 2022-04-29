import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { SeguroComponent } from './components/seguro/seguro.component';
import { TextComponent } from './components/utils/text/text.component';
import { TableComponent } from './components/utils/table/table.component';
import { DialogModule } from 'primeng/dialog';
import { ToolbarModule } from 'primeng/toolbar';
import { AutocompleteComponent } from './utils/autocomplete/autocomplete.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SiniestroComponent } from './components/siniestro/siniestro.component';
import { CompaniaComponent } from './components/compania/compania.component';
import { CompaniaSeguroComponent } from './components/compania-seguro/compania-seguro.component';
import { PeritoComponent } from './components/perito/perito.component';
import { CompaniaDetailComponent } from './components/compania/compania-detail/compania-detail.component';
import { SiniestroDetailComponent } from './components/siniestro/siniestro-detail/siniestro-detail.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { CompaniaSeguroDetailComponent } from './components/compania-seguro/compania-seguro-detail/compania-seguro-detail.component';
import { AccordionModule } from 'primeng/accordion';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    SeguroComponent,
    TextComponent,
    TableComponent,
    AutocompleteComponent,
    SiniestroComponent,
    CompaniaComponent,
    CompaniaSeguroComponent,
    PeritoComponent,
    CompaniaDetailComponent,
    SiniestroDetailComponent,
    UserDetailComponent,
    CompaniaSeguroDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    BrowserAnimationsModule,
    ScrollPanelModule,
    ConfirmDialogModule,
    MessagesModule,
    ToastModule,
    DialogModule,
    ToolbarModule,
    AutoCompleteModule,
    AccordionModule
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
