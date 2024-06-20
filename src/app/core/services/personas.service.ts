import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Personas, PersonasDTO } from '../models/personas';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private readonly http = inject(HttpClient)
  constructor() { }

  obtenerPersonas(): Observable<Personas[]> {
    return this.http.get<Personas[]>(`${environment.apiUrl}/api/v1/obtenerPersonas`);
  }
  obtenerPersona(id_persona: number): Observable<Personas> {
    return this.http.get<Personas>(`${environment.apiUrl}/api/v1/obtenerPersona/${id_persona}`);
  }
  agregarPersona(persona: PersonasDTO): Observable<Personas> {
    return this.http.post<Personas>(`${environment.apiUrl}/api/v1/agregarPersona`, persona);
  }
  modificarPersona(id_persona: number,persona: PersonasDTO): Observable<Personas> {
    return this.http.put<Personas>(`${environment.apiUrl}/api/v1/modificarPersona/${id_persona}`,persona);
  }

  eliminarPersona(id_persona: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/api/v1/borrarPersona/${id_persona}`);
  }
}
