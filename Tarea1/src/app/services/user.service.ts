import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError, } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URI = environment.urlService + "cliente/";


  constructor(private http: HttpClient) { }

  consumeGet(url: string) {
    return this.http.get<any>(this.API_URI + url).pipe(
      catchError(err => this.manejarError(err))
    );
  }

  consumePost(url: string, body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<any>(this.API_URI + url, body, httpOptions).pipe(
      catchError(err => this.manejarError(err))
    );
  }

  consumeDelete(url: string) {
    return this.http.delete<any>(this.API_URI + url).pipe(
      catchError(err => this.manejarError(err))
    );
  }


  manejarError(error: any) {
    return throwError(() => error);
  }

  buscarUsuario(pagina: number, tamano: number, filtro: string, sortOrder: number) {
    return this.consumeGet(`buscar/${pagina}/${tamano}/${filtro}/${sortOrder}`);
  }

  buscarUsuarioPorDni(dni: number) {
    return this.consumeGet(`buscar/${dni}`);
  }

  getAll() {
    return this.consumeGet(`buscar/`);
  }

  crearUsuario(usuario: User) {
    return this.consumePost('guardar', usuario);
  }

  eliminarUsuario(id: number) {
    return this.consumeDelete(`eliminar/${id}`);
  }
}