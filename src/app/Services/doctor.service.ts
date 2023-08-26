import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/response-api';
import { Usuario } from '../Interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private urlApi: string = environment.endPoint; 

  constructor(private http: HttpClient) { }

  listar(): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}/Doctor/Lista`);
  }

  listarActivos(): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}/Doctor/ListaActivos`);
  }

  listarPorEspecialidadyActivos(idEspecialidad: number): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}/Doctor/ListaPorEspecialidadyActivos`, idEspecialidad);
  }

  editar(usuario: Usuario): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}/Doctor/Editar`, usuario);
  }

  activar(id: number): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}/Doctor/Activar/${id}`);
  }

  desactivar(id: number): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}/Doctor/Desactivar/${id}`);
  }

  eliminar(id: number): Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}/Doctor/Eliminar/${id}`);
  }
}
