import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/response-api';
import { Usuario } from '../Interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private urlApi: string = environment.endPoint; 

  constructor(private http: HttpClient) { }

  listar(): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}/Paciente/Lista`);
  }
  
  listarActivos(): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}/Paciente/ListaActivos`);
  }

  buscarPorDni(dni: string): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}/Paciente/BuscarPorDni/${dni}`);
  }

  editar(usuario: Usuario): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}/Paciente/Editar`, usuario);
  }

  activar(id: number): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}/Paciente/Activar/${id}`);
  }

  desactivar(id: number): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}/Paciente/Desactivar/${id}`);
  }

  eliminar(id: number): Observable<ResponseApi>{
    return this.http.delete<ResponseApi>(`${this.urlApi}/Paciente/Eliminar/${id}`);
  }

}
