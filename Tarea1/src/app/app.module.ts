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
import { SeguroComponent } from './components/seguro/seguro.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    SeguroComponent
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
    MessagesModule


  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
