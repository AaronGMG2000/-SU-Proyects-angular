import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, throwError, } from 'rxjs';
import { Seguro } from '../models/seguro';


@Injectable({
  providedIn: 'root'
})
export class SeguroService {

  API_URI = environment.urlService + "seguro/";


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

  buscarSeguro(pagina: number, tamano: number) {
    return this.consumeGet(`buscar/${pagina}/${tamano}`);
  }

  crearSeguro(seguro: Seguro) {
    return this.consumePost('guardar', seguro);
  }

  eliminarSeguro(id: number) {
    return this.consumeDelete(`eliminar/${id}`);
  }
}
