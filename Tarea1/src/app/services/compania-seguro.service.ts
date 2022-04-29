import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError, } from 'rxjs';
import { CompaniaSeguro } from '../models/compania-seguro';

@Injectable({
  providedIn: 'root'
})
export class CompaniaSeguroService {

  API_URI = environment.urlService + "companiaSeguro/";


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

  getAll(pagina: number, tamano: number, filtro: string, sortOrder: number) {
    return this.consumeGet(`buscar/${pagina}/${tamano}/${filtro}/${sortOrder}`);
  }

  create(companiaSeguro: CompaniaSeguro) {
    return this.consumePost('guardar', companiaSeguro);
  }

  delete(id: number) {
    return this.consumeDelete(`eliminar/${id}`);
  }

  buscarCompaniaSeguroPorId(id: number) {
    return this.consumeGet(`buscar/${id}`);
  }

  getAllS() {
    return this.consumeGet(`buscar/`);
  }
}