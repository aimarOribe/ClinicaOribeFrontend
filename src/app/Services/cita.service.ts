import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/response-api';
import { Usuario } from '../Interfaces/usuario';
import { Cita } from '../Interfaces/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  private urlApi: string = environment.endPoint; 

  constructor(private http: HttpClient) { }

  listar(): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}/Cita/Lista`);
  }

  Crear(cita: Cita): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}/Cita/Crear`, cita);
  }

  Aprobar(id: number): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}/Cita/Aprobar`, id);
  }

  Rechazar(id: number): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}/Cita/Rechazar`, id);
  }
}
