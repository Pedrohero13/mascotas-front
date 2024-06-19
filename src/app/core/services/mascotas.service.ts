import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Mascotas } from '../models/mascotas';

@Injectable({
  providedIn: 'root'
})
export class MascotasService {
  private readonly http = inject(HttpClient)
  constructor() { }

  obtenerMascotas(): Observable<Mascotas[]> {
    return this.http.get<Mascotas[]>(`${environment.apiUrl}/api/v1/obtenerMascotas`);
  }
  obtenerMascota(id_mascota: number): Observable<Mascotas> {
    return this.http.get<Mascotas>(`${environment.apiUrl}/api/v1/obtenerMascota/${id_mascota}`);
  }
  agregarMasctoa(mascota: Mascotas): Observable<Mascotas> {
    return this.http.post<Mascotas>(`${environment.apiUrl}/api/v1/agregarMascota`, mascota);
  }
  modificarMascota(id_mascota: number,mascota: Mascotas): Observable<Mascotas> {
    return this.http.put<Mascotas>(`${environment.apiUrl}/api/v1/modificarMascota/${id_mascota}`,mascota);
  }

  eliminarMascota(id_mascota: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/v1/borrarMascota/${id_mascota}`);
  }
}
