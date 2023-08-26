import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseApi } from '../Interfaces/response-api';
import { Usuario } from '../Interfaces/usuario';
import { ForgotPassword, Login, ResetPassword } from '../Interfaces/acceso';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlApi: string = environment.endPoint;

  constructor(private http: HttpClient) { }

  iniciarSesion(login: Login): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}/Usuario/IniciarSesion`, login);
  }

  reestablecerClave(forgotPassword: ForgotPassword): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}/Usuario/ReestablecerClave`, forgotPassword);
  }

  nuevaClave(resetPassword: ResetPassword): Observable<ResponseApi>{
    return this.http.put<ResponseApi>(`${this.urlApi}/Usuario/NuevaClave`, resetPassword);
  }

  guardar(usuario: Usuario): Observable<ResponseApi>{
    return this.http.post<ResponseApi>(`${this.urlApi}/Usuario/Guardar`, usuario);
  }

}
