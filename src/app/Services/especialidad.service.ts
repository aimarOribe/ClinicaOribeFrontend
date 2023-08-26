import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  private urlApi: string = environment.endPoint; 

  constructor(private http: HttpClient) { }

  listar(): Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}/Especialidad/Lista`);
  }

}
